#!/usr/bin/env node
var __agentWitchImportMetaUrl=require("url").pathToFileURL(__filename).href;
"use strict";var Kre=Object.create;var Zb=Object.defineProperty;var Vre=Object.getOwnPropertyDescriptor;var qre=Object.getOwnPropertyNames;var Jre=Object.getPrototypeOf,Yre=Object.prototype.hasOwnProperty;var l=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(o){throw r=[o],o}};var T=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},Mt=(e,t)=>{for(var r in t)Zb(e,r,{get:t[r],enumerable:!0})},Xre=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of qre(t))!Yre.call(e,n)&&n!==r&&Zb(e,n,{get:()=>t[n],enumerable:!(o=Vre(t,n))||o.enumerable});return e};var u=(e,t,r)=>(r=e!=null?Kre(Jre(e)):{},Xre(t||!e||!e.__esModule?Zb(r,"default",{value:e,enumerable:!0}):r,e));var jc,oD,nD,Mc,Qb,Wbe,Dg,ss,Fr,So,Hg,Fg,oa,na,yt,ek,$g,zg,Ug,Nc,gr,is,as,Dc,pn,tk,sD,Ge=l(()=>{"use strict";jc={production:".agent-witch",localhost:".local-agent-witch"},oD={production:47892,localhost:47893},nD={production:"com.agent-witch",localhost:"com.local-agent-witch"},Mc={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},Qb="app",Wbe=`${Qb}/agent-witch.js`,Dg=`${Qb}/command`,ss={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",projectDataDir:"project-data",harnessDir:"harness"},Fr=jc.production,So=jc.localhost,Hg=oD.production,Fg=oD.localhost,oa=nD.production,na=nD.localhost,yt="profiles",ek=Mc.activeProfile,$g="harness",zg="sets",Ug="manifest.json",Nc=ss.projectsDir,gr=ss.logsDir,is="agent-witch.log",as="agent-witch.error.log",Dc=ss.reportsDir,pn=ss.deviceKeypairJson,tk=Qb,sD="agent-witch.js"});var iD=l(()=>{"use strict";Ge()});var aD,un,ls,Hc=l(()=>{"use strict";aD=u(require("node:path"));Ge();un=e=>aD.default.basename(e)===So,ls=e=>un(e)?na:oa});var $r,sa=l(()=>{"use strict";$r="agent-witch.service"});var Nt,Bg,lD=l(()=>{"use strict";Nt="https://www.agentwitch.com",Bg="wss://www.agentwitch.com/api/agent-witch/ws"});var Gg,ia,Fc,cD=l(()=>{"use strict";Gg="127.0.0.1",ia=`http://${Gg}:43347`,Fc=ia});var rk,Kg,dD,pD,ok,nk,uD=l(()=>{"use strict";rk="local-app-port.json",Kg="http://127.0.0.1:<localAppPort>",dD=`~/.agent-witch/profiles/<account email>/${rk}`,pD=`AgentWitch Local listens on a port unique to your account on this computer: read localAppPort from ${dD} and use ${Kg}.`,ok="agentwitch-local",nk=(e=".agent-witch")=>`port="$(sed -n 's/.*"localAppPort"[^0-9]*\\([0-9][0-9]*\\).*/\\1/p' "$HOME/${e}"/profiles/*/${rk} | head -n 1)"; curl -sS -m 5 "http://127.0.0.1:\${port}/health"`});var fr=l(()=>{"use strict";lD();cD();uD()});var Zre,cs,Vg,mD,Qre,eoe,toe,roe,ooe,zc,sk=l(()=>{"use strict";sa();fr();Zre={darwin:"mac",mac:"mac",macos:"mac",linux:"linux",wsl:"linux",win32:"windows",windows:"windows"},cs=e=>Zre[(e??"").trim().toLowerCase()]??"unknown",Vg=e=>`nohup "$HOME/${e}/app/command/run.sh" >/dev/null 2>&1 &`,mD=e=>`${nk(e)} || echo "AWL still not responding \u2014 see logs:"`,Qre=e=>({platform:"mac",label:"macOS",instructions:"On this computer, open Terminal, paste this command, and press Return.",command:`AW_HOME="$HOME/${e.installDirName}"
launchctl kickstart -k "gui/$(id -u)/${e.launchAgentPrefix}"
sleep 2
${mD(e.installDirName)}
tail -20 "$AW_HOME/agent-witch.error.log" 2>/dev/null || true`,note:"Paste and run the whole block so AW_HOME is set before tail. Ignore com.agent-witch-live unless you installed Live as a separate LaunchAgent."}),eoe=e=>({platform:"linux",label:"Linux or WSL",instructions:"On this computer, open a terminal (on Windows, your WSL distro's terminal), paste this command, and press Enter.",command:`systemctl --user restart ${$r}
sleep 2
${mD(e.installDirName)}
journalctl --user -u ${$r} -n 50 --no-pager`,note:`If systemctl is not available, the installer did not set up auto-start on this computer. Start the client by hand: ${Vg(e.installDirName)}`}),toe=()=>({platform:"windows",label:"Windows (WSL)",instructions:"On this computer, open PowerShell, paste these commands, and press Enter.",command:`wsl.exe -e bash -lc 'systemctl --user restart ${$r}'
wsl.exe -e bash -lc 'systemctl --user status ${$r}'`,note:"AgentWitch runs inside WSL on Windows. These commands use your default WSL distro; if you installed into another distro, add -d <distro name> after wsl.exe."}),roe={mac:Qre,linux:eoe,windows:toe},ooe=["mac","linux","windows"],zc=e=>(e.platform==="unknown"?ooe:[e.platform]).map(r=>roe[r](e))});var gD,fD,noe,soe,ioe,ik,yD=l(()=>{"use strict";gD=u(require("node:path"));sk();Hc();fD=e=>e instanceof Error?e.message:String(e),noe=e=>typeof e=="object"&&e!==null&&"code"in e&&e.code==="ENOENT",soe=async(e,t)=>{try{let r=await e.kickstartLaunchAgents();return r.length>0?{ok:!0,platform:"mac",outcome:"restarted",message:`Kickstarted ${r.join(", ")}.`,manualCommand:null}:{ok:!1,platform:"mac",outcome:"failed",message:"No AgentWitch LaunchAgent was kickstarted on this computer.",manualCommand:t}}catch(r){return{ok:!1,platform:"mac",outcome:"failed",message:`LaunchAgent kickstart failed: ${fD(r)}`,manualCommand:t}}},ioe=async(e,t)=>{try{return await e.restartSystemdUserService(),{ok:!0,platform:"linux",outcome:"restarted",message:"Restarted the agent-witch.service systemd user unit.",manualCommand:null}}catch(r){return noe(r)?{ok:!1,platform:"linux",outcome:"manual-step-required",message:"systemctl is not available on this computer, so the installer set up no auto-start. Start the client by hand.",manualCommand:t}:{ok:!1,platform:"linux",outcome:"failed",message:`systemd user restart failed: ${fD(r)}`,manualCommand:t}}},ik=async e=>{let t=cs(e.platform),r=gD.default.basename(e.installDir),o=n=>zc({platform:n,installDirName:r,launchAgentPrefix:ls(e.installDir)})[0]?.command??null;return t==="mac"?soe(e.runners,o("mac")):t==="linux"?ioe(e.runners,Vg(r)):t==="windows"?{ok:!1,platform:t,outcome:"unsupported-platform",message:"AgentWitch runs inside WSL on Windows. Restart it from PowerShell with the command below.",manualCommand:o("windows")}:{ok:!1,platform:t,outcome:"unsupported-platform",message:`Restarting the AgentWitch client is not supported on ${e.platform||"this platform"}.`,manualCommand:null}}});var Uc=l(()=>{"use strict";iD();Hc();sk();yD()});var hD,ak,aoe,Bc,loe,coe,SD,doe,poe,PD=l(()=>{"use strict";Uc();Ge();hD=u(require("node:os")),ak=u(require("node:path")),aoe=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();return e!==void 0&&e.length>0?ak.default.resolve(e):ak.default.join(hD.default.homedir(),Fr)},Bc=ls(aoe()),loe=`${Bc}-wake`,coe=`${Bc}-live`,SD=`${Bc}-watchdog`,doe=`${Bc}-automation-scheduler`,poe=`${Bc}-updater`});var aa=T(lk=>{"use strict";Object.defineProperty(lk,"__esModule",{value:!0});lk.stringify=uoe;function uoe(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var K=T(ck=>{"use strict";Object.defineProperty(ck,"__esModule",{value:!0});ck.generateTypeGuardError=moe;var AD=aa();function moe(e,t,r){return(0,AD.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,AD.stringify)(e)}) to be "${r}"`}});var mn=T(qg=>{"use strict";Object.defineProperty(qg,"__esModule",{value:!0});qg.isNonNullObject=void 0;var goe=K(),foe=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,goe.generateTypeGuardError)(e,t.identifier,"non-null object")),r};qg.isNonNullObject=foe});var zr=T(Ke=>{"use strict";Object.defineProperty(Ke,"__esModule",{value:!0});Ke.attachTypeGuardMeta=Ke.isArrayTypeGuard=Ke.isNestedObjectTypeGuard=Ke.getTypeGuardWrapperKind=Ke.getTypeGuardInnerGuard=Ke.getTypeGuardItemGuard=Ke.getTypeGuardSchema=void 0;var yoe=e=>e.schema;Ke.getTypeGuardSchema=yoe;var hoe=e=>e.itemGuard;Ke.getTypeGuardItemGuard=hoe;var Soe=e=>e.innerGuard;Ke.getTypeGuardInnerGuard=Soe;var Poe=e=>e.wrapperKind;Ke.getTypeGuardWrapperKind=Poe;var Aoe=e=>{if((0,Ke.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};Ke.isNestedObjectTypeGuard=Aoe;var _oe=e=>{if((0,Ke.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};Ke.isArrayTypeGuard=_oe;var boe=(e,t)=>Object.assign(e,t);Ke.attachTypeGuardMeta=boe});var Gc=T(ds=>{"use strict";Object.defineProperty(ds,"__esModule",{value:!0});ds.getExpectedTypeName=ds.getTypeGuardDisplayName=void 0;var _D=zr(),koe=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};ds.getTypeGuardDisplayName=koe;var Roe=e=>{let t=(0,_D.getTypeGuardWrapperKind)(e),r=(0,_D.getTypeGuardInnerGuard)(e);if(t&&r){let n=(0,ds.getExpectedTypeName)(r);if(t==="undefinedOr")return`${n} | undefined`;if(t==="nullOr")return`${n} | null`;if(t==="nilOr")return`${n} | null | undefined`}let o=e.name;if(o.startsWith("is")){let n=o.slice(2);return n.endsWith("Guard")&&(n=n.slice(0,-5)),n==="Type"||n==="Schema"?"object":n==="Array"?"Array":n.toLowerCase()}return"unknown"};ds.getExpectedTypeName=Roe});var ps=T(Jg=>{"use strict";Object.defineProperty(Jg,"__esModule",{value:!0});Jg.createValidationResult=void 0;var woe=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});Jg.createValidationResult=woe});var la=T(Yg=>{"use strict";Object.defineProperty(Yg,"__esModule",{value:!0});Yg.createValidationError=void 0;var Eoe=(e,t,r,o)=>({path:e,expectedType:t,actualValue:r,message:o});Yg.createValidationError=Eoe});var ca=T(Xg=>{"use strict";Object.defineProperty(Xg,"__esModule",{value:!0});Xg.createTreeNode=void 0;var Toe=(e,t,r,o)=>({valid:t,path:e,...r&&{expectedType:r},...o!==void 0&&{actualValue:o},children:{},errors:[]});Xg.createTreeNode=Toe});var Kc=T(Zg=>{"use strict";Object.defineProperty(Zg,"__esModule",{value:!0});Zg.combineResults=void 0;var Coe=ps(),Ioe=(e,t)=>{let r=e.every(s=>s.valid),o=e.flatMap(s=>s.errors),n={valid:r,path:t||"root",children:{},errors:o};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";n.children[i]=s.tree}}),(0,Coe.createValidationResult)(r,o,n)};Zg.combineResults=Ioe});var ef=T(Qg=>{"use strict";Object.defineProperty(Qg,"__esModule",{value:!0});Qg.createSimplifiedTree=void 0;var bD=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,o])=>{t[r]=bD(o)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},Loe=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let o={};Object.entries(e.children).forEach(([n,s])=>{o[n]=bD(s)}),r[t]={valid:e.valid,value:o}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};Qg.createSimplifiedTree=Loe});var qc=T(rf=>{"use strict";Object.defineProperty(rf,"__esModule",{value:!0});rf.validateObject=void 0;var voe=mn(),Vc=ps(),xoe=la(),tf=ca(),Woe=Kc(),kD=of(),Ooe=(e,t,r)=>{let o=()=>{let i=(0,xoe.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),a=(0,tf.createTreeNode)(r.path,!1,"non-null object",e);return a.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,Vc.createValidationResult)(!1,[],a):(0,Vc.createValidationResult)(!1,[i],a)},n=()=>{let i=Object.keys(t);if(i.length===0)return(0,Vc.createValidationResult)(!0,[],(0,tf.createTreeNode)(r.path,!0,"object",e));let a=c=>{let[d,...p]=c,m=d,g=t[m],y=e[m],h=(0,kD.validateProperty)(m,y,g,r);return h.valid?p.length===0?(0,Vc.createValidationResult)(!0,[],(0,tf.createTreeNode)(r.path,!0,"object",e)):a(p):h};return a(i)},s=()=>{let i=Object.keys(t).map(d=>{let p=t[d];return(0,kD.validateProperty)(d,e[d],p,r)}),a=(0,Woe.combineResults)(i,r.path),c=(0,tf.createTreeNode)(r.path,a.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let p=d.tree.path.split(".").pop()||"unknown";c.children[p]=d.tree}}),(0,Vc.createValidationResult)(a.valid,a.errors,c)};return(0,voe.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?n():s():o()};rf.validateObject=Ooe});var wD=T(af=>{"use strict";Object.defineProperty(af,"__esModule",{value:!0});af.validateArray=void 0;var joe=aa(),nf=ps(),RD=la(),sf=ca(),Moe=Kc(),Noe=qc(),Doe=Gc(),Hoe=zr(),Foe=(e,t,r)=>{let o=r.path;if(!Array.isArray(e)){let c=(0,RD.createValidationError)(o,"Array",e,`Expected ${o} (${JSON.stringify(e)}) to be "Array"`),d=(0,sf.createTreeNode)(o,!1,"Array",e);return d.errors=[c],(0,nf.createValidationResult)(!1,[c],d)}let n=(0,Hoe.getTypeGuardSchema)(t),s=e.map((c,d)=>{let p=`${o}[${d}]`,m={path:p,config:r.config||null};if(n)return(0,Noe.validateObject)(c,n,m);let g=t(c,null),y=(0,Doe.getExpectedTypeName)(t),h=(0,joe.stringify)(c);if(g)return(0,nf.createValidationResult)(!0,[],(0,sf.createTreeNode)(p,!0,y,c));let S=h.length>200?`Expected ${p} to be "${y}"`:`Expected ${p} (${h}) to be "${y}"`,E=(0,RD.createValidationError)(p,y,c,S),I=(0,sf.createTreeNode)(p,!1,y,c);return I.errors=[E],(0,nf.createValidationResult)(!1,[E],I)}),i=(0,Moe.combineResults)(s,o),a=(0,sf.createTreeNode)(o,i.valid,"Array",e);return a.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";a.children[d]=c.tree}}),(0,nf.createValidationResult)(i.valid,i.errors,a)};af.validateArray=Foe});var of=T(cf=>{"use strict";Object.defineProperty(cf,"__esModule",{value:!0});cf.validateProperty=void 0;var ED=ps(),$oe=la(),TD=ca(),zoe=Gc(),lf=zr(),Uoe=qc(),Boe=wD(),Goe=(e,t,r,o)=>{let n=`${o.path}.${e}`,s={path:n,config:o.config||null,...o.parentTree&&{parentTree:o.parentTree}},i=o.config?.errorMode||"multi",a=(0,lf.getTypeGuardSchema)(r),c=(0,lf.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(a)return(0,Uoe.validateObject)(t,a,s);if(c&&(0,lf.isArrayTypeGuard)(r))return(0,Boe.validateArray)(t,c,s)}let d=p=>{let m=r(t,p),g=(0,zoe.getExpectedTypeName)(r);return m?(0,ED.createValidationResult)(!0,[],(0,TD.createTreeNode)(n,!0,g,t)):(()=>{let y=(0,$oe.createValidationError)(n,g,t,`Expected ${n} (${JSON.stringify(t)}) to be "${g}"`),h=(0,TD.createTreeNode)(n,!1,g,t);return h.errors=[y],(0,ED.createValidationResult)(!1,[y],h)})()};if((0,lf.isNestedObjectTypeGuard)(r)){let p=o.config?{...o.config,identifier:n}:null;return d(p)}return d(null)};cf.validateProperty=Goe});var pf=T(df=>{"use strict";Object.defineProperty(df,"__esModule",{value:!0});df.isNil=void 0;var Koe=K(),Voe=function(e,t){return e!=null?(t&&t.callbackOnError((0,Koe.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};df.isNil=Voe});var dk=T(uf=>{"use strict";Object.defineProperty(uf,"__esModule",{value:!0});uf.isDefined=void 0;var qoe=K(),Joe=pf(),Yoe=function(e,t){return(0,Joe.isNil)(e,null)?(t&&t.callbackOnError((0,qoe.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};uf.isDefined=Yoe});var pk=T(mf=>{"use strict";Object.defineProperty(mf,"__esModule",{value:!0});mf.reportValidationResults=void 0;var Xoe=ef(),CD=dk(),Zoe=pf(),Qoe=(e,t)=>{if(e.valid===!0||(0,Zoe.isNil)(t))return;let r=t.errorMode||"multi",o=(i,a)=>{(0,CD.isDefined)(a)&&i.callbackOnError(JSON.stringify((0,Xoe.createSimplifiedTree)(a),null,2))},n=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let a=e.errors[0];a&&i.callbackOnError(a.message)}};r==="json"&&(0,CD.isDefined)(e.tree)?o(t,e.tree):r==="multi"?n(t):s(t)};mf.reportValidationResults=Qoe});var uk=T(be=>{"use strict";Object.defineProperty(be,"__esModule",{value:!0});be.Validation=be.reportValidationResults=be.validateObject=be.validateProperty=be.createSimplifiedTree=be.combineResults=be.createTreeNode=be.createValidationError=be.createValidationResult=be.getExpectedTypeName=void 0;var ene=Gc();Object.defineProperty(be,"getExpectedTypeName",{enumerable:!0,get:function(){return ene.getExpectedTypeName}});var tne=ps();Object.defineProperty(be,"createValidationResult",{enumerable:!0,get:function(){return tne.createValidationResult}});var rne=la();Object.defineProperty(be,"createValidationError",{enumerable:!0,get:function(){return rne.createValidationError}});var one=ca();Object.defineProperty(be,"createTreeNode",{enumerable:!0,get:function(){return one.createTreeNode}});var nne=Kc();Object.defineProperty(be,"combineResults",{enumerable:!0,get:function(){return nne.combineResults}});var sne=ef();Object.defineProperty(be,"createSimplifiedTree",{enumerable:!0,get:function(){return sne.createSimplifiedTree}});var ine=of();Object.defineProperty(be,"validateProperty",{enumerable:!0,get:function(){return ine.validateProperty}});var ane=qc();Object.defineProperty(be,"validateObject",{enumerable:!0,get:function(){return ane.validateObject}});var lne=pk();Object.defineProperty(be,"reportValidationResults",{enumerable:!0,get:function(){return lne.reportValidationResults}});var cne=ps(),dne=Kc(),pne=la(),une=ca(),mne=of(),gne=qc(),fne=pk(),yne=ef();be.Validation={result:cne.createValidationResult,combine:dne.combineResults,error:pne.createValidationError,treeNode:une.createTreeNode,property:mne.validateProperty,object:gne.validateObject,report:fne.reportValidationResults,createSimplifiedTree:yne.createSimplifiedTree}});var gf=T(mk=>{"use strict";Object.defineProperty(mk,"__esModule",{value:!0});mk.isType=Sne;var ID=mn(),LD=uk(),hne=zr();function Sne(e){if(!(0,ID.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,o){let n=o?.errorMode||"multi";if(n==="multi"||n==="json"){let s={path:o?.identifier||"root",config:o||null},i=(0,LD.validateObject)(r,e,s);return(0,LD.reportValidationResults)(i,o||null),i.valid}return(0,ID.isNonNullObject)(r,o)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],o?{...o,identifier:`${o.identifier}.${s}`}:null)}):!1}return(0,hne.attachTypeGuardMeta)(t,{schema:e})}});var OD=T(us=>{"use strict";Object.defineProperty(us,"__esModule",{value:!0});us.isNestedType=us.isShape=void 0;us.isSchema=Jc;var vD=mn(),xD=uk(),WD=zr();function Jc(e){if(!(0,vD.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=Ane(e);function r(o,n){let s=n?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:n?.identifier||"root",config:n||null},a=(0,xD.validateObject)(o,t,i);return(0,xD.reportValidationResults)(a,n||null),a.valid}return(0,vD.isNonNullObject)(o,n)?Object.keys(t).every(function(i){let a=t[i];return a?a(o[i],n?{...n,identifier:`${n.identifier}.${i}`}:null):!1}):!1}return(0,WD.attachTypeGuardMeta)(r,{schema:t})}function Pne(e){return typeof e=="function"?e:Array.isArray(e)?_ne(e):typeof e=="object"&&e!==null?Jc(e):e}function Ane(e){let t={};for(let[r,o]of Object.entries(e))t[r]=Pne(o);return t}function _ne(e){let t=e[0],r=Jc(t);function o(n,s){return Array.isArray(n)?n.every((i,a)=>r(i,s?{...s,identifier:`${s.identifier}[${a}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,WD.attachTypeGuardMeta)(o,{itemGuard:r})}us.isShape=Jc;us.isNestedType=Jc});var jD=T(gk=>{"use strict";Object.defineProperty(gk,"__esModule",{value:!0});gk.isObjectWith=kne;var bne=gf();function kne(e){return(0,bne.isType)(e)}});var MD=T(fk=>{"use strict";Object.defineProperty(fk,"__esModule",{value:!0});fk.isObject=wne;var Rne=gf();function wne(e){return(0,Rne.isType)(e)}});var ND=T(yk=>{"use strict";Object.defineProperty(yk,"__esModule",{value:!0});yk.guardWithTolerance=Ene;function Ene(e,t,r){return t(e,r),e}});var DD=T(hk=>{"use strict";Object.defineProperty(hk,"__esModule",{value:!0});hk.isBranded=Cne;var Tne=K();function Cne(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,Tne.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var HD=T(ff=>{"use strict";Object.defineProperty(ff,"__esModule",{value:!0});ff.BrandSymbols=void 0;ff.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var FD=T(yf=>{"use strict";Object.defineProperty(yf,"__esModule",{value:!0});yf.isAny=void 0;var Ine=function(e){return!0};yf.isAny=Ine});var Yc=T(Sk=>{"use strict";Object.defineProperty(Sk,"__esModule",{value:!0});Sk.reportTypeGuardError=vne;var Lne=K();function vne(e,t,r){e&&e.callbackOnError((0,Lne.generateTypeGuardError)(t,e.identifier,r))}});var $D=T(hf=>{"use strict";Object.defineProperty(hf,"__esModule",{value:!0});hf.isBoolean=void 0;var xne=Yc(),Wne=function(t,r){return typeof t!="boolean"?((0,xne.reportTypeGuardError)(r,t,"boolean"),!1):!0};hf.isBoolean=Wne});var zD=T(Sf=>{"use strict";Object.defineProperty(Sf,"__esModule",{value:!0});Sf.isDate=void 0;var One=K(),jne=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,One.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};Sf.isDate=jne});var Pk=T(Pf=>{"use strict";Object.defineProperty(Pf,"__esModule",{value:!0});Pf.isNumber=void 0;var Mne=Yc(),Nne=function(t,r){return typeof t!="number"||isNaN(t)?((0,Mne.reportTypeGuardError)(r,t,"number"),!1):!0};Pf.isNumber=Nne});var UD=T(Af=>{"use strict";Object.defineProperty(Af,"__esModule",{value:!0});Af.isString=void 0;var Dne=Yc(),Hne=function(t,r){return typeof t!="string"?((0,Dne.reportTypeGuardError)(r,t,"string"),!1):!0};Af.isString=Hne});var BD=T(_f=>{"use strict";Object.defineProperty(_f,"__esModule",{value:!0});_f.isUnknown=void 0;var Fne=function(e){return!0};_f.isUnknown=Fne});var GD=T(bf=>{"use strict";Object.defineProperty(bf,"__esModule",{value:!0});bf.isFunction=void 0;var $ne=K(),zne=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,$ne.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};bf.isFunction=zne});var VD=T(kf=>{"use strict";Object.defineProperty(kf,"__esModule",{value:!0});kf.isFile=void 0;var KD=K(),Une=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,KD.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,KD.generateTypeGuardError)(e,t.identifier,"File")),!1)};kf.isFile=Une});var JD=T(Rf=>{"use strict";Object.defineProperty(Rf,"__esModule",{value:!0});Rf.isFileList=void 0;var qD=K(),Bne=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,qD.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,qD.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};Rf.isFileList=Bne});var XD=T(wf=>{"use strict";Object.defineProperty(wf,"__esModule",{value:!0});wf.isBlob=void 0;var YD=K(),Gne=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,YD.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,YD.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};wf.isBlob=Gne});var QD=T(Ef=>{"use strict";Object.defineProperty(Ef,"__esModule",{value:!0});Ef.isFormData=void 0;var ZD=K(),Kne=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,ZD.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,ZD.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};Ef.isFormData=Kne});var tH=T(Tf=>{"use strict";Object.defineProperty(Tf,"__esModule",{value:!0});Tf.isURL=void 0;var eH=K(),Vne=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,eH.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,eH.generateTypeGuardError)(e,t.identifier,"URL")),!1)};Tf.isURL=Vne});var oH=T(Cf=>{"use strict";Object.defineProperty(Cf,"__esModule",{value:!0});Cf.isURLSearchParams=void 0;var rH=K(),qne=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,rH.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,rH.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};Cf.isURLSearchParams=qne});var nH=T(If=>{"use strict";Object.defineProperty(If,"__esModule",{value:!0});If.isMap=void 0;var Jne=K(),Yne=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,Jne.generateTypeGuardError)(e,t.identifier,"Map")),!1)};If.isMap=Yne});var sH=T(Lf=>{"use strict";Object.defineProperty(Lf,"__esModule",{value:!0});Lf.isSet=void 0;var Xne=K(),Zne=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,Xne.generateTypeGuardError)(e,t.identifier,"Set")),!1)};Lf.isSet=Zne});var iH=T(Ak=>{"use strict";Object.defineProperty(Ak,"__esModule",{value:!0});Ak.isIndexSignature=ese;var Qne=K();function ese(e,t){return function(r,o){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return o&&o.callbackOnError((0,Qne.generateTypeGuardError)(r,o.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertySymbols(s);return[...i,...a].every((d,p)=>{let m=s[d],g=e(d,o?{...o,identifier:`${o.identifier}[key:${p}]`}:null),y=t(m,o?{...o,identifier:`${o.identifier}[value:${p}]`}:null);return g&&y})}}});var aH=T(vf=>{"use strict";Object.defineProperty(vf,"__esModule",{value:!0});vf.isError=void 0;var tse=Yc(),rse=function(t,r){return t instanceof Error?!0:((0,tse.reportTypeGuardError)(r,t,"Error"),!1)};vf.isError=rse});var bk=T(_k=>{"use strict";Object.defineProperty(_k,"__esModule",{value:!0});_k.isArrayWithEachItem=sse;var ose=K(),nse=zr();function sse(e){let t=function(r,o){return Array.isArray(r)?r.every((n,s)=>e(n,o?{...o,identifier:`${o.identifier}[${s}]`}:null)):(o&&o.callbackOnError((0,ose.generateTypeGuardError)(r,o.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,nse.attachTypeGuardMeta)(t,{itemGuard:e})}});var kk=T(xf=>{"use strict";Object.defineProperty(xf,"__esModule",{value:!0});xf.isNonEmptyArray=void 0;var ise=K(),ase=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,ise.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};xf.isNonEmptyArray=ase});var lH=T(Rk=>{"use strict";Object.defineProperty(Rk,"__esModule",{value:!0});Rk.isNonEmptyArrayWithEachItem=dse;var lse=bk(),cse=kk();function dse(e){return function(t,r){return(0,lse.isArrayWithEachItem)(e)(t,r)&&(0,cse.isNonEmptyArray)(t,r)}}});var dH=T(wk=>{"use strict";Object.defineProperty(wk,"__esModule",{value:!0});wk.isTuple=pse;var cH=K();function pse(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,cH.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((o,n)=>o(t[n],r?{...r,identifier:`${r.identifier}[${n}]`}:null)):(r&&r.callbackOnError((0,cH.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var pH=T(Ek=>{"use strict";Object.defineProperty(Ek,"__esModule",{value:!0});Ek.isObjectWithEachItem=mse;var use=K();function mse(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,use.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var uH=T(Tk=>{"use strict";Object.defineProperty(Tk,"__esModule",{value:!0});Tk.isPartialOf=fse;var gse=mn();function fse(e){return function(t,r){if(!(0,gse.isNonNullObject)(t,r))return!1;for(let o in e)if(Object.prototype.hasOwnProperty.call(e,o)&&Object.prototype.hasOwnProperty.call(t,o)){let n=e[o],s=t[o];if(n&&!n(s,r?{...r,identifier:`${r.identifier}.${o}`}:null))return!1}return!0}}});var mH=T(Ck=>{"use strict";Object.defineProperty(Ck,"__esModule",{value:!0});Ck.isPick=hse;var yse=mn();function hse(e,...t){return function(r,o){if(!(0,yse.isNonNullObject)(r,o))return!1;for(let n of t)if(!Object.prototype.hasOwnProperty.call(r,n))return o&&e(r,o),!1;return!0}}});var gH=T(Ik=>{"use strict";Object.defineProperty(Ik,"__esModule",{value:!0});Ik.isOmit=Pse;var Sse=mn();function Pse(e,...t){return function(r,o){if(!(0,Sse.isNonNullObject)(r,o))return!1;let n=[],s=o?.identifier||"root",i=o?{...o,callbackOnError:d=>n.push(d)}:{identifier:s,callbackOnError:d=>n.push(d)};e(r,i);let a=new Set(t.map(d=>`${s}.${String(d)}`)),c=n.filter(d=>{let p=d.slice(9),m=p.indexOf(" ("),g=m>=0?p.slice(0,m):p;if(a.has(g))return!1;let y=g.startsWith(s+".")&&g.slice(s.length+1).split(".")[0]||"";return!(y&&!Object.prototype.hasOwnProperty.call(r,y))});if(o&&c.length>0)for(let d of c)o.callbackOnError(d);return c.length===0}}});var fH=T(Wf=>{"use strict";Object.defineProperty(Wf,"__esModule",{value:!0});Wf.isNonEmptyString=void 0;var Ase=K(),_se=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,Ase.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};Wf.isNonEmptyString=_se});var yH=T(Of=>{"use strict";Object.defineProperty(Of,"__esModule",{value:!0});Of.isNonNegativeNumber=void 0;var bse=K(),kse=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,bse.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};Of.isNonNegativeNumber=kse});var hH=T(jf=>{"use strict";Object.defineProperty(jf,"__esModule",{value:!0});jf.isPositiveNumber=void 0;var Rse=K(),wse=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,Rse.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};jf.isPositiveNumber=wse});var SH=T(Mf=>{"use strict";Object.defineProperty(Mf,"__esModule",{value:!0});Mf.isNonPositiveNumber=void 0;var Ese=K(),Tse=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,Ese.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};Mf.isNonPositiveNumber=Tse});var PH=T(Nf=>{"use strict";Object.defineProperty(Nf,"__esModule",{value:!0});Nf.isNegativeNumber=void 0;var Cse=K(),Ise=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,Cse.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};Nf.isNegativeNumber=Ise});var AH=T(Df=>{"use strict";Object.defineProperty(Df,"__esModule",{value:!0});Df.isInteger=void 0;var Lse=K(),vse=Pk(),xse=function(e,t){return!(0,vse.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,Lse.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};Df.isInteger=xse});var _H=T(Hf=>{"use strict";Object.defineProperty(Hf,"__esModule",{value:!0});Hf.isPositiveInteger=void 0;var Wse=K(),Ose=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,Wse.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};Hf.isPositiveInteger=Ose});var bH=T(Ff=>{"use strict";Object.defineProperty(Ff,"__esModule",{value:!0});Ff.isNegativeInteger=void 0;var jse=K(),Mse=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,jse.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};Ff.isNegativeInteger=Mse});var kH=T($f=>{"use strict";Object.defineProperty($f,"__esModule",{value:!0});$f.isNonNegativeInteger=void 0;var Nse=K(),Dse=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,Nse.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};$f.isNonNegativeInteger=Dse});var RH=T(zf=>{"use strict";Object.defineProperty(zf,"__esModule",{value:!0});zf.isNonPositiveInteger=void 0;var Hse=K(),Fse=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,Hse.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};zf.isNonPositiveInteger=Fse});var wH=T(Bf=>{"use strict";Object.defineProperty(Bf,"__esModule",{value:!0});Bf.isNumeric=void 0;var Uf=K(),$se=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,Uf.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,Uf.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,Uf.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,Uf.generateTypeGuardError)(e,t.identifier,"number key")),!1};Bf.isNumeric=$se});var EH=T(Gf=>{"use strict";Object.defineProperty(Gf,"__esModule",{value:!0});Gf.isBooleanLike=void 0;var Lk=K(),zse=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,Lk.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,Lk.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};Gf.isBooleanLike=zse});var TH=T(Kf=>{"use strict";Object.defineProperty(Kf,"__esModule",{value:!0});Kf.isDateLike=void 0;var Xc=K(),Use=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,Xc.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,Xc.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,Xc.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,Xc.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,Xc.generateTypeGuardError)(e,t.identifier,"date-like")),!1};Kf.isDateLike=Use});var CH=T(Vf=>{"use strict";Object.defineProperty(Vf,"__esModule",{value:!0});Vf.isBigInt=void 0;var Bse=K(),Gse=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,Bse.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};Vf.isBigInt=Gse});var xk=T(vk=>{"use strict";Object.defineProperty(vk,"__esModule",{value:!0});vk.isOneOf=Kse;var IH=aa();function Kse(...e){return function(t,r){let o=e.some(function(n){return t===n});return!o&&r&&r.callbackOnError(`${r.identifier} (${(0,IH.stringify)(t)}) must be one of following values ${e.map(IH.stringify).join(" | ")}`),o}}});var LH=T(Wk=>{"use strict";Object.defineProperty(Wk,"__esModule",{value:!0});Wk.isOneOfTypes=Jse;var Vse=aa(),qse=Gc();function Jse(...e){return function(t,r){let o=e.map(s=>({typeGuard:s,isValid:s(t,null)})),n=o.some(s=>s.isValid);if(!n&&r){let s=(0,Vse.stringify)(t),a=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,qse.getTypeGuardDisplayName)(c)).join(" | ")}"`];o.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let p=`- ${d}`;a.includes(p)||a.push(p)}})),r.callbackOnError(a.join(`
`))}return n}}});var vH=T(Ok=>{"use strict";Object.defineProperty(Ok,"__esModule",{value:!0});Ok.isIntersectionOf=Yse;function Yse(...e){return function(t,r){for(let o of e)if(!o(t,r))return!1;return!0}}});var xH=T(jk=>{"use strict";Object.defineProperty(jk,"__esModule",{value:!0});jk.isExtensionOf=Xse;function Xse(e,t){return function(r,o){return e(r,o)?t(r,o):!1}}});var WH=T(Mk=>{"use strict";Object.defineProperty(Mk,"__esModule",{value:!0});Mk.isNullOr=Qse;var Zse=zr();function Qse(e){function t(r,o){return r===null?!0:e(r,o)}return(0,Zse.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var OH=T(Nk=>{"use strict";Object.defineProperty(Nk,"__esModule",{value:!0});Nk.isUndefinedOr=tie;var eie=zr();function tie(e){function t(r,o){return r===void 0?!0:e(r,o)}return(0,eie.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var jH=T(Dk=>{"use strict";Object.defineProperty(Dk,"__esModule",{value:!0});Dk.isNilOr=oie;var rie=zr();function oie(e){function t(r,o){return r==null?!0:e(r,o)}return(0,rie.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var MH=T(Hk=>{"use strict";Object.defineProperty(Hk,"__esModule",{value:!0});Hk.isAsserted=nie;function nie(e){return!0}});var NH=T(Fk=>{"use strict";Object.defineProperty(Fk,"__esModule",{value:!0});Fk.isEnum=iie;var sie=xk();function iie(e){return function(t,r){return(0,sie.isOneOf)(...Object.values(e))(t,r)}}});var DH=T($k=>{"use strict";Object.defineProperty($k,"__esModule",{value:!0});$k.isEqualTo=cie;var aie=K(),lie=aa();function cie(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,aie.generateTypeGuardError)(t,r.identifier,`equal to ${(0,lie.stringify)(e)}`)),!1):!0}}});var HH=T(qf=>{"use strict";Object.defineProperty(qf,"__esModule",{value:!0});qf.isRegex=void 0;var die=K(),pie=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,die.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};qf.isRegex=pie});var $H=T(zk=>{"use strict";Object.defineProperty(zk,"__esModule",{value:!0});zk.isPattern=uie;var FH=K();function uie(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,o){return typeof r!="string"?(o&&o.callbackOnError((0,FH.generateTypeGuardError)(r,o.identifier,"string")),!1):t.test(r)?!0:(o&&o.callbackOnError((0,FH.generateTypeGuardError)(r,o.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var zH=T(Uk=>{"use strict";Object.defineProperty(Uk,"__esModule",{value:!0});Uk.by=mie;function mie(e){return function(t){return e(t,null)}}});var UH=T(Bk=>{"use strict";Object.defineProperty(Bk,"__esModule",{value:!0});Bk.toNumber=gie;function gie(e){return typeof e=="number"?e:Number(e)}});var BH=T(Gk=>{"use strict";Object.defineProperty(Gk,"__esModule",{value:!0});Gk.toDate=fie;function fie(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var GH=T(Kk=>{"use strict";Object.defineProperty(Kk,"__esModule",{value:!0});Kk.toBoolean=yie;function yie(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var KH=T(Jf=>{"use strict";Object.defineProperty(Jf,"__esModule",{value:!0});Jf.isSymbol=void 0;var hie=K(),Sie=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,hie.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};Jf.isSymbol=Sie});var da=T(A=>{"use strict";Object.defineProperty(A,"__esModule",{value:!0});A.isDateLike=A.isBooleanLike=A.isNumeric=A.isNonPositiveInteger=A.isNonNegativeInteger=A.isNegativeInteger=A.isPositiveInteger=A.isInteger=A.isNegativeNumber=A.isNonPositiveNumber=A.isPositiveNumber=A.isNonNegativeNumber=A.isNonEmptyString=A.isOmit=A.isPick=A.isPartialOf=A.isObjectWithEachItem=A.isNonNullObject=A.isTuple=A.isNonEmptyArrayWithEachItem=A.isNonEmptyArray=A.isArrayWithEachItem=A.isError=A.isIndexSignature=A.isSet=A.isMap=A.isURLSearchParams=A.isURL=A.isFormData=A.isBlob=A.isFileList=A.isFile=A.isFunction=A.isUnknown=A.isString=A.isNumber=A.isNil=A.isDefined=A.isDate=A.isBoolean=A.isAny=A.BrandSymbols=A.isBranded=A.guardWithTolerance=A.isObject=A.isObjectWith=A.isNestedType=A.isShape=A.isSchema=A.isType=void 0;A.isSymbol=A.toBoolean=A.toDate=A.toNumber=A.by=A.generateTypeGuardError=A.isPattern=A.isRegex=A.isEqualTo=A.isEnum=A.isAsserted=A.isNilOr=A.isUndefinedOr=A.isNullOr=A.isExtensionOf=A.isIntersectionOf=A.isOneOfTypes=A.isOneOf=A.isBigInt=void 0;var Pie=gf();Object.defineProperty(A,"isType",{enumerable:!0,get:function(){return Pie.isType}});var Vk=OD();Object.defineProperty(A,"isSchema",{enumerable:!0,get:function(){return Vk.isSchema}});Object.defineProperty(A,"isShape",{enumerable:!0,get:function(){return Vk.isShape}});Object.defineProperty(A,"isNestedType",{enumerable:!0,get:function(){return Vk.isNestedType}});var Aie=jD();Object.defineProperty(A,"isObjectWith",{enumerable:!0,get:function(){return Aie.isObjectWith}});var _ie=MD();Object.defineProperty(A,"isObject",{enumerable:!0,get:function(){return _ie.isObject}});var bie=ND();Object.defineProperty(A,"guardWithTolerance",{enumerable:!0,get:function(){return bie.guardWithTolerance}});var kie=DD();Object.defineProperty(A,"isBranded",{enumerable:!0,get:function(){return kie.isBranded}});var Rie=HD();Object.defineProperty(A,"BrandSymbols",{enumerable:!0,get:function(){return Rie.BrandSymbols}});var wie=FD();Object.defineProperty(A,"isAny",{enumerable:!0,get:function(){return wie.isAny}});var Eie=$D();Object.defineProperty(A,"isBoolean",{enumerable:!0,get:function(){return Eie.isBoolean}});var Tie=zD();Object.defineProperty(A,"isDate",{enumerable:!0,get:function(){return Tie.isDate}});var Cie=dk();Object.defineProperty(A,"isDefined",{enumerable:!0,get:function(){return Cie.isDefined}});var Iie=pf();Object.defineProperty(A,"isNil",{enumerable:!0,get:function(){return Iie.isNil}});var Lie=Pk();Object.defineProperty(A,"isNumber",{enumerable:!0,get:function(){return Lie.isNumber}});var vie=UD();Object.defineProperty(A,"isString",{enumerable:!0,get:function(){return vie.isString}});var xie=BD();Object.defineProperty(A,"isUnknown",{enumerable:!0,get:function(){return xie.isUnknown}});var Wie=GD();Object.defineProperty(A,"isFunction",{enumerable:!0,get:function(){return Wie.isFunction}});var Oie=VD();Object.defineProperty(A,"isFile",{enumerable:!0,get:function(){return Oie.isFile}});var jie=JD();Object.defineProperty(A,"isFileList",{enumerable:!0,get:function(){return jie.isFileList}});var Mie=XD();Object.defineProperty(A,"isBlob",{enumerable:!0,get:function(){return Mie.isBlob}});var Nie=QD();Object.defineProperty(A,"isFormData",{enumerable:!0,get:function(){return Nie.isFormData}});var Die=tH();Object.defineProperty(A,"isURL",{enumerable:!0,get:function(){return Die.isURL}});var Hie=oH();Object.defineProperty(A,"isURLSearchParams",{enumerable:!0,get:function(){return Hie.isURLSearchParams}});var Fie=nH();Object.defineProperty(A,"isMap",{enumerable:!0,get:function(){return Fie.isMap}});var $ie=sH();Object.defineProperty(A,"isSet",{enumerable:!0,get:function(){return $ie.isSet}});var zie=iH();Object.defineProperty(A,"isIndexSignature",{enumerable:!0,get:function(){return zie.isIndexSignature}});var Uie=aH();Object.defineProperty(A,"isError",{enumerable:!0,get:function(){return Uie.isError}});var Bie=bk();Object.defineProperty(A,"isArrayWithEachItem",{enumerable:!0,get:function(){return Bie.isArrayWithEachItem}});var Gie=kk();Object.defineProperty(A,"isNonEmptyArray",{enumerable:!0,get:function(){return Gie.isNonEmptyArray}});var Kie=lH();Object.defineProperty(A,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return Kie.isNonEmptyArrayWithEachItem}});var Vie=dH();Object.defineProperty(A,"isTuple",{enumerable:!0,get:function(){return Vie.isTuple}});var qie=mn();Object.defineProperty(A,"isNonNullObject",{enumerable:!0,get:function(){return qie.isNonNullObject}});var Jie=pH();Object.defineProperty(A,"isObjectWithEachItem",{enumerable:!0,get:function(){return Jie.isObjectWithEachItem}});var Yie=uH();Object.defineProperty(A,"isPartialOf",{enumerable:!0,get:function(){return Yie.isPartialOf}});var Xie=mH();Object.defineProperty(A,"isPick",{enumerable:!0,get:function(){return Xie.isPick}});var Zie=gH();Object.defineProperty(A,"isOmit",{enumerable:!0,get:function(){return Zie.isOmit}});var Qie=fH();Object.defineProperty(A,"isNonEmptyString",{enumerable:!0,get:function(){return Qie.isNonEmptyString}});var eae=yH();Object.defineProperty(A,"isNonNegativeNumber",{enumerable:!0,get:function(){return eae.isNonNegativeNumber}});var tae=hH();Object.defineProperty(A,"isPositiveNumber",{enumerable:!0,get:function(){return tae.isPositiveNumber}});var rae=SH();Object.defineProperty(A,"isNonPositiveNumber",{enumerable:!0,get:function(){return rae.isNonPositiveNumber}});var oae=PH();Object.defineProperty(A,"isNegativeNumber",{enumerable:!0,get:function(){return oae.isNegativeNumber}});var nae=AH();Object.defineProperty(A,"isInteger",{enumerable:!0,get:function(){return nae.isInteger}});var sae=_H();Object.defineProperty(A,"isPositiveInteger",{enumerable:!0,get:function(){return sae.isPositiveInteger}});var iae=bH();Object.defineProperty(A,"isNegativeInteger",{enumerable:!0,get:function(){return iae.isNegativeInteger}});var aae=kH();Object.defineProperty(A,"isNonNegativeInteger",{enumerable:!0,get:function(){return aae.isNonNegativeInteger}});var lae=RH();Object.defineProperty(A,"isNonPositiveInteger",{enumerable:!0,get:function(){return lae.isNonPositiveInteger}});var cae=wH();Object.defineProperty(A,"isNumeric",{enumerable:!0,get:function(){return cae.isNumeric}});var dae=EH();Object.defineProperty(A,"isBooleanLike",{enumerable:!0,get:function(){return dae.isBooleanLike}});var pae=TH();Object.defineProperty(A,"isDateLike",{enumerable:!0,get:function(){return pae.isDateLike}});var uae=CH();Object.defineProperty(A,"isBigInt",{enumerable:!0,get:function(){return uae.isBigInt}});var mae=xk();Object.defineProperty(A,"isOneOf",{enumerable:!0,get:function(){return mae.isOneOf}});var gae=LH();Object.defineProperty(A,"isOneOfTypes",{enumerable:!0,get:function(){return gae.isOneOfTypes}});var fae=vH();Object.defineProperty(A,"isIntersectionOf",{enumerable:!0,get:function(){return fae.isIntersectionOf}});var yae=xH();Object.defineProperty(A,"isExtensionOf",{enumerable:!0,get:function(){return yae.isExtensionOf}});var hae=WH();Object.defineProperty(A,"isNullOr",{enumerable:!0,get:function(){return hae.isNullOr}});var Sae=OH();Object.defineProperty(A,"isUndefinedOr",{enumerable:!0,get:function(){return Sae.isUndefinedOr}});var Pae=jH();Object.defineProperty(A,"isNilOr",{enumerable:!0,get:function(){return Pae.isNilOr}});var Aae=MH();Object.defineProperty(A,"isAsserted",{enumerable:!0,get:function(){return Aae.isAsserted}});var _ae=NH();Object.defineProperty(A,"isEnum",{enumerable:!0,get:function(){return _ae.isEnum}});var bae=DH();Object.defineProperty(A,"isEqualTo",{enumerable:!0,get:function(){return bae.isEqualTo}});var kae=HH();Object.defineProperty(A,"isRegex",{enumerable:!0,get:function(){return kae.isRegex}});var Rae=$H();Object.defineProperty(A,"isPattern",{enumerable:!0,get:function(){return Rae.isPattern}});var wae=K();Object.defineProperty(A,"generateTypeGuardError",{enumerable:!0,get:function(){return wae.generateTypeGuardError}});var Eae=zH();Object.defineProperty(A,"by",{enumerable:!0,get:function(){return Eae.by}});var Tae=UH();Object.defineProperty(A,"toNumber",{enumerable:!0,get:function(){return Tae.toNumber}});var Cae=BH();Object.defineProperty(A,"toDate",{enumerable:!0,get:function(){return Cae.toDate}});var Iae=GH();Object.defineProperty(A,"toBoolean",{enumerable:!0,get:function(){return Iae.toBoolean}});var Lae=KH();Object.defineProperty(A,"isSymbol",{enumerable:!0,get:function(){return Lae.isSymbol}})});var pa,VH,vae,qH,JH=l(()=>{"use strict";pa=u(require("node:path")),VH=require("node:url"),vae=()=>!0,qH=()=>{if(vae()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?pa.default.dirname(pa.default.resolve(e)):pa.default.dirname(pa.default.resolve(__filename))}return pa.default.dirname((0,VH.fileURLToPath)(__agentWitchImportMetaUrl))}});var qk,YH,V,XH,xae,Ur,Jk,x,Zc,Jt,Yk,Qc,ms,Xk,Zk,Qk,ed,Ie,gn,Yf,lt,Xf,z,eR=l(()=>{"use strict";qk=u(require("node:fs")),YH=u(require("node:os")),V=u(require("node:path")),XH=u(da());Ge();JH();Hc();Hc();xae=qH(),Ur=e=>e.trim().toLowerCase(),Jk=e=>Ur(e).replace(/@/g,"-at-").replace(/\./g,"-").replace(/[^a-z0-9-]+/g,"-").replace(/^-+|-+$/g,""),x=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return V.default.resolve(e);let t=V.default.resolve(xae),r=V.default.basename(t),o=V.default.basename(V.default.dirname(t));return r===tk&&(o===Fr||o===So)?V.default.dirname(t):r===Fr||r===So?t:V.default.join(YH.default.homedir(),Fr)},Zc=(e=x())=>V.default.join(e,tk),Jt=(e=x())=>V.default.join(Zc(e),sD),Yk=(e,t,r)=>t!==null?V.default.join(e,yt,t,r):V.default.join(e,r),Qc=e=>Yk(e.installDir,e.profileEmail,Nc),ms=e=>Yk(e.installDir,e.profileEmail,gr),Xk=e=>V.default.join(e.logsDir,is),Zk=e=>V.default.join(e.logsDir,as),Qk=e=>Yk(e.installDir,e.profileEmail,Dc),ed=e=>e.profileEmail!==null?V.default.join(e.installDir,yt,e.profileEmail,pn):V.default.join(e.installDir,pn),Ie=(e=x())=>ls(e),gn=(e=x())=>un(e)?Fg:Hg,Yf=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return Ur(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?Ur(t):null},lt=(e=x())=>{let t=V.default.join(e,ek);if(!qk.default.existsSync(t))return null;try{let r=JSON.parse(qk.default.readFileSync(t,"utf8"));if((0,XH.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return Ur(r.email)}catch{return null}return null},Xf=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?Ur(r):null}let t=Yf();return t!==null?t:lt()},z=e=>{let t=x(),r=Zc(t),o=Jt(t),n=Xf(e);if(n!==null){let y=V.default.join(t,yt,n),h=V.default.join(y,$g),S=V.default.join(y,Nc),E=V.default.join(y,ss.projectDataDir),I=V.default.join(y,gr),f=V.default.join(y,Dc),w=V.default.join(y,pn),W=V.default.join(y,gr,is),_=V.default.join(y,gr,as);return{profileEmail:n,installDir:t,appDir:r,appBundlePath:o,projectsDir:S,projectDataDir:E,logsDir:I,mainLogPath:W,errorLogPath:_,reportsDir:f,deviceKeypairPath:w,configPath:V.default.join(y,"config.json"),harnessRootDir:h,harnessManifestPath:V.default.join(h,Ug),harnessSetsDir:V.default.join(h,zg)}}let s=V.default.join(t,$g),i=V.default.join(t,Nc),a=V.default.join(t,ss.projectDataDir),c=V.default.join(t,gr),d=V.default.join(t,Dc),p=V.default.join(t,pn),m=V.default.join(t,gr,is),g=V.default.join(t,gr,as);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:o,projectsDir:i,projectDataDir:a,logsDir:c,mainLogPath:m,errorLogPath:g,reportsDir:d,deviceKeypairPath:p,configPath:V.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:V.default.join(s,Ug),harnessSetsDir:V.default.join(s,zg)}}});var ua,tR=l(()=>{"use strict";ua=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535});var Wae,ma,rR=l(()=>{"use strict";Wae=e=>{let t=e?.trim();if(t===void 0||!/^\d+$/.test(t))return null;let r=Number.parseInt(t,10);return r>0&&r<=65535?r:null},ma=e=>e.filePort??Wae(e.envValue)??e.defaultPort});var oR,ZH,Oae,td,ga,QH=l(()=>{"use strict";oR=u(require("node:fs")),ZH=u(require("node:path"));Ge();eR();tR();rR();Oae=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),td=e=>{let t=ZH.default.join(e,Mc.wakePort);if(!oR.default.existsSync(t))return null;try{let r=JSON.parse(oR.default.readFileSync(t,"utf8"));if(Oae(r)&&ua(r.wakePort))return r.wakePort}catch{return null}return null},ga=(e=x())=>ma({filePort:td(e),envValue:process.env.AGENT_WITCH_WAKE_PORT,defaultPort:gn(e)})});var nR={};Mt(nR,{isAgentWitchLocalInstallDir:()=>un,isValidAgentWitchWakePort:()=>ua,readActiveProfileEmailFromFile:()=>lt,readAgentWitchWakePortFromFile:()=>td,resolveActiveProfileEmail:()=>Xf,resolveActiveProfileEmailFromEnv:()=>Yf,resolveAgentWitchAppBundlePath:()=>Jt,resolveAgentWitchAppDir:()=>Zc,resolveAgentWitchDefaultWakePort:()=>gn,resolveAgentWitchDeviceKeypairPath:()=>ed,resolveAgentWitchErrorLogPath:()=>Zk,resolveAgentWitchInstallDir:()=>x,resolveAgentWitchLaunchAgentPrefix:()=>Ie,resolveAgentWitchLocalLayout:()=>z,resolveAgentWitchLogsDir:()=>ms,resolveAgentWitchMainLogPath:()=>Xk,resolveAgentWitchProjectsDir:()=>Qc,resolveAgentWitchReportsDir:()=>Qk,resolveAgentWitchRuntimeWakePort:()=>ga,resolveAgentWitchWakePortFromSources:()=>ma,sanitizeProfileEmailForDir:()=>Ur,sanitizeProfileEmailForLaunchAgentLabel:()=>Jk});var Q=l(()=>{"use strict";eR();tR();QH();rR()});var sR,iR,Zf=l(()=>{"use strict";sR=new Set(["","loginwindow","_mbsetupuser","root"]),iR=5e3});var eF,jae,tF,aR,lR=l(()=>{"use strict";eF=require("node:child_process");Zf();jae=e=>e.trim().toLowerCase(),tF=e=>e==null?!1:!sR.has(jae(e)),aR=()=>{if(process.platform!=="darwin")return null;try{let t=(0,eF.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return tF(t)?t:null}catch{return null}}});var oF,rF,yr,rd=l(()=>{"use strict";oF=u(require("node:os"));lR();rF=e=>e.trim().toLowerCase(),yr=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?aR():e.consoleUsername;if(r===null)return!1;let o=e?.currentUsername??oF.default.userInfo().username;return rF(r)===rF(o)}});var nF,sF,gs,iF=l(()=>{"use strict";nF=require("node:child_process"),sF=u(require("node:fs"));Q();rd();gs=(e=x())=>{let t=Jt(e);if(!sF.default.existsSync(t))return{ok:!1,errorMessage:"AgentWitch install not found."};if(!yr())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=lt(e),o={...process.env};return r!==null&&(o.AGENT_WITCH_PROFILE=r),(0,nF.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:o}).unref(),{ok:!0}}});var cR,Yt,fa,aF=l(()=>{"use strict";cR="AGENT_WITCH_ALLOW_HOST_SIDE_EFFECTS",Yt=(e=process.env)=>{let t=e.VITEST;return t===void 0||t.length===0?!0:e[cR]==="1"},fa=e=>`Refusing ${e} host side effects under VITEST (set ${cR}=1 to override).`});var fs=l(()=>{"use strict";aF()});var lF,od,Qf=l(()=>{"use strict";lF=require("node:child_process");fs();od=e=>{if(process.platform!=="darwin"||!Yt())return;let t=process.getuid?.();if(t!==void 0)try{(0,lF.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var ey,dR,cF,ke,ty,nd=l(()=>{"use strict";ey=u(require("node:fs")),dR=u(require("node:path"));Q();Ge();cF=e=>{let t=dR.default.join(e,yt);return ey.default.existsSync(t)?ey.default.readdirSync(t).filter(r=>ey.default.statSync(dR.default.join(t,r)).isDirectory()).map(r=>Ur(r)).toSorted():[]},ke=(e=x())=>{let t=Ie(e),r=cF(e);return[{profileEmail:lt(e)??r[0]??null,launchAgentLabel:t}]},ty=(e=x())=>cF(e)});var pR,dF,pF,Mae,Po,ry=l(()=>{"use strict";pR=u(require("node:fs")),dF=u(require("node:os")),pF=u(require("node:path"));Q();nd();Mae=()=>pF.default.join(dF.default.homedir(),"Library","LaunchAgents"),Po=(e=x())=>{let t=Ie(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let n of ke(e))r.add(n.launchAgentLabel);let o=Mae();if(pR.default.existsSync(o))for(let n of pR.default.readdirSync(o)){if(!n.endsWith(".plist"))continue;let s=n.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var uF,sd,mF=l(()=>{"use strict";Q();Qf();ry();nd();uF=(e=x())=>{let t=new Set(ke(e).map(r=>r.launchAgentLabel));return Po(e).filter(r=>!t.has(r))},sd=(e=x())=>{for(let t of uF(e))od(t)}});var id,uR=l(()=>{"use strict";Q();Qf();ry();id=(e=x())=>{for(let t of Po(e))od(t)}});var gF,fF,Nae,ys,yF=l(()=>{"use strict";gF=require("node:child_process"),fF=require("node:util"),Nae=(0,fF.promisify)(gF.execFile),ys=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await Nae("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var hs,Dae,mR,gR=l(()=>{"use strict";hs=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Dae=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,mR=e=>{let t=e.pathValue??Dae(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${hs(e.launchAgentLabel)}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${hs(e.runPath)}</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${hs(e.installDir)}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>${hs(e.homeDir)}</string>
    <key>PATH</key>
    <string>${hs(t)}</string>
    <key>AGENT_WITCH_HOME</key>
    <string>${hs(e.installDir)}</string>
    <key>AGENT_WITCH_WAKE_PORT</key>
    <string>${hs(String(e.wakePort))}</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>ThrottleInterval</key>
  <integer>10</integer>
</dict>
</plist>
`}});var oy,fR=l(()=>{"use strict";oy=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var ad,yR,ny,sy,Ao,iy=l(()=>{"use strict";ad=u(require("node:fs")),yR=u(require("node:os")),ny=u(require("node:path"));Ge();Q();gR();fR();sy=(e,t=yR.default.homedir())=>ny.default.join(t,"Library","LaunchAgents",`${e}.plist`),Ao=e=>{let t=e.installDir??x(),r=e.homeDir??yR.default.homedir(),o=sy(e.launchAgentLabel,r),n=ad.default.existsSync(o)?ad.default.readFileSync(o,"utf8"):null;if(n!==null&&oy(n))return{ok:!0,rewritten:!1,plistPath:o};let s=mR({launchAgentLabel:e.launchAgentLabel,runPath:ny.default.join(t,Dg,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??ga(t)});if(!oy(s))return{ok:!1,rewritten:!1,plistPath:o,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{ad.default.mkdirSync(ny.default.dirname(o),{recursive:!0}),ad.default.writeFileSync(o,s,"utf8")}catch(i){let a=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:o,errorMessage:a}}return{ok:!0,rewritten:!0,plistPath:o}}});var SF,PF,AF,ld,Hae,Fae,hF,ct,hR=l(()=>{"use strict";SF=require("node:child_process"),PF=u(require("node:fs")),AF=require("node:util");Q();fs();iy();rd();ld=(0,AF.promisify)(SF.execFile),Hae=async e=>{try{return await ld("launchctl",["print",e]),!0}catch{return!1}},Fae=async(e,t,r)=>{await Hae(t)&&await ld("launchctl",["bootout",t]).catch(()=>{}),await ld("launchctl",["bootstrap",e,r]),await ld("launchctl",["enable",t])},hF=async e=>{try{return await ld("launchctl",["kickstart","-k",e]),!0}catch{return!1}},ct=async(e,t=x())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!Yt())return{ok:!1,errorMessage:fa("launchctl")};if(!yr())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let o=`gui/${r}`,n=`${o}/${e}`,s=Ao({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await hF(n))return{ok:!0};let i=s.plistPath;if(!PF.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await Fae(o,n,i),await hF(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"launchctl bootstrap failed."}}}});var Ss,_F=l(()=>{"use strict";Q();hR();nd();Ss=async(e=x(),t=process.platform)=>{if(t!=="darwin")return[];let r=[];for(let o of ke(e))(await ct(o.launchAgentLabel,e)).ok&&r.push(o.launchAgentLabel);return r}});var ay,ya,bF,kF,RF,wF=l(()=>{"use strict";ay=require("node:child_process"),ya=u(require("node:fs")),bF="EnvironmentVariables.AGENT_WITCH_WAKE_PORT",kF=e=>{try{return(0,ay.execFileSync)("plutil",["-extract",bF,"raw","-o","-",e],{encoding:"utf8",stdio:["ignore","pipe","ignore"]}).trim()}catch{return null}},RF=(e,t)=>{let r=`${e}.${String(process.pid)}.wake-port.tmp`,{mode:o}=ya.default.statSync(e);try{ya.default.copyFileSync(e,r),(0,ay.execFileSync)("plutil",["-replace",bF,"-string",String(t),r],{stdio:"ignore"}),(0,ay.execFileSync)("plutil",["-lint","-s",r],{stdio:"ignore"}),ya.default.chmodSync(r,o&4095),ya.default.renameSync(r,e)}finally{ya.default.rmSync(r,{force:!0})}}});var EF,TF=l(()=>{"use strict";Q();EF=e=>ua(e.filePort)?e.plistValue===null?{kind:"skip-no-entry"}:e.plistValue.trim()===String(e.filePort)?{kind:"noop"}:{kind:"sync",wakePort:e.filePort}:{kind:"skip-invalid"}});var CF,IF,$ae,cd,LF=l(()=>{"use strict";CF=u(require("node:fs")),IF=u(require("node:os"));wF();TF();iy();$ae=(e,t)=>{let r=EF({filePort:t,plistValue:kF(e)});return r.kind!=="sync"?!1:(RF(e,r.wakePort),!0)},cd=e=>{let t=e.homeDir??IF.default.homedir();return[e.launchAgentPrefix,`${e.launchAgentPrefix}-wake`,`${e.launchAgentPrefix}-live`].map(o=>sy(o,t)).filter(o=>CF.default.existsSync(o)).filter(o=>$ae(o,e.wakePort))}});var Dt,_o,vF=l(()=>{"use strict";uR();rd();Zf();Dt=e=>{yr()||(id(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},_o=(e,t=iR)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{yr()||e()},t);return()=>{clearInterval(r)}}});var Ae=l(()=>{"use strict";PD();iF();Qf();mF();uR();ry();rd();yF();_F();hR();iy();fR();LF();gR();nd();lR();Zf();vF()});var SR=l(()=>{"use strict";Ae()});var dd,xF,ly,WF,ha,OF,jF,fn=l(()=>{"use strict";dd=".agent-witch",xF="memory",ly="project.json",WF="chunks.ndjson",ha="runs.ndjson",OF="reports",jF=".json"});var MF=l(()=>{"use strict";fn()});var NF,cy,PR=l(()=>{"use strict";NF=u(require("node:path"));MF();cy=(e,t)=>NF.default.join(e.trim(),`${t.trim()}${jF}`)});var pd,DF,HF=l(()=>{"use strict";pd="agent-witch.js",DF="command"});var dy=l(()=>{"use strict";HF()});var Ps,FF,$F=l(()=>{"use strict";dy();Ps=e=>`'${e.replace(/'/g,"'\\''")}'`,FF=e=>{let t=`${e.installDir.trim()}/${"app"}/${pd}`,r=[Ps("node"),Ps(t),"report","write","--key",Ps(e.reportKey.trim()),"--agent-run-id",Ps(e.agentRunId.trim()),"--status",Ps(e.status),"--summary",Ps(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",Ps(e.details.trim())),r.join(" ")}});var Br,zF,zae,AR,py=l(()=>{"use strict";PR();$F();Br={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},zF=e=>e===Br.COMPLETED||e===Br.FAILED,zae=e=>["Maintain a machine-readable job report so the user can check status later.","AgentWitch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),AR=(e,t)=>{let r=cy(t.reportsDir,t.reportKey),o=FF({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:Br.IN_PROGRESS,summary:"Task started on your computer."});return`${e.trim()}

---
${zae({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:o})}`}});var dt=l(()=>{"use strict";Ge();Q()});var md,BF,UF,GF,Uae,Sa,Bae,KF,gd,fd,_R,VF,qF,yd=l(()=>{"use strict";md=u(require("node:fs")),BF=u(require("node:path"));py();PR();dt();UF=50,GF=e=>{let t=z(),r=cy(t.reportsDir,e);return md.default.mkdirSync(BF.default.dirname(r),{recursive:!0}),r},Uae=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},Sa=e=>{let t=GF(e);if(!md.default.existsSync(t))return null;try{let r=JSON.parse(md.default.readFileSync(t,"utf8"));return Uae(r)?r:null}catch{return null}},Bae=(e,t)=>{let r=[...e,t];return r.length>UF?r.slice(r.length-UF):r},KF=e=>{let t=GF(e.reportKey);md.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},gd=e=>{let t=Sa(e.reportKey),r=new Date().toISOString(),o={at:r,status:e.status,summary:e.userSummary.trim()},n={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:Bae(t?.history??[],o)};return KF(n),n},fd=e=>{let t=Sa(e.reportKey);return t!==null?t:gd({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Br.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},_R=(e,t)=>{let r=t.trim();if(r.length===0)return Sa(e);let o=Sa(e);if(o===null)return null;let n=o.details!==void 0&&o.details.trim().length>0?`${o.details.trim()}
${r}`:r,s={...o,updatedAt:new Date().toISOString(),details:n};return KF(s),s},VF=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},qF=e=>{if(e===null||!zF(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===Br.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var Gae,Kae,hd,JF,uy,bR=l(()=>{"use strict";py();yd();Gae=new Set(Object.values(Br)),Kae=e=>Gae.has(e),hd=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let o=e[r+1];return typeof o=="string"&&o.trim().length>0?o.trim():void 0},JF=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},uy=e=>{if(e[0]!=="write")return JF(),1;let r=hd(e,"--key"),o=hd(e,"--agent-run-id"),n=hd(e,"--status"),s=hd(e,"--summary"),i=hd(e,"--details");return r===void 0||o===void 0||n===void 0||s===void 0||!Kae(n)?(JF(),1):(gd({reportKey:r,agentRunId:o,status:n,userSummary:s,details:i}),0)}});var Ht,As=l(()=>{"use strict";Ht=()=>!0});var kR,YF,_s,my=l(()=>{"use strict";kR=u(require("node:path")),YF=require("node:url");As();_s=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=kR.default.resolve(t);return Ht()?r===kR.default.resolve(__filename):e===void 0?!1:r===(0,YF.fileURLToPath)(e)}});var RR,wR,ER,TR,Me,CR=l(()=>{"use strict";RR=["block","warn","info"],wR=["seed","project","retired"],ER="warn",TR="29b404a2-d2be-45bf-8f88-143b675a94f2",Me={symptom:120,cause:200,avoidance:280,checkValue:280,keyword:40,keywords:24,tag:32,tags:12,id:64}});var IR,bo,e$,t$,LR,yn,r$=l(()=>{"use strict";CR();IR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),bo=e=>typeof e=="string"?e:null,e$=e=>Array.isArray(e)?e.filter(t=>typeof t=="string"):[],t$=e=>{if(!IR(e))return null;let t=bo(e.id)?.trim()??"",r=bo(e.symptom)?.trim()??"";if(t.length===0||r.length===0)return null;let o=wR.find(d=>d===e.source)??"project",n=RR.find(d=>d===e.severity)??ER,s=IR(e.check)?e.check:null,i=s?.kind==="command"?"command":"id",a=bo(s?.value)?.trim()??"",c=bo(e.projectId)?.trim()??null;return{id:t,projectId:c!==null&&c.length>0?c:null,symptom:r,cause:bo(e.cause)?.trim()??"",avoidance:bo(e.avoidance)?.trim()??"",check:{kind:i,value:a.length>0?a:t},keywords:e$(e.keywords),tags:e$(e.tags),source:o,overridesSeed:e.overridesSeed===!0,hitCount:typeof e.hitCount=="number"&&Number.isFinite(e.hitCount)?Math.max(0,Math.floor(e.hitCount)):0,lastSeenAt:bo(e.lastSeenAt),updatedAt:bo(e.updatedAt),severity:n}},LR=e=>!IR(e)||!Array.isArray(e.pitfalls)?null:{items:e.pitfalls.map(t=>t$(t)).filter(t=>t!==null),syncedAt:bo(e.syncedAt)},yn=e=>e.filter(t=>t.source!=="retired").length});var bs,vR=l(()=>{"use strict";bs=e=>e.replace(/\s+/g," ").trim()});var hr,xR=l(()=>{"use strict";hr=e=>Math.ceil(e.length/4)});var gy,o$=l(()=>{"use strict";xR();gy=(e,t)=>{if(t<=0)return"";if(hr(e)<=t)return e;let r=t*4;return e.slice(0,r).trimEnd()}});var Sd,n$=l(()=>{"use strict";vR();Sd=e=>`${bs(e.id)}|${bs(e.avoidance)}`});var s$=l(()=>{"use strict"});var ht=l(()=>{"use strict";CR();r$();vR();xR();o$();n$();s$()});var ks,Pa,Aa,_a,Pd,fy,i$,a$,l$,c$,d$,Ad,_d,yy,ba,hy,WR,Sr=l(()=>{"use strict";ks="agent-witch-token-saver",Pa=`# BEGIN ${ks}`,Aa=`# END ${ks}`,_a=`<!-- BEGIN ${ks} -->`,Pd=`<!-- END ${ks} -->`,fy=".cursor/rules/agent-witch-check-context.mdc",i$=".cursor/mcp.json",a$=".codex/config.toml",l$=".codex/AGENTS.md",c$=".claude/settings.json",d$="declined-projects.json",Ad="agent-witch",_d="agent-witch",yy=["mcp"],ba="mcp-hook",hy="check_context",WR=`${_d} ${ba} ${hy}`});var Sy,Py,Ay,ka,OR,bd,_y=l(()=>{"use strict";ht();Sr();Sy=Me.symptom,Py=Me.cause,Ay=Me.avoidance,ka=64,OR="token-saver.db",bd=1});var by,Ra,Yae,vTe,wa=l(()=>{"use strict";by="agent-witch.js",Ra="deps.tar.gz",Yae="install.sh",vTe={mainScript:`app/${by}`,depsArchive:`app/${Ra}`,installShell:Yae}});var p$=l(()=>{"use strict";wa()});var u$=l(()=>{"use strict";wa();p$()});var kd,MR,ky,Xae,Rd,ze,Ta,wd,Ed,Rs,NR=l(()=>{"use strict";kd=u(require("node:fs")),MR=u(require("node:path"));u$();Q();ky="install-version.json",Xae=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Rd=(e=x())=>MR.default.join(e,ky),ze=(e=x())=>{let t=Rd(e);if(!kd.default.existsSync(t))return null;try{let r=JSON.parse(kd.default.readFileSync(t,"utf8"));return!Xae(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},Ta=(e,t=x())=>{let r=Rd(t);kd.default.mkdirSync(MR.default.dirname(r),{recursive:!0}),kd.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},wd=(e=x())=>ze(e)?.bundleVersion??"275",Ed=(e,t)=>{let r=ze(e);if(r!==null)return r;let o={bundleVersion:"275",appOrigin:t,updatedAt:new Date().toISOString()};return Ta(o,e),o},Rs=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),o=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(o)?o>r:e!==t}});var m$,ws,DR,HR,FR,Ry,Gr,Es,$R=l(()=>{"use strict";m$=require("node:crypto"),ws=u(require("node:fs")),DR=u(require("node:path"));Q();HR="self-update-log.ndjson",FR=100,Ry=(e=x())=>{let t=z(),r=t.installDir===e?t.logsDir:ms({installDir:e,profileEmail:t.profileEmail});return DR.default.join(r,HR)},Gr=(e,t=x())=>{let r={id:(0,m$.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},o=Ry(t);ws.default.mkdirSync(DR.default.dirname(o),{recursive:!0});let n=ws.default.existsSync(o)?ws.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-FR+1)),JSON.stringify(r)];return ws.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},Es=(e=20,t=x())=>{let r=Ry(t);if(!ws.default.existsSync(r))return[];let o=ws.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=n.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return o.slice(Math.max(0,o.length-e))}});var zR,qTe,UR=l(()=>{"use strict";wa();zR="deps",qTe=`${"app"}/${Ra}`});var g$=l(()=>{"use strict";UR()});var f$,hn,Ts,y$,BR,GR,h$=l(()=>{"use strict";f$=require("node:child_process"),hn=u(require("node:fs")),Ts=u(require("node:path"));wa();UR();y$=e=>Ts.default.join(e,"app",zR),BR=e=>{let t=Ts.default.join(e,"app"),r=Ts.default.join(t,Ra);hn.default.existsSync(r)&&(hn.default.rmSync(y$(e),{recursive:!0,force:!0}),hn.default.mkdirSync(t,{recursive:!0}),(0,f$.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),hn.default.rmSync(r,{force:!0}))},GR=e=>{hn.default.rmSync(Ts.default.join(e,"node_modules"),{recursive:!0,force:!0}),hn.default.rmSync(Ts.default.join(e,"package.json"),{force:!0}),hn.default.rmSync(Ts.default.join(e,"package-lock.json"),{force:!0})}});var S$=l(()=>{"use strict";g$();h$()});var Zt,Ca=l(()=>{"use strict";Zt=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var Td,wy,P$,Zae,KR,Qae,A$,ele,JR,tle,YR,Qt,Cd,Id,XR,VR,qR,Ld,Ia,ZR,QR,La=l(()=>{"use strict";Td=u(require("node:fs")),wy=u(require("node:path"));Ca();P$="active-writer-work.json",Zae=1440*60*1e3,KR=new Set,Qae=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),A$=e=>e.profileEmail===null?wy.default.join(e.installDir,P$):wy.default.join(e.installDir,"profiles",e.profileEmail,P$),ele=e=>{let t=A$(e);if(!Td.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse(Td.default.readFileSync(t,"utf8"));if(!Qae(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string")return{activeCount:0,updatedAt:new Date(0).toISOString()};let o=Math.max(0,Math.floor(r.activeCount)),n=typeof r.ownerPid=="number"&&Number.isInteger(r.ownerPid)?r.ownerPid:void 0;return{activeCount:o,updatedAt:r.updatedAt,...n!==void 0?{ownerPid:n}:{}}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},JR=(e,t)=>{let r=A$(e);Td.default.mkdirSync(wy.default.dirname(r),{recursive:!0}),Td.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},tle=(e,t={})=>{if(e.activeCount<=0)return!1;let r=t.isPidAlive??Zt;if(e.ownerPid!==void 0&&!r(e.ownerPid))return!0;let o=Date.parse(e.updatedAt);return Number.isNaN(o)?!0:(t.nowMs??Date.now())-o>Zae},YR=e=>{let t=ele(e);if(!tle(t))return t;let r={activeCount:0,updatedAt:new Date().toISOString()};try{JR(e,r)}catch{}return r},Qt=e=>YR(e).activeCount>0,Cd=e=>{let t=YR(e);JR(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString(),ownerPid:process.pid})},Id=e=>{let t=YR(e),r=Math.max(0,t.activeCount-1);if(JR(e,{activeCount:r,updatedAt:new Date().toISOString(),ownerPid:process.pid}),r===0)for(let o of KR)o()},XR=e=>(KR.add(e),()=>{KR.delete(e)}),VR=null,qR=null,Ld=e=>{VR=e},Ia=e=>{qR=e},ZR=()=>{let e=VR;return VR=null,e},QR=()=>{let e=qR;return qR=null,e}});var et,Ey=l(()=>{"use strict";et=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var _$=l(()=>{"use strict";sa()});var Ty,Cy,Iy=l(()=>{"use strict";Ty="AGENT_WITCH_EXTERNAL_BRIDGE",Cy="AGENT_WITCH_EXTERNAL_LIVE"});var b$=l(()=>{"use strict";Iy();sa()});var k$,vd,R$=l(()=>{"use strict";k$=require("node:child_process");sa();vd=()=>new Promise((e,t)=>{if(process.platform!=="linux"){e();return}let r=(0,k$.spawn)("systemctl",["--user","restart",$r],{stdio:"ignore"});r.on("error",o=>{t(o)}),r.on("close",o=>{if(o===0){e();return}t(new Error(`systemctl --user restart ${$r} exited ${o??"unknown"}`))})})});var ew=l(()=>{"use strict";sa();_$();b$();R$()});var tw,rw,w$,ole,ow,nw,nle,sle,ile,ale,xd,sw=l(()=>{"use strict";tw=require("node:child_process"),rw=u(require("node:fs")),w$=u(require("node:path"));ew();Ae();Q();Ge();ole="[agent-witch] Restarting into bundle",ow=null,nw=e=>{ow=e},nle=()=>process.platform==="linux"&&typeof process.env.INVOCATION_ID=="string"&&process.env.INVOCATION_ID.length>0,sle=e=>w$.default.join(e,Dg,"run.sh"),ile=e=>{let t=sle(e);if(rw.default.existsSync(t)){let n=process.platform==="linux"?"setsid":t,s=process.platform==="linux"?[t]:[];return(0,tw.spawn)(n,s,{cwd:e,detached:!0,stdio:"ignore",env:process.env}).unref(),{ok:!0}}let r=Jt(e);return rw.default.existsSync(r)?((0,tw.spawn)(process.execPath,[r],{cwd:e,detached:!0,stdio:"ignore",env:process.env}).unref(),{ok:!0}):{ok:!1,errorMessage:"AgentWitch install bundle entrypoint is missing."}},ale=async()=>{ow!==null&&await ow()},xd=async e=>{let t=e.exitProcess??(o=>process.exit(o));if(console.log(`${ole} ${e.bundleVersion}`),await ale(),process.platform==="darwin"){sd();let o=await Ss(e.installDir);if(o.length>0)return t(0),{ok:!0,mode:"launchd",message:`Restarted LaunchAgent(s): ${o.join(", ")}.`}}if(process.platform==="linux"&&nle())try{return await vd(),t(0),{ok:!0,mode:"systemd",message:"Restarted agent-witch.service systemd user unit."}}catch(o){let n=o instanceof Error?o.message:String(o);console.warn(`[agent-witch] systemd restart after bundle update failed: ${n}`)}let r=ile(e.installDir);return r.ok?(t(0),{ok:!0,mode:"detached-relaunch",message:"Relaunched AgentWitch host process."}):{ok:!1,mode:"skipped",message:r.errorMessage??"Could not relaunch AgentWitch after bundle update."}}});var va,Ly,Wd,iw=l(()=>{"use strict";va="qwen2.5:7b",Ly="nomic-embed-text",Wd="Install Ollama from https://ollama.com/download"});var Od,aw,vy=l(()=>{"use strict";iw();Od=()=>`
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
    echo "Ollama is missing. ${Wd}" >&2
    return 1
  fi
  local ollama_home archive bin
  ollama_home="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
  archive="\${ollama_home}/ollama-darwin.tgz"
  mkdir -p "\${ollama_home}/ollama" "\${HOME}/.local/bin"
  echo "Downloading Ollama for macOS\u2026"
  if ! curl -fL --retry 3 -o "\${archive}" https://github.com/ollama/ollama/releases/latest/download/ollama-darwin.tgz; then
    echo "Could not download Ollama. ${Wd}" >&2
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
  agent_witch_ensure_ollama_model "${va}" "\${pull_log}"
  agent_witch_ensure_ollama_model "${Ly}" "\${pull_log}"
}
`,aw=()=>`
${Od()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. AgentWitch will continue without it." >&2
`});var E$,lle,xy,lw=l(()=>{"use strict";E$=require("node:child_process");Q();fs();vy();lle=e=>new Promise(t=>{if(!Yt()){t({exitCode:1,output:fa("Ollama")});return}let r=(0,E$.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:x()}}),o=[];r.stdout.on("data",n=>{o.push(n)}),r.stderr.on("data",n=>{o.push(n)}),r.on("error",n=>{t({exitCode:1,output:n.message})}),r.on("close",n=>{t({exitCode:n??1,output:Buffer.concat(o).toString("utf8").trim()})})}),xy=async(e=lle)=>{let t=`${Od()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var Sn,Wy,T$,cle,C$,Wa,dle,ple,xa,Cs,Is,I$=l(()=>{"use strict";Sn=u(require("node:fs")),Wy=u(require("node:path"));S$();Q();wa();fr();NR();La();Ey();$R();sw();lw();T$=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),cle=e=>{let t=lt(e),r=t===null?z():z(t);if(!Sn.default.existsSync(r.configPath))return null;try{let o=JSON.parse(Sn.default.readFileSync(r.configPath,"utf8"));return!T$(o)||typeof o.wsUrl!="string"?null:o.wsUrl}catch{return null}},C$=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!T$(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let o=r.scripts.filter(n=>typeof n=="string");return{bundleVersion:r.bundleVersion,scripts:o}},Wa=async e=>(await C$(e))?.bundleVersion??null,dle=async(e,t,r)=>{let o=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!o.ok)throw new Error(`Failed to download ${r}.`);let n=Wy.default.join(t,r);Sn.default.mkdirSync(Wy.default.dirname(n),{recursive:!0});let s=Buffer.from(await o.arrayBuffer());Sn.default.writeFileSync(n,s),r.endsWith(".js")&&Sn.default.chmodSync(n,493)},ple=(e,t)=>e!==null?et(e):t??Nt,xa=(e,t)=>({localBundleVersion:t,...e}),Cs=async e=>{let t=x(),r=ze(t),o=r?.bundleVersion??null,n=await xy();Gr({event:"check_complete",ok:n.ok,message:n.message,localBundleVersion:o,remoteBundleVersion:null});let s=cle(t),i=ple(s,r?.appOrigin);if(i===null){let d=xa({ok:!1,updated:!1,message:"Could not resolve the AgentWitch app origin for updates.",remoteBundleVersion:null},o);return Gr({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}let a=await C$(i);if(a===null){let d=xa({ok:!1,updated:!1,message:"Could not fetch the remote AgentWitch install bundle.",remoteBundleVersion:null},o);return Gr({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}if(!(e?.force===!0||Rs(o,a.bundleVersion))){let d=xa({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},o);return Gr({event:"check_complete",ok:!0,message:d.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),d}try{for(let y of a.scripts)await dle(i,t,y);let d=Wy.default.join(t,by);Sn.default.existsSync(d)&&Sn.default.rmSync(d,{force:!0}),BR(t),GR(t),Ta({bundleVersion:a.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let p=z(lt(t));if(Qt(p)){Ia("install-bundle-update");let y=xa({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:a.bundleVersion},a.bundleVersion);return Gr({event:"update_applied",ok:!0,message:y.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),y}let m=await xd({installDir:t,bundleVersion:a.bundleVersion});m.ok||console.warn(`[agent-witch-self-update] Host restart after bundle update failed: ${m.message}`);let g=xa({ok:!0,updated:!0,message:`Updated AgentWitch bundle ${o??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return Gr({event:"update_applied",ok:!0,message:g.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),g}catch(d){let p=d instanceof Error?d.message:"AgentWitch self-update failed.",m=xa({ok:!1,updated:!1,message:p,remoteBundleVersion:a.bundleVersion},o);return Gr({event:"update_failed",ok:!1,message:p,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),m}},Is=()=>{let e=x();return{local:ze(e),logs:Es(20,e)}}});var L$={};Mt(L$,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>ky,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>Wd,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>Ly,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>va,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>HR,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>FR,appendAgentWitchSelfUpdateLog:()=>Gr,buildAgentWitchEnsureOllamaShell:()=>Od,buildAgentWitchInstallScriptOllama:()=>aw,buildAgentWitchSelfUpdateStatus:()=>Is,ensureAgentWitchInstallVersionRecorded:()=>Ed,ensureAgentWitchOllamaInstalled:()=>xy,fetchAgentWitchRemoteInstallBundleVersion:()=>Wa,isRemoteAgentWitchBundleVersionNewer:()=>Rs,readAgentWitchInstallVersion:()=>ze,readAgentWitchSelfUpdateLogs:()=>Es,resolveAgentWitchAppOriginFromWsUrl:()=>et,resolveAgentWitchHeartbeatInstallBundleVersion:()=>wd,resolveAgentWitchInstallVersionPath:()=>Rd,resolveAgentWitchSelfUpdateLogPath:()=>Ry,runAgentWitchSelfUpdate:()=>Cs,writeAgentWitchInstallVersion:()=>Ta});var Kr=l(()=>{"use strict";NR();$R();I$();Ey();iw();vy();lw()});var cw={};Mt(cw,{buildAgentWitchSelfUpdateStatus:()=>Is,fetchAgentWitchRemoteInstallBundleVersion:()=>Wa,runAgentWitchSelfUpdate:()=>Cs});var dw=l(()=>{"use strict";Kr()});function Oa(e){return(0,v$.createHash)("sha256").update(e.trim()).digest("hex")}var v$,Oy=l(()=>{"use strict";v$=require("node:crypto")});var ja,jd,ule,Ma,pw,jy=l(()=>{"use strict";ja=u(require("node:fs")),jd=u(require("node:path"));Oy();dt();ule=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ma=e=>{if(!ja.default.existsSync(e))return null;try{let t=JSON.parse(ja.default.readFileSync(e,"utf8"));return!ule(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:Oa(t.pairingToken.trim())}catch{return null}},pw=(e=x())=>{let t=[],r=new Set,o=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};o(Ma(jd.default.join(e,"config.json")));let n=jd.default.join(e,yt);if(!ja.default.existsSync(n))return t;for(let s of ja.default.readdirSync(n)){let i=jd.default.join(n,s);ja.default.statSync(i).isDirectory()&&o(Ma(jd.default.join(i,"config.json")))}return t}});var Na,Md=l(()=>{"use strict";Na="connection-health.json"});var Ls,My,mle,Nd,Ue,uw,Ny,tt,Dy=l(()=>{"use strict";Ls=u(require("node:fs")),My=u(require("node:path"));Md();mle=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Nd=e=>e.profileEmail===null?My.default.join(e.installDir,Na):My.default.join(e.installDir,"profiles",e.profileEmail,Na),Ue=e=>{let t=Nd(e);if(!Ls.default.existsSync(t))return null;try{let r=JSON.parse(Ls.default.readFileSync(t,"utf8"));return!mle(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},uw=e=>{let t=Nd(e);Ls.default.existsSync(t)&&Ls.default.rmSync(t,{force:!0})},Ny=(e,t)=>{let r=Nd(e),o=Ue(e),n=new Date().toISOString(),s={lastAckAt:n,wsUrl:t.wsUrl,connectedAt:t.connectedAt??o?.connectedAt??n};Ls.default.mkdirSync(My.default.dirname(r),{recursive:!0}),Ls.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},tt=(e,t,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e.lastAckAt);return Number.isNaN(o)?!0:r-o>t}});var Dd,x$=l(()=>{"use strict";Md();Dy();Dd=(e,t)=>{if(!t.socketOpen)return!1;let r=Ue(e);return r===null?!1:!tt(r,t.staleAfterMs??12e4,t.nowMs)}});var mw,W$=l(()=>{"use strict";Dy();mw=(e,t)=>!(e!==null&&!tt(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var vs=l(()=>{"use strict";Dy();x$();W$();Md()});var Hy,gw,gle,fle,O$,j$=l(()=>{"use strict";Hy=u(require("node:fs")),gw=u(require("node:path"));Q();Ge();vs();jy();gle=12e4,fle=e=>{let t=gw.default.join(e,yt);return Hy.default.existsSync(t)?Hy.default.readdirSync(t).filter(r=>Hy.default.statSync(gw.default.join(t,r)).isDirectory()):[]},O$=(e=x())=>{let t=null,r=-1;for(let o of fle(e)){let n=z(o),s=Ue(n);if(s===null||tt(s,gle))continue;let i=Ma(n.configPath);if(i===null)continue;let a=Date.parse(s.lastAckAt);!Number.isFinite(a)||a<=r||(r=a,t=i)}return t}});var xs,fw=l(()=>{"use strict";xs={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var M$,yle,hle,N$,Sle,yw,D$=l(()=>{"use strict";fw();M$=/you(?:'|')ve hit your session limit/i,yle=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],hle=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,N$=(e,t)=>{for(let r of e.split(/\r?\n/)){let o=r.trim();if(o.length>0&&t.test(o))return o}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},Sle=e=>{let t=hle.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},yw=e=>{let t=e.trim();if(t.length===0)return null;if(M$.test(t))return{code:xs.SESSION_LIMIT,resetHint:Sle(t),matchedLine:N$(t,M$)};for(let r of yle)if(r.test(t))return{code:xs.PROVIDER_QUOTA,resetHint:null,matchedLine:N$(t,r)};return null}});var Fy,$y,hw,Sw=l(()=>{"use strict";Fy="[[AGENT_RUN_WRITER_EXECUTION]]",$y="cli-writer-api-key-missing",hw="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var Pw=l(()=>{"use strict";Sw()});var H$=l(()=>{"use strict";Pw()});var ue,Aw=l(()=>{"use strict";ue={FOLDER_REQUIRED:"folder_required",FOLDER_NOT_REGISTERED:"folder_not_registered",FOLDER_NOT_FOUND:"folder_not_found",FOLDER_CHECK_UNAVAILABLE:"folder_check_unavailable",CODING_TOOLS_PAUSED:"coding_tools_paused"}});var Ws,_w=l(()=>{"use strict";Ws={computerFallback:"This computer",folderNotAllowed:"Blocked: that folder isn't this project's folder on {computer}. Nothing ran.",folderMissing:"This project has no folder on {computer} yet. Set it in AgentWitch Local, then send the task again.",folderMissingReason:"Set this project's folder on {computer} first.",pauseLabel:"Pause all coding tools",pauseHint:"Running tasks stop. New tasks wait until you turn this off.",pauseStatus:"Paused",pauseReason:"Paused on {computer}. Turn it back on in AgentWitch Local.",secretHidden:"Output hidden: it looked like it had a secret. Open the report on {computer}.",folderCheckUnavailablePlaceholder:"Couldn't check this project's folder on {computer}. Nothing ran."}});var _le,Da,Os,F$=l(()=>{"use strict";Aw();_w();_le={[ue.FOLDER_REQUIRED]:"folderMissing",[ue.FOLDER_NOT_FOUND]:"folderMissing",[ue.FOLDER_NOT_REGISTERED]:"folderNotAllowed",[ue.FOLDER_CHECK_UNAVAILABLE]:"folderCheckUnavailablePlaceholder",[ue.CODING_TOOLS_PAUSED]:"pauseReason"},Da=(e,t=Ws.computerFallback)=>Ws[e].replace("{computer}",t),Os=(e,t)=>Da(_le[e],t)});var Vr,z$,$$,ble,bw,U$,kw=l(()=>{"use strict";Vr="[redacted-secret]",z$="[redacted-private-key]",$$="(?!\\[redacted)",ble="(?:[A-Z0-9]+_)*(?:KEY|APIKEY|SECRET|TOKEN|PASSWORD|PASSWD|PAT|CREDENTIALS?)(?:_[A-Z0-9]+)*",bw=[{pattern:/-----BEGIN [A-Z0-9 ]*PRIVATE KEY-----(?:[\s\S]*?-----END [A-Z0-9 ]*PRIVATE KEY-----|[\s\S]*$)/g,replacement:z$},{pattern:new RegExp(`^(\\s*(?:export\\s+)?${ble}\\s*=\\s*)${$$}(["']?)[^\\s"'#]{4,}\\2`,"gm"),replacement:`$1${Vr}`},{pattern:/("?pairing_?token"?\s*[:=]\s*"?)(?!\[redacted)[^\s",}]{6,}/gi,replacement:`$1${Vr}`},{pattern:/\bsk-[A-Za-z0-9_-]{20,}/g,replacement:Vr},{pattern:/\bgithub_pat_[A-Za-z0-9_]{20,}/g,replacement:Vr},{pattern:/\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{20,}\b/g,replacement:Vr},{pattern:/\bxox[a-z]-[A-Za-z0-9-]{10,}/g,replacement:Vr},{pattern:/\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/g,replacement:Vr},{pattern:/\bBearer\s+(?!\[redacted)[A-Za-z0-9\-._~+/]{8,}=*/gi,replacement:`Bearer ${Vr}`},{pattern:new RegExp(`\\b(api[_-]?key|secret|token|password|passwd|credential)(["']?\\s*[:=]\\s*)${$$}(["']?)[^\\s"'\\\\(),;]{8,}\\3`,"gi"),replacement:`$1$2${Vr}`}],U$=[/-----(?:BEGIN|END) [A-Z0-9 ]*PRIVATE KEY-----/,/\bsk-[A-Za-z0-9_-]{20,}/,/\bgithub_pat_[A-Za-z0-9_]{20,}/,/\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{20,}\b/,/\bxox[a-z]-[A-Za-z0-9-]{10,}/,/\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/,/\bBearer\s+(?!\[redacted)[A-Za-z0-9\-._~+/]{12,}/i]});var Hd,Pn,Fd,B$=l(()=>{"use strict";kw();Hd=e=>U$.some(t=>t.test(e)),Pn=e=>{let t={replacements:0},r=bw.reduce((o,n)=>o.replace(n.pattern,(...s)=>{t.replacements+=1;let i=s.slice(1,-2).map(a=>typeof a=="string"?a:"");return n.replacement.replace(/\$(\d)/g,(a,c)=>i[Number(c)-1]??"")}),e);return{scrubbed:r,residualSecret:Hd(r),replacementCount:t.replacements}},Fd=(e,t)=>{let r=Pn(e);return r.residualSecret?t:r.scrubbed}});var St=l(()=>{"use strict";fw();D$();Sw();Pw();H$();Aw();_w();F$();kw();B$()});var $d,G$,K$,zy=l(()=>{"use strict";$d={maxTurns:30,maxMinutes:30,maxBudgetUsd:2},G$=["Read","Glob","Grep","Edit","Write","TodoWrite","Bash(git status *)","Bash(git diff *)","Bash(git log *)","Bash(git show *)"],K$=124});var Rw,V$,Uy,zd,Ud,kle,Rle,wle,q$,Ne,Re,By,Ele,Tle,Cle,er,Pr=l(()=>{"use strict";Rw=u(require("node:fs")),V$=u(require("node:os")),Uy=u(require("node:path"));zy();zd={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},Ud=e=>e.trim().length>0,kle=e=>{let t=Uy.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},Rle=()=>{let e=V$.default.homedir(),t=Uy.default.join(e,".local","bin","agent");if(Rw.default.existsSync(t))return t;let r=Uy.default.join(e,".local","bin","cursor-agent");return Rw.default.existsSync(r)?r:zd.cursorCommand},wle=e=>{let t=e.trim();return!Ud(t)||t===zd.cursorCommand?Rle():t},q$=(e,t)=>kle(e)?t:["agent",...t],Ne=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",Re=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",o=e.cursorCommand??"",n=e.antigravityCommand??"";return{claudeCommand:Ud(t)?t.trim():zd.claudeCommand,codexCommand:Ud(r)?r.trim():zd.codexCommand,cursorCommand:wle(o),antigravityCommand:Ud(n)?n.trim():zd.antigravityCommand}},By=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:q$(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},Ele=["--permission-mode","dontAsk","--allowedTools",G$.join(","),"--max-turns",String($d.maxTurns),"--max-budget-usd",$d.maxBudgetUsd.toFixed(2)],Tle=["-s","workspace-write","-c",'approval_policy="never"'],Cle=["--trust","--sandbox","enabled"],er=(e,t,r,o)=>{let n=t.trim();if(!Ud(n))return null;let s=o?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json",...Ele,n]}:e==="codex"?{command:r.codexCommand,args:["exec",...Tle,n]}:e==="cursor"?{command:r.cursorCommand,args:q$(r.cursorCommand,[...s,"-p",...Cle,n])}:{command:r.antigravityCommand,args:[...s,"--sandbox","-p",n]}}});var An,Ile,js,Lle,Ha,Bd=l(()=>{"use strict";An=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,Ile=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([o,n])=>{if(typeof n!="object"||n===null)return{name:o,total:0};let s=n;return{name:o,total:An(s.inputTokens)+An(s.outputTokens)+An(s.cacheReadInputTokens)+An(s.cacheCreationInputTokens)}})].sort((o,n)=>n.total-o.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},js=e=>{let t=e.trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");if(r<0||o<=r)return null;let n;try{n=JSON.parse(t.slice(r,o+1))}catch{return null}if(typeof n!="object"||n===null)return null;let s=n;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let a=i,c=An(a.input_tokens)+An(a.cache_creation_input_tokens)+An(a.cache_read_input_tokens),d=An(a.output_tokens),p=c+d;return p<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:p,model:Ile(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},Lle=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),Ha=(e,t)=>{let r=js(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??Lle(r)}}});var ww,vle,xle,Ew,Tw=l(()=>{"use strict";ww=e=>e.toLocaleString("en-US"),vle=e=>e<.01?e.toFixed(4):e.toFixed(3),xle=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${vle(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 AgentWitch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${ww(e.inputTokens)} in / ${ww(e.outputTokens)} out (${ww(e.totalTokens)} total)`,t].join(`
`)},Ew=(e,t)=>{if(t===void 0)return e;let r=xle(t);if(e.includes("\u2014 AgentWitch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var Gy,Cw=l(()=>{"use strict";Gy={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var Ms,Iw,Ky,Lw=l(()=>{"use strict";Cw();Ms="auto",Iw=e=>({value:Ms,label:`Auto (${Gy[e]})`}),Ky={anthropic:[Iw("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[Iw("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[Iw("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var Fa,Gd,Vy,$a=l(()=>{"use strict";Cw();Lw();Fa=e=>{let t=e?.trim()??"";if(!(t.length===0||t===Ms))return t},Gd=(e,t)=>{let r=Fa(t);return r===void 0?Gy[e]:r},Vy=e=>{let t=Fa(e);return t===void 0?Ms:t}});var qy,Wle,Ole,Jy,J$=l(()=>{"use strict";qy={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},Wle=e=>{let t=qy[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?qy["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?qy["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?qy["gemini-2.0-flash"]:null},Ole=(e,t,r)=>{let o=Wle(e);if(o===null)return null;let n=t/1e6*o.inputUsd,s=r/1e6*o.outputUsd;return n+s},Jy=e=>{let t=Ole(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var za,jle,Mle,Nle,Yy,Y$=l(()=>{"use strict";J$();za=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),jle=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=za(r.input_tokens),n=za(r.output_tokens);return o===0&&n===0?null:Jy({provider:"anthropic",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},Mle=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=za(r.prompt_tokens),n=za(r.completion_tokens);return o===0&&n===0?null:Jy({provider:"openai",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},Nle=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let o=za(r.promptTokenCount),n=za(r.candidatesTokenCount);return o===0&&n===0?null:Jy({provider:"google",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},Yy=(e,t,r)=>e==="anthropic"?jle(t,r):e==="openai"?Mle(t,r):Nle(t,r)});var Dle,vw,Hle,Fle,$le,zle,Ule,xw,Ww=l(()=>{"use strict";$a();Y$();Dle=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let o=r;return o.type==="text"&&typeof o.text=="string"?o.text:""}).join(""):""},vw=(e,t,r)=>{let o=r?.trim()??"";return o.length>0?o:Gd(e,t.model)},Hle=async e=>{let t=vw("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Anthropic API error (${String(r.status)})`};let n=Dle(o);n.length>0&&e.onChunk?.(n);let s=Yy("anthropic",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},Fle=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.message;return typeof o?.content=="string"?o.content:""},$le=async e=>{let t=vw("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`OpenAI API error (${String(r.status)})`};let n=Fle(o);n.length>0&&e.onChunk?.(n);let s=Yy("openai",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},zle=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.content?.parts;return Array.isArray(o)?o.map(n=>{if(typeof n!="object"||n===null)return"";let s=n.text;return typeof s=="string"?s:""}).join(""):""},Ule=async e=>{let t=vw("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,o=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),n=await o.json().catch(()=>null);if(!o.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Google API error (${String(o.status)})`};let s=zle(n);s.length>0&&e.onChunk?.(s);let i=Yy("google",n,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},xw=async e=>{try{return e.provider==="anthropic"?await Hle(e):e.provider==="openai"?await $le(e):await Ule(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var Ft,Kd=l(()=>{"use strict";Ft=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var X$,Ble,Xy,Ow=l(()=>{"use strict";X$=u(require("node:path")),Ble="writer-api-secrets.json",Xy=e=>X$.default.join(e,Ble)});var jw,Z$,Gle,_n,Et,bn=l(()=>{"use strict";jw=u(require("node:fs"));$a();Ow();Z$=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Gle=e=>{if(!Z$(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,o=Fa(r);return{apiKey:t,...o!==void 0?{model:o}:{}}},_n=e=>{let t=Xy(e);if(!jw.default.existsSync(t))return{};try{let r=JSON.parse(jw.default.readFileSync(t,"utf8"));if(!Z$(r))return{};let o={},n=["anthropic","openai","google"];for(let s of n){let i=Gle(r[s]);i!==null&&(o[s]=i)}return o}catch{return{}}},Et=(e,t)=>_n(e)[t]??null});var pt,Vd=l(()=>{"use strict";pt=e=>e==="api"?"api":"cli"});var Q$,ot,Ns,ko=l(()=>{"use strict";Q$=u(require("node:path"));Kd();bn();Vd();ot=e=>Q$.default.dirname(e),Ns=(e,t)=>{if(pt(e.writerExecutionBackend)!=="api")return!1;let r=Ft(t);if(r===null)return!1;let o=ot(e.layout.configPath),n=Et(o,r);return n!==null&&n.apiKey.length>0}});var qd,Mw=l(()=>{"use strict";Tw();Ww();Kd();bn();ko();qd=async(e,t,r,o)=>{let n=r.trim();if(n.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=Ft(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=ot(e.layout.configPath),a=Et(i,s);if(a===null){let d=Object.keys(_n(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in AgentWitch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await xw({provider:s,secret:a,prompt:n,onChunk:o});return{exitCode:c.exitCode,output:Ew(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var Kle,ez,tz,rz=l(()=>{"use strict";Kle={paused:!1,updatedAt:null},ez={paused:!0,updatedAt:null},tz=e=>{if(e===null)return Kle;try{let t=JSON.parse(e);if(typeof t!="object"||t===null||typeof t.paused!="boolean")return ez;let r=t;return{paused:r.paused,updatedAt:typeof r.updatedAt=="string"?r.updatedAt:null}}catch{return ez}}});var Jd,Zy,Vle,qle,Nw,Jle,Ds,Ro,Dw,Qy=l(()=>{"use strict";Jd=u(require("node:fs")),Zy=u(require("node:path"));rz();Vle="coding-tools-pause.json",qle="unreadable",Nw=e=>Zy.default.join(Zy.default.dirname(e),Vle),Jle=e=>{try{return Jd.default.readFileSync(e,"utf8")}catch(t){return t.code==="ENOENT"?null:qle}},Ds=e=>tz(Jle(Nw(e))),Ro=e=>Ds(e).paused,Dw=(e,t,r=new Date)=>{let o=Nw(e),n={paused:t,updatedAt:r.toISOString()};Jd.default.mkdirSync(Zy.default.dirname(o),{recursive:!0,mode:448});let s=`${o}.${process.pid}.tmp`;return Jd.default.writeFileSync(s,`${JSON.stringify(n)}
`,{mode:384}),Jd.default.renameSync(s,o),n}});var oz,nz=l(()=>{"use strict";oz=".gemini/antigravity-cli"});var sz,Yle,iz,az,lz=l(()=>{"use strict";sz=u(require("node:path"));nz();Yle="command(*)",iz=[Yle],az=e=>sz.default.join(e,oz,"settings.json")});var Yd,cz,dz,pz,Xle,Zle,uz,mz=l(()=>{"use strict";Yd=u(require("node:fs")),cz=u(require("node:os")),dz=u(require("node:path"));lz();pz=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Xle=e=>{if(!Yd.default.existsSync(e))return{};try{let t=JSON.parse(Yd.default.readFileSync(e,"utf8"));return pz(t)?{...t}:{}}catch{return{}}},Zle=(e,t)=>{let o=[...Array.isArray(e)?e.filter(n=>typeof n=="string"):[]];for(let n of t)o.includes(n)||o.push(n);return o},uz=(e=cz.default.homedir())=>{let t=az(e),r=Xle(t),o=pz(r.permissions)?{...r.permissions}:{},n=Zle(o.allow,iz),s=Array.isArray(o.allow)?o.allow.filter(c=>typeof c=="string"):[];if(!(n.length!==s.length||n.some((c,d)=>c!==s[d])))return{settingsPath:t,wrote:!1};Yd.default.mkdirSync(dz.default.dirname(t),{recursive:!0});let a={...r,permissions:{...o,allow:[...n]}};return Yd.default.writeFileSync(t,`${JSON.stringify(a,null,2)}
`,"utf8"),{settingsPath:t,wrote:!0}}});var eh,Hw=l(()=>{"use strict";mz();eh=e=>{e==="antigravity"&&uz()}});var gz,Ua,Fw=l(()=>{"use strict";gz=require("node:child_process");St();Pr();Bd();Mw();ko();Qy();Hw();Ua=(e,t,r)=>new Promise(o=>{if(!Ne(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(Ro(e.layout.configPath)){o({exitCode:-1,output:Os(ue.CODING_TOOLS_PAUSED)});return}if(Ns(e,t)){qd(e,t,r).then(o);return}let n=er(t,r,Re({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}eh(t);let s=(0,gz.spawn)(n.command,n.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],a=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{a.push(c.toString("utf8"))}),s.on("close",c=>{let d=Ha(i.join("")),p=a.join("").trim(),m=[d.output.trim(),p].filter(g=>g.length>0).join(`
`);o({exitCode:c??-1,output:m})}),s.on("error",c=>{o({exitCode:-1,output:c.message})})})});var fz=l(()=>{"use strict"});var yz=l(()=>{"use strict";Tw();Fw();Ww();fz();bn();ko()});var hz,Sz,Pz,Az=l(()=>{"use strict";hz="claude",Sz="codex",Pz="cursor"});var _z,Qle,$w,Xd,th=l(()=>{"use strict";_z=u(require("node:path"));fr();Ge();Qle="ws://localhost:3000/api/agent-witch/ws",$w=e=>e.replace(/\/$/,""),Xd=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return $w(t);let r=_z.default.basename(e.installDir);if(r===jc.production)return Bg;let o=e.configWsUrl?.trim()??"";return r===jc.localhost?o.length>0?$w(o):Qle:o.length>0?$w(o):Bg}});var tce,zw,Uw=l(()=>{"use strict";Az();th();Vd();tce=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),zw=e=>{if(!tce(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=Xd({installDir:e.layout.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??hz,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??Sz,a=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??Pz,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",p=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:p,wsUrl:o,workspace:n,claudeCommand:s,codexCommand:i,cursorCommand:a,antigravityCommand:c,pairingToken:d,writerExecutionBackend:pt(t.writerExecutionBackend),layout:e.layout}}}});var Bw,Gw,Kw=l(()=>{"use strict";Bw=u(require("node:fs"));Q();Uw();Gw=e=>{let t=z(e);if(!Bw.default.existsSync(t.configPath))return null;try{let r=JSON.parse(Bw.default.readFileSync(t.configPath,"utf8")),o=zw({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!o.ok){if(o.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return o.config}catch(r){let o=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${o}`),null}}});var Zd,bz=l(()=>{"use strict";Zd=(e,t,r)=>{let o=r?.trim()??"",n=e?.trim()??"";return o.length>0?n.length>0?n:null:n.length>0?n:t()}});var Vw,rce,qw,kz=l(()=>{"use strict";Vw=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),rce=e=>{if(!Vw(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",o=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||o.length===0||!Array.isArray(e.entries))return null;let n=e.entries.flatMap(s=>{if(!Vw(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",a=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||a.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let p=s.items.flatMap(m=>{if(!Vw(m))return[];let g=typeof m.itemKey=="string"?m.itemKey.trim():"",y=typeof m.relativePath=="string"?m.relativePath:"",h=typeof m.contentSha256=="string"?m.contentSha256.trim():"";return g.length===0||h.length===0?[]:[{itemKey:g,relativePath:y,contentSha256:h}]});return p.length===0?[]:[{componentId:i,versionId:a,kind:c,scope:d,items:p}]});return{id:t,projectId:r,digest:o,entries:n}},qw=rce});var Rz,oce,rh,Jw=l(()=>{"use strict";Rz=u(require("node:path")),oce=(e,t)=>{let r=t.trim();return Rz.default.join(e,"components","store",r.slice(0,2),r)},rh=oce});var wz,nce,Yw,Ez=l(()=>{"use strict";wz=u(require("node:fs"));Jw();nce=(e,t)=>{let r=[];for(let o of t.entries)for(let n of o.items){let s=rh(e.installDir,n.contentSha256);wz.default.existsSync(s)||r.push(n.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this computer. Open Harness to sync, then retry.`},Yw=nce});var Qd,Ba,sce,Xw,ice,Zw,Qw=l(()=>{"use strict";Qd=u(require("node:fs")),Ba=u(require("node:path"));Jw();sce=(e,t)=>Ba.default.join(e.installDir,"runs",t,"overlay"),Xw=(e,t)=>Ba.default.join(sce(e,t),".cursor"),ice=(e,t,r)=>{let o=r.entries.filter(s=>s.scope==="run");if(o.length===0)return{ok:!0};let n=Xw(e,t);Qd.default.mkdirSync(n,{recursive:!0});for(let s of o)for(let i of s.items){let a=rh(e.installDir,i.contentSha256);if(!Qd.default.existsSync(a))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this computer."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?Ba.default.join(n,c):Ba.default.join(n,i.itemKey);Qd.default.mkdirSync(Ba.default.dirname(d),{recursive:!0}),Qd.default.copyFileSync(a,d)}return{ok:!0}},Zw=ice});var eE,Tz,ace,ep,Cz=l(()=>{"use strict";eE=u(require("node:fs")),Tz=u(require("node:path")),ace=(e,t)=>{let r=Tz.default.join(e.installDir,"runs",t);eE.default.existsSync(r)&&eE.default.rmSync(r,{recursive:!0,force:!0})},ep=ace});var lce,tE,Iz=l(()=>{"use strict";Qw();lce=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let o=Xw(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:o}},tE=lce});var rE,cce,dce,pce,uce,mce,B,Lz=l(()=>{"use strict";rE=u(require("node:fs"));th();Q();Vd();cce="claude",dce="codex",pce="cursor",uce="agy",mce=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),B=()=>{let e=z();if(!rE.default.existsSync(e.configPath))return null;try{let t=JSON.parse(rE.default.readFileSync(e.configPath,"utf8"));if(!mce(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=Xd({installDir:e.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:o,workspace:n,writerExecutionBackend:pt(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:cce,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:dce,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:pce,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:uce,pairingToken:s,layout:e}}catch{return null}}});var oh,vz,xz=l(()=>{"use strict";oh=u(require("node:fs"));Ow();vz=(e,t)=>{let r=Xy(e);oh.default.mkdirSync(e,{recursive:!0}),oh.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{oh.default.chmodSync(r,384)}catch{}}});var tp,Wz,nh=l(()=>{"use strict";tp=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),o=t.slice(-4);return`${r}${"\u2022".repeat(12)}${o}`},Wz=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===tp(t)}});var rp,gce,oE,nE,Oz=l(()=>{"use strict";rp=u(require("node:fs"));bn();xz();nh();$a();ko();gce=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),oE=(e,t,r,o)=>{let n=e[t],s=r?.trim()??"",i=Wz(s,n?.apiKey)?"":s,a=i.length>0?i:n?.apiKey;if(a===void 0||a.length===0)return e;let c=o!==void 0?Fa(o):n?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},nE=e=>{let t=ot(e.configPath),r={};if(rp.default.existsSync(e.configPath))try{let n=JSON.parse(rp.default.readFileSync(e.configPath,"utf8"));gce(n)&&(r={...n})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,rp.default.mkdirSync(t,{recursive:!0}),rp.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let o=oE(oE(oE(_n(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);vz(t,o)}});var sh,sE=l(()=>{"use strict";sh={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var iE,jz=l(()=>{"use strict";Kd();bn();ko();ko();iE=(e,t)=>{if(Ns(e,t)||t==="antigravity")return!1;let r=Ft(t);if(r===null)return!1;let o=ot(e.layout.configPath),n=Et(o,r);return n===null||n.apiKey.trim().length===0}});var Mz,aE,lE=l(()=>{"use strict";Mz=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let o=e.readConfig(r);return o===null?[]:[o]})},aE=async e=>{let t=Mz(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let o=()=>{let n=Mz(e);if(n.length>0){r(n);return}setTimeout(o,e.pollIntervalMs)};o()}))}});var fce,cE,Nz=l(()=>{"use strict";Ae();Kw();lE();fce=1e4,cE=()=>aE({listProfileEmails:ty,readConfig:Gw,pollIntervalMs:fce,logWaiting:e=>{console.error(e)}})});var yce,dE,Dz=l(()=>{"use strict";yce={accepted:"Restart accepted; Local is restarting.",already_in_progress:"Restart already in progress.",deferred_writer_busy:"Restart deferred until the active writer task finishes.",unsupported:"This AgentWitch Local cannot handle Connect/restart. Update from /download."},dE=e=>({status:e.status,reason:e.reason,message:yce[e.status]})});var hce,pE,Hs,Hz=l(()=>{"use strict";St();hce=new Set(["terminal.stream.chunk","command.claude.result","command.claude.input_required","command.writer.session.chunk","command.writer.session.ready","harness.request.result","shell.data","run.heartbeat","dashboard.agentRun.get.result","dashboard.agentRun.list.result"]),pE=(e,t)=>typeof e=="string"?Fd(e,t):Array.isArray(e)?e.map(r=>pE(r,t)):typeof e=="object"&&e!==null?Object.fromEntries(Object.entries(e).map(([r,o])=>[r,pE(o,t)])):e,Hs=e=>typeof e.type!="string"||!hce.has(e.type)||e.payload===void 0?{...e}:{...e,payload:pE(e.payload,Da("secretHidden"))}});var Sce,uE,Fz=l(()=>{"use strict";Qy();Sce=1e3,uE=(e,t,r=Sce)=>{let o={paused:Ds(e).paused},s=setInterval(()=>{let i=Ds(e).paused;i!==o.paused&&(o.paused=i,t(i))},r);return s.unref?.(),()=>{clearInterval(s)}}});var ih,op,$z=l(()=>{"use strict";ih=(e,t,r=500)=>[...e.filter(o=>o!==t),t].slice(-r),op=(e=500)=>{let t={ids:[]};return{has:r=>t.ids.includes(r),add:r=>{t.ids=ih(t.ids,r,e)}}}});var np,zz=l(()=>{"use strict";St();np=e=>({type:"command.claude.result",payload:{exitCode:-1,output:Os(e.code,e.computer),errorCode:e.code,...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{}},...e.requestId!==void 0?{requestId:e.requestId}:{}})});var ne=l(()=>{"use strict";Fw();yz();Kw();th();bz();kz();Ez();Qw();Cz();Iz();Vd();Lz();Oz();bn();ko();nh();$a();sE();Mw();ko();jz();Kd();bn();Nz();Uw();lE();Dz();Hz();Qy();Fz();$z();zz()});var Uz,mE,Bz=l(()=>{"use strict";Uz=u(require("node:path"));Q();Ge();j$();Oy();jy();ne();mE=(e=x())=>{let t=O$(e);if(t!==null)return t;let r=lt(e);if(r!==null){let n=Ma(Uz.default.join(e,yt,r,"config.json"));if(n!==null)return n}let o=B()?.pairingToken.trim()??"";return o.length===0?null:Oa(o)}});var ah,Gz,Pce,Ace,Kz,lh,sp,ch,ip=l(()=>{"use strict";ah=u(require("node:fs")),Gz=u(require("node:path")),Pce="wake-port.json",Ace=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Kz=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,lh=e=>Gz.default.join(e,Pce),sp=e=>{let t=lh(e);if(!ah.default.existsSync(t))return null;try{let r=JSON.parse(ah.default.readFileSync(t,"utf8"));if(Ace(r)&&Kz(r.wakePort))return r.wakePort}catch{return null}return null},ch=(e,t)=>{if(!Kz(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=lh(e);ah.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var eWe,tWe,rWe,Ar,Vz,ap=l(()=>{"use strict";Q();ip();dt();ip();eWe=gn(),tWe=`${Ie()}-wake`,rWe=Ie(),Ar=()=>{let e=x();return ma({filePort:sp(e),envValue:process.env.AGENT_WITCH_WAKE_PORT,defaultPort:gn(e)})},Vz=e=>{let t=x();sp(t)===null&&ch(t,e)}});var qz=l(()=>{"use strict";Oy();Ae();jy();Bz();ne();ap()});var gE,lp,cp,Jz=l(()=>{"use strict";gE=u(require("node:os"));qz();lp=()=>{let e=ke();return{ok:!0,port:Ar(),hostname:gE.default.hostname(),profileCount:e.length}},cp=()=>{let e=ke(),t=mE(),r=pw();return{hostname:gE.default.hostname(),port:Ar(),tokenHash:t,tokenHashes:r.length>0?r:t!==null?[t]:[],profiles:e.map(o=>({email:o.profileEmail,launchAgentLabel:o.launchAgentLabel}))}}});var fE=l(()=>{"use strict";Jz()});var Yz,Xz,Zz,dh,Ga=l(()=>{"use strict";Yz="materialization.json",Xz="backups",Zz=".gitignore",dh=e=>`harness-set:${e.trim()}`});var Qz,eU,ph,tU=l(()=>{"use strict";Qz=u(require("node:crypto")),eU=u(require("node:fs")),ph=e=>{try{let t=eU.default.readFileSync(e);return Qz.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var kn,Fs,_ce,rU,yE,oU=l(()=>{"use strict";kn=u(require("node:fs")),Fs=u(require("node:path"));tU();_ce=(e,t,r,o)=>{let n=new Date().toISOString().replaceAll(":","-"),s=Fs.default.join(t,n,o);return kn.default.mkdirSync(Fs.default.dirname(s),{recursive:!0}),kn.default.copyFileSync(r,s),Fs.default.relative(e,s).replaceAll("\\","/")},rU=e=>{let t=Fs.default.join(e.repoRoot,e.repoRelativeDestination),r=ph(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let o=e.ledger.entries[e.repoRelativeDestination];if(kn.default.existsSync(t)){let n=ph(t);if(n===r)return{kind:"skipped_unchanged"};if(!(o!==void 0&&o.componentId===e.componentId)&&n!==null){let i=_ce(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return kn.default.mkdirSync(Fs.default.dirname(t),{recursive:!0}),kn.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return kn.default.mkdirSync(Fs.default.dirname(t),{recursive:!0}),kn.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},yE=e=>{let t=ph(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var hE,nU,Ka,uh=l(()=>{"use strict";hE=u(require("node:fs"));Ga();nU=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ka=e=>{if(!hE.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse(hE.default.readFileSync(e,"utf8"));if(nU(t)&&t.version===1&&nU(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var Rn,mh,gh,SE=l(()=>{"use strict";Rn=u(require("node:fs")),mh=u(require("node:path"));Ga();gh=e=>{let t=new Set(e.setSlugs.map(s=>dh(s))),r=[],o=[],n={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){n[s]=i;continue}let a=mh.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=mh.default.join(e.repoRoot,i.backupPath);Rn.default.existsSync(c)?(Rn.default.mkdirSync(mh.default.dirname(a),{recursive:!0}),Rn.default.copyFileSync(c,a),o.push(s)):Rn.default.existsSync(a)&&Rn.default.rmSync(a,{force:!0})}else Rn.default.existsSync(a)&&Rn.default.rmSync(a,{force:!0});r.push(s)}return{ledger:{version:1,entries:n},summary:{removedPaths:r,restoredPaths:o}}}});var PE,Va,fh=l(()=>{"use strict";PE=u(require("node:path"));Ga();Va=e=>({ledgerFilePath:PE.default.join(e.metaDirPath,Yz),backupsDirPath:PE.default.join(e.metaDirPath,Xz)})});var AE,sU,iU=l(()=>{"use strict";AE=u(require("node:path")),sU=(e,t)=>{let o=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(o.length===0)return AE.default.posix.join("rules",e,"file");let n=o[o.length-1]??"file",s=o[0]??"rules";return AE.default.posix.join(s,e,n)}});var _E,aU,pp,bE=l(()=>{"use strict";_E=u(require("node:fs")),aU=u(require("node:path")),pp=(e,t)=>{_E.default.mkdirSync(aU.default.dirname(e),{recursive:!0}),_E.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var kE,bce,De,qr=l(()=>{"use strict";kE=u(require("node:os")),bce=e=>{let t=e.trim();return t.startsWith("~/")?`${kE.default.homedir()}${t.slice(1)}`:t==="~"?kE.default.homedir():t},De=bce});var yh,lU,kce,cU,dU=l(()=>{"use strict";yh=u(require("node:fs")),lU=u(require("node:path"));Ga();fn();kce=`*
!${ly}
`,cU=e=>{let t=lU.default.join(e,Zz);yh.default.existsSync(t)||(yh.default.mkdirSync(e,{recursive:!0}),yh.default.writeFileSync(t,kce))}});var $s,tr,zs=l(()=>{"use strict";$s=u(require("node:path"));fn();qr();tr=e=>{let t=De(e),r=$s.default.join(t,dd);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:$s.default.join(r,"rag"),memoryDirPath:$s.default.join(r,xF),reportsDirPath:$s.default.join(r,OF),metaFilePath:$s.default.join(r,ly),ragChunksFilePath:$s.default.join(r,"rag",WF)}}});var Jr,uU,Rce,wce,$t,up=l(()=>{"use strict";Jr=u(require("node:fs")),uU=u(require("node:path"));fn();dU();zs();Rce=(e,t)=>{if(Jr.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};Jr.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},wce=e=>{Jr.default.existsSync(e.ragChunksFilePath)||Jr.default.writeFileSync(e.ragChunksFilePath,"");let t=uU.default.join(e.memoryDirPath,ha);Jr.default.existsSync(t)||Jr.default.writeFileSync(t,"")},$t=e=>{let t=tr(e.projectFolderPath);return Jr.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),Jr.default.mkdirSync(t.ragDirPath,{recursive:!0}),Jr.default.mkdirSync(t.memoryDirPath,{recursive:!0}),cU(t.metaDirPath),Rce(t,e),wce(t),{ok:!0,layout:t}}});var mU,gU,fU,yU,hh,Sh=l(()=>{"use strict";mU="components",gU="store",fU="versions",yU="installed.json",hh=e=>`harness-set:${e.trim()}`});var RE,hU,Ph,wE=l(()=>{"use strict";RE=u(require("node:fs")),hU=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ph=e=>{if(!RE.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse(RE.default.readFileSync(e,"utf8"));if(hU(t)&&t.version===1&&hU(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var mp,qa,Ah=l(()=>{"use strict";mp=u(require("node:path"));Sh();qa=e=>{let t=mp.default.join(e,mU);return{componentsRootDir:t,storeDir:mp.default.join(t,gU),versionsDir:mp.default.join(t,fU),installedFilePath:mp.default.join(t,yU)}}});var EE,SU,_h,bh,kh=l(()=>{"use strict";EE=u(require("node:crypto")),SU=u(require("node:fs")),_h=e=>EE.default.createHash("sha256").update(e,"utf8").digest("hex"),bh=e=>{try{let t=SU.default.readFileSync(e);return EE.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var TE,PU,AU,_U=l(()=>{"use strict";TE=u(require("node:fs")),PU=u(require("node:path")),AU=(e,t)=>{TE.default.mkdirSync(PU.default.dirname(e),{recursive:!0}),TE.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var CE,IE,bU,kU=l(()=>{"use strict";CE=u(require("node:fs")),IE=u(require("node:path")),bU=(e,t)=>{let r=t.componentId.replaceAll("/","_"),o=IE.default.join(e,r),n=IE.default.join(o,`${t.versionId}.json`);CE.default.mkdirSync(o,{recursive:!0}),CE.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`)}});var Rh,RU,wU,EU=l(()=>{"use strict";Rh=u(require("node:fs")),RU=u(require("node:path"));kh();wU=e=>{let t=_h(e.content),r=RU.default.join(e.storeDir,t);return Rh.default.existsSync(r)||(Rh.default.mkdirSync(e.storeDir,{recursive:!0}),Rh.default.writeFileSync(r,e.content)),t}});var LE,TU,Ece,wh,vE=l(()=>{"use strict";LE=u(require("node:fs")),TU=u(require("node:path"));Sh();wE();Ah();kh();_U();kU();EU();Ece=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),wh=e=>{let t=qa(e.installDir),r=hh(e.setSlug),o=String(e.setEntry.version),n=[];for(let i of e.setEntry.items){if(!Ece(i))continue;let a=typeof i.path=="string"?i.path.trim():"";if(a.length===0)continue;let c=TU.default.join(e.harnessRootDir,a);if(!LE.default.existsSync(c))continue;let d=LE.default.readFileSync(c,"utf8"),p=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:bh(c);if(p!==null){if(_h(d)!==p)throw new Error(`Harness item "${i.id}" failed content hash verification.`);wU({storeDir:t.storeDir,content:d}),n.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:a,contentSha256:p})}}if(n.length===0)return;bU(t.versionsDir,{version:1,componentId:r,versionId:o,items:n,createdAt:new Date().toISOString()});let s=Ph(t.installedFilePath);AU(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:o,installedAt:new Date().toISOString()}}})}});var WE,xE,CU,IU=l(()=>{"use strict";WE=u(require("node:fs"));vE();wE();Ah();xE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),CU=e=>{if(!WE.default.existsSync(e.harnessManifestPath))return;let t=qa(e.installDir),r=Ph(t.installedFilePath);if(Object.keys(r.components).length>0)return;let o;try{o=JSON.parse(WE.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!xE(o)||o.version!==1||!xE(o.sets)))for(let[n,s]of Object.entries(o.sets)){if(!xE(s))continue;let i=typeof s.version=="number"?s.version:1,a=Array.isArray(s.items)?s.items:[];wh({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:n,setEntry:{version:i,items:a}})}}});var OE,LU,vU,xU=l(()=>{"use strict";OE=u(require("node:fs")),LU=u(require("node:path")),vU=e=>{let t=e.componentId.replaceAll("/","_"),r=LU.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!OE.default.existsSync(r))return null;try{let o=JSON.parse(OE.default.readFileSync(r,"utf8"));if(typeof o=="object"&&o!==null&&o.version===1)return o}catch{return null}return null}});var Eh,Th,WU,OU=l(()=>{"use strict";Eh=u(require("node:fs")),Th=u(require("node:path"));Sh();IU();xU();Ah();kh();WU=e=>{CU({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=qa(e.layout.installDir),r=hh(e.setSlug),o=vU({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(o!==null){let i=o.items.find(a=>a.id===e.manifestItemId);if(i!==void 0){let a=Th.default.join(t.storeDir,i.contentSha256);if(Eh.default.existsSync(a)&&bh(a)===i.contentSha256)return a}}let n=e.manifestItemPath.trim();if(n.length===0)return null;let s=n.startsWith("shared/")?Th.default.join(e.layout.harnessRootDir,n):Th.default.join(e.layout.harnessSetsDir,e.setSlug,n);if(!Eh.default.existsSync(s))return null;try{if(!Eh.default.statSync(s).isFile())return null}catch{return null}return s}});var jU,Tce,jE,rr,Ja=l(()=>{"use strict";uh();fh();zs();jU="harness-set:",Tce=e=>{let t=e.trim();if(!t.startsWith(jU))return null;let r=t.slice(jU.length).trim();return r.length>0?r:null},jE=e=>{let t=new Set;for(let r of Object.values(e.entries)){let o=Tce(r.componentId);o!==null&&t.add(o)}return[...t].sort((r,o)=>r.localeCompare(o))},rr=e=>{let t=tr(e),{ledgerFilePath:r}=Va(t),o=Ka(r);return jE(o)}});var Ch,ME,gp,Cce,wo,fp,Ya=l(()=>{"use strict";Ch=u(require("node:fs")),ME=u(require("node:os")),gp=u(require("node:path")),Cce=()=>Ch.default.realpathSync(gp.default.resolve(ME.default.homedir())),wo=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?gp.default.join(ME.default.homedir(),t.slice(1)):t,o;try{o=Ch.default.realpathSync(gp.default.resolve(r))}catch{return null}let n=Cce();return o===n||o.startsWith(`${n}${gp.default.sep}`)?o:null},fp=e=>{let t=wo(e);if(t===null)return null;try{if(!Ch.default.statSync(t).isFile())return null}catch{return null}return t}});var NE,DE=l(()=>{"use strict";NE=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var Lh,MU,Ih,Ice,yp,HE=l(()=>{"use strict";Lh=u(require("node:fs")),MU=u(require("node:path"));Ga();oU();uh();SE();fh();iU();bE();qr();up();OU();Ja();Ya();DE();Ih=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ice=e=>{if(!Lh.default.existsSync(e))return null;try{let t=JSON.parse(Lh.default.readFileSync(e,"utf8"));if(Ih(t)&&t.version===1)return t}catch{return null}return null},yp=e=>{let t=[...new Set(e.setSlugs.map(I=>I.trim()).filter(I=>I.length>0))],r=De(e.projectFolderPath),o=wo(r);if(o===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let n;try{n=Lh.default.statSync(o)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!n.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=$t({projectFolderPath:o}),{ledgerFilePath:i,backupsDirPath:a}=Va(s.layout),d=rr(o).filter(I=>!t.includes(I)),p=Ka(i),m=0;if(d.length>0){let I=gh({repoRoot:o,setSlugs:d,ledger:p});p=I.ledger,m=I.summary.removedPaths.length}if(t.length===0)return pp(i,p),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:m,projectFolderPath:o,appliedSetSlugs:[]};let g=Ice(e.layout.harnessManifestPath);if(g===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let y=Ih(g.sets)?g.sets:{},h=0,S=0,E=0;for(let I of t){let f=y[I];if(!Ih(f))return{ok:!1,errorMessage:`Harness set "${I}" is not installed locally.`};let w=typeof f.version=="number"?String(f.version):"1",W=dh(I),_=Array.isArray(f.items)?f.items:[];for(let M of _){if(!Ih(M))continue;let v=typeof M.path=="string"?M.path.trim():"";if(v.length===0)continue;let b=NE(v);if(b===null)continue;let P=sU(I,b),C=MU.default.posix.join(".cursor",P).replaceAll("\\","/"),L=typeof M.id=="string"?M.id.trim():"",pe=WU({layout:e.layout,setSlug:I,setVersion:typeof f.version=="number"?f.version:1,manifestItemPath:v,manifestItemId:L});if(pe===null)continue;let Z=rU({repoRoot:o,backupsDir:a,repoRelativeDestination:C,sourceAbsolutePath:pe,componentId:W,versionId:w,ledger:p});if(Z.kind==="skipped_unchanged"){S+=1;continue}if(Z.kind==="backed_up_user_file"){E+=1,h+=1,p={version:1,entries:{...p.entries,[C]:yE({componentId:W,versionId:w,sourceAbsolutePath:pe,backupPath:Z.backupPath})}};continue}h+=1,p={version:1,entries:{...p.entries,[C]:yE({componentId:W,versionId:w,sourceAbsolutePath:pe})}}}}return h===0&&S===0&&m===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(pp(i,p),{ok:!0,writtenFileCount:h,skippedFileCount:S,backedUpFileCount:E,removedLedgerPathCount:m,projectFolderPath:o,appliedSetSlugs:t})}});var NU,vh,Lce,vce,xce,Wce,Oce,jce,Mce,Nce,Dce,hp,xh=l(()=>{"use strict";NU=u(require("node:crypto")),vh=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},Lce=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},vce=(e,t)=>{let r=Lce(t),o=vh(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${o}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},xce=(e,t,r)=>{let o=vce(t,r);return`shared/items/${e}/${o}`},Wce=["rules","skills","commands","instructions","agents"],Oce=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),jce=(e,t)=>[...e.filter(o=>o.id!==t.id),t],Mce=(e,t,r)=>{let o=e.sets[t.slug];return o!==void 0?{...o,name:t.name,version:o.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},Nce=e=>NU.default.createHash("sha256").update(e,"utf8").digest("hex"),Dce=e=>({id:e.id,kind:e.kind,title:e.title,path:xce(e.id,e.kind,e.title),contentSha256:Nce(e.content)}),hp=e=>{let t=new Date().toISOString(),r=e.existingManifest??Oce(e.hostname,t),o=vh(e.bundle.slug),n=Mce(r,{...e.bundle,slug:o},t),s=[`sets/${o}`,...Wce.map(d=>`sets/${o}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,p)=>{let m=Dce(p);return{files:[...d.files,{relativePath:m.path,content:p.content}],nextItems:jce(d.nextItems,m)}},{files:[],nextItems:n.items}),c=r.activeSetSlugs.includes(o)?r.activeSetSlugs:[...r.activeSetSlugs,o];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[o]:{...n,items:a}}},directories:s,files:i}}});var wn,DU,Wh,Hce,Us,FE=l(()=>{"use strict";wn=u(require("node:fs")),DU=u(require("node:os")),Wh=u(require("node:path"));xh();Hce=e=>{if(!wn.default.existsSync(e))return null;try{let t=JSON.parse(wn.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},Us=e=>{try{let t=Hce(e.layout.harnessManifestPath),r=hp({bundle:e.bundle,hostname:DU.default.hostname(),existingManifest:t});wn.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let o of r.directories)wn.default.mkdirSync(Wh.default.join(e.layout.harnessRootDir,o),{recursive:!0});for(let o of r.files){let n=Wh.default.join(e.layout.harnessRootDir,o.relativePath);wn.default.mkdirSync(Wh.default.dirname(n),{recursive:!0}),wn.default.writeFileSync(n,o.content)}return wn.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var $E,HU=l(()=>{"use strict";FE();HE();$E=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=Us({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return yp({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var FU,$U=l(()=>{"use strict";FU=["rule","skill","command","instruction","agent"]});var zU,Fce,$ce,Yr,zE=l(()=>{"use strict";$U();zU=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Fce=e=>typeof e=="string"&&FU.includes(e),$ce=e=>{if(!zU(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(o=>typeof o=="string"&&o.trim().length>0?[o.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!Fce(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},Yr=e=>{if(!zU(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",o=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let n=o.flatMap(s=>{let i=$ce(s);return i===null?[]:[i]});return{name:t,slug:r,items:n}}});var UU,zce,UE,BU=l(()=>{"use strict";UU=require("node:zlib");zE();zce="x-agent-witch-token",UE=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[zce]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let o=r.headers.get("x-content-sha256")?.trim()??"";if(o.length>0&&o!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let n=Buffer.from(await r.arrayBuffer()),s=(0,UU.gunzipSync)(n).toString("utf8"),i=JSON.parse(s),a=Yr(i);return a===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:a}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var GE,BE,Eo,GU=l(()=>{"use strict";GE=u(require("node:fs")),BE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Eo=e=>{if(!GE.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(GE.default.readFileSync(e.harnessManifestPath,"utf8"));if(!BE(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,o=BE(t.sets)?t.sets:{},n=Object.entries(o).map(([s,i])=>{if(!BE(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",p=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:p.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:n}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var Oh,KU=l(()=>{"use strict";Oh=()=>"~"});var VU,qU,JU=l(()=>{"use strict";VU=require("node:crypto"),qU=e=>`local-${(0,VU.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var KE,YU=l(()=>{"use strict";KE=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var Sp,jh,VE=l(()=>{"use strict";Sp=u(require("node:path")),jh=e=>{let t=Sp.default.dirname(e),r=Sp.default.basename(t);return r==="agents"?Sp.default.basename(Sp.default.dirname(t)):r}});var Pp,To,XU,Uce,Bce,Gce,Mh,ZU,qE=l(()=>{"use strict";Pp=u(require("node:fs")),To=u(require("node:path"));JU();YU();VE();XU=new Set(["node_modules",".git","dist","build",".next","coverage"]),Uce=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},Bce=(e,t)=>{let r=To.default.basename(t);if(e==="skill"){let o=t.split(To.default.sep),n=o.indexOf("skills");if(n>=0&&o[n+1]!==void 0)return o[n+1]??r}return r.replace(/\.(mdc|md)$/i,"")},Gce=e=>{let t=[],r=(n,s)=>{let i;try{i=Pp.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&XU.has(a.name))continue;let c=To.default.join(n,a.name),d=s?To.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;KE(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let n of["rules","commands","agents","instructions"]){let s=To.default.join(e,n);Pp.default.existsSync(s)&&r(s,n)}let o=To.default.join(e,"skills");return Pp.default.existsSync(o)&&r(o,"skills"),t},Mh=e=>{let t=Gce(e);if(t.length===0)return null;let r=To.default.dirname(e),o=jh(e),n=Uce(o),s=t.map(i=>{let a=KE(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:qU(i.absolutePath),kind:a,title:Bce(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:n,proposedName:o,sourceRoot:e,repoPath:r,items:s}},ZU=function*(e,t,r){let o=function*(n,s){if(r()||s>t)return;let i;try{i=Pp.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||XU.has(a.name))continue;let c=To.default.join(n,a.name);if(a.name===".cursor"){yield c;continue}yield*o(c,s+1)}};yield*o(e,0)}});var QU,JE,Kce,YE,e1=l(()=>{"use strict";QU=u(require("node:fs")),JE=u(require("node:path"));qE();Ya();Kce=e=>{let t=wo(e.trim());if(t===null)return null;if(JE.default.basename(t)===".cursor")return t;let r=JE.default.join(t,".cursor");try{if(QU.default.statSync(r).isDirectory())return wo(r)}catch{return null}return null},YE=e=>{let t=Kce(e.projectPath);if(t===null)return null;let r=Mh(t);if(r===null)return null;let o=e.reveal??{scanRoots:[],sets:[]},s=[...o.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:o.scanRoots,sets:s}}});var t1,Vce,Nh,XE,r1=l(()=>{"use strict";t1=u(require("node:path"));qE();Ya();VE();Vce=5,Nh=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},XE=e=>{let t=wo(e.scanRoot.trim());if(t===null)return Nh(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],o=!1;for(let s of ZU(t,Vce,e.shouldAbort)){if(e.shouldAbort()){o=!0;break}let i=wo(s);if(i===null)continue;let a=jh(i);Nh(e.response,"folder",{cursorDir:i,groupName:a,repoPath:t1.default.dirname(i)});let c=Mh(i);c!==null&&(r.push(c),Nh(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(o=!0);let n={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return Nh(e.response,o?"stopped":"done",{setCount:n.sets.length,stopped:o}),n}});var o1,n1,s1=l(()=>{"use strict";o1=u(require("node:path")),n1=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let o=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:o1.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:o,selected:r.selected??!0}})}))})});var Pt,i1,ZE,qce,QE,eT,Dh,tT,Ap,a1=l(()=>{"use strict";Pt=u(require("node:fs")),i1=u(require("node:os")),ZE=u(require("node:path"));xh();vE();Ya();s1();qce=e=>{if(!Pt.default.existsSync(e))return null;try{let t=JSON.parse(Pt.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},QE=e=>{let t=e.hostname??i1.default.hostname(),r=qce(e.layout.harnessManifestPath),o=0,n=new Set,s=[];for(let i of e.sets){let a=i.items.filter(p=>p.include);if(a.length===0)continue;let c=[];for(let p of a){let m=fp(p.sourcePath);if(m===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${p.sourcePath}`};let g=Pt.default.readFileSync(m,"utf8");c.push({id:p.id,kind:p.kind,title:p.title,content:g,setSlugs:[i.slug]})}let d=hp({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let p of d.directories)n.add(p);for(let p of d.files)s.push(p),o+=1}if(r===null||o===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{Pt.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of n)Pt.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=ZE.default.join(e.layout.harnessRootDir,i.relativePath);Pt.default.mkdirSync(ZE.default.dirname(a),{recursive:!0}),Pt.default.writeFileSync(a,i.content)}Pt.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(p=>p.include))continue;let c=vh(i.slug),d=r.sets[c];d!==void 0&&wh({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:o,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},eT="reveal-cache.json",Dh=(e,t)=>{Pt.default.mkdirSync(e.harnessRootDir,{recursive:!0}),Pt.default.writeFileSync(`${e.harnessRootDir}/${eT}`,`${JSON.stringify(t,null,2)}
`)},tT=e=>{let t=`${e.harnessRootDir}/${eT}`;Pt.default.existsSync(t)&&Pt.default.unlinkSync(t)},Ap=e=>{let t=`${e.harnessRootDir}/${eT}`;if(!Pt.default.existsSync(t))return null;try{let r=JSON.parse(Pt.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return n1(r)}catch{return null}return null}});var En=l(()=>{"use strict";HE();HU();DE();FE();BU();zE();xh();GU();KU();e1();Ya();r1();a1()});var rT,l1=l(()=>{"use strict";En();dt();rT=e=>{let t=z(e.profileEmail);return Us({bundle:e.bundle,layout:t})}});var c1=l(()=>{"use strict";l1();En()});var Jce,d1,Yce,p1,Bs,Hh,u1=l(()=>{"use strict";Jce=["agentwitch.com","www.agentwitch.com"],d1=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,Yce=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},p1=e=>{let t=Yce(e);return!!(Jce.includes(t)||d1.test(e.trim().toLowerCase()))},Bs=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return p1(r)?d1.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},Hh=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:Bs(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var _p=l(()=>{"use strict";u1()});var _r,Xa=l(()=>{"use strict";_r=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var bp,m1=l(()=>{"use strict";c1();_p();Xa();bp=e=>{if(!_r(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Yr(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!Bs(t))return{ok:!1,errorMessage:"appOrigin is not an allowed AgentWitch site."};if(o===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let n=rT({bundle:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenItemCount:n.writtenItemCount}:{ok:!1,errorMessage:n.errorMessage??"Harness install failed."}}});var oT=l(()=>{"use strict";m1()});var Xce,Za,nT=l(()=>{"use strict";Xce=e=>e==="hourly"||e==="daily"||e==="weekdays",Za=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",o=typeof t.name=="string"?t.name.trim():"",n=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||o.length===0||n.length===0||s.trim().length===0||!Xce(i)?null:{id:r,name:o,capabilityId:n,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var kp,Fh,g1,f1,sT,br,$h,zh,Uh,Bh,Gh=l(()=>{"use strict";kp=u(require("node:fs")),Fh=u(require("node:path"));nT();g1="automations.json",f1=e=>e.profileEmail!==null?Fh.default.join(e.installDir,"profiles",e.profileEmail,g1):Fh.default.join(e.installDir,g1),sT=()=>({version:1,automations:[]}),br=e=>{let t=f1(e);if(!kp.default.existsSync(t))return sT();try{let r=JSON.parse(kp.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?sT():{version:1,automations:r.automations.flatMap(n=>{let s=Za(n);return s!==null?[s]:[]})}}catch{return sT()}},$h=(e,t)=>{let r=f1(e);kp.default.mkdirSync(Fh.default.dirname(r),{recursive:!0}),kp.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},zh=(e,t)=>{$h(e,{version:1,automations:t})},Uh=(e,t)=>{let o=br(e).automations.filter(n=>n.id!==t.id);$h(e,{version:1,automations:[...o,t]})},Bh=(e,t)=>br(e).automations.find(r=>r.id===t)??null});var ae,At=l(()=>{"use strict";ae="x-agent-witch-token"});var iT=l(()=>{"use strict";Ey();vy()});var J,Gs,aT,Rp,lT,Zce,cT,Ks,Co,dT,kr=l(()=>{"use strict";At();iT();J=e=>{let t=et(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},Gs=e=>({[ae]:e,"Content-Type":"application/json"}),aT=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:Gs(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o.run;if(typeof n!="object"||n===null)return null;let s=n,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},Rp=async(e,t,r,o,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:Gs(e.pairingToken),body:JSON.stringify({exitCode:r,output:o,...typeof n?.estimateSeconds=="number"?{estimateSeconds:n.estimateSeconds}:{},...typeof n?.actualSeconds=="number"?{actualSeconds:n.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},lT=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:Gs(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},Zce=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let o of t.projects){if(typeof o!="object"||o===null)continue;let n=o,s=typeof n.id=="string"?n.id.trim():"",i=typeof n.name=="string"?n.name.trim():"",a=typeof n.folderPath=="string"?n.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},cT=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:Gs(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o;if(n.ok!==!0||typeof n.project!="object")return null;let s=n.project,i=typeof s.id=="string"?s.id.trim():"",a=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||a.length===0||c.length===0?null:{id:i,name:a,folderPath:c}}catch{return null}},Ks=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:Gs(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return Zce(r)}catch{return null}},Co=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:Gs(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},dT=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:Gs(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var Vs,y1,h1,Qce,pT,S1,uT=l(()=>{"use strict";Vs=u(require("node:fs")),y1=u(require("node:path")),h1=e=>y1.default.join(e.harnessRootDir,"projects-registry.json"),Qce=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),pT=e=>{let t=h1(e);if(!Vs.default.existsSync(t))return[];try{let r=JSON.parse(Vs.default.readFileSync(t,"utf8"));return Qce(r)?r.projects.filter(o=>typeof o.id=="string"&&typeof o.name=="string"&&typeof o.projectFolderPath=="string").map(o=>({id:o.id,name:o.name,projectFolderPath:o.projectFolderPath,addedAt:typeof o.addedAt=="string"?o.addedAt:new Date().toISOString(),...typeof o.cloudProjectId=="string"&&o.cloudProjectId.length>0?{cloudProjectId:o.cloudProjectId}:{}})):[]}catch{return[]}},S1=e=>{let t=h1(e);if(!Vs.default.existsSync(t))return;let r=`${t}.migrated`;if(Vs.default.existsSync(r)){Vs.default.unlinkSync(t);return}Vs.default.renameSync(t,r)}});var P1,ede,tde,A1,_1=l(()=>{"use strict";qr();P1=e=>De(e),ede=e=>new Set(e.map(t=>P1(t.folderPath))),tde=e=>new Set(e.map(t=>t.id)),A1=(e,t)=>{let r=ede(t),o=tde(t),n=[],s=new Set;for(let i of e){let a=P1(i.projectFolderPath);a.length!==0&&(r.has(a)||s.has(a)||i.cloudProjectId!==void 0&&o.has(i.cloudProjectId)||(s.add(a),n.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return n}});var mT,gT=l(()=>{"use strict";kr();uT();_1();mT=async(e,t)=>{let r=pT(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let o=J({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let n=await Ks(o);if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=A1(r,n),i=r.length-s.length,a=0,c=0;for(let d of s)await cT(o,{name:d.name,folderPath:d.folderPath})?a+=1:c+=1;return c===0&&S1(e),{migratedCount:a,skippedCount:i,failedCount:c}}});var fT,Rr,Qa=l(()=>{"use strict";fT=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),Rr=(e,t)=>e.find(r=>r.id===t)??null});var Xr,el=l(()=>{"use strict";kr();gT();Qa();Xr=async(e,t)=>{t!==void 0&&await mT(t,e);let r=J({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let o=await Ks(r);if(o===null)return{ok:!1,projects:[],message:"Could not reach AgentWitch Cloud. Check the computer connection and try again."};let n=fT(o);return{ok:!0,projects:n,message:n.length===0?"No projects yet \u2014 create one in AgentWitch Cloud, then refresh this page.":`Loaded ${n.length} project${n.length===1?"":"s"} from AgentWitch Cloud.`}}});var b1=l(()=>{"use strict"});var yT,rde,Kh,hT=l(()=>{"use strict";yT=u(require("node:fs"));zs();rde=e=>{let t=tr(e);if(!yT.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(yT.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let o=r;return{projectId:typeof o.projectId=="string"&&o.projectId.trim().length>0?o.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},Kh=rde});var ST,PT,k1=l(()=>{"use strict";ST=u(require("node:path"));qr();hT();PT=e=>{let t=ST.default.resolve(De(e)),r=o=>{let{projectId:n}=Kh(o);if(n!==null)return n;let s=ST.default.dirname(o);return s===o?null:r(s)};return r(t)}});var ode,nde,Vh,AT=l(()=>{"use strict";ode="Default",nde=e=>e.trim().toLowerCase()===ode.toLowerCase(),Vh=nde});var qh,Jh,Yh=l(()=>{"use strict";qh={save:"/project/pitfalls/save",retire:"/project/pitfalls/retire",restore:"/project/pitfalls/restore"},Jh=e=>{let t=Object.entries(qh).find(([,r])=>r===e);return t===void 0?null:t[0]}});var R1,Le,E1,sde,_T,bT,w1,ide,ade,wp,kT,lde,cde,dde,T1,C1=l(()=>{"use strict";ht();Yh();R1="new",Le=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),E1={block:"Must fix",warn:"Warning",info:"Note"},sde={seed:"Built-in",project:"This project",retired:"Retired"},_T=6e4,bT=60*_T,w1=24*bT,ide=(e,t)=>{if(e===null)return"Never hit";let r=new Date(e).getTime();if(Number.isNaN(r))return"Never hit";let o=Math.max(0,t-r);if(o<_T)return"Last hit just now";if(o<bT)return`Last hit ${Math.floor(o/_T)} min ago`;if(o<w1)return`Last hit ${Math.floor(o/bT)}h ago`;let n=Math.floor(o/w1);return n<30?`Last hit ${n} ${n===1?"day":"days"} ago`:`Last hit ${new Date(r).toISOString().slice(0,10)}`},ade=e=>{if(e===null)return"Not updated yet";let t=new Date(e).getTime();return Number.isNaN(t)?"Not updated yet":`Updated ${new Date(t).toISOString().slice(0,10)}`},wp=(e,t)=>`/project?${new URLSearchParams({id:e,tab:"pitfalls",...t}).toString()}`,kT=e=>e?{retired:"1"}:{},lde=e=>{let{item:t}=e,r=t?.severity??"warn",o=t?.check.kind==="command"?t.check.value:"",n=t===null?"Add pitfall":"Edit pitfall",s=t?.source==="seed"?'<p class="muted">This is a built-in pitfall. Your changes apply to this project only.</p>':"",i=a=>`<option value="${a}"${r===a?" selected":""}>${E1[a]}</option>`;return`<form method="POST" action="${e.postPaths.save}" class="stack pitfall-form" aria-label="${n}" onsubmit="this.querySelectorAll('button').forEach(function(b){b.disabled=true});">
      <p class="field-label">${n}</p>
      ${s}
      <input type="hidden" name="projectId" value="${Le(e.projectId)}" />
      <input type="hidden" name="pitfallId" value="${Le(t?.id??"")}" />
      <input type="hidden" name="tags" value="${Le((t?.tags??[]).join(", "))}" />
      ${e.showRetired?'<input type="hidden" name="showRetired" value="1" />':""}
      <label class="stack">
        <span>Title</span>
        <input type="text" name="symptom" required maxlength="${Me.symptom}" value="${Le(t?.symptom??"")}" placeholder="What goes wrong, in one line" />
      </label>
      <label class="stack">
        <span>Fix</span>
        <textarea name="avoidance" required maxlength="${Me.avoidance}" rows="3" placeholder="What to do instead">${Le(t?.avoidance??"")}</textarea>
      </label>
      <label class="stack">
        <span>Why it happens</span>
        <textarea name="cause" required maxlength="${Me.cause}" rows="2" placeholder="What leads to this trap">${Le(t?.cause??"")}</textarea>
      </label>
      <label class="stack">
        <span>Triggers</span>
        <input type="text" name="keywords" value="${Le((t?.keywords??[]).join(", "))}" placeholder="Words that point to this trap, separated by commas" />
      </label>
      <label class="stack">
        <span>How to check <span class="muted">(optional)</span></span>
        <input type="text" name="checkCommand" class="mono" maxlength="${Me.checkValue}" value="${Le(o)}" placeholder="A command that shows the trap, like npm run lint" />
      </label>
      <label class="stack">
        <span>How serious</span>
        <select name="severity">${i("block")}${i("warn")}${i("info")}</select>
      </label>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Save pitfall</button>
        <a class="btn btn-secondary" href="${Le(wp(e.projectId,kT(e.showRetired)))}">Cancel</a>
      </div>
    </form>`},cde=e=>{let{item:t,projectId:r,showRetired:o}=e,n=t.source==="retired",s=`<input type="hidden" name="projectId" value="${Le(r)}" />
            <input type="hidden" name="pitfallId" value="${Le(t.id)}" />
            ${o?'<input type="hidden" name="showRetired" value="1" />':""}`,i=n?`<form method="POST" action="${e.postPaths.restore}" class="inline-form" onsubmit="this.querySelectorAll('button').forEach(function(b){b.disabled=true});">
            ${s}
            <button class="btn btn-secondary btn-compact" type="submit">Bring back</button>
          </form>`:`<a class="btn btn-secondary btn-compact" href="${Le(wp(r,{...kT(o),edit:t.id}))}">Edit</a>
          <form method="POST" action="${e.postPaths.retire}" class="inline-form" onsubmit="if(!confirm('Retire this pitfall? You can bring it back later.'))return false;this.querySelectorAll('button').forEach(function(b){b.disabled=true});">
            ${s}
            <button class="btn btn-danger btn-compact" type="submit">Retire</button>
          </form>`,a=t.keywords.length>0?`<p class="muted">Triggers: ${t.keywords.map(c=>Le(c)).join(", ")}</p>`:"";return`<li class="harness-installed-set pitfall-row${n?" pitfall-row-retired":""}" data-pitfall-id="${Le(t.id)}">
        <p><strong>${Le(t.symptom)}</strong> <span class="muted">\xB7 ${E1[t.severity]} \xB7 ${sde[t.source]}</span></p>
        <p>Fix: ${Le(t.avoidance)}</p>
        ${a}
        <p class="muted">${Le(ide(t.lastSeenAt,e.nowMs))}</p>
        <p class="muted">${Le(ade(t.updatedAt))}</p>
        <div class="actions">${i}</div>
      </li>`},dde=e=>{let t=e.postPaths??qh;if(e.list===null||!e.list.ok)return'<p class="empty">Could not load pitfalls. Check this computer on Status, then reload.</p>';let r=e.nowMs??Date.now(),o=e.list.items,n=yn(o),s=n>=64,i=e.showRetired?o:o.filter(y=>y.source!=="retired"),a=e.editId===null?null:e.editId===R1?s?null:{item:null}:(()=>{let y=o.find(h=>h.id===e.editId&&h.source!=="retired");return y===void 0?null:{item:y}})(),c=a===null?"":lde({projectId:e.projectId,item:a.item,showRetired:e.showRetired,postPaths:t}),d=s?`<p class="muted">Limit reached: ${64} active pitfalls. Retire one to add another.</p>`:`<a class="btn btn-primary" href="${Le(wp(e.projectId,{...kT(e.showRetired),edit:R1}))}">Add pitfall</a>`,p=e.showRetired?`<a class="btn btn-secondary" href="${Le(wp(e.projectId,{}))}">Hide retired</a>`:`<a class="btn btn-secondary" href="${Le(wp(e.projectId,{retired:"1"}))}">Show retired</a>`,m=o.length>0?"No active pitfalls. Turn on Show retired to see retired ones.":"No pitfalls for this project. Add one when you spot a mistake that keeps coming back.",g=i.length===0?`<p class="empty">${m}</p>`:`<ul class="harness-installed-set-list">${i.map(y=>cde({projectId:e.projectId,item:y,showRetired:e.showRetired,nowMs:r,postPaths:t})).join("")}</ul>`;return`<section class="stack">
      <p class="lede">Pitfalls are known traps in this project. Each one says what goes wrong and how to avoid it.</p>
      ${o.length===0?"":`<p class="muted">${n} of ${o.length} active</p>`}
      <div class="actions">${a===null?d:""}${p}</div>
      ${c}
      ${g}
    </section>`},T1=dde});var Se,I1,pde,ude,mde,gde,fde,Tn,Xh=l(()=>{"use strict";AT();ht();C1();Se=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),I1=(e,t)=>e.length===0?`<p class="empty">${Se(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${Se(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${Se(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in AgentWitch Cloud \u2014 materialize from the Playbooks tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,pde=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No playbook on this computer yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,ude=e=>{let t=e.alreadyInRepo?"This repo already has playbook files in <code>.cursor</code> (tracked in <code>.agent-witch/materialization.json</code>). Pull again only if you want to refresh them from AgentWitch Cloud.":"This project\u2019s playbook is linked in AgentWitch Cloud. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.",r=e.alreadyInRepo?"Refresh in repo\u2026":"Pull into repo",o=e.alreadyInRepo?"btn btn-secondary":"btn btn-primary";return`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${Se(e.project.id)}" />
        <p class="lede">${t}</p>
        <div class="actions">
          <button class="${o}" type="submit">${r}</button>
        </div>
      </form>`},mde=e=>{let t=`<ul class="harness-installed-set-list">${e.linkedSetSlugs.map(r=>`<li class="harness-installed-set">
        <p><strong>${Se(r)}</strong> <span class="muted">already in this repo</span></p>
        <form method="POST" action="/projects/remove-harness-set" class="inline-form" onsubmit="return confirm('Remove this playbook from the repo? Files stay installed on this computer.');">
          <input type="hidden" name="projectId" value="${Se(e.project.id)}" />
          <input type="hidden" name="setSlug" value="${Se(r)}" />
          <button class="btn btn-danger btn-compact" type="submit">Remove from repo</button>
        </form>
      </li>`).join("")}</ul>`;return e.boundHarnessCount>0?`<div class="stack">
        <p class="field-label">In this repo</p>
        <p class="lede">This project\u2019s playbook is already in this repo\u2019s <code>.cursor</code> tree. Nothing is installed in the profile harness on this computer \u2014 refresh from AgentWitch Cloud only if you need an update.</p>
        ${t}
        <form method="POST" action="/projects/pull-bound-harness" class="actions">
          <input type="hidden" name="projectId" value="${Se(e.project.id)}" />
          <button class="btn btn-secondary" type="submit">Refresh in repo\u2026</button>
        </form>
      </div>`:`<div class="stack">
        <p class="field-label">In this repo</p>
        <p class="lede">This project\u2019s playbook is already in this repo\u2019s <code>.cursor</code> tree. Open Harness to install playbooks on this computer if you want to change them.</p>
        ${t}
        <div class="actions">
          <a class="btn btn-secondary" href="/harness">Open Harness</a>
        </div>
      </div>`},gde=e=>{let t=new Set(e.linkedSetSlugs);if(e.installed.sets.length===0)return t.size>0?mde({project:e.project,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.boundHarnessCount}):e.boundHarnessCount>0?ude({project:e.project,alreadyInRepo:!1}):pde();let o=e.installed.sets.filter(c=>t.has(c.slug)).length>0,n=o?"These playbooks are already in this repo\u2019s <code>.cursor</code> tree (see <code>.agent-witch/materialization.json</code>). Refresh only if you need an update. Use Remove from repo on a playbook to delete only the files that ledger recorded.":"Check the playbooks to write into this repo&apos;s <code>.cursor</code> tree, then pull.",s=o?"Refresh in repo\u2026":"Pull into repo",i=o?"btn btn-secondary":"btn btn-primary",a=`<ul class="harness-installed-set-list">${e.installed.sets.map(c=>{let d=t.has(c.slug),p=d?`<form method="POST" action="/projects/remove-harness-set" class="inline-form" onsubmit="return confirm('Remove this playbook from the repo? Files stay installed on this computer.');">
            <input type="hidden" name="projectId" value="${Se(e.project.id)}" />
            <input type="hidden" name="setSlug" value="${Se(c.slug)}" />
            <button class="btn btn-danger btn-compact" type="submit">Remove from repo</button>
          </form>`:"";return`<li class="harness-installed-set">
          <label class="check-row">
            <input form="link-harness-form" type="checkbox" name="applySet" value="${Se(c.slug)}"${t.size===0||d?" checked":""} />
            <span><strong>${Se(c.name)}</strong> <span class="muted mono">(${Se(c.slug)})</span></span>
          </label>
          <p class="muted">${c.itemCount} item(s)${d?' \xB7 <span class="muted">in repo</span>':""}</p>
          ${p}
        </li>`}).join("")}</ul>`;return`<div class="stack">
        <form id="link-harness-form" method="POST" action="/projects/link-harness">
          <input type="hidden" name="projectId" value="${Se(e.project.id)}" />
          <p class="field-label">Installed</p>
          <p class="lede">${n}</p>
        </form>
        ${a}
        <div class="actions">
          <button form="link-harness-form" class="${i}" type="submit">${s}</button>
        </div>
      </div>`},fde=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${Se(t)} from recent runs. Review in AgentWitch Cloud or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${Se(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},Tn=e=>{let t=e.flashError?`<div class="alert-error">${Se(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Se(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},o=(g,y)=>`<a class="project-tab${e.activeTab===g?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${g}">${Se(y)}</a>`,n=e.composition?.items.filter(g=>g.kind==="workflow")??[],s=e.composition?.items.filter(g=>g.kind==="agent")??[],i=(()=>{switch(e.activeTab){case"harness":{let g=gde({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0}),y=e.harnessExtraHtml?.trim()??"";return y.length===0?g:`${g}${y}`}case"workflows":return I1(n,"No workflows installed for this project yet.");case"agents":return I1(s,"No agents installed for this project yet.");case"knowledge":return fde({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount});case"pitfalls":return T1({projectId:e.project.id,list:e.pitfalls??null,showRetired:e.pitfallsShowRetired??!1,editId:e.pitfallsEditId??null});default:return e.activeTab}})(),a=e.pitfalls!==void 0&&e.pitfalls!==null&&e.pitfalls.ok?`Pitfalls (${yn(e.pitfalls.items)})`:"Pitfalls",c=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(e.project.id)}`,d=`${c}?rename=1`,p=`<div class="actions project-cloud-actions">
      <a class="btn btn-secondary" href="${Se(c)}" target="_blank" rel="noopener noreferrer">Open in AgentWitch Cloud</a>
      <a class="btn btn-secondary btn-compact" href="${Se(d)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>
    </div>`,m=Vh(e.project.name)?"":`<section class="danger-zone stack">
        <p class="field-label">Danger zone</p>
        <p class="muted">Removes this project from AgentWitch Cloud only. The folder on this computer is not deleted.</p>
        <form method="POST" action="/projects/delete" class="actions" onsubmit="return confirm('Delete this project from AgentWitch Cloud? Your repo folder on this computer will stay.');">
          <input type="hidden" name="projectId" value="${Se(e.project.id)}" />
          <button class="btn btn-danger" type="submit">Delete project</button>
        </form>
      </section>`;return`${t}<section class="card">
      <p class="eyebrow"><a href="/projects">Projects</a></p>
      <h1>${Se(e.project.name)}</h1>
      <p class="muted mono">${Se(e.project.projectFolderPath)}</p>
      ${p}
      <div class="actions"><a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(e.project.id)}">Change folder\u2026</a><a class="btn btn-secondary" href="/project/skill-drafts?projectId=${encodeURIComponent(e.project.id)}">Skill drafts</a></div>
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
    </section>${m}`}});var yde,hde,L1,v1=l(()=>{"use strict";En();At();yde=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),hde=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[ae]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();return!yde(o)||o.ok!==!0||!Array.isArray(o.bundles)?null:o.bundles.flatMap(n=>{let s=Yr(n);return s===null?[]:[s]})}catch{return null}},L1=hde});var x1,RT,W1=l(()=>{"use strict";ne();En();Xh();el();v1();Qa();Ja();kr();fr();x1=e=>({kind:"page",title:e.project.name,body:Tn({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:Eo(e.layout),linkedSetSlugs:rr(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),RT=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=B();if(r===null)return{kind:"not_found"};let o=await Xr(r,e.layout),n=Rr(o.projects,t);if(n===null)return{kind:"not_found"};let s=J({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s?.appOrigin??Nt,a=s===null?null:await L1(s,n.id);if(a===null)return x1({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:"Could not load the linked playbook from AgentWitch Cloud."});let c=$E({layout:e.layout,projectFolderPath:n.projectFolderPath,bundles:a});if(!c.ok)return x1({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:c.errorMessage});let d=s===null?!1:await Co(s,n.id,c.appliedSetSlugs),p=new URLSearchParams({linked:"1",files:String(c.writtenFileCount),bindingsSynced:d?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(n.id)}&${p.toString()}`}}});var O1,wT,j1=l(()=>{"use strict";ne();En();fr();kr();Xh();up();qr();el();Qa();Ja();uh();SE();fh();bE();O1=e=>({kind:"page",title:e.project.name,body:Tn({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:Eo(e.layout),linkedSetSlugs:rr(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),wT=async e=>{let t=new URLSearchParams(e.rawBody),r=t.get("projectId")?.trim()??"",o=t.get("setSlug")?.trim()??"",n=B();if(n===null)return{kind:"not_found"};let s=await Xr(n,e.layout),i=Rr(s.projects,r);if(i===null)return{kind:"not_found"};let a=J({wsUrl:n.wsUrl,pairingToken:n.pairingToken}),c=a?.appOrigin??Nt;if(o.length===0)return O1({layout:e.layout,cloudAppOrigin:c,project:i,errorMessage:"Choose a harness set to remove from this repo."});let d=De(i.projectFolderPath),p=$t({projectFolderPath:d}),{ledgerFilePath:m}=Va(p.layout),g=Ka(m),y=jE(g);if(!y.includes(o))return O1({layout:e.layout,cloudAppOrigin:c,project:i,errorMessage:`Harness set "${o}" is not materialized in this repo.`});let h=y.filter(f=>f!==o),S=gh({repoRoot:p.layout.resolvedProjectFolderPath,setSlugs:[o],ledger:g});pp(m,S.ledger);let E=a===null?!1:await Co(a,i.id,h),I=new URLSearchParams({linked:"1",removed:o,files:String(S.summary.removedPaths.length),bindingsSynced:E?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(i.id)}&${I.toString()}`}}});var Sde,Pde,M1,Ade,_de,Ep,ET=l(()=>{"use strict";ht();At();Sde=1e4,Pde=15e3,M1=(e,t,r)=>{let o=`${e.replace(/\/$/,"")}/api/agent-witch/projects/${encodeURIComponent(t)}/pitfalls`;return r===void 0?o:`${o}/${encodeURIComponent(r)}`},Ade=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return t.errorMessage==="limit_exceeded"||t.code==="limit_exceeded"},_de=(e,t=fetch)=>({listPitfalls:async(r,o)=>{try{let n=new URL(M1(e.appOrigin,r));n.searchParams.set("includeRetired",o.includeRetired?"1":"0");let s=await t(n.toString(),{method:"GET",headers:{[ae]:e.pairingToken},signal:AbortSignal.timeout(Sde)});if(!s.ok)return{ok:!1,reason:"unavailable"};let i=LR(await s.json());return i===null?{ok:!1,reason:"unavailable"}:{ok:!0,items:i.items,syncedAt:i.syncedAt}}catch{return{ok:!1,reason:"unavailable"}}},upsertPitfall:async(r,o)=>{try{let n=await t(M1(e.appOrigin,r),{method:"PUT",headers:{[ae]:e.pairingToken,"content-type":"application/json"},body:JSON.stringify(o),signal:AbortSignal.timeout(Pde)});if(n.ok)return{ok:!0};if(n.status===409){let s=await n.json().catch(()=>null);return{ok:!1,reason:Ade(s)?"active_limit":"rejected"}}return n.status===400?{ok:!1,reason:"rejected"}:{ok:!1,reason:n.status>=500?"unavailable":"rejected"}}catch{return{ok:!1,reason:"unavailable"}}}}),Ep=_de});var TT,N1,bde,kde,Rde,wde,D1,H1=l(()=>{"use strict";ht();TT=e=>e.replace(/\s+/g," ").trim(),N1=(e,t,r)=>{let o=new Set,n=[];for(let s of e.split(/[,\n]/)){let i=TT(s).slice(0,r).toLowerCase();i.length>0&&!o.has(i)&&(o.add(i),n.push(i))}return n.slice(0,t)},bde=e=>e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,40).replace(/-+$/g,""),kde=(e,t)=>{let r=bde(e);return`project-${r.length>0?r:"pitfall"}-${t}`.slice(0,Me.id).replace(/-+$/g,"")},Rde=e=>e==="block"||e==="info"?e:"warn",wde=e=>{let{form:t}=e,r=TT(t.get("symptom")??""),o=(t.get("avoidance")??"").trim(),n=(t.get("cause")??"").trim(),s=TT(t.get("checkCommand")??"");if(r.length===0||o.length===0||n.length===0||r.length>Me.symptom||o.length>Me.avoidance||n.length>Me.cause||s.length>Me.checkValue)return{ok:!1};let i=(t.get("pitfallId")??"").trim(),a=i.length>0?i:kde(r,e.randomSuffix());return{ok:!0,pitfall:{id:a,symptom:r,cause:n,avoidance:o,check:s.length>0?{kind:"command",value:s}:{kind:"id",value:a},keywords:N1(t.get("keywords")??"",Me.keywords,Me.keyword),tags:N1(t.get("tags")??"",Me.tags,Me.tag),source:"project",severity:Rde(t.get("severity"))}}},D1=wde});var $1,Ede,Io,F1,Zh,Tde,Cde,z1,U1=l(()=>{"use strict";$1=require("node:crypto");ht();H1();Yh();Ede=()=>(0,$1.randomBytes)(3).toString("hex"),Io=(e,t,r={})=>{let o=new URLSearchParams({tab:"pitfalls",...r,pitfall:t});return`/project?id=${encodeURIComponent(e)}&${o.toString()}`},F1=(e,t)=>({id:e.id,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags,severity:e.severity,source:t}),Zh=new Map,Tde=async(e,t)=>{let r=Zh.get(e)??Promise.resolve(),o,n=new Promise(i=>{o=i}),s=r.catch(()=>{}).then(()=>n);Zh.set(e,s),await r.catch(()=>{});try{return await t()}finally{o(),Zh.get(e)===s&&Zh.delete(e)}},Cde=async e=>{let t=(e.form.get("pitfallId")??"").trim(),r=`${e.projectId}:${t||"__new__"}`;return Tde(r,async()=>{let{projectId:o,store:n}=e,s=e.form.get("showRetired")==="1"?{retired:"1"}:{};if(n===null)return Io(o,"unavailable",s);let i=await n.listPitfalls(o,{includeRetired:!0});if(!i.ok)return Io(o,"unavailable",s);if(e.action==="save"){let d=D1({form:e.form,randomSuffix:e.randomSuffix??Ede});if(!d.ok)return Io(o,"invalid",s);let p=i.items.find(y=>y.id===d.pitfall.id);if((p===void 0||p.source==="retired")&&yn(i.items)>=64)return Io(o,"limit",s);let g=await n.upsertPitfall(o,d.pitfall);return Io(o,g.ok?"saved":g.reason==="active_limit"?"limit":g.reason,s)}let a=i.items.find(d=>d.id===t);if(a===void 0)return Io(o,"missing",s);if(e.action==="restore"){if(a.source==="retired"&&yn(i.items)>=64)return Io(o,"limit",s);let d=await n.upsertPitfall(o,F1(a,"project"));return Io(o,d.ok?"restored":d.reason==="active_limit"?"limit":d.reason,s)}let c=await n.upsertPitfall(o,F1(a,"retired"));return Io(o,c.ok?"retired":c.reason==="active_limit"?"limit":c.reason,s)})},z1=Cde});var Qh,B1,G1,CT=l(()=>{"use strict";Qh=new Map,B1=async e=>{let t=e.nowMs??Date.now(),r=e.ttlMs??3e4,o=Qh.get(e.projectId);if(o!==void 0&&o.includeRetired===e.includeRetired&&t-o.fetchedAtMs<r)return o.result;let n=await e.store.listPitfalls(e.projectId,{includeRetired:e.includeRetired});return n.ok&&Qh.set(e.projectId,{result:n,includeRetired:e.includeRetired,fetchedAtMs:t}),n},G1=e=>{if(e===void 0){Qh.clear();return}Qh.delete(e)}});var IT,K1=l(()=>{"use strict";ne();kr();el();Qa();ET();U1();CT();IT=async e=>{let t=new URLSearchParams(e.rawBody),r=t.get("projectId")?.trim()??"",o=B();if(o===null)return{kind:"not_found"};let n=await Xr(o,e.layout),s=Rr(n.projects,r);if(s===null)return{kind:"not_found"};let i=J({wsUrl:o.wsUrl,pairingToken:o.pairingToken}),a=e.createStore??Ep,c=i===null?null:a(i),d=await z1({action:e.action,form:t,projectId:s.id,store:c});return G1(s.id),{kind:"redirect",location:d}}});var Ide,LT,V1=l(()=>{"use strict";Ide=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,LT=Ide});var q1=l(()=>{"use strict"});var J1=l(()=>{"use strict"});var Y1=l(()=>{"use strict";q1();J1()});var Lde,Cn,X1=l(()=>{"use strict";Lde=["GIT_DIR","GIT_WORK_TREE","GIT_INDEX_FILE","GIT_OBJECT_DIRECTORY","GIT_ALTERNATE_OBJECT_DIRECTORIES","GIT_PREFIX","GIT_EXEC_PATH","GIT_QUARANTINE_PATH","GIT_REFLOG_ACTION","GIT_TEMPLATE_DIR","GIT_CEILING_DIRECTORIES","GIT_COMMON_DIR"],Cn=(e=process.env)=>{let t={...e};for(let r of Lde)delete t[r];return t}});var Z1=l(()=>{"use strict";X1()});var vT,Q1=l(()=>{"use strict";vT={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#2150d6",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var xT=l(()=>{"use strict";Q1()});var eS,WT=l(()=>{"use strict";eS={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",DEVICE_RESTART_ACK:"device.restart.ack",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status",PROJECT_MESSAGE_HISTORY:"project.message.history",PROJECT_HISTORY_PAGE_REQUEST:"project.history.page.request",PROJECT_HISTORY_PAGE_RESULT:"project.history.page.result"}});var tS=l(()=>{"use strict";Y1();Z1();fr();xT();WT()});var eB,tB,vde,rS,oS,rB=l(()=>{"use strict";eB=require("node:child_process"),tB=require("node:util");tS();vde=(0,tB.promisify)(eB.execFile),rS=async(e,t)=>{try{let{stdout:r}=await vde("git",t,{cwd:e,env:Cn(),maxBuffer:1048576});return r.trim()}catch{return null}},oS=async e=>{let t=await rS(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await rS(e,["rev-parse","--abbrev-ref","HEAD"]),o=await rS(e,["status","--porcelain"]),n=await rS(e,["diff","--shortstat","HEAD"]),s=o===null||o.length===0?0:o.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:n===null||n.length===0?null:n}}});var OT,oB=l(()=>{"use strict";OT=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",o=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,n=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${o}; ${n}; ${s}; ${i.join("; ")}.`}});var xde,jT,nB=l(()=>{"use strict";xde=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",o=r.length>0?r:t.length>0?t:"Lesson from completed run";return o.length<=280?o:`${o.slice(0,277)}\u2026`},jT=xde});var Wde,Ode,wr,tl=l(()=>{"use strict";St();Wde=/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,Ode=e=>Pn(e).scrubbed.replace(Wde,"[redacted-email]"),wr=Ode});var jde,MT,sB=l(()=>{"use strict";At();tl();jde=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[ae]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:wr(r.lesson)}),signal:AbortSignal.timeout(15e3)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},MT=jde});var iB,In,aB=l(()=>{"use strict";iB=require("node:child_process"),In=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,o=(0,iB.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return o.length>0?o:null}catch{return null}}});var lB=l(()=>{"use strict";el()});var Mde,NT,DT=l(()=>{"use strict";At();Mde=e=>{let t=e?.project;return typeof t?.name=="string"&&t.name.trim().length>0?t.name.trim():null},NT=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[ae]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)});if(!o.ok)return{ok:!1,httpStatus:o.status};let n=await o.json().catch(()=>null);return{ok:!0,projectName:Mde(n)}}catch{return{ok:!1,httpStatus:null}}}});var HT,cB=l(()=>{"use strict";At();HT=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"DELETE",headers:{[ae]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(r.ok)return{ok:!0,errorMessage:null};let o=await r.json().catch(()=>null);return{ok:!1,errorMessage:typeof o=="object"&&o!==null&&typeof o.errorMessage=="string"?o.errorMessage:`Delete failed (${r.status})`}}catch{return{ok:!1,errorMessage:"Could not reach AgentWitch Cloud."}}}});var dB,Nde,Lo,FT,$T=l(()=>{"use strict";dB=e=>{let t=JSON.parse(e);return Array.isArray(t)?t.filter(r=>typeof r=="string"):[]},Nde=e=>e===""?null:e,Lo=e=>e??"",FT=e=>({id:e.id,projectId:Nde(e.project_id),symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:{kind:e.check_kind,value:e.check_value},keywords:dB(e.keywords_json),tags:dB(e.tags_json),source:e.source,hitCount:e.hit_count,lastSeenAt:e.last_seen_at,severity:e.severity})});var pB,Dde,Hde,zT,rl,nS,Tp=l(()=>{"use strict";$T();pB=`
  SELECT p.project_id, p.id, p.symptom, p.cause, p.avoidance,
    p.check_kind, p.check_value, p.keywords_json, p.tags_json,
    p.source, p.severity,
    COALESCE(h.hit_count, 0) AS hit_count,
    h.last_seen_at AS last_seen_at
  FROM pitfalls p
  LEFT JOIN pitfall_hits h
    ON h.project_id = ? AND h.pitfall_id = p.id
  WHERE p.project_id = ?`,Dde=e=>e,Hde=e=>e??null,zT=(e,t,r=t)=>Dde(e.prepare(pB).all(Lo(r),Lo(t))).map(FT),rl=(e,t,r,o=t)=>{let n=Hde(e.prepare(`${pB} AND p.id = ?`).get(Lo(o),Lo(t),r));return n===null?null:FT(n)},nS=(e,t)=>{e.prepare(`INSERT INTO pitfalls (
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
      severity = excluded.severity`).run(Lo(t.projectId),t.id,t.symptom,t.cause,t.avoidance,t.check.kind,t.check.value,JSON.stringify(t.keywords),JSON.stringify(t.tags),t.source,t.severity)}});var sS,UT=l(()=>{"use strict";ht();sS=e=>e.map(t=>({id:bs(t.id),avoidance:bs(t.avoidance)}))});var iS,uB,aS=l(()=>{"use strict";iS=e=>{let t=new Map;e.seeds.forEach(o=>{t.set(o.id,o)}),e.projectRows.forEach(o=>{t.set(o.id,o)});let r=[...t.values()];return e.includeRetired===!0?r:r.filter(o=>o.source!=="retired")},uB=e=>e.filter(t=>t.source!=="retired").length});var qs,mB,Cp=l(()=>{"use strict";ht();UT();Tp();aS();qs=(e,t={})=>{let r=t.projectId??null,o=zT(e,null,r),n=r===null||r===""?[]:zT(e,r);return iS({seeds:o,projectRows:n,includeRetired:t.includeRetired===!0})},mB=(e,t={})=>{let r=qs(e,t);return t.format==="bot"?{format:"bot",items:sS(r),lines:r.map(o=>Sd(o))}:{format:"full",items:r}}});var lS,BT=l(()=>{"use strict";Tp();Cp();lS=(e,t)=>{let r=t.id.trim();if(r.length===0)return null;let o=t.projectId??null;return o===null||o===""?rl(e,null,r):qs(e,{projectId:o,includeRetired:!0}).find(s=>s.id===r)??null}});var GT=l(()=>{"use strict"});var Ln,ol,gB,fB,yB=l(()=>{"use strict";Ln=e=>({type:"string",description:e}),ol={name:"check_context",description:"Match the current prompt against project pitfalls. Call on the first user message. Returns hit, miss, or none. Miss stays silent.",inputSchema:{type:"object",properties:{cwd:Ln("Absolute working directory for the current session."),message:Ln("User prompt or task text to match."),sessionId:Ln("Optional session id for first-message tracking."),projectId:Ln("Optional project id when already known.")},additionalProperties:!1}},gB={name:"get_context",description:"Compact project briefing: id, folder, and feature flags. Not a full docs dump.",inputSchema:{type:"object",properties:{cwd:Ln("Absolute working directory."),projectId:Ln("Optional project id when already known.")},additionalProperties:!1}},fB={name:"get_pitfalls",description:"List or search project pitfalls in a short bot-friendly form.",inputSchema:{type:"object",properties:{projectId:Ln("Project id."),q:Ln("Optional search text."),limit:{type:"number",description:"Max rows to return."}},additionalProperties:!1}}});var Js,hB,SB,PB=l(()=>{"use strict";Js=e=>({type:"string",description:e}),hB={name:"get_skill",description:"Read one project skill by id or search. Same idea as the cloud skill tools.",inputSchema:{type:"object",properties:{projectId:Js("Project id."),skillId:Js("Skill id when known."),q:Js("Optional search text.")},required:["projectId"],additionalProperties:!1}},SB={name:"record_outcome",description:"Record whether a tip or preflight check helped. Pitfall wins call the cloud hit route.",inputSchema:{type:"object",properties:{projectId:Js("Project id."),kind:{type:"string",description:"pitfall | preflight | other"},pitfallId:Js("Pitfall id when kind is pitfall."),preflightId:Js("Preflight check id when kind is preflight."),ok:{type:"boolean",description:"Whether the step helped."},notes:Js("Optional short note. No secret values.")},required:["projectId","kind","ok"],additionalProperties:!1}}});var AB=l(()=>{"use strict";yB();PB()});var Lp,_B=l(()=>{"use strict";ht();GT();Lp=e=>{let t=gy("AgentWitch tip \xB7 check_context",120);if(hr(t)>=120)return t;let r=[t],o=hr(t);for(let n of e){if(r.length-1>=4)break;let s=Sd(n),i=hr(s);if(o+i>120){if(r.length===1){let a=120-o,c=gy(s,a);c.length>0&&(r.push(c),o+=hr(c));continue}continue}r.push(s),o+=i}return r.join(`
`)}});var bB=l(()=>{"use strict";ht()});var vp=l(()=>{"use strict";GT();AB();_B();bB()});var Fde,$de,nl,KT=l(()=>{"use strict";vp();Fde=e=>e.toLowerCase(),$de=(e,t)=>{let r=Fde(e);return t.reduce((o,n)=>{let s=n.trim().toLowerCase();return s.length===0?o:r.includes(s)?o+1:o},0)},nl=e=>{let t=e.pitfalls.map(r=>({pitfall:r,score:$de(e.text,r.keywords)})).filter(r=>r.score>0).sort((r,o)=>o.score-r.score||r.pitfall.id.localeCompare(o.pitfall.id));return t.length===0?[]:t.slice(0,4).map(r=>r.pitfall)}});var kB,RB=l(()=>{"use strict";Cp();KT();kB=(e,t)=>{let r=qs(e,{projectId:t.projectId,includeRetired:!1});return nl({pitfalls:r,text:t.text})}});var zde,Ude,Bde,Gde,wB,zt,EB,dS,VT=l(()=>{"use strict";zde="22.13",Ude=e=>typeof e=="object"&&e!==null&&typeof e.DatabaseSync=="function",Bde=e=>{let t={ok:!1,reason:`Node ${e.nodeVersion} has no node:sqlite (needs Node ${zde}+)`};if(e.getBuiltinModule===null)return t;try{let r=e.getBuiltinModule("node:sqlite");return Ude(r)?{ok:!0,sqlite:r}:t}catch{return t}},Gde=()=>typeof process.getBuiltinModule=="function"?e=>process.getBuiltinModule(e):null,wB=new Map,zt=()=>{let e=wB.get("process");if(e!==void 0)return e;let t=Bde({getBuiltinModule:Gde(),nodeVersion:process.version});return wB.set("process",t),t},EB=()=>{let e=zt();if(!e.ok)throw new Error(`Pitfall cache unavailable: ${e.reason}`);return e.sqlite},dS=()=>{let e=zt();return e.ok?null:`[agent-witch] Pitfall cache (check_context) is off: ${e.reason}. Everything else runs.`}});var TB,xp=l(()=>{"use strict";_y();TB=3e3});var CB,IB=l(()=>{"use strict";xp();CB=`
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
`});var LB,vB,Kde,Vde,xB,WB,OB=l(()=>{"use strict";LB=u(require("node:fs")),vB=u(require("node:path"));VT();xp();IB();Kde=e=>{let t=e.prepare("SELECT value FROM pitfall_meta WHERE key = 'schema_version'").get();if(t===void 0)return 0;let r=Number.parseInt(t.value,10);return Number.isFinite(r)?r:0},Vde=(e,t)=>{e.prepare(`INSERT INTO pitfall_meta (key, value) VALUES ('schema_version', ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`).run(String(t))},xB=e=>{LB.default.mkdirSync(vB.default.dirname(e),{recursive:!0});let{DatabaseSync:t}=EB(),r=new t(e);return r.exec(`PRAGMA busy_timeout = ${TB}`),r.exec(CB),Kde(r)<bd&&Vde(r,bd),r},WB=e=>{e.close()}});var jB,MB,qT=l(()=>{"use strict";$T();jB=(e,t,r,o)=>{let n=e.prepare(`INSERT INTO pitfall_hits (project_id, pitfall_id, hit_count, last_seen_at)
       VALUES (?, ?, 1, ?)
       ON CONFLICT(project_id, pitfall_id) DO UPDATE SET
         hit_count = pitfall_hits.hit_count + 1,
         last_seen_at = excluded.last_seen_at
       RETURNING hit_count, last_seen_at`).get(Lo(t),r,o);return{hitCount:n.hit_count,lastSeenAt:n.last_seen_at}},MB=(e,t,r)=>{let o=e.prepare(`SELECT hit_count, last_seen_at FROM pitfall_hits
       WHERE project_id = ? AND pitfall_id = ?`).get(Lo(t),r);return o===void 0?{hitCount:0,lastSeenAt:null}:{hitCount:o.hit_count,lastSeenAt:o.last_seen_at}}});var NB,DB=l(()=>{"use strict";BT();qT();NB=(e,t)=>{let r=t.id.trim(),o=r.length===0?null:lS(e,{projectId:t.projectId,id:r});if(o===null)return{ok:!1,reason:"not_found"};let n=t.nowIso??new Date().toISOString(),s=jB(e,t.projectId,o.id,n);return{ok:!0,pitfall:{...o,hitCount:s.hitCount,lastSeenAt:s.lastSeenAt}}}});var JT,pS,YT=l(()=>{"use strict";JT=u(require("node:path"));Ge();pS=(e,t)=>e.profileEmail!==null?JT.default.join(e.installDir,yt,e.profileEmail,t):JT.default.join(e.installDir,t)});var sl,XT=l(()=>{"use strict";xp();YT();sl=e=>pS(e,OR)});var FB,HB=l(()=>{FB=[{id:"secrets-in-logs",symptom:"Secrets printed in logs/CLI",cause:"Verbose dump of env/files",avoidance:"Print existence / path / fingerprint only",check:{kind:"id",value:"pit.secrets-in-logs"},keywords:["secrets","logs","token","keypair","env","fingerprint"],tags:["secrets"]}]});var Jde,Yde,uS,ZT=l(()=>{"use strict";HB();Jde=FB,Yde=e=>({id:e.id,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags??[],projectId:null,source:"seed",hitCount:0,lastSeenAt:null,severity:"warn"}),uS=()=>Jde.map(Yde)});var $B,zB,UB=l(()=>{"use strict";ht();$B="id, symptom, cause, avoidance, check_kind, check_value, keywords_json, tags_json",zB=(e,t)=>{let r=t.map(()=>"?").join(", "),o=`project_id = '' AND source = 'seed'${t.length>0?` AND id NOT IN (${r})`:""}`,n=TR;e.prepare(`INSERT INTO pitfalls (project_id, ${$B}, source, severity)
     SELECT ?, ${$B}, 'project', severity
     FROM pitfalls
     WHERE ${o}
       AND (EXISTS (SELECT 1 FROM pitfalls WHERE project_id = ?)
         OR EXISTS (SELECT 1 FROM pitfall_hits WHERE project_id = ?))
     ON CONFLICT(project_id, id) DO NOTHING`).run(n,...t,n,n);let s=e.prepare(`DELETE FROM pitfalls WHERE ${o}`).run(...t);return Number(s.changes)}});var BB,GB=l(()=>{"use strict";ZT();Tp();UB();BB=e=>{let t=uS();return zB(e,t.map(r=>r.id)),t.reduce((r,o)=>rl(e,null,o.id)!==null?r:(nS(e,o),r+1),0)}});var KB,VB,qB=l(()=>{"use strict";xp();KB=e=>e.id.trim().length===0?{kind:"empty_id"}:e.projectId.trim().length===0?{kind:"empty_project_id"}:e.symptom.length>Sy?{kind:"field_too_long",field:"symptom",max:Sy}:e.cause.length>Py?{kind:"field_too_long",field:"cause",max:Py}:e.avoidance.length>Ay?{kind:"field_too_long",field:"avoidance",max:Ay}:null,VB=e=>e.activeCountAfter>ka?{kind:"active_cap",max:ka}:null});var JB,YB=l(()=>{"use strict";Tp();qT();Cp();aS();qB();JB=(e,t)=>{let r=KB(t);if(r!==null)return{ok:!1,error:r};let o=t.id.trim(),n=rl(e,t.projectId,o),s=MB(e,t.projectId,o),i=t.source??"project",a={id:o,projectId:t.projectId,symptom:t.symptom,cause:t.cause,avoidance:t.avoidance,check:t.check,keywords:t.keywords,tags:t.tags??[],source:i,hitCount:s.hitCount,lastSeenAt:s.lastSeenAt,severity:t.severity??n?.severity??"warn"},d=qs(e,{projectId:t.projectId,includeRetired:!0}).filter(g=>g.id!==a.id),p=uB([...d,a]),m=VB({activeCountAfter:p});return m!==null?{ok:!1,error:m}:(nS(e,a),{ok:!0,pitfall:a})}});var Ys,QT=l(()=>{"use strict";BT();Cp();RB();OB();DB();XT();GB();YB();Ys=e=>{let t=e.dbPath??(e.layout!==void 0?sl(e.layout):(()=>{throw new Error("createPitfallRegistry requires dbPath or layout")})()),r=xB(t);return BB(r),{dbPath:t,listPitfalls:o=>mB(r,o),getPitfall:o=>lS(r,o),upsertPitfall:o=>JB(r,o),recordHit:o=>NB(r,o),matchPitfalls:o=>kB(r,o),close:()=>WB(r)}}});var Xde,Zde,mS,eC=l(()=>{"use strict";vp();UT();Xde=(e,t,r)=>{let o=t.projectId?.trim();return o!==void 0&&o.length>0?o:r===null||e.resolveProjectId===void 0?null:e.resolveProjectId(r)},Zde=(e,t,r,o)=>{for(let n of o)try{t.recordHit({projectId:r,id:n.id})}catch(s){e.logError?.(s)}},mS=(e,t)=>{try{let r=t.cwd?.trim()??"",o=r.length>0?r:null;if(o!==null&&e.isDeclined?.(o)===!0)return{status:"none"};let n=Xde(e,t,o);if(n===null||e.registry===null)return{status:"none",promptCreate:o!==null};let s=e.registry.matchPitfalls({projectId:n,text:t.message??""});if(s.length===0)return{status:"miss",projectId:n};Zde(e,e.registry,n,s);let i=sS(s);return{status:"hit",projectId:n,pitfalls:i,tip:Lp(i)}}catch(r){return e.logError?.(r),{status:"none"}}}});var gS,XB=l(()=>{"use strict";vp();gS={name:ol.name,description:ol.description,inputSchema:ol.inputSchema}});var vo,ZB,QB,xo,Qde,il,eG,Wp=l(()=>{"use strict";vo=u(require("node:fs")),ZB=u(require("node:os")),QB=u(require("node:path")),xo=()=>({readUtf8:e=>vo.default.readFileSync(e,"utf8"),writeUtf8:(e,t)=>{vo.default.writeFileSync(e,t,"utf8")},exists:e=>vo.default.existsSync(e),mkdirp:e=>{vo.default.mkdirSync(e,{recursive:!0})},rename:(e,t)=>{vo.default.renameSync(e,t)},realpath:e=>vo.default.realpathSync.native(e)}),Qde=()=>({homedir:()=>ZB.default.homedir()}),il=()=>({...xo(),...Qde()}),eG=e=>({...xo(),homedir:()=>e,realpath:r=>{let o=QB.default.resolve(r);return vo.default.existsSync(o)?vo.default.realpathSync.native(o):o}})});var fS,tG=l(()=>{"use strict";fS=(e,t)=>{let r=e.trim();if(r.length===0)return r;try{return t.exists(r)?t.realpath(r):r}catch{return r}}});var tC,rG=l(()=>{"use strict";YT();Sr();tC=e=>pS(e,d$)});var oG,nt,Wo=l(()=>{"use strict";oG=u(require("node:path")),nt=e=>{let{fs:t,filePath:r,contents:o}=e;t.mkdirp(oG.default.dirname(r));let n;e.backup===!0&&t.exists(r)&&(n=`${r}.aw-bak.${new Date().toISOString().replaceAll(":","-")}`,t.writeUtf8(n,t.readUtf8(r)));let s=`${r}.aw-tmp`;return t.writeUtf8(s,o),t.rename(s,r),n!==void 0?{backupPath:n}:{}}});var yS,epe,Op,nG,hS,SS,al,PS=l(()=>{"use strict";Wp();tG();rG();Wo();yS=()=>({byRealpath:{}}),epe=e=>{try{let t=JSON.parse(e);if(typeof t!="object"||t===null)return yS();let r=t.byRealpath;return typeof r!="object"||r===null?yS():{byRealpath:r}}catch{return yS()}},Op=(e,t=xo())=>{let r=tC(e);return t.exists(r)?epe(t.readUtf8(r)):yS()},nG=(e,t,r)=>{nt({fs:r,filePath:tC(e),contents:`${JSON.stringify(t,null,2)}
`})},hS=e=>{let t=e.fs??xo(),r=fS(e.cwd,t),o={declinedAt:e.nowIso??new Date().toISOString(),cwd:e.cwd},n=Op(e.layout,t);return nG(e.layout,{byRealpath:{...n.byRealpath,[r]:o}},t),o},SS=e=>{let t=e.fs??xo(),r=fS(e.cwd,t),o=Op(e.layout,t);if(o.byRealpath[r]===void 0)return!1;let n=Object.fromEntries(Object.entries(o.byRealpath).filter(([s])=>s!==r));return nG(e.layout,{byRealpath:n},t),!0},al=e=>{let t=e.fs??xo(),r=fS(e.cwd,t);return Op(e.layout,t).byRealpath[r]!==void 0}});var vn,AS,rC=l(()=>{"use strict";vn=(e,t)=>{let r=e[t];if(typeof r!="string")return;let o=r.trim();return o.length>0?o:void 0},AS=e=>{if(typeof e!="object"||e===null||Array.isArray(e))return{};let t=e;return{...vn(t,"cwd")!==void 0?{cwd:vn(t,"cwd")}:{},...vn(t,"message")!==void 0?{message:vn(t,"message")}:{},...vn(t,"sessionId")!==void 0?{sessionId:vn(t,"sessionId")}:{},...vn(t,"projectId")!==void 0?{projectId:vn(t,"projectId")}:{}}}});var xn,_S=l(()=>{"use strict";_t();eC();QT();PS();rC();xn=e=>{let t=e.logError??(o=>{let n=o instanceof Error?o.message:String(o);console.error(`[agent-witch] check_context: ${n}`)}),r=e.isDeclined??(o=>al({layout:e.layout,cwd:o}));return o=>{let n=AS(o),s=null;try{return s=Ys({layout:e.layout}),mS({registry:s,resolveProjectId:PT,isDeclined:r,logError:t},n)}catch(i){return t(i),{status:"none"}}finally{s?.close()}}}});var sG,iG=l(()=>{"use strict";sG=["AgentWitch \xB7 check_context: this folder is not an AgentWitch project yet.","Ask the user once whether to add it in AgentWitch Local (Projects) so saved pitfalls show up here.","If they decline or ignore it, do not ask again this session."].join(`
`)});var tpe,oC,rpe,ope,npe,bS,nC=l(()=>{"use strict";iG();tpe="UserPromptSubmit",oC=(e,t)=>{let r=e[t];return typeof r=="string"&&r.trim().length>0?r:void 0},rpe=e=>{let t;try{t=JSON.parse(e)}catch{return null}if(typeof t!="object"||t===null||Array.isArray(t))return null;let r=t,o=oC(r,"cwd"),n=oC(r,"prompt"),s=oC(r,"session_id");return{...o!==void 0?{cwd:o}:{},...n!==void 0?{message:n}:{},...s!==void 0?{sessionId:s}:{}}},ope=e=>{if(e.status==="hit"){let t=e.tip?.trim()??"";return t.length>0?t:null}return e.status==="none"&&e.promptCreate===!0?sG:null},npe=e=>`${JSON.stringify({hookSpecificOutput:{hookEventName:tpe,additionalContext:e}})}
`,bS=async e=>{try{let t=rpe(await e.readStdin());if(t===null)return e.writeStderr(`[agent-witch] mcp-hook: stdin is not a JSON object
`),0;let r=ope(await e.runCheckContext(t));r!==null&&e.writeStdout(npe(r))}catch(t){let r=t instanceof Error?t.message:String(t);try{e.writeStderr(`[agent-witch] mcp-hook: ${r}
`)}catch{}}return 0}});var spe,ipe,aG,lG=l(()=>{"use strict";_S();nC();spe=1500,ipe=(e,t)=>new Promise(r=>{let o=[],n=!1,s=()=>{n||(n=!0,clearTimeout(i),e.removeAllListeners("data"),e.removeAllListeners("end"),e.removeAllListeners("error"),e.pause(),r(Buffer.concat(o).toString("utf8")))},i=setTimeout(s,t);e.on("data",a=>{o.push(Buffer.isBuffer(a)?a:Buffer.from(a,"utf8"))}),e.on("end",s),e.on("error",s)}),aG=async e=>{let t=r=>{process.stderr.write(r)};return bS({readStdin:()=>ipe(process.stdin,spe),writeStdout:r=>{process.stdout.write(r)},writeStderr:t,runCheckContext:xn({layout:e.layout,logError:r=>{let o=r instanceof Error?r.message:String(r);t(`[agent-witch] mcp-hook check_context: ${o}
`)}})})}});var ape,kS,cG=l(()=>{"use strict";_S();rC();ape="/api/local/check-context",kS=async e=>{if(e.pathname!==ape)return!1;if(e.method!=="POST")return e.response.writeHead(405),e.response.end(),!0;let t={};try{let o=await e.readBody(e.request);t=o.length>0?JSON.parse(o):{}}catch{return e.sendJson(e.response,400,{status:"none"}),!0}let r=xn({layout:e.layout,isDeclined:e.isDeclined});return e.sendJson(e.response,200,r(AS(t))),!0}});var dG,RS,lpe,cpe,pG,uG=l(()=>{"use strict";dG=u(require("node:path"));Sr();Wo();RS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),lpe={hooks:[{type:"command",command:WR,timeout:3,[ks]:!0}]},cpe=e=>Array.isArray(e)&&e.some(t=>RS(t)&&Array.isArray(t.hooks)&&t.hooks.some(r=>RS(r)&&(r.command===WR||r[ks]===!0))),pG=e=>{let t=dG.default.join(e.io.homedir(),c$),r={};if(e.io.exists(t))try{let a=JSON.parse(e.io.readUtf8(t));RS(a)&&(r={...a})}catch{r={}}let o=RS(r.hooks)?{...r.hooks}:{},n=o.UserPromptSubmit;if(cpe(n))return{ok:!0,path:t,wrote:!1};let s=Array.isArray(n)?[...n]:[];s.push(lpe),o.UserPromptSubmit=s;let{backupPath:i}=nt({fs:e.io,filePath:t,contents:`${JSON.stringify({...r,hooks:o},null,2)}
`,backup:e.io.exists(t)});return{ok:!0,path:t,wrote:!0,backupPath:i}}});var ll,wS=l(()=>{"use strict";Sr();ll=e=>{let t=e.begin??Pa,r=e.end??Aa,o=`${t}
${e.blockBody.trimEnd()}
${r}
`,n=e.existing.indexOf(t);if(n<0){let p=`${e.existing.length===0||e.existing.endsWith(`
`)?e.existing:`${e.existing}
`}${o}`;return{next:p,changed:p!==e.existing}}let s=e.existing.indexOf(r,n);if(s<0){let d=`${e.existing.slice(0,n)}${o}`;return{next:d,changed:d!==e.existing}}let i=s+r.length,a=e.existing.slice(i).replace(/^\n/,""),c=`${e.existing.slice(0,n)}${o}${a}`;return{next:c,changed:c!==e.existing}}});var mG,dpe,gG,fG=l(()=>{"use strict";mG=u(require("node:path"));wS();Sr();Wo();dpe=["On the first user message of a session, call the AgentWitch MCP tool","`check_context` with the current cwd.","If status is miss or none (declined), stay silent. If hit, follow the tip."].join(`
`),gG=e=>{let t=mG.default.join(e.io.homedir(),l$),r=e.io.exists(t)?e.io.readUtf8(t):"",{next:o,changed:n}=ll({existing:r,blockBody:dpe,begin:Pa,end:Aa});if(!n)return{ok:!0,path:t,wrote:!1};let{backupPath:s}=nt({fs:e.io,filePath:t,contents:o,backup:r.length>0});return{ok:!0,path:t,wrote:!0,backupPath:s}}});var yG,hG,SG=l(()=>{"use strict";yG=u(require("node:path"));wS();Sr();Wo();hG=e=>{let t=yG.default.join(e.io.homedir(),a$),r=yy.map(c=>`"${c}"`).join(", "),o=[`[mcp_servers.${Ad}]`,`command = "${_d}"`,`args = [${r}]`].join(`
`),n=e.io.exists(t)?e.io.readUtf8(t):"",{next:s,changed:i}=ll({existing:n,blockBody:o,begin:Pa,end:Aa});if(!i)return{ok:!0,path:t,wrote:!1};let{backupPath:a}=nt({fs:e.io,filePath:t,contents:s,backup:n.length>0});return{ok:!0,path:t,wrote:!0,backupPath:a}}});var PG,sC,AG,_G=l(()=>{"use strict";PG=u(require("node:path"));Sr();Wo();sC=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),AG=e=>{let t=PG.default.join(e.io.homedir(),i$),r={command:_d,args:[...yy]},o={};if(e.io.exists(t))try{let d=JSON.parse(e.io.readUtf8(t));sC(d)&&(o={...d})}catch{o={}}let n=sC(o.mcpServers)?{...o.mcpServers}:{},s=n[Ad];if(sC(s)&&s.command===r.command&&Array.isArray(s.args)&&JSON.stringify(s.args)===JSON.stringify(r.args))return{ok:!0,path:t,wrote:!1};n[Ad]=r;let a={...o,mcpServers:n},{backupPath:c}=nt({fs:e.io,filePath:t,contents:`${JSON.stringify(a,null,2)}
`,backup:e.io.exists(t)});return{ok:!0,path:t,wrote:!0,backupPath:c}}});var cl,iC=l(()=>{"use strict";Wp();uG();fG();SG();_G();cl=e=>{let t=e?.io??il();return{ok:!0,cursorMcp:AG({io:t}),codexConfig:hG({io:t}),codexAgents:gG({io:t}),claudeHook:pG({io:t})}}});var bG,kG=l(()=>{"use strict";Sr();bG=e=>{let t=["On the first user message of a session, call the AgentWitch MCP tool","`check_context` with this folder's cwd.",`projectId: ${e}`,"If status is miss or none (already declined), stay silent.","If status is hit, follow the tip. Do not dump large context."].join(`
`);return["---","description: AgentWitch check_context (token-saver)","alwaysApply: true","---","",_a,t,Pd,""].join(`
`)}});var RG,ppe,wG,EG=l(()=>{"use strict";RG=u(require("node:path"));kG();Sr();wS();Wo();ppe=e=>e.slice(e.indexOf(_a)+_a.length,e.indexOf(Pd)).trim(),wG=e=>{let t=RG.default.join(e.projectRoot,fy),r=bG(e.projectId);if(!e.fs.exists(t))return nt({fs:e.fs,filePath:t,contents:r}),{ok:!0,path:t,wrote:!0};let{next:o,changed:n}=ll({existing:e.fs.readUtf8(t),blockBody:ppe(r),begin:_a,end:Pd});if(!n)return{ok:!0,path:t,wrote:!1};let{backupPath:s}=nt({fs:e.fs,filePath:t,contents:o,backup:!0});return{ok:!0,path:t,wrote:!0,backupPath:s}}});var lC,aC,TG,CG=l(()=>{"use strict";lC=u(require("node:path"));Wo();aC="# agent-witch-token-saver (local; never commit)",TG=e=>{let t=lC.default.join(e.repoRoot,".git");if(!e.fs.exists(t))return{ok:!1,reason:"not a git working tree"};let r=lC.default.join(t,"info","exclude"),o=e.fs.exists(r)?e.fs.readUtf8(r):"",n=o.length>0?o.split(/\r?\n/):[],s=new Set(n.map(c=>c.trim())),i=e.relativePaths.filter(c=>!s.has(c));if(i.length===0&&s.has(aC))return{ok:!0,path:r,wrote:!1};let a=[...n];for(;a.length>0&&a[a.length-1]==="";)a.pop();s.has(aC)||a.push("",aC);for(let c of i)a.push(c);return a.push(""),nt({fs:e.fs,filePath:r,contents:a.join(`
`)}),{ok:!0,path:r,wrote:i.length>0}}});var ES,cC=l(()=>{"use strict";Sr();EG();CG();ES=e=>{let t=wG({fs:e.fs,projectRoot:e.projectRoot,projectId:e.projectId}),r=TG({fs:e.fs,repoRoot:e.projectRoot,relativePaths:[fy]});return{ok:!0,cursorRule:t,gitExclude:r}}});var dC,pC,TS,uC,mC=l(()=>{"use strict";dC=["pitfalls","preflight","localMcp","history","ollama","skillGen"],pC=["on","off","degraded","unavailable"],TS={pitfalls:"on",preflight:"on",localMcp:"on",history:"off",ollama:"off",skillGen:"off"},uC=()=>({...TS})});var upe,mpe,gC,IG=l(()=>{"use strict";mC();upe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),mpe=e=>pC.find(t=>t===e)??null,gC=e=>{if(!upe(e))return null;let t={...TS};for(let r of dC){let o=mpe(e[r]);o!==null&&(t[r]=o)}return t}});var LG=l(()=>{"use strict";mC();IG()});var vG,gpe,fpe,xG,WG=l(()=>{"use strict";vG=u(require("node:path"));_t();LG();Wo();gpe="token-saver.json",fpe=(e,t)=>{if(!e.exists(t))return null;try{return gC(JSON.parse(e.readUtf8(t)))}catch{return null}},xG=e=>{let t=vG.default.join(e.projectRoot,dd,gpe),r=e.flags??{...uC(),...fpe(e.fs,t)},o=`${JSON.stringify(r,null,2)}
`;return e.fs.exists(t)&&e.fs.readUtf8(t)===o?{ok:!0,path:t,wrote:!1}:(nt({fs:e.fs,filePath:t,contents:o}),{ok:!0,path:t,wrote:!0})}});var Oo,Zr,CS,fC=l(()=>{"use strict";Oo=(e,t)=>{if(t==="remove")return{ok:!0,state:"Connected"};switch(e){case"Unconnected":return t==="connect"?{ok:!0,state:"SigningIn"}:Zr(e,t);case"SigningIn":return t==="signInComplete"?{ok:!0,state:"Connected"}:Zr(e,t);case"Connected":return t==="writeGlobalTriggers"?{ok:!0,state:"GlobalTriggersWritten"}:Zr(e,t);case"GlobalTriggersWritten":return t==="decline"?{ok:!0,state:"Declined"}:t==="accept"?{ok:!0,state:"ProjectResolved"}:t==="writeGlobalTriggers"?{ok:!0,state:"GlobalTriggersWritten"}:Zr(e,t);case"Declined":return t==="clearDecline"?{ok:!0,state:"GlobalTriggersWritten"}:Zr(e,t);case"ProjectResolved":return t==="applyDefaults"?{ok:!0,state:"DefaultsApplied"}:Zr(e,t);case"DefaultsApplied":return t==="writeProjectFragments"?{ok:!0,state:"ProjectFragmentsWritten"}:Zr(e,t);case"ProjectFragmentsWritten":return t==="verify"?{ok:!0,state:"Verified"}:Zr(e,t);case"Verified":return t==="accept"||t==="writeProjectFragments"?{ok:!0,state:e}:Zr(e,t);default:return Zr(e,t)}},Zr=(e,t)=>({ok:!1,reason:`Illegal transition ${e} + ${t}`,state:e}),CS=e=>e==="Declined"});var ype,hpe,OG,jG=l(()=>{"use strict";WG();Wp();PS();fC();iC();cC();ype="projectId required on accept",hpe=e=>{let t=e.projectId;if(e.resolveProject!==void 0)try{t=e.resolveProject(e.cwd).projectId}catch(o){return{ok:!1,reason:`project resolve failed: ${o instanceof Error?o.message:String(o)}`}}let r=t?.trim()??"";return r.length>0?{ok:!0,projectId:r}:{ok:!1,reason:ype}},OG=e=>{let t=e.fs??xo(),r=e.io??il(),o=e.fromState??"GlobalTriggersWritten";if(!e.accept){let d=Oo(o,"decline");return d.ok?(hS({layout:e.layout,cwd:e.cwd,fs:t}),{ok:!0,state:"Declined"}):{ok:!1,state:d.state,reason:d.reason}}let n=CS(o)||al({layout:e.layout,cwd:e.cwd,fs:t});n&&(o="Declined");let s=hpe(e);if(!s.ok)return{ok:!1,state:o,reason:s.reason};if(n){let d=Oo(o,"clearDecline");if(!d.ok)return{ok:!1,state:d.state,reason:d.reason};SS({layout:e.layout,cwd:e.cwd,fs:t}),o=d.state}cl({io:r}),o=Oo(o,"writeGlobalTriggers").ok?"GlobalTriggersWritten":o;let i=Oo(o,"accept");if(!i.ok)return{ok:!1,state:i.state,reason:i.reason};o=i.state;let a=Oo(o,"applyDefaults");if(!a.ok)return{ok:!1,state:a.state,reason:a.reason};xG({fs:t,projectRoot:e.cwd}),o=a.state;let c=Oo(o,"writeProjectFragments");return c.ok?(ES({fs:t,projectRoot:e.cwd,projectId:s.projectId}),{ok:!0,state:c.state,projectId:s.projectId}):{ok:!1,state:c.state,reason:c.reason}}});var MG={};Mt(MG,{AWL_CHECK_CONTEXT_TOOL:()=>gS,checkContext:()=>mS,clearProjectDecline:()=>SS,createCheckContextRunner:()=>xn,createNodeCliIo:()=>il,createPitfallRegistry:()=>Ys,createTempCliIo:()=>eG,declineProjectForCwd:()=>hS,describePitfallCacheAvailability:()=>dS,isDeclinedCwd:()=>al,isDeclinedTerminal:()=>CS,listBundledSeedPitfalls:()=>uS,loadNodeSqlite:()=>zt,matchPitfallsByKeywords:()=>nl,readDeclinedProjectsStore:()=>Op,resolveTokenSaverDbPath:()=>sl,runCheckContextHook:()=>bS,runCheckContextHookCli:()=>aG,runSetupProject:()=>OG,shadowPitfalls:()=>iS,transitionSetupProject:()=>Oo,tryHandleTokenSaverLocalRequest:()=>kS,writeGlobalTriggers:()=>cl,writeProjectFragments:()=>ES});var Qr=l(()=>{"use strict";QT();VT();XT();KT();aS();ZT();eC();XB();_S();nC();lG();cG();iC();cC();jG();PS();fC();Wp()});var yC,NG=l(()=>{"use strict";yC=e=>({id:e.id,projectId:e.projectId,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags,severity:e.severity,source:e.source,overridesSeed:e.source!=="seed",hitCount:e.hitCount,lastSeenAt:e.lastSeenAt,updatedAt:null})});var DG,HG,Spe,Ppe,Ape,IS,hC=l(()=>{"use strict";Qr();_y();NG();DG=e=>{try{return e.dbPath!==void 0?Ys({dbPath:e.dbPath}):e.layout!==void 0?(sl(e.layout),Ys({layout:e.layout})):null}catch{return null}},HG=(e,t,r)=>{let o=e.listPitfalls({projectId:t,includeRetired:r,format:"full"});return o.format==="full"?o.items:[]},Spe=(e,t,r)=>{for(let o of r)o.source!=="seed"&&e.upsertPitfall({id:o.id,projectId:t,symptom:o.symptom,cause:o.cause,avoidance:o.avoidance,check:o.check,keywords:o.keywords,tags:o.tags,severity:o.severity,source:o.source==="retired"?"retired":"project"})},Ppe=e=>e.kind==="active_cap"?{ok:!1,reason:"active_limit"}:{ok:!1,reason:"rejected"},Ape=e=>{let t=e.cloud??null;return{listPitfalls:async(r,o)=>{let n=DG(e);try{if(t!==null){let i=await t.listPitfalls(r,o);if(i.ok)return n!==null?(Spe(n,r,i.items),{ok:!0,items:HG(n,r,o.includeRetired).map(yC),syncedAt:i.syncedAt}):i}return n===null?{ok:!1,reason:"unavailable"}:{ok:!0,items:HG(n,r,o.includeRetired).map(yC),syncedAt:null}}finally{n?.close()}},upsertPitfall:async(r,o)=>{if(t!==null){let s=await t.upsertPitfall(r,o);if(!s.ok)return s}let n=DG(e);if(n===null)return t!==null?{ok:!0}:{ok:!1,reason:"unavailable"};try{let s=n.upsertPitfall({id:o.id,projectId:r,symptom:o.symptom,cause:o.cause,avoidance:o.avoidance,check:o.check,keywords:o.keywords,tags:o.tags,severity:o.severity,source:o.source});return s.ok?{ok:!0}:Ppe(s.error)}finally{n.close()}}}},IS=Ape});var dl,Xs,LS=l(()=>{"use strict";dl=u(require("node:path")),Xs=(e,t)=>{if(!dl.default.isAbsolute(e)||!dl.default.isAbsolute(t))return!1;let r=dl.default.relative(t,e);return r.length===0?!0:r!==".."&&!r.startsWith(`..${dl.default.sep}`)&&!dl.default.isAbsolute(r)}});var vS,FG,$G=l(()=>{"use strict";St();LS();vS=e=>({ok:!1,code:e}),FG=e=>{let t=e.requestedLexicalPath;if(t===null)return vS(ue.FOLDER_REQUIRED);if(e.roots===null)return vS(ue.FOLDER_CHECK_UNAVAILABLE);let r=e.requestedRealPath;if(r===null){let n=e.roots.some(s=>Xs(t,s.lexicalPath));return vS(n?ue.FOLDER_NOT_FOUND:ue.FOLDER_NOT_REGISTERED)}return e.roots.some(n=>n.realPath!==null&&Xs(r,n.realPath))?{ok:!0,folderRealPath:r}:vS(ue.FOLDER_NOT_REGISTERED)}});var AC,zG,SC,PC,_pe,_C,UG=l(()=>{"use strict";AC=u(require("node:fs")),zG=u(require("node:path"));qr();$G();LS();SC=e=>zG.default.resolve(De(e)),PC=e=>{try{return AC.default.realpathSync.native(e)}catch{return null}},_pe=e=>{let t=e.projectId?.trim()??"";if(t.length>0)return e.registeredFolders===null?null:e.registeredFolders.filter(o=>o.projectId===t).map(o=>o.folderPath);let r=(e.registeredFolders??[]).map(o=>o.folderPath);return[e.defaultFolderPath,...r]},_C=e=>{let t=_pe(e)?.map(SC)??null,r=e.requestedFolderPath?.trim()??"",o=r.length>0?SC(r):null;return o!==null&&PC(o)===null&&Xs(o,SC(e.managedProjectsDir))&&(t??[]).includes(o)&&AC.default.mkdirSync(o,{recursive:!0}),FG({requestedLexicalPath:o,requestedRealPath:o===null?null:PC(o),roots:t?.map(n=>({lexicalPath:n,realPath:PC(n)}))??null})}});var BG,bC,GG=l(()=>{"use strict";kr();BG=new Map,bC=async(e,t=Ks)=>{let r=J(e);if(r===null)return null;let o=await t(r);if(o===null)return BG.get(r.pairingToken)??null;let n=o.map(s=>({projectId:s.id,folderPath:s.folderPath}));return BG.set(r.pairingToken,n),n}});var jp,KG,bpe,VG,kpe,kC,qG,RC=l(()=>{"use strict";jp=u(require("node:fs")),KG=u(require("node:path")),bpe="linked-project-folders.json",VG=e=>KG.default.join(e,bpe),kpe=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.projectId=="string"&&typeof t.folderPath=="string"&&typeof t.linkedAt=="string"&&typeof t.isGitRepo=="boolean"&&(t.projectName===null||typeof t.projectName=="string")},kC=e=>{try{let r=JSON.parse(jp.default.readFileSync(VG(e),"utf8"))?.folders;return Array.isArray(r)?r.filter(kpe):[]}catch{return[]}},qG=(e,t)=>{let r=[...kC(e).filter(s=>s.projectId!==t.projectId),t],o=VG(e),n=`${o}.${process.pid}.tmp`;jp.default.mkdirSync(e,{recursive:!0}),jp.default.writeFileSync(n,`${JSON.stringify({version:1,folders:r},null,2)}
`,{mode:384}),jp.default.renameSync(n,o)}});var wC,JG,EC,Rpe,wpe,jo,TC=l(()=>{"use strict";wC=u(require("node:fs")),JG=u(require("node:os")),EC=u(require("node:path"));RC();Rpe=(e,t)=>e===t||e.startsWith(`${t}${EC.default.sep}`)?`~${e.slice(t.length)}`:e,wpe=e=>{try{return wC.default.statSync(e).isDirectory()}catch{return!1}},jo=(e,t=JG.default.homedir())=>{let r=kC(e).map(n=>{let s=wpe(n.folderPath),i=s&&wC.default.existsSync(EC.default.join(n.folderPath,".git")),a=n.projectName??`Project ${n.projectId.slice(0,8)}`,c=Rpe(n.folderPath,t),d=s?`${a} uses ${c}${i?" (git repo)":" (not a git repo)"}.`:`${a}: linked folder ${c} is missing on this computer.`;return{projectId:n.projectId,projectName:n.projectName,folderPath:n.folderPath,linkedAt:n.linkedAt,folderFound:s,isGitRepo:i,summary:d}});return{summary:r.length===0?"No project folder linked on this computer yet.":r.map(n=>n.summary).join(" "),folders:r}}});var Qs,XG,xS,Epe,Zs,YG,ZG,QG=l(()=>{"use strict";Qs=u(require("node:fs")),XG=u(require("node:os")),xS=u(require("node:path"));qr();LS();Epe={folder_required:"Choose a folder to link.",folder_not_absolute:"Use a full folder path, like ~/daily-magic.",folder_not_found:"That folder does not exist on this computer.",not_a_folder:"That path is a file, not a folder.",folder_not_readable:"AgentWitch cannot read that folder.",folder_is_home:"Your whole home folder is too broad. Pick the project folder inside it.",folder_outside_home:"That folder is outside your home folder. Pick one inside your home folder, or confirm it explicitly."},Zs=e=>({ok:!1,code:e,message:Epe[e]}),YG=e=>{try{return Qs.default.realpathSync.native(e)}catch{return null}},ZG=e=>{let t=e.folderPath.trim();if(t.length===0||t.includes("\0"))return Zs("folder_required");let r=De(t);if(!xS.default.isAbsolute(r))return Zs("folder_not_absolute");let o=YG(xS.default.resolve(r));if(o===null)return Zs("folder_not_found");if(!Qs.default.statSync(o).isDirectory())return Zs("not_a_folder");try{Qs.default.accessSync(o,Qs.default.constants.R_OK|Qs.default.constants.X_OK)}catch{return Zs("folder_not_readable")}let n=YG(e.homeDir??XG.default.homedir());return n!==null&&o===n?Zs("folder_is_home"):!(n!==null&&Xs(o,n))&&e.allowOutsideHome!==!0?Zs("folder_outside_home"):{ok:!0,folderRealPath:o,isGitRepo:Qs.default.existsSync(xS.default.join(o,".git"))}}});var Tpe,Mo,e2=l(()=>{"use strict";kr();up();Ja();DT();TC();RC();QG();Tpe=/^[A-Za-z0-9_-]{1,128}$/,Mo=async e=>{let t=e.projectId.trim();if(!Tpe.test(t))return{ok:!1,httpStatus:400,code:"project_id_invalid",message:"Pick an AgentWitch project first."};let r=ZG({folderPath:e.folderPath,...e.allowOutsideHome!==void 0?{allowOutsideHome:e.allowOutsideHome}:{},...e.homeDir!==void 0?{homeDir:e.homeDir}:{}});if(!r.ok)return{ok:!1,httpStatus:400,code:r.code,message:r.message};if(e.cloudConfig===null)return{ok:!1,httpStatus:409,code:"not_paired",message:"Connect this computer to AgentWitch first."};let n=await(e.updateCloudFolder??NT)(e.cloudConfig,t,r.folderRealPath);if(!n.ok)return{ok:!1,httpStatus:502,code:"cloud_update_failed",message:n.httpStatus===404?"AgentWitch could not find that project for your account.":"Could not save the folder to AgentWitch. Try again."};$t({projectFolderPath:r.folderRealPath,projectId:t,...n.projectName!==null?{projectName:n.projectName}:{}}),qG(e.profileDir,{projectId:t,projectName:n.projectName,folderPath:r.folderRealPath,isGitRepo:r.isGitRepo,linkedAt:(e.now?.()??new Date).toISOString()});let s=rr(r.folderRealPath),a=await(e.syncHarnessBindings??Co)(e.cloudConfig,t,s),c=jo(e.profileDir,e.homeDir),d=c.folders.find(p=>p.projectId===t)?.summary??c.summary;return{ok:!0,projectId:t,projectName:n.projectName,folderPath:r.folderRealPath,isGitRepo:r.isGitRepo,linkedSetSlugs:s,bindingsSynced:a,summary:d}}});var _t=l(()=>{"use strict";el();Qa();b1();qr();up();k1();fn();W1();j1();K1();Yh();Ja();V1();rB();oB();nB();sB();aB();lB();DT();cB();gT();uT();kr();hC();UG();GG();e2();TC()});var WS,Mp,t2,CC,ei,IC=l(()=>{"use strict";WS=(e,t)=>{let o=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),n=a=>o.find(c=>c.type===a)?.value??"0",s=n("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(n("year")),month:Number(n("month")),day:Number(n("day")),hour:Number(n("hour")),minute:Number(n("minute")),weekday:i[s]??0}},Mp=(e,t,r,o)=>{let n=new Date(Date.UTC(e.year,e.month-1,e.day,r,o,0,0)),s=WS(n,t),i=(s.hour-r)*60+(s.minute-o)+(s.day-e.day)*24*60;return new Date(n.getTime()-i*6e4)},t2=e=>e>=1&&e<=5,CC=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return WS(t,"UTC")},ei=e=>{let t=e.from??new Date,r=WS(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return Mp(r,e.timeZone,c,0)}let o=e.scheduleHour??9,n=Mp(r,e.timeZone,o,0),s=WS(n,e.timeZone),i=t.getTime()>=n.getTime();if(e.preset==="daily")return i?Mp(CC(r),e.timeZone,o,0):n;if(!i&&t2(s.weekday))return n;let a=r;for(let c=0;c<8;c+=1)if(a=CC(a),t2(a.weekday))return Mp(a,e.timeZone,o,0);return Mp(CC(r),e.timeZone,o,0)}});var r2,LC,No,vC=l(()=>{"use strict";r2=require("node:crypto");ne();_t();IC();Gh();LC=!1,No=async e=>{if(LC)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=B();if(t===null)return{ok:!1,errorMessage:"AgentWitch is not configured."};let r=J({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this computer."};let o=Bh(t.layout,e);if(o===null)return{ok:!1,errorMessage:"Automation not found on this computer."};if(!o.enabled)return{ok:!1,errorMessage:"Automation is paused."};LC=!0;let n=(0,r2.randomUUID)();try{let s=await Ua(t,"claude-cli",o.prompt);await dT(r,o.id,{agentRunId:n,exitCode:s.exitCode,output:s.output,prompt:o.prompt});let i=new Date,a=ei({preset:o.schedulePreset,scheduleHour:o.scheduleHour,timeZone:o.scheduleTimezone,from:i});return Uh(t.layout,{...o,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{LC=!1}}});var OS,o2=l(()=>{"use strict";ne();vC();Gh();OS=async()=>{let e=B();if(e===null)return;let t=br(e.layout),r=Date.now();for(let o of t.automations){if(!o.enabled||o.nextRunAt===null||new Date(o.nextRunAt).getTime()>r)continue;let n=await No(o.id);n.ok||process.stderr.write(`[agent-witch] automation ${o.name}: ${n.errorMessage??"run failed"}
`)}}});var Np=l(()=>{"use strict";Gh();o2();vC();IC()});var n2=l(()=>{"use strict";Np()});var s2=l(()=>{"use strict";nT()});var i2=l(()=>{"use strict";s2()});var xC=l(()=>{"use strict";Np()});var Cpe,Ipe,Dp,WC=l(()=>{"use strict";n2();i2();xC();dt();Cpe=e=>e!==void 0&&e.trim().length>0?z(e.trim()):z(),Ipe=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??ei({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??ei({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},Dp=e=>{let t=Cpe(e.profileEmail),r=br(t),o=new Map(r.automations.map(s=>[s.id,s])),n=e.automations.flatMap(s=>{let i=Za(s);return i!==null?[Ipe(i,o.get(i.id))]:[]});return zh(t,n),{ok:!0,writtenCount:n.length}}});var OC=l(()=>{"use strict";Np()});var a2=l(()=>{"use strict";ne()});var l2=l(()=>{"use strict";WC();OC();xC();a2()});var c2,Hp,Fp,$p,d2=l(()=>{"use strict";c2=u(require("node:os"));l2();_p();Xa();Hp=e=>{if(!_r(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!Bs(t))return{ok:!1,errorMessage:"appOrigin is not an allowed AgentWitch site."};if(o===null)return{ok:!1,errorMessage:"automations must be an array."};let n=Dp({automations:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenCount:n.writtenCount}:{ok:!1,errorMessage:n.errorMessage??"Automation sync failed."}},Fp=async e=>{if(!_r(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:Bs(t)?No(r):{ok:!1,errorMessage:"appOrigin is not an allowed AgentWitch site."}},$p=()=>{let e=B(),t=e!==null?br(e.layout):{version:1,automations:[]};return{ok:!0,hostname:c2.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var jC=l(()=>{"use strict";d2()});var jS=l(()=>{"use strict";Ae()});var MS=l(()=>{"use strict";Ae()});var NS,u2,m2,p2,Lpe,vpe,pl,MC=l(()=>{"use strict";NS=u(require("node:fs")),u2=u(require("node:os")),m2=u(require("node:path"));jS();MS();ip();dt();p2=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},Lpe=e=>m2.default.join(u2.default.homedir(),"Library","LaunchAgents",`${e}.plist`),vpe=async e=>NS.default.existsSync(Lpe(e))?(await ct(e)).ok:!1,pl=async(e=x())=>{let t=NS.default.existsSync(lh(e)),r=!NS.default.existsSync(Jt(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let o=sp(e);if(o===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await p2(o))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${Ie(e)}-wake`;await vpe(i)&&s.push(i);for(let c of ke(e))(await ct(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await p2(o);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var g2=l(()=>{"use strict";Ae()});var NC=l(()=>{"use strict";vs();Ae()});var DC=l(()=>{"use strict";vs()});var HC=l(()=>{"use strict";Ae()});var f2,y2,zp,ti=l(()=>{"use strict";f2="local-port-range.json",y2="local-app-port.json",zp="Ports for this account are in use."});var h2,S2,FC=l(()=>{"use strict";ti();h2=e=>{if(typeof e!="object"||e===null||Array.isArray(e))return!1;let t=e,r=t.start,o=t.end;return!(typeof r!="number"||typeof o!="number"||!Number.isInteger(r)||!Number.isInteger(o)||r<49152||o>65535||o-r+1!==16||r>o)},S2=e=>typeof e=="number"&&Number.isInteger(e)&&e>=49152&&e<=65535});var ri,$C,_2,Up,P2,xpe,Wpe,A2,zC,HS=l(()=>{"use strict";ri=u(require("node:fs")),$C=u(require("node:path"));ti();FC();_2=e=>$C.default.join(e,f2),Up=e=>{let t=_2(e);if(!ri.default.existsSync(t))return null;try{let r=JSON.parse(ri.default.readFileSync(t,"utf8"));if(h2(r))return r}catch{return null}return null},P2=(e,t)=>{ri.default.mkdirSync(e,{recursive:!0});let r=_2(e);ri.default.writeFileSync(r,`${JSON.stringify({start:t.start,end:t.end},null,2)}
`,"utf8")},xpe=e=>{let t=new Set;if(!ri.default.existsSync(e))return t;let r=[];try{r=ri.default.readdirSync(e)}catch{return t}for(let o of r){let n=Up($C.default.join(e,o));n!==null&&t.add(n.start)}return t},Wpe=()=>Math.floor(16384/16),A2=e=>{let t=49152+e*16;return{start:t,end:t+16-1}},zC=e=>{let t=Up(e.profileDir);if(t!==null)return t;let r=xpe(e.profilesDir),o=Wpe(),n=e.random??Math.random,s=Math.floor(n()*o)%o;for(let a=0;a<o;a+=1){let c=(s+a)%o,d=A2(c);if(!r.has(d.start))return P2(e.profileDir,d),d}let i=A2(0);return P2(e.profileDir,i),i}});var oi,k2,R2,Ope,UC,$S,FS,zS,b2,BC,US=l(()=>{"use strict";oi=u(require("node:fs")),k2=u(require("node:net")),R2=u(require("node:path"));ti();FC();Ope=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),UC=e=>R2.default.join(e,y2),$S=e=>{let t=UC(e);if(!oi.default.existsSync(t))return null;try{let r=JSON.parse(oi.default.readFileSync(t,"utf8"));if(Ope(r)&&S2(r.localAppPort))return r.localAppPort}catch{return null}return null},FS=(e,t)=>{oi.default.mkdirSync(e,{recursive:!0}),oi.default.writeFileSync(UC(e),`${JSON.stringify({localAppPort:t},null,2)}
`,"utf8")},zS=e=>{oi.default.mkdirSync(e,{recursive:!0}),oi.default.writeFileSync(UC(e),`${JSON.stringify({portsExhausted:!0},null,2)}
`,"utf8")},b2=(e,t="127.0.0.1")=>new Promise(r=>{let o=k2.default.createServer();o.once("error",()=>{r(!1)}),o.listen(e,t,()=>{o.close(()=>r(!0))})}),BC=async e=>{let t=$S(e.profileDir);if(t!==null&&t>=e.range.start&&t<=e.range.end&&await b2(t))return FS(e.profileDir,t),{ok:!0,port:t};for(let r=e.range.start;r<=e.range.end;r+=1)if(await b2(r))return FS(e.profileDir,r),{ok:!0,port:r};return zS(e.profileDir),{ok:!1,reason:zp}}});var E2,T2,jpe,GC,KC=l(()=>{"use strict";E2=u(require("node:fs")),T2=u(require("node:path"));HS();ti();US();jpe=e=>{try{return E2.default.readdirSync(e,{withFileTypes:!0}).filter(t=>t.isDirectory()).map(t=>T2.default.join(e,t.name)).sort()}catch{return[]}},GC=e=>{let t=[],r=n=>{t.includes(n)||t.push(n)},o=jpe(e);for(let n of o){let s=$S(n);s!==null&&r(s)}for(let n of o){let s=Up(n);if(s!==null)for(let i=s.start;i<=s.end;i+=1)r(i)}return r(43347),t}});var L2,v2,C2,Mpe,I2,Bp,VC=l(()=>{"use strict";L2=u(require("node:fs")),v2=u(require("node:path"));KC();jS();MS();dt();C2=e=>GC(v2.default.join(e,"profiles")),Mpe=async e=>{try{let t=await e.json();if(typeof t!="object"||t===null)return!0;let r=t.osUid;return typeof r!="number"||typeof process.getuid!="function"||r===process.getuid()}catch{return!0}},I2=async(e,t=1500)=>{for(let r of e)try{let o=await fetch(`http://127.0.0.1:${r}/health`,{signal:AbortSignal.timeout(t)});if(o.ok&&await Mpe(o))return r}catch{}return null},Bp=async(e=x())=>{if(!L2.default.existsSync(Jt(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[],reachablePort:null};let r=await I2(C2(e));if(r!==null)return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[],reachablePort:r};let o=[];for(let s of ke(e))(await ct(s.launchAgentLabel)).ok&&o.push(s.launchAgentLabel);let n=await I2(C2(e));return{ok:n!==null||o.length>0,liveReachable:n!==null,hollowInstall:!1,kickstartedLabels:o,reachablePort:n}}});var x2=l(()=>{"use strict";Ae()});var W2,ni,qC,Npe,Dpe,Hpe,O2,Fpe,j2,gl,BS=l(()=>{"use strict";W2=require("node:crypto"),ni=u(require("node:fs")),qC=u(require("node:path"));dt();Npe="watchdog-log.ndjson",Dpe=200,Hpe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),O2=(e=x())=>{let t=z(),r=t.installDir===e?t.logsDir:ms({installDir:e,profileEmail:t.profileEmail});return qC.default.join(r,Npe)},Fpe=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!Hpe(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},j2=(e,t=x())=>{let r={id:(0,W2.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},o=O2(t);ni.default.mkdirSync(qC.default.dirname(o),{recursive:!0});let n=ni.default.existsSync(o)?ni.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-Dpe+1)),JSON.stringify(r)];return ni.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},gl=(e=20,t=x())=>{let r=O2(t);if(!ni.default.existsSync(r))return[];let o=ni.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=Fpe(n);return s===null?[]:[s]});return o.slice(Math.max(0,o.length-e))}});var JC,YC,XC,ZC=l(()=>{"use strict";Ge();JC=Mc.watchdogReinstallState,YC=900*1e3,XC=3e3});var M2=l(()=>{"use strict";ZC()});var N2={};Mt(N2,{verifyAgentWitchReviveAfterKickstart:()=>zpe});var $pe,zpe,D2=l(()=>{"use strict";M2();DC();HC();dt();$pe=e=>new Promise(t=>{setTimeout(t,e)}),zpe=async e=>{if(await $pe(e.verifyDelayMs??XC),!await ys(e.launchAgentLabel))return!1;let r=e.profileEmail===null?z():z(e.profileEmail),o=Ue(r);return!tt(o,e.staleAfterMs)}});var Gp,QC,Upe,H2,F2,eI,tI,rI=l(()=>{"use strict";Gp=u(require("node:fs")),QC=u(require("node:path"));Q();ZC();Upe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),H2=e=>QC.default.join(e,JC),F2=(e=x())=>{let t=H2(e);if(!Gp.default.existsSync(t))return null;try{let r=JSON.parse(Gp.default.readFileSync(t,"utf8"));return!Upe(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},eI=(e=x(),t=Date.now())=>{let r=F2(e);if(r===null)return!0;let o=Date.parse(r.lastAttemptAt);return Number.isFinite(o)?t-o>=YC:!0},tI=(e=x(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},o=H2(e);return Gp.default.mkdirSync(QC.default.dirname(o),{recursive:!0}),Gp.default.writeFileSync(o,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var oI,$2=l(()=>{"use strict";Ae();rI();oI=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!eI())return{attempted:!1,ok:!1,targets:e};tI();let o=await t();if(!o.ok)return{attempted:!0,ok:!1,errorMessage:o.errorMessage,targets:e};let n=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await ct(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:n.some(s=>s.revived||s.reason==="healthy"),targets:n}}});var z2=l(()=>{"use strict";rI();$2()});var nI=l(()=>{"use strict";Kr()});var U2=l(()=>{"use strict";Kr()});var B2,fl,G2,K2,V2,Bpe,Gpe,q2,Kpe,Vpe,J2,Y2=l(()=>{"use strict";B2=require("node:child_process"),fl=u(require("node:fs")),G2=u(require("node:os")),K2=u(require("node:path")),V2=require("node:util");nI();U2();dt();Bpe=(0,V2.promisify)(B2.execFile),Gpe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),q2=e=>{let t=lt(e),r=t===null?z():z(t);if(!fl.default.existsSync(r.configPath))return null;try{let o=JSON.parse(fl.default.readFileSync(r.configPath,"utf8"));return!Gpe(o)||typeof o.wsUrl!="string"||typeof o.pairingToken!="string"||o.pairingToken.trim().length===0?null:{wsUrl:o.wsUrl,pairingToken:o.pairingToken.trim(),email:typeof o.email=="string"&&o.email.trim().length>0?o.email.trim().toLowerCase():t??void 0}}catch{return null}},Kpe=e=>q2(e)?.wsUrl??null,Vpe=e=>{let t=Kpe(e);return t!==null?et(t):ze(e)?.appOrigin??null},J2=async e=>{let t=e?.installDir??x(),r=q2(t),o=r!==null?et(r.wsUrl):Vpe(t);if(o===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let n=new URL(`${o}/install/agent-witch.sh`);n.searchParams.set("token",r.pairingToken),r.email!==void 0&&n.searchParams.set("email",r.email);let s=await fetch(n.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=K2.default.join(G2.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{fl.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??lt(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await Bpe("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"AgentWitch reinstall script failed."}}finally{fl.default.existsSync(i)&&fl.default.unlinkSync(i)}}});var X2={};Mt(X2,{attemptAgentWitchWatchdogReinstall:()=>qpe});var qpe,Z2=l(()=>{"use strict";z2();Y2();qpe=async e=>oI(e,()=>J2())});var Q2,eK,tK,Jpe,Ype,Xpe,Kp,sI=l(()=>{"use strict";g2();NC();DC();HC();VC();MC();jS();MS();dt();La();x2();BS();Q2=e=>e===null?z():z(e),eK=async(e,t,r)=>{if(!await ys(e))return"not_running";let n=Q2(t);if(Qt(n))return"healthy";let s=Ue(n);return tt(s,r)?"stale_connection":"healthy"},tK=async e=>{let t=e?.staleAfterMs??12e4,r=x(),o=ke(r);return Promise.all(o.map(async n=>{let s=await eK(n.launchAgentLabel,n.profileEmail,t),i=Q2(n.profileEmail),a=Ue(i),c=await ys(n.launchAgentLabel);return{launchAgentLabel:n.launchAgentLabel,profileEmail:n.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:tt(a,t),needsRevive:s!=="healthy",reason:s}}))},Jpe=(e,t)=>{let r=e.filter(n=>n.revived);if(r.length>0)return`Revived ${r.map(n=>n.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled AgentWitch from install script and retried kickstart.":t.reinstallErrorMessage??"AgentWitch reinstall from install script failed.";let o=e.filter(n=>n.reason!=="healthy"&&!n.revived);return o.length>0?o.map(n=>n.errorMessage??n.launchAgentLabel).join("; "):"All AgentWitch WebSocket connections are healthy."},Ype=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(o=>o.revived)?"revive_triggered":t?"check_complete":"revive_failed",Xpe=async e=>{let t=await ct(e.launchAgentLabel),r=t.ok,o=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:n}=await Promise.resolve().then(()=>(D2(),N2)),s=await n({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(o="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...o!==void 0?{errorMessage:o}:{}}},Kp=async e=>{if(!yr())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=x();await pl(r),await Bp(r);let o=ke(r),n=[];for(let p of o){let m=await eK(p.launchAgentLabel,p.profileEmail,t);if(m==="healthy"){n.push({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,revived:!1,reason:m});continue}n.push(await Xpe({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,reason:m,staleAfterMs:t}))}if(n.length===0){let p=gs();n.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:p.ok,reason:"not_running",...p.errorMessage!==void 0?{errorMessage:p.errorMessage}:{}})}let s=!1,i=!1,a,c=n;if(n.some(p=>p.reason!=="healthy"&&!p.revived))try{let{attemptAgentWitchWatchdogReinstall:p}=await Promise.resolve().then(()=>(Z2(),X2)),m=await p(n);s=m.attempted,i=m.ok,a=m.errorMessage,c=[...m.targets]}catch(p){s=!0,i=!1,a=p instanceof Error?p.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(p=>p.revived||p.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&j2({event:Ype(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:Jpe(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var rK,GS,oK=l(()=>{"use strict";rK=u(require("node:os"));NC();BS();sI();GS=async()=>{let e=await tK(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:rK.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:gl(1)[0]??null}}});var iI=l(()=>{"use strict";MC();sI();oK();BS()});var Vp,qp,Jp,nK=l(()=>{"use strict";Ae();iI();Vp=async()=>{await pl();let e=ke(),t=[];for(let r of e){let o=await ct(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:o.ok,...o.errorMessage!==void 0?{errorMessage:o.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=gs();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},qp=Kp,Jp=Kp});var aI=l(()=>{"use strict";nK()});var VS,KS,sK,lI,iK,Zpe,Qpe,eue,tue,rue,qS,aK=l(()=>{"use strict";VS=require("node:child_process"),KS=u(require("node:fs")),sK=u(require("node:os")),lI=u(require("node:path")),iK=require("node:util");Ae();Q();fs();Zpe=(0,iK.promisify)(VS.execFile),Qpe=()=>lI.default.join(sK.default.homedir(),"Library","LaunchAgents"),eue=async e=>{if(!Yt())return;let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await Zpe("launchctl",["bootout",r]).catch(()=>{})},tue=e=>{let t=lI.default.join(Qpe(),`${e}.plist`);KS.default.existsSync(t)&&KS.default.unlinkSync(t)},rue=e=>{(0,VS.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},qS=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=x();if(!KS.default.existsSync(e))return{ok:!1,message:"No local AgentWitch install directory was found.",removedLaunchAgentLabels:[]};let t=Po(e);for(let r of t)await eue(r),tue(r);return rue(e),{ok:!0,message:"Local AgentWitch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var lK,JS,cK,yl,dK,oue,nue,sue,cI,iue,dI,pK=l(()=>{"use strict";lK=require("node:child_process"),JS=u(require("node:fs")),cK=u(require("node:os")),yl=u(require("node:path")),dK=require("node:util");Ae();fs();oue=(0,dK.promisify)(lK.execFile),nue=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],sue=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],cI=e=>{JS.default.existsSync(e)&&JS.default.rmSync(e,{force:!0})},iue=async e=>{if(!Yt())return;let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await oue("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},dI=async e=>{let r=(e.listLaunchAgentLabels??Po)(e.layout.installDir),o=e.launchAgentsDir??yl.default.join(cK.default.homedir(),"Library","LaunchAgents"),n=e.bootoutLaunchAgent??iue;for(let i of r)await n(i),cI(yl.default.join(o,`${i}.plist`));let s=yl.default.dirname(e.layout.configPath);for(let i of nue)cI(yl.default.join(s,i));for(let i of sue)cI(yl.default.join(e.layout.installDir,i));return JS.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var pI,uK=l(()=>{"use strict";pI="unknown_identity"});var uI=l(()=>{"use strict";WT();uK()});var aue,mI,mK=l(()=>{"use strict";uI();aue=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),mI=e=>e.type!=="system.error"||!aue(e.payload)?!1:e.payload.errorCode===pI});var gI=l(()=>{"use strict";aK();pK();mK()});var YS=l(()=>{"use strict";Ae();Kr();gI();iI()});var hl,XS,ZS=l(()=>{"use strict";YS();hl=(e=20)=>gl(e),XS=GS});var QS,Sl,eP,tP=l(()=>{"use strict";YS();QS=Is,Sl=(e=20)=>Es(e),eP=e=>Cs(e)});var rP,fI=l(()=>{"use strict";YS();rP=()=>qS()});var gK=l(()=>{"use strict";fE();oT();jC();aI();ZS();tP();fI()});var fK={};Mt(fK,{buildAgentWitchAutomationStatusFromWakeServer:()=>$p,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>QS,buildAgentWitchWakeHealthResponse:()=>lp,buildAgentWitchWakeIdentityResponse:()=>cp,buildAgentWitchWatchdogStatus:()=>XS,installHarnessFromWakeServer:()=>bp,readAgentWitchSelfUpdateLogEntries:()=>Sl,readAgentWitchWatchdogLogEntries:()=>hl,restartAgentWitchFromWakeServer:()=>Jp,reviveAgentWitchWebSocketFromWakeServer:()=>qp,runAgentWitchSelfUpdateFromWakeServer:()=>eP,runAgentWitchUninstallLocalFromWakeServer:()=>rP,runAutomationFromWakeServer:()=>Fp,syncAutomationsFromWakeServer:()=>Hp,wakeAgentWitchLaunchAgents:()=>Vp});var yK=l(()=>{"use strict";gK()});var hK,SK,yI,hI,PK=l(()=>{"use strict";hK=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),SK=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?hK(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?hK(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},yI=e=>{let t=e.watchdogLogs.map(SK).join(""),r=e.updateLogs.map(SK).join("");return`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>AgentWitch local logs</title>
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
  <h1>AgentWitch local logs</h1>
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
</html>`},hI=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var AK,_K,bK=l(()=>{"use strict";AK=u(require("node:net")),_K=()=>new Promise((e,t)=>{let r=AK.default.createServer();r.listen(0,"127.0.0.1",()=>{let o=r.address();if(o===null||typeof o=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let n=o.port;r.close(s=>{if(s!==void 0){t(s);return}e(n)})}),r.on("error",t)})});var kK,lue,cue,SI,RK=l(()=>{"use strict";kK=u(require("node:net"));Ae();bK();ap();ip();dt();lue=e=>new Promise(t=>{let r=kK.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),cue=e=>new Promise(t=>{setTimeout(t,e)}),SI=async(e={})=>{let t=x(),r=Ar(),o=Math.max(1,e.attempts??10),n=e.retryDelayMs??500;for(let i=1;i<=o;i+=1){if(await lue(r))return Vz(r),r;i<o&&await cue(n)}let s=await _K();ch(t,s),process.env.AGENT_WITCH_WAKE_PORT=String(s);try{cd({launchAgentPrefix:Ie(t),wakePort:s})}catch(i){console.error(`[agent-witch] Could not update LaunchAgent wake port: ${i instanceof Error?i.message:String(i)}`)}return s}});var due,PI,wK=l(()=>{"use strict";due=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),PI=e=>({force:due(e)&&e.force===!0})});var Yp=l(()=>{"use strict";_p();PK();RK();wK();SR();my();As()});var AI,Y,_I,bI,Xp,EK=l(()=>{"use strict";AI=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},Y=(e,t,r,o)=>{e.writeHead(t,o),e.end(JSON.stringify(r))},_I=e=>{e.writeHead(403),e.end()},bI=e=>e.url?.split("?")[0]??"/",Xp=(e,t,r=20,o=200)=>{let n=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(n.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,o):r}});var Er=l(()=>{"use strict";EK()});var pue,TK,CK=l(()=>{"use strict";jC();Er();pue=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return Y(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},TK=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return Y(e.response,200,$p(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await pue(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let o=Hp(t);return Y(e.response,o.ok?200:400,o,e.cors.headers),!0}let r=await Fp(t);return Y(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var uue,LK,IK,vK,kI,xK,RI=l(()=>{"use strict";uue=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],LK=e=>/embed|minilm|^bge-/i.test(e),IK=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),vK=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),kI=e=>e.filter(t=>t.trim().length>0&&!LK(t)),xK=(e,t)=>{let r=e.filter(n=>n.trim().length>0&&!LK(n)),o=t?.trim()??"";if(o.length>0){let n=r.find(s=>IK(s,o));if(n!==void 0)return n}for(let n of uue){let s=r.find(i=>IK(i,n));if(s!==void 0)return s}return r[0]??null}});var wI,jK,MK,oP,NK,WK,OK,mue,gue,fue,yue,hue,Sue,Tr,Zp=l(()=>{"use strict";wI=require("node:child_process"),jK=u(require("node:fs")),MK=u(require("node:os")),oP=u(require("node:path"));Kr();Pr();RI();NK=3e3,WK=["claude-cli","codex","cursor","antigravity"],OK={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},mue=(e,t)=>new Promise(r=>{let o=(0,wI.spawn)(e,[...t],{stdio:"ignore"}),n=setTimeout(()=>{o.kill("SIGTERM"),r(!1)},NK);o.on("error",()=>{clearTimeout(n),r(!1)}),o.on("close",s=>{clearTimeout(n),r(s===0)})}),gue=()=>{let e=MK.default.homedir();return["ollama",oP.default.join(e,".local","bin","ollama"),oP.default.join(e,".agent-witch","ollama","ollama"),oP.default.join(e,".local-agent-witch","ollama","ollama")]},fue=e=>new Promise(t=>{let r=(0,wI.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),o=[],n=setTimeout(()=>{r.kill("SIGTERM"),t(null)},NK);r.stdout.on("data",s=>{o.push(s)}),r.on("error",()=>{clearTimeout(n),t(null)}),r.on("close",s=>{if(clearTimeout(n),s!==0){t(null);return}t(vK(Buffer.concat(o).toString("utf8")))})}),yue=async()=>{for(let e of gue()){if(e!=="ollama"&&!jK.default.existsSync(e))continue;let t=await fue(e);if(t!==null)return t}return[]},hue=e=>{let t=e.installedWriterIds.map(s=>OK[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,o=Ne(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${OK[e.writerAgent]} is not installed.`:"",n=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[o,r,n].filter(s=>s.length>0).join(" ")},Sue=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:va},Tr=async e=>{let t=WK.map(i=>{let a=By(i,e.commands);return mue(a.command,a.args)}),[r,...o]=await Promise.all([yue(),...t]),n=WK.flatMap((i,a)=>o[a]===!0?[i]:[]),s=xK(r,Sue());return{ollamaModels:r,estimateModel:s,installedWriterIds:n,capabilityNote:hue({writerAgent:e.writerAgent??"",installedWriterIds:n,estimateModel:s})}}});var Pue,Aue,EI,DK=l(()=>{"use strict";Pue="http://127.0.0.1:11434",Aue=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},EI=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||Pue;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return o.ok?Aue(await o.json()):null}catch{return null}}});var TI=l(()=>{"use strict";Pr();Zp();DK();RI()});var _ue,HK,FK=l(()=>{"use strict";TI();_ue={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},HK=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:_ue[t]})),ollamaModels:kI(e.ollamaModels)})});var bue,$K,zK=l(()=>{"use strict";TI();Er();FK();bue=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return Y(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},$K=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await Tr({commands:Re({})});return Y(e.response,200,{ok:!0,...HK({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await bue(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",o=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",n=await EI({model:r,prompt:o});return n===null?(Y(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(Y(e.response,200,{ok:!0,text:n},e.cors.headers),!0)}return!1}});var kue,UK,BK=l(()=>{"use strict";oT();Er();kue=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return Y(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},UK=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await kue(e);if(t===null)return!0;let r=bp(t);return Y(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var GK=l(()=>{"use strict";_t()});var CI,KK=l(()=>{"use strict";GK();Xa();CI=e=>{if(!_r(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:$t({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var VK,qK,II,LI=l(()=>{"use strict";VK=u(require("node:path"));ne();_t();Xa();qK=e=>{if(!_r(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},II=async e=>{let t=qK(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=In("Choose a folder for this AgentWitch project");if(r===null)return{ok:!1,cancelled:!0};let o=B();if(o===null)return{ok:!1,errorMessage:"AgentWitch is not configured on this computer."};let n=J({wsUrl:o.wsUrl,pairingToken:o.pairingToken});if(n===null)return{ok:!1,errorMessage:"Could not resolve AgentWitch cloud connection."};let s=await Mo({projectId:t.projectId,folderPath:r,allowOutsideHome:!0,profileDir:VK.default.dirname(o.layout.configPath),cloudConfig:n});return s.ok?{ok:!0,project:{id:t.projectId,folderPath:s.folderPath},bindingsSynced:s.bindingsSynced,linkedSetSlugs:s.linkedSetSlugs}:{ok:!1,errorMessage:s.message}}});var JK=l(()=>{"use strict";KK();LI()});var vI,YK,XK,ZK=l(()=>{"use strict";vI=u(require("node:path"));ne();_t();Xa();YK=async(e,t=Mo)=>{if(!_r(e)||typeof e.projectId!="string"||typeof e.folderPath!="string")return{ok:!1,httpStatus:400,code:"folder_required",message:"Send projectId and folderPath."};let r=B();return r===null?{ok:!1,httpStatus:409,code:"not_paired",message:"Connect this computer to AgentWitch first."}:t({projectId:e.projectId,folderPath:e.folderPath,allowOutsideHome:e.allowOutsideHome===!0,profileDir:vI.default.dirname(r.layout.configPath),cloudConfig:J({wsUrl:r.wsUrl,pairingToken:r.pairingToken})})},XK=()=>{let e=B();return e===null?{summary:"This computer is not connected to AgentWitch yet.",folders:[]}:jo(vI.default.dirname(e.layout.configPath))}});var QK,eV=l(()=>{"use strict";JK();ZK();LI();Er();QK=async e=>{if(e.request.method==="GET"&&e.pathname==="/projects/folders")return Y(e.response,200,{ok:!0,...XK()},e.cors.headers),!0;if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=CI(t);return Y(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/link-folder"){let t=await e.readJsonBody(),r=await YK(t);return Y(e.response,r.ok?200:r.httpStatus,r.ok?r:{ok:!1,error:r.code,errorMessage:r.message},e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await II(t),o=r.ok||"cancelled"in r&&r.cancelled?200:400;return Y(e.response,o,r,e.cors.headers),!0}return!1}});var tV,rV=l(()=>{"use strict";Yp();tP();ZS();tV=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=hl(50),r=Sl(50);return e.response.writeHead(200,hI()),e.response.end(yI({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var oV,nV=l(()=>{"use strict";fE();Er();oV=e=>e.request.method==="GET"&&e.pathname==="/health"?(Y(e.response,200,lp(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(Y(e.response,200,cp(),e.cors.headers),!0):!1});var sV,iV=l(()=>{"use strict";fI();Er();sV=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await rP();return Y(e.response,t.ok?200:503,t,e.cors.headers),!0}});var aV,lV=l(()=>{"use strict";aI();Er();aV=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await qp();return Y(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await Jp();return Y(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await Vp();return Y(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var cV,dV=l(()=>{"use strict";Yp();tP();Er();cV=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=QS();return Y(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=Xp(e.request,"/update/logs",20,200);return Y(e.response,200,{ok:!0,logs:Sl(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=PI(t),o=await eP({force:r});return Y(e.response,o.ok?200:503,o,e.cors.headers),!0}return!1}});var pV,uV=l(()=>{"use strict";ZS();Er();pV=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await XS();return Y(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=Xp(e.request,"/watchdog/logs",20,200);return Y(e.response,200,{ok:!0,logs:hl(t)},e.cors.headers),!0}return!1}});var mV,gV=l(()=>{"use strict";CK();zK();BK();eV();rV();nV();iV();lV();dV();uV();mV=[oV,tV,pV,aV,cV,sV,UK,QK,TK,$K]});var fV,yV=l(()=>{"use strict";gV();fV=async e=>{for(let t of mV)if(await t(e))return!0;return!1}});var Rue,hV,SV=l(()=>{"use strict";_p();Er();yV();Rue=(e,t,r,o)=>({request:e,response:t,wakePort:r,cors:o,pathname:bI(e),readJsonBody:()=>AI(e)}),hV=async(e,t,r)=>{let o=e.headers.origin,n=Hh(o);try{if(o!==void 0&&o.length>0&&!n.allowed){_I(t);return}if(e.method==="OPTIONS"){t.writeHead(204,n.headers),t.end();return}let s=Rue(e,t,r,n);if(await fV(s))return;Y(t,404,{ok:!1,errorMessage:"Not found."},n.headers)}catch{Y(t,500,{ok:!1,errorMessage:"Wake server error."},n.headers)}}});var PV,si,nP,sP=l(()=>{"use strict";PV=u(require("node:http"));Yp();SV();si=async()=>{let e=await SI(),t=PV.default.createServer((r,o)=>{hV(r,o,e)});return await new Promise((r,o)=>{t.once("error",o),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`AgentWitch wake server listening on http://127.0.0.1:${e}
`),t},nP=si});var AV={};Mt(AV,{runAgentWitchBridgeCli:()=>wue});var wue,_V=l(()=>{"use strict";Ae();sP();wue=async()=>{Dt("agent-witch-bridge");let e=await si(),t=_o(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var ii,Pl=l(()=>{"use strict";fr();ii="Open AgentWitch Local from the menu bar."});var Al,xI,bV=l(()=>{"use strict";Al=(e,t,r)=>e===1?t:r,xI=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let o=Math.max(0,t-r);if(o<6e4)return"just now";let n=Math.floor(o/6e4);if(n<60)return`${n} ${Al(n,"min","mins")} ago`;let s=Math.floor(o/36e5),i=Math.floor(o%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${Al(i,"min","mins")} ago`;let a=Math.floor(o/864e5);if(a<7)return`${a} ${Al(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${Al(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${Al(d,"month","months")} ago`;let p=Math.floor(a/365);return`${p} ${Al(p,"year","years")} ago`}});var Eue,Tue,kV,WI,iP,aP,RV,OI,lP=l(()=>{"use strict";Eue=new Set(["/","/task","/writer-sessions","/errors","/status","/traffic","/projects","/project","/project/skill-drafts","/harness","/writer-api","/history","/estimates","/knowledge","/prompt-optimizer","/prompt-optimizer/guide","/prompt-sdlc","/prompt-sdlc/guide"]),Tue=new Set(["/prompt-optimizer/agent","/prompt-optimizer/skills/query","/prompt-sdlc/agent","/prompt-sdlc/skills/query"]),kV="AgentWitchLocal-MacWebView",WI=e=>Tue.has(e),iP=e=>typeof e=="string"&&e.includes(kV),aP=e=>WI(e)?!1:!!(e==="/prompt-optimizer"||e.startsWith("/prompt-optimizer/")||e==="/prompt-sdlc"||e.startsWith("/prompt-sdlc/")),RV=e=>WI(e)?!1:!!(Eue.has(e)||e==="/prompt-optimizer"||e.startsWith("/prompt-optimizer/")||e==="/prompt-sdlc"||e.startsWith("/prompt-sdlc/")),OI=e=>{let t=e.method.toUpperCase();return t!=="GET"&&t!=="POST"||iP(e.userAgent)&&aP(e.pathname)?!1:RV(e.pathname)}});var Cue,wV,EV=l(()=>{"use strict";Pl();lP();Cue=e=>iP(e.userAgent)&&aP(e.pathname),wV=e=>{let t=Cue(e);return(r,o)=>{if(t){r.writeHead(200,{"Content-Type":"text/html; charset=utf-8",...e.headers}),r.end(o);return}r.writeHead(200,{"Content-Type":"text/plain; charset=utf-8",...e.headers}),r.end(ii)}}});var Iue,TV,CV=l(()=>{"use strict";Iue=/^[0-9a-f]{7,40}$/,TV=(e="1350ef102b0961ae34d82bd92b39105837cbb05d")=>{let t=(e??"").trim().toLowerCase();return Iue.test(t)?{commitSha:t,shortCommitSha:t.slice(0,7)}:{commitSha:null,shortCommitSha:null}}});var ai,jI,Lue,vue,MI,Wn,cP,NI,IV=l(()=>{"use strict";ai=u(require("node:fs")),jI=u(require("node:path")),Lue="local-ws-traffic.ndjson",vue=500,MI=e=>jI.default.join(e.logsDir,Lue),Wn=(e,t)=>{let r=MI(e);ai.default.mkdirSync(jI.default.dirname(r),{recursive:!0});let o=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});ai.default.appendFileSync(r,`${o}
`,"utf8")},cP=(e,t=vue)=>{let r=MI(e);if(!ai.default.existsSync(r))return[];let n=ai.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of n)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},NI=e=>{let t=MI(e);ai.default.existsSync(t)&&ai.default.writeFileSync(t,"","utf8")}});var xue,LV,vV,xV=l(()=>{"use strict";uI();xue=new Set(Object.values(eS)),LV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),vV=e=>{if(!LV(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!xue.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!LV(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var WV,OV=l(()=>{"use strict";WV=(e,t=4,r=4)=>{let o=e.length;return o===0?"***":o<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(o-r)}`}});var Wue,Oue,jue,Qp,jV=l(()=>{"use strict";OV();Wue=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,Oue=e=>Wue.test(e),jue=e=>WV(e),Qp=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(o=>Qp(o));if(typeof e!="object")return e;let t=e,r={};for(let[o,n]of Object.entries(t)){if(typeof n=="string"&&Oue(o)){r[o]=jue(n);continue}r[o]=Qp(n)}return r}});var eo,DI,Mue,Nue,Due,HI,MV,NV,DV,Hue,dP,li,pP,FI,HV=l(()=>{"use strict";eo=u(require("node:fs")),DI=u(require("node:path"));xV();jV();Mue="local-ws-trace.ndjson",Nue=1e4,Due=1440*60*1e3,HI=e=>DI.default.join(e.logsDir,Mue),MV=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},NV=e=>{if(!eo.default.existsSync(e))return;let t=eo.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-Due,n=t.filter(s=>{let i=MV(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-Nue);eo.default.writeFileSync(e,n.length>0?`${n.join(`
`)}
`:"","utf8")},DV=(e,t)=>{let r=HI(e);eo.default.mkdirSync(DI.default.dirname(r),{recursive:!0}),eo.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),NV(r)},Hue=e=>e.parsed===null?{_empty:!0}:Qp(e.parsed),dP=(e,t,r)=>{let o=vV(r);DV(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:o.command,type:o.type,requestId:o.requestId,formatOk:o.formatOk,formatError:o.formatError,body:Hue(o)})},li=(e,t)=>{DV(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:Qp({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},pP=(e,t=80)=>{let r=HI(e);if(NV(r),!eo.default.existsSync(r))return[];let o=eo.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),n=[];for(let s of o.slice(-t)){let i=MV(s);i!==null&&n.push(i)}return n.reverse()},FI=e=>{let t=HI(e);eo.default.existsSync(t)&&eo.default.writeFileSync(t,"","utf8")}});var On,FV,Fue,$I,zI,$V=l(()=>{"use strict";On=u(require("node:fs")),FV=u(require("node:path")),Fue=256e3,$I=e=>{On.default.mkdirSync(FV.default.dirname(e),{recursive:!0}),On.default.writeFileSync(e,"","utf8")},zI=(e,t=Fue)=>{if(!On.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=On.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let o=r.size;if(o===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let n=Math.max(0,o-t),s=o-n,i=Buffer.alloc(s),a=On.default.openSync(e,"r");try{On.default.readSync(a,i,0,s,n)}finally{On.default.closeSync(a)}let c=i.toString("utf8");if(n>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:n>0,byteSize:o}}});var eu=l(()=>{"use strict";IV();HV();$V()});var UI,BI,zV=l(()=>{"use strict";UI=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),BI=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",o=e.exists&&e.content.length>0?`<pre class="error-log-view">${UI(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${UI(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the AgentWitch client stderr log on this computer (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${UI(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${o}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var UV=l(()=>{"use strict";zV()});var GI,KI=l(()=>{"use strict";GI=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return`${o}s`;let n=Math.floor(o/60),s=o%60;if(n<60)return s>0?`${n}m ${s}s`:`${n}m`;let i=Math.floor(o/3600),a=Math.floor(o%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var VI=l(()=>{"use strict";Md()});var qI,JI,BV=l(()=>{"use strict";VI();qI=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e);return Number.isNaN(o)?!0:r-o>t},JI=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var GV=l(()=>{"use strict";KI();BV()});var KV,YI,tu,ru=l(()=>{"use strict";KI();KV=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),YI=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=KV(e),r=KV(GI(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},tu=`(function () {
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
})();`});var ci,$ue,XI,VV=l(()=>{"use strict";ci=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),$ue=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},XI=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,o)=>{let n=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${ci(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?ci(r.direction):ci(r.kind),i=`trace-body-${o}`,a=ci($ue(r.body));return`<tr>
        <td title="${ci(r.at)}">${ci(r.at.slice(11,19))}</td>
        <td>${s}</td>
        <td><code>${ci(r.command)}</code></td>
        <td>${n}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-compact" onclick="const el=document.getElementById('${i}'); if(el){el.hidden=!el.hidden;}">body</button>
          <pre id="${i}" class="trace-body-pre" hidden>${a}</pre>
        </td>
      </tr>`}).join("")}</tbody>
        </table>
      </div>
    </section>`});var qV,zue,uP,Uue,ZI,JV=l(()=>{"use strict";Uc();Ge();qV=e=>{let t=e.replace(/\/$/,""),r=t.lastIndexOf("/");return r===-1?t:t.slice(r+1)},zue=e=>qV(e)===So?na:oa,uP=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Uue=(e,t)=>`${t?`<h3>${uP(e.label)}</h3>`:""}
    <p class="muted">${uP(e.instructions)}</p>
    <pre class="sdlc-pre mono">${uP(e.command)}</pre>
    <p class="muted">${uP(e.note)}</p>`,ZI=e=>{let t=zc({platform:cs(e.platform),installDirName:qV(e.installDir),launchAgentPrefix:zue(e.installDir)}),r=t.length>1;return`<section class="card">
    <p class="eyebrow">AgentWitch Local</p>
    <h2>Revive local app</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if AgentWitch Cloud cannot open Status, restart the AgentWitch client on this computer.</p>${r?`
    <p class="muted">Use the command for this computer's operating system.</p>`:""}
    ${t.map(n=>Uue(n,r)).join(`
    `)}
  </section>`}});var QI,YV=l(()=>{"use strict";Uc();QI=e=>cs(e)==="mac"?"Revive requested. The bridge will reconnect if this Mac can reach launchd.":"Revive requested. The bridge will reconnect when this computer can reach AgentWitch Cloud."});var XV=l(()=>{"use strict";ru();VV();JV();YV();ru()});var ZV,QV,e5,t5,r5,o5,n5,_l=l(()=>{"use strict";ZV="projects",QV="knowledge",e5="chunks.ndjson",t5="lessons.ndjson",r5="error-chunks.ndjson",o5="usage-stats.json",n5="knowledge-location.json"});var mP,Bue,gP,eL=l(()=>{"use strict";mP=u(require("node:path"));_l();Bue=(e,t)=>{let r=t.trim(),o=mP.default.join(e.installDir,ZV,r,QV);return{projectId:r,knowledgeDirPath:o,ragChunksFilePath:mP.default.join(o,e5),memoryRunsFilePath:mP.default.join(o,t5)}},gP=Bue});var tL,Gue,s5,i5=l(()=>{"use strict";tL=u(require("node:fs"));_l();zs();Gue=e=>{let t=tr(e.projectFolderPath),r=`${t.metaDirPath}/${n5}`,o={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your AgentWitch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};tL.default.mkdirSync(t.metaDirPath,{recursive:!0}),tL.default.writeFileSync(r,`${JSON.stringify(o,null,2)}
`)},s5=Gue});var bl,l5,a5,Kue,c5,d5=l(()=>{"use strict";bl=u(require("node:fs")),l5=u(require("node:path"));fn();zs();eL();i5();a5=(e,t)=>{bl.default.existsSync(e)&&(bl.default.existsSync(t)&&bl.default.statSync(t).size>0||(bl.default.mkdirSync(l5.default.dirname(t),{recursive:!0}),bl.default.copyFileSync(e,t)))},Kue=e=>{let t=tr(e.projectFolderPath),r=gP(e.layout,e.projectId),o=`${t.memoryDirPath}/${ha}`;a5(t.ragChunksFilePath,r.ragChunksFilePath),a5(o,r.memoryRunsFilePath),s5({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},c5=Kue});var p5,Vue,kl,fP=l(()=>{"use strict";p5=u(require("node:path"));fn();zs();d5();hT();eL();Vue=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=Kh(t),o=e.projectId?.trim()||r.projectId?.trim()||"";if(o.length>0){c5({layout:e.layout,projectFolderPath:t,projectId:o});let s=gP(e.layout,o);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:o}}let n=tr(t);return{ragChunksFilePath:n.ragChunksFilePath,memoryRunsFilePath:p5.default.join(n.memoryDirPath,ha),projectId:null}},kl=Vue});var yP,Jue,hP,rL=l(()=>{"use strict";yP=u(require("node:fs"));_l();Jue=(e,t=500)=>{if(!yP.default.existsSync(e))return;let r=yP.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let o=r.slice(r.length-t);yP.default.writeFileSync(e,`${o.join(`
`)}
`)},hP=Jue});var SP,Yue,di,oL=l(()=>{"use strict";SP=u(require("node:path"));_l();fP();Yue=e=>{let t=kl(e);if(t===null)return null;let r=SP.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:SP.default.join(r,o5),errorChunksFilePath:SP.default.join(r,r5)}},di=Yue});var m5,ou,g5,u5,nL,f5,Que,sL,y5,iL,aL,lL,cL=l(()=>{"use strict";m5=require("node:crypto"),ou=u(require("node:fs")),g5=u(require("node:path"));tl();_l();oL();u5=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),nL=e=>{if(!ou.default.existsSync(e))return u5();try{let t=JSON.parse(ou.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return u5()},f5=(e,t)=>{ou.default.mkdirSync(g5.default.dirname(e),{recursive:!0}),ou.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},Que=e=>{let t=wr(e).trim(),o=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,m5.createHash)("sha256").update(o).digest("hex").slice(0,16)},sL=e=>{let t=di(e);return t===null?null:nL(t.usageStatsFilePath)},y5=e=>{if(e.chunkIds.length===0)return;let t=di(e);if(t===null)return;let r=nL(t.usageStatsFilePath),o={...r.chunkRetrievalCounts};for(let n of e.chunkIds)o[n]=(o[n]??0)+1;f5(t.usageStatsFilePath,{...r,chunkRetrievalCounts:o})},iL=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=di(e);if(r===null)return null;let o=Que(t),n=nL(r.usageStatsFilePath),s=n.errorOccurrences[o],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return f5(r.usageStatsFilePath,{...n,errorOccurrences:{...n.errorOccurrences,[o]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),o},aL=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,lL=e=>{if(e===null)return[];let t=[];for(let[r,o]of Object.entries(e.chunkRetrievalCounts))o<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:o,chunkId:r,message:`Knowledge chunk "${r}" was injected ${o} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,o]of Object.entries(e.errorOccurrences))o.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:o.count,errorFingerprint:r,message:`Error "${o.preview}" occurred ${o.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:o.count,errorFingerprint:r,message:`Same error (${o.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,o)=>r.priority-o.priority||o.hitCount-r.hitCount)}});var nu,h5,eme,tme,S5,rme,dL,su,iu,pL,Rl,uL,mL=l(()=>{"use strict";nu=u(require("node:fs")),h5=u(require("node:path"));tl();fP();rL();cL();eme="http://127.0.0.1:11434",tme="nomic-embed-text",S5=(e,t,r)=>kl({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,rme=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},dL=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let o=[],n=0;for(;n<r.length;)o.push(r.slice(n,n+t)),n+=t;return o},su=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||eme,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||tme;try{let o=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!o.ok)return null;let n=await o.json();return typeof n=="object"&&n!==null&&"embedding"in n&&Array.isArray(n.embedding)?n.embedding:null}catch{return null}},iu=(e,t,r)=>{let o=S5(e,t,r);if(o===null||!nu.default.existsSync(o))return[];let n=nu.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},pL=async e=>{let t=wr(e.text),r=dL(t);if(r.length===0)return 0;let o=S5(e.layout,e.projectFolderPath,e.projectId);if(o===null)return 0;nu.default.mkdirSync(h5.default.dirname(o),{recursive:!0});let n=0;for(let s of r){let i=await su(s);if(i===null)continue;let a={id:`${Date.now()}-${n}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};nu.default.appendFileSync(o,`${JSON.stringify(a)}
`,"utf8"),n+=1}return hP(o),n},Rl=async e=>{let t=await su(e.query);if(t===null)return[];let r=e.minScore??0,s=iu(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:rme(t,i.embedding)})).filter(i=>i.score>=r).sort((i,a)=>a.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return y5({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},uL=e=>e.length===0?"":`Local knowledge (from this computer):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var au,P5,ome,nme,gL,fL,yL,A5=l(()=>{"use strict";au=u(require("node:fs")),P5=u(require("node:path"));tl();oL();rL();mL();ome=e=>{if(!au.default.existsSync(e))return[];let t=au.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let o of t)try{r.push(JSON.parse(o))}catch{}return r},nme=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},gL=async e=>{let t=di(e);if(t===null)return 0;let r=wr(e.text),o=dL(r,600);if(o.length===0)return 0;let n=t.errorChunksFilePath;au.default.mkdirSync(P5.default.dirname(n),{recursive:!0});let s=0;for(let i of o.slice(0,3)){let a=await su(i);if(a===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:a,createdAt:new Date().toISOString(),source:e.source??"run.failure"};au.default.appendFileSync(n,`${JSON.stringify(c)}
`,"utf8"),s+=1}return hP(n,200),s},fL=async e=>{let t=di(e);if(t===null)return[];let r=await su(e.query);if(r===null)return[];let o=e.minScore??.3;return ome(t.errorChunksFilePath).map(s=>({chunk:s,score:nme(r,s.embedding)})).filter(s=>s.score>=o).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},yL=e=>e.length===0?"":`Past failures on this computer (avoid repeating):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var hL=l(()=>{"use strict";mL();cL();A5()});var Cr,lu,PP=l(()=>{"use strict";xT();Cr=vT,lu=`
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap");

:root {
  color-scheme: light;
  --aw-zinc-50: #f4f3f0;
  --aw-zinc-100: #ebe9e4;
  --aw-zinc-200: #ddd9d2;
  --aw-zinc-400: #c9c4bb;
  --aw-zinc-500: ${Cr.gray500};
  --aw-zinc-600: ${Cr.gray600};
  --aw-zinc-700: ${Cr.gray700};
  --aw-zinc-800: ${Cr.gray900};
  --aw-zinc-900: ${Cr.gray900};
  --aw-brand-600: #1f6656;
  --aw-brand-700: #19564a;
  --aw-brand-50: #dde8e3;
  --aw-emerald-50: ${Cr.success50};
  --aw-emerald-700: ${Cr.success700};
  --aw-amber-50: ${Cr.warning50};
  --aw-amber-900: ${Cr.warning900};
  --aw-red-50: ${Cr.error50};
  --aw-red-700: ${Cr.error700};
  --aw-radius-lg: 0.5rem;
  --aw-radius-xl: 0.75rem;
  --aw-radius-2xl: 1rem;
  --aw-shadow-sm: 0 1px 2px rgb(16 24 40 / 0.06);
}

*, *::before, *::after { box-sizing: border-box; }

body {
  margin: 0;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", Inter, ui-sans-serif, system-ui, sans-serif;
  background: #e8e6e1;
  color: var(--aw-zinc-900);
  -webkit-font-smoothing: antialiased;
}

a { color: inherit; text-decoration: none; }

.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  border-bottom: 1px solid #ddd9d2;
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
    border-right: 1px solid #ddd9d2;
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
  outline: 1px solid #ddd9d2;
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
  outline: 2px solid rgb(31 102 86 / 0.45);
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
  box-shadow: 0 0 0 2px rgb(31 102 86 / 0.2);
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
.sdlc-history-badge-viewing { background: #dde8e3; color: #19564a; }
.sdlc-history-item-viewing {
  background: #f7f6f4;
  border-left: 3px solid #1f6656;
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
  outline: 2px solid rgb(31 102 86 / 0.45);
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
  border-color: #1f6656;
  background: #dde8e3;
  color: #19564a;
  font-weight: 600;
}
.sdlc-compose-stepper-item[aria-current="step"] .sdlc-compose-stepper-index {
  background: #1f6656;
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
  background: #dde8e3;
  color: #13463c;
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
  outline: 1px solid rgb(31 102 86 / 0.25);
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
  border-top-color: #1f6656;
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

.sdlc-history-badge-live { background: #dde8e3; color: #19564a; }
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
`.trim()});var _5,b5=l(()=>{"use strict";_5=`
body.awl-po { padding-left: 0; background: #e8e6e1; }
.awl-po-header {
  position: sticky; top: 0; z-index: 20;
  display: flex; align-items: center; gap: 0.75rem;
  padding: 0.75rem 2rem;
  background: rgb(247 246 244 / 0.94);
  backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid #ddd9d2;
}
.awl-po-glyph {
  display: grid; place-items: center; width: 1.5rem; height: 1.5rem;
  border-radius: 0.4rem; background: #1f6656; color: #fff;
  font-size: 0.625rem; font-weight: 700; letter-spacing: -0.02em;
}
.awl-po-title { font-size: 0.9375rem; font-weight: 600; color: #101828; }
.awl-po-nav { display: flex; gap: 0.25rem; margin-left: 0.75rem; }
.awl-po-link {
  padding: 0.3rem 0.7rem; border-radius: 0.45rem;
  font-size: 0.8125rem; font-weight: 500; color: #4b5567;
}
.awl-po-link:hover { background: #ebe9e4; color: #101828; }
.awl-po-version {
  margin-left: auto; font-size: 0.6875rem; color: #566073;
  font-family: "SF Mono", ui-monospace, Menlo, monospace;
}
.awl-po-main { max-width: 64rem; }
`});var k5,R5,w5=l(()=>{"use strict";PP();b5();ru();k5=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),R5=e=>{let t=k5(e.installBundleVersionLabel?.trim()??"unknown");return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${k5(e.title)} \xB7 AgentWitch Local</title>
  <style>${lu}${_5}</style>
</head>
<body class="awl-po">
  <header class="awl-po-header">
    <span class="awl-po-glyph" aria-hidden="true">AW</span>
    <span class="awl-po-title">Prompt optimizer</span>
    <nav class="awl-po-nav" aria-label="Prompt optimizer">
      <a class="awl-po-link" href="/prompt-optimizer">Optimizer</a>
      <a class="awl-po-link" href="/prompt-optimizer/guide">Guide</a>
    </nav>
    <span class="awl-po-version" title="Install bundle">Local ${t}</span>
  </header>
  <main class="site-main awl-po-main">${e.body}</main>
  <script>${tu}</script>
</body>
</html>`}});var sme,ime,SL,E5,PL,T5=l(()=>{"use strict";PP();w5();ru();sme=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,ime=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],SL=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),E5=(e,t)=>`<a class="${e}" href="/" aria-label="AgentWitch Local home, install bundle ${t}">${sme}<span class="brand-text">AgentWitch<span class="brand-sub">Local(${t})</span></span></a>`,PL=e=>{if(e.activePath==="/prompt-optimizer")return R5({title:e.title,body:e.body,installBundleVersionLabel:e.installBundleVersionLabel});let t=ime.map(a=>{let c=a.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${a.href}"${c?' aria-current="page"':""}>${a.label}</a>`}).join(""),r=SL(e.cloudAppOrigin),o=e.headerUpdateButtonHtml??"",n=SL(e.installBundleVersionLabel?.trim()??"unknown"),s=E5("brand brand-in-sidebar",n),i=E5("brand brand-in-header",n);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${SL(e.title)} \xB7 AgentWitch Local</title>
  <style>${lu}</style>
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
        <a class="btn btn-secondary cloud-open-link" href="${r}" target="_blank" rel="noopener noreferrer" aria-label="Open AgentWitch cloud at ${r}">Open cloud \u2197</a>
      </div>
    </div>
  </header>
  <main class="site-main">${e.prependBody??""}${e.body}</main>
  <script>${tu}</script>
</body>
</html>`}});var AP,cu,_P=l(()=>{"use strict";AP=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),cu=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${AP(e.syncMessage)}</p>`:"",o=AP(e.manageHref),n=AP(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${AP(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${o}" target="_blank" rel="noopener noreferrer">${n} \u2197</a></p>
    </div>`}});var AL,_L,bL,C5=l(()=>{"use strict";AL=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,_L=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer AgentWitch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,bL=e=>e==="ok"?'<div class="alert-success">Update finished. This computer may restart the AgentWitch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var I5=l(()=>{"use strict";T5();_P();C5()});var N,wl=l(()=>{"use strict";N=e=>e==="passed"||e==="stopped"||e==="failed"});var L5,kL,pi,RL,bP=l(()=>{"use strict";L5="Stopped at the round limit. The best prompt is kept.",kL="Stopped because the score stopped rising. The best prompt is kept.",pi="Finished. The best prompt is the result.",RL="Wizard ended. Progress from finished steps is kept."});var jn,wL=l(()=>{"use strict";jn=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],o=e.instructions?.trim()??"",n=o.length===0?[]:["","Instructions:",o];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...n,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",o.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var ame,lme,du,v5,kP=l(()=>{"use strict";ame=/\n+|;\s+/,lme=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,du=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let o=r.split(ame).map(n=>n.replace(/^[-*]\s*/,"").trim()).filter(n=>n.length>0).reduce((n,s)=>{if(t.length+n.length>=12)return n;let i=s.toLowerCase();return[...t,...n].some(c=>c.toLowerCase()===i)?n:[...n,lme(s)]},[]);return[...t,...o]},[]),v5=e=>{let t=du(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var ve,El=l(()=>{"use strict";ve=e=>{let t=e.flatMap(n=>n.score===null?[]:[{roundNumber:n.roundNumber,promptText:n.promptText,score:n.score,reasons:n.reasons}]),[r,...o]=t;return r===void 0?null:o.reduce((n,s)=>s.score>n.score||s.score===n.score&&s.roundNumber>n.roundNumber?s:n,r)}});var pu,EL=l(()=>{"use strict";kP();El();pu=e=>{let t=[...e.priorRounds,e.current],r=ve(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},o=[...t].filter(n=>n.score<r.score).sort((n,s)=>s.roundNumber-n.roundNumber).map(n=>n.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:v5(o)}}});var TL,cme,dme,RP,CL=l(()=>{"use strict";TL={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},cme=e=>{try{let t=JSON.parse(e.fragment);return{...TL,objects:[...e.objects,t]}}catch{return{...TL,objects:e.objects}}},dme=(e,t)=>{if(e.inString){let o=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:o}:t==="\\"?{...e,escaped:!0,fragment:o}:t==='"'?{...e,inString:!1,fragment:o}:{...e,fragment:o}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:cme(r)},RP=e=>[...e].reduce(dme,TL).objects});var pme,IL,ume,x5,LL=l(()=>{"use strict";CL();pme=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},IL=e=>{let t=RP(e).filter(pme),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},ume=(e,t)=>({...e,passed:e.score>=t}),x5=(e,t)=>{let r=IL(e);return r===null?null:ume(r,t)}});var vL,xL,wP=l(()=>{"use strict";vL="The judge reply needs a score and a reason.",xL="The improver reply was empty."});var mme,W5,O5=l(()=>{"use strict";mme=/API Error:? \d{3}|\b429\b|too many requests|rate[_ ]limit|spend limit|usage limit|monthly limit|quota|insufficient credit|overloaded|unauthorized|authentication required|not logged in|please run .+login|invalid api key/i,W5=e=>{let t=e.trim();return t.length===0||t.length>600||!mme.test(t)?null:`The judge CLI returned an error: ${t}`}});var j5,M5=l(()=>{"use strict";j5=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((o,n)=>n>o.best?{best:n,stall:0}:{best:o.best,stall:o.stall+1},{best:t,stall:0}).stall}});var N5,D5=l(()=>{"use strict";N5=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((o,n)=>n.score>o.best?{best:n.score,reasons:[]}:{best:o.best,reasons:[...o.reasons,n.reasons]},{best:t.score,reasons:[]}).reasons}});var fme,H5,F5=l(()=>{"use strict";M5();D5();bP();kP();fme=e=>{let t=du(e);return t.length===0?kL:`${kL} Avoid: ${t.join("; ")}.`},H5=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:L5};let t=e.earlyStopFlat!==void 0&&e.earlyStopFlat!==null&&Number.isFinite(e.earlyStopFlat)&&e.earlyStopFlat>=1?Math.floor(e.earlyStopFlat):3;if(j5(e.scores)>=t){let r=e.scores.map((o,n)=>({score:o,reasons:e.reasons?.[n]??""}));return{type:"stopped",errorMessage:fme(N5(r))}}return null}});var Mn,yme,ui,$5,EP=l(()=>{"use strict";Mn=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},yme=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,ui=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",yme(e.tokens),`Delay: ${Mn(e.delayMs)}`,"",o,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},$5=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var hme,z5,U5=l(()=>{"use strict";LL();hme=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,z5=e=>{let r=(hme.exec(e)?.[1]??e).trim();return r.length===0||IL(r)!==null?null:r}});var B5,TP,G5=l(()=>{"use strict";EP();U5();wP();B5=e=>({type:"call",role:"judge",choice:e.choice,prompt:$5({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),TP=e=>{let t=z5(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:xL}}:{nextPrompt:t,continuation:B5({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var WL,K5=l(()=>{"use strict";wL();EL();LL();wP();O5();bP();F5();wP();G5();WL=e=>{let t=x5(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:W5(e.raw)??vL}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],o=e.round??r.length,n=[...r.map(a=>({score:a.score,reasons:a.reasons})),{score:t.score,reasons:t.reasons}],s=H5({scores:n.map(a=>a.score),reasons:n.map(a=>a.reasons),round:o,maxRounds:e.maxRounds??10,earlyStopFlat:e.earlyStopFlat});if(s!==null)return{verdict:t,continuation:s};let i=pu({current:{roundNumber:o,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:jn({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var uu,OL=l(()=>{"use strict";uu=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var V5=l(()=>{"use strict"});var q5=l(()=>{"use strict";V5()});var mi,J5=l(()=>{"use strict";mi=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",o,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var Sme,jL,Y5=l(()=>{"use strict";EP();Sme=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,jL=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",Sme(e.tokens),`Delay: ${Mn(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var Pme,Ame,_me,ML,X5=l(()=>{"use strict";Pme=/[A-Za-z0-9_./~-]{3,180}/g,Ame=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,_me=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||Ame.test(t)},ML=(e,t=12)=>{let r=[];for(let o of e.matchAll(Pme)){let n=o[0].replace(/\.+$/,"");if(!(!_me(n)||r.includes(n))&&(r.push(n),r.length>=t))break}return r}});var mu,Z5=l(()=>{"use strict";mu=(e,t)=>e.flatMap(r=>{let o=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||o.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:o}]}).sort((r,o)=>r.roundNumber-o.roundNumber)});var CP,NL,Q5,gu,DL=l(()=>{"use strict";CP=e=>Math.floor(e/2),NL=e=>Math.max(CP(e)+1,e-20),Q5=(e,t)=>e>=t?"passes":e>=NL(t)?"close":e>=CP(t)?"weak":"bad",gu=e=>[{band:"bad",label:`0\u2013${CP(e)-1} bad`},{band:"weak",label:`${CP(e)}\u2013${NL(e)-1} weak`},{band:"close",label:`${NL(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var IP,HL=l(()=>{"use strict";DL();IP=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",o=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${Q5(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),n=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...o,...n]}});var Ir,FL=l(()=>{"use strict";Ir=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var eq,tq=l(()=>{"use strict";eq=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var bme,kme,rq,oq=l(()=>{"use strict";wl();HL();FL();tq();bme=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],kme=e=>e.wizard!==void 0&&e.wizard.phase==="complete"?"Finished":e.status==="passed"?"Passed":e.status==="stopped"?e.wizard?.phase==="complete"||(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",rq=e=>{let t=e.wizard;if(t===void 0)return[];let r=Ir(t),o=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),n=e.status==="wizard_paused",s=t.phase==="complete",i=bme.map((y,h)=>{let S=!s&&!n&&h===r?"active":"done";return{id:`wizard-${h+1}`,label:y,state:S,detail:null}}).filter((y,h)=>s?!0:h<=o),a=n&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=IP(e),d=c.filter(y=>y.id==="round-0"),p=eq(t)&&(!n||a)?c.filter(y=>y.id!=="round-0"):[],m=N(e.status)&&!s,g=m?[{id:"end",label:kme(e),state:"done",detail:e.errorMessage}]:[];if(m&&g.length>0){let y=Math.min(r,i.length),h=i.slice(0,y).map(S=>({...S,state:"done"}));return[...d,...h,...g,...p]}return[...d,...i,...p,...g]}});var Rme,$L,nq=l(()=>{"use strict";wl();HL();oq();Rme=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",$L=e=>{if(e.wizard!==void 0)return rq(e);let t=IP(e),r=N(e.status)?[{id:"end",label:Rme(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var fu,sq=l(()=>{"use strict";fu=(e,t)=>{if(t.id!=="end"||e.status!=="failed")return null;let r=e.errorMessage?.trim()??"";if(r.length>0)return r;let o=t.detail?.trim()??"";return o.length>0?o:null}});var LP,zL,yu,Cl,vP,UL,iq=l(()=>{"use strict";fr();LP="/prompt-optimizer/agent",zL=`${Kg}${LP}`,yu=`${ok}://prompt-optimizer`,Cl="The prompt optimizer runs the judge and improver inside the project folder on this computer, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",vP=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this computer. ${Cl}`,UL="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var to=l(()=>{"use strict"});var we,hu=l(()=>{"use strict";to();we=e=>{let t=e?.modulePassScore;return typeof t=="number"&&t>=1&&t<=100?t:90}});var BL,aq=l(()=>{"use strict";BL="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Instructions are optional."});var lq,cq=l(()=>{"use strict";lq=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var Su,pq=l(()=>{"use strict";cq();to();Su=e=>({schemaVersion:5,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:lq(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{},modulePassScore:90,orchestratorSkill:null,additionalSkillSuggestions:[],additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestionsSummary:null,lastWriterParseFailureReply:null})});var GL,uq=l(()=>{"use strict";to();GL=e=>({...e,modulePassScore:e.modulePassScore??90,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null})),orchestratorSkill:e.orchestratorSkill??null,additionalSkillSuggestions:e.additionalSkillSuggestions??[],additionalSkillSuggestionsStatus:e.additionalSkillSuggestionsStatus??"idle",additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsSummary??null,lastWriterParseFailureReply:e.lastWriterParseFailureReply??null})});var KL,mq=l(()=>{"use strict";to();KL=(e,t,r)=>{let o=r.trim();if(o.length===0)return e;let n=e.avoidByStep[t]??[],s=[o,...n].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var gq,Pu,fq=l(()=>{"use strict";gq=["generalize","evaluate","separate","optimize_modules"],Pu=(e,t)=>{let r=gq.indexOf(t);if(r===-1)return e;let o=gq.slice(r+1);return o.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:o.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:o.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:o.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:o.includes("separate")?null:e.selectedSplitTopology,modules:o.includes("optimize_modules")?[]:e.modules,currentModuleIndex:o.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:o.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var xP,VL=l(()=>{"use strict";kP();xP=e=>{let t=du(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var Au,yq=l(()=>{"use strict";VL();Au=e=>{let t=xP(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,o,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(n=>n.length>0).join(`
`)}});var Eme,Tme,Cme,hq,Sq=l(()=>{"use strict";Eme=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),Tme=/^\{\{[a-zA-Z0-9_-]+\}\}$/,Cme=(e,t)=>{let{masked:r,tokens:o}=t.reduce((n,s)=>{let i=s.sampleValue.trim();if(i.length===0)return n;let a=new RegExp(Eme(i),"g"),c=[...n.tokens];return{masked:n.masked.replace(a,()=>{let p=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),p}),tokens:c}},{masked:e,tokens:[]});return o.reduce((n,s,i)=>n.replace(`\0PO${i}\0`,s),r)},hq=(e,t)=>{let r=[...t].sort((n,s)=>s.sampleValue.length-n.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(n=>Tme.test(n)?n:Cme(n,r)).join("")}});var qL,Pq=l(()=>{"use strict";Sq();qL=(e,t)=>e.map(r=>({...r,modules:r.modules.map(o=>({...o,prompt:hq(o.prompt,t)}))}))});var Ime,_u,Aq=l(()=>{"use strict";to();VL();Ime=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),_u=e=>{let t=xP(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,n=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=Ime(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",n,r,o,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var bu,_q=l(()=>{"use strict";OL();bu=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",o=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(a=>a.length>0),n=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...o,s].filter(a=>a.length>0).join(`
`);return uu({promptText:e.promptText,instructions:`${i}${n.join(`
`)}`})}});var ku,YL=l(()=>{"use strict";El();ku=e=>{let t=e.revisions.map(n=>({roundNumber:n.roundNumber,score:n.judgement?.score??null,passed:n.judgement?.passed??null,runOutput:n.run?.output??null,tokens:n.run?.tokens??null})),r=ve(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:null}))),o=r===null?null:e.revisions.find(n=>n.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:o?.run?.output??null,rounds:t}}});var XL,bq=l(()=>{"use strict";YL();XL=e=>{let t=ku({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((o,n)=>n===e.moduleIndex?{...o,status:r,selectedRevisionRound:t.bestRound,statistics:t}:o)}}});var gi,kq=l(()=>{"use strict";gi=(e,t)=>{if(e.selectedSplitTopology!=="chain")return{output:null,nullReason:"not-chain"};if(t<=0)return{output:null,nullReason:"first-module"};let r=e.modules[t-1];if(r===void 0)return{output:null,nullReason:"prior-missing"};if(r.status==="stopped")return{output:null,nullReason:"prior-skipped"};let o=r.statistics?.bestRunOutput?.trim()??"";return o.length>0?{output:o,nullReason:null}:{output:null,nullReason:"prior-no-output"}}});var Lme,vme,_e,WP=l(()=>{"use strict";hu();Lme=(e,t)=>{let r=e.modules[t]?.statistics;if(r==null)return null;let o=r.rounds.reduce((n,s)=>n+(s.tokens??0),0);return o>0?o:null},vme=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,_e=e=>{let t=we(e),r=e.modules.map((i,a)=>({moduleId:i.moduleId,title:i.title,bestScore:i.statistics?.bestScore??null,tokens:Lme(e,a),status:i.status})),o=r.length,n=r.filter((i,a)=>vme(e.modules[a],t)).length,s=o>0&&n===o?"passed":"stopped";return{passedModuleCount:n,totalModules:o,terminalStatusSuggestion:s,rows:r}}});var Rq,wq=l(()=>{"use strict";hu();WP();Rq=e=>{let t=_e(e.wizard),r=we(e.wizard),o=[`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","Module results:",...t.rows.map(s=>`- ${s.title}: best score ${s.bestScore??"\u2014"}, status ${s.status}`)];e.wizard.templatedPrompt.trim().length>0&&o.push("","Generalized template:",e.wizard.templatedPrompt.trim());let n=e.wizard.attempts.find(s=>s.step==="evaluate");return n!==void 0&&o.push("","Step 2 evaluate snapshot:",JSON.stringify(n.output)),o.join(`
`)}});var ZL,Eq=l(()=>{"use strict";wq();ZL=e=>{let t=Rq({goal:e.goal,cycleStatus:e.cycleStatus,wizard:e.wizard});return["You suggest additional Cursor harness skills for a finished prompt optimizer wizard run.","Do not edit files. Do not run tools.","Read the run summary and recommend extra skills that would help the orchestrator skill succeed.","Never suggest replacing the orchestrator skill or reusing its fileName.","Reply with one JSON object only, no markdown.","",e.orchestratorSkill===null?"No orchestrator skill was loaded at compose time.":["Orchestrator skill (keep this role; do not replace or rename it):",`fileName: ${e.orchestratorSkill.fileName}`,`name: ${e.orchestratorSkill.name}`,`description: ${e.orchestratorSkill.description}`].join(`
`),"","Run summary:",t,"","summary: one short paragraph on what the run shows.","suggestions: up to 3 additional skills (not the orchestrator).","Each suggestion needs fileName (kebab-case slug), name, description, rationale.","",'{"summary":"...","suggestions":[{"fileName":"verify-output","name":"Verify output","description":"...","rationale":"..."}]}'].join(`
`)}});var xme,Tq,Cq=l(()=>{"use strict";xme=(e,t)=>e.inDouble?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inDouble:t!=='"'}:e.inSingle?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!1}:t==='"'?{...e,out:`${e.out}\\"`}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inDouble:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!0}:{...e,out:`${e.out}${t}`},Tq=e=>[...e].reduce(xme,{out:"",inDouble:!1,inSingle:!1,escaped:!1}).out});var Wme,Iq,Lq=l(()=>{"use strict";Wme=(e,t)=>{if(e.inString)return e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inString:t!=='"'};if(t==='"')return{...e,out:`${e.out}${t}`,inString:!0};if(t===",")return{...e,out:`${e.out}${t}`,escaped:!1};if(t==="}"||t==="]"){let r=e.out.replace(/,\s*$/,"");return{...e,out:`${r}${t}`}}return{...e,out:`${e.out}${t}`}},Iq=e=>[...e].reduce(Wme,{out:"",inString:!1,escaped:!1}).out});var Ome,jme,vq,xq=l(()=>{"use strict";Cq();Lq();Ome=e=>e.charCodeAt(0)===65279?e.slice(1):e,jme=e=>{let t=e.trim();return t.match(/^json\s*([\s\S]*)$/i)?.[1]?.trim()??t},vq=e=>Iq(Tq(jme(Ome(e))))});var Mme,Nme,Dme,Wq,Hme,Il,OP=l(()=>{"use strict";CL();xq();Mme=e=>{let t=e.trim();return t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t},Nme=(e,t)=>e.inString?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==='"'?{...e,out:`${e.out}${t}`,inString:!1}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inString:!0}:{...e,out:`${e.out}${t}`},Dme=e=>[...e].reduce(Nme,{out:"",inString:!1,escaped:!1}).out,Wq=e=>{let t=RP(e);return t.length===0?null:t[t.length-1]},Hme=e=>{let t=e instanceof Error?e.message:"Invalid JSON in writer reply.",r=/unterminated string/i.test(t)||/unexpected end of json/i.test(t)||/bad control character/i.test(t)?"The writer JSON was cut off or had unescaped line breaks or quotes in text fields. Run the step again, or add step instructions to reply with compact single-line JSON.":/Expected property name or '}'/i.test(t)||/Expected double-quoted property name/i.test(t)?"The writer reply was not strict JSON (often single-quoted keys or trailing commas). Run the step again, or add step instructions to reply with compact single-line JSON using double quotes.":"The writer reply was not valid JSON.";return new Error(`${r} (${t})`)},Il=e=>{let t=vq(Mme(e)),r=Wq(t);if(r!==null)return r;let o=Dme(t),n=Wq(o);if(n!==null)return n;let s=t.indexOf("{");if(s===-1)throw new Error("No JSON object in reply.");try{return JSON.parse(t.slice(s))}catch(i){throw Hme(i)}}});var Fme,$me,QL,Oq,jq=l(()=>{"use strict";Fme=/^[a-z0-9][a-z0-9-]{0,62}$/,$me=e=>{let t=e.toLowerCase().replace(/[^a-z0-9]+/gu,"-").replace(/^-+|-+$/gu,"").slice(0,63);return Fme.test(t)?t:""},QL=e=>e.replace(/\s+/gu," ").trim(),Oq=e=>{let t=e.orchestratorFileName?.trim().toLowerCase()??"",r=new Set,o=[];for(let n of e.suggestions){let s=$me(n.fileName.trim());if(s.length===0||t.length>0&&s===t||r.has(s))continue;let i=QL(n.name),a=QL(n.description),c=QL(n.rationale);if(!(i.length===0||a.length===0||c.length===0)&&(r.add(s),o.push({fileName:s,name:i,description:a,rationale:c}),o.length>=3))break}return o}});var Mq,Nq,Dq=l(()=>{"use strict";Mq=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score=="number"&&typeof t.passed=="boolean"&&typeof t.reasons=="string"},Nq=e=>{if(typeof e!="object"||e===null)return null;let t=e;return typeof t.fileName!="string"||typeof t.name!="string"||typeof t.description!="string"||typeof t.rationale!="string"?null:{fileName:t.fileName,name:t.name,description:t.description,rationale:t.rationale}}});var ev,Hq=l(()=>{"use strict";OP();jq();Dq();ev=(e,t)=>{let r=(()=>{try{return Il(e)}catch{return null}})();if(r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};if(Mq(r))return{ok:!1,errorMessage:"The judge returned a score instead of skill suggestions."};if(typeof r!="object"||r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let o=r,n=typeof o.summary=="string"?o.summary.replace(/\s+/gu," ").trim():"";if(!Array.isArray(o.suggestions))return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let s=o.suggestions.map(Nq).filter(a=>a!==null),i=Oq({suggestions:s,orchestratorFileName:t});return i.length===0?{ok:!1,errorMessage:"No usable additional skill suggestions came back."}:{ok:!0,summary:n,suggestions:i}}});var tv,Fq=l(()=>{"use strict";tv=(e,t)=>({...e,gate:null,phase:"complete",additionalSkillSuggestionsStatus:t?"skipped":"pending",additionalSkillSuggestions:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestionsSummary:null})});var rv,$q=l(()=>{"use strict";rv=(e,t)=>t===null?e.orchestratorSkill===null?e:{...e,orchestratorSkill:null}:e.orchestratorSkill?.fileName===t.fileName&&e.orchestratorSkill.name===t.name&&e.orchestratorSkill.description===t.description?e:{...e,orchestratorSkill:t}});var zme,ov,zq=l(()=>{"use strict";hu();WP();zme=(e,t)=>e==="passed"||e==="stopped"||e==="failed"?e:e==="pending"?"not run":t==="failed"?"failed":"stopped",ov=e=>{let t=_e(e.wizard),r=we(e.wizard),o=["# Prompt optimizer \u2014 wizard result","",`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","## Modules","","| Module | Best score | Tokens | Status |","| --- | ---: | ---: | --- |",...t.rows.map(n=>`| ${n.title.replaceAll("|","\\|")} | ${n.bestScore??"\u2014"} | ${n.tokens??"\u2014"} | ${zme(n.status,e.cycleStatus)} |`)];return e.wizard.templatedPrompt.trim().length>0&&o.push("","## Generalized template","","```",e.wizard.templatedPrompt.trim(),"```"),e.wizard.modules.forEach((n,s)=>{let i=n.statistics?.bestRunOutput?.trim();i===void 0||i.length===0||o.push("",`## Module ${s+1}: ${n.title}`,"","```",i,"```")}),`${o.join(`
`)}
`}});var Ru,Uq=l(()=>{"use strict";Ru=e=>{let t=e.modules.reduce((r,o)=>{let n=o.statistics?.rounds.reduce((s,i)=>s+(i.tokens??0),0)??0;return r+n},0);return t>0?t:null}});var Lr,Ume,nv,Bq=l(()=>{"use strict";Lr=u(da());OP();Ume=(0,Lr.isType)({name:Lr.isNonEmptyString,description:Lr.isString,sampleValue:Lr.isString}),nv=e=>{let t=Il(e);if(!(0,Lr.isType)({templatedPrompt:Lr.isNonEmptyString,variables:(0,Lr.isArrayWithEachItem)(Ume)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var xe,Bme,Gme,sv,Gq=l(()=>{"use strict";xe=u(da());to();OP();Bme=(0,xe.isType)({id:xe.isNonEmptyString,title:xe.isNonEmptyString,prompt:xe.isNonEmptyString,order:xe.isNumber}),Gme=(0,xe.isType)({id:xe.isNonEmptyString,title:xe.isNonEmptyString,summary:xe.isString,topology:(0,xe.isOneOf)("chain","parallel"),modules:(0,xe.isArrayWithEachItem)(Bme),recommended:xe.isBoolean}),sv=e=>{let t=Il(e);if(!(0,xe.isType)({options:(0,xe.isArrayWithEachItem)(Gme)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),o=r.filter(n=>n.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return o!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var Ll,Kq=l(()=>{"use strict";Ll=e=>{let t=e.wizard.attempts.filter(o=>o.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var Kme,iv,av=l(()=>{"use strict";Kme=/\{\{([a-zA-Z0-9_-]+)\}\}/g,iv=(e,t)=>{let r=new Map(t.map(o=>[o.name,o.sampleValue]));return e.replace(Kme,(o,n)=>{let s=r.get(n);return s===void 0?o:s})}});var vr,xr,Vq=l(()=>{"use strict";El();av();vr=e=>iv(e.templatedPrompt,e.variables),xr=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(o=>o.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return ve(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??vr(e.wizard)}});var Vme,fi,qq=l(()=>{"use strict";Vme=/\{\{([a-zA-Z0-9_-]+)\}\}/g,fi=(e,t)=>e.replace(Vme,(r,o)=>{let n=t[o];return n===void 0||n.trim()===""?r:n})});var qme,yi,jP=l(()=>{"use strict";qme=/\{\{([a-zA-Z0-9_-]+)\}\}/g,yi=e=>{let t=new Set,r=[];for(let o of e.matchAll(qme)){let n=o[1];t.has(n)||(t.add(n),r.push(n))}return r}});var wu,Jq=l(()=>{"use strict";jP();wu=e=>e.variables.length>0||yi(e.templatedPrompt).length>0?!1:e.templatedPrompt.trim().length>0});var lv,cv=l(()=>{"use strict";to();lv=(e,t=70)=>{let r=e?.score;return!(r==null||r<t||e?.passed===!1)}});var Eu,Yq=l(()=>{"use strict";El();cv();Eu=e=>{let t=e.wizard.evaluateSelectedRound??ve(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null})))?.roundNumber;if(t===void 0)return!1;let r=e.revisions.find(o=>o.roundNumber===t);return r===void 0?!1:lv(r.judgement,e.passScore)}});var Tu,Xq=l(()=>{"use strict";Tu=e=>e.length===1&&e[0].modules.length===1});var dv,Zq=l(()=>{"use strict";dv=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null}))});var Ve,MP,Cu=l(()=>{"use strict";Ve=(e,t,r,o,n)=>({id:e,label:t,state:r,infoTitle:o,infoBodyHtml:n}),MP=(e,t)=>`<p class="muted">The computer runs a non-interactive ${e} command in your chosen folder. You will not see a separate Terminal window; output is captured here.</p><pre class="mono sdlc-pipeline-terminal">$ cd ${t}
$ ${e.toLowerCase()} \u2026

{"templatedPrompt":"\u2026","variables":[\u2026]}</pre>`});var Qq,eJ=l(()=>{"use strict";Cu();Qq=e=>{let t=e.status==="wizard_paused"&&e.wizard.gate==="evaluate",r=e.status==="judging"&&e.wizard.gate===null&&!t;return[Ve("awl","Connected on this computer (AgentWitch Local)","done","Local app","<p>Step 2 scores prompt text only (no folder run).</p>"),Ve("cli",`${e.writerLabel} \u2014 score round ${e.currentRound+1}`,r?"active":"done","Judge scores prompt text",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.writerLabel.toLowerCase()} \u2026

{"score":72,"passed":true,"reasons":"\u2026"}</pre>`),...t?[Ve("gate","Pick a revision or continue","active","Step 2 gate","<p>Choose a revision for Separate, or Skip.</p>")]:[]]}});var tJ,rJ=l(()=>{"use strict";wl();Cu();tJ=e=>{let t=e.wizard.attempts.some(i=>i.step==="generalize"),r=e.status==="wizard_paused"&&e.wizard.gate==="generalize",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!N(e.status),n=r||t?"done":o?"active":"pending",s=t||r?"done":"pending";return[Ve("awl","Connected on this computer (AgentWitch Local)","done","Local app","<p>The AgentWitch Local app talks to AWL on this computer, on a port unique to your account. The run is stored on this computer.</p>"),Ve("folder",`Run folder: ${e.folder}`,"done","Working directory",`<p>Writers use this folder as cwd.</p><pre class="mono">${e.folder}</pre>`),Ve("cli",`${e.writerLabel} CLI \u2014 generalize`,n,"Writer on this computer",MP(e.writerLabel,e.folder)),Ve("parse","Parse templated prompt",s,"Structured reply","<p>AWL expects JSON with <code>templatedPrompt</code> and <code>variables</code>.</p>"),...r?[Ve("gate","Review Step 1 output","active","Paused at gate","<p>Continue, Skip, or rerun with feedback.</p>")]:[]]}});var oJ,nJ=l(()=>{"use strict";Cu();oJ=e=>{let t=e.wizard.currentModuleIndex+1,r=e.wizard.modules.length,o=e.status==="wizard_paused"&&e.wizard.gate==="optimize_modules",n=e.status==="judging"&&!o;return[Ve("awl","Connected on this computer (AgentWitch Local)","done","Local app","<p>Step 4 runs the module in your folder, then scores output.</p>"),Ve("cli",`${e.runnerLabel} \u2014 module ${t} of ${r}`,n?"active":"done","Runner + judge",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.runnerLabel.toLowerCase()} \u2026

\u2026runner output\u2026</pre>`),...o?[Ve("gate","Module parameters or review","active","Step 4 gate","<p>Fill placeholders or continue after scored rounds.</p>")]:[]]}});var sJ,iJ=l(()=>{"use strict";Cu();sJ=e=>{let t=e.wizard.splitOptions.length>0,r=e.status==="wizard_paused"&&e.wizard.gate==="separate",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!r;return[Ve("awl","Connected on this computer (AgentWitch Local)","done","Local app","<p>Separate keeps <code>{{placeholders}}</code> in module text.</p>"),Ve("cli",`${e.writerLabel} CLI \u2014 suggest splits`,t||r?"done":o?"active":"pending","Split writer",MP(e.writerLabel,e.folder)),...r?[Ve("gate","Choose a split option","active","Step 3 gate","<p>Pick chain or parallel, or Skip.</p>")]:[]]}});var NP,aJ=l(()=>{"use strict";wl();eJ();rJ();nJ();iJ();NP=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete")return[];if(N(e.status))return[];let r={writerLabel:e.writerLabel,folder:e.folderDisplay,status:e.status,wizard:t};switch(t.phase){case"generalize":return tJ(r);case"evaluate":return Qq({...r,currentRound:e.currentRound});case"separate":return sJ(r);case"optimize_modules":return oJ({runnerLabel:e.runnerLabel,folder:e.folderDisplay,status:e.status,wizard:t});default:return[]}}});var Iu,Do,lJ=l(()=>{"use strict";Iu=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),Do=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var Jme,DP,pv,cJ=l(()=>{"use strict";jP();Jme="wizardParam_",DP=e=>`${Jme}${e}`,pv=e=>{let t=yi(e.modulePrompt),r={...e.wizard.parameterValues},o=new Set(e.wizard.variables.map(n=>n.name));for(let n of t){let s=DP(n),i=e.posted.get(s),a=i!==null?i.trim():r[n]?.trim()??"";if(a.length===0)return{ok:!1,errorMessage:o.has(n)?`Fill in {{${n}}} before running this module.`:`Fill in {{${n}}} (not listed in Step 1) before running this module.`};r[n]=a}return{ok:!0,parameterValues:r}}});var Bt,dJ=l(()=>{"use strict";Bt=["generalize","evaluate","separate","optimize_modules"]});var Lu,hi,vl,ro=l(()=>{"use strict";Lu="Stopped because the confirmed token or spend budget was exceeded.",hi="Approaching the confirmed budget. Further trials may hard-stop.",vl="Confirm the Step 4 token and spend budget before optimizing modules."});var Tt,xl=l(()=>{"use strict";Tt=e=>!Number.isFinite(e.tokens)||!Number.isFinite(e.rateUsdPer1kTokens)||e.tokens<0||e.rateUsdPer1kTokens<0?0:Math.round(e.tokens/1e3*e.rateUsdPer1kTokens*1e4)/1e4});var or,vu=l(()=>{"use strict";ro();or=e=>({maxTrials:e?.maxTrials??1,maxSpendUsd:e?.maxSpendUsd??null,earlyStop:e?.earlyStop??!0,earlyStopFlatRounds:e?.earlyStopFlatRounds??3,targetTokenBudget:null,estimatedSpendUsd:null,rateUsdPer1kTokens:.01,proposalStub:!0,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,budgetConfirmed:!1,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1})});var Yme,mJ,gJ,HP,fJ,uv=l(()=>{"use strict";ro();Yme={codex:9e4,"claude-cli":3e4,cursor:4e4,"cursor-cloud":4e4,antigravity:3e4},mJ=2,gJ=e=>{let t=e?.trim()??"";return t.length===0?null:Yme[t]??null},HP=e=>{let t=gJ(e);return t===null?8e3:t*mJ},fJ=e=>{let t=gJ(e);return t===null?4e3:t*mJ}});var Xme,nr,xu=l(()=>{"use strict";ro();Xme={"claude-cli":.009,codex:.008,cursor:.01,"cursor-cloud":.01,antigravity:.01},nr=e=>{let t=e?.trim()??"";return t.length===0?.01:Xme[t]??.01}});var FP,mv=l(()=>{"use strict";ro();xu();FP=e=>{let t=e.fromJudge;if(t==null||typeof t.targetTokenBudget!="number"||!Number.isFinite(t.targetTokenBudget)||t.targetTokenBudget<=0||typeof t.estimatedSpendUsd!="number"||!Number.isFinite(t.estimatedSpendUsd)||t.estimatedSpendUsd<0)return null;let r=nr(e.writerId),o=t.rateUsdPer1kTokens??e.rateUsdPer1kTokens??r??(e.fallbackDefaultRate===!0?.01:r);return{targetTokenBudget:Math.round(t.targetTokenBudget),estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:o,stub:!1}}});var gv,Wu,$P,fv=l(()=>{"use strict";ro();uv();xl();vu();mv();xu();gv=e=>{let t=FP({fromJudge:e.fromJudge,rateUsdPer1kTokens:e.rateUsdPer1kTokens,writerId:e.writerId,fallbackDefaultRate:!0});if(t!==null)return t;let r=Math.max(1,Math.floor(e.moduleCount)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=e.rateUsdPer1kTokens??nr(e.writerId)??.01,s=r*o*HP(e.writerId);return{targetTokenBudget:s,estimatedSpendUsd:Tt({tokens:s,rateUsdPer1kTokens:n}),rateUsdPer1kTokens:n,stub:!0}},Wu=(e,t)=>({...e,targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.rateUsdPer1kTokens,proposalStub:t.stub===!0,budgetConfirmed:!1,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}),$P=e=>{let t=e.existing??or(),r=gv({moduleCount:e.moduleCount,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId,fromJudge:t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null&&t.proposalStub===!1?{targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens}:null,existing:t});return Wu(t,r)}});var Si,Wl,hJ=l(()=>{"use strict";ro();uv();to();xl();vu();fv();mv();xu();Si=e=>{let t=FP({fromJudge:e.fromJudge,rateUsdPer1kTokens:e.rateUsdPer1kTokens,writerId:e.writerId});if(t!==null)return t;let r=Math.max(1,Math.floor(e.maxRounds??5)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=Math.max(1,Math.floor(e.previewModuleCount??2)),s=e.rateUsdPer1kTokens??nr(e.writerId),i=r*fJ(e.writerId),a=n*o*HP(e.writerId),c=i+a;return{targetTokenBudget:c,estimatedSpendUsd:Tt({tokens:c,rateUsdPer1kTokens:s}),rateUsdPer1kTokens:s,stub:!0}},Wl=e=>{let t=e.existing??or();if(t.proposalStub===!1&&t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null)return t;let r=Si({maxRounds:e.maxRounds,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId});return Wu(t,r)}});var oo,SJ=l(()=>{"use strict";xl();ro();vu();oo=e=>{let t=Number(e.confirmedTokenBudget);if(!Number.isFinite(t)||t<1||!Number.isInteger(t))return{ok:!1,errorMessage:"confirmedTokenBudget must be a whole number \u2265 1."};let r=e.existing??or(),o=e.rateUsdPer1kTokens??r.rateUsdPer1kTokens??.01,n=e.confirmedMaxSpendUsd;return n==null&&(n=Tt({tokens:t,rateUsdPer1kTokens:o})),!Number.isFinite(n)||n<0?{ok:!1,errorMessage:"confirmedMaxSpendUsd must be zero or a positive number."}:{ok:!0,costControls:{...r,targetTokenBudget:r.targetTokenBudget??t,estimatedSpendUsd:r.estimatedSpendUsd??n,rateUsdPer1kTokens:o,confirmedTokenBudget:t,confirmedMaxSpendUsd:Math.round(n*1e4)/1e4,budgetConfirmed:!0,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}}}});var hv,Ol,PJ=l(()=>{"use strict";ro();xl();hv=e=>{let t=e.costControls;if(t==null||!t.budgetConfirmed)return null;let r=t.rateUsdPer1kTokens??0,o=Tt({tokens:e.spentTokens,rateUsdPer1kTokens:r}),n=t.confirmedTokenBudget,s=t.confirmedMaxSpendUsd,i=n!==null&&n>0&&e.spentTokens>=n,a=s!==null&&s>0&&o>=s;if(i||a)return{kind:"hard_stop",errorMessage:Lu,errorKind:"budget_exceeded",costControls:{...t,softWarnFired:!0,softWarnMessage:Lu,budgetExceeded:!0}};let c=.8,d=n!==null&&n>0&&e.spentTokens>=n*c,p=s!==null&&s>0&&o>=s*c;return(d||p)&&!t.softWarnFired?{kind:"soft_warn",softWarnMessage:hi,costControls:{...t,softWarnFired:!0,softWarnMessage:hi}}:null},Ol=e=>e?.budgetConfirmed===!0&&e.confirmedTokenBudget!==null});var Sv,AJ=l(()=>{"use strict";Sv=e=>{let t=e.costControls;if(t?.budgetConfirmed!==!0)return e.maxRounds;let r=t.maxTrials;return r!=null&&Number.isFinite(r)&&r>=1?Math.min(e.maxRounds,Math.floor(r)):e.maxRounds}});var j=l(()=>{"use strict";wl();bP();K5();wL();EP();OL();q5();J5();Y5();X5();EL();Z5();El();nq();FL();DL();sq();iq();to();hu();aq();pq();uq();mq();fq();yq();Pq();Aq();_q();YL();bq();kq();WP();Eq();Hq();Fq();$q();zq();Uq();Bq();Gq();Kq();Vq();av();qq();jP();Jq();Yq();Xq();cv();Zq();aJ();lJ();cJ();dJ();ro();xl();vu();fv();hJ();xu();SJ();PJ();AJ()});var Pv=l(()=>{"use strict";Bd()});var kJ,RJ=l(()=>{"use strict";kJ=e=>{let t=e.trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");if(r<0||o<=r)return null;let n;try{n=JSON.parse(t.slice(r,o+1))}catch{return null}if(typeof n!="object"||n===null)return null;let s=n;if(s.is_error!==!0)return null;let i=typeof s.result=="string"&&s.result.trim().length>0?s.result.trim():typeof s.subtype=="string"?`Claude CLI error: ${s.subtype}`:"Claude CLI returned an error without a message.",a=i.startsWith("Claude CLI")?i:`Claude CLI: ${i}`;return a.length>400?`${a.slice(0,397)}...`:a}});var Zme,wJ,EJ=l(()=>{"use strict";Pv();Zme=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,wJ=e=>{let t=js(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll(Zme)],o=r[r.length-1];if(o===void 0)return null;let n=Number(o[1])+Number(o[2]);return Number.isFinite(n)&&n>=1?n:null}});var CJ,Qme,ege,sr,tge,rge,TJ,UP,IJ,oge,ir,LJ,vJ,xJ,Or=l(()=>{"use strict";Pv();RJ();EJ();CJ=e=>e.errorKind==="writer_timeout"||/timed out after/i.test(e.errorMessage),Qme=/usage limit|monthly (usage |spend )?limit|spend limit|hit your (org's |usage )?(monthly )?(usage |spend )?limit|quota|insufficient credit|resource[_ ]?exhausted|billing|subscription required|rate limit|too many requests|\b429\b/i,ege=/ActionRequiredError|action required|authentication required|please run .+login|not logged in|login required|unauthorized|invalid api key|api[_ ]?key/i,sr=e=>{if(e.errorKind!==void 0)return e.errorKind;if(e.stopped===!0)return"writer_interrupted";if(/timed out after/i.test(e.errorMessage))return"writer_timeout";if(/did not reply/i.test(e.errorMessage))return"writer_no_reply";if(Qme.test(e.errorMessage))return"usage_limit";if(ege.test(e.errorMessage))return"action_required";if(/budget[_ ]?exceeded|token budget|spend ceiling|max spend/i.test(e.errorMessage))return"budget_exceeded"},tge="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",rge="The writer waited on terminal input and did not return a prompt.",TJ=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|spend limit|insufficient credit|rate limit|too many requests|billing|subscription required|API Error: \d{3}/i,UP=e=>{let t=e.trim();if(t.length===0||t.length>=500||!TJ.test(t))return null;let r=t.split(`
`).map(o=>o.trim()).find(o=>TJ.test(o))??t;return r.length>280?`${r.slice(0,277)}...`:r},IJ=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},oge=e=>UP(e.stdout)??UP(e.stderr)??(IJ(e.replyFile)?UP(e.replyFile):null),ir=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return tge;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?rge:null},LJ=e=>{let t=e.trim();return t.length===0?null:ir(t)!==null?t:UP(t)??(IJ(t)?t:null)},vJ=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],xJ=e=>{let t=e.replyFileText?.trim()??"",r=ir([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let o=oge({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(o!==null){let i=sr({errorMessage:o});return i===void 0?{ok:!1,errorMessage:o}:{ok:!1,errorMessage:o,errorKind:i}}let n=wJ([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:n};if(e.writerAgent==="claude-cli"){let i=kJ(e.stdout);if(i!==null){let c=sr({errorMessage:i});return c===void 0?{ok:!1,errorMessage:i}:{ok:!1,errorMessage:i,errorKind:c}}let a=js(e.stdout);if(a!==null&&a.text.trim().length>0)return{ok:!0,text:a.text,tokens:a.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:n}:{ok:!1,errorMessage:"The writer did not reply.",errorKind:"writer_no_reply"}}});var nge,OJ,WJ,Ai,BP=l(()=>{"use strict";Or();nge=400,OJ=(e,t=nge)=>{let r=e.trim();return r.length<=t?r:`${r.slice(0,t)}\u2026`},WJ=e=>{let t=e.judgement?.rawReply?.trim()??"";return t.length>0?t:LJ(e.promptText)},Ai=e=>{let t=e.wizard?.lastWriterParseFailureReply?.trim()??"";if(t.length>0)return t;let r=e.revisions.find(n=>n.roundNumber===e.currentRound),o=r===void 0?null:WJ(r);if(o!==null)return o.trim();for(let n=e.revisions.length-1;n>=0;n-=1){let s=WJ(e.revisions[n]);if(s!==null)return s.trim()}return null}});var F,sge,GP,Ee,_i,MJ,jJ,NJ,DJ,qe=l(()=>{"use strict";F="manual",sge=["claude-cli","codex","cursor","antigravity"],GP={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},Ee=e=>e===F?"You":e in GP?GP[e]:e,_i=e=>sge.filter(t=>e.includes(t)),MJ=e=>{let t=_i(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},jJ=(e,t)=>t===F?F:e.find(r=>r===t)??null,NJ=(e,t,r)=>{let o=_i(e),n=jJ(o,t),s=jJ(o,r);return n===null||s===null?null:{judge:n,improver:s}},DJ=(e,t,r)=>{let o=_i(e);return t===null||t.trim()===""?r!==F?r:o[0]??null:t===F?null:o.find(n=>n===t)??null}});var HJ,KP,Av,bi,_v,Gt,Ho,We,bt=l(()=>{"use strict";HJ=u(require("node:fs")),KP=u(require("node:os")),Av=u(require("node:path"));qr();bi="~",_v=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,Gt=e=>{let t=KP.default.homedir(),r=_v(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},Ho=e=>{let t=e.trim().length===0?"~":e.trim(),r=De(t),o=Av.default.isAbsolute(r)?_v(r):_v(Av.default.resolve(KP.default.homedir(),r));try{if(!HJ.default.statSync(o).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this computer."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this computer."}}return{ok:!0,path:o,display:Gt(o)}},We=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:KP.default.homedir()});var Ct,Nn=l(()=>{"use strict";Ct='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>'});var bv,FJ,ige,$J,zJ,kv=l(()=>{"use strict";j();qe();bt();Nn();bv=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),FJ=e=>e==="active"?'<span class="sdlc-spin sdlc-pipeline-mark" aria-hidden="true"></span>':e==="done"?'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-done" aria-hidden="true">\u2713</span>':'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-pending" aria-hidden="true"></span>',ige=e=>{let t=FJ(e.state),r=`<h2>${bv(e.infoTitle)}</h2>${e.infoBodyHtml}`;return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${e.state}"><div class="sdlc-pipeline-row">${t}<span class="sdlc-pipeline-label">${bv(e.label)}</span><button type="button" class="sdlc-field-info" data-sdlc-pipeline-info aria-label="About this step">${Ct}</button></div><template>${r}</template></li>`},$J=e=>{let t=e.wizard;if(t===void 0)return"";let r=NP({status:e.status,wizard:t,writerLabel:Ee(e.judgeModel),runnerLabel:Ee(e.runnerModel??e.judgeModel),folderDisplay:Gt(We(e)),currentRound:e.currentRound});return r.length===0?"":`<ol class="sdlc-pipeline" aria-label="What is happening on this computer">${r.map(ige).join("")}</ol>`},zJ=e=>{let t=e.wizard;if(t===void 0)return"";let r=NP({status:e.status,wizard:t,writerLabel:Ee(e.judgeModel),runnerLabel:Ee(e.runnerModel??e.judgeModel),folderDisplay:Gt(We(e)),currentRound:e.currentRound});return r.length===0?"":`<h2>Sub-steps on this computer</h2><ol class="sdlc-pipeline sdlc-pipeline-modal" aria-label="Pipeline sub-steps">${r.map(n=>{let s=n.state==="active"?' <span class="sdlc-pipeline-now muted">(now)</span>':"";return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${n.state}"><div class="sdlc-pipeline-row">${FJ(n.state)}<span class="sdlc-pipeline-label">${bv(n.label)}${s}</span></div></li>`}).join("")}</ol>`}});var jr,UJ,BJ,GJ,Rv=l(()=>{"use strict";j();jr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),UJ="Generalize has not produced template variables yet \u2014 your source prompt is unchanged. Run or review Step 1 in the gate below when you are ready.",BJ=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${jr(UJ)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(i=>`<li><strong>{{${jr(i.name)}}}</strong> \u2014 ${jr(i.description)} (sample: ${jr(i.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?'<p class="muted">No templated prompt text was saved.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${jr(r)}</pre>`,n=vr(e).trim(),s=n.length===0||n===r?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${jr(n)}</pre>`;return`${t}${o}${s}`},GJ=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${jr(UJ)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(n=>`<li><strong>{{${jr(n.name)}}}</strong> \u2014 ${jr(n.description)} (sample: ${jr(n.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?"":`<pre class="sdlc-pre">${jr(r)}</pre>`;return`${t}${o}`}});var Ou,wv=l(()=>{"use strict";Ou=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var KJ,VJ=l(()=>{"use strict";j();KJ=(e,t)=>{if(e.judgePromptTextOnly===!0){let n=mi({goal:e.goal,promptText:t.promptText,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return n.length===0?null:n}let r=t.run;if(r===void 0)return null;let o=ui({goal:e.goal,lookedAt:r.lookedAt??"the writer reply",evidence:r.evidence??r.output,tokens:r.tokens,delayMs:r.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return o.length===0?null:o}});var Ev,ju,Tv=l(()=>{"use strict";Nn();VJ();Ev=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ju=e=>{let t=KJ(e.cycle,{promptText:e.promptText,run:e.run});if(t===null)return"";let r=`Round ${e.roundNumber}`;return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-judge-info" data-sdlc-revision-judge-prompt-info aria-label="View judge prompt for ${Ev(r)}">${Ct}</button><template data-sdlc-revision-judge-prompt><h2>Judge prompt \u2014 ${Ev(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${Ev(t)}</pre></template>`}});var Cv,Mu,Iv=l(()=>{"use strict";Nn();Cv=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Mu=e=>{let t=e.promptText.trim();if(t.length===0)return"";let r=e.roundLabel.trim();return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-prompt-info" data-sdlc-revision-round-prompt-info aria-label="View prompt for ${Cv(r)}">${Ct}</button><template data-sdlc-revision-round-prompt><h2>Prompt \u2014 ${Cv(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${Cv(t)}</pre></template>`}});var VP,jl,Lv=l(()=>{"use strict";wv();Tv();Iv();VP=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),jl=e=>{let t=Ou(e.cycle),r=e.cycle.wizard,n=(r!==void 0&&(r.gate==="optimize_modules"||r.phase==="optimize_modules")?r.modules[r.currentModuleIndex]:void 0)?.statistics?.bestScore,s=n!=null;if(t.length===0&&e.cycle.revisions.length===0)return"";let i=t.length===0&&!s?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",a=e.caption===void 0?"":`<p class="muted">${VP(e.caption)}</p>`,c=e.cycle.wizard?.gate==="optimize_modules"||e.cycle.wizard?.phase==="optimize_modules",d=m=>c&&m===0?"Trial run":`Round ${m}`,p=e.cycle.revisions.map(m=>{let g=m.judgement?.score,y=g==null?`${d(m.roundNumber)} \u2014 not scored`:`${d(m.roundNumber)} \u2014 ${g}`,h=m.judgement?.reasons?.trim()??"",S=h.length===0?"":`<br><span class="muted">${VP(h)}</span>`,E=Mu({roundLabel:d(m.roundNumber),promptText:m.promptText}),I=ju({cycle:e.cycle,roundNumber:m.roundNumber,promptText:m.promptText,run:m.run}),f=`${E}${I}`;if(e.interactive){let w=e.selectedRound===m.roundNumber?" checked":"";return`<li class="sdlc-wizard-revision-row"><label class="sdlc-wizard-revision-label"><input type="radio" name="wizardRevisionRound" value="${m.roundNumber}"${w}> <span class="sdlc-wizard-revision-title">${VP(y)}</span></label>${f}${S}</li>`}return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${VP(y)}</span>${f}${S}</li>`}).join("");return`${i}${a}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${p}</ul>`}});var vv,qJ,JJ,YJ,xv=l(()=>{"use strict";vv=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),qJ=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${vv(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${vv(t.prompt)}</pre></li>`).join("")}</ol>`,JJ=e=>qJ([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),YJ=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(n=>n.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${vv(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${qJ(t.modules.map(n=>({title:n.title,prompt:n.prompt})))}
  </section>`}});var Nu,age,qP,Wv=l(()=>{"use strict";j();xv();Nu=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),age=e=>{let t=e.wizard;return t===void 0?"":xr({wizard:t,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score}))}).trim()},qP=(e,t)=>{let r=t.topology==="chain"?"Chain orchestration: modules run in order; each module\u2019s runner can read the previous module\u2019s output when building context.":"Parallel orchestration: modules are independent; runners do not see other modules\u2019 output (faster, but wording may overlap).",o=age(e),n=e.wizard,s=n?.orchestratorSkill===null||n?.orchestratorSkill===void 0?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${Nu(n.orchestratorSkill.fileName)}</code> \u2014 ${Nu(n.orchestratorSkill.name)}.</p>`,i=o.length===0?"":`<details class="sdlc-wizard-split-parent-details"><summary class="sdlc-wizard-split-parent-summary">Step 2 parent prompt this split derives from</summary>${s}<pre class="sdlc-pre sdlc-wizard-parent-prompt-body">${Nu(o)}</pre></details>`,a=t.modules.length,c=a===0?"":`<h4 class="sdlc-wizard-split-modules-heading">Separated module prompts (${a})</h4>`,d=JJ(t);return`<div class="sdlc-wizard-split-option-detail">
    <p class="sdlc-wizard-split-orchestration"><strong>Orchestration for this option:</strong> ${Nu(r)} <span class="muted">${Nu(t.summary)}</span></p>
    ${i}
    ${c}
    ${d}
  </div>`}});var it,lge,cge,dge,pge,JP,uge,mge,gge,fge,yge,hge,Ml,YP=l(()=>{"use strict";j();kv();Rv();Lv();Tv();Iv();Wv();it=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),lge={"wizard-1":"generalize","wizard-2":"evaluate","wizard-3":"separate","wizard-4":"optimize_modules"},cge=(e,t,r=320)=>{let o=t.trim();if(o.length===0)return"";let n=o.length<=r?`<pre class="sdlc-pre">${it(o)}</pre>`:`<p class="sdlc-pre-preview mono">${it(o.slice(0,r))}\u2026</p><details class="sdlc-pre-expand"><summary>Show full text</summary><pre class="sdlc-pre">${it(o)}</pre></details>`;return`<h2>${it(e)}</h2>${n}`},dge=e=>{let t=e.wizard;if(t===void 0||t.phase!=="evaluate")return"";let r=t.templatedPrompt.trim(),o=vr(t).trim(),n=xr({wizard:t,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}).trim(),i=t.gate===null&&!N(e.status)&&o.length>0?o:n.length>0?n:r;return i.length===0?'<h2>What is being evaluated</h2><p class="muted">Generalized prompt text will appear here once step 1 finishes.</p>':`${n.length>0?'<p class="muted">Prompt-text judge scores this revision (no folder run).</p>':'<p class="muted">Prompt-text judge scores templated prompt revisions.</p>'}${cge("What is being evaluated",i)}`},pge=(e,t)=>{let r=e.wizard;if(r===void 0||N(e.status))return"";let o=lge[t];return o===void 0||r.phase!==o?"":zJ(e)},JP=(e,t,r)=>{let o=pge(e,t),n=t==="wizard-2"?dge(e):"";return`${o}${n}${r}`},uge=e=>{let t=e.wizard;if(t===void 0)return null;let o=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(o===void 0||typeof o.output!="object"||o.output===null)return null;let n=o.output.revisions;if(!Array.isArray(n))return null;let s=[];for(let i of n){if(typeof i!="object"||i===null)continue;let a=i,c=a.roundNumber,d=a.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof a.score=="number"?a.score:null,passed:typeof a.passed=="boolean"?a.passed:null,reasons:typeof a.reasons=="string"?a.reasons:null})}return s.length===0?null:s},mge=e=>{let t=e.wizard;return t===void 0?"":BJ(t)},gge=(e,t,r)=>`<ul class="sdlc-wizard-revisions">${t.map(n=>{let s=n.score===null?`Round ${n.roundNumber} \u2014 not scored`:`Round ${n.roundNumber} \u2014 ${n.score}`,i=r===n.roundNumber?" (selected)":"",a=n.reasons?.trim()??"",c=a.length===0?"":`<br><span class="muted">${it(a)}</span>`,d=`Round ${n.roundNumber}`,p=Mu({roundLabel:d,promptText:n.promptText}),m=ju({cycle:e,roundNumber:n.roundNumber,promptText:n.promptText});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${it(s)}${i}</span>${p}${m}${c}</li>`}).join("")}</ul>`,fge=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return jl({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let o=uge(e);if(o!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${gge(e,o,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let s=xr({wizard:t,revisions:e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${it(s)}</pre>`}if(t.phase==="complete"||t.gate===null&&t.modules.length>0){let s=e.revisions.filter(a=>a.judgement!==null&&a.judgement!==void 0);if(s.length>0)return`<p class="muted">Evaluate finished \u2014 scored prompt revisions before module optimization.</p><ul class="sdlc-wizard-revisions">${s.map(c=>{let d=c.judgement?.score??"\u2014",p=`Round ${c.roundNumber} \u2014 score ${d}`,m=Mu({roundLabel:`Round ${c.roundNumber}`,promptText:c.promptText}),g=ju({cycle:e,roundNumber:c.roundNumber,promptText:c.promptText,run:c.run});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${it(p)}</span>${m}${g}</li>`}).join("")}</ul>`;let i=t.templatedPrompt.trim();return i.length>0?`<p class="muted">Evaluate finished. Prompt-text scoring completed before module optimization.</p><h2>Generalized template</h2><pre class="sdlc-pre">${it(i)}</pre>`:'<p class="muted">Evaluate finished. Scoring details were not stored in this run export.</p>'}return'<p class="muted">Evaluate has not run yet.</p>'},yge=e=>{let t=e.wizard;if(t===void 0)return"";if(t.splitOptions.length===0){if(t.modules.length>0){let o=t.modules.map(n=>`<li><strong>${it(n.title)}</strong> <span class="muted">(${it(n.status)})</span></li>`).join("");return`<p class="muted">Separate finished \u2014 ${t.modules.length} module${t.modules.length===1?"":"s"} defined for step 4.</p><ul class="sdlc-wizard-chunks">${o}</ul>`}return'<p class="muted">No split options yet.</p>'}return`<ul class="sdlc-wizard-splits">${t.splitOptions.map(o=>{let n=o.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===o.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${it(o.title)}</strong>${n}${it(s)}${qP(e,o)}</li>`}).join("")}</ul>`},hge=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((n,s)=>{let i=`Module ${s+1} of ${t.modules.length}`,a=t.phase!=="complete"&&s===t.currentModuleIndex?" \u2014 in progress":"";return`<li class="sdlc-wizard-module-prompt"><span class="muted">${it(i)}</span> <strong>${it(n.title)}</strong>${it(a)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${it(n.prompt)}</pre></li>`}).join(""),o=t.phase==="optimize_modules"||t.gate==="optimize_modules"?jl({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ul class="sdlc-wizard-chunks">${r}</ul>${o}`},Ml=(e,t)=>{switch(t){case"wizard-1":return JP(e,t,mge(e));case"wizard-2":return JP(e,t,fge(e));case"wizard-3":return JP(e,t,yge(e));case"wizard-4":return JP(e,t,hge(e));default:return""}}});var Sge,Pge,XJ,ZJ,QJ=l(()=>{"use strict";j();BP();Or();YP();Sge=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},Pge=e=>{let t=e.goal.trim();return t.length===0?null:t},XJ=(e,t,r,o,n)=>{let s=ir(t);return{title:e,goal:n,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:o,promptText:s===null?t:null,promptNote:s,bodyHtml:null}},ZJ=(e,t)=>{let r=Pge(e);if(t.id.startsWith("wizard-")){let s=Ml(e,t.id);return{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:s.trim().length===0?null:s}}if(t.id==="end"){let s=fu(e,t);if(s!==null){let a=Ai(e);return{title:t.label,goal:r,scoreLabel:null,feedback:s,promptText:a,promptNote:null,bodyHtml:null}}let i=ve(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));return i===null?{title:t.label,goal:r,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:XJ(t.label,i.promptText,i.score,i.reasons,r)}let o=t.id==="rewrite"?e.currentRound:Sge(t.id),n=o===null?void 0:e.revisions.find(s=>s.roundNumber===o);return n===void 0?{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:XJ(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail,r)}});var ki,e4,t4=l(()=>{"use strict";ki=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),e4=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?e.feedback===null||e.feedback.trim().length===0?'<p class="muted">Not scored yet.</p>':"":`<p class="muted">${ki(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,o=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${ki(e.feedback.trim())}</p>`,n=e.title==="Failed"&&e.promptText!==null?"Model reply":"Saved prompt",s=e.promptNote!==null?`<div class="alert-error">${ki(e.promptNote)}</div>`:e.promptText===null?"":`<h2>${ki(n)}</h2><pre class="mono">${ki(e.promptText)}</pre>`,i=e.goal===null?"":`<dl class="sdlc-wizard-resume-inputs-list sdlc-node-dialog-goal"><div><dt>Goal</dt><dd>${ki(e.goal)}</dd></div></dl>`;return`<h2>${ki(e.title)}</h2>${i}${t}${r}${o}${s}`}});var Age,r4,Du,Ov,XP=l(()=>{"use strict";j();Age=new Set(["wizard-1","wizard-2","wizard-3","wizard-4"]),r4=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete"||N(e.status))return null;let r=Ir(t);return r<0||r>3?null:`wizard-${r+1}`},Du=(e,t)=>Age.has(t)?r4(e)===t:!1,Ov="Skip this wizard step and move on? Running writers stop. You may skip review gates."});var _ge,ZP,jv=l(()=>{"use strict";_ge='<svg class="history-dialog-close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',ZP=e=>`<button${e.id===void 0?"":` id="${e.id.replaceAll('"',"&quot;")}"`} type="${e.type}" class="history-dialog-close" aria-label="Close">${_ge}</button>`});var Ri,QP=l(()=>{"use strict";j();Ri=e=>{let t=e.revisions.find(n=>n.roundNumber===e.currentRound),r=t?.judgement?.score,o=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||o.length===0?null:pu({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:o},priorRounds:mu(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null})),e.currentRound)})}});var bge,o4,kge,Mv,n4,Rge,wge,Ege,Tge,s4,i4=l(()=>{"use strict";j();QP();bge={"wizard-1":0,"wizard-2":1,"wizard-3":2,"wizard-4":3},o4=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},kge=e=>bge[e]??null,Mv=(e,t)=>{let r=e.wizard,o=kge(t);if(r===void 0||o===null)return!1;if(r.phase==="complete")return!0;let n=Ir(r);return o<n||o===n},n4=e=>{let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return t!==void 0?t:e.revisions.length===0?null:e.revisions.at(-1)??null},Rge=e=>{let t=e.wizard;if(t===void 0)return null;let r=e.revisions[0]?.promptText.trim()??"",o=r.length>0?r:vr(t).trim();return o.length===0?null:Au({goal:e.goal,sourcePrompt:o,avoid:t.avoidByStep.generalize,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:o4(e,"generalize")})},wge=e=>{let t=e.wizard;if(t===void 0)return null;if(e.status==="improving"){let n=Ri(e);return n===null?null:jn({goal:e.goal,promptText:n.promptText,score:n.score,reasons:n.reasons,avoid:n.avoid,instructions:e.improverInstructions})}let o=n4(e)?.promptText.trim()??xr({wizard:t,revisions:e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score}))}).trim();return o.length===0?null:mi({goal:e.goal,promptText:o,passScore:e.passScore,instructions:e.judgeInstructions})},Ege=e=>{let t=e.wizard;if(t===void 0)return null;let r=xr({wizard:t,revisions:e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score}))});return t.templatedPrompt.trim().length===0?null:_u({goal:e.goal,templatedPrompt:t.templatedPrompt,variables:t.variables,evaluatedPromptReference:r,avoid:t.avoidByStep.separate,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:o4(e,"separate")})},Tge=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return null;let r=t.phase==="complete"?Math.max(0,t.modules.length-1):t.currentModuleIndex,o=t.modules[r];if(o===void 0)return null;let n=Do(t),s=fi(o.prompt,n).trim();if(s.length===0)return null;if(e.status==="improving"){let c=Ri(e);return c===null?null:jn({goal:e.goal,promptText:c.promptText,score:c.score,reasons:c.reasons,avoid:c.avoid,instructions:e.improverInstructions})}let i=n4(e),a=i?.run;return a!==void 0&&(e.judgePhase==="scoring"||e.status==="judging"||N(e.status)&&i?.judgement!==null)?ui({goal:e.goal,lookedAt:a.lookedAt??"the writer reply",evidence:a.evidence??a.output,tokens:a.tokens,delayMs:a.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}):bu({promptText:s,runnerInstructions:t.runnerInstructions??e.judgeInstructions??null,chainPriorOutput:gi(t,r).output,moduleTitle:o.title})},s4=(e,t)=>{if(!Mv(e,t))return null;switch(t){case"wizard-1":return Rge(e);case"wizard-2":return wge(e);case"wizard-3":return Ege(e);case"wizard-4":return Tge(e);default:return null}}});var Cge,eA,Nv=l(()=>{"use strict";j();Cge=e=>{let t=/^wizard-([1-4])$/.exec(e);return t===null?null:Number(t[1])-1},eA=(e,t)=>{let r=e.wizard,o=Cge(t);if(r===void 0||o===null)return"pending";if(r.phase==="complete")return"done";let n=Ir(r);return o<n?"done":o===n&&N(e.status)&&e.status==="failed"?"failed":o<=n&&N(e.status)?"done":"pending"}});var Ige,Nl,tA=l(()=>{"use strict";Nn();i4();Nv();Ige=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Nl=(e,t,r)=>{if(r?.forOutcomeSummary===!0){if(eA(e,t)==="pending")return""}else if(!Mv(e,t))return"";let o=s4(e,t);return o===null||o.trim().length===0?"":`<button type="button" class="sdlc-field-info sdlc-wizard-step-prompt-info" data-sdlc-wizard-step-prompt-info aria-label="View exact prompt sent to the writer">${Ct}</button><template data-sdlc-wizard-step-prompt><h2>Exact prompt</h2><pre class="mono sdlc-exact-prompt-pre">${Ige(o)}</pre></template>`}});var wi,Fo,Dl=l(()=>{"use strict";wi=e=>e.toLocaleString("en-US"),Fo=(e,t)=>e.revisions.reduce((r,o)=>t!==void 0&&o.roundNumber>t?r:r+(o.writerTokens??0)+(o.run?.tokens??0)+(o.judgement?.tokens??0),0)});var no,Lge,a4,rA,l4,c4,oA=l(()=>{"use strict";j();QJ();t4();XP();jv();Nn();BP();kv();tA();Dl();no=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Lge=(e,t)=>{let r=fu(t,e),o=r!==null,n=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':o?'<span class="sdlc-node-mark sdlc-node-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',s=/^score-(\d+)$/.exec(e.id),i=e.state==="done"&&s!==null?Fo(t,Number(s[1])):0,a=i>0?`<span class="sdlc-node-reason">${wi(i)} tokens so far</span>`:"",c=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${no(e.detail)}</span>`:o&&r!==null?`<span class="sdlc-node-reason sdlc-node-reason-failed">${no(r)}</span>`:"",d=e4(ZJ(t,e)),p=t.wizard!==void 0&&t.wizard.phase==="complete"&&N(t.status)&&/^wizard-[1-4]$/.test(e.id)?` data-sdlc-outcome-step="${no(e.id)}"`:"",m=Du(t,e.id)?`<form method="POST" action="/prompt-optimizer" class="sdlc-node-skip sdlc-live-post" data-confirm-message="${no(Ov)}"><input type="hidden" name="cycleId" value="${no(t.id)}"><input type="hidden" name="wizardStepId" value="${no(e.id)}"><button class="btn btn-link sdlc-node-skip-link" type="submit" name="intent" value="wizard-skip-step">Skip</button></form>`:"",g=e.state==="active"&&e.id.startsWith("wizard-")?$J(t):"",y=o?"failed":e.state,h=o?Ai(t):null,S=h!==null?`<button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View model reply">${Ct}</button><template data-sdlc-failure-reply><h2>Model reply</h2><pre class="mono">${no(h)}</pre></template>`:"",E=e.id.startsWith("wizard-")&&(e.state==="done"||e.state==="active"||o)?Nl(t,e.id):"";return`<li class="sdlc-node sdlc-node-${y}" data-sdlc-step-id="${no(e.id)}"><div class="sdlc-node-row"><button type="button" class="sdlc-node-open"${p} data-sdlc-node>${n}<span class="sdlc-node-label">${no(e.label)}${c}${a}</span></button><div class="sdlc-node-row-actions">${m}${E}${S}</div></div>${g}<template>${d}</template></li>`},a4=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>Lge(r,t)).join("")}</ol>`,rA=e=>`<div class="sdlc-score" aria-label="What the score means">${gu(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${no(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,l4=`<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog">${ZP({type:"submit"})}</form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>`,c4=`<script>
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
</script>`});var nA,sA,iA,d4,Dv=l(()=>{"use strict";nA="support-reply",sA="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",iA=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),d4=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var aA,Hv,Fv=l(()=>{"use strict";j();oA();Dv();aA=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Hv=()=>`<section class="card">
      <p class="eyebrow">Prompt optimizer</p>
      <h1>How the prompt optimizer works</h1>
      <p class="lede"><strong>Run</strong> starts the four-step wizard: (1) generalize the prompt with <span class="mono">{{variables}}</span>, (2) evaluate revisions, (3) separate into modules, (4) optimize each module\u2014the <strong>runner</strong> executes and the judge scores only. Pause at each gate to continue or rerun with feedback. Wizard evaluate defaults use pass score <strong>${70}</strong> and up to <strong>${5}</strong> scored revisions in step 2. Click a timeline step to see the score, feedback, and saved prompt. Skills in the chosen folder fill the prompt field.</p>
      <p><a href="/prompt-optimizer">Back to the prompt optimizer</a></p>
      <h2>Goal and prompt</h2>
      <p>The goal is the outcome of using the prompt. The prompt is the instruction the model will follow. A stronger prompt changes the slots, the decision order, and when the model must stop. Pasting the goal onto the old prompt does not do that.</p>
      <h2>Score</h2>
      <p>Wizard step 2 and step 4 use pass score ${70}. A score includes the reason for that score. You can score it yourself, or let a writer score it.</p>
      ${rA(70)}
      <h2>Writers and folder</h2>
      <p>You choose the judge, the improver, and the runner for step 4. Each one has an optional instructions field, used with the goal. In step 4 the runner executes the module prompt in the folder you chose; the judge scores the changes only. If the prompt needs an input, put that input in the judge or runner instructions. After a score is saved, folder edits are put back so the next trial starts clean. Hover the info icon on a field for a best practice and an example. I'll score it and I'll rewrite it mean you do that step. A writer runs in the folder you choose, so it can read the harness and the code there. The next visit fills in the folder, judge, improver, and runner you last chose. The first visit uses your home directory and leaves those roles blank. Choose the project folder when the prompt is about that code. An optimizer that runs somewhere else cannot see that folder, so its score is not about this project. A writer that is not signed in stays blocked until its status says it is ready. Run this sample asks you to choose both roles first.</p>
      <h2>A bot on this computer</h2>
      <p>A bot starts the same wizard before it sends a Task. It does not ask you to paste the prompt into a different optimizer. GET <span class="mono">/prompt-optimizer/agent</span> lists the installed writers. POST JSON with goal, prompt, and workingDirectory starts a wizard run in that folder (pass ${70}, up to ${5} evaluate rounds). When only one writer is installed, that writer fills judge and improver. GET the same path with <span class="mono">?cycle=</span> until done is true, then use bestPrompt when status is passed or stopped. Do not use the prompt when status is failed. totalTokens is the reported writer tokens so far. The steps are also on the agent guideline.</p>
      <h2>Example</h2>
      <p>This sample is a support reply. The weak prompt can still invent a refund or skip the question the customer asked.</p>
      <h3>Goal</h3>
      <p>${aA(sA)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${aA(iA)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${aA(d4)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${aA(nA)}">Run this sample</a>
      </div>
    </section>`});var $v,lA,vge,p4,u4=l(()=>{"use strict";$v=u(require("node:fs")),lA=u(require("node:path")),vge=e=>lA.default.join(lA.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),p4=(e,t)=>{let r=vge(e),o=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;$v.default.mkdirSync(lA.default.dirname(r),{recursive:!0}),$v.default.appendFileSync(r,o,"utf8")}});var Hl,m4,xge,g4,Wge,f4,so,me,y4,X,Kt=l(()=>{"use strict";Hl=u(require("node:fs")),m4=u(require("node:path"));j();u4();xge=e=>e.wizard===void 0?e:{...e,wizard:GL(e.wizard)},g4=new Set,Wge=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),f4=(e,t)=>{Hl.default.mkdirSync(m4.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;Hl.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),Hl.default.renameSync(r,e)},so=e=>{if(!Hl.default.existsSync(e))return[];try{let t=JSON.parse(Hl.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(Wge).map(xge):[]}catch{return[]}},me=(e,t)=>so(e).find(r=>r.id===t)??null,y4=(e,t)=>{g4.add(t);let r=so(e).filter(o=>o.id!==t);f4(e,r)},X=(e,t)=>{if(g4.has(t.id))return;let r=so(e),o=r.some(n=>n.id===t.id)?r.map(n=>n.id===t.id?t:n):[t,...r];f4(e,o),p4(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var Fl,io,Hu,h4,cA,Oge,S4,P4,A4,zv=l(()=>{"use strict";Fl=u(require("node:fs")),io=u(require("node:path")),Hu=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},h4=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),cA=(e,t)=>{let r=Hu(e);return r.length>0?r:Hu(t)},Oge=e=>{let t=cA(e.fileName,e.name),r=e.promptText.trim(),o=e.name.trim();if(t.length===0||r.length===0||o.length===0)return null;let n=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${h4(o)}`,...n.length>0?[`description: ${h4(n)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},S4=e=>`.cursor/skills/${e}/SKILL.md`,P4=(e,t)=>{let r=Hu(t);if(r.length===0)return!1;let o=io.default.resolve(e),n=io.default.resolve(o,".cursor","skills"),s=io.default.resolve(o,S4(r));return s.startsWith(`${n}${io.default.sep}`)?Fl.default.existsSync(s):!1},A4=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(cA(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=io.default.resolve(e.workingDirectory);try{if(!Fl.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=Oge({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let o=S4(r.slug),n=io.default.resolve(t,".cursor","skills"),s=io.default.resolve(t,o);if(!s.startsWith(`${n}${io.default.sep}`))return{ok:!1,errorCode:"path"};if(Fl.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{Fl.default.mkdirSync(io.default.dirname(s),{recursive:!0}),Fl.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:o}}});var jge,_4,b4,k4=l(()=>{"use strict";j();Kt();bt();Or();zv();jge=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,_4=e=>{let t=e.get("savedSkill");return t!==null&&jge.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this computer.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this computer.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},b4=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=me(e.storePath,t),o=a=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${a}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!N(r.status))return{kind:"redirect",location:o("skillError=working")};let n=ve(r.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));if(n===null||ir(n.promptText)!==null)return{kind:"redirect",location:o("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=A4({workingDirectory:We(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:n.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let a=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:o(`skillError=${a}`)}}return{kind:"redirect",location:o(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var dA,pA,Fu=l(()=>{"use strict";j();dA=e=>{if(e.budgetConfirmed===!0||e.maxSpendUsd===null||e.maxSpendUsd===void 0)return e;let t=e.targetTokenBudget;if(t==null||!Number.isFinite(t)||t<1)return e;let r=oo({existing:e,confirmedTokenBudget:Math.round(t),confirmedMaxSpendUsd:e.maxSpendUsd,rateUsdPer1kTokens:e.rateUsdPer1kTokens});return r.ok?r.costControls:e},pA=e=>{let t=e.estimatedSpendUsd,r=e.maxSpendUsd;return t==null||r===null||r===void 0?!1:t>r}});var Dn,$u=l(()=>{"use strict";j();Fu();Dn=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=dv(t),n=e.judgeModel==="manual"?null:e.judgeModel,s=$P({moduleCount:o.length,existing:e.costControls,writerId:n}),i=dA(s);return{...e,status:"wizard_paused",errorMessage:null,errorKind:void 0,revisions:[],costControls:i,wizard:{...r,gate:"optimize_modules",selectedSplitOptionId:t.id,selectedSplitTopology:t.topology,modules:o,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(r.parameterValues??{}).length>0?r.parameterValues??{}:Iu(r.variables)},updatedAt:new Date().toISOString()}}});var Hn,zu=l(()=>{"use strict";Hn=e=>{let t=e.wizard;return t===void 0?e:{...e,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...t,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()}}});var uA=l(()=>{"use strict";Pr();Zp();Bd()});var Uv,R4,mA,w4,E4=l(()=>{"use strict";Uv={ok:!1,errorMessage:"Stopped.",stopped:!0,errorKind:"writer_interrupted"},R4=e=>e.exitCode===null&&e.signalCode===null,mA=(e,t=2500)=>new Promise(r=>{let o="SIGTERM",n=!1,s={},i=()=>{a(o)},a=c=>{n||(n=!0,s.escalate!==void 0&&clearTimeout(s.escalate),e.removeListener("exit",i),r(c))};try{e.kill("SIGTERM")}catch{a("SIGTERM");return}if(!R4(e)){a("SIGTERM");return}e.once("exit",i),s.escalate=setTimeout(()=>{if(!R4(e)){a(o);return}o="SIGKILL";try{e.kill("SIGKILL")}catch{}a("SIGKILL")},t)}),w4=(e,t,r,o)=>{if(t===void 0)return;let n=()=>{o?.(),mA(e).then(s=>{r({...Uv,killSignal:s})})};if(t.aborted){n();return}t.addEventListener("abort",n,{once:!0})}});var T4,Mge,Bv,Nge,C4,I4=l(()=>{"use strict";T4=/please visit the url to log in|paste the authorization code|waiting for authentication|authentication timed out|accounts\.google\.com\/o\/oauth2/i,Mge=/authentication required|not logged in|login required|please run .{1,40}\blogin\b|authentication failed or timed out/i,Bv=e=>{if(T4.test(e.stderr)||Mge.test(e.stderr))return!0;let t=e.stdout.match(new RegExp(T4.source,"gi"));return new Set((t??[]).map(r=>r.toLowerCase())).size>=2},Nge={antigravity:{label:"Antigravity CLI",command:"agy"},"claude-cli":{label:"Claude CLI",command:"claude"},codex:{label:"Codex CLI",command:"codex login"},cursor:{label:"Cursor CLI",command:"cursor-agent login"}},C4=e=>{let t=Nge[e];return`${t.label} isn't signed in on this computer. Open Terminal, run \`${t.command}\` once and finish sign-in, then retry.`}});var L4,Uu,v4,Gv,Dge,Vv,qv,Hge,Fge,$ge,x4,zge,Kv,W4,Bu,O4,Uge,Bge,It,Ei=l(()=>{"use strict";L4=require("node:child_process"),Uu=u(require("node:fs")),v4=u(require("node:os")),Gv=u(require("node:path"));uA();E4();I4();Or();Dge=["claude-cli","codex","cursor","antigravity"],Vv=18e4,qv=6e5,Hge=12e4,Fge=9e5,$ge="AGENT_WITCH_PROMPT_SDLC_WRITER_DRY_RUN",x4="AGENT_WITCH_WRITER_OPTIMIZE_TIMEOUT_MS",zge="AGENT_WITCH_WRITER_TIMEOUT_CEILING_MS",Kv=e=>{if(e===void 0||e.trim().length===0)return null;let t=Number.parseInt(e,10);return Number.isFinite(t)&&t>0?t:null},W4=e=>{let t=e.promptText.length,r;t<2e3?r=18e4:t<6e3?r=3e5:t<12e3?r=45e4:r=6e5,e.isModuleRun===!0&&(r=Kv(process.env[x4])??Math.max(r,qv));let o=e.ceilingMs!==void 0&&Number.isFinite(e.ceilingMs)&&e.ceilingMs>0?e.ceilingMs:Kv(process.env[zge])??Fge;return Math.min(o,Math.max(Hge,r))},Bu=e=>e?.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:e?.isModuleRun===!0?Kv(process.env[x4])??qv:Vv,O4=e=>`The writer timed out after ${e}ms.`,Uge=e=>Dge.includes(e),Bge=e=>e===!0||process.env[$ge]==="1",It=e=>new Promise(t=>{if(e.signal?.aborted){t(Uv);return}if(Bge(e.dryRun)){t({ok:!0,text:"[dry-run] Writer spawn skipped.",tokens:null});return}if(!Uge(e.writerAgent)){t({ok:!1,errorMessage:"The writer is not supported on this computer."});return}let r=e.writerAgent,o=er(r,e.prompt,Re({}));if(o===null){t({ok:!1,errorMessage:"The writer CLI is not available."});return}if(!Uu.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this computer."});return}let n=e.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:Vv,s=Gv.default.join(Uu.default.mkdtempSync(Gv.default.join(v4.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),i=vJ({writerAgent:r,baseArgs:o.args,replyPath:s}),a=[],c=[],d={settled:!1,stopReason:null,timer:void 0},p=(0,L4.spawn)(o.command,[...i],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),m=S=>{d.settled||(d.settled=!0,clearTimeout(d.timer),t(S))};w4(p,e.signal,m,()=>{d.stopReason="abort"}),d.timer=setTimeout(()=>{d.stopReason!=="auth"&&(d.stopReason="timeout",mA(p).then(S=>{m({ok:!1,errorMessage:O4(n),errorKind:"writer_timeout",killSignal:S})}))},n);let g={ok:!1,errorMessage:C4(r),errorKind:"action_required"},y=()=>({stdout:Buffer.concat(a).toString("utf8"),stderr:Buffer.concat(c).toString("utf8")}),h=()=>{d.settled||d.stopReason!==null||Bv(y())&&(d.stopReason="auth",mA(p).then(S=>{m({...g,killSignal:S})}))};p.stdout.on("data",S=>{a.push(Buffer.from(S)),h()}),p.stderr.on("data",S=>{c.push(Buffer.from(S)),h()}),p.on("error",()=>m({ok:!1,errorMessage:"The writer failed to start."})),p.on("close",(S,E)=>{if(d.settled)return;if(d.stopReason==="auth"){m({...g,killSignal:E==="SIGKILL"?"SIGKILL":"SIGTERM"});return}let I=Uu.default.existsSync(s)?Uu.default.readFileSync(s,"utf8"):null,f=y();if(d.stopReason===null&&Bv(f)){m(g);return}let w=xJ({writerAgent:r,...f,replyFileText:I});if(w.ok&&d.stopReason!=="abort"){m(w);return}d.stopReason===null&&m(w)})})});var Gge,Gu,Jv=l(()=>{"use strict";j();Dl();Gge=e=>{if(e.wizard!==void 0){let t=Ru(e.wizard),r=Fo(e);return(t??0)+r}return Fo(e)},Gu=e=>{let t=hv({costControls:e.costControls,spentTokens:Gge(e)});return t===null?e:t.kind==="soft_warn"?{...e,costControls:t.costControls,updatedAt:new Date().toISOString()}:{...e,status:"failed",errorMessage:t.errorMessage,errorKind:t.errorKind,costControls:t.costControls,judgePhase:void 0,updatedAt:new Date().toISOString()}}});var j4,Kge,Ku,gA,fA=l(()=>{"use strict";j();qe();Jv();j4=e=>e===F?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},Kge=(e,t,r,o,n,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:o,reasons:n,rawReply:t,tokens:s}}:i),Ku=(e,t,r=null)=>{let o=e.revisions.find(a=>a.roundNumber===e.currentRound),n=WL({raw:t,passScore:e.passScore,goal:e.goal,promptText:o?.promptText??"",improver:j4(e.improverModel),round:e.currentRound,maxRounds:e.wizard?.phase==="optimize_modules"?Sv({maxRounds:e.maxRounds,costControls:e.costControls}):e.maxRounds,earlyStopFlat:e.costControls?.earlyStop===!1?1e6:e.costControls?.earlyStopFlatRounds,priorRounds:mu(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})),e.currentRound)}),s=Kge(e,t,n.verdict?.score??null,n.verdict?.passed??null,n.verdict?.reasons??null,r),i=new Date().toISOString();return n.continuation.type==="call"?Gu({...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}):Gu({...e,revisions:s,judgePhase:void 0,status:n.continuation.type,errorMessage:n.continuation.type==="passed"?null:n.continuation.errorMessage,updatedAt:i})},gA=(e,t,r=null)=>{let o=TP({raw:t,judge:j4(e.judgeModel),goal:e.goal,passScore:e.passScore}),n=new Date().toISOString();return o.nextPrompt===null?{...e,status:"failed",errorMessage:o.continuation.type==="failed"?o.continuation.errorMessage:"The improver reply was empty.",updatedAt:n}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:o.nextPrompt,judgement:null,writerTokens:r}],updatedAt:n}}});var yA,Yv=l(()=>{"use strict";yA=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let o=`Token review: ${r}`;return{...e,revisions:e.revisions.map(n=>{if(n.roundNumber!==e.currentRound)return n;let s=n.judgement?.reasons?.trim()??"";return{...n,run:n.run===void 0?n.run:{...n.run,tokenReview:r},judgement:n.judgement===null?n.judgement:{...n.judgement,reasons:s.length===0?o:`${s}

${o}`}}})}}});var D4,hA,SA,M4,N4,Xv,Vge,H4,Zv,qge,F4,Jge,Yge,$4,z4=l(()=>{"use strict";D4=require("node:child_process"),hA=u(require("node:fs")),SA=u(require("node:path"));tS();j();M4=4e3,N4=12e3,Xv=(e,t)=>{let r=(0,D4.spawnSync)("git",[...t],{cwd:e,env:Cn(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},Vge=e=>Xv(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",H4=e=>{let t=Xv(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(o=>{if(o.length<4)return[];let n=o.slice(3).trim();return[[(n.includes(" -> ")?n.split(" -> ").at(-1)??n:n).replaceAll('"',""),o]]});return Object.fromEntries(r)},Zv=(e,t)=>{let r=SA.default.resolve(e,t),o=SA.default.relative(e,r);if(o.startsWith("..")||SA.default.isAbsolute(o)||!hA.default.existsSync(r)||!hA.default.statSync(r).isFile())return null;let n=hA.default.readFileSync(r,"utf8");return n.includes("\0")?"(binary file)":n.length>M4?`${n.slice(0,M4)}
\u2026truncated`:n},qge=e=>e.length>N4?`${e.slice(0,N4)}
\u2026truncated`:e,F4=e=>{let t=ML(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(n=>[n,Zv(e.workingDirectory,n)])),o=Vge(e.workingDirectory);return{git:o,status:o?H4(e.workingDirectory):{},files:r,paths:t}},Jge=(e,t)=>{let r=Xv(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let o=Zv(e,t);return o===null?`${t} is missing.`:o},Yge=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",$4=e=>{let t=e.before.git?H4(e.workingDirectory):{},r=Object.keys(t).filter(a=>t[a]!==e.before.status[a]),o=e.before.paths.map(a=>{let c=e.before.files[a]??null,d=Zv(e.workingDirectory,a);return c===d?`${a} did not change.`:`${a} changed.
${d??`${a} is missing.`}`}),n=r.map(a=>Jge(e.workingDirectory,a)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(a=>t[a]).join(`
`)||"(no git changes)"}`:"",n.length>0?`Changes since the run started:
${n.join(`
`)}`:"",o.length>0?`Files named in the prompt:
${o.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(a=>a.length>0);return{lookedAt:Yge(e.before.git,e.before.paths.length>0),evidence:qge(i.join(`

`))}}});var tx,le,rx,at,U4,Xge,Zge,B4,$l,G4,zl,Qge,efe,Vu,Qv,ex,tfe,K4,rfe,ofe,nfe,V4,sfe,q4,J4,ife,afe,Y4,X4=l(()=>{"use strict";tx=require("node:child_process"),le=u(require("node:fs")),rx=u(require("node:os")),at=u(require("node:path"));tS();U4=8e6,Xge=16e6,Zge=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],B4=(e,t)=>{let r=(0,tx.spawnSync)("git",[...t],{cwd:e,env:Cn(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},$l=(e,t)=>(0,tx.spawnSync)("git",[...t],{cwd:e,env:Cn(),timeout:8e3}).status===0,G4=e=>{let t=B4(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let o=r.slice(3).trim().replaceAll('"',"");return(o.includes(" -> ")?o.split(" -> "):[o]).map(s=>[s.trim(),r])}))},zl=(e,t)=>{let r=at.default.resolve(e,t),o=at.default.relative(e,r);return o.startsWith("..")||at.default.isAbsolute(o)?null:r},Qge=(e,t)=>{let r=zl(e,t);if(r===null||!le.default.existsSync(r))return null;let o=le.default.statSync(r);return!o.isFile()||o.size>U4?null:le.default.readFileSync(r)},efe=(e,t,r)=>{let o=zl(e,t);o!==null&&(le.default.mkdirSync(at.default.dirname(o),{recursive:!0}),le.default.writeFileSync(o,r))},Vu=(e,t)=>{let r=zl(e,t);r===null||!le.default.existsSync(r)||le.default.rmSync(r,{recursive:!0,force:!0})},Qv=(e,t)=>$l(e,["cat-file","-e",`HEAD:${t}`]),ex=e=>{let t=B4(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},tfe=e=>at.default.resolve(e)!==at.default.resolve(rx.default.homedir()),K4=e=>{if(!le.default.existsSync(e))return 0;let t=le.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?le.default.readdirSync(e).reduce((r,o)=>r+K4(at.default.join(e,o)),0):0},rfe=(e,t,r)=>{let o=zl(e,r);if(o===null||!le.default.existsSync(o))return{relativePath:r,existed:!1,copyDir:null};if(K4(o)>Xge)return{relativePath:r,existed:!0,copyDir:null};let n=at.default.join(t,"cache",r);return le.default.mkdirSync(at.default.dirname(n),{recursive:!0}),le.default.cpSync(o,n,{recursive:!0}),{relativePath:r,existed:!0,copyDir:n}},ofe=400,nfe=32e6,V4=e=>{let t=[],r=0,o=!0,n=s=>{if(!(!o||!le.default.existsSync(s)))for(let i of le.default.readdirSync(s)){if(!o||i===".git"||i==="node_modules")continue;let a=at.default.join(s,i),c=le.default.statSync(a);if(c.isDirectory()){n(a);continue}if(!(!c.isFile()||c.size>U4)){if(t.length>=ofe||r+c.size>nfe){o=!1;return}r+=c.size,t.push(at.default.relative(e,a))}}};return n(e),{paths:t,complete:o}},sfe=(e,t,r)=>{let o=zl(e,r);if(o===null||!le.default.existsSync(o))return null;let n=Qge(e,r);if(n===null)return"skip";let s=at.default.join(t,"files",r);return le.default.mkdirSync(at.default.dirname(s),{recursive:!0}),le.default.writeFileSync(s,n),s},q4=e=>{let t=le.default.mkdtempSync(at.default.join(rx.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?G4(e.workingDirectory):{},o=e.git?{paths:[],complete:!0}:V4(e.workingDirectory),n=e.git?[...Object.keys(r),...e.namedPaths]:[...o.paths,...e.namedPaths],s=Object.fromEntries([...new Set(n)].map(i=>[i,sfe(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?ex(e.workingDirectory):null,isolateCaches:tfe(e.workingDirectory),complete:o.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:Zge.map(i=>rfe(e.workingDirectory,t,i))}},J4=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){Vu(e.workingDirectory,t);return}efe(e.workingDirectory,t,le.default.readFileSync(r))}},ife=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?J4(e,t):Qv(e.workingDirectory,t)?$l(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):Vu(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",o=r.startsWith(" ")||r.startsWith("?");o&&Qv(e.workingDirectory,t)&&$l(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),o&&!Qv(e.workingDirectory,t)&&$l(e.workingDirectory,["reset","-q","HEAD","--",t])},afe=(e,t)=>{let r=zl(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){Vu(e.workingDirectory,t.relativePath),le.default.mkdirSync(at.default.dirname(r),{recursive:!0}),le.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){Vu(e.workingDirectory,t.relativePath);return}if(le.default.existsSync(r))for(let o of le.default.readdirSync(r)){let n=at.default.join(r,o);le.default.statSync(n).mtimeMs>=e.startedMs-1e3&&le.default.rmSync(n,{recursive:!0,force:!0})}}}},Y4=e=>{try{if(e.git){if(ex(e.workingDirectory)!==e.head&&(!(e.head===null?$l(e.workingDirectory,["update-ref","-d","HEAD"]):$l(e.workingDirectory,["reset","--hard",e.head]))||ex(e.workingDirectory)!==e.head))throw new Error("head");let r=G4(e.workingDirectory);for(let o of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))ife(e,o)}else{if(e.complete)for(let t of V4(e.workingDirectory).paths)e.files[t]===void 0&&Vu(e.workingDirectory,t);for(let t of Object.keys(e.files))J4(e,t)}for(let t of e.caches)afe(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{le.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var qu,PA,lfe,cfe,dfe,pfe,ufe,Z4,mfe,Q4,eY=l(()=>{"use strict";j();fA();Yv();z4();X4();qe();bt();Or();Ei();qu=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,judgePhase:void 0,updatedAt:new Date().toISOString()}),PA=e=>({...e,status:"stopped",errorMessage:pi,errorKind:"writer_interrupted",judgePhase:void 0,updatedAt:new Date().toISOString()}),lfe=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),cfe=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==F?t:e.improverModel!==F?e.improverModel:null}return e.judgeModel!==F?e.judgeModel:e.improverModel!==F?e.improverModel:null},dfe=async e=>{let t=We(e.cycle),r=F4({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),o=q4({workingDirectory:t,git:r.git,namedPaths:r.paths}),n=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?bu({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:gi(e.cycle.wizard,e.cycle.wizard.currentModuleIndex).output,moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):uu({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules",a=W4({promptText:e.revision.promptText,isModuleRun:i}),c=Bu({isModuleRun:i,timeoutMs:a}),d={...e.revision,timeoutBudgetMs:c,timeoutSource:"recommended"},p=await It({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal,timeoutMs:c}),m=p.ok?$4({workingDirectory:t,before:r,writerReply:p.text}):null,g=Y4(o),y={...e.cycle,revisions:e.cycle.revisions.map(h=>h.roundNumber===e.cycle.currentRound?d:h)};return p.ok?!g.ok||m===null?{ok:!1,cycle:qu(y,g.ok?"Could not put the folder back after the run.":g.errorMessage)}:{ok:!0,cycle:y,run:{output:p.text.trim(),tokens:p.tokens,delayMs:Date.now()-n,lookedAt:m.lookedAt,evidence:m.evidence}}:p.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:PA(y)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:qu(y,p.errorMessage,sr(p))})},pfe=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run,cycle:e.cycle}:e.runner===null?null:dfe({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),ufe=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),Z4=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let o=await It({writerAgent:e.reviewer,workingDirectory:We(e.cycle),prompt:jL({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return o.ok?{kind:"suggestion",text:o.text.trim(),tokens:o.tokens}:o.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:PA(e.cycle)}:sr(o)==="action_required"?{kind:"stopped",cycle:qu(e.cycle,o.errorMessage,"action_required")}:{kind:"suggestion",text:"",tokens:null}},mfe=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===F)return t;let o={...t,judgePhase:"scoring"};e.onProgress?.(o);let n=await It({writerAgent:t.judgeModel,workingDirectory:We(t),prompt:mi({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return n.ok?{...Ku(o,n.text,n.tokens),judgePhase:void 0}:n.stopped===!0||e.signal?.aborted===!0?PA(o):(e.onWriterFailure?.(t.judgeModel),qu(o,n.errorMessage,sr(n)))},Q4=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return mfe(e);let o=cfe(t),n=await pfe({cycle:t,revision:r,runner:o,signal:e.signal,onWriterFailure:e.onWriterFailure});if(n===null)return t;if(!n.ok)return n.cycle;let s=r.run===void 0?lfe(n.cycle,n.run):n.cycle;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===F){let p=await Z4({cycle:s,run:n.run,promptText:r.promptText,reviewer:o,signal:e.signal,onProgress:e.onProgress});return p.kind==="stopped"?p.cycle:{...ufe(s,p.text),judgePhase:void 0}}let i=await It({writerAgent:t.judgeModel,workingDirectory:We(t),prompt:ui({goal:t.goal,lookedAt:n.run.lookedAt??"the writer reply",evidence:n.run.evidence??n.run.output,tokens:n.run.tokens,delayMs:n.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?PA(s):(e.onWriterFailure?.(t.judgeModel),qu(s,i.errorMessage,sr(i)));let a=await Z4({cycle:s,run:n.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(a.kind==="stopped")return a.cycle;let c=i.tokens===null&&a.tokens===null?null:(i.tokens??0)+(a.tokens??0),d=Ku(s,i.text,c);return yA(d,a.text)}});var AA,gfe,ffe,ox,tY=l(()=>{"use strict";j();fA();eY();QP();Or();qe();Jv();bt();Ei();AA=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),gfe=e=>({...e,status:"stopped",errorMessage:pi,errorKind:"writer_interrupted",updatedAt:new Date().toISOString()}),ffe=(e,t,r,o,n)=>t.ok?null:t.stopped===!0||o?.aborted===!0?gfe(e):(n?.(r),AA(e,t.errorMessage,sr(t))),ox=async(e,t,r,o)=>{let n=Gu(e);if(n.status==="failed"&&n.errorKind==="budget_exceeded")return n;e=n;let s=e.revisions.find(d=>d.roundNumber===e.currentRound);if(s===void 0)return AA(e,"This round has no prompt.");if(e.status==="judging")return Q4({cycle:e,revision:s,onWriterFailure:t,signal:r,onProgress:o});if(e.status!=="improving")return AA(e,"This cycle is waiting on a step this computer cannot run.");if(e.improverModel===F)return e;let i=Ri(e);if(i===null)return AA(e,"The improver needs the score and the reason.");let a=await It({writerAgent:e.improverModel,workingDirectory:We(e),prompt:jn({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid,instructions:e.improverInstructions}),signal:r,timeoutMs:Bu()}),c=ffe(e,a,e.improverModel,r,t);return c!==null?c:gA(e,a.ok?a.text:"",a.ok?a.tokens:null)}});var Ju,nx,yfe,oY,rY,hfe,Sfe,_A,nY,sY,Pfe,Afe,Ti,iY,aY,Yu=l(()=>{"use strict";j();$u();zu();qe();bt();Or();Ei();tY();wv();Ju=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),nx=(e,t,r,o)=>{if(e.wizard===void 0||t===null)return Ju(e,r);let n=o?.trim()??"";return{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t,lastWriterParseFailureReply:n.length>0?n:e.wizard.lastWriterParseFailureReply},updatedAt:new Date().toISOString()}},yfe=e=>{let t=sr(e);return CJ(e)||t==="usage_limit"||t==="action_required"},oY=(e,t,r)=>yfe(r)?Ju(e,r.errorMessage,sr(r)):nx(e,t,r.errorMessage),rY=e=>{let t=e.wizard;return t===void 0||Ou(e).length===0?e:{...e,wizard:Ll({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},hfe=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",Sfe=e=>{let t=e.wizard;if(t===void 0)return e;let r=ku({revisions:e.revisions});if(r.rounds.length===0)return e;let o=t.modules[t.currentModuleIndex];return{...e,wizard:Ll({wizard:t,step:"optimize_modules",output:{moduleId:o?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},_A=(e,t)=>({...e,status:"wizard_paused",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),nY=e=>e.judgeModel!==F?e.judgeModel:e.improverModel!==F?e.improverModel:null,sY=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},Pfe=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=nY(e);if(n===null)return Ju(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??vr(o),i=Au({goal:e.goal,sourcePrompt:s,avoid:o.avoidByStep.generalize,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:sY(e,"generalize")}),a=await It({writerAgent:n,prompt:i,workingDirectory:We(e),signal:t});if(!a.ok)return r?.(n),oY(e,"generalize",a);try{let c=nv(a.text),d=Ll({wizard:{...o,lastWriterParseFailureReply:null,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:Iu(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),p={...e,wizard:d};return wu(d)?Ti({...p,wizard:{...d,gate:null}}):_A(p,"generalize")}catch(c){return nx(e,"generalize",c instanceof Error?c.message:"Could not read generalization.",a.text)}},Afe=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=nY(e);if(n===null)return Ju(e,"Choose a writer to suggest splits.");let s=xr({wizard:o,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=_u({goal:e.goal,templatedPrompt:o.templatedPrompt,variables:o.variables,evaluatedPromptReference:s,avoid:o.avoidByStep.separate,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:sY(e,"separate")}),a=await It({writerAgent:n,prompt:i,workingDirectory:We(e),signal:t});if(!a.ok)return r?.(n),oY(e,"separate",a);try{let c=sv(a.text),d=qL(c,o.variables),p=Ll({wizard:{...o,lastWriterParseFailureReply:null,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),m={...e,wizard:p};return Tu(d)?Dn(m,d[0]):_A(m,"separate")}catch(c){return nx(e,"separate",c instanceof Error?c.message:"Could not read split options.",a.text)}},Ti=e=>{let t=e.wizard;if(t===void 0)return e;let r=vr(t),o=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:e.passScore,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:o}},iY=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=r.modules[t];if(o===void 0)return Ju(e,"This module is missing.");let n=Do(r),s=fi(o.prompt,n),i=e.runnerModel!==void 0&&e.runnerModel!==F?e.runnerModel:e.judgeModel!==F?e.judgeModel:e.improverModel,a=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:we(r),errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:a}},aY=async(e,t,r,o)=>{let n=e.wizard;if(n===void 0)return ox(e,t,r,o);if(n.gate!==null||e.status==="wizard_paused")return e;if(n.phase==="generalize")return Pfe(e,r,t);if(n.phase==="separate"&&n.splitOptions.length===0)return Afe(e,r,t);if(n.phase==="evaluate"||n.phase==="optimize_modules"){let s=await ox(e,t,r,o);if(N(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&Ou(s).length===0)return s;let a=s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let m=ve(s.revisions.map(g=>({roundNumber:g.roundNumber,promptText:g.promptText,score:g.judgement?.score??0,reasons:g.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0;a={...s,wizard:{...s.wizard,evaluateSelectedRound:m}}}if(i==="evaluate"&&Eu({revisions:a.revisions,wizard:a.wizard,passScore:a.passScore})){let p=rY(_A(a,i));return Hn(p)}let c=_A(a,i),d=i==="optimize_modules"&&c.wizard!==void 0?(()=>{let p=XL({wizard:{...c.wizard,modules:c.wizard.modules.map((m,g)=>g===c.wizard.currentModuleIndex&&m.status==="running"?{...m,status:"paused"}:m)},moduleIndex:c.wizard.currentModuleIndex,revisions:c.revisions,cycleStatus:hfe(s.status)});return{...c,wizard:p}})():c;return i==="evaluate"?rY(d):Sfe(d)}return s}return n.phase==="complete",e}});var Ul,bA=l(()=>{"use strict";j();qe();Ul=(e,t)=>{let r=e.wizard;return r===void 0?{...e,status:t,updatedAt:new Date().toISOString()}:{...e,status:t,wizard:tv(r,e.judgeModel===F),updatedAt:new Date().toISOString()}}});var Bl,kA=l(()=>{"use strict";Bl=e=>{if(e==null)return null;if(e==="usage_limit")return"Usage limit";if(e==="action_required")return"Action required";if(e==="budget_exceeded")return"Budget exceeded";let t=String(e).replace(/^writer_/,"");return t==="timeout"?"Timeout":t==="interrupted"||t==="interrupt"?"Interrupt":t==="no_reply"?"No reply":null}});var ar,lY,_fe,cY=l(()=>{"use strict";j();bt();kA();Or();zv();ar=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),lY=e=>{if(!N(e.status))return"";let t=ve(e.revisions.map(g=>({roundNumber:g.roundNumber,promptText:g.promptText,score:g.judgement?.score??null,reasons:g.judgement?.reasons??null})));if(t===null)return"";let r=e.wizard?.modules.length??0,o=r>1?'<p class="muted sdlc-wizard-best-warning">This best prompt is from the last module\u2019s trial run. Open the wizard outcome table for every module\u2019s score and prompt.</p>':"",n=ir(t.promptText),s=t.reasons===null||t.reasons.trim().length===0?"":`<p>${ar(t.reasons.trim())}</p>`,i=e.status==="passed",a=Bl(e.errorKind),c=e.status==="passed"?'<span class="sdlc-outcome-badge sdlc-outcome-badge-passed">Passed</span>':e.status==="failed"?`<span class="sdlc-outcome-badge sdlc-outcome-badge-failed">${ar(a??"Failed")}</span>`:`<span class="sdlc-outcome-badge sdlc-outcome-badge-stopped">${ar(a??"Stopped")}</span>`,d='<p class="muted sdlc-timeout-tip" title="Module writers use a fail-clean timeout budget (~600s). Judge/heuristic recommendTimeoutMs may tune budgets; stuck writers may escalate with SIGKILL.">Fail-clean: timeout / interrupt / no_reply \u2260 success. useThisPrompt only when passed.</p>',p=n!==null?`<div class="alert-error">${ar(n)}</div>`:i?_fe({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:We(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">Do not use this prompt as a passed outcome (${ar(a??e.status)}). Save-as-skill is available only when status is passed.</div><details class="sdlc-best-readonly"><summary>View best prompt text</summary><pre class="sdlc-pre">${ar(t.promptText)}</pre></details>`,m=e.wizard!==void 0&&r>0?`Trial run \xB7 Score ${t.score} / 100`:`Round ${t.roundNumber} \xB7 Score ${t.score} / 100`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><div class="sdlc-best-outcome-row">${c}</div><h2>${m}</h2>${d}${o}${s}${p}</section>`},_fe=e=>{let t=e.sourceSkill?.fileName??Hu(e.goal),r=e.sourceSkill?.name??t,o=e.sourceSkill?.description??e.goal,n=cA(t,r),s=n.length>0&&P4(e.workingDirectory,n),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${ar(n)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${ar(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${ar(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${ar(o)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${ar(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${ar(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var dY,pY=l(()=>{"use strict";dY=e=>{let t=e.trim();if(t.length===0)return null;if(t.includes("Ignoring malformed agent role definition:")){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);return`Codex did not run the judge prompt \u2014 it failed while loading project agent config (${r===null?t:r[1].replaceAll("\\n",`
`).replaceAll('\\"','"')}). Fix or remove the broken entry under .codex/ in your working folder (or ~/.codex), then retry.`}if(t.includes('"type":"error"')||t.includes('"type": "error"')){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);if(r!==null){let o=r[1].replaceAll("\\n",`
`).replaceAll('\\"','"');return o.includes("not supported when using Codex with a ChatGPT account")?`Codex could not run the judge \u2014 your default model in ~/.codex/config.toml is not available on a ChatGPT login (for example gpt-6.1-sol). Set model = "gpt-5.5" in that file, or run codex with -m gpt-5.5, then retry Step 2. API error: ${o}`:`The judge CLI returned an error instead of a score: ${o}`}return"The judge CLI returned an error event instead of a score JSON object."}return t.startsWith("{")&&!t.includes('"score"')?"The judge reply was not score JSON (expected an object with score and reasons).":null}});var uY,bfe,RA,Lt,wA,sx=l(()=>{"use strict";j();qe();pY();BP();Or();kA();uY=["Generalize","Evaluate","Separate","Optimize modules"],bfe=e=>{let t=Ir(e),r=t>=0&&t<uY.length?uY[t]:null;return r===null?"Wizard failed.":`Step ${t+1} \u2014 ${r} failed`},RA=(e,t)=>{let r=Ai(e),o=r===null?null:dY(r),n=o===null?t.detail:t.detail.length===0?o:`${t.detail} ${o}`;return{title:t.title,detail:n,replyPreview:r}},Lt=(e,t)=>({title:e,detail:t,replyPreview:null}),wA=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"",r=Ai(e);return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback.",replyPreview:r===null?null:OJ(r)}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!N(e.status)){let t=e.judgeModel;return Lt(`${Ee(t)} is suggesting module splits.`,"This panel keeps updating while the writer works on this computer.")}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!N(e.status)){let t=e.judgeModel;return Lt(`${Ee(t)} is generalizing your prompt.`,"This panel keeps updating while the writer works on this computer.")}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===F?Lt(`Score the prompt text for round ${e.currentRound+1}.`,"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."):e.judgePhase==="scoring"?Lt(`${Ee(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"No folder run in step 2. This panel keeps updating, so the page is not stuck."):Lt(`${Ee(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"Wizard evaluate revises prompt wording before the runner executes in step 4.");if(e.status==="judging"&&e.judgeModel===F){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==F?Lt(`${Ee(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,"You score the changes after this run."):Lt(`Score the changes from round ${e.currentRound+1}.`,t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this computer can run the prompt.")}if(e.status==="judging"&&e.judgePhase==="reviewing")return Lt(`${Ee(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck.");if(e.status==="judging"&&e.judgePhase==="scoring"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=we(t);return Lt(`${Ee(r)} is scoring module ${o} of ${n}.`,`Step 4 runs one trial per module (pass \u2265 ${s}). This panel keeps updating.`)}return Lt(`${Ee(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck.")}if(e.status==="judging"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=we(t);return Lt(`${Ee(r)} is running module ${o} of ${n}.`,`The runner executes the module prompt; the judge scores output (pass \u2265 ${s}). This panel keeps updating.`)}return Lt(`${Ee(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck.")}if(e.status==="improving"&&e.improverModel===F){let t=e.revisions.find(o=>o.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return Lt("Rewrite the prompt.",t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`)}if(e.status==="improving")return Lt(`${Ee(e.improverModel)} is rewriting the prompt.`,"That writer is working on this computer. This panel keeps updating, so the page is not stuck.");if(e.status==="passed")return{title:"This prompt passed.",detail:"",replyPreview:null};if(e.status==="stopped"){let t=e.revisions.some(s=>ir(s.promptText)!==null),r=e.errorMessage?.trim()??"";if(e.wizard!==void 0){let s=_e(e.wizard),i=s.totalModules>0&&(e.wizard.phase==="complete"||s.passedModuleCount>0||N(e.status)),a=e.wizard.additionalSkillSuggestionsStatus==="pending",c=i&&s.totalModules>0?`Wizard finished \u2014 ${s.passedModuleCount}/${s.totalModules} modules passed`:"Wizard stopped before all steps finished",d=a?"The judge is reading the run summary and suggesting additional skills.":"";return{title:c,detail:r.length>0?r:d.length>0?d:i?"":"Progress from finished steps is kept.",replyPreview:null}}let o=(e.errorMessage??"").startsWith("Finished"),n=r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept.";return t?RA(e,{title:o?"Finished.":"Stopped.",detail:n}):{title:o?"Finished.":"Stopped.",detail:n,replyPreview:null}}if(e.status==="failed"){let t=e.errorMessage?.trim()??"",r=e.wizard,o=Bl(e.errorKind),n="A writer or judge reply could not be used. Start a new run after fixing the issue.",s=o===null?"":` (${o} \u2014 not success)`;return r!==void 0?RA(e,{title:`${bfe(r)}${s}`,detail:t.length>0?t:n}):RA(e,{title:o!==null?`This run failed \u2014 ${o}.`:"This run failed.",detail:t.length>0?t:"A writer or judge reply could not be used."})}if(N(e.status)){let t=e.errorMessage?.trim()??"";return RA(e,{title:"This run stopped because a reply could not be used.",detail:t.length>0?t:"A writer or judge reply could not be used."})}return{title:"Working on this computer.",detail:"This panel keeps updating.",replyPreview:null}}});var ao,Xu=l(()=>{"use strict";qe();ao=e=>{if(e.status==="improving"&&e.improverModel===F)return!0;if(e.status!=="judging"||e.judgeModel!==F)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===F}});var mY,gY=l(()=>{"use strict";mY=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var Fn,kfe,fY,yY=l(()=>{"use strict";j();Fn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),kfe=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${Fn(r)}</p>`},fY=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${Fn(e.cycleId)}">`,o=e.instructions?.trim()??"",n=o.length===0?"":`<p class="muted">Instructions</p><p>${Fn(o)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),a=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${a.length===0?"":`<p class="muted">Looked at ${Fn(a)}.</p>`}<pre class="mono">${Fn(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${Mn(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${Fn(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${n}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let p=e.avoid?.trim()??"",m=p.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${Fn(p)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${n}${kfe(e.score,e.reasons)}${m}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${Fn(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var Zu,Rfe,hY,SY=l(()=>{"use strict";j();Or();Zu=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Rfe=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,o=ir(t.promptText),n=t.judgement?.reasons?`<p class="muted">${Zu(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",a=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${Zu(i)}.</p>`}<pre class="mono">${Zu(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${Mn(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,p=o===null?`<pre class="mono">${Zu(d)}</pre>`:`<div class="alert-error">${Zu(o)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${n}${a}${p}</article>`},hY=e=>e.revisions.map(t=>Rfe(e,t)).join("")});var PY,AY=l(()=>{"use strict";j();PY=e=>{if(N(e.status))return"none";let t=e.wizard;return t===void 0?"legacy_stop":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var lo,wfe,ix,Efe,Tfe,Cfe,Ife,_Y,bY,ax=l(()=>{"use strict";AY();lo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),wfe="Stop this run? Writers will stop and the best prompt is kept.",ix="End the wizard? Writers will stop and progress from finished steps is kept.",Efe="Skip this module and pause at the step gate?",Tfe=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-live-post" data-confirm-message="${lo(wfe)}"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${lo(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,Cfe=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions sdlc-live-post" data-confirm-message="${lo(ix)}"><input type="hidden" name="cycleId" value="${lo(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,Ife=e=>{let t=lo(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${lo(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions sdlc-live-post">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module" data-confirm-message="${lo(Efe)}">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all" data-confirm-message="${lo(ix)}">End wizard</button>
    </form>
  </div>`},_Y=e=>{let t=PY(e);return t==="none"?"":t==="legacy_stop"?Tfe(e.id):t==="wizard_end_only"?Cfe(e.id):Ife(e)},bY=e=>{if(e.wizard===void 0||e.status!=="wizard_paused")return"";let t=lo(e.id);return`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end sdlc-live-post" data-confirm-message="${lo(ix)}"><input type="hidden" name="cycleId" value="${t}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`}});var kY,RY=l(()=>{"use strict";j();Dl();kY=(e,t)=>{let r=e.wizard;if(r===void 0)return"No wizard data";if(t==="wizard-1"){let o=r.variables.length;return r.templatedPrompt.trim().length>0?o>0?`Templated prompt \xB7 ${o} variable${o===1?"":"s"}`:"Templated prompt ready":o>0?`${o} variable${o===1?"":"s"} captured`:"Generalize finished"}if(t==="wizard-2"){let o=e.revisions.filter(n=>n.judgement!==null&&n.judgement!==void 0).length;if(o>0){let n=e.revisions.reduce((s,i)=>{let a=i.judgement?.score??null;return a===null?s:s===null?a:Math.max(s,a)},null);return n===null?`${o} scored revision${o===1?"":"s"}`:`Best score ${n} \xB7 ${o} revision${o===1?"":"s"}`}return r.phase==="complete"||r.gate===null?"Evaluate finished":"Evaluate not run yet"}if(t==="wizard-3"){let o=r.modules.length>0?r.modules.length:r.splitOptions.length;return o>0?`${o} module${o===1?"":"s"} defined`:r.phase==="complete"?"Separate finished":"Separate not run yet"}if(t==="wizard-4"){if(r.modules.length===0)return"No module trials yet";let o=_e(r);if(o.terminalStatusSuggestion==="passed"&&o.passedModuleCount===o.totalModules){let n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null||i.bestScore===null||a.bestScore<i.bestScore?a:i,null),s=o.rows.reduce((i,a)=>i+(a.tokens??0),0);return n===null||n.bestScore===null?`${wi(s)} tokens total`:`Lowest: ${n.title} (${n.bestScore}) \xB7 ${wi(s)} tokens`}return`${o.passedModuleCount}/${o.totalModules} passed \xB7 \u2265 ${we(r)}`}return""}});var Lfe,vfe,wY,xfe,EY,TY=l(()=>{"use strict";j();RY();Nv();YP();tA();Lfe=e=>e==="done"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-done" aria-hidden="true"></span>':e==="failed"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-pending" aria-hidden="true"></span>',vfe=e=>e==="done"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-done">Finished</span>':e==="failed"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-failed">Stopped here</span>':'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-pending">Not reached</span>',wY=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),xfe=(e,t,r)=>{let o=Ml(e,t);if(o.trim().length===0)return"";let n=t==="wizard-1"?"Step 1 \u2014 Generalize":t==="wizard-2"?"Step 2 \u2014 Evaluate":t==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=kY(e,t),i=eA(e,t),a=Lfe(i),c=vfe(i),d=Nl(e,t,{forOutcomeSummary:!0}),p=`${a}<span class="sdlc-wizard-outcome-step-title">${wY(n)}</span>${d}${c}<span class="muted sdlc-wizard-outcome-step-hint">${wY(s)}</span>`,m=t==="wizard-4"&&r.phase==="complete"?" open":"",g=i==="failed"&&t!=="wizard-4"?" open":"",y=`prompt-optimizer-wizard-outcome-${t}`;return`<details class="sdlc-wizard-outcome-step sdlc-wizard-outcome-step-${i}" id="${y}"${m}${g}><summary aria-controls="${y}-body">${p}</summary><div class="sdlc-wizard-outcome-step-body" id="${y}-body">${o}</div></details>`},EY=e=>{let t=e.wizard;if(t===void 0||!N(e.status))return"";let r=t.phase==="complete",n=(r?["wizard-1","wizard-2","wizard-3"]:["wizard-1","wizard-2","wizard-3","wizard-4"]).map(d=>xfe(e,d,t)).join(""),s='<div class="sdlc-wizard-outcome-head-actions"><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-expand-all>Expand all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-collapse-all>Collapse all</button></div>',i=r?`<div class="sdlc-wizard-process-details-body">${n}</div>`:n;return`<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><div class="sdlc-wizard-outcome-head"><h3 class="sdlc-run-panel-title">${r?"Pipeline \xB7 steps 1\u20133 (Step 4 in Module results)":"Step details"}</h3>${s}</div>${r?'<p class="muted sdlc-wizard-outcome-step4-note">Step 4 \u2014 Optimize modules is summarized in <a href="#prompt-optimizer-wizard-module-results">Module results</a> above.</p>':""}${i}</div>`}});var CY,IY,LY=l(()=>{"use strict";CY=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),IY=e=>{let t=e.wizard;return t===void 0||t.modules.length===0?"":`<ul class="sdlc-wizard-chunks sdlc-wizard-module-prompt-list">${t.modules.map(o=>`<li class="sdlc-wizard-module-prompt"><strong>${CY(o.title)}</strong><div class="sdlc-wizard-module-prompt-row"><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${CY(o.prompt)}</pre><button type="button" class="btn btn-secondary sdlc-wizard-copy-one sdlc-copy-feedback-btn" data-sdlc-copy-module-prompt>Copy prompt</button></div></li>`).join("")}</ul>`}});var lx,vY,cx=l(()=>{"use strict";lx=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,vY=(e,t)=>{if(lx(e,t))return"Passed";if(e.status==="failed")return"Failed";if(e.status==="stopped")return"Stopped";if(e.status==="running")return"Running";if(e.status==="paused")return"Paused";if(e.status==="pending")return"Pending";let r=e.statistics?.bestScore;return r!=null&&r<t?`Below pass (${r})`:e.status}});var xY,WY=l(()=>{"use strict";xY=(e,t)=>{if(e.terminalStatusSuggestion==="passed")return"";let r=e.rows.filter(o=>o.bestScore!==null&&o.bestScore<t).length;return r>0&&r===e.totalModules-e.passedModuleCount?`${e.passedModuleCount} of ${e.totalModules} modules passed. ${r} module${r===1?"":"s"} scored below ${t}.`:`${e.passedModuleCount} of ${e.totalModules} modules passed. Some modules were skipped, stopped, or below ${t}.`}});var EA,OY,jY=l(()=>{"use strict";j();cx();cx();WY();EA=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),OY=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return"";let r=_e(t),o=we(t),n=r.terminalStatusSuggestion==="passed"?"":xY(r,o),s=o-10,i=r.rows.map((c,d)=>{let p=t.modules[d],m=c.bestScore===null?"\u2014":`${c.bestScore} / \u2265${o}`,y=c.bestScore!==null&&c.bestScore>=s&&c.bestScore<o?' class="sdlc-score-near-pass"':"",h=p===void 0?c.status:vY(p,o),S=p!==void 0&&lx(p,o)?'<span class="sdlc-module-status sdlc-module-status-passed" aria-label="Passed">Passed</span>':h==="Failed"?'<span class="sdlc-module-status sdlc-module-status-failed" aria-label="Failed">Failed</span>':h==="Stopped"?'<span class="sdlc-module-status sdlc-module-status-stopped" aria-label="Stopped">Stopped</span>':EA(h);return`<tr${y}><td>${EA(c.title)}</td><td>${EA(m)}</td><td>${c.tokens??"\u2014"}</td><td>${S}</td></tr>`}).join("");return`<div class="sdlc-wizard-outcome-module-table">${n.length===0?"":`<p class="muted">${EA(n)}</p>`}<table class="sdlc-wizard-outcome-table"><caption class="sdlc-sr-only">Module scores</caption><thead><tr><th>Module</th><th title="Score compared to pass threshold">Score / pass</th><th title="Runner tokens for best trial">Tokens</th><th>Status</th></tr></thead><tbody>${i}</tbody></table></div>`}});var Ci,TA,dx=l(()=>{"use strict";Ci=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),TA=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.orchestratorSkill,o=r===null?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${Ci(r.fileName)}</code> \u2014 ${Ci(r.name)}. <span class="muted">Prompt text may change in Step 2; this skill keeps the orchestrator role.</span></p>`;if(t.additionalSkillSuggestionsStatus==="pending")return`<div class="sdlc-wizard-skill-suggestions sdlc-wizard-skill-suggestions-pending">${o}<p class="muted">The judge is reading the run summary and suggesting additional skills\u2026</p></div>`;if(t.additionalSkillSuggestionsStatus==="skipped")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;if(t.additionalSkillSuggestionsStatus!=="ready")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;let n=t.additionalSkillSuggestionsSummary===null||t.additionalSkillSuggestionsSummary.trim().length===0?"":`<p class="sdlc-wizard-skill-summary">${Ci(t.additionalSkillSuggestionsSummary.trim())}</p>`;if(t.additionalSkillSuggestions.length===0){let i=n.length>0?n:'<p class="muted">The judge had no additional skill suggestions for this run.</p>';return`<div class="sdlc-wizard-skill-suggestions">${o}${i}</div>`}let s=t.additionalSkillSuggestions.map(i=>`<li class="sdlc-wizard-skill-suggestion"><p><strong>${Ci(i.name)}</strong> <code>.cursor/skills/${Ci(i.fileName)}/SKILL.md</code></p><p class="muted">${Ci(i.description)}</p><p>${Ci(i.rationale)}</p></li>`).join("");return`<div class="sdlc-wizard-skill-suggestions" id="prompt-optimizer-wizard-skill-suggestions"><h4 class="sdlc-wizard-skill-suggestions-title">Suggested additional skills</h4>${o}${n}<p class="muted">Add these beside your orchestrator in <code>.cursor/skills/</code> \u2014 do not replace the orchestrator skill.</p><ul class="sdlc-wizard-skill-suggestion-list">${s}</ul></div>`}});var Wfe,MY,NY=l(()=>{"use strict";j();LY();jY();dx();Wfe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),MY=e=>{let t=e.wizard;if(t===void 0||t.phase!=="complete"||!N(e.status)||t.modules.length===0)return"";let r=OY(e),o=IY(e);if(r.length===0&&o.length===0)return"";let n=(e.revisions[0]?.promptText??"").trim(),s=_e(t),i=s.passedModuleCount<s.totalModules?" open":"",a=n.length===0?"":`<details class="sdlc-wizard-source-compare"${i}><summary>Compare original prompt</summary><pre class="sdlc-pre sdlc-wizard-source-prompt">${Wfe(n)}</pre></details>`;return`<section class="sdlc-run-panel sdlc-wizard-module-results" id="prompt-optimizer-wizard-module-results" tabindex="-1"><div class="sdlc-wizard-module-results-head"><div><h3 class="sdlc-run-panel-title">Module results</h3><p class="muted sdlc-wizard-module-results-sub">Optimized module prompts \xB7 copy all as Markdown sections</p></div><button type="button" class="btn btn-secondary sdlc-copy-feedback-btn" data-sdlc-copy-wizard-modules>Copy all prompts (Markdown)</button></div>${TA(e)}${a}${r}${o}</section>`}});var ce,CA=l(()=>{"use strict";j();ce={knobsSectionTitle:"Cost controls",knobsSectionLede:"Cap trials and spend before Step 4. Soft warn near the ceiling; hard stop fails with budget_exceeded (never useThisPrompt). Flat early-stop stays a clean stopped outcome.",maxTrialsLabel:"Max trials",maxSpendUsdLabel:"Max spend (USD)",earlyStopLabel:"Early-stop when scores flat",earlyStopHint:"Stop when judged scores stop rising. That is a clean stopped outcome \u2014 not budget_exceeded.",estimateSectionTitle:"Estimated run cost",estimateSectionLede:"Live heuristic before Run (proposePromptSdlcRunCostBudget). Updates when trials or judge writer change. Agent dry-run: intent estimate_budget.",targetTokenLabel:"Estimated token budget",estimatedSpendLabel:"Estimated spend (USD)",rateChipLabel:"Writer rate",rateLabel:"Rate (USD / 1k tokens)",autoConfirmHint:"Max spend filled \u2192 Run auto-confirms that ceiling (no extra panel). Leave empty to confirm explicitly at Step 4.",estimateOverCeilingWarn:"Estimate is above max spend. Run still auto-confirms the ceiling you set; the hard stop may fire earlier.",confirmTitle:"Confirm Step 4 cost ceiling",confirmLede:"Review the judge-proposed token target (targetTokenBudget) and estimated dollar budget. Approve or edit, then Step 4 runs under this hard ceiling.",proposedTokenLabel:"Proposed token budget (targetTokenBudget)",confirmedTokenLabel:"Confirmed token budget",confirmedSpendLabel:"Confirmed max spend (USD)",stubProposalNote:"Proposal uses targetTokenBudget + estimatedSpendUsd (stub heuristic until the judge fills them).",approveLabel:"Approve and start Step 4",confirmEditLabel:"Confirm edited ceiling",softWarnLabel:"Approaching budget",budgetExceededBadge:"Budget exceeded",budgetExceededFailedLabel:"Failed \xB7 budget exceeded",budgetExceededMessage:"Stopped: token or dollar budget exceeded (budget_exceeded). The best prompt so far is kept. useThisPrompt stays false."}});var IA,px=l(()=>{"use strict";IA=e=>e.status==="passed"?"passed":e.errorKind==="writer_timeout"?"timeout":e.errorKind==="writer_interrupted"?"interrupt":e.errorKind==="writer_no_reply"?"no_reply":e.errorKind==="usage_limit"?"usage_limit":e.errorKind==="action_required"?"action_required":e.errorKind==="budget_exceeded"?"budget_exceeded":e.status==="failed"?"failed":e.status==="stopped"?"stopped":e.status});var DY,HY=l(()=>{"use strict";CA();px();DY=e=>{let t=IA({status:e.status,errorKind:e.errorKind??void 0});return t==="budget_exceeded"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed sdlc-run-badge-budget",badgeLabel:ce.budgetExceededBadge,outcome:t}:t==="failed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Failed",outcome:t}:t==="timeout"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Timed out",outcome:t}:t==="interrupt"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Interrupted",outcome:t}:t==="no_reply"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"No reply",outcome:t}:t==="usage_limit"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Usage limit",outcome:t}:t==="action_required"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Action required",outcome:t}:t==="passed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-done",badgeLabel:"Passed",outcome:t}:t==="stopped"?{badgeClass:"sdlc-run-badge sdlc-run-badge-finished",badgeLabel:"Finished",outcome:t}:{badgeClass:"sdlc-run-badge",badgeLabel:t.replaceAll("_"," "),outcome:t}}});var $o,Qu=l(()=>{"use strict";$o=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",o=r.length>0?r:"Untitled run";return o.length<=72?o:`${o.slice(0,71).trimEnd()}\u2026`}});var co,LA,ux=l(()=>{"use strict";j();oA();cY();sx();Xu();gY();QP();yY();SY();ax();TY();NY();Dl();HY();bt();Qu();co=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),LA=e=>{let t=!N(e.status)&&e.status!=="wizard_paused"&&!ao(e),r=wA(e),o=a4($L(mY(e)),e),n=N(e.status)?"":_Y(e),s=EY(e),i=MY(e),a=lY(e),c=e.errorMessage===null?"":`<div class="alert-error">${co(e.errorMessage)}</div>`,d=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",p=t?" Working for <span data-elapsed>0s</span>.":"",m=e.wizard!==void 0&&e.wizard.phase==="complete"?_e(e.wizard):null,g=m!==null&&m.totalModules>0&&m.passedModuleCount===m.totalModules,y=!t&&e.wizard!==void 0&&N(e.status)&&(e.wizard.phase==="complete"||_e(e.wizard).passedModuleCount>0),h=y?g?" sdlc-run-activity-success":" sdlc-run-activity-partial":"",S=y&&e.wizard!==void 0?`<p class="sdlc-run-success-actions"><a class="btn btn-primary" href="/prompt-optimizer?cycle=${co(e.id)}&amp;export=wizard-markdown">Download report (.md)</a><a class="btn btn-secondary" href="#prompt-optimizer-wizard-module-results" data-sdlc-view-module-results hidden>Jump to module table</a><button type="button" class="btn btn-secondary" data-sdlc-rerun-same title="Open compose with your last folder, models, and pass score">Re-run same settings</button></p><p class="muted sdlc-rerun-hint">Re-run keeps settings \xB7 New prompt clears the form.</p>`:!t&&e.wizard!==void 0&&e.wizard.modules.length>0&&N(e.status)?`<p class="sdlc-run-success-actions"><a class="btn btn-secondary" href="/prompt-optimizer?cycle=${co(e.id)}&amp;export=wizard-markdown">Download report (.md)</a></p>`:"",E=r.replyPreview===null||r.replyPreview.length===0?"":`<p class="muted sdlc-run-reply-preview-label">Reply preview:</p><pre class="mono sdlc-run-reply-preview">${co(r.replyPreview)}</pre>`,I=r.detail.length===0&&S.length===0&&E.length===0||r.detail.length===0&&E.length===0?"":`<div class="sdlc-run-detail-block">${r.detail.length===0?"":`<p class="sdlc-run-detail muted">${co(r.detail)}${p}</p>`}${E}</div>`,f=e.revisions.find(Be=>Be.roundNumber===e.currentRound),w=e.status==="improving"?Ri(e):null,W=Fo(e),_=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),M=ao(e)?fY({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:w?.promptText??f?.promptText??"",score:w?.score??f?.judgement?.score??null,reasons:w?.reasons??f?.judgement?.reasons??null,avoid:w?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:f?.run??null,minJudgeScore:_?1:0}):"",v=e.wizard!==void 0&&e.wizard.phase==="complete"&&N(e.status),b=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules",P=e.wizard!==void 0&&!v&&(e.wizard.phase==="optimize_modules"||e.wizard.gate==="optimize_modules")?we(e.wizard):e.passScore,C=b?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${rA(P)}</div>`:"",L=e.status==="failed"?DY({status:e.status,errorKind:e.errorKind}):null,pe=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':N(e.status)?L!==null?`<span class="${L.badgeClass}">${L.badgeLabel}</span>`:v&&m!==null&&!g?'<span class="sdlc-run-badge sdlc-run-badge-finished">Finished</span>':'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",Z=t?d:y?g?'<span class="sdlc-run-status-dot sdlc-run-status-dot-success" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot sdlc-run-status-dot-partial" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',$e=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${co(Gt(We(e)))}</li>`:"",W>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${wi(W)} so far</li>`:""].filter(Be=>Be.length>0),k=$e.length===0?"":`<ul class="sdlc-run-meta">${$e.join("")}</ul>`,R=n.length===0?"":`<div class="sdlc-run-actions">${n}</div>`,O=v?"":`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${o}</div>`,D=v?"":C.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${O}</div>`:`<div class="sdlc-run-grid">${O}${C}</div>`,H=hY(e),$=e.wizard!==void 0&&N(e.status)&&e.revisions.every(Be=>Be.roundNumber===0&&(Be.judgement===void 0||Be.judgement===null)),q=H.length===0||$?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${H}</div></section>`,ye=`<p class="sdlc-run-goal" title="${co(e.goal.trim())}">${co($o(e.goal))}</p>`,he=v?`${c}${i}${s}${M}${a}`:`${c}${D}${M}${s}${a}`,Ot='<div id="sdlc-run-live-region" class="sdlc-sr-only" aria-live="polite" aria-atomic="true"></div><div id="sdlc-run-toast" class="sdlc-run-toast" role="status" aria-live="polite" hidden></div>',jt=v?'<p class="muted sdlc-run-complete-note">4/4 wizard steps complete \xB7 Step 4 scores live in Module results.</p>':"";return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${co(e.updatedAt)}" aria-busy="${t?"true":"false"}">${Ot}<header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${pe}</div>${ye}<div class="sdlc-run-activity${h}"${y?' role="status"':""}><div class="sdlc-run-activity-icon">${Z}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${co(r.title)}</h2>${I}${S}${jt}</div></div>${k}${R}</header>${he}</section>${q}`}});var FY,$Y=l(()=>{"use strict";j();zu();FY=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="evaluate"||!Eu({revisions:e.revisions,wizard:t,passScore:e.passScore})?e:Hn(e)}});var zY,UY=l(()=>{"use strict";j();Yu();zY=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="generalize"||!wu(t)?e:Ti({...e,wizard:{...t,gate:null}})}});var BY,GY=l(()=>{"use strict";j();$u();BY=e=>{let t=e.wizard;if(e.status!=="wizard_paused"||t===void 0||t.gate!=="separate"||!Tu(t.splitOptions))return e;let r=t.splitOptions[0];return Dn(e,r)}});var Ofe,Ii,vA=l(()=>{"use strict";$Y();UY();GY();Kt();Ofe=e=>{let t=zY(e),r=FY(t);return BY(r)},Ii=(e,t)=>{let r=Ofe(t);return r!==t?(X(e,r),r):t}});var KY,zo,em=l(()=>{"use strict";j();KY=e=>Bt.indexOf(e),zo=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||N(e.status)?Bt.length:t.gate!==null?KY(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?KY(t.phase):null}});var VY,qY=l(()=>{"use strict";VY=e=>e.output!==null?e.output:e.nullReason==="not-chain"?"Parallel split: modules do not receive prior output.":e.nullReason==="first-module"?"First module in the chain: no prior output.":e.nullReason==="prior-skipped"?"Prior module was skipped; no chain handoff.":e.nullReason==="prior-no-output"?"Prior module finished without runner output.":e.nullReason==="prior-missing"?"Prior module is missing from this split.":"No prior output."});var Li,JY,YY=l(()=>{"use strict";j();qY();Li=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),JY=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=t.currentModuleIndex,o=gi(t,r),n=r>0||t.selectedSplitTopology==="chain"?`<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module\u2019s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${Li(VY(o))}</pre></div>`:"",s=yi(e.modulePrompt);if(s.length===0)return n.length>0?`<div class="sdlc-wizard-module-params">${n}</div>`:"";let i=Do(t),a=s.map(c=>{let d=t.variables.find(h=>h.name===c),p=DP(c),m=i[c]??"",g=d===void 0?`{{${c}}}`:`{{${c}}} \u2014 ${d.description}`,y=d===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${Li(d.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${Li(p)}">${Li(g)}</label>
        ${y}
        <input class="input" type="text" id="${Li(p)}" name="${Li(p)}" value="${Li(m)}" required>
      </div>`}).join("");return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${n}${a}</div>`}});var XY,ZY=l(()=>{"use strict";XY={goal:{title:"Goal",practice:"Write the outcome a reader can check. Run uses the text in this field.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Step 2 pass score",practice:"Wizard Step 2 (evaluate) passes when the judge scores the templated prompt at or above this value. Default 70.",example:"70"},modulePassScore:{title:"Step 4 pass score",practice:"Wizard Step 4 (optimize modules) passes each module trial when the judge scores the run output at or above this value. Default 90.",example:"90"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."},maxTrials:{title:"Max trials",practice:"Caps how many runner+judge trials Step 4 may run per module (AW maxTrials). Default 1. Hard stop if spend/token ceilings trip first.",example:"1"},maxSpendUsd:{title:"Max spend (USD)",practice:"Optional compose-time dollar ceiling (AW maxSpendUsd). Before Step 4 you confirm confirmedMaxSpendUsd; hard stop uses errorKind budget_exceeded.",example:"2.50"},confirmedTokenBudget:{title:"Confirmed token budget",practice:"Hard token ceiling for Step 4 after you approve or edit the judge proposal (confirmedTokenBudget).",example:"24000"},confirmedMaxSpendUsd:{title:"Confirmed max spend (USD)",practice:"Hard dollar ceiling for Step 4 (confirmedMaxSpendUsd). Soft warn near the limit; hard stop fails with budget_exceeded.",example:"0.24"}}});var tm,jfe,Oe,$n=l(()=>{"use strict";ZY();Nn();tm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),jfe=e=>{let t=XY[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${tm(t.title)}" aria-describedby="${r}" aria-expanded="false">${Ct}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${tm(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${tm(t.example)}</span></span></button>`},Oe=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${tm(r)}"`}>${tm(e)}</span>${jfe(t)}</span>`});var lr,QY,e8,t8=l(()=>{"use strict";j();Fu();CA();$n();lr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),QY=e=>{let t=e.costControls;if(t===void 0||Ol(t))return"";let r=t.targetTokenBudget??0,o=t.rateUsdPer1kTokens??(r>0&&t.estimatedSpendUsd!==null?t.estimatedSpendUsd*1e3/r:.01),n=t.estimatedSpendUsd??Tt({tokens:r,rateUsdPer1kTokens:o}),s=t.confirmedTokenBudget??r,i=t.confirmedMaxSpendUsd??t.maxSpendUsd??n,a=t.proposalStub===!0?`<p class="muted sdlc-cost-stub-note" data-sdlc-cost-stub-note>${lr(ce.stubProposalNote)}</p>`:"",c=t.softWarnFired===!0?`<p class="alert-warn sdlc-cost-soft-warn" data-sdlc-cost-soft-warn>${lr(t.softWarnMessage??hi)}</p>`:"",d=pA({estimatedSpendUsd:n,maxSpendUsd:t.maxSpendUsd})?`<p class="alert-warn sdlc-cost-estimate-over" data-sdlc-estimate-over-ceiling>${lr(ce.estimateOverCeilingWarn)}</p>`:"",p=e.wizard?.modules.length??0,m=p>0?`<p class="muted">Step 4 will optimize ${p} module${p===1?"":"s"} (maxTrials ${t.maxTrials}).</p>`:"";return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active sdlc-cost-confirm" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-4-confirm" data-sdlc-cost-confirm>
  <p class="eyebrow">Prompt optimizer</p>
  <h2>${lr(ce.confirmTitle)}</h2>
  <p class="sdlc-wizard-gate-lede">${lr(ce.confirmLede)}</p>
  ${m}
  ${a}
  ${c}
  ${d}
  <p class="muted sdlc-cost-confirm-required" hidden>${lr(vl)}</p>
  <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback sdlc-cost-confirm-form" id="sdlc-wizard-cost-confirm-form">
    <input type="hidden" name="cycleId" value="${lr(e.id)}">
    <input type="hidden" name="targetTokenBudget" value="${r}">
    <input type="hidden" name="proposedTokenBudget" value="${r}">
    <input type="hidden" name="estimatedSpendUsd" value="${n}">
    <input type="hidden" name="rateUsdPer1kTokens" value="${o}" data-sdlc-cost-rate>
    <dl class="sdlc-cost-proposal">
      <div><dt>${lr(ce.proposedTokenLabel)}</dt><dd data-sdlc-proposed-tokens data-sdlc-target-tokens>${r.toLocaleString("en-US")}</dd></div>
      <div><dt>${lr(ce.estimatedSpendLabel)}</dt><dd data-sdlc-estimated-spend>$${n.toFixed(4)}</dd></div>
      <div><dt>${lr(ce.rateLabel)}</dt><dd>$${o.toFixed(4)}</dd></div>
    </dl>
    <div class="field">
      ${Oe(ce.confirmedTokenLabel,"confirmedTokenBudget")}
      <input class="input" type="number" name="confirmedTokenBudget" id="sdlc-confirmed-token-budget" min="1" step="1" value="${s}" required data-sdlc-confirmed-token-budget>
    </div>
    <div class="field">
      ${Oe(ce.confirmedSpendLabel,"confirmedMaxSpendUsd")}
      <input class="input" type="number" name="confirmedMaxSpendUsd" id="sdlc-confirmed-max-spend" min="0" step="0.0001" value="${i}" data-sdlc-confirmed-max-spend>
    </div>
    <div class="sdlc-wizard-actions">
      <button class="btn btn-primary" type="submit" name="intent" value="wizard-continue" data-sdlc-cost-approve>${lr(ce.approveLabel)}</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-continue" data-sdlc-cost-confirm-edit>${lr(ce.confirmEditLabel)}</button>
    </div>
  </form>
</section>`},e8=e=>{let t=e.wizard,r=e.costControls;return t!==void 0&&t.gate==="optimize_modules"&&r!==void 0&&!Ol(r)}});var Mfe,r8,o8=l(()=>{"use strict";Nn();Mfe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),r8=e=>{let t=e.trim();return t.length===0?"":`<p class="sdlc-wizard-parse-failure muted">Writer reply could not be parsed as JSON. <button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View writer reply">${Ct}</button></p><template data-sdlc-failure-reply><h2>Writer reply</h2><pre class="mono sdlc-exact-prompt-pre">${Mfe(t)}</pre></template>`}});var rm,n8,s8=l(()=>{"use strict";j();Rv();YY();Lv();ax();dx();Wv();t8();o8();rm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),n8=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let o=r.gate;if(e8(e))return QY(e);let n=we(r),s=o==="generalize"?"Step 1 \u2014 Generalize":o==="evaluate"?"Step 2 \u2014 Evaluate":o==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",i=o==="generalize"?GJ(r):"",a=o==="evaluate"?TA(e):"",c=o==="evaluate"?jl({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",p=o==="separate"?`${o==="separate"?'<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module\u2019s runner can see the previous module\u2019s output. <strong>Parallel</strong> modules are independent.</p>':""}<ul class="sdlc-wizard-splits">${r.splitOptions.map(P=>{let C=P.topology==="chain"?' <span class="sdlc-badge sdlc-badge-chain">Chain</span>':' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>',L=P.recommended?' <span class="sdlc-badge">Recommended</span>':"",pe=r.selectedSplitOptionId===P.id||r.selectedSplitOptionId===null&&P.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label class="sdlc-wizard-split-option-label"><input type="radio" name="wizardSplitOptionId" value="${rm(P.id)}" required${pe}> <strong>${rm(P.title)}</strong>${C}${L}</label>${qP(e,P)}</li>`}).join("")}</ul>`:"",m=r.modules[r.currentModuleIndex],y=o==="optimize_modules"&&m?.status==="running"&&(e.status==="judging"||e.status==="improving")?" disabled":"",h=m?.title??"Module",S=m?.prompt??"",E=m?.status==="pending",I=o==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${rm(h)}</p>${E?JY({cycle:e,modulePrompt:S}):""}<p class="muted">Test run prompt preview: ${rm(fi(S,Do(r)))}</p>${m?.statistics===null||m?.statistics===void 0?"":`<p class="muted">Module stats: best ${m.statistics.bestScore??"\u2014"} / \u2265${n} (round ${m.statistics.bestRound??"\u2014"}).</p>`}${jl({cycle:e,interactive:!1,caption:E?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${h}\u201D (runner + judge).`})}`:"",f=o==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":o==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":o==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":E?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",w=Ru(r),W=w===null?"":`<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${w}</p>`,_=e.errorMessage!==null&&(r.lastWriterParseFailureReply?.trim().length??0)>0?r8(r.lastWriterParseFailureReply??""):"",M=o==="generalize"?"wizard-1":o==="evaluate"?"wizard-2":o==="separate"?"wizard-3":"wizard-4",v=t?.active===!0?" sdlc-wizard-gate-active":"",b=t?.active===!0?` id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="${M}"`:"";return`<section class="card sdlc-wizard-gate${v}"${b}>
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${s}</h2>
    <p class="sdlc-wizard-gate-lede">${f}</p>
    ${_}
    ${W}
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback" id="sdlc-wizard-gate-form">
      <input type="hidden" name="cycleId" value="${rm(e.id)}">
    ${i}
    ${a}
    ${c}
    ${p}
    ${I}
      <div class="field">
        <label class="field-label" for="wizardFeedback">Feedback to rerun this step</label>
        <textarea class="input textarea" id="wizardFeedback" name="wizardFeedback" rows="3" placeholder="What should change?"></textarea>
      </div>
      <div class="field">
        <label class="field-label" for="wizardStepInstructions">Extra instructions (optional)</label>
        <textarea class="input textarea" id="wizardStepInstructions" name="wizardStepInstructions" rows="2" placeholder="Added to this step only when you rerun with feedback."></textarea>
      </div>
      <div class="sdlc-wizard-actions">
        <button class="btn btn-primary" type="submit" name="intent" value="wizard-continue"${y}>Continue</button>
        <button class="btn btn-secondary" type="submit" name="intent" value="wizard-feedback-rerun" formnovalidate>Rerun with feedback</button>
      </div>
    </form>
    ${bY(e)}
  </section>`}});var Nfe,i8,a8=l(()=>{"use strict";j();tA();Nfe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),i8=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||N(e.status))return"";let r=(o,n)=>{let s=Nl(e,o);return`<h2 class="sdlc-wizard-active-head">${Nfe(n)}${s}</h2>`};if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-3">
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
  </section>`:""}});var mx,l8,c8,zn,d8,Gl=l(()=>{"use strict";j();Kt();mx=new Map,l8=e=>{let t=new AbortController;return mx.set(e,t),t.signal},c8=e=>{mx.delete(e)},zn=e=>{mx.get(e)?.abort()},d8=(e,t)=>{let r=me(e,t);return r===null||r.wizard!==void 0?!1:(N(r.status)||(X(e,{...r,status:"stopped",errorMessage:pi,updatedAt:new Date().toISOString()}),zn(t)),!0)}});var p8,u8,gx,m8,fx=l(()=>{"use strict";j();em();Gl();p8="Retry this step? Results from this step and all later steps will be removed. You can run the step again from the gate below.",u8=e=>{let t=/^wizard-([1-4])$/.exec(e);if(t===null)return null;let r=Number(t[1])-1;return Bt[r]??null},gx=(e,t)=>{let r=u8(t);if(r===null||e.wizard===void 0)return!1;let o=Bt.indexOf(r);if(o===-1)return!1;let n=zo(e);return!(n===null||n<=o||e.status==="judging"&&e.wizard.gate===null&&n<Bt.length)},m8=(e,t)=>{let r=u8(t);if(r===null||e.wizard===void 0||!gx(e,t))return e;zn(e.id);let o=Bt.slice(Bt.indexOf(r)),n=Pu(e.wizard,r),s=e.revisions[0]?.promptText.trim()??n.templatedPrompt;n={...n,gate:r,phase:r,pendingStepInstructions:"",attempts:n.attempts.filter(a=>!o.includes(a.step)),additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:null},o.includes("generalize")&&(n={...n,variables:[],templatedPrompt:s}),o.includes("evaluate")&&(n={...n,evaluateSelectedRound:null}),o.includes("separate")&&(n={...n,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null}),o.includes("optimize_modules")&&(n={...n,modules:[],currentModuleIndex:0,parameterValues:{}});let i=o.includes("evaluate")?[]:o.includes("generalize")?[{roundNumber:0,promptText:s,judgement:null}]:e.revisions;return{...e,status:"wizard_paused",errorMessage:null,currentRound:0,revisions:i,...r==="evaluate"?{judgePromptTextOnly:!0}:{},wizard:n,updatedAt:new Date().toISOString()}}});var yx,g8,f8=l(()=>{"use strict";fx();yx=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),g8=(e,t)=>gx(e,t)?`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-step-retry sdlc-live-post" data-confirm-message="${yx(p8)}"><input type="hidden" name="cycleId" value="${yx(e.id)}"><input type="hidden" name="wizardStepId" value="${yx(t)}"><button class="btn btn-link sdlc-wizard-step-retry-btn" type="submit" name="intent" value="wizard-retry-step">Retry this step</button></form>`:""});var Dfe,y8,Hfe,h8,S8=l(()=>{"use strict";j();em();s8();a8();f8();YP();Dfe={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},y8=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Hfe=(e,t,r)=>{let o=g8(e,t);return`<details class="sdlc-wizard-accordion-item" data-sdlc-wizard-accordion-step="${y8(t)}">
  <summary class="sdlc-wizard-accordion-summary">${y8(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${o}${Ml(e,t)}</div>
</details>`},h8=e=>{let t=e.wizard;if(t===void 0)return"";let r=zo(e);if(r===null)return"";let o=Bt.slice(0,r).map((i,a)=>Hfe(e,`wizard-${a+1}`,Dfe[i])),n=t.gate!==null?n8(e,{active:!0}):i8(e),s=r>=Bt.length?"":n;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${o.join("")}${s}</div>`}});var xA,hx=l(()=>{"use strict";S8();xv();j();xA=e=>{if(e===null||e.wizard!==void 0&&N(e.status))return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=h8(e),r=YJ(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var Ffe,Sx,P8=l(()=>{"use strict";j();qe();bt();Ei();Ffe=e=>{let t=e.wizard;return t!==void 0&&t.phase==="complete"&&t.additionalSkillSuggestionsStatus==="pending"},Sx=async(e,t,r)=>{if(!Ffe(e))return e;let o=e.wizard;if(o===void 0)return e;if(e.judgeModel===F)return{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let n=ZL({goal:e.goal,cycleStatus:e.status,wizard:o,orchestratorSkill:o.orchestratorSkill}),s=await It({writerAgent:e.judgeModel,prompt:n,workingDirectory:We(e),signal:t});if(!s.ok)return r?.(e.judgeModel),{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let i=ev(s.text,o.orchestratorSkill?.fileName??null);return i.ok?{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:i.suggestions,additionalSkillSuggestionsSummary:i.summary.length>0?i.summary:null},updatedAt:new Date().toISOString()}:{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:i.errorMessage},updatedAt:new Date().toISOString()}}});var om,WA,A8,Px,_8,b8,k8,OA,Ax=l(()=>{"use strict";om=u(require("node:fs")),WA=u(require("node:path")),A8=e=>WA.default.join(WA.default.dirname(e),"prompt-optimizer-writer-ready.json"),Px=e=>{let t=A8(e);if(!om.default.existsSync(t))return{};try{let r=JSON.parse(om.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},_8=(e,t)=>{om.default.mkdirSync(WA.default.dirname(e),{recursive:!0}),om.default.writeFileSync(A8(e),`${JSON.stringify(t,null,2)}
`)},b8=(e,t)=>Px(e)[t]?.message??null,k8=(e,t,r)=>{_8(e,{...Px(e),[t]:{message:r}})},OA=(e,t)=>{let r=Px(e);r[t]!==void 0&&_8(e,Object.fromEntries(Object.entries(r).filter(([o])=>o!==t)))}});var _x,jA,MA,R8,Je,vi=l(()=>{"use strict";j();uA();Yu();P8();Xu();Gl();Ax();vA();Kt();_x=new Set,jA={atMs:0,ids:[]},MA=async()=>{if(Date.now()-jA.atMs<3e4)return jA.ids;let e=await Tr({commands:Re({})});return jA.atMs=Date.now(),jA.ids=e.installedWriterIds,e.installedWriterIds},R8=async(e,t,r)=>{let o=me(e,t);if(o===null||r.aborted)return;let n=Ii(e,o),s=n.wizard?.phase==="complete"&&n.wizard.additionalSkillSuggestionsStatus==="pending";if(N(n.status)&&!s||n.status==="wizard_paused"||ao(n))return;if(s){let c=await Sx(n,r,d=>{OA(e,d)});X(e,c);return}let i=await aY(n,c=>{OA(e,c)},r,c=>{me(e,t)?.status==="stopped"||r.aborted||X(e,c)});if(!(me(e,t)?.status==="stopped"||r.aborted)){if(X(e,i),N(i.status)){let c=await Sx(i,r,d=>{OA(e,d)});X(e,c);return}await R8(e,t,r)}},Je=(e,t)=>{if(_x.has(t))return;let r=me(e,t);if(r===null)return;let o=Ii(e,r),n=o.wizard?.phase==="complete"&&o.wizard.additionalSkillSuggestionsStatus==="pending";if(N(o.status)&&!n||o.status==="wizard_paused"||ao(o))return;_x.add(t);let s=l8(t);R8(e,t,s).finally(()=>{_x.delete(t),c8(t)})}});var Un,nm=l(()=>{"use strict";ux();vA();hx();vi();Un=(e,t)=>{let r=Ii(e,t);return Je(e,r.id),`${LA(r)}${xA(r)}`}});var w8,E8,T8=l(()=>{"use strict";w8=(e,t)=>e.revisions.find(o=>o.roundNumber===t)?.judgement?.score??null,E8=e=>e!==null&&e>0});var $fe,zfe,Ufe,C8,I8=l(()=>{"use strict";j();Yu();bA();$u();zu();Gl();XP();XP();$fe=e=>({id:"timeline-skip-single-module",title:"Single module",summary:"Skipped separate \u2014 one module from the generalized template.",topology:"parallel",recommended:!0,modules:[{id:"module-1",title:"Module 1",prompt:e,order:0}]}),zfe=e=>{let t=e.wizard;if(t===void 0||t.evaluateSelectedRound!==null)return e;let o=ve(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??0,reasons:n.judgement?.reasons??""})))?.roundNumber??e.revisions.at(-1)?.roundNumber??0;return{...e,wizard:{...t,evaluateSelectedRound:o}}},Ufe=e=>{let t=e.wizard;if(t===void 0)return e;let r=t.modules.map(s=>s.status==="passed"?s:{...s,status:"stopped"}),o={...t,modules:r,gate:null},n=_e(o);return Ul({...e,errorMessage:null,wizard:o},n.terminalStatusSuggestion)},C8=(e,t)=>{if(!Du(e,t))return e;zn(e.id);let r={...e,errorMessage:null},o=r.wizard;if(o===void 0)return e;if(t==="wizard-1")return Ti({...r,wizard:{...o,gate:null}});if(t==="wizard-2")return Hn(zfe(r));if(t==="wizard-3"){let n=o.splitOptions[0]??$fe(o.templatedPrompt);return Dn(r,n)}return t==="wizard-4"?Ufe(r):e}});var NA,L8,bx=l(()=>{"use strict";j();bA();Gl();NA=e=>(zn(e.id),{...Ul(e,"stopped"),errorMessage:RL}),L8=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;zn(e.id);let r=t.currentModuleIndex,o=t.modules.map((n,s)=>s===r?{...n,status:"stopped"}:n);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:o,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var Bfe,v8,x8,W8=l(()=>{"use strict";j();Yu();bA();$u();zu();nm();Kt();vi();T8();fx();I8();bx();Bfe="Pick a revision scored above 0 before continuing to Separate.",v8=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),x8=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",o=t.get("intent")??"";if(!o.startsWith("wizard-"))return!1;let n=t.get("cycleId")?.trim()??"",s=me(e.storePath,n);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},a=c=>{if(!r){i(c);return}let d=me(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(Un(e.storePath,d))};if(o==="wizard-stop-all"){let c=NA(s);return X(e.storePath,c),Je(e.storePath,n),a(n),!0}if(o==="wizard-skip-module"){let c=L8(s);return X(e.storePath,c),a(n),!0}if(o==="wizard-retry-step"){let c=t.get("wizardStepId")?.trim()??"",d=m8(s,c);return X(e.storePath,d),a(n),!0}if(o==="wizard-skip-step"){let c=t.get("wizardStepId")?.trim()??"",d=C8(s,c);return X(e.storePath,d),(d.status==="judging"||d.wizard?.additionalSkillSuggestionsStatus==="pending")&&Je(e.storePath,n),a(n),!0}if(o==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return a(n),!0;let p=t.get("wizardStepInstructions")?.trim()??"",m=KL(s.wizard,d,c);m=Pu(m,d),m={...m,pendingStepInstructions:p};let g={...s,status:"judging",errorMessage:null,wizard:{...m,gate:null},updatedAt:new Date().toISOString()};return X(e.storePath,g),Je(e.storePath,n),a(n),!0}if(o==="wizard-continue"){let c=s.wizard.gate;if(c===null)return a(n),!0;if(c==="generalize"){let d=s.wizard.attempts.some(g=>g.step==="generalize"),m=(s.errorMessage?.trim().length??0)>0&&!d?v8(s):Ti({...s,wizard:{...s.wizard,gate:null}});return X(e.storePath,m),Je(e.storePath,n),a(n),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),p=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),m=w8(s,p??-1);if(!E8(m)){let y={...s,errorMessage:Bfe,updatedAt:new Date().toISOString()};return X(e.storePath,y),a(n),!0}let g=Hn({...s,wizard:{...s.wizard,evaluateSelectedRound:p}});return X(e.storePath,g),Je(e.storePath,n),a(n),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0&&s.wizard.splitOptions.length===0){let y=v8(s);return X(e.storePath,y),Je(e.storePath,n),a(n),!0}let p=t.get("wizardSplitOptionId")?.trim()??"",m=s.wizard.splitOptions.find(y=>y.id===p);if(m===void 0){let y={...s,errorMessage:p.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return X(e.storePath,y),a(n),!0}let g=Dn(s,m);return X(e.storePath,g),a(n),!0}if(c==="optimize_modules"){let d=s.wizard,p=d.currentModuleIndex,m=d.modules[p];if(m===void 0)return a(n),!0;if(!Ol(s.costControls)){let E=t.get("confirmedTokenBudget")?.trim()??"",I=t.get("confirmedMaxSpendUsd")?.trim()??"";if(E.length===0){let w={...s,errorMessage:vl,updatedAt:new Date().toISOString()};return X(e.storePath,w),a(n),!0}let f=oo({existing:s.costControls,confirmedTokenBudget:Number(E),confirmedMaxSpendUsd:I.length===0?null:Number(I),rateUsdPer1kTokens:s.costControls?.rateUsdPer1kTokens});if(!f.ok){let w={...s,errorMessage:f.errorMessage,updatedAt:new Date().toISOString()};return X(e.storePath,w),a(n),!0}s={...s,costControls:f.costControls,errorMessage:null,updatedAt:new Date().toISOString()},X(e.storePath,s)}let g=pv({wizard:d,modulePrompt:m.prompt,posted:t});if(!g.ok){let E={...s,errorMessage:g.errorMessage,updatedAt:new Date().toISOString()};return X(e.storePath,E),a(n),!0}let y={...d,parameterValues:g.parameterValues};if(m.status==="pending"){let E=iY({...s,wizard:{...y,gate:null}},p);return X(e.storePath,E),Je(e.storePath,n),a(n),!0}let h=p+1;if(h>=d.modules.length){let E=_e(y),I=Ul({...s,wizard:y},E.terminalStatusSuggestion);return X(e.storePath,I),Je(e.storePath,n),a(n),!0}let S={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...y,gate:"optimize_modules",currentModuleIndex:h},updatedAt:new Date().toISOString()};return X(e.storePath,S),a(n),!0}}return a(n),!0}});var Gfe,O8,Kfe,kx,Vfe,j8,M8=l(()=>{"use strict";qe();Gl();bx();Yv();fA();Xu();Kt();Gfe="Add a score from 0 to 100 and the reason for it.",O8="Add a score from 1 to 100 and the reason for it.",Kfe="Write the next prompt.",kx="This step is not waiting for you.",Vfe=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},j8=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",a=me(e.storePath,i);return a===null?{kind:"missing"}:a.wizard!==void 0?(X(e.storePath,NA(a)),{kind:"saved",cycleId:i}):d8(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",o=me(e.storePath,r);if(o===null||!ao(o))return o===null?{kind:"missing"}:{kind:"invalid",cycle:o,errorMessage:kx};if(t==="manual-judge"){if(o.judgeModel!==F)return{kind:"invalid",cycle:o,errorMessage:kx};let i=Vfe(e.posted.get("score")??""),a=(e.posted.get("reasons")??"").trim(),c=o.wizard!==void 0&&(o.wizard.phase==="evaluate"||o.wizard.gate==="evaluate");if(i===null||a.length===0)return{kind:"invalid",cycle:o,errorMessage:c?O8:Gfe};if(c&&i===0)return{kind:"invalid",cycle:o,errorMessage:O8};let d=o.revisions.find(m=>m.roundNumber===o.currentRound)?.run?.tokenReview??"",p=yA(Ku(o,JSON.stringify({score:i,passed:i>=o.passScore,reasons:a})),d);return X(e.storePath,p),{kind:"saved",cycleId:o.id}}if(o.improverModel!==F)return{kind:"invalid",cycle:o,errorMessage:kx};let n=(e.posted.get("prompt")??"").trim();if(n.length===0)return{kind:"invalid",cycle:o,errorMessage:Kfe};let s=gA(o,n);return X(e.storePath,s),{kind:"saved",cycleId:o.id}}});var N8,D8=l(()=>{"use strict";N8=`<script>
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
</script>`});var H8,F8=l(()=>{"use strict";H8=`<script>
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
</script>`});var $8,z8=l(()=>{"use strict";$8=`<script>
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
</script>`});var U8,B8=l(()=>{"use strict";U8=`<script>
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
</script>`});var G8,K8=l(()=>{"use strict";j();bt();G8=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,modulePassScore:e.modulePassScore??String(90),maxRounds:e.maxRounds??String(10),maxTrials:e.maxTrials??String(1),maxSpendUsd:e.maxSpendUsd??"",earlyStop:e.earlyStop??!0,judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),o=t.wizard?.templatedPrompt.trim()??"",n=o.length>0?o:r?.promptText??e.prompt;return{goal:t.goal,prompt:n,folder:t.workingDirectory===void 0?e.folder:Gt(t.workingDirectory),passScore:String(t.passScore),modulePassScore:String(we(t.wizard)),maxRounds:String(t.maxRounds),maxTrials:String(t.costControls?.maxTrials??1),maxSpendUsd:t.costControls?.maxSpendUsd===null||t.costControls?.maxSpendUsd===void 0?"":String(t.costControls.maxSpendUsd),earlyStop:t.costControls?.earlyStop??!0,judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!N(t.status)}}});var V8,q8=l(()=>{"use strict";V8=`<script>
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
</script>`});var J8,Y8=l(()=>{"use strict";j();em();kA();J8=e=>{let t=Bl(e.errorKind);if(e.wizard===void 0)return e.status==="passed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="failed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="stopped"?{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:N(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Legacy \xB7 revision round ${e.currentRound}`}:{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Legacy \xB7 revision round ${e.currentRound}`};let r=zo(e);if(e.status==="wizard_paused"&&r!==null&&r<4)return{badgeClass:"sdlc-history-badge sdlc-history-badge-paused",badgeLabel:"Paused",subtitle:`Wizard \xB7 step ${r+1} of 4`};if(e.status==="passed"){let o=_e(e.wizard);return{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Wizard${o.totalModules>0?` \xB7 ${o.passedModuleCount}/${o.totalModules} modules`:""}`}}if(e.status==="failed")return{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:"Wizard \xB7 fail-clean (not success)"};if(e.status==="stopped"){if(e.wizard.phase==="complete"){let o=_e(e.wizard),n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null?a.bestScore:Math.min(i,a.bestScore),null),s=n===null?"":` \xB7 lowest ${n}`;return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Wizard \xB7 ${o.passedModuleCount}/${o.totalModules} modules${s}`}}return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:"Wizard \xB7 incomplete"}}return N(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:"Wizard \xB7 all steps finished"}:r!==null&&r<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Wizard \xB7 step ${r+1} of 4`}:{badgeClass:"sdlc-history-badge",badgeLabel:"Wizard",subtitle:e.status.replaceAll("_"," ")}}});var X8,Z8=l(()=>{"use strict";X8=(e,t=Date.now())=>{let r=Date.parse(e);if(Number.isNaN(r))return"";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return"Just now";let n=Math.floor(o/60);if(n<60)return`${n} min ago`;let s=Math.floor(n/60);return s<48?`${s} h ago`:`${Math.floor(s/24)} d ago`}});var Uo,qfe,Jfe,Q8,e6=l(()=>{"use strict";Y8();Z8();Qu();Uo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),qfe=e=>e.wizard===void 0?"legacy":"wizard",Jfe=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${Uo(t)}">`,o=J8(e),n=X8(e.updatedAt),s=t!==null&&e.id===t,i=s?`${o.subtitle} \xB7 Shown above`:o.subtitle,a=n.length===0?i:`${i} \xB7 ${n}`,c=s?'<span class="sdlc-history-badge sdlc-history-badge-viewing">Viewing</span>':"",d=s?"":`<span class="${Uo(o.badgeClass)}">${Uo(o.badgeLabel)}</span>`,p=e.status==="wizard_paused"?`<a class="btn btn-secondary sdlc-history-resume" href="/prompt-optimizer?cycle=${Uo(e.id)}">Resume</a>`:"",m=s?"":`<form method="POST" action="/prompt-optimizer" onsubmit="return confirm('Delete this run from history?');"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${Uo(e.id)}">${r}<button class="btn btn-link sdlc-history-delete" type="submit">Delete</button></form>`;return`<li class="sdlc-history-item${t===e.id?" sdlc-history-item-viewing":""}" data-sdlc-history-kind="${qfe(e)}"><div class="sdlc-history-row-main">${c}${d}<div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${Uo(e.id)}">${Uo($o(e.goal))}</a><p class="muted">${Uo(a)}</p></div></div><div class="sdlc-history-row-actions">${p}${m}</div></li>`},Q8=(e,t)=>{if(e.length===0)return'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>';let r=e.slice(0,20).map(a=>Jfe(a,t)).join(""),o=`<div class="sdlc-history-filter" role="group" aria-label="Filter history">
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="all" aria-pressed="true">All</button>
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="wizard" aria-pressed="false">Wizard</button>
  </div>`,n=Math.min(e.length,20),s=n===e.length?`History \xB7 ${e.length}`:`History \xB7 ${n} of ${e.length}`,i=`<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2>${o}<ul class="sdlc-history">${r}</ul></section>`;return t!==null?`<details class="sdlc-history-details" id="prompt-optimizer-history" aria-labelledby="prompt-optimizer-history-summary"><summary class="sdlc-history-details-summary" id="prompt-optimizer-history-summary"><span class="eyebrow">Past runs</span> ${Uo(s)}</summary>${i}</details>`:i}});var Rx,DA,t6,Yfe,Xfe,sm,r6,HA=l(()=>{"use strict";Rx=u(require("node:fs")),DA=u(require("node:path"));bt();t6=/^[a-z0-9-]+$/,Yfe=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},Xfe=(e,t)=>{if(!t6.test(t))return null;let r=e.replace(/^\uFEFF/,""),o=t,n="",s=r;if(r.startsWith("---")){let a=r.indexOf(`
---`,3);if(a!==-1){let c=r.slice(3,a);s=r.slice(a+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let p=/^(name|description):\s*(.*)$/.exec(d.trim());if(p===null)continue;let m=Yfe(p[2]??"");p[1]==="name"&&m.length>0&&(o=m),p[1]==="description"&&(n=m)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:o,description:n,promptText:i}},sm=e=>{let t=Ho(e);if(!t.ok)return[];let r=DA.default.resolve(t.path,".cursor","skills"),o=[];try{o=Rx.default.readdirSync(r)}catch{return[]}return o.filter(n=>t6.test(n)).flatMap(n=>{let s=DA.default.resolve(r,n,"SKILL.md");if(!s.startsWith(`${r}${DA.default.sep}`))return[];try{let i=Xfe(Rx.default.readFileSync(s,"utf8"),n);return i===null?[]:[i]}catch{return[]}}).toSorted((n,s)=>n.fileName.localeCompare(s.fileName))},r6=(e,t)=>sm(e).find(r=>r.fileName===t)??null});var o6,Zfe,n6,s6,i6=l(()=>{"use strict";$n();o6=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Zfe=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),n6=e=>{if(e.length===0)return`<div class="field">${Oe("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${o6(r.fileName)}">${o6(r.fileName)}</option>`).join("");return`<div class="field">${Oe("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${Zfe(e)}</script>`},s6=`<script>
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
</script>`});var vt,a6,l6=l(()=>{"use strict";j();CA();Fu();$n();vt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),a6=e=>{let t=Number(e.maxTrials),r=Number.isInteger(t)&&t>=1&&t<=30?t:1,o=vt(e.maxSpendUsd),n=e.earlyStop?" checked":"",s=e.writerId?.trim()||null,i=e.maxRounds??5,a=Si({maxRounds:i,maxTrials:r,writerId:s}),c=a.rateUsdPer1kTokens??nr(s),d=e.maxSpendUsd.trim().length===0?null:Number(e.maxSpendUsd),m=pA({estimatedSpendUsd:a.estimatedSpendUsd,maxSpendUsd:d!==null&&Number.isFinite(d)?d:null})?"":" hidden",g=s===null||s.length===0?"default":s;return`<div class="sdlc-block sdlc-cost-controls" data-sdlc-cost-controls>
  <p class="sdlc-block-title">${vt(ce.knobsSectionTitle)}</p>
  <p class="muted">${vt(ce.knobsSectionLede)}</p>
  <div class="field">
    ${Oe(ce.maxTrialsLabel,"maxTrials")}
    <input class="input" type="number" name="maxTrials" id="sdlc-max-trials" min="1" max="${30}" step="1" value="${r}" data-sdlc-max-trials>
  </div>
  <div class="field">
    ${Oe(ce.maxSpendUsdLabel,"maxSpendUsd")}
    <input class="input" type="number" name="maxSpendUsd" id="sdlc-max-spend-usd" min="0" step="0.01" value="${o}" placeholder="Optional" data-sdlc-max-spend-usd>
    <p class="muted">${vt(ce.autoConfirmHint)}</p>
  </div>
  <div class="field sdlc-cost-early-stop">
    <label class="sdlc-checkbox-label">
      <input type="checkbox" name="earlyStop" value="on" id="sdlc-early-stop" data-sdlc-early-stop${n}>
      <span>${vt(ce.earlyStopLabel)}</span>
    </label>
    <p class="muted">${vt(ce.earlyStopHint)}</p>
  </div>
  <div class="sdlc-cost-estimate" data-sdlc-cost-estimate>
    <p class="sdlc-block-title">${vt(ce.estimateSectionTitle)}</p>
    <p class="muted">${vt(ce.estimateSectionLede)}</p>
    <dl class="sdlc-cost-proposal sdlc-cost-estimate-proposal">
      <div><dt>${vt(ce.targetTokenLabel)}</dt><dd data-sdlc-target-tokens data-sdlc-proposed-tokens>${a.targetTokenBudget.toLocaleString("en-US")}</dd></div>
      <div><dt>${vt(ce.estimatedSpendLabel)}</dt><dd data-sdlc-estimated-spend>$${a.estimatedSpendUsd.toFixed(4)}</dd></div>
      <div><dt>${vt(ce.rateChipLabel)}</dt><dd><span class="sdlc-cost-rate-chip" data-sdlc-writer-rate-chip data-writer-id="${vt(g)}">$${c.toFixed(4)} / 1k \xB7 ${vt(g)}</span></dd></div>
    </dl>
    <input type="hidden" name="targetTokenBudget" value="${a.targetTokenBudget}" data-sdlc-target-token-budget-input>
    <input type="hidden" name="estimatedSpendUsd" value="${a.estimatedSpendUsd}" data-sdlc-estimated-spend-input>
    <input type="hidden" name="rateUsdPer1kTokens" value="${c}" data-sdlc-cost-rate>
    <p class="alert-warn sdlc-cost-estimate-over" data-sdlc-estimate-over-ceiling${m}>${vt(ce.estimateOverCeilingWarn)}</p>
  </div>
</div>`}});var gt,c6,d6,Qfe,p6,u6,m6,g6=l(()=>{"use strict";j();sx();qe();Qu();em();gt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),c6=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",d6=e=>e.gate!==null?e.gate:e.phase==="generalize"||e.phase==="evaluate"||e.phase==="separate"||e.phase==="optimize_modules"?e.phase:null,Qfe=e=>{let t=e.wizard?.templatedPrompt.trim()??"";return t.length>0?t:e.revisions.find(o=>o.roundNumber===0)?.promptText??""},p6=e=>e===F?"You":Ee(e),u6=e=>{let t=Qfe(e),r=e.runnerModel===void 0||e.runnerModel==="manual"?"\u2014":Ee(e.runnerModel);return`<details class="sdlc-wizard-resume-inputs">
    <summary class="btn btn-secondary">View inputs</summary>
    <dl class="sdlc-wizard-resume-inputs-list">
      <div><dt>Goal</dt><dd>${gt(e.goal)}</dd></div>
      <div><dt>Prompt</dt><dd class="mono">${gt(t)}</dd></div>
      <div><dt>Judge</dt><dd>${gt(p6(e.judgeModel))}</dd></div>
      <div><dt>Improver</dt><dd>${gt(p6(e.improverModel))}</dd></div>
      <div><dt>Runner</dt><dd>${gt(r)}</dd></div>
    </dl>
  </details>`},m6=e=>{let t=e.wizard;if(t===void 0)return"";let r=$o(e.goal),o=e.status==="wizard_paused",n=!N(e.status)&&e.status!=="wizard_paused";if(!o&&!n)return"";if(n){let p=wA(e),m=d6(t),g=m===null?"":c6(m),y=zo(e),h=g.length===0?"":y===null||y>=4?` <strong>${gt(g)}</strong>`:` <strong>${gt(g)}</strong> (step ${y+1} of 4)`;return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-active" role="status" aria-live="polite">
    <p class="eyebrow">Wizard running</p>
    <h2>${gt(r)}</h2>
    <p class="lede"><span class="sdlc-spin" aria-hidden="true"></span> ${gt(p.title)}${h}</p>
    <p class="muted">${gt(p.detail)}</p>
    <div class="actions">
      ${u6(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${gt(e.id)}">Open this run</a>
    </div>
  </section>`}let s=d6(t),i=s===null?"Wizard":c6(s),a=zo(e),c=a===null||a>=4?"":` (step ${a+1} of 4)`,d=new Date(e.updatedAt).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"});return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-paused" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${gt(r)}</h2>
    <p class="lede">Paused at <strong>${gt(i)}</strong>${gt(c)} (last updated ${gt(d)}). Continue where you left off or open another run below.</p>
    <div class="actions">
      ${u6(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${gt(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var im,f6,y6=l(()=>{"use strict";$n();im=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),f6=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(n=>`<option value="${im(n.id)}"${n.id===e.runner?" selected":""}>${im(n.label)}</option>`).join(""),o=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${im(e.runner)}">Checking ${im(e.writers.find(n=>n.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block" data-sdlc-wizard-only>
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${Oe("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${o}</div>
      <details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${Oe("Runner instructions","runnerInstructions")}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${im(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div></details>
    </div>
  </div>`}});var h6,S6=l(()=>{"use strict";h6=()=>'<table class="sdlc-role-step-table"><caption class="muted">Who does what in the wizard</caption><thead><tr><th>Role</th><th>Wizard steps</th></tr></thead><tbody><tr><td>Judge</td><td>Steps 2 and 4 (scores only)</td></tr><tr><td>Improver</td><td>\u2014</td></tr><tr><td>Runner</td><td>Step 4 (executes module prompts)</td></tr></tbody></table>'});var Kl,P6,A6,_6,b6,k6=l(()=>{"use strict";$n();Kl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),P6=(e,t,r,o,n)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=o.map(c=>`<option value="${Kl(c.id)}"${c.id===r?" selected":""}>${Kl(c.label)}</option>`).join(""),a=`<option value="manual"${r==="manual"?" selected":""}>${Kl(n)}</option>`;return`<div class="field">${Oe(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${a}</select></div>`},A6=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let o=r.find(n=>n.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${Kl(t)}">Checking ${Kl(o)}\u2026</p>`},_6=(e,t,r,o,n)=>`<details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${Oe(t,n)}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${Kl(r)}</textarea><span class="muted">${o}</span></div></details>`,b6=e=>{let t=`<div class="sdlc-writer">${P6("judge","Judge",e.judge,e.writers,"I'll score it")}${A6("judge",e.judge,e.writers)}${_6("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.","judgeInstructions")}</div>`,r=`<div class="sdlc-writer">${P6("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${A6("improver",e.improver,e.writers)}${_6("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.","improverInstructions")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var R6,w6=l(()=>{"use strict";R6=[{label:"Save tokens",goal:"Save tokens while keeping the same output and behavior."},{label:"Shorter prompt",goal:"Make the prompt shorter without losing required behavior or safety constraints."},{label:"Clearer instructions",goal:"Make instructions clearer and easier for the model to follow on the first try."},{label:"Add guardrails",goal:"Add explicit guardrails, constraints, and failure modes so the model stays on scope."},{label:"Template variables",goal:"Turn this into a reusable template with named {{variables}} and sample values for each."},{label:"Raise judge score",goal:"Improve the prompt so judge scores rise: tighter scope, checkable outcomes, and less ambiguity."}]});var am,eye,FA,wx=l(()=>{"use strict";w6();am=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),eye=(e,t)=>{let r=am(e.goal),o=am(e.label);return t===void 0?`<button type="button" class="sdlc-goal-preset-chip" data-sdlc-goal-preset="${r}" title="${r}">${o}</button>`:`<button type="submit" class="sdlc-goal-preset-chip" name="${am(t)}" value="${r}" title="${r}">${o}</button>`},FA=(e={})=>{let t=e.presets??R6,r=e.groupLabel??"Common goals",o=e.leadLabel??"Quick fill:",n=t.map(s=>eye(s,e.submitName)).join("");return`<div class="sdlc-goal-presets" role="group" aria-label="${am(r)}"><span class="sdlc-goal-presets-label muted">${am(o)}</span>${n}</div>`}});var lm,tye,rye,Ex,E6=l(()=>{"use strict";j();$n();lm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),tye=(e,t)=>{let r=Number(e);return/^\d{1,3}$/.test(e)&&r>=1&&r<=100?r:t},rye=e=>`calc((${e-1} / 99) * (100% - 1.15rem) + 0.575rem)`,Ex=e=>{let t=tye(e.passScore,e.defaultScore),r=Math.floor(t/2),o=Math.max(r+1,t-20),n=gu(t).map(c=>c.label).join(" \xB7 "),s=e.usualMark??90,i=`--sdlc-weak:${r}%;--sdlc-close:${o}%;--sdlc-pass:${t}%`,a=`${e.inputId}-label`;return`<div class="field sdlc-pass" data-sdlc-pass-group><div class="sdlc-pass-head">${Oe(e.label,e.fieldTipKey,a)}<output class="sdlc-pass-value" data-sdlc-pass-value for="${lm(e.inputId)}">${t}</output></div><div class="sdlc-pass-scale" style="${i}"><span class="sdlc-pass-bar" aria-hidden="true"></span><input id="${lm(e.inputId)}" class="sdlc-pass-range" type="range" name="${lm(e.inputName)}" min="1" max="100" step="1" value="${t}" data-sdlc-pass aria-labelledby="${lm(a)}"><span class="sdlc-pass-mark" style="left:${rye(s)}" aria-hidden="true"><span class="sdlc-pass-mark-label">${s}</span></span></div><p class="sdlc-pass-legend" data-sdlc-pass-legend>${lm(n)}</p><p class="muted">The bar fades from weak to pass. The mark is the usual ${s}.</p></div>`}});var nye,Tx,Bo,Cx,Ix=l(()=>{"use strict";Xu();ux();D8();F8();oA();z8();B8();K8();q8();e6();HA();i6();$n();hx();l6();g6();Qu();y6();S6();k6();j();wx();E6();nye=(e,t,r)=>r&&e.trim().length>0&&t.trim().length>0,Tx='<button type="button" class="btn btn-link sdlc-compose-skip-summary" data-sdlc-compose-skip-to-summary>Skip to summary</button>',Bo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Cx=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${Bo(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${Bo(e.skillNotice??"")}</div>`,o=`${l4}${c4}`,n=e.resumableWizardCycle??null,s=n===null?"":m6(n),i=xA(e.cycle),a=e.cycle===null?"":LA(e.cycle),c=e.cycle!==null&&ao(e.cycle),d=G8(e),p=nye(d.goal,d.prompt,e.canRun),m=b6({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),g=f6({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),y=`${Ex({fieldTipKey:"passScore",label:"Step 2 pass score",inputName:"passScore",inputId:"sdlc-pass-step2",passScore:d.passScore,defaultScore:70,usualMark:70})}${Ex({fieldTipKey:"modulePassScore",label:"Step 4 pass score",inputName:"modulePassScore",inputId:"sdlc-pass-step4",passScore:d.modulePassScore,defaultScore:90,usualMark:90})}`,h=a6({maxTrials:d.maxTrials,maxSpendUsd:d.maxSpendUsd,earlyStop:d.earlyStop,writerId:d.judge==="manual"?null:d.judge,maxRounds:5}),S=BL,E=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",I=e.cycle!==null&&N(e.cycle.status),f=d.running&&!I,w=I||f?"":" open",W=f?" sdlc-compose-run-focus":"",M=`<span class="sdlc-form-head-actions" data-sdlc-compose-head-actions>${I?'<button type="button" class="btn btn-primary" data-sdlc-start-new-run title="Clear the form and set a new goal">New prompt</button>':'<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>'}</span>`,v=I?(()=>{let k=e.cycle!==null?$o(e.cycle.goal):$o(d.goal);return`<summary class="sdlc-compose-summary sdlc-compose-summary-collapsed sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="sdlc-compose-summary-chevron" aria-hidden="true">\u25B8</span><span class="sdlc-compose-summary-copy"><span class="eyebrow">Compose</span><span class="sdlc-compose-summary-title">Review settings</span><span class="muted sdlc-compose-summary-preview">${Bo(k)}</span><span class="muted sdlc-compose-summary-hint">Expand to edit fields \u2014 does not start a run. Use New prompt or Re-run below.</span></span></span>${M}</summary>`})():`<summary class="sdlc-compose-summary sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</span>${M}</summary>`,b=I?" sdlc-compose-viewing-finished":"",P=c||d.running?c?"Waiting for you":'<span class="sdlc-spin" aria-hidden="true"></span> Running\u2026':"Run",C=c?"waiting":d.running?"running":"idle",L=d.running&&!c?' aria-busy="true"':"",pe=`<section class="card sdlc-compose${b}${W}" id="prompt-optimizer-compose">
      <form class="sdlc-form" method="POST" action="/prompt-optimizer" enctype="application/x-www-form-urlencoded">
      <details class="sdlc-compose-details" id="prompt-optimizer-compose-details"${w}>
        ${v}
        <div class="sdlc-compose-details-body">
      <p class="lede">${S} ${Bo(e.modelNote)}</p>
        <ol class="sdlc-compose-stepper" aria-label="Compose steps" data-sdlc-compose-stepper>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="1" aria-current="step"><span class="sdlc-compose-stepper-index">1</span><span class="sdlc-compose-stepper-label">Project</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="2"><span class="sdlc-compose-stepper-index">2</span><span class="sdlc-compose-stepper-label">Prompt and goal</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="3"><span class="sdlc-compose-stepper-index">3</span><span class="sdlc-compose-stepper-label">CLI</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="4"><span class="sdlc-compose-stepper-index">4</span><span class="sdlc-compose-stepper-label">Summary</span></li>
        </ol>
        <fieldset class="sdlc-fields"${d.running?" disabled":""}>
        ${E}
        <p class="alert-error sdlc-compose-step-error" data-sdlc-compose-step-error hidden role="alert"></p>
        <div class="sdlc-compose-step" data-sdlc-compose-step="1" id="sdlc-compose-step-1">
          <h3 class="sdlc-compose-step-title">Project</h3>
          <p class="muted sdlc-compose-step-lede">Choose the folder writers run in and optionally load a skill into the prompt on the next step.</p>
          <div class="sdlc-block sdlc-block-flush">
          <div class="sdlc-folder">
          <div class="field">
            ${Oe("Folder","folder")}
            <input class="input" type="text" name="folder" value="${Bo(d.folder)}" required onkeydown="if (event.key === 'Enter') event.preventDefault()">
          </div>
          <button class="btn btn-secondary" type="submit" name="intent" value="choose-folder" formnovalidate>Choose folder\u2026</button>
        </div>
        ${n6(sm(d.folder))}
        </div>
          <div class="sdlc-compose-step-actions">
            ${Tx}
            <button type="button" class="btn btn-primary" data-sdlc-compose-continue>Continue</button>
          </div>
        </div>
        <input type="hidden" name="orchestratorSkillFile" value="" data-orchestrator-skill-file>
        <div class="sdlc-compose-step" data-sdlc-compose-step="2" id="sdlc-compose-step-2" hidden>
          <h3 class="sdlc-compose-step-title">Prompt and goal</h3>
          <p class="muted sdlc-compose-orchestrator-note" data-orchestrator-skill-note hidden></p>
          <div class="sdlc-block sdlc-block-flush">
          <div class="field">
            ${Oe("Goal","goal")}
            ${FA()}
            <textarea class="input textarea" name="goal" rows="4" required>${Bo(d.goal)}</textarea>
          </div>
          <div class="field">
            ${Oe("Prompt","prompt")}
            <textarea class="input textarea" name="prompt" rows="10" required>${Bo(d.prompt)}</textarea>
          </div>
          ${y}
          ${h}
        </div>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            ${Tx}
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
        ${g}
        ${h6()}
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            ${Tx}
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
          <p class="muted sdlc-wizard-limits-callout" data-sdlc-wizard-limits-callout">Wizard: Step 2 pass \u2265 ${Bo(d.passScore)}; Step 4 pass \u2265 ${Bo(d.modulePassScore)}; up to ${5} scored revisions in Step 2; Step 4 runs one trial per module.</p>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            <button class="btn btn-primary sdlc-run-wizard-btn" type="submit" name="intent" value="run" data-sdlc-run data-sdlc-run-wizard data-sdlc-run-state="${C}" data-can-run="${p?"true":"false"}"${L}${d.running?" disabled":""}>${P}</button>
          </div>
        </div>
        </div>
        </fieldset>
        </div>
      </details>
      </form>
    </section>`,Z=e.history.length>0?V8:"",$e=`${""}${U8}${N8}${H8}${$8}${s6}${Z}`;return`${t}${r}${pe}${s}${a}${i}${o}${Q8(e.history,e.cycle?.id??null)}${$e}`}});var cm,Lx=l(()=>{"use strict";Ix();cm=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:Cx(t)}))}});var T6,C6=l(()=>{"use strict";M8();nm();Lx();Kt();vi();T6=async(e,t,r)=>{let o=t===null?{kind:"ignored"}:j8({posted:t,storePath:e.storePath});if(o.kind==="ignored")return!1;if(o.kind==="saved"){let n=me(e.storePath,o.cycleId);return Je(e.storePath,o.cycleId),t?.get("liveFragment")==="1"&&n!==null?(e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":n.id}),e.response.end(Un(e.storePath,n)),!0):(e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(o.cycleId)}`}),e.response.end(),!0)}return o.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await cm(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:o.cycle.judgeModel,improver:o.cycle.improverModel,folder:"~",passScore:String(o.cycle.passScore),maxRounds:String(o.cycle.maxRounds),canRun:r.canRun,errorMessage:o.errorMessage,skillNotice:null,cycle:o.cycle,history:so(e.storePath),resumableWizardCycle:null}),!0)}});var I6,$A,vx=l(()=>{"use strict";j();I6=u(require("node:os")),$A=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??I6.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??(e.wizard!==void 0?70:90),maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel},costControls:e.costControls??or()}}});var L6,Vl,xx,v6,x6,dm=l(()=>{"use strict";j();qe();Dv();L6=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,Vl=e=>{let t=MJ(e),r=_i(e).map(s=>({id:s,label:GP[s]})),o=r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(s=>s.label).join(", ")}.`,n=t?.judge??"";return{note:o,canRun:!0,models:t,writers:r,judge:n,improver:t?.improver??n,runner:n}},xx=(e,t,r)=>t===F||t!==null&&e.writers.some(o=>o.id===t)?t:r,v6=(e,t,r,o=null)=>({judge:xx(e,t,e.judge),improver:xx(e,r,e.improver),runner:xx(e,o,e.runner)}),x6=e=>e===nA?{goal:sA,prompt:iA}:{goal:"",prompt:""}});var Wx,W6=l(()=>{"use strict";Wx=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,3}$/.test(t)||r<1||r>100?{ok:!1,errorMessage:"Pass score must be a whole number from 1 to 100."}:{ok:!0,passScore:r}}});var O6,sye,j6,M6,N6,D6=l(()=>{"use strict";j();O6=(e,t)=>{let r=e?.trim()??"";if(r.length===0)return t;if(!/^\d{1,3}$/.test(r))return null;let o=Number(r);return!Number.isInteger(o)||o<1||o>30?null:o},sye=e=>{let t=e?.trim()??"";if(t.length===0)return{ok:!0,value:null};let r=Number(t);return!Number.isFinite(r)||r<0?{ok:!1}:{ok:!0,value:Math.round(r*1e4)/1e4}},j6=(e,t)=>e.has("earlyStop")?!0:t!=="run",M6=e=>{let t=O6(e.maxTrials,1);if(t===null)return{ok:!1,errorMessage:`Max trials must be a whole number from 1 to ${30}.`};let r=sye(e.maxSpendUsd);if(!r.ok)return{ok:!1,errorMessage:"Max spend (USD) must be empty or a non-negative number."};let o=e.earlyStop?.trim().toLowerCase()??"on",n=o==="on"||o==="true"||o==="1"||o==="yes",s=O6(e.earlyStopFlatRounds,3);return s===null?{ok:!1,errorMessage:"Early-stop flat rounds must be a whole number from 1 to 30."}:{ok:!0,knobs:{maxTrials:t,maxSpendUsd:r.value,earlyStop:n,earlyStopFlatRounds:s}}},N6=e=>or(e)});var H6,F6,zA,Ox=l(()=>{"use strict";j();qe();bt();dm();W6();D6();H6=(e,t,r)=>{let o=e?.get(t)?.trim()??"";if(o.length===0)return String(r);let n=Wx(o);return n.ok?String(n.passScore):String(r)},F6=(e,t,r)=>{let o=e.get(t)?.trim()??"",n=o.length===0?r:o;return Wx(n)},zA=e=>{let t=v6(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=H6(e.posted,"passScore",70),o=H6(e.posted,"modulePassScore",90),n=String(5),s=e.posted?.get("judgeInstructions")?.trim()??"",i=e.posted?.get("improverInstructions")?.trim()??"",a=e.posted?.get("runnerInstructions")?.trim()??"",c=e.posted?.get("runner")??null,d=e.posted?.get("maxTrials")?.trim()||String(1),p=e.posted?.get("maxSpendUsd")?.trim()??"",m=e.posted?.get("intent")??"",g=e.posted===null?!0:j6(e.posted,m),y=(v,b)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:v,passScore:r,modulePassScore:o,maxRounds:n,errorMessage:b,judge:t.judge,improver:t.improver,judgeInstructions:s,improverInstructions:i,runner:t.runner,runnerInstructions:a,maxTrials:d,maxSpendUsd:p,earlyStop:g});if(e.posted===null)return y(e.defaultFolder??bi,null);let h=e.posted.get("folder")??bi;if(e.posted.get("intent")==="choose-folder"){let v=e.pickFolder();return y(v===null?h:Gt(v),null)}if((e.posted.get("intent")??"")!=="run")return y(h,null);let E=L6(e.goal,e.prompt);if(E!==null)return y(h,E);let I=F6(e.posted,"passScore",r);if(!I.ok)return y(h,I.errorMessage);let f=F6(e.posted,"modulePassScore",o);if(!f.ok)return y(h,f.errorMessage);let w=NJ(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(w===null)return y(h,"Choose a judge and an improver.");let W=Ho(h);if(!W.ok)return y(h,W.errorMessage);let _=DJ(e.installedIds,c,w.judge);if(_===null)return y(h,"Choose a runner for wizard step 4.");let M=M6({maxTrials:e.posted.get("maxTrials"),maxSpendUsd:e.posted.get("maxSpendUsd"),earlyStop:e.posted.has("earlyStop")?"on":"off",earlyStopFlatRounds:e.posted.get("earlyStopFlatRounds")});return M.ok?{kind:"start",goal:e.goal,prompt:e.prompt,judge:w.judge,improver:w.improver,workingDirectory:W.path,passScore:I.passScore,modulePassScore:f.passScore,maxRounds:5,sourceSkillFile:e.posted.get("skillFile")?.trim()??e.posted.get("orchestratorSkillFile")?.trim()??"",judgeInstructions:s,improverInstructions:i,runner:_,runnerInstructions:a,costControls:N6(M.knobs)}:y(h,M.errorMessage)}});var ql,BA,iye,jx,$6,UA,z6,aye,U6,Mx,lye,cye,dye,Nx,B6,G6,K6=l(()=>{"use strict";ql=u(require("node:fs")),BA=u(require("node:path"));qe();bt();iye=["remember","choose-folder","run"],jx=()=>({folder:bi,judge:"",improver:"",runner:""}),$6=e=>BA.default.join(BA.default.dirname(e),"prompt-optimizer-preferences.json"),UA=e=>typeof e=="string"?e:"",z6=e=>{let t=$6(e);if(!ql.default.existsSync(t))return jx();try{let r=JSON.parse(ql.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return jx();let o=r,n=UA(o.folder).trim();return{folder:n.length===0?bi:n,judge:UA(o.judge),improver:UA(o.improver),runner:UA(o.runner)}}catch{return jx()}},aye=(e,t)=>{let r=$6(e);ql.default.mkdirSync(BA.default.dirname(e),{recursive:!0});let o=`${r}.tmp`;ql.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`),ql.default.renameSync(o,r)},U6=(e,t)=>e===F||_i(t).some(r=>r===e),Mx=(e,t,r)=>e===null?t:e.length===0?"":U6(e,r)?e:t,lye=(e,t)=>{if(e===null)return t;let r=Ho(e);return r.ok?r.display:t},cye=e=>{let t=z6(e.storePath),r={folder:lye(e.folder,t.folder),judge:Mx(e.judge,t.judge,e.installedIds),improver:Mx(e.improver,t.improver,e.installedIds),runner:Mx(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||aye(e.storePath,r)},dye=e=>{let t=Ho(e);return t.ok?t.display:bi},Nx=(e,t)=>U6(e,t)?e:"",B6=e=>{let t=z6(e.storePath);return{selection:{...e.selection,judge:Nx(t.judge,e.installedIds)||e.selection.judge,improver:Nx(t.improver,e.installedIds)||e.selection.improver,runner:Nx(t.runner,e.installedIds)||e.selection.runner},defaultFolder:dye(t.folder)}},G6=e=>{let t=e.posted.get("intent")??"";if(!iye.includes(t))return;let r=e.posted.get("folder");cye({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var V6,pye,uye,Dx,mye,GA,KA=l(()=>{"use strict";V6=u(require("node:os"));qe();Ax();Ei();pye="Reply with the single word ok. Do not use tools.",uye=45e3,Dx=async(e,t)=>{if(t===F)return{ok:!0,message:"You will do this step."};let r=b8(e,t);if(r!==null)return{ok:!0,message:r};let o=await It({writerAgent:t,prompt:pye,workingDirectory:V6.default.tmpdir(),timeoutMs:uye});if(!o.ok)return{ok:!1,message:o.errorMessage};let n=`${Ee(t)} is ready.`;return k8(e,t,n),{ok:!0,message:n}},mye=e=>[...new Set(e.filter(t=>t.length>0))],GA=async(e,t,r,o)=>{for(let n of mye([t,r,o??""])){let s=await Dx(e,n);if(!s.ok)return s.message}return null}});var Hx,q6=l(()=>{"use strict";j();Hx=(e,t)=>{for(let r of e)if(r.wizard!==void 0&&!N(r.status)&&!(t!==null&&r.id===t))return r;return null}});var J6,Y6=l(()=>{"use strict";_t();j();Fu();nm();vx();Ox();Lx();Kt();bt();K6();HA();KA();q6();vA();vi();J6=async e=>{let t=e.posted===null?B6({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=zA({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>In("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(G6({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?Gt(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let o=r.kind==="start"?await GA(e.route.storePath,r.judge,r.improver,r.runner):null;if(r.kind==="start"&&o!==null){await cm(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:Gt(r.workingDirectory),passScore:String(r.passScore),modulePassScore:String(r.modulePassScore),maxRounds:String(r.maxRounds),maxTrials:String(r.costControls.maxTrials),maxSpendUsd:r.costControls.maxSpendUsd===null?"":String(r.costControls.maxSpendUsd),earlyStop:r.costControls.earlyStop,canRun:!0,errorMessage:o,skillNotice:e.skillNotice,cycle:null,history:so(e.route.storePath),resumableWizardCycle:Hx(so(e.route.storePath),null)});return}if(r.kind==="start"){let s=r6(r.workingDirectory,r.sourceSkillFile),i=dA(Wl({existing:r.costControls,maxRounds:r.maxRounds,writerId:r.judge==="manual"?null:r.judge})),a=$A({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,costControls:i,wizard:rv({...Su(r.prompt),modulePassScore:r.modulePassScore,runnerInstructions:r.runnerInstructions},s===null?null:{fileName:s.fileName,name:s.name,description:s.description}),runnerModel:r.runner,...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if(X(e.route.storePath,a),Je(e.route.storePath,a.id),e.posted!==null&&e.posted.get("liveFragment")==="1"){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":a.id}),e.route.response.end(Un(e.route.storePath,a));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(a.id)}`}),e.route.response.end();return}let n=e.cycleId===null?null:me(e.route.storePath,e.cycleId);n!==null&&(n=Ii(e.route.storePath,n),Je(e.route.storePath,n.id)),await cm(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,modulePassScore:r.modulePassScore,maxRounds:r.maxRounds,maxTrials:r.maxTrials,maxSpendUsd:r.maxSpendUsd,earlyStop:r.earlyStop,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:n,history:so(e.route.storePath),resumableWizardCycle:Hx(so(e.route.storePath),n?.id??null)})}});var X6,Z6=l(()=>{"use strict";Kt();X6=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";y4(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var Q6,e3=l(()=>{"use strict";Q6=(e,t)=>{if(e?.includes("application/x-www-form-urlencoded"))return new URLSearchParams(t);if(e?.includes("multipart/form-data")){let r=/boundary=([^;\s]+)/i.exec(e);if(r===null)return new URLSearchParams;let o=r[1].replace(/^"|"$/g,""),n=new URLSearchParams,s=t.split(`--${o}`);for(let i of s){if(!i.includes("Content-Disposition"))continue;let a=/name="([^"]+)"/.exec(i);if(a===null)continue;let c=i.indexOf(`\r
\r
`);if(c<0)continue;let d=i.slice(c+4);d=d.replace(/\r\n--\s*$/u,"").replace(/\r\n$/u,""),n.append(a[1],d)}return n}return new URLSearchParams(t)}});var t3,r3=l(()=>{"use strict";k4();W8();C6();Y6();Z6();dm();e3();vi();t3=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await MA(),o=Vl(r),n=e.method==="POST"?Q6(e.request.headers["content-type"],await e.readBody(e.request)):null;if(x8({posted:n,storePath:e.storePath,response:e.response})||await T6(e,n,o))return;let s=x6(t.searchParams.get("example")),i=X6({posted:n,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let a=b4({posted:n,storePath:e.storePath});if(a.kind==="redirect"){e.response.writeHead(303,{Location:a.location}),e.response.end();return}await J6({route:e,posted:n,installedIds:r,selection:o,goal:n?.get("goal")??s.goal,prompt:n?.get("prompt")??s.prompt,skillNotice:_4(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var gye,o3,n3=l(()=>{"use strict";j();Kt();gye=e=>e.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replaceAll(/^-+|-+$/g,"").slice(0,48)||"wizard-result",o3=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("export")!=="wizard-markdown")return!1;let r=t.searchParams.get("cycle");if(r===null||r.trim().length===0)return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Missing cycle id."),!0;let o=me(e.storePath,r);if(o===null)return e.response.writeHead(404,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Run not found."),!0;if(o.wizard===void 0||!N(o.status))return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Wizard is not finished yet."),!0;let n=ov({goal:o.goal,cycleStatus:o.status,wizard:o.wizard}),s=`prompt-optimizer-wizard-${gye(o.goal)}.md`;return e.response.writeHead(200,{"content-type":"text/markdown; charset=utf-8","content-disposition":`attachment; filename="${s}"`}),e.response.end(n),!0}});var s3,i3=l(()=>{"use strict";nm();Kt();s3=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),o=r===null?null:me(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(o===null?"":Un(e.storePath,o)),!0}});var fye,a3,l3=l(()=>{"use strict";qe();KA();fye=["claude-cli","codex","cursor","antigravity"],a3=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let o=t===F||fye.includes(t)?await Dx(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(o)),!0}});var c3,d3=l(()=>{"use strict";j();c3=e=>{let t=e?.socket?.localPort;return typeof t=="number"&&Number.isInteger(t)&&t>0?`http://127.0.0.1:${t}${LP}`:void 0}});var p3,u3=l(()=>{"use strict";j();p3=(e,t=zL)=>{let r=e.length===1?e[0].id:null;return{ok:!0,url:t,page:yu,context:Cl,installedWriters:e,post:{method:"POST",url:t,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this computer",judge:r??"installed writer id",improver:r??"installed writer id",passScore:70,maxRounds:5}},poll:`GET ${t}?cycle=<cycleId> until done is true.`,writers:r===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${r} is installed. Omit judge and improver and both roles use it.`}}});var VA,m3=l(()=>{"use strict";j();px();Dl();VA=e=>{let t=e.revisions[e.revisions.length-1]??null,r=ve(e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score??null,reasons:i.judgement?.reasons??null}))),o=N(e.status),n=e.errorKind??null,s=IA({status:e.status,errorKind:n});return{ok:!0,cycleId:e.id,status:e.status,outcome:s,done:o,useThisPrompt:e.status==="passed",totalTokens:Fo(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,errorKind:n,costControls:e.costControls?{maxTrials:e.costControls.maxTrials,maxSpendUsd:e.costControls.maxSpendUsd,earlyStop:e.costControls.earlyStop,earlyStopFlatRounds:e.costControls.earlyStopFlatRounds,targetTokenBudget:e.costControls.targetTokenBudget,proposedTokenBudget:e.costControls.targetTokenBudget,estimatedSpendUsd:e.costControls.estimatedSpendUsd,rateUsdPer1kTokens:e.costControls.rateUsdPer1kTokens,proposalStub:e.costControls.proposalStub,confirmedTokenBudget:e.costControls.confirmedTokenBudget,confirmedMaxSpendUsd:e.costControls.confirmedMaxSpendUsd,budgetConfirmed:e.costControls.budgetConfirmed,confirmationRequired:!e.costControls.budgetConfirmed,softWarnFired:e.costControls.softWarnFired,softWarnMessage:e.costControls.softWarnMessage,budgetExceeded:e.costControls.budgetExceeded}:null,context:Cl,page:`${yu}?cycle=${encodeURIComponent(e.id)}`}}});var re,yye,g3,f3,y3=l(()=>{"use strict";re=u(da());j();yye=(0,re.isType)({goal:re.isString,prompt:re.isString,workingDirectory:re.isString,judge:(0,re.isUndefinedOr)(re.isString),improver:(0,re.isUndefinedOr)(re.isString),passScore:(0,re.isUndefinedOr)(re.isNumber),maxRounds:(0,re.isUndefinedOr)(re.isNumber),maxTrials:(0,re.isUndefinedOr)(re.isNumber),maxSpendUsd:(0,re.isUndefinedOr)(re.isNumber),earlyStop:(0,re.isUndefinedOr)(re.isBoolean),earlyStopFlatRounds:(0,re.isUndefinedOr)(re.isNumber),confirmedTokenBudget:(0,re.isUndefinedOr)(re.isNumber),confirmedMaxSpendUsd:(0,re.isUndefinedOr)(re.isNumber),rateUsdPer1kTokens:(0,re.isUndefinedOr)(re.isNumber)}),g3=e=>{let t=e?.trim()??"";return t.length===0?null:t},f3=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return yye(t)?t.workingDirectory.trim().length===0?{ok:!1,error:vP}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:g3(t.judge),improver:g3(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds),maxTrials:t.maxTrials??null,maxSpendUsd:t.maxSpendUsd??null,earlyStop:t.earlyStop??null,earlyStopFlatRounds:t.earlyStopFlatRounds??null,confirmedTokenBudget:t.confirmedTokenBudget??null,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??null}}:{ok:!1,error:vP}}});var Go,hye,h3,S3,P3=l(()=>{"use strict";j();Go=u(da()),hye=(0,Go.isType)({intent:e=>e==="confirm_budget",confirmedTokenBudget:Go.isNumber,confirmedMaxSpendUsd:(0,Go.isUndefinedOr)(Go.isNumber),rateUsdPer1kTokens:(0,Go.isUndefinedOr)(Go.isNumber)}),h3=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}return typeof t!="object"||t===null||!("intent"in t)||t.intent!=="confirm_budget"?{kind:"other"}:hye(t)?{kind:"confirm",body:t}:{kind:"invalid",error:"confirm_budget requires confirmedTokenBudget (number) and optional confirmedMaxSpendUsd."}},S3=(e,t)=>{let r=oo({existing:e.costControls,confirmedTokenBudget:t.confirmedTokenBudget,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.costControls?.rateUsdPer1kTokens});return r.ok?{ok:!0,cycle:{...e,costControls:r.costControls,errorMessage:null,updatedAt:new Date().toISOString()}}:{ok:!1,error:r.errorMessage}}});var Sye,A3,_3=l(()=>{"use strict";j();qe();Ox();dm();Sye=e=>e.map(t=>t.id).join(", "),A3=e=>{let t=Vl(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,o=e.body.judge??r,n=e.body.improver??r;if(o===F||n===F)return{ok:!1,error:UL,installedWriters:t.writers};if(o===null||n===null){let a=Sye(t.writers);return{ok:!1,error:a.length===0?"No reasoning writer is installed on this computer.":`Set judge and improver to installed writer ids: ${a}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,judge:o,improver:n,runner:o});e.body.maxTrials!=null&&s.set("maxTrials",String(e.body.maxTrials)),e.body.maxSpendUsd!=null&&s.set("maxSpendUsd",String(e.body.maxSpendUsd)),e.body.earlyStop!==!1&&s.set("earlyStop","on"),e.body.earlyStopFlatRounds!=null&&s.set("earlyStopFlatRounds",String(e.body.earlyStopFlatRounds));let i=zA({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,runner:i.runner,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,costControls:i.costControls}}});var Pye,b3,k3=l(()=>{"use strict";j();vx();u3();m3();dm();y3();P3();_3();Kt();Pye=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}if(typeof t!="object"||t===null||!("intent"in t)||t.intent!=="estimate_budget")return{kind:"other"};let r=t,o=s=>typeof s=="number"&&Number.isFinite(s)?s:void 0,n=s=>typeof s=="string"&&s.trim().length>0?s.trim():void 0;return{kind:"estimate",maxTrials:o(r.maxTrials),maxRounds:o(r.maxRounds),writerId:n(r.writerId)??n(r.judge),rateUsdPer1kTokens:o(r.rateUsdPer1kTokens),previewModuleCount:o(r.previewModuleCount)}},b3=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let p=me(e.storePath,t);return p===null?{status:404,body:{ok:!1,error:"That run is not on this computer."}}:{status:200,body:VA(p)}}let r=await e.handlers.readInstalledIds(),o=Vl(r);if(e.method==="GET")return{status:200,body:p3(o.writers,e.agentUrl)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};if(t!==null){let p=h3(e.rawBody);if(p.kind==="other")return{status:400,body:{ok:!1,error:"POST ?cycle= expects intent confirm_budget with confirmedTokenBudget."}};if(p.kind==="invalid")return{status:400,body:{ok:!1,error:p.error}};let m=me(e.storePath,t);if(m===null)return{status:404,body:{ok:!1,error:"That run is not on this computer."}};let g=S3(m,p.body);return g.ok?(X(e.storePath,g.cycle),{status:200,body:VA(g.cycle)}):{status:400,body:{ok:!1,error:g.error}}}let n=Pye(e.rawBody);if(n.kind==="invalid")return{status:400,body:{ok:!1,error:n.error}};if(n.kind==="estimate"){let p=Si({maxRounds:n.maxRounds,maxTrials:n.maxTrials,writerId:n.writerId,rateUsdPer1kTokens:n.rateUsdPer1kTokens,previewModuleCount:n.previewModuleCount});return{status:200,body:{ok:!0,intent:"estimate_budget",targetTokenBudget:p.targetTokenBudget,proposedTokenBudget:p.targetTokenBudget,estimatedSpendUsd:p.estimatedSpendUsd,rateUsdPer1kTokens:p.rateUsdPer1kTokens??null,proposalStub:p.stub===!0,confirmationRequired:!0}}}let s=f3(e.rawBody);if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:o.writers}};let i=A3({body:s.body,installedIds:r});if(!i.ok)return{status:400,body:{ok:!1,error:i.error,installedWriters:i.installedWriters}};let a=await e.handlers.readWritersReady(e.storePath,i.judge,i.improver,i.runner);if(a!==null)return{status:400,body:{ok:!1,error:a,installedWriters:o.writers}};let c=Wl({existing:{...i.costControls,...s.body.rateUsdPer1kTokens==null?{}:{rateUsdPer1kTokens:s.body.rateUsdPer1kTokens}},maxRounds:i.maxRounds,writerId:i.judge==="manual"?null:i.judge});if(s.body.rateUsdPer1kTokens!=null&&c.targetTokenBudget!==null&&(c={...c,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens,estimatedSpendUsd:Tt({tokens:c.targetTokenBudget,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens})}),s.body.confirmedTokenBudget!=null){let p=oo({existing:c,confirmedTokenBudget:s.body.confirmedTokenBudget,confirmedMaxSpendUsd:s.body.confirmedMaxSpendUsd,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens??c.rateUsdPer1kTokens});if(!p.ok)return{status:400,body:{ok:!1,error:p.errorMessage}};c=p.costControls}let d=$A({goal:i.goal,sourcePrompt:i.prompt,judgeModel:i.judge,improverModel:i.improver,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,wizard:Su(i.prompt),runnerModel:i.runner,costControls:c});return X(e.storePath,d),e.handlers.startCycle(e.storePath,d.id),{status:200,body:VA(d)}}});var R3,w3=l(()=>{"use strict";vi();KA();d3();k3();R3=async e=>{let t=await b3({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,agentUrl:c3(e.request),handlers:{readInstalledIds:MA,readWritersReady:GA,startCycle:Je}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var T3,Aye,_ye,E3,bye,C3,I3=l(()=>{"use strict";T3=e=>e.toLowerCase().match(/[a-z0-9][a-z0-9_-]*/g)??[],Aye=e=>{let t={};for(let n of e)t[n]=(t[n]??0)+1;let r=Math.max(...Object.values(t),1),o={};for(let[n,s]of Object.entries(t))o[n]=s/r;return o},_ye=e=>{let t={};for(let n of e)for(let s of new Set(T3(n)))t[s]=(t[s]??0)+1;let r=Math.max(e.length,1),o={};for(let[n,s]of Object.entries(t))o[n]=Math.log((r+1)/(s+1))+1;return o},E3=(e,t)=>{let r=Aye(T3(e)),o={};for(let[n,s]of Object.entries(r))o[n]=s*(t[n]??1);return o},bye=(e,t)=>{let r=Object.entries(e),o=r.reduce((i,[a,c])=>i+c*(t[a]??0),0),n=Math.sqrt(r.reduce((i,[,a])=>i+a*a,0)),s=Math.sqrt(Object.values(t).reduce((i,a)=>i+a*a,0));return n===0||s===0?0:o/(n*s)},C3=(e,t,r)=>{let o=t.trim();if(o.length===0||e.length===0||r<=0)return[];let n=_ye(e.map(i=>i.text)),s=E3(o,n);return e.map(i=>({id:i.id,score:bye(s,E3(i.text,n))})).filter(i=>i.score>0).toSorted((i,a)=>a.score-i.score).slice(0,r)}});var Fx,kye,Rye,L3,wye,Eye,Tye,Cye,$x,zx=l(()=>{"use strict";Fx=u(require("node:path"));bt();I3();HA();kye=5,Rye=20,L3=280,wye=e=>[e.name,e.description,e.promptText].join(`
`),Eye=e=>{let t=e.promptText.trim();return t.length===0?e.description.trim():t.length<=L3?t:`${t.slice(0,L3-3)}...`},Tye=e=>e.length===0?"No matching folder skills under .cursor/skills for that workingDirectory.":e.map((t,r)=>`### ${r+1}. ${t.name} (${t.skillId})
Score: ${t.score.toFixed(3)}
Path: ${t.sourcePath}
`+(t.description.length>0?`Description: ${t.description}
`:"")+`
${t.excerpt}`).join(`

---

`),Cye=e=>e===void 0||!Number.isFinite(e)?kye:Math.min(Rye,Math.max(1,Math.floor(e))),$x=e=>{let t=e.query.trim(),r=Cye(e.limit),o=Ho(e.workingDirectory);if(!o.ok)return{query:t,hits:[],context:o.errorMessage};let n=sm(o.path),s=C3(n.map(d=>({id:d.fileName,text:wye(d)})),t,r),i=new Map(n.map(d=>[d.fileName,d])),a=Fx.default.resolve(o.path,".cursor","skills"),c=s.flatMap(d=>{let p=i.get(d.id);return p===void 0?[]:[{skillId:p.fileName,name:p.name,description:p.description,score:d.score,sourcePath:Fx.default.join(a,p.fileName,"SKILL.md"),excerpt:Eye(p),source:"filesystem"}]});return{query:t,hits:c,context:Tye(c)}}});var v3,x3=l(()=>{"use strict";zx();v3=e=>{if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use POST."}};let t;try{t=JSON.parse(e.rawBody.length===0?"{}":e.rawBody)}catch{return{status:400,body:{ok:!1,error:"Body must be JSON."}}}if(t===null||typeof t!="object"||Array.isArray(t))return{status:400,body:{ok:!1,error:"Body must be a JSON object."}};let r=t,o=typeof r.workingDirectory=="string"?r.workingDirectory.trim():"",n=typeof r.query=="string"?r.query:"",s=typeof r.limit=="number"?r.limit:typeof r.limit=="string"&&r.limit.trim().length>0?Number(r.limit):void 0;return o.length===0?{status:400,body:{ok:!1,error:"workingDirectory is required (folder with .cursor/skills)."}}:typeof n!="string"||n.trim().length===0?{status:400,body:{ok:!1,error:"query is required."}}:{status:200,body:$x({workingDirectory:o,query:n,limit:Number.isFinite(s)?s:void 0})}}});var W3,O3=l(()=>{"use strict";x3();W3=async e=>{let t=v3({method:e.method,rawBody:e.method==="POST"?await e.readBody(e.request):""});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var Iye,Ux,j3=l(()=>{"use strict";Fv();r3();n3();i3();l3();w3();O3();Iye=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},Ux=async e=>{let t=Iye(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"&&e.pathname!=="/prompt-optimizer/skills/query"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await R3(e),!0):e.pathname==="/prompt-optimizer/skills/query"?(await W3(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:Hv()})),!0):(await a3({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||o3({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||s3({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await t3(e),!0)}});var Bx,Lye,vye,pm,qA=l(()=>{"use strict";Bx=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Lye=e=>!Bx(e)||typeof e.ruleId!="string"||typeof e.title!="string"||typeof e.source!="string"||typeof e.active!="boolean"||typeof e.hitCount!="number"||!Number.isFinite(e.hitCount)||e.lastHitAt!==null&&typeof e.lastHitAt!="string"?null:{ruleId:e.ruleId,title:e.title,source:e.source,active:e.active,hitCount:e.hitCount,lastHitAt:e.lastHitAt},vye=e=>!Bx(e)||typeof e.ruleIdA!="string"||typeof e.ruleIdB!="string"||e.reason!=="duplicate"&&e.reason!=="overlap"||typeof e.score!="number"||!Number.isFinite(e.score)?null:{ruleIdA:e.ruleIdA,ruleIdB:e.ruleIdB,reason:e.reason,score:e.score},pm=e=>{if(!Bx(e)||e.ok!==!0||typeof e.projectId!="string"||e.windowDays!==null||!Array.isArray(e.rules)||!Array.isArray(e.overlaps))return null;let t=[];for(let o of e.rules){let n=Lye(o);if(n===null)return null;t.push(n)}let r=[];for(let o of e.overlaps){let n=vye(o);if(n===null)return null;r.push(n)}return{ok:!0,projectId:e.projectId,windowDays:null,rules:t,overlaps:r}}});var xye,Wye,Gx,Kx=l(()=>{"use strict";qA();xye=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Wye=e=>pm({ok:!0,projectId:"x",windowDays:null,rules:[e],overlaps:[]})?.rules[0]??null,Gx=e=>{if(!xye(e)||e.ok!==!0||typeof e.projectId!="string"||typeof e.changed!="boolean")return null;let t=Wye(e.rule);return t===null?null:{ok:!0,projectId:e.projectId,rule:t,changed:e.changed}}});var Oye,M3,Vx,N3=l(()=>{"use strict";qA();Oye=1e4,M3=(e,t,r=30)=>{let o=new URL(`${e.replace(/\/$/,"")}/api/agent-witch/projects/${encodeURIComponent(t)}/rules/usage`);return o.searchParams.set("days",String(r)),o.toString()},Vx=async e=>{let t=e.pairingToken.trim();if(t.length===0)return{ok:!1,reason:"not_connected"};let r=e.fetchImpl??fetch;try{let o=await r(M3(e.appOrigin,e.projectId,e.days??30),{method:"GET",headers:{[e.pairingHeaderName]:t},signal:AbortSignal.timeout(Oye)});if(o.status===401)return{ok:!1,reason:"unauthorized"};if(o.status===403)return{ok:!1,reason:"forbidden"};if(!o.ok)return{ok:!1,reason:"unavailable"};let n=pm(await o.json());return n===null?{ok:!1,reason:"unavailable"}:{ok:!0,data:n}}catch{return{ok:!1,reason:"unavailable"}}}});var jye,D3,qx,H3=l(()=>{"use strict";Kx();jye=15e3,D3=(e,t,r,o)=>`${e.replace(/\/$/,"")}/api/agent-witch/projects/${encodeURIComponent(t)}/rules/${encodeURIComponent(r)}/${o}`,qx=async e=>{let t=e.pairingToken.trim();if(t.length===0)return{ok:!1,reason:"unauthorized"};let r=e.fetchImpl??fetch;try{let o=await r(D3(e.appOrigin,e.projectId,e.ruleId,e.action),{method:"POST",headers:{[e.pairingHeaderName]:t},signal:AbortSignal.timeout(jye)});if(o.status===401)return{ok:!1,reason:"unauthorized"};if(o.status===403)return{ok:!1,reason:"forbidden"};if(o.status===404)return{ok:!1,reason:"not_found"};if(o.status===409)return{ok:!1,reason:"limit_exceeded"};if(!o.ok)return{ok:!1,reason:"unavailable"};let n=Gx(await o.json());return n===null?{ok:!1,reason:"unavailable"}:{ok:!0,data:n}}catch{return{ok:!1,reason:"unavailable"}}}});var G,Ko=l(()=>{"use strict";ht();G={heading:"Compare rules",intro:"See which rules kick in for a prompt and what they add to each request.",groupLabel:"Sample prompts",lead:"Try a sample:",customLabel:"Or write your own prompt",customHint:"Use a prompt that has nothing to do with this project. Any rule that still kicks in is probably in the wrong place.",button:"Compare",emptyPrompt:"Pick a sample prompt or write your own.",noRules:"No rules kick in for this prompt.",oneRule:"1 rule kicks in for this prompt:",nRules:e=>`${e} rules kick in for this prompt:`,tokenLine:(e,t)=>`Prompt alone: ${e} tokens. Rules add ${t} tokens.`,costLine:e=>`About ${e} more per request.`,rulesUnavailable:"Rules for this project aren't available right now.",ruleUseHeading:"Rule use",ruleUseIntro:"Rules marked below may be safe to drop. You decide. Nothing is removed for you.",usedOnce:"Used 1 time",usedN:e=>`Used ${e} times`,neverUsed:"Never used",notUsedInDays:e=>`Not used in ${e} days`,sameAs:e=>`Same as ${e}`,overlapsWith:e=>`Overlaps with ${e}`,emptyRules:"No rules to check yet.",usageError:"Couldn't load rule usage. Try again.",tryAgain:"Try again",connectComputer:"Connect this computer to AgentWitch to see rule use.",ownerOnlyUsage:"Only the project owner can see rule use.",drop:"Drop",restore:"Restore",undo:"Undo",dropped:e=>`Dropped "${e}".`,ownerOnlyDrop:"Only the project owner can drop rules.",dropFailed:"Couldn't drop the rule. Try again.",restoreFailed:"Couldn't restore the rule. Try again.",limitReached:`Limit reached: ${64} active pitfalls. Retire one to add another.`}});var Mye,Nye,Jx,Yx,Xx=l(()=>{"use strict";Ko();Mye=1440*60*1e3,Nye=(e,t)=>{let r=Date.parse(e);return Number.isFinite(r)?Math.max(0,Math.floor((t-r)/Mye)):null},Jx=e=>{let t=e.nowMs??Date.now(),r=e.staleAfterDays??30,o=[];if(e.rule.hitCount===0)o.push({kind:"never_used"});else if(e.rule.lastHitAt!==null){let n=Nye(e.rule.lastHitAt,t);n!==null&&n>r&&o.push({kind:"stale",days:n})}for(let n of e.overlaps){let s=n.ruleIdA===e.rule.ruleId?n.ruleIdB:n.ruleIdB===e.rule.ruleId?n.ruleIdA:null;if(s===null)continue;let a=e.rulesById.get(s)?.title??s;n.reason==="duplicate"?o.push({kind:"same_as",ruleTitle:a}):o.push({kind:"overlaps",ruleTitle:a})}return o},Yx=e=>{switch(e.kind){case"never_used":return G.neverUsed;case"stale":return G.notUsedInDays(e.days);case"same_as":return G.sameAs(e.ruleTitle);case"overlaps":return G.overlapsWith(e.ruleTitle);default:return e}}});var F3=l(()=>{"use strict";j();j();j();j();j()});var Zx,Qx=l(()=>{"use strict";ht();vp();F3();Zx=e=>{let t=hr(e.prompt),r=Lp(e.matched.map(s=>({id:s.id,avoidance:s.avoidance}))),o=e.matched.length===0?0:hr(r),n=nr(null);return{promptTokens:t,rulesTokens:o,addedCostUsd:o/1e3*n}}});var JA=l(()=>{"use strict";j3();zx();Ei();qA();Kx();N3();H3();Xx();Qx();Ko()});var Dye,Hye,eW,Fye,$3,tW=l(()=>{"use strict";ne();St();Pl();Dye="/api/local/coding-tools/pause",Hye=/^(?:127\.0\.0\.1|localhost):\d{1,5}$/,eW=(e,t)=>e===void 0||e===ia||e===Fc||t!==void 0&&Hye.test(t)&&e===`http://${t}`,Fye=e=>{try{let r=JSON.parse(e)?.paused;return typeof r=="boolean"?r:null}catch{return null}},$3=async e=>{if(e.pathname!==Dye)return!1;let t=(i,a,c)=>e.sendJson(e.response,i,{ok:!0,paused:a,updatedAt:c,label:Ws.pauseLabel,hint:Ws.pauseHint});if(e.method==="GET"){let i=Ds(e.configPath);return t(200,i.paused,i.updatedAt),!0}if(e.method!=="POST")return e.sendJson(e.response,405,{ok:!1,error:"method_not_allowed"}),!0;let r=e.request.headers.origin,o=e.request.headers.host;if(!eW(typeof r=="string"?r:void 0,typeof o=="string"?o:void 0))return e.sendJson(e.response,403,{ok:!1,error:"forbidden_origin"}),!0;let n=Fye(await e.readBody(e.request));if(n===null)return e.sendJson(e.response,400,{ok:!1,error:"invalid_body"}),!0;let s=Dw(e.configPath,n);return t(200,s.paused,s.updatedAt),!0}});var $ye,zye,z3,U3=l(()=>{"use strict";_t();tW();$ye="/api/local/projects/folder",zye=e=>{try{let t=JSON.parse(e);return typeof t?.projectId!="string"||typeof t.folderPath!="string"?null:{projectId:t.projectId,folderPath:t.folderPath,allowOutsideHome:t.allowOutsideHome===!0}}catch{return null}},z3=async e=>{if(e.pathname!==$ye)return!1;if(e.method==="GET")return e.sendJson(e.response,200,{ok:!0,...jo(e.profileDir)}),!0;if(e.method!=="POST")return e.sendJson(e.response,405,{ok:!1,error:"method_not_allowed"}),!0;let t=e.request.headers.origin,r=e.request.headers.host;if(!eW(typeof t=="string"?t:void 0,typeof r=="string"?r:void 0))return e.sendJson(e.response,403,{ok:!1,error:"forbidden_origin"}),!0;let o=zye(await e.readBody(e.request));if(o===null)return e.sendJson(e.response,400,{ok:!1,error:"invalid_body",message:"Send projectId and folderPath."}),!0;let s=await(e.link??Mo)({...o,profileDir:e.profileDir,cloudConfig:e.readCloudConfig()});return s.ok?(e.sendJson(e.response,200,s),!0):(e.sendJson(e.response,s.httpStatus,{ok:!1,error:s.code,message:s.message}),!0)}});var rW,oW,nW=l(()=>{"use strict";rW="2025-03-26",oW={name:"agent-witch",version:"1.0.0"}});var Jl,YA,B3,Uye,um,G3=l(()=>{"use strict";nW();Jl=(e,t,r)=>({jsonrpc:"2.0",id:e??null,error:{code:t,message:r}}),YA=(e,t)=>({jsonrpc:"2.0",id:e??null,result:t}),B3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)?e:null,Uye=async(e,t,r,o)=>{let n=t?.name;if(typeof n!="string")return Jl(e,-32602,"tool name is required");let s=r.tools.find(i=>i.definition.name===n);if(s===void 0)return Jl(e,-32602,`Unknown tool: ${n}`);try{let i=await s.call(t?.arguments??{},o);return YA(e,i)}catch(i){try{r.onToolError?.(n,i)}catch{}return Jl(e,-32603,`Tool ${n} failed`)}},um=async(e,t,r)=>{let o=B3(e);if(o===null)return Jl(null,-32700,"Parse error");let n=o.id??null,s=o.method;return typeof s!="string"?Jl(n,-32600,"Invalid Request"):s==="initialize"?YA(n,{protocolVersion:rW,capabilities:{tools:{listChanged:!1}},serverInfo:t.serverInfo}):s==="ping"||s==="notifications/initialized"?YA(n,{}):s==="tools/list"?YA(n,{tools:t.tools.map(i=>i.definition)}):s==="tools/call"?Uye(n,B3(o.params),t,r):Jl(n,-32601,"Method not found")}});var sW,K3=l(()=>{"use strict";sW=(e,t)=>({content:[{type:"text",text:e}],...t===!0?{isError:!0}:{}})});var XA=l(()=>{"use strict";G3();K3();nW()});var Bye,Bn,ZA=l(()=>{"use strict";Qr();XA();Bye=(e,t)=>{let r=t instanceof Error?t.message:String(t);process.stderr.write(`[agent-witch] mcp tool ${e} failed: ${r}
`)},Bn=e=>{let t=xn({layout:e.layout,isDeclined:e.isDeclined});return{serverInfo:oW,tools:[{definition:gS,call:r=>sW(JSON.stringify(t(r)))}],onToolError:e.logToolError??Bye}}});var V3,Gye,Kye,q3,J3=l(()=>{"use strict";XA();ZA();V3=(e,t)=>{let r=JSON.stringify(t);e.write(`Content-Length: ${Buffer.byteLength(r,"utf8")}\r
\r
${r}`)},Gye=async(e,t)=>{let r=Buffer.alloc(0);for await(let o of e.stdin)for(r=Buffer.concat([r,Buffer.isBuffer(o)?o:Buffer.from(String(o),"utf8")]);;){let n=r.indexOf(`\r
\r
`);if(n<0)break;let s=r.subarray(0,n).toString("utf8"),i=/Content-Length:\s*(\d+)/i.exec(s);if(i===null){r=r.subarray(n+4);continue}let a=Number.parseInt(i[1]??"0",10),c=n+4+a;if(r.length<c)break;let d=r.subarray(n+4,c).toString("utf8");r=r.subarray(c);let p;try{p=JSON.parse(d)}catch{p=null}await t(p)}},Kye=async(e,t)=>{await Gye(t,async r=>{let o=typeof r=="object"&&r!==null?r:null,n=o?.method,s=await um(r,e,void 0);if(typeof n=="string"&&n.startsWith("notifications/")){o?.id!==void 0&&V3(t.stdout,s);return}V3(t.stdout,s)})},q3=async e=>{await Kye(Bn({layout:e.layout,isDeclined:e.isDeclined}),e.streams??{stdin:process.stdin,stdout:process.stdout})}});var Vye,QA,Y3=l(()=>{"use strict";XA();ZA();Vye="/mcp",QA=async e=>{if(e.pathname!==Vye)return!1;if(e.method!=="POST")return e.response.writeHead(405),e.response.end(),!0;let t=null;try{let o=await e.readBody(e.request);t=o.length>0?JSON.parse(o):{}}catch{t=null}let r=e.server??Bn({layout:e.layout,isDeclined:e.isDeclined});return e.sendJson(e.response,200,await um(t,r,void 0)),!0}});var X3={};Mt(X3,{createAwlMcpServer:()=>Bn,runAwlMcpStdio:()=>q3,tryHandleAwlMcpHttpRequest:()=>QA});var iW=l(()=>{"use strict";ZA();J3();Y3()});var xi,mm,qye,Jye,Yye,Xye,Z3,Q3=l(()=>{"use strict";xi=u(require("node:fs")),mm=u(require("node:path")),qye="prompt-optimizer-cycles.json",Jye="prompt-optimizer-preferences.json",Yye="prompt-sdlc-cycles.json",Xye="prompt-sdlc-preferences.json",Z3=e=>{let t=mm.default.join(e,qye),r=mm.default.join(e,Yye);if(xi.default.existsSync(t)||!xi.default.existsSync(r))return t;try{xi.default.renameSync(r,t)}catch{return r}let o=mm.default.join(e,Xye),n=mm.default.join(e,Jye);if(xi.default.existsSync(o)&&!xi.default.existsSync(n))try{xi.default.renameSync(o,n)}catch{}return t}});var Yl,Zye,aW,e7=l(()=>{"use strict";Yl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Zye=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],aW=e=>{let t=Zye.map(i=>`<option value="${Yl(i.value)}">${Yl(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this computer on the cloud dashboard before delegating.</div>',o=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${Yl(e.flashMessage)}</div>`:"",n=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${Yl(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${Yl(e.lastRunId)}</p>`:"";return`${o}${n}<section class="card">
      <p class="eyebrow">Delegate</p>
      <h1>Run a task on this computer</h1>
      <p class="lede">Dispatch work locally and report status to cloud when finished \u2014 no live terminal stream required.</p>
      ${r}
      <form class="task-form" method="POST" action="/task/dispatch">
        <label class="field">
          <span class="field-label">Writer</span>
          <select class="input" name="writerAgent" required>${t}</select>
        </label>
        <label class="field">
          <span class="field-label">Project folder (optional)</span>
          <input class="input mono" type="text" name="projectFolder" value="${Yl(e.defaultWorkspace)}" placeholder="/path/to/repo" />
        </label>
        <label class="field">
          <span class="field-label">Task</span>
          <textarea class="input textarea" name="prompt" rows="8" required placeholder="What should the writer do on this computer?"></textarea>
        </label>
        <div class="actions">
          <button class="btn btn-primary" type="submit" ${e.wsConnected?"":"disabled"}>Delegate task</button>
        </div>
      </form>
      ${s}
    </section>`}});var gm,o7,Qye,n7,ehe,the,s7,t_,t7,r7,rhe,ohe,Vo,fm,e_,nhe,r_,lW,she,cW,i7,dW,a7,ihe,ahe,lhe,l7,c7,d7,ym=l(()=>{"use strict";gm=u(require("node:fs")),o7=u(require("node:path")),Qye="estimate-history.ndjson",n7=100,ehe=500,the=2e4,s7=e=>o7.default.join(e,Qye),t_=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,ehe),t7=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,the),r7=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,rhe=e=>({...e,estimateTokens:r7(e.estimateTokens),actualTokens:r7(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),ohe=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},Vo=e=>{let t=s7(e);return gm.default.existsSync(t)?gm.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let o=r.trim();if(o.length===0)return[];try{let n=JSON.parse(o);return ohe(n)?[rhe(n)]:[]}catch{return[]}}):[]},fm=(e,t)=>{gm.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(o=>JSON.stringify(o)).join(`
`)}
`;gm.default.writeFileSync(s7(e),r,"utf8")},e_=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),nhe=e=>{let t=e.filter(o=>o.actualSeconds!==null&&o.estimateSeconds!==null&&o.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this computer. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(o=>`| ${e_(o.task)} | ${e_(o.writerLabel)} | ${o.estimateSeconds} | ${o.actualSeconds} |`)].join(`
`)},r_=e=>{let t=Vo(e.reportsDir),r=t_(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:o?.actualSeconds??null,estimateTokens:o?.estimateTokens??null,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);fm(e.reportsDir,[...s,n])},lW=e=>{let t=Vo(e.reportsDir),r=t.find(a=>a.id===e.agentRunId),o=new Date().toISOString(),n=e.task!==void 0?t_(e.task):"",s={id:e.agentRunId,task:n.length>0?n:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:o,embedding:r?.embedding??[]},i=t.filter(a=>a.id!==e.agentRunId);fm(e.reportsDir,[...i,s])},she=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-n7),cW=e=>[...Vo(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),i7=e=>{let t=Vo(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),o=t7(e.input),n=t7(e.output),s=t_(o),i=e.writerLabel?.trim()??"",a={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:o.length>0?o:r?.input??"",output:n.length>0?n:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);fm(e.reportsDir,[...c,a])},dW=(e,t)=>{let r=Vo(e).find(o=>o.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},a7=e=>({table:nhe(she(Vo(e))),embedding:null}),ihe=e=>{let t=new Map;for(let o of e){if(o.actualTokens===null)continue;let n=o.writerLabel.trim()||"Writer",s=t.get(n)??[];s.push(o.actualTokens),t.set(n,s)}let r=new Set;for(let[o,n]of t){let s=[...n].sort((c,d)=>c-d),i=s[s.length-1],a=s[s.length-2];s.length>=3&&i!==void 0&&a!==void 0&&i>a*1.5&&r.add(`${o}:${i}`)}return e.filter(o=>{let n=o.writerLabel.trim()||"Writer";return!r.has(`${n}:${o.actualTokens}`)})},ahe=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-n7),lhe=e=>{let t=ihe(ahe(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",a=r.get(i)??[];a.push(s.actualTokens),r.set(i,a)}let o=[...r.entries()].map(([s,i])=>{let a=Math.min(...i),c=Math.max(...i);return a===c?`${s} actuals are ${a}`:`${s} actuals are ${a}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",o.join(". ")+(o.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${e_(s.task)} | ${e_(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},l7=e=>{let t=Vo(e.reportsDir),r=t_(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:o?.writerLabel??"",estimateSeconds:o?.estimateSeconds??null,actualSeconds:o?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);fm(e.reportsDir,[...s,n])},c7=e=>{let t=Vo(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),o=new Date().toISOString(),n={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:r?.completedAt??o,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);fm(e.reportsDir,[...s,n])},d7=e=>lhe(Vo(e))});var p7=l(()=>{"use strict";ym()});var qo,pW,che,uW,dhe,phe,o_,n_,uhe,mW,u7=l(()=>{"use strict";p7();jv();qo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),pW=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let o=Math.floor(t/60),n=t%60;return n===0?`${o} hr`:`${o} hr ${n} min`},che=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${pW(-r)} under`:`${pW(r)} over`},uW=e=>e.toLocaleString("en-US"),dhe=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${uW(-r)} under`:`${uW(r)} over`},phe=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},o_=e=>e===null?"\u2014":pW(e),n_=e=>e===null?"\u2014":uW(e),uhe=`(function () {
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
})();`,mW=e=>{let r=cW(e.reportsDir).map((n,s)=>{let i=n.input.trim().length>0?n.input:n.task,a=n.output.trim().length>0?n.output:"\u2014",c=n.writerLabel.trim().length>0?n.writerLabel:"Writer",d=n.estimateSeconds===null||n.actualSeconds===null?"no estimate":che(n.estimateSeconds,n.actualSeconds),p=n.estimateTokens===null||n.actualTokens===null?"no estimate":dhe(n.estimateTokens,n.actualTokens),m=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${m}">
        <td><button type="button" class="history-open">${qo(phe(i))}</button></td>
        <td>${qo(c)}</td>
        <td>${o_(n.estimateSeconds)}</td>
        <td>${o_(n.actualSeconds)}</td>
        <td>${qo(d)}</td>
        <td>${n_(n.estimateTokens)}</td>
        <td>${n_(n.actualTokens)}</td>
        <td>${qo(p)}</td>
      </tr>`,template:`<template id="${m}">
        <p class="eyebrow">${qo(c)}</p>
        <h2>Input</h2>
        <pre>${qo(i)}</pre>
        <h2>Output</h2>
        <pre>${qo(a)}</pre>
        <p>Time: estimated ${o_(n.estimateSeconds)} \xB7 actual ${o_(n.actualSeconds)} \xB7 ${qo(d)}</p>
        <p>Tokens: estimated ${n_(n.estimateTokens)} \xB7 actual ${n_(n.actualTokens)} \xB7 ${qo(p)}</p>
      </template>`}});return`<section class="card">
      <p class="eyebrow">This computer</p>
      <h1>History</h1>
      <p class="lede">Every prompt on this computer. Select a row to read the input, output, and estimate.</p>
      ${r.length===0?'<p class="empty">No prompt history yet.</p>':`<div class="table-wrap history-table-wrap"><table id="history-table">
          <thead><tr><th>Prompt</th><th>Writer</th><th>Estimated</th><th>Actual</th><th>Comparison</th><th>Estimated tokens</th><th>Actual tokens</th><th>Token comparison</th></tr></thead>
          <tbody>${r.map(n=>n.row).join("")}</tbody>
        </table></div>
        ${r.map(n=>n.template).join("")}
        <dialog id="history-detail" class="history-dialog" aria-label="Prompt detail">
          <div class="history-dialog-bar">
            ${ZP({type:"button",id:"history-detail-close"})}
          </div>
          <div class="history-dialog-body" id="history-detail-body"></div>
        </dialog>
        <script>${uhe}</script>`}
    </section>`}});var m7=l(()=>{"use strict";e7();u7()});var Xl,mhe,ghe,gW,g7=l(()=>{"use strict";Xl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),mhe=(e,t,r)=>{let o=Xl(t),n=Xl(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${o}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${n}</pre>
</article>`},ghe=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${Xl(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((o,n)=>mhe(n,o.userPrompt,o.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${Xl(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${Xl(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${Xl(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},gW=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map(ghe).join(""):'<section class="card"><p class="muted">No writer sessions stored on this computer yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var f7=l(()=>{"use strict";g7()});var hm,y7,h7,fW,yW,hW,S7=l(()=>{"use strict";hm=u(require("node:fs")),y7=u(require("node:path"));tl();fP();h7=(e,t,r)=>kl({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,fW=(e,t,r)=>{let o=h7(e,t,r);if(o===null)return[];if(!hm.default.existsSync(o))return[];let n=hm.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},yW=e=>{let t=h7(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:wr(e.entry.prompt),output:wr(e.entry.output)};hm.default.mkdirSync(y7.default.dirname(t),{recursive:!0}),hm.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},hW=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((n,s)=>{let i=n.prompt.length>240?`${n.prompt.slice(0,240)}\u2026`:n.prompt,a=n.output.length>400?`${n.output.slice(0,400)}\u2026`:n.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var fhe,yhe,Sm,s_,SW=l(()=>{"use strict";fhe=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),yhe=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,Sm=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let o=[],n=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],a=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=fhe(i.assistantOutput),d=c.length>0?`Assistant: ${yhe(c,t)}`:null,p=[a,d].filter(m=>m!==null).join(`

`);if(p.length!==0){if(n+p.length>r&&o.length>0)break;o.unshift(p),n+=p.length}}return o.join(`

`)},s_=e=>{let t=e.userMessage.trim(),r=Sm({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this computer using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var po,Pm,_W,hhe,She,PW,Phe,bW,i_,P7,A7,Ahe,Zl,kW,AW,_7,_he,b7,Ql,a_,Am,bhe,_m,RW,l_,c_,k7=l(()=>{"use strict";po=u(require("node:fs")),Pm=u(require("node:path")),_W=require("node:crypto");SW();hhe="writer-sessions",She="active-index.json",PW=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Phe=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",bW=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},i_=e=>{let t=Pm.default.join(e.installDir,hhe);return po.default.mkdirSync(t,{recursive:!0}),t},P7=e=>Pm.default.join(i_(e),She),A7=(e,t)=>Pm.default.join(i_(e),`${t}.canonical.json`),Ahe=(e,t)=>Pm.default.join(i_(e),`${t}.continuation.json`),Zl=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,kW=e=>{let t=P7(e);if(!po.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(po.default.readFileSync(t,"utf8"));if(!PW(r)||!Array.isArray(r.entries))return{entries:[]};let o=[];for(let n of r.entries){if(!PW(n)||typeof n.sessionId!="string")continue;let s=typeof n.writerAgent=="string"?n.writerAgent:"";if(!Phe(s))continue;let i=typeof n.projectFolderPath=="string"?n.projectFolderPath:(n.projectFolderPath===null,null);o.push({writerAgent:s,projectFolderPath:i,sessionId:n.sessionId})}return{entries:o}}catch{return{entries:[]}}},AW=(e,t)=>{po.default.writeFileSync(P7(e),JSON.stringify(t,null,2))},_7=(e,t)=>{po.default.writeFileSync(A7(e,t.sessionId),JSON.stringify(t,null,2))},_he=(e,t)=>{po.default.writeFileSync(Ahe(e,t.sessionId),JSON.stringify(t,null,2))},b7=(e,t)=>{let r=Sm({turns:t.turns});_he(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},Ql=(e,t)=>{let r=A7(e,t);if(!po.default.existsSync(r))return null;try{let o=JSON.parse(po.default.readFileSync(r,"utf8"));return!PW(o)||typeof o.sessionId!="string"?null:o}catch{return null}},a_=(e,t=20)=>{let r=i_(e),o=po.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),n=[];for(let s of o){let i=s.name.replace(/\.canonical\.json$/,""),a=Ql(e,i);a!==null&&n.push(a)}return n.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},Am=(e,t,r)=>{let o=bW(r);return kW(e).entries.find(i=>Zl(i)===Zl({writerAgent:t,projectFolderPath:o}))?.sessionId??null},bhe=(e,t,r,o)=>{let n=kW(e),s=Zl({writerAgent:t,projectFolderPath:r}),i=[...n.entries.filter(a=>Zl(a)!==s),{writerAgent:t,projectFolderPath:r,sessionId:o}];AW(e,{entries:i})},_m=(e,t,r)=>{let o=(0,_W.randomUUID)(),n=new Date().toISOString(),s=bW(r),i={sessionId:o,writerAgent:t,projectFolderPath:s,turns:[],createdAt:n,updatedAt:n};return _7(e,i),b7(e,i),bhe(e,t,s,o),o},RW=(e,t,r)=>{let o=Am(e,t,r);return o!==null?o:_m(e,t,r)},l_=(e,t,r)=>{let o=bW(r),n=kW(e);if(o===null&&r===void 0){AW(e,{entries:n.entries.filter(i=>i.writerAgent!==t)});return}let s=Zl({writerAgent:t,projectFolderPath:o});AW(e,{entries:n.entries.filter(i=>Zl(i)!==s)})},c_=e=>{let t=RW(e.layout,e.writerAgent,e.projectFolderPath),r=Ql(e.layout,t);if(r===null)return;let o={id:(0,_W.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},n={...r,turns:[...r.turns,o],updatedAt:o.createdAt};_7(e.layout,n),b7(e.layout,n)}});var khe,Rhe,d_,wW,R7=l(()=>{"use strict";khe=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",Rhe=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},d_=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted?"continue":"first",wW=e=>{let t=d_(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",o=khe(r,e.userPromptCharacterCount),n=Rhe({contextBudget:o,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:o,...n}}});var p_=l(()=>{"use strict";S7();k7();SW();R7()});var w7=l(()=>{"use strict";nh();$a();sE()});var E7=l(()=>{"use strict";Lw()});var xt,Ehe,The,EW,TW,CW,T7=l(()=>{"use strict";w7();E7();xt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ehe=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},The=(e,t,r)=>{let o=e[t]?.apiKey;if(o!==void 0&&o.length>0){let n=tp(o);return`value="${xt(n)}" placeholder="Paste a new key to replace"`}return`placeholder="${xt(r)}"`},EW=(e,t,r,o,n)=>{let s=sh[t];return`<label class="field">
          <span class="field-label">${xt(o)} API key \u2014 ${xt(Ehe(e,t))} \xB7 <a class="field-link" href="${xt(s.href)}" target="_blank" rel="noopener noreferrer">${xt(s.label)}</a></span>
          <input class="input mono" type="password" name="${xt(r)}" autocomplete="off" ${The(e,t,n)} />
        </label>`},TW=(e,t,r,o)=>{let n=Vy(e[t]?.model),s=new Set(Ky[t].map(c=>c.value)),i=Ky[t].map(c=>{let d=c.value===n?" selected":"";return`<option value="${xt(c.value)}"${d}>${xt(c.label)}</option>`}).join(""),a=n!==Ms&&!s.has(n)?`<option value="${xt(n)}" selected>${xt(n)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${xt(o)}</span>
          <select class="input mono" name="${xt(r)}">${i}${a}</select>
        </label>`},CW=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${xt(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",o=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
      <p class="eyebrow">Writer</p>
      <h1>API keys (optional)</h1>
      <p class="lede">Run Claude, Codex, or Antigravity tasks with provider HTTP APIs instead of installing their CLIs on this computer. Keys stay in <span class="mono">writer-api-secrets.json</span> on this machine only.</p>
      <form class="task-form" method="POST" action="/writer-api">
        <fieldset class="field">
          <span class="field-label">Execution</span>
          <label><input type="radio" name="writerExecutionBackend" value="cli"${r} /> Local CLI (default)</label>
          <label><input type="radio" name="writerExecutionBackend" value="api"${o} /> API key + AgentWitch script</label>
        </fieldset>
        <p class="muted">Maps: Claude \u2192 Anthropic, Codex \u2192 OpenAI, Antigravity \u2192 Google Gemini. Cursor still requires CLI or Cursor Cloud on the website.</p>
        ${EW(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${TW(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${EW(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${TW(e.secrets,"openai","openaiModel","OpenAI model")}
        ${EW(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${TW(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var C7=l(()=>{"use strict";T7()});var u_,I7,L7=l(()=>{"use strict";u_=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),I7=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${u_(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in AgentWitch Cloud</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this computer</h2>
      <p class="lede">Nothing installed yet. Install playbooks in AgentWitch Cloud \u2014 files land in your profile harness on this computer. ${r}</p>
    </section>`;let o=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${u_(s.name)}</strong> <span class="muted mono">(${u_(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),n=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${u_(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this computer</h2>
      <p class="lede">${e.installed.sets.length} set(s) installed from AgentWitch Cloud. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${n}
      <ul class="harness-installed-set-list">${o}</ul>
    </section>`}});var Che,v7,x7,W7=l(()=>{"use strict";Che=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,v7=e=>e.kind==="folder",x7=e=>{let t={kind:"folder",name:"",children:new Map};for(let o of e){let n=o.relativePath.split("/"),s=t;for(let i=0;i<n.length;i+=1){let a=n[i];if(a===void 0)continue;if(i===n.length-1){s.children.set(a,o);continue}let d=s.children.get(a);if(d!==void 0&&v7(d)){s=d;continue}let p={kind:"folder",name:a,children:new Map};s.children.set(a,p),s=p}}let r=o=>{let n=[];for(let s of o.children.values()){if(v7(s)){n.push({type:"folder",name:s.name,children:r(s)});continue}n.push({type:"file",item:s})}return n.toSorted(Che)};return r(t)}});var O7,IW,j7=l(()=>{"use strict";O7=u(require("node:path")),IW=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${IW(r.children,t)}</ul>
            </details>
          </li>`;let o=O7.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var M7,Gn,Ihe,Lhe,bm,vhe,LW,N7=l(()=>{"use strict";_P();M7=u(require("node:path"));L7();W7();j7();Gn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ihe=()=>`(() => {
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
      "Folder picker is only available on the computer that runs AgentWitch. Type the folder path instead.";
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

})();`,Lhe=()=>`(() => {
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
})();`,bm=e=>{let t=cu({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in AgentWitch Cloud",body:"Install and update playbooks in the browser; this computer keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=I7({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),o=e.flashError?`<div class="alert-error">${Gn(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Gn(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':vhe(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
        <p class="muted">Advanced: pull rules from an existing folder on disk (does not replace installing from AgentWitch Cloud).</p>
        <div class="actions">
          <a class="btn btn-secondary" href="/harness?import=1">Import from folder\u2026</a>
        </div>
      </section>`:"",d=a?"":`<section class="card">
      <p class="eyebrow">Advanced</p>
      <h1>Import from disk</h1>
      <p class="lede">Scan a folder for existing <code>.cursor</code> rules and copy them into the profile harness on this computer. Prefer installing playbooks from AgentWitch Cloud when possible.</p>
      <div class="stack">
        <label class="field">
          <span class="field-label">Scan folder (required)</span>
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${Gn(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${Gn(s)}" />
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
    <script>${Ihe()}</script>
    <script>${Lhe()}</script>`;return`${t}${r}${o}${c}${d}`},vhe=e=>{let t=new Map;e.sets.forEach((o,n)=>{let s=o.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:o,setIndex:n}]})});let r=[...t.entries()].toSorted(([o],[n])=>o.localeCompare(n)).map(([o,n],s)=>{let i=n.sets.map(({set:a,setIndex:c})=>{let d=x7(a.items.map(g=>({...g,relativePath:typeof g.relativePath=="string"&&g.relativePath.length>0?g.relativePath:M7.default.relative(a.sourceRoot,g.sourcePath).replaceAll("\\","/")}))),p=IW(d,Gn),m=a.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${Gn(a.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${Gn(a.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${m} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${p}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${Gn(o)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Check <strong>Include in submit</strong> on the sets you want. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},LW=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),o=Number.parseInt(e.get("setCount")??"0",10),n=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),p=a.trim();Number.isFinite(d)&&p.length>0&&n.set(d,p)}let s=[];for(let i=0;i<o;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),p=d!==null&&Number.isFinite(d)?n.get(d):void 0,m=e.get(`setName-${i}`)?.trim()??p??a,g=t.sets[i];if(g===void 0)continue;let y=a.length>0?a:g.proposedSlug,h=m.length>0?m:g.proposedName,S=r.has(i),E=g.items.map(I=>({id:I.id,kind:I.kind,title:I.title,sourcePath:I.sourcePath,include:S}));s.push({slug:y,name:h,items:E})}return s}});var D7=l(()=>{"use strict";N7()});var xhe,vW,H7=l(()=>{"use strict";At();xhe=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[ae]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0)return null;let n=o;return{counts:{harness:Number(n.counts?.harness??0),workflow:Number(n.counts?.workflow??0),agent:Number(n.counts?.agent??0)},items:Array.isArray(n.items)?n.items:[]}}catch{return null}},vW=xhe});var Whe,F7,$7=l(()=>{"use strict";At();Whe=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[ae]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let o=await r.json();return typeof o!="object"||o===null||o.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof o.promotedCount=="number"?o.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},F7=Whe});var z7,Ohe,U7,B7=l(()=>{"use strict";ht();z7={saved:{message:"Pitfall saved.",error:null},retired:{message:"Pitfall retired. Turn on Show retired to see it again.",error:null},restored:{message:"Pitfall is active again.",error:null},invalid:{message:null,error:"Add a title, why it happens, and a fix. Keep them short, then save again."},limit:{message:null,error:`This project already has ${64} active pitfalls, the most allowed. Retire one, then try again.`},missing:{message:null,error:"That pitfall is gone. Reload the page and try again."},rejected:{message:null,error:"AgentWitch Cloud did not accept this change. Check the fields and try again."},unavailable:{message:null,error:"Could not reach AgentWitch Cloud. Check this computer on Status, then try again."}},Ohe=e=>e!==null&&Object.prototype.hasOwnProperty.call(z7,e)?z7[e]:null,U7=Ohe});var G7,K7=l(()=>{"use strict";G7=[{label:"Haiku",goal:"Write a short haiku about morning rain."},{label:"Trip plan",goal:"Plan a quiet weekend trip to a nearby lake."},{label:"Rainbows",goal:"Explain how rainbows form in simple words."},{label:"Dinner idea",goal:"Suggest a quick vegetarian dinner for two."}]});var Mr,km,xW=l(()=>{"use strict";Ko();K7();wx();Mr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),km=e=>{let t=e.promptValue??"",r=FA({presets:G7,groupLabel:G.groupLabel,leadLabel:G.lead,submitName:"rulePrompt"}),o=e.promptError!==void 0&&e.promptError!==null?`<p class="alert-error">${Mr(e.promptError)}</p>`:"",n=e.resultHtml!==void 0&&e.resultHtml.length>0?`<div class="stack">${e.resultHtml}</div>`:"",s=e.usageHtml!==void 0&&e.usageHtml.length>0?`<section class="stack">
          <h3>${Mr(G.ruleUseHeading)}</h3>
          <p class="lede">${Mr(G.ruleUseIntro)}</p>
          ${e.usageHtml}
        </section>`:"";return`<section class="stack" aria-label="${Mr(G.heading)}">
      <h2>${Mr(G.heading)}</h2>
      <p class="lede">${Mr(G.intro)}</p>
      <form method="GET" action="/project" class="stack">
        <input type="hidden" name="id" value="${Mr(e.projectId)}" />
        <input type="hidden" name="tab" value="harness" />
        ${r}
        <label class="field-label" for="rule-compare-prompt">${Mr(G.customLabel)}</label>
        <p class="muted">${Mr(G.customHint)}</p>
        <textarea class="input" id="rule-compare-prompt" name="rulePrompt" rows="3">${Mr(t)}</textarea>
        ${o}
        <div class="actions">
          <button class="btn btn-primary" type="submit">${Mr(G.button)}</button>
        </div>
      </form>
      ${n}
      ${s}
    </section>`}});var ec,WW,OW=l(()=>{"use strict";Ko();ec=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),WW=e=>{if(e.matched.length===0)return`<p class="empty">${ec(G.noRules)}</p>`;let t=e.matched.length===1?G.oneRule:G.nRules(e.matched.length),r=`<ul class="stack">${e.matched.map(n=>`<li><strong>${ec(n.title)}</strong> <span class="muted mono">${ec(n.id)}</span></li>`).join("")}</ul>`,o=`$${e.tokens.addedCostUsd.toFixed(4)}`;return`<div class="stack">
      <p>${ec(t)}</p>
      ${r}
      <p class="muted">${ec(G.tokenLine(e.tokens.promptTokens,e.tokens.rulesTokens))}</p>
      <p class="muted">${ec(G.costLine(o))}</p>
    </div>`}});var cr,jhe,jW,MW=l(()=>{"use strict";Xx();Ko();cr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),jhe=e=>e===1?G.usedOnce:G.usedN(e),jW=e=>{let t=e.flashHtml??"";if(e.rules.length===0)return`${t}<p class="empty">${cr(G.emptyRules)}</p>`;let r=new Map(e.rules.map(n=>[n.ruleId,n])),o=e.rules.map(n=>{let i=Jx({rule:n,rulesById:r,overlaps:e.overlaps,nowMs:e.nowMs}).map(c=>`<span class="muted">${cr(Yx(c))}</span>`).join(" \xB7 "),a=n.active?`<form method="POST" action="/project/rules/drop" class="inline-form">
            <input type="hidden" name="projectId" value="${cr(e.projectId)}" />
            <input type="hidden" name="ruleId" value="${cr(n.ruleId)}" />
            ${e.prompt!==void 0&&e.prompt.length>0?`<input type="hidden" name="rulePrompt" value="${cr(e.prompt)}" />`:""}
            <button class="btn btn-secondary btn-compact" type="submit">${cr(G.drop)}</button>
          </form>`:`<form method="POST" action="/project/rules/restore" class="inline-form">
            <input type="hidden" name="projectId" value="${cr(e.projectId)}" />
            <input type="hidden" name="ruleId" value="${cr(n.ruleId)}" />
            ${e.prompt!==void 0&&e.prompt.length>0?`<input type="hidden" name="rulePrompt" value="${cr(e.prompt)}" />`:""}
            <button class="btn btn-secondary btn-compact" type="submit">${cr(G.restore)}</button>
          </form>`;return`<li class="stack">
          <p><strong>${cr(n.title)}</strong> <span class="muted">${cr(jhe(n.hitCount))}</span></p>
          ${i?`<p>${i}</p>`:""}
          ${a}
        </li>`}).join("");return`${t}<ul class="stack">${o}</ul>`}});var Jo,V7,Yo,q7,NW=l(()=>{"use strict";Ko();Jo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),V7=e=>{let t=G.dropped(e.title),r=e.prompt!==void 0&&e.prompt.length>0?`<input type="hidden" name="rulePrompt" value="${Jo(e.prompt)}" />`:"";return`<div class="alert-success actions">
      <span>${Jo(t)}</span>
      <form method="POST" action="/project/rules/restore" class="inline-form">
        <input type="hidden" name="projectId" value="${Jo(e.projectId)}" />
        <input type="hidden" name="ruleId" value="${Jo(e.ruleId)}" />
        ${r}
        <button class="btn btn-secondary btn-compact" type="submit">${Jo(G.undo)}</button>
      </form>
    </div>`},Yo=(e,t="error")=>`<p class="${t==="error"?"alert-error":"muted"}">${Jo(e)}</p>`,q7=e=>{let t=`/project?id=${encodeURIComponent(e.projectId)}&tab=harness&rulePrompt=${encodeURIComponent(e.prompt)}`;return`<p class="alert-error">${Jo(G.usageError)} <a href="${Jo(t)}">${Jo(G.tryAgain)}</a></p>`}});var Mhe,J7,Y7=l(()=>{"use strict";Ko();NW();MW();Mhe=(e,t)=>e.ok?"":e.reason==="forbidden"?Yo(G.ownerOnlyDrop):e.reason==="limit_exceeded"?Yo(G.limitReached):Yo(t==="restore"?G.restoreFailed:G.dropFailed),J7=e=>{if(e.usage===null)return Yo(G.connectComputer,"muted");if(!e.usage.ok)return e.usage.reason==="not_connected"?Yo(G.connectComputer,"muted"):e.usage.reason==="forbidden"?Yo(G.ownerOnlyUsage,"muted"):q7({projectId:e.projectId,prompt:e.prompt});let t="";return e.changeError!==void 0&&e.changeError!==null?t=Mhe(e.changeError,e.changeAction??"drop"):e.dropFlash&&(t=V7({projectId:e.projectId,ruleId:e.dropFlash.ruleId,title:e.dropFlash.title,prompt:e.prompt})),jW({projectId:e.projectId,rules:e.usage.data.rules,overlaps:e.usage.data.overlaps,flashHtml:t,prompt:e.prompt})}});var Nhe,m_,X7=l(()=>{"use strict";Qr();Qx();Ko();xW();OW();Y7();NW();Nhe=e=>({id:e.id,projectId:e.projectId,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags,source:e.source,hitCount:e.hitCount,lastSeenAt:e.lastSeenAt,severity:e.severity}),m_=e=>{let t=e.prompt?.trim()??"";if(t.length===0)return km({projectId:e.projectId,promptError:e.prompt!==null&&e.prompt!==void 0?G.emptyPrompt:null});if(e.rulesUnavailable||e.activeRules===null)return km({projectId:e.projectId,promptValue:t,resultHtml:Yo(G.rulesUnavailable,"muted")});let o=nl({pitfalls:e.activeRules.map(Nhe),text:t}).map(s=>({id:s.id,title:s.symptom,avoidance:s.avoidance})),n=Zx({prompt:t,matched:o});return km({projectId:e.projectId,promptValue:t,resultHtml:WW({matched:o,tokens:n}),usageHtml:J7({projectId:e.projectId,prompt:t,usage:e.usage,dropFlash:e.dropFlash,changeError:e.changeError,changeAction:e.changeAction})})}});var Z7=l(()=>{"use strict";Fv();Ix();xW();OW();MW();X7()});var Q7,eX=l(()=>{"use strict";At();JA();Z7();Q7=async e=>{if(e.prompt===null)return m_({projectId:e.projectId,prompt:null,activeRules:[],usage:null});let t=e.cloudConfig===null?{ok:!1,reason:"not_connected"}:await Vx({appOrigin:e.cloudConfig.appOrigin,pairingToken:e.cloudConfig.pairingToken,projectId:e.projectId,pairingHeaderName:ae}),r=e.pitfalls,o=r==null||!r.ok,n=o?null:r.items.filter(s=>s.source!=="retired");return m_({projectId:e.projectId,prompt:e.prompt,activeRules:n,rulesUnavailable:o,usage:t,dropFlash:e.dropFlash,changeError:e.changeError,changeAction:e.changeAction})}});var DW,tX,rX=l(()=>{"use strict";At();JA();DW=(e,t)=>e.get(t)?.trim()??"",tX=async e=>{let t=new URLSearchParams(e.rawBody),r=DW(t,"projectId"),o=DW(t,"ruleId"),n=DW(t,"rulePrompt");if(r.length===0||o.length===0)return{kind:"not_found"};let s=n.length>0?`&rulePrompt=${encodeURIComponent(n)}`:"",i=`/project?id=${encodeURIComponent(r)}&tab=harness${s}`;if(e.cloudConfig===null)return{kind:"redirect",location:`${i}&ruleChangeError=${encodeURIComponent("unavailable")}`};let a=await qx({appOrigin:e.cloudConfig.appOrigin,pairingToken:e.cloudConfig.pairingToken,projectId:r,ruleId:o,action:e.action,pairingHeaderName:ae});if(!a.ok)return{kind:"redirect",location:`${i}&ruleChangeError=${encodeURIComponent(a.reason)}&ruleChangeAction=${e.action}`};if(e.action==="drop"&&a.data.changed){let c=new URLSearchParams({id:r,tab:"harness",ruleDropped:a.data.rule.ruleId,ruleDroppedTitle:a.data.rule.title});return n.length>0&&c.set("rulePrompt",n),{kind:"redirect",location:`/project?${c.toString()}`}}return{kind:"redirect",location:i}}});var oX=l(()=>{"use strict"});var Wi,Dhe,HW,nX=l(()=>{"use strict";_P();AT();Wi=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Dhe=e=>`${e.harness} ${e.harness===1?"Playbook":"Playbooks"} \xB7 ${e.workflow} ${e.workflow===1?"Workflow":"Workflows"} \xB7 ${e.agent} ${e.agent===1?"Agent":"Agents"}`,HW=e=>{let t=e.flashError?`<div class="alert-error">${Wi(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Wi(e.flashMessage)}</div>`:"",r=cu({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in AgentWitch Cloud",body:"Projects are created in the browser. This page chooses their folders on this computer and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),o=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in AgentWitch Cloud, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(n=>{let s=e.compositionCountsByProjectId?.[n.id],i=s!==void 0?`<span class="muted">${Wi(Dhe(s))}</span>`:"",a=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(n.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(n.id)}">Open project \u2192</a>`,d=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(n.id)}?rename=1`,p=`<a class="btn btn-secondary btn-compact" href="${Wi(d)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>`,m=Vh(n.name)?"":`<form method="POST" action="/projects/delete" class="inline-form" onsubmit="return confirm('Delete this project from AgentWitch Cloud? The folder on this computer stays.');">
                  <input type="hidden" name="projectId" value="${Wi(n.id)}" />
                  <button class="btn btn-danger btn-compact" type="submit">Delete</button>
                </form>`;return`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(n.id)}">
                  <strong>${Wi(n.name)}</strong>
                  <span class="muted mono">${Wi(n.projectFolderPath)}</span>
                  ${i}
                </a>
                <div class="actions">${c}${a}${p}${m}</div>
              </li>`}).join("")}</ul>`;return`${t}${r}<section class="card">
      <p class="eyebrow">Repositories</p>
      <h1>Projects on this computer</h1>
      <p class="lede">Synced from AgentWitch Cloud for this paired computer only. Choose a folder per project, then pull playbooks into each repo\u2019s <code>.cursor</code> tree (tracked in <code>.agent-witch/materialization.json</code>).</p>
      ${o}
    </section>`}});var sX=l(()=>{"use strict";oX();Xh();nX()});var g_,iX=l(()=>{"use strict";g_=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var aX,Nr,FW=l(()=>{"use strict";aX=u(require("node:path"));fr();Ge();Q();ne();iT();Nr=e=>{let t=B()?.layout.installDir??x();if(aX.default.basename(t)===Fr)return Nt;let r=B(),o=r!==null?et(r.wsUrl):null;if(o!==null&&o.length>0)return o;let n=e?.appOrigin?.trim();return n!==void 0&&n.length>0?n.replace(/\/$/,""):Nt}});var $W,lX=l(()=>{"use strict";Kr();FW();$W=async e=>{let t=ze(e.installDir),r=t?.bundleVersion??null,o=Nr(t);try{let n=await Wa(o);return n===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:Rs(r,n),localBundleVersion:r,remoteBundleVersion:n,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var zW,cX=l(()=>{"use strict";zW=e=>!e});var UW,tc,BW=l(()=>{"use strict";Q();UW=()=>`http://127.0.0.1:${ga()}/update/run`,tc=async e=>{try{let t=await fetch(UW(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var Hhe,dX,GW,pX=l(()=>{"use strict";Q();Ae();BW();Hhe=()=>{Ao({launchAgentLabel:Ie(),installDir:x()})},dX=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},GW=async()=>{Hhe();let e=await tc({force:!0});if(e.ok)return{ok:!0,message:dX(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:dX(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(Kr(),L$)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var KW=l(()=>{"use strict";PP();iX();FW();lX();cX();pX();BW()});var uX,mX=l(()=>{"use strict";uX=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var gX,fX,VW,qW,yX=l(()=>{"use strict";gX=require("node:crypto"),fX=u(require("node:fs"));_t();ne();ne();mX();VW=!1,qW=async e=>{if(VW)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!uX(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=B();if(r===null)return{ok:!1,errorMessage:"AgentWitch is not configured."};let o=J({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(o===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this computer."};let n=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&fX.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,gX.randomUUID)();VW=!0;try{if(await aT(o,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await Ua({...r,workspace:n},e.writerAgent,t);return await Rp(o,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{VW=!1}}});var hX=l(()=>{"use strict";yX()});var kt,rc=l(()=>{"use strict";kt=e=>{if(typeof e!="string")return!1;let t=e.trim();return t.length===0||t.startsWith(".")||t.includes("/")||t.includes("\\")||t.includes("..")?!1:t===e}});var Vt,se,Rt,Oi,SX,Dr,Te,f_,y_,PX,Kn,Vn,h_,S_,JW,YW,XW,ji,AX,ee=l(()=>{"use strict";Vt="history",se="skills",Rt="_drafts",Oi="_tombstones",SX="state.json",Dr="meta.json",Te="skillgen",f_="episodes.json",y_="budget.json",PX="metrics.jsonl",Kn="SKILL.md",Vn="meta.json",h_="learned-pitfalls.json",S_="flags.json",JW="index",YW="store.db",XW="acks",ji="tasks",AX="outcomes"});var Mi,bX,wt,ie,ft=l(()=>{"use strict";Mi=u(require("node:fs")),bX=u(require("node:path"));ee();wt=e=>{Mi.default.mkdirSync(e,{recursive:!0,mode:448});try{Mi.default.chmodSync(e,448)}catch{}},ie=(e,t)=>{wt(bX.default.dirname(e));let r=`${e}.${process.pid}.${Date.now()}.tmp`;Mi.default.writeFileSync(r,t,{mode:384});try{Mi.default.chmodSync(r,384)}catch{}Mi.default.renameSync(r,e);try{Mi.default.chmodSync(e,384)}catch{}}});var qn,U,ge,te=l(()=>{"use strict";qn=u(require("node:path"));Q();rc();ft();ee();U=e=>{if(!kt(e))throw new Error("invalid_project_id");let t=z();return qn.default.join(t.projectDataDir,e)},ge=e=>{let t=U(e);wt(t),wt(qn.default.join(t,Vt));let r=qn.default.join(t,se);return wt(r),wt(qn.default.join(r,Rt)),wt(qn.default.join(r,Oi)),wt(qn.default.join(t,Te)),wt(qn.default.join(t,ji)),t}});var ZW,QW,P_=l(()=>{"use strict";ZW=/^[a-z0-9][a-z0-9_-]{0,63}$/,QW="sha256:"});var kX,Ye,Rm=l(()=>{"use strict";kX=require("node:crypto");P_();Ye=e=>`${QW}${(0,kX.createHash)("sha256").update(Buffer.from(e,"utf8")).digest("hex")}`});var Ni,wm=l(()=>{"use strict";P_();Ni=e=>ZW.test(e)});var Em,A_=l(()=>{"use strict";Em=e=>e.onPublishedSet?e.localContentHash===e.expectedHash?"skip":"fetch_write":"remove"});var e0,t0=l(()=>{"use strict";e0=async e=>{try{return await e.port.isHistoryEnabled(e.projectId)===!0}catch{return!1}}});var r0,o0=l(()=>{"use strict";wm();r0=async e=>{try{return(await e.port.listProjectSkillIds({projectId:e.projectId})).filter(r=>Ni(r.skillId))}catch{return[]}}});var n0,s0=l(()=>{"use strict";n0=async e=>{try{let t=await e.awc.listPublished(e.projectId);return Array.isArray(t)?{ok:!0,published:t}:{ok:!1}}catch{return{ok:!1}}}});var i0,a0=l(()=>{"use strict";Rm();i0=async e=>{try{let t=await e.port.readProjectSkillVersion({projectId:e.projectId,skillId:e.skillId,version:e.version});return t===null?null:Ye(t.body)===t.contentHash?t:null}catch{return null}}});var l0,c0=l(()=>{"use strict";Rm();wm();l0=async e=>{if(!Ni(e.skillId))return{ok:!1,code:"unavailable"};let t=Ye(e.body);try{let r=await e.port.writeProjectSkillVersion({projectId:e.projectId,skillId:e.skillId,version:e.version,body:e.body});return r.contentHash===t?{ok:!0,path:r.path,contentHash:r.contentHash}:{ok:!1,code:"hash_mismatch"}}catch{return{ok:!1,code:"unavailable"}}}});var d0,p0=l(()=>{"use strict";wm();d0=async e=>{if(!Ni(e.skillId))throw new Error("invalid_project_skill_id");return e.port.tombstoneProjectSkill({projectId:e.projectId,skillId:e.skillId,lastContentHash:e.lastContentHash,...e.revokedAt!==void 0?{revokedAt:e.revokedAt}:{}})}});var u0,m0=l(()=>{"use strict";Rm();A_();a0();c0();u0=async e=>{let{meta:t,projectId:r}=e,o={skillId:t.skillId,version:t.publishedVersion},n=await i0({port:e.port,projectId:r,skillId:t.skillId,version:t.publishedVersion});if(Em({onPublishedSet:!0,expectedHash:t.contentHash,localContentHash:n?.contentHash??null})==="skip")return{...o,action:"skipped"};let i=await e.awc.getPublishedBody({projectId:r,skillId:t.skillId,version:t.publishedVersion,skillRowId:t.skillRowId});if(i===null)return{...o,action:"missing_awc"};if(i.contentHash!==t.contentHash||Ye(i.body)!==t.contentHash)return{...o,action:"hash_mismatch"};let a=await l0({port:e.port,projectId:r,skillId:t.skillId,version:t.publishedVersion,body:i.body});return a.ok?a.contentHash===t.contentHash?{...o,action:"mirrored"}:{...o,action:"hash_mismatch"}:{...o,action:a.code==="hash_mismatch"?"hash_mismatch":"unavailable"}}});var g0,f0=l(()=>{"use strict";A_();p0();g0=async e=>Em({onPublishedSet:!1})!=="remove"?{skillId:e.skillId,version:0,action:"unavailable"}:(await d0({port:e.port,projectId:e.projectId,skillId:e.skillId,lastContentHash:e.lastContentHash,...e.revokedAt!==void 0?{revokedAt:e.revokedAt}:{}}),{skillId:e.skillId,version:0,action:"removed"})});var Tm,__,RX=l(()=>{"use strict";t0();o0();s0();m0();f0();Tm="[project-skill-pull-mirror]",__=async e=>{let t=e.deps.history,r=e.deps.awcPublished;try{if(!await e0({port:t,projectId:e.projectId}))return{ok:!0,skipped:!0,skills:[]};let n=await n0({awc:r,projectId:e.projectId});if(!n.ok)return console.warn(Tm,"list_failed",e.projectId),{ok:!1,skipped:!1,skills:[]};let s=new Set(n.published.map(d=>d.skillId)),i=[];for(let d of n.published)try{i.push(await u0({projectId:e.projectId,meta:d,port:t,awc:r}))}catch(p){console.warn(Tm,"skill_failed",d.skillId,p),i.push({skillId:d.skillId,version:d.publishedVersion,action:"unavailable"})}let a=await r0({port:t,projectId:e.projectId});for(let d of a)if(!s.has(d.skillId))try{i.push(await g0({projectId:e.projectId,skillId:d.skillId,lastContentHash:d.contentHash,port:t}))}catch(p){console.warn(Tm,"orphan_tombstone_failed",d.skillId,p),i.push({skillId:d.skillId,version:0,action:"unavailable"})}let c=i.some(d=>d.action==="unavailable"||d.action==="hash_mismatch"||d.action==="missing_awc");return c&&console.warn(Tm,"partial_failure",e.projectId,i),{ok:!c,skipped:!1,skills:i}}catch(o){return console.warn(Tm,"tick_failed",e.projectId,o),{ok:!1,skipped:!1,skills:[]}}}});var Jn=l(()=>{"use strict";P_();Rm();wm();A_();t0();o0();s0();a0();c0();p0();m0();f0();RX()});var Di,Cm,Fhe,$he,Im,b_=l(()=>{"use strict";Di=u(require("node:fs")),Cm=u(require("node:path"));ft();Jn();ee();te();Fhe=e=>e.length>0&&!e.startsWith("_")&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),$he=e=>`v${String(e).padStart(4,"0")}.md`,Im=e=>{if(!Fhe(e.skillId))throw new Error("invalid_project_skill_id");if(!Number.isInteger(e.version)||e.version<1)throw new Error("invalid_project_skill_version");let t=ge(e.projectId),r=Cm.default.join(t,se,e.skillId),o=Cm.default.join(r,$he(e.version)),n=Cm.default.join(r,Dr),s=Ye(e.body);if(Di.default.existsSync(o)&&Di.default.existsSync(n))try{let a=JSON.parse(Di.default.readFileSync(n,"utf8"));if(a.version===e.version&&a.contentHash===s&&Di.default.readFileSync(o,"utf8")===e.body)return{path:o,contentHash:s}}catch{}ie(o,e.body),ie(n,`${JSON.stringify({skillId:e.skillId,version:e.version,contentHash:s,updatedAt:new Date().toISOString()})}
`);let i=Cm.default.join(t,se,Oi,`${e.skillId}.json`);return Di.default.existsSync(i)&&Di.default.unlinkSync(i),{path:o,contentHash:s}}});var Lm,k_,h0,S0=l(()=>{"use strict";Lm=u(require("node:fs")),k_=u(require("node:path"));Jn();ee();te();h0=e=>{if(e.skillId.length===0||e.skillId.startsWith("_")||e.skillId.includes("/")||e.skillId.includes("\\"))return null;let t;try{t=U(e.projectId)}catch{return null}let r=k_.default.join(t,se,e.skillId),o=k_.default.join(r,`v${String(e.version).padStart(4,"0")}.md`),n=k_.default.join(r,Dr);if(!Lm.default.existsSync(o)||!Lm.default.existsSync(n))return null;try{let s=Lm.default.readFileSync(o,"utf8"),i=JSON.parse(Lm.default.readFileSync(n,"utf8")),a=typeof i.contentHash=="string"?i.contentHash:null;return a===null||i.version!==e.version||Ye(s)!==a?null:{body:s,contentHash:a}}catch{return null}}});var Xo,Yn,wX,zhe,P0,A0,_0=l(()=>{"use strict";Xo=u(require("node:fs")),Yn=u(require("node:path"));ft();ee();te();wX=e=>e.length>0&&!e.startsWith("_")&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),zhe=(e,t)=>{if(!Xo.default.existsSync(e))return;let r=`.${t}.`;for(let o of Xo.default.readdirSync(e)){if(!o.startsWith(r))continue;let n=Yn.default.join(e,o);try{Xo.default.rmSync(n,{recursive:!0,force:!0})}catch{}}},P0=e=>{if(!wX(e.skillId))throw new Error("invalid_project_skill_id");let t=ge(e.projectId),r=Yn.default.join(t,se),o=Yn.default.join(r,e.skillId),n=!1;if(Xo.default.existsSync(o)){let c=Yn.default.join(r,`.${e.skillId}.${process.pid}.${Date.now()}`);try{Xo.default.renameSync(o,c),Xo.default.rmSync(c,{recursive:!0,force:!0}),n=!0}catch{}}zhe(r,e.skillId);let s=Yn.default.join(r,Oi);wt(s);let i=Yn.default.join(s,`${e.skillId}.json`),a={skillId:e.skillId,revokedAt:e.revokedAt??new Date().toISOString(),lastContentHash:e.lastContentHash};return ie(i,`${JSON.stringify(a)}
`),{removed:n}},A0=e=>{if(!wX(e.skillId))return null;let t;try{t=U(e.projectId)}catch{return null}let r=Yn.default.join(t,se,Oi,`${e.skillId}.json`);if(!Xo.default.existsSync(r))return null;try{let o=JSON.parse(Xo.default.readFileSync(r,"utf8"));if(typeof o!="object"||o===null||typeof o.skillId!="string"||typeof o.revokedAt!="string"||typeof o.lastContentHash!="string")return null;let n=o;return{skillId:n.skillId,revokedAt:n.revokedAt,lastContentHash:n.lastContentHash}}catch{return null}}});var vm,b0,k0,R0=l(()=>{"use strict";vm=u(require("node:fs")),b0=u(require("node:path"));ee();te();k0=e=>{let t;try{t=U(e.projectId)}catch{return[]}let r=b0.default.join(t,se);if(!vm.default.existsSync(r))return[];let o=[];for(let n of vm.default.readdirSync(r)){if(n.startsWith("_")||n.startsWith("."))continue;let s=b0.default.join(r,n,Dr);if(vm.default.existsSync(s))try{let i=JSON.parse(vm.default.readFileSync(s,"utf8"));if(typeof i.contentHash!="string")continue;o.push({skillId:n,contentHash:i.contentHash})}catch{continue}}return o}});var w0,E0=l(()=>{"use strict";w0=e=>e.toMembershipId===null&&e.toUserId===null&&e.toTeamLabel===null});var EX,Uhe,Bhe,Ghe,Khe,T0,TX,CX,Dst,Hst,Vhe,Fst,qhe,Jhe,$st,C0=l(()=>{"use strict";EX=(e,t)=>{let r=process.env[e]?.trim();if(!r)return t;let o=Number.parseInt(r,10);return Number.isFinite(o)&&o>0?o:t},Uhe="peer.silent",Bhe="peer.silent_blocked",Ghe="composer.recipient_sticky_cleared",Khe="project.updated",T0=[Uhe,Bhe,Ghe],TX="System",CX="Owner",Dst=5*6e4,Hst=10*6e4,Vhe=300,Fst=EX("AWC_PROJECT_MESSAGE_HOURLY_CAP",Vhe),qhe=300,Jhe=EX("AWC_PROJECT_MESSAGE_UNREAD_CAP",qhe),$st=["peer.joined","peer.left","peer.renamed",Khe,...T0]});var nc,I0,L0=l(()=>{"use strict";C0();nc="whole",I0="task.assign"});var Yhe,v0,IX=l(()=>{"use strict";E0();L0();Yhe=e=>e==="owner"||e==="member",v0=e=>{let{row:t}=e;return t.senderKind==="owner"||t.senderKind==="member"?w0(t)?nc:t.toMembershipId!==null&&e.botIds.has(t.toMembershipId)?t.toMembershipId:null:t.senderKind!=="bot"||t.senderMembershipId===null||!e.botIds.has(t.senderMembershipId)||!Yhe(t.recipientKind)?null:e.inReplyTo!==null&&e.wholeMessageIds.has(e.inReplyTo)?nc:t.senderMembershipId}});var Xhe,xm,LX=l(()=>{"use strict";Xhe=/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i,xm=e=>{let t=Xhe.exec(e);if(t===null)return{inReplyTo:null,text:e};let r=e.replace(new RegExp(`${t[0]}\\s*:?`)," ").replace(/\s+/g," ").trim();return{inReplyTo:t[0].toLowerCase(),text:r.length>0?r:e}}});var Zhe,x0,vX=l(()=>{"use strict";C0();Zhe=new Set(T0),x0=e=>e.sender_membership_id===null||e.sender_membership_id===void 0?Zhe.has(String(e.kind))?TX:CX:e.sender_display_name?String(e.sender_display_name):null});var Wm=l(()=>{"use strict";IX();E0();L0();LX();vX()});var Hi,je,sc=l(()=>{"use strict";Hi=e=>{if(typeof e!="string")return null;let t=e.trim();return t.length>0?t:null},je=(e,t)=>{for(let r of t){let o=Hi(e[r]);if(o!==null)return o}return null}});var Om,R_=l(()=>{"use strict";Wm();sc();Om=e=>{let t=je(e,["fromProjectDisplayName","senderLabel","sender_label"]);return t!==null?t:x0({sender_membership_id:e.sender_membership_id??e.fromMembershipId??e.senderMembershipId??null,sender_display_name:e.sender_display_name??e.senderDisplayName??null,kind:e.kind})}});var w_,W0=l(()=>{"use strict";sc();w_=e=>{let t=je(e,["fromMembershipId","senderMembershipId","sender_membership_id"]),r=je(e,["toMembershipId","to_membership_id"]);return t===null&&r!==null?new Set([r]):t!==null&&r===null?new Set([t]):t!==null&&r!==null?new Set([r]):new Set}});var xX,Qhe,O0,j0=l(()=>{"use strict";Wm();W0();sc();xX=(e,t,r)=>e===null?r:t.has(e)?"bot":r,Qhe=(e,t)=>{let r=je(e,["fromMembershipId","senderMembershipId","sender_membership_id"]),o=je(e,["toMembershipId","to_membership_id"]),n=je(e,["toUserId","to_user_id"]),s=je(e,["toTeamLabel","to_team_label"]),i=xX(r,t,"owner"),a=o!==null?xX(o,t,"member"):n!==null?"owner":"none";return{messageId:je(e,["messageId","id"])??"unknown",kind:Hi(e.kind)??"chat.note",summary:Hi(e.summary)??"",createdAt:je(e,["createdAt","created_at"])??new Date(0).toISOString(),senderKind:i,senderMembershipId:r,senderUserId:"history-local",senderDisplayName:null,recipientKind:a,toMembershipId:o,toUserId:n,toTeamLabel:s}},O0=e=>{let t=je(e.message,["threadKey","thread_key"]);if(t!==null)return t;let r=e.botIds??w_(e.message),o=Qhe(e.message,r),n=je(e.message,["inReplyTo","in_reply_to"])??(o.senderKind==="bot"?xm(o.summary).inReplyTo:null);return v0({row:o,botIds:r,wholeMessageIds:e.wholeMessageIds??new Set,inReplyTo:n})}});var M0,N0,He=l(()=>{"use strict";M0="AGENT_WITCH_HISTORY_SKILLGEN_OWNER_LLM",N0="AGENT_WITCH_HISTORY_SKILLGEN_OWNER_LLM_DRY_RUN"});var D0,H0=l(()=>{"use strict";R_();j0();He();sc();D0=e=>{let t=je(e.message,["createdAt","created_at"])??e.savedAt;return{messageId:e.messageId,projectId:e.projectId,message:e.message,savedAt:e.savedAt,version:2,threadKey:O0({message:e.message,botIds:e.botIds,wholeMessageIds:e.wholeMessageIds}),createdAt:t,senderLabel:Om(e.message)}}});var Zo,Fi=l(()=>{"use strict";Zo="message"});var F0,WX,$i,jm=l(()=>{"use strict";F0=e=>{if(typeof e!="string")return null;let t=e.trim();return t.length>0?t:null},WX=(e,t)=>{for(let r of t){let o=F0(e[r]);if(o!==null)return o}return null},$i=e=>{let t=e,r=F0(t.threadKey)??WX(e.message,["threadKey","thread_key"]),o=F0(t.createdAt)??WX(e.message,["createdAt","created_at"])??e.savedAt;return{threadKey:r,createdAt:o}}});var OX,jX=l(()=>{"use strict";Fi();OX=`
CREATE TABLE IF NOT EXISTS history_store_meta (
  key TEXT NOT NULL PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS records (
  message_id TEXT NOT NULL PRIMARY KEY,
  project_id TEXT NOT NULL,
  kind TEXT NOT NULL,
  thread_key TEXT,
  created_at TEXT NOT NULL,
  saved_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS records_project_thread_created_idx
  ON records (project_id, thread_key, created_at);

CREATE INDEX IF NOT EXISTS records_project_created_idx
  ON records (project_id, created_at);
`});var MX,NX,DX=l(()=>{"use strict";MX=u(require("node:path"));ee();te();NX=e=>MX.default.join(U(e),JW,YW)});var HX,FX,rSe,oSe,Xn,Zn,ic=l(()=>{"use strict";HX=u(require("node:fs")),FX=u(require("node:path"));Qr();Fi();jX();DX();rSe=e=>{let t=e.prepare("SELECT value FROM history_store_meta WHERE key = 'schema_version'").get();if(t===void 0)return 0;let r=Number.parseInt(t.value,10);return Number.isFinite(r)?r:0},oSe=(e,t)=>{e.prepare(`INSERT INTO history_store_meta (key, value) VALUES ('schema_version', ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`).run(String(t))},Xn=e=>{let t=zt();if(!t.ok)return{ok:!1,reason:t.reason};let r=NX(e);HX.default.mkdirSync(FX.default.dirname(r),{recursive:!0,mode:448});let o=new t.sqlite.DatabaseSync(r);return o.exec(`PRAGMA busy_timeout = ${3e3}`),o.exec(OX),rSe(o)<1&&oSe(o,1),{ok:!0,db:o}},Zn=e=>{e.close()}});var nSe,E_,T_=l(()=>{"use strict";Fi();jm();ic();nSe="[project-history-index]",E_=e=>{let t=Xn(e.record.projectId);if(!t.ok)return{ok:!1,reason:t.reason};let{threadKey:r,createdAt:o}=$i(e.record),n=e.kind??Zo;try{return t.db.prepare(`INSERT INTO records (message_id, project_id, kind, thread_key, created_at, saved_at)
         VALUES (?, ?, ?, ?, ?, ?)
         ON CONFLICT(message_id) DO UPDATE SET
           project_id = excluded.project_id,
           kind = excluded.kind,
           thread_key = excluded.thread_key,
           created_at = excluded.created_at,
           saved_at = excluded.saved_at`).run(e.record.messageId,e.record.projectId,n,r,o,e.record.savedAt),{ok:!0,threadKey:r,createdAt:o}}catch(s){return console.error(nSe,"ingest_failed",e.record.projectId,e.record.messageId,s),{ok:!1,reason:"ingest_failed"}}finally{Zn(t.db)}}});var z0,zX,sSe,iSe,$X,U0,B0=l(()=>{"use strict";z0=u(require("node:fs")),zX=u(require("node:path"));ft();H0();T_();ee();te();sSe="[project-history-write]",iSe=e=>e.length>0&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),$X=e=>{try{E_({record:e})}catch(t){console.error(sSe,"index_ingest_failed",e.projectId,e.messageId,t)}},U0=e=>{let t=e.messageId.trim();if(!iSe(t))throw new Error("invalid_message_id");let r=ge(e.projectId),o=zX.default.join(r,Vt,`${t}.json`);if(z0.default.existsSync(o))try{let s=JSON.parse(z0.default.readFileSync(o,"utf8"));if(s.messageId===t)return $X(s),s}catch{}let n=D0({messageId:t,projectId:e.projectId,message:e.message,savedAt:new Date().toISOString(),botIds:e.botIds,wholeMessageIds:e.wholeMessageIds});return ie(o,`${JSON.stringify(n)}
`),$X(n),n}});var Mm,UX,BX,uo,ac,G0,Qn=l(()=>{"use strict";Mm=u(require("node:fs")),UX=u(require("node:path"));ft();ee();te();Q();BX=e=>UX.default.join(U(e),Vt,SX),uo=e=>{try{let t=BX(e);if(!Mm.default.existsSync(t))return null;let r=JSON.parse(Mm.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null||typeof r.state!="string"||typeof r.updatedAt!="string")return null;let o=r.state;return o!=="on_ready"&&o!=="degraded"&&o!=="on_configuring"&&o!=="off"?null:{state:o,updatedAt:r.updatedAt}}catch{return null}},ac=e=>{ge(e.projectId);let t={state:e.state,updatedAt:new Date().toISOString()};return ie(BX(e.projectId),`${JSON.stringify(t)}
`),t},G0=()=>{let t=z().projectDataDir;if(!Mm.default.existsSync(t))return[];let r=[];for(let o of Mm.default.readdirSync(t)){if(!kt(o))continue;let n=uo(o);n!==null&&(n.state==="on_ready"||n.state==="degraded")&&r.push(o)}return r}});var GX,KX=l(()=>{"use strict";At();GX=async e=>{let t=await fetch(`${e.cloudApi.appOrigin}/api/agent-witch/projects/${encodeURIComponent(e.projectId)}/computer-history/acks`,{method:"POST",headers:{[ae]:e.cloudApi.pairingToken,"Content-Type":"application/json"},body:JSON.stringify({messageId:e.messageId}),signal:AbortSignal.timeout(3e4)});return{ok:t.ok,status:t.status}}});var K0,V0=l(()=>{"use strict";K0=e=>{let t=e.deviceId.trim(),r=e.messageId.trim();if(t.length===0)throw new Error("invalid_device_id");if(r.length===0)throw new Error("invalid_message_id");let o=e.ackedAt??new Date().toISOString();return{deviceId:t,messageId:r,ackedAt:o,lastSeenAt:e.lastSeenAt??o}}});var q0,qX,VX,J0,Y0=l(()=>{"use strict";q0=u(require("node:fs")),qX=u(require("node:path"));ft();V0();ee();te();VX=e=>e.length>0&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),J0=e=>{let t=e.messageId.trim(),r=e.deviceId.trim();if(!VX(t)||!VX(r))throw new Error("invalid_ack_ids");let o=ge(e.projectId),n=qX.default.join(o,Vt,XW,`${t}.json`),s=e.nowIso??new Date().toISOString();if(q0.default.existsSync(n))try{let a=JSON.parse(q0.default.readFileSync(n,"utf8"));if(a.messageId===t&&a.deviceId===r&&typeof a.ackedAt=="string"){let c={...a,lastSeenAt:s};return ie(n,`${JSON.stringify(c)}
`),c}}catch{}let i=K0({deviceId:r,messageId:t,ackedAt:s,lastSeenAt:s});return ie(n,`${JSON.stringify(i)}
`),i}});var lc,JX,aSe,X0,YX=l(()=>{"use strict";kr();ne();Qn();KX();Y0();B0();lc="[project-history-dispatch]",JX=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),aSe=()=>{let e=B();return e===null?null:J({wsUrl:e.wsUrl,pairingToken:e.pairingToken})},X0=async e=>{if(!JX(e.payload))return{ok:!1,reason:"invalid_payload"};let t=typeof e.payload.projectId=="string"?e.payload.projectId.trim():"",r=e.payload.message;if(t.length===0||!JX(r))return{ok:!1,reason:"invalid_payload"};let o=typeof r.messageId=="string"?r.messageId.trim():"";if(o.length===0)return{ok:!1,reason:"missing_message_id"};try{U0({projectId:t,messageId:o,message:r}),ac({projectId:t,state:"on_ready"});let s=typeof e.deviceId=="string"?e.deviceId.trim():"";if(s.length>0)try{J0({projectId:t,deviceId:s,messageId:o})}catch(i){console.error(lc,"local_ack_failed",t,o,i)}}catch(s){console.error(lc,"write_failed",t,o,s);try{ac({projectId:t,state:"degraded"})}catch(i){console.error(lc,"degraded_mark_failed",t,i)}return{ok:!1,reason:"write_failed"}}let n=e.cloudApi===void 0?aSe():e.cloudApi;if(n===null)return console.error(lc,"ack_skipped_no_cloud_api",t,o),{ok:!0,messageId:o,acked:!1};try{let s=await GX({cloudApi:n,projectId:t,messageId:o});return s.ok?{ok:!0,messageId:o,acked:!0}:(console.error(lc,"ack_http_failed",t,o,s.status),{ok:!0,messageId:o,acked:!1})}catch(s){return console.error(lc,"ack_failed",t,o,s),{ok:!0,messageId:o,acked:!1}}}});var Z0,XX,lSe,cc,Nm=l(()=>{"use strict";Z0=u(require("node:fs")),XX=u(require("node:path"));ee();te();lSe=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.messageId=="string"&&typeof t.projectId=="string"&&typeof t.savedAt=="string"&&typeof t.message=="object"&&t.message!==null&&!Array.isArray(t.message)},cc=e=>{let t=e.messageId.trim();if(t.length===0||t.includes("/")||t.includes("\\")||t.includes(".."))return null;let r=XX.default.join(U(e.projectId),Vt,`${t}.json`);if(!Z0.default.existsSync(r))return null;try{let o=JSON.parse(Z0.default.readFileSync(r,"utf8"));return lSe(o)?o:null}catch{return null}}});var Dm,C_=l(()=>{"use strict";Nm();Dm=e=>cc(e)});var Q0,ZX,zi,Hm=l(()=>{"use strict";Q0=u(require("node:fs")),ZX=u(require("node:path"));ee();Nm();te();zi=e=>{let t=ZX.default.join(U(e),Vt);if(!Q0.default.existsSync(t))return[];let r=Q0.default.readdirSync(t).filter(n=>n.endsWith(".json")&&n!=="state.json").map(n=>n.slice(0,-5)),o=[];for(let n of r){let s=cc({projectId:e,messageId:n});s!==null&&o.push(s)}return o.sort((n,s)=>{let i=Date.parse(n.savedAt),a=Date.parse(s.savedAt);return i!==a?i-a:n.messageId.localeCompare(s.messageId)})}});var Fm,cSe,dSe,pSe,uSe,mSe,gSe,eO,Ui,$m=l(()=>{"use strict";Fi();jm();Hm();ic();Qr();Fm=(e,t)=>{let r=e[t];return typeof r=="string"?r:null},cSe=e=>{let t=Fm(e,"messageId"),r=Fm(e,"projectId"),o=Fm(e,"kind"),n=Fm(e,"createdAt"),s=Fm(e,"savedAt");if(t===null||r===null||o===null||n===null||s===null)return null;let i=e.threadKey,a=i==null?null:typeof i=="string"?i:null;return{messageId:t,projectId:r,kind:o==="summary"?"summary":Zo,threadKey:a,createdAt:n,savedAt:s}},dSe=50,pSe=200,uSe=e=>typeof e!="number"||!Number.isFinite(e)||e<=0?dSe:Math.min(Math.floor(e),pSe),mSe=(e,t)=>{let r=Date.parse(e.createdAt),o=Date.parse(t.createdAt);return r!==o?o-r:t.messageId.localeCompare(e.messageId)},gSe=(e,t,r)=>{if(t==null||t==="")return!0;let o=Date.parse(e.createdAt),n=Date.parse(t);return o<n?!0:o>n?!1:r==null||r===""?!0:e.messageId.localeCompare(r)<0},eO=(e,t)=>{let r=e.threadKey===void 0||e.threadKey===null?null:e.threadKey;return{available:!0,rows:zi(e.projectId).map(n=>{let s=$i(n);return{messageId:n.messageId,projectId:n.projectId,kind:Zo,threadKey:s.threadKey,createdAt:s.createdAt,savedAt:n.savedAt}}).filter(n=>r===null?!0:n.threadKey===r).filter(n=>gSe(n,e.beforeCreatedAt,e.beforeMessageId)).sort(mSe).slice(0,t)}},Ui=e=>{let t=uSe(e.limit);if(!zt().ok)return eO(e,t);let o=Xn(e.projectId);if(!o.ok)return{...eO(e,t),reason:o.reason};try{let n=[e.projectId,Zo],s=`SELECT message_id AS messageId, project_id AS projectId, kind,
              thread_key AS threadKey, created_at AS createdAt, saved_at AS savedAt
       FROM records
       WHERE project_id = ? AND kind = ?`;e.threadKey!==void 0&&e.threadKey!==null&&(s+=" AND thread_key = ?",n.push(e.threadKey)),e.beforeCreatedAt!==void 0&&e.beforeCreatedAt!==null&&e.beforeCreatedAt!==""&&(e.beforeMessageId!==void 0&&e.beforeMessageId!==null&&e.beforeMessageId!==""?(s+=" AND (created_at < ? OR (created_at = ? AND message_id < ?))",n.push(e.beforeCreatedAt,e.beforeCreatedAt,e.beforeMessageId)):(s+=" AND created_at < ?",n.push(e.beforeCreatedAt))),s+=" ORDER BY created_at DESC, message_id DESC LIMIT ?",n.push(t);let i=o.db.prepare(s).all(...n),a=[];for(let c of i){let d=cSe(c);d!==null&&a.push(d)}return{available:!0,rows:a}}catch{return eO(e,t)}finally{Zn(o.db)}}});var I_,tO,fSe,Qo,ySe,rO,oO=l(()=>{"use strict";I_=u(require("node:fs")),tO=u(require("node:path"));ee();te();fSe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Qo=e=>typeof e=="string"&&e.trim().length>0?e:null,ySe=e=>{try{let t=JSON.parse(I_.default.readFileSync(e,"utf8"));if(!fSe(t))return null;let r=Qo(t.taskId),o=Qo(t.projectId),n=Qo(t.status),s=Qo(t.createdAt),i=Qo(t.savedAt);if(r===null||o===null||n===null||s===null||i===null)return null;let a=t.threadKey,c=a==null?null:Qo(a);return{taskId:r,projectId:o,threadKey:c,writerAgent:Qo(t.writerAgent),status:n,promptSummary:typeof t.promptSummary=="string"?t.promptSummary:"",resultSummary:typeof t.resultSummary=="string"?t.resultSummary:"",promptBody:typeof t.promptBody=="string"?t.promptBody:null,resultBody:typeof t.resultBody=="string"?t.resultBody:null,createdAt:s,completedAt:t.completedAt===null||t.completedAt===void 0?null:Qo(t.completedAt),agentRunId:Qo(t.agentRunId),savedAt:i}}catch{return null}},rO=e=>{let t;try{t=tO.default.join(U(e),ji)}catch{return[]}if(!I_.default.existsSync(t))return[];let r=I_.default.readdirSync(t,{withFileTypes:!0}),o=[];for(let n of r){if(!n.isFile()||!n.name.endsWith(".json"))continue;let s=ySe(tO.default.join(t,n.name));s!==null&&o.push(s)}return o}});var QX,e9,nO,sO,iO=l(()=>{"use strict";Wm();QX="ai.session",e9=e=>e.agentRunId!==null&&e.agentRunId.trim().length>0?e.agentRunId.trim():e.taskId,nO=e=>{let t=e9(e),r=e.resultSummary.trim().length>0?e.resultSummary:e.promptSummary;return{messageId:t,createdAt:e.createdAt,author:{kind:"bot",membershipId:null,displayName:e.writerAgent},kind:QX,entryKind:"session",session:{status:e.status,writerAgent:e.writerAgent,agentRunId:t},text:r,needsReply:!1,inReplyTo:null,states:[]}},sO=(e,t)=>t===nc});var Bi,zm=l(()=>{"use strict";Bi=e=>{let t=e.message;for(let r of["summary","text","body","content"]){let o=t[r];if(typeof o=="string"&&o.trim().length>0)return o}return""}});var hSe,aO,lO=l(()=>{"use strict";Wm();R_();jm();zm();W0();sc();hSe=(e,t)=>e===null?"owner":t.has(e)?"bot":"member",aO=e=>{let t=e.message,r=$i(e),o=w_(t),n=je(t,["fromMembershipId","senderMembershipId","sender_membership_id"]),s=Hi(t.kind)??je(t,["messageKind"])??"chat.note",i=Hi(t.summary)??Bi(e),a=hSe(n,o),c=je(t,["inReplyTo","in_reply_to"]),d=c!==null?{inReplyTo:c,text:i}:a==="bot"?xm(i):{inReplyTo:null,text:i},p=Om(t)??je(t,["senderDisplayName","sender_display_name"]);return{messageId:e.messageId,createdAt:r.createdAt,author:{kind:a,membershipId:n,displayName:p},kind:s,text:d.text,needsReply:s===I0,inReplyTo:d.inReplyTo,states:[]}}});var SSe,PSe,cO,dO,pO=l(()=>{"use strict";SSe=/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,6})?(Z|[+-]\d{2}(:?\d{2})?)$/,PSe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),cO=e=>Buffer.from(JSON.stringify({t:e.t,id:e.id}),"utf8").toString("base64url"),dO=e=>{if(e==null||e.trim().length===0)return null;let t;try{let n=Buffer.from(e.trim(),"base64url").toString("utf8");t=JSON.parse(n)}catch{return"invalid"}if(!PSe(t))return"invalid";let r=t.t,o=t.id;return typeof r!="string"||typeof o!="string"||!SSe.test(r)||o.length===0||o.length>200?"invalid":{t:r,id:o}}});var t9,ASe,uO,mO=l(()=>{"use strict";C_();$m();oO();iO();lO();pO();t9=(e,t)=>e.createdAt!==t.createdAt?e.createdAt<t.createdAt?1:-1:e.messageId<t.messageId?1:-1,ASe=(e,t,r)=>t==null||t===""||e.createdAt<t?!0:e.createdAt>t?!1:r==null||r===""?!0:e.messageId<r,uO=e=>{let t=dO(e.beforeCursor);if(t==="invalid")return{entries:[],nextBeforeCursor:null,hasMore:!1};let r=typeof e.limit=="number"&&Number.isFinite(e.limit)?Math.max(1,Math.floor(e.limit)):50,o=t?.t??null,n=t?.id??null,s=Ui({projectId:e.projectId,threadKey:e.threadKey,beforeCreatedAt:o,beforeMessageId:n,limit:r+1}),i=[];for(let S of s.rows){let E=Dm({projectId:e.projectId,messageId:S.messageId});if(E===null){i.push({messageId:S.messageId,createdAt:S.createdAt,author:{kind:"owner",membershipId:null,displayName:null},kind:"chat.note",text:"",needsReply:!1,inReplyTo:null,states:[]});continue}i.push(aO(E))}let a=[];for(let S of rO(e.projectId)){if(!sO(S,e.threadKey))continue;let E=nO(S);ASe(E,o,n)&&a.push(E)}let c=[...i,...a].sort(t9),d=new Map;for(let S of c)d.has(S.messageId)||d.set(S.messageId,S);let p=[...d.values()].sort(t9),m=p.length>r,g=m?p.slice(0,r):p,y=g.length>0?g[g.length-1]:void 0,h=m&&y!==void 0?cO({t:y.createdAt,id:y.messageId}):null;return{entries:g,nextBeforeCursor:h,hasMore:m}}});var _Se,gO,r9=l(()=>{"use strict";mO();_Se=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),gO=e=>{if(!_Se(e.payload))return{ok:!1,errorCode:"invalid_payload",errorMessage:"project.history.page.request requires an object payload."};let t=typeof e.payload.projectId=="string"?e.payload.projectId.trim():"",r=typeof e.payload.threadKey=="string"?e.payload.threadKey.trim():"";if(t.length===0||r.length===0)return{ok:!1,errorCode:"invalid_payload",errorMessage:"projectId and threadKey are required."};let o=typeof e.payload.beforeCursor=="string"?e.payload.beforeCursor:void 0,n=e.payload.limit,s=typeof n=="number"&&Number.isFinite(n)?Math.max(1,Math.min(100,Math.floor(n))):50;try{let i=uO({projectId:t,threadKey:r,beforeCursor:o,limit:s});return{ok:!0,projectId:t,threadKey:r,entries:i.entries,nextBeforeCursor:i.nextBeforeCursor,hasMore:i.hasMore}}catch(i){return{ok:!1,errorCode:"read_failed",errorMessage:i instanceof Error?i.message:"History page read failed."}}}});var fO,yO=l(()=>{"use strict";R0();Qn();S0();te();_0();b_();fO=()=>({isHistoryEnabled:e=>{let t=uo(e);return t?.state==="on_ready"||t?.state==="degraded"},resolveProjectDataDir:e=>U(e),writeProjectSkillVersion:e=>Im(e),readProjectSkillVersion:e=>h0(e),tombstoneProjectSkill:e=>P0(e),readProjectSkillTombstone:e=>A0(e),listProjectSkillIds:e=>k0(e)})});var o9,hO,SO=l(()=>{"use strict";At();o9=e=>({[ae]:e,Accept:"application/json"}),hO=e=>({listPublished:async t=>{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/skills/published`,{method:"GET",headers:o9(e.pairingToken),signal:AbortSignal.timeout(3e4)});if(!r.ok)throw new Error(`listPublished http ${r.status}`);let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0||!Array.isArray(o.skills))throw new Error("listPublished malformed body");return o.skills.map((s,i)=>{if(typeof s!="object"||s===null||typeof s.skillId!="string"||typeof s.publishedVersion!="number"||typeof s.contentHash!="string")throw new Error(`listPublished row ${i} missing version/contentHash`);let a=s;return{skillId:a.skillId,publishedVersion:a.publishedVersion,contentHash:a.contentHash,...typeof a.skillRowId=="string"?{skillRowId:a.skillRowId}:{}}})},getPublishedBody:async t=>{let r=new URL(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t.projectId)}/skills/published/${encodeURIComponent(t.skillId)}`);r.searchParams.set("version",String(t.version));let o=await fetch(r.toString(),{method:"GET",headers:o9(e.pairingToken),signal:AbortSignal.timeout(3e4)});if(o.status===404)return null;if(!o.ok)throw new Error(`getPublishedBody http ${o.status}`);let n=await o.json();if(typeof n!="object"||n===null||n.ok!==!0||typeof n.body!="string"||typeof n.contentHash!="string")throw new Error("getPublishedBody malformed body");return{body:n.body,contentHash:n.contentHash}}})});var PO,AO=l(()=>{"use strict";He();PO=e=>{let t=e.runCap??3e4,r=e.dayCap??1e5,o=Math.max(0,e.tokensUsedToday),n=Math.max(0,r-o),s=Math.max(0,e.estimatedRunTokens??0);return n<=0?{ok:!1,reason:"day_cap",remainingToday:0}:s>t?{ok:!1,reason:"run_cap",remainingToday:n}:s>n?{ok:!1,reason:"day_cap",remainingToday:n}:{ok:!0,remainingToday:n,runCap:Math.min(t,n)}}});var _O,bO=l(()=>{"use strict";He();_O=e=>{let t=e.messageCountCap??20,r=e.idleMs??18e5,o=e.maxIntervalMs??864e5,n=e.messages;if(n.length===0)return{ready:!1,reason:"empty"};let s=Math.max(...n.map(p=>p.createdAtMs)),i=n.length>=t,a=e.nowMs-s>=r,c=e.lastClosedAtMs===null||e.nowMs-e.lastClosedAtMs>=o;return!i&&!a&&!c?{ready:!1,reason:"below_triggers"}:{ready:!0,reason:i?"count":a?"idle":"max_interval",messageIds:n.map(p=>p.messageId)}}});var pc,L_=l(()=>{"use strict";He();pc=e=>{let t=e.maxOpenDrafts??20,r=Math.max(0,e.openDraftCount),o=r>=t;return{draftWaitingCount:r,capReached:o,miningPaused:o}}});var c9,d9,kSe,v_,kO=l(()=>{"use strict";He();c9=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,""),d9=e=>e.trim().toLowerCase().replace(/\s+/g," "),kSe=(e,t)=>{let r=new Set(e.map(d9).filter(i=>i.length>0)),o=new Set(t.map(d9).filter(i=>i.length>0));if(r.size===0||o.size===0)return 0;let n=0;for(let i of r)o.has(i)&&(n+=1);let s=r.size+o.size-n;return s===0?0:n/s},v_=e=>{let t=e.nearDupJaccard??.6,r=c9(e.name);for(let o of e.existingPublished)if(o.contentHash===e.contentHash)return{action:"skip_exact",matchKind:"published",matchId:o.id};for(let o of e.existingDrafts)if(o.contentHash===e.contentHash)return{action:"skip_exact",matchKind:"draft",matchId:o.id};for(let o of e.existingDrafts){if(c9(o.name)===r&&r.length>0)return{action:"update_draft",draftId:o.id,reason:"same_name"};if(kSe(e.stepLines,o.stepLines)>=t)return{action:"update_draft",draftId:o.id,reason:"similar_steps"}}return{action:"create_new"}}});var RO,wO=l(()=>{"use strict";RO=e=>e.estimatedInputTokens>e.inputTokenCap?"reflect_then_write":"write"});var EO,wSe,TO,ESe,CO,IO=l(()=>{"use strict";He();EO=e=>{let t=e.minMessages??3,r=Math.max(0,e.messageCount);return e.ownerMarkedSaveAsSkill?r<1?{ok:!1,reason:"too_short"}:{ok:!0,reason:"owner_mark"}:r<t?{ok:!1,reason:"too_short"}:e.hasSuccessSignal?{ok:!0,reason:"success_signal"}:{ok:!1,reason:"no_success_signal"}},wSe=/\b(done|landed|tests?\s+green|thumbs?\s*-?\s*up|all\s+tests?\s+pass(?:ed)?|shipped)\b/i,TO=e=>wSe.test(e),ESe=/\b(save\s+as\s+skill|mark\s+as\s+skill|promote\s+to\s+skill)\b/i,CO=e=>ESe.test(e)});var Um,x_=l(()=>{"use strict";Um=e=>({at:e.nowIso??new Date().toISOString(),projectId:e.projectId,episodeId:e.episodeId,fromState:e.fromState,toState:e.toState,reason:e.reason??null,tokensUsed:Math.max(0,e.tokensUsed??0),openDraftCount:Math.max(0,e.openDraftCount??0)})});var p9,en,u9,uc=l(()=>{"use strict";St();p9=/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,en=e=>{let t=Pn(e),r=t.scrubbed.match(p9)?.length??0,o=t.scrubbed.replace(p9,"[redacted-email]");return{scrubbed:o,residualSecret:Hd(o),replacementCount:t.replacementCount+r}},u9=e=>Hd(e)});var m9,TSe,CSe,ISe,LSe,g9,f9=l(()=>{"use strict";m9="source_message_ids",TSe=e=>Array.from(new Set(e.map(t=>t.trim()).filter(t=>t.length>0))),CSe=e=>e.trimStart().startsWith(`${m9}:`),ISe=e=>/^\s+-\s*/.test(e),LSe=e=>e.reduce((t,r)=>CSe(r)?{kept:t.kept,skipping:!0}:t.skipping&&ISe(r)?t:{kept:[...t.kept,r],skipping:!1},{kept:[],skipping:!1}).kept,g9=e=>{let t=e.skillMarkdown.replace(/^\uFEFF/,"");if(!t.startsWith("---"))return e.skillMarkdown;let r=t.indexOf(`
---`,3);if(r<0)return e.skillMarkdown;let o=t.slice(0,3),n=t.slice(3,r).replace(/^\r?\n/,"").split(/\r?\n/).filter((a,c,d)=>!(c===d.length-1&&a==="")),s=TSe(e.sourceMessageIds),i=[...LSe(n),`${m9}: ${JSON.stringify(s)}`];return`${o}
${i.join(`
`)}${t.slice(r)}`}});var LO,vO,xO,Bm=l(()=>{"use strict";LO=["CAPTURING","EPISODE_READY","SCRUBBING","TRIAGE","DEDUP","EXTRACT","VALIDATE","AWAITING_REVIEW","PUBLISHED","SKIPPED_COST","SKIPPED_FILTER","SKIPPED_DEDUP","QUARANTINED","FAILED_EXTRACT","FAILED_VALIDATE","REJECTED"],vO={CAPTURING:{episode_closed:"EPISODE_READY"},EPISODE_READY:{budget_ok:"SCRUBBING",budget_exceeded:"SKIPPED_COST",draft_cap_reached:"EPISODE_READY"},SCRUBBING:{scrub_ok:"TRIAGE",scrub_quarantine:"QUARANTINED"},TRIAGE:{qualify_ok:"DEDUP",qualify_reject:"SKIPPED_FILTER"},DEDUP:{dedup_novel:"EXTRACT",dedup_merge:"EXTRACT",dedup_skip:"SKIPPED_DEDUP"},EXTRACT:{extract_ok:"VALIDATE",extract_fail:"FAILED_EXTRACT"},VALIDATE:{validate_ok:"AWAITING_REVIEW",validate_retry:"EXTRACT",validate_fail:"FAILED_VALIDATE"},AWAITING_REVIEW:{owner_publish:"PUBLISHED",owner_discard:"REJECTED"},PUBLISHED:{},SKIPPED_COST:{},SKIPPED_FILTER:{},SKIPPED_DEDUP:{},QUARANTINED:{},FAILED_EXTRACT:{},FAILED_VALIDATE:{},REJECTED:{}},xO=["CAPTURING","EPISODE_READY","SCRUBBING","TRIAGE","DEDUP","EXTRACT","VALIDATE"]});var WO,OO=l(()=>{"use strict";Bm();WO=(e,t)=>{let r=vO[e][t];return r===void 0?{ok:!1,from:e,event:t}:{ok:!0,state:r}}});var vSe,mo,MO=l(()=>{"use strict";OO();He();vSe=(e,t)=>{switch(t.kind){case"close":return e==="CAPTURING"&&t.ready?"episode_closed":null;case"draft_cap":return e==="EPISODE_READY"&&t.reached?"draft_cap_reached":null;case"budget":return e!=="EPISODE_READY"?null:t.ok?"budget_ok":"budget_exceeded";case"scrub":return e!=="SCRUBBING"?null:t.residualSecret?"scrub_quarantine":"scrub_ok";case"qualify":return e!=="TRIAGE"?null:t.ok?"qualify_ok":"qualify_reject";case"dedup":return e!=="DEDUP"?null:t.action==="skip_exact"?"dedup_skip":t.action==="update_draft"||t.action==="create_new"?t.action==="update_draft"?"dedup_merge":"dedup_novel":null;case"extract":return e!=="EXTRACT"?null:t.ok?"extract_ok":"extract_fail";case"validate":return e!=="VALIDATE"?null:t.ok?"validate_ok":t.attempts<=1?"validate_retry":"validate_fail";case"owner":return e!=="AWAITING_REVIEW"?null:t.decision==="publish"?"owner_publish":"owner_discard";default:return t}},mo=e=>{let t=vSe(e.state,e.verdict);if(t===null)return{ok:!1,reason:e.verdict.kind==="close"&&!e.verdict.ready?"not_ready":"no_transition",state:e.state};let r=WO(e.state,t);return r.ok?{ok:!0,event:t,nextState:r.state}:{ok:!1,reason:"illegal_event",state:e.state,event:t}}});var OSe,y9,jSe,MSe,NO,Gm,W_=l(()=>{"use strict";He();uc();OSe=/^[a-z0-9][a-z0-9-]{0,63}$/,y9=e=>{let t=e.replace(/^\uFEFF/,"");if(!t.startsWith("---"))return null;let r=t.indexOf(`
---`,3);if(r<0)return null;let o=t.slice(3,r).replace(/^\r?\n/,""),n=t.slice(r+4).replace(/^\r?\n/,""),s={};for(let i of o.split(/\r?\n/)){let a=i.indexOf(":");if(a<=0)continue;let c=i.slice(0,a).trim(),d=i.slice(a+1).trim().replace(/^["']|["']$/g,"");c.length>0&&(s[c]=d)}return{fm:s,body:n}},jSe=e=>(e.match(/(?:^|\n)##?\s*Steps?\s*\n([\s\S]*?)(?=\n##?\s+\S|$)/i)?.[1]??e).match(/^\s*(?:\d+\.|[-*])\s+\S+/gm)?.length??0,MSe=e=>{if(e===void 0||e.trim().length===0)return null;let t=e.trim();if(t.startsWith("["))try{let r=JSON.parse(t.replace(/'/g,'"'));return Array.isArray(r)?r.filter(o=>typeof o=="string"):null}catch{return t.replace(/^\[|\]$/g,"").split(",").map(r=>r.trim().replace(/^["']|["']$/g,"")).filter(r=>r.length>0)}return t.split(",").map(r=>r.trim()).filter(r=>r.length>0)},NO=e=>{let t=e.minSteps??2,r=e.maxBodyBytes??65536,o=e.skillMarkdown;if(o.trim().length===0)return{ok:!1,reason:"empty"};let n=Buffer.byteLength(o,"utf8");if(n>r)return{ok:!1,reason:"body_too_large"};if(u9(o))return{ok:!1,reason:"residual_secret"};let s=y9(o);if(s===null)return{ok:!1,reason:"missing_frontmatter"};let{fm:i,body:a}=s,c=i.name??"";if(!OSe.test(c))return{ok:!1,reason:"invalid_name"};let d=i.description??"";if(d.trim().length===0)return{ok:!1,reason:"missing_description"};let p=i.version??"";if(p.trim().length===0)return{ok:!1,reason:"missing_version"};if((i.status??"").trim()!=="draft")return{ok:!1,reason:"missing_status_draft"};let m=MSe(i.source_message_ids??i.source_message_ids);if(m===null||m.length===0)return{ok:!1,reason:"missing_source_message_ids"};let g=jSe(a);return g<t?{ok:!1,reason:"too_few_steps"}:{ok:!0,name:c,description:d,version:p,sourceMessageIds:m,stepCount:g,bodyBytes:n}},Gm=e=>(((y9(e)?.body??e).match(/(?:^|\n)##?\s*Steps?\s*\n([\s\S]*?)(?=\n##?\s+\S|$)/i)?.[1]??"").match(/^\s*(?:\d+\.|[-*])\s+(.+)$/gm)??[]).map(i=>i.replace(/^\s*(?:\d+\.|[-*])\s+/,"").trim())});var S9,NSe,go,O_,j_=l(()=>{"use strict";S9=require("node:crypto");Jn();He();AO();bO();L_();kO();wO();IO();x_();uc();f9();MO();W_();NSe=e=>Math.ceil(e.length/4),go=(e,t,r,o={})=>({...e,...o,state:t,reason:r}),O_=async e=>{let t=e.episode,r=[],o=null,n=0,s=null,i=e.deps.estimateTokens??NSe,a=e.messages.map(p=>p.text).join(`
`),c=(p,m,g)=>{r.push(Um({projectId:t.projectId,episodeId:t.episodeId,fromState:p,toState:m,reason:g,tokensUsed:n,openDraftCount:e.deps.openDraftCount(),nowIso:new Date(e.nowMs).toISOString()}))};for(let p=0;p<16;p+=1){let m=pc({openDraftCount:e.deps.openDraftCount()});if(t.state==="CAPTURING"){let g=_O({messages:e.messages.map(S=>({messageId:S.messageId,createdAtMs:S.createdAtMs})),nowMs:e.nowMs,lastClosedAtMs:e.lastClosedAtMs}),y=mo({state:t.state,verdict:{kind:"close",ready:g.ready}});if(!y.ok)break;let h=t.state;t=go(t,y.nextState,g.ready?g.reason:null,{messageIds:g.ready?g.messageIds:t.messageIds,closedAtMs:g.ready?e.nowMs:t.closedAtMs,ownerMarkedSaveAsSkill:e.messages.some(S=>CO(S.text)),hasSuccessSignal:e.messages.some(S=>TO(S.text))}),c(h,t.state,t.reason);continue}if(t.state==="EPISODE_READY"){if(m.capReached){let S=mo({state:t.state,verdict:{kind:"draft_cap",reached:!0}});S.ok&&(c(t.state,S.nextState,"draft_cap_reached"),t=go(t,S.nextState,"draft_cap_reached"));break}let g=PO({tokensUsedToday:e.tokensUsedToday+n}),y=mo({state:t.state,verdict:{kind:"budget",ok:g.ok}});if(!y.ok)break;let h=t.state;t=go(t,y.nextState,g.ok?"budget_ok":g.reason),c(h,t.state,t.reason);continue}if(t.state==="SCRUBBING"){let g=en(a),y=mo({state:t.state,verdict:{kind:"scrub",residualSecret:g.residualSecret}});if(!y.ok)break;let h=t.state;t=go(t,y.nextState,g.residualSecret?"scrub_quarantine":"scrub_ok",{scrubbedTranscript:g.scrubbed}),c(h,t.state,t.reason);continue}if(t.state==="TRIAGE"){let g=EO({messageCount:t.messageIds.length,ownerMarkedSaveAsSkill:t.ownerMarkedSaveAsSkill,hasSuccessSignal:t.hasSuccessSignal}),y=mo({state:t.state,verdict:{kind:"qualify",ok:g.ok}});if(!y.ok)break;let h=t.state;t=go(t,y.nextState,g.reason),c(h,t.state,t.reason);continue}if(t.state==="DEDUP"){let g=Ye(t.scrubbedTranscript??a),y=v_({contentHash:g,name:"",stepLines:[],existingDrafts:e.deps.listDraftFingerprints(),existingPublished:e.deps.listPublishedFingerprints()});if((y.action==="create_new"||y.action==="update_draft")&&e.deps.ownerLlm===null){c(t.state,t.state,"owner_llm_unconfigured");break}let h=mo({state:t.state,verdict:{kind:"dedup",action:y.action}});if(!h.ok)break;let S=t.state;t=go(t,h.nextState,y.action,{contentHash:g,mergeDraftId:y.action==="update_draft"?y.draftId:t.mergeDraftId}),c(S,t.state,t.reason);continue}if(t.state==="EXTRACT"){if(e.deps.ownerLlm===null){c(t.state,t.state,"owner_llm_unconfigured");break}let g=t.scrubbedTranscript??"",y=RO({estimatedInputTokens:i(g),inputTokenCap:12e3}),h=await e.deps.ownerLlm({scrubbedTranscript:g,similarDraftHints:[],mode:y});n+=h.tokensUsed;let S=mo({state:t.state,verdict:{kind:"extract",ok:h.ok}});if(!S.ok)break;let E=t.state;h.ok&&(s=g9({skillMarkdown:h.skillMarkdown,sourceMessageIds:t.messageIds})),t=go(t,S.nextState,h.ok?"extract_ok":h.reason,{tokensUsed:t.tokensUsed+h.tokensUsed}),c(E,t.state,t.reason);continue}if(t.state==="VALIDATE"){let g=s??"",y=NO({skillMarkdown:g}),h=t.validateAttempts+(y.ok?0:1),S=mo({state:t.state,verdict:{kind:"validate",ok:y.ok,attempts:y.ok?t.validateAttempts:Math.max(1,h)}});if(!S.ok)break;let E=t.state;if(y.ok){let I=Ye(g),f=Gm(g),w=v_({contentHash:I,name:y.name,stepLines:f,existingDrafts:e.deps.listDraftFingerprints(),existingPublished:e.deps.listPublishedFingerprints()});if(w.action==="skip_exact"){t=go(t,"SKIPPED_DEDUP","skip_exact",{contentHash:I,validateAttempts:h}),c(E,t.state,"skip_exact");break}let W=w.action==="update_draft"?w.draftId:t.mergeDraftId??(0,S9.randomUUID)();o=e.deps.writeDraft({projectId:t.projectId,draftId:W,skillMarkdown:g,episodeId:t.episodeId,sourceMessageIds:y.sourceMessageIds,name:y.name,description:y.description}),t=go(t,S.nextState,"validate_ok",{draftId:W,contentHash:o.contentHash,validateAttempts:h}),c(E,t.state,t.reason);break}if(S.nextState==="EXTRACT"&&(s=null),t=go(t,S.nextState,y.reason,{validateAttempts:h}),c(E,t.state,t.reason),S.nextState==="EXTRACT"&&h>1)break;continue}break}let d=pc({openDraftCount:e.deps.openDraftCount()});return{episode:t,metrics:r,reviewFlag:d,draftWritten:o,tokensSpent:n}}});var DO,HO,Km,M_=l(()=>{"use strict";DO=u(require("node:fs")),HO=u(require("node:path"));ft();ee();te();Km=e=>{if(e.events.length===0)return;let t=ge(e.projectId),r=HO.default.join(t,Te);wt(r);let o=HO.default.join(r,PX),n=`${e.events.map(s=>JSON.stringify(s)).join(`
`)}
`;DO.default.appendFileSync(o,n,{mode:384});try{DO.default.chmodSync(o,384)}catch{}}});var mc,N_=l(()=>{"use strict";mc=e=>e.trim().toLowerCase().replace(/\s+/g," ").replace(/[.,;:!?]+$/g,"")});var b9,P9,A9,HSe,FSe,FO,$O=l(()=>{"use strict";b9=require("node:crypto");He();N_();uc();P9=(e,t)=>e.length<=t?e:`${e.slice(0,Math.max(0,t-1)).trimEnd()}\u2026`,A9=e=>e.toLowerCase().replace(/_/g," "),HSe=(e,t)=>`sha256:${(0,b9.createHash)("sha256").update(`${e}
${t}`,"utf8").digest("hex")}`,FSe=(e,t)=>{let r=t.replace(/^sha256:/,"").slice(0,12);return`hist-${e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,40)||"ep"}-${r}`.slice(0,64)},FO=e=>{let t=e.maxPerDraft??8,r=e.maxStored??64,o=e.nowIso??new Date().toISOString(),n=new Set,s=[],i=[],a=0;for(let c of e.failures){let d=c.reason!==null&&c.reason.trim().length>0?c.reason.trim():A9(c.state),p=en(d);if(p.residualSecret){a+=1;continue}let m=`Avoid repeating this history failure (${A9(c.state)}).`,g=en(m);if(g.residualSecret){a+=1;continue}let y=P9(p.scrubbed.replace(/\s+/g," ").trim(),120),h=P9(g.scrubbed.replace(/\s+/g," ").trim(),280);if(y.length===0||h.length===0)continue;let S=mc(`${y}|${h}`);if(n.has(S))continue;n.add(S);let E=HSe(y,h),I=`- **${y}:** ${h}`;s.length<t&&s.push(I),i.length<r&&i.push({id:FSe(c.episodeId,E),symptom:y,avoidance:h,sourceEpisodeId:c.episodeId,sourceState:c.state,contentHash:E,createdAt:o})}return{skillPitfallLines:s,localEntries:i,skippedSecretCount:a}}});var $Se,zO,UO=l(()=>{"use strict";N_();He();$Se=e=>{let t=[];for(let r of e.split(/\r?\n/)){let o=r.trim();/^[-*]\s+\S/.test(o)?t.push(o.replace(/^\*\s+/,"- ")):/^\d+\.\s+\S/.test(o)&&t.push(o.replace(/^\d+\.\s+/,"- "))}return t},zO=e=>{let t=e.maxBullets??8,r=e.skillMarkdown,o=/(^|\n)(##\s*Pitfalls\s*\n)([\s\S]*?)(?=\n##\s+\S|$)/i,n=r.match(o),s=n?$Se(n[3]??""):[],i=new Set(s.map(m=>mc(m))),a=[...s],c=0;for(let m of e.newPitfallLines){let g=m.trim();if(g.length===0)continue;let y=g.startsWith("- ")?g:`- ${g}`,h=mc(y);if(!i.has(h)){if(a.length>=t)break;i.add(h),a.push(y),c+=1}}let d=a.length>0?`${a.join(`
`)}
`:`(none yet)
`;if(n)return{skillMarkdown:r.replace(o,(g,y,h)=>`${y}${h}${d}`),appendedCount:c,totalPitfallBullets:a.length};let p=r.endsWith(`
`)?"":`
`;return{skillMarkdown:`${r}${p}
## Pitfalls
${d}`,appendedCount:c,totalPitfallBullets:a.length}}});var BO,R9,k9,F_,GO,KO=l(()=>{"use strict";BO=u(require("node:fs")),R9=u(require("node:path"));ee();te();k9="[project-history-skillgen]",F_=()=>({items:[],updatedAt:new Date(0).toISOString()}),GO=e=>{let t=R9.default.join(U(e),Te,h_);if(!BO.default.existsSync(t))return F_();try{let r=JSON.parse(BO.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.items)?(console.error(k9,"learned_pitfalls_corrupt",e),F_()):{items:r.items,updatedAt:typeof r.updatedAt=="string"?r.updatedAt:F_().updatedAt}}catch(r){return console.error(k9,"learned_pitfalls_read_failed",e,r),F_()}}});var zSe,w9,E9=l(()=>{"use strict";zSe=["FAILED_EXTRACT","FAILED_VALIDATE","QUARANTINED","SKIPPED_FILTER"],w9=e=>zSe.includes(e)});var VO,qO=l(()=>{"use strict";E9();VO=e=>{let t=[];for(let r of e.episodes)e.excludeEpisodeId!==void 0&&e.excludeEpisodeId!==null&&r.episodeId===e.excludeEpisodeId||w9(r.state)&&t.push({episodeId:r.episodeId,state:r.state,reason:r.reason});return t}});var JO,Vm,USe,qm,$_,z_=l(()=>{"use strict";JO=u(require("node:fs")),Vm=u(require("node:path"));Jn();ft();ee();te();USe=e=>e.length>0&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),qm=e=>{if(!USe(e.draftId))throw new Error("invalid_draft_id");let t=ge(e.projectId),r=Vm.default.join(t,se,Rt,e.draftId);wt(r);let o=Vm.default.join(r,Kn),n=Vm.default.join(r,Vn),s=Ye(e.skillMarkdown);return ie(o,e.skillMarkdown),ie(n,`${JSON.stringify({draftId:e.draftId,episodeId:e.episodeId,name:e.name,description:e.description,sourceMessageIds:e.sourceMessageIds,contentHash:s,status:"draft",updatedAt:new Date().toISOString()})}
`),{draftDir:r,skillPath:o,metaPath:n,contentHash:s}},$_=e=>{let t=ge(e),r=Vm.default.join(t,se,Rt);return JO.default.existsSync(r)?JO.default.readdirSync(r,{withFileTypes:!0}).filter(o=>o.isDirectory()&&!o.name.startsWith(".")).length:0}});var T9,YO,XO=l(()=>{"use strict";T9=u(require("node:path"));ft();ee();te();YO=e=>{let t=ge(e.projectId),r=T9.default.join(t,Te,h_),o={...e.file,updatedAt:new Date().toISOString()};return ie(r,`${JSON.stringify(o)}
`),o}});var ZO,I9,C9,U_,BSe,Jm,B_=l(()=>{"use strict";ZO=u(require("node:fs")),I9=u(require("node:path"));ee();te();C9="[project-history-skillgen]",U_=()=>({historyLearnedPitfalls:null,skillgenDraftsReview:null,updatedAt:new Date(0).toISOString()}),BSe=e=>{if(typeof e!="object"||e===null)return null;let t=e;return typeof t.active!="boolean"||typeof t.openDraftCount!="number"||typeof t.maxOpenDrafts!="number"||typeof t.miningPaused!="boolean"||typeof t.notifiedAt!="string"||typeof t.summary!="string"?null:{active:t.active,openDraftCount:Math.max(0,t.openDraftCount),maxOpenDrafts:Math.max(0,t.maxOpenDrafts),miningPaused:t.miningPaused,notifiedAt:t.notifiedAt,summary:t.summary}},Jm=e=>{let t=I9.default.join(U(e),Te,S_);if(!ZO.default.existsSync(t))return U_();try{let r=JSON.parse(ZO.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return console.error(C9,"flags_corrupt",e),U_();let o=r;return{historyLearnedPitfalls:o.historyLearnedPitfalls??null,skillgenDraftsReview:BSe(o.skillgenDraftsReview),updatedAt:typeof o.updatedAt=="string"?o.updatedAt:U_().updatedAt}}catch(r){return console.error(C9,"flags_read_failed",e,r),U_()}}});var L9,Ym,G_=l(()=>{"use strict";L9=u(require("node:path"));ft();ee();te();Ym=e=>{let t=ge(e.projectId),r=L9.default.join(t,Te,S_),o={historyLearnedPitfalls:e.file.historyLearnedPitfalls,skillgenDraftsReview:e.file.skillgenDraftsReview??null,updatedAt:new Date().toISOString()};return ie(r,`${JSON.stringify(o)}
`),o}});var ej,v9,QO,GSe,KSe,K_,tj,rj=l(()=>{"use strict";ej=u(require("node:fs")),v9=u(require("node:path"));M_();$O();UO();He();KO();x_();qO();z_();XO();B_();G_();QO="[project-history-skillgen]",GSe=(e,t)=>{let r=new Map;for(let o of e)r.set(o.contentHash,o);for(let o of t)r.set(o.contentHash,o);return[...r.values()].slice(-64)},KSe=e=>{try{let t=JSON.parse(ej.default.readFileSync(e,"utf8"));return{name:typeof t.name=="string"?t.name:"draft",description:typeof t.description=="string"?t.description:"",sourceMessageIds:Array.isArray(t.sourceMessageIds)?t.sourceMessageIds.filter(r=>typeof r=="string"):[]}}catch{return{name:"draft",description:"",sourceMessageIds:[]}}},K_=e=>{try{Km({projectId:e.projectId,events:[Um({projectId:e.projectId,episodeId:e.episodeId,fromState:e.state,toState:e.state,reason:e.reason,tokensUsed:0,nowIso:e.nowIso})]})}catch{}},tj=e=>{let t=new Date(e.nowMs).toISOString();try{let r=VO({episodes:e.episodes,excludeEpisodeId:e.successEpisode.episodeId}),o=FO({failures:r,nowIso:t});if(o.skillPitfallLines.length===0&&o.localEntries.length===0)return{appendedCount:0,storedCount:0,ok:!0};let n=0;try{let s=KSe(e.draftWritten.metaPath),i=ej.default.readFileSync(e.draftWritten.skillPath,"utf8"),a=zO({skillMarkdown:i,newPitfallLines:o.skillPitfallLines});n=a.appendedCount,a.skillMarkdown!==i&&qm({projectId:e.projectId,draftId:v9.default.basename(e.draftWritten.draftDir),skillMarkdown:a.skillMarkdown,episodeId:e.successEpisode.episodeId,sourceMessageIds:s.sourceMessageIds,name:s.name,description:s.description})}catch(s){console.error(QO,"pitfalls_draft_merge_failed",e.projectId,s),K_({projectId:e.projectId,episodeId:e.successEpisode.episodeId,state:e.successEpisode.state,reason:"pitfalls_draft_merge_failed",nowIso:t})}try{let s=GO(e.projectId),i=GSe(s.items,o.localEntries);YO({projectId:e.projectId,file:{items:i,updatedAt:t}});let a=Jm(e.projectId);return Ym({projectId:e.projectId,file:{historyLearnedPitfalls:i.length===0?null:{active:!0,count:i.length,updatedAt:t,summary:`${i.length} recent pitfalls from project history (local)`},skillgenDraftsReview:a.skillgenDraftsReview,updatedAt:t}}),K_({projectId:e.projectId,episodeId:e.successEpisode.episodeId,state:e.successEpisode.state,reason:"pitfalls_attached",nowIso:t}),{appendedCount:n,storedCount:i.length,ok:!0}}catch(s){return console.error(QO,"pitfalls_store_failed",e.projectId,s),K_({projectId:e.projectId,episodeId:e.successEpisode.episodeId,state:e.successEpisode.state,reason:"pitfalls_store_failed",nowIso:t}),{appendedCount:n,storedCount:0,ok:!1}}}catch(r){return console.error(QO,"pitfalls_attach_failed",e.projectId,r),K_({projectId:e.projectId,episodeId:e.successEpisode.episodeId,state:e.successEpisode.state,reason:"pitfalls_attach_failed",nowIso:t}),{appendedCount:0,storedCount:0,ok:!1}}}});var x9,oj,nj,sj=l(()=>{"use strict";x9=e=>e.length===0?"(none)":e.map(t=>`- ${t.name}: ${t.description}`).join(`
`),oj=e=>["You are preparing a reusable project skill from a scrubbed chat transcript.","Do NOT invent secrets. Summarize the procedure only.","Return a short reflection covering: goal, inputs, 3\u20138 concrete steps,","pitfalls, and how to verify success. Plain text, no SKILL.md yet.","","Similar existing drafts/skills to avoid overlap:",x9(e.similarDraftHints),"","Transcript:",e.scrubbedTranscript].join(`
`),nj=e=>{let t=e.reflection!==void 0&&e.reflection.trim().length>0?["","Prior reflection (use as outline):",e.reflection.trim(),""]:[""];return["Write ONE SKILL.md draft from the scrubbed transcript.","Output ONLY the markdown file: YAML frontmatter then body.","Frontmatter keys: name (kebab-case), description, version: 0.1.0, status: draft.","Do NOT write source_message_ids; the system adds the transcript message ids.","Body sections: When to use, Inputs, Steps (3\u20138, use placeholders for specifics),","Pitfalls, Verification.","Avoid overlapping similar drafts/skills listed below.","","Similar existing drafts/skills:",x9(e.similarDraftHints),...t,"Transcript:",e.scrubbedTranscript].join(`
`)}});var ij,aj=l(()=>{"use strict";ij=e=>{let t=e.trim();if(t.length===0)return null;let r=t.match(/```(?:markdown|md|skill)?\s*\n([\s\S]*?)```/i);if(r?.[1]!==void 0&&r[1].trim().length>0)return r[1].trim();let o=t.indexOf("---");if(o>=0){let n=t.slice(o).trim();if(/^---[\s\S]*?\n---/.test(n))return n}return t.includes("## Steps")||t.includes("## When to use")?t:null}});var j9,M9,VSe,qSe,JSe,W9,N9,YSe,O9,lj,cj=l(()=>{"use strict";j9=require("node:child_process"),M9=u(require("node:os"));uA();He();sj();aj();VSe="cursor",qSe="codex",JSe=18e4,W9=e=>Math.ceil(e.length/4),N9=e=>new Promise(t=>{let r=er(e.writerAgent,e.prompt,Re({}));if(r===null){t({ok:!1,reason:"writer_cli_unavailable",tokensUsed:0});return}let o=[],n=[],s=(0,j9.spawn)(r.command,[...r.args],{cwd:M9.default.homedir(),stdio:["ignore","pipe","pipe"]}),i=!1,a=d=>{i||(i=!0,clearTimeout(c),t(d))},c=setTimeout(()=>{s.kill("SIGTERM"),a({ok:!1,reason:"writer_timeout",tokensUsed:0})},e.timeoutMs);s.stdout.on("data",d=>{o.push(Buffer.from(d))}),s.stderr.on("data",d=>{n.push(Buffer.from(d))}),s.on("error",()=>a({ok:!1,reason:"writer_start_failed",tokensUsed:0})),s.on("close",()=>{let d=`${Buffer.concat(o).toString("utf8")}
${Buffer.concat(n).toString("utf8")}`;a({ok:!0,text:d,tokensUsed:W9(e.prompt)+W9(d)})})}),YSe=`---
name: history-skill-dry-run
description: Stub skill from owner-LLM dry-run (no CLI spawn).
version: 0.1.0
source_message_ids: []
status: draft
---
## When to use
Dry-run only.

## Inputs
- None

## Steps
1. Replace this stub with a real draft
2. Verify frontmatter and sections

## Pitfalls
- Dry-run never calls Cursor or Codex

## Verification
- Confirm SKILL.md validates locally
`,O9=async(e,t,r)=>{let o=await e({writerAgent:VSe,prompt:t,timeoutMs:r});if(o.ok)return o;let n=await e({writerAgent:qSe,prompt:t,timeoutMs:r});return n.ok?n:{ok:!1,reason:`cursor:${o.reason};codex:${n.reason}`,tokensUsed:o.tokensUsed+n.tokensUsed}},lj=(e={})=>{let t=e.runCli??N9,r=e.timeoutMs??JSe,o=e.dryRun===!0||process.env[N0]==="1";return async n=>{if(o)return{ok:!0,skillMarkdown:YSe,tokensUsed:1};let s,i=0;if(n.mode==="reflect_then_write"){let d=await O9(t,oj({scrubbedTranscript:n.scrubbedTranscript,similarDraftHints:n.similarDraftHints}),r);if(i+=d.tokensUsed,!d.ok)return{ok:!1,reason:d.reason,tokensUsed:i};s=d.text}let a=await O9(t,nj({scrubbedTranscript:n.scrubbedTranscript,similarDraftHints:n.similarDraftHints,mode:n.mode,reflection:s}),r);if(i+=a.tokensUsed,!a.ok)return{ok:!1,reason:a.reason,tokensUsed:i};let c=ij(a.text);return c===null?{ok:!1,reason:"empty_or_unparseable_skill_markdown",tokensUsed:i}:{ok:!0,skillMarkdown:c,tokensUsed:i}}}});var D9,H9=l(()=>{"use strict";Bm();D9=(e,t)=>{for(let r=e.length-1;r>=0;r-=1){let o=e[r];if(o.projectId===t&&xO.includes(o.state))return o}return null}});var Gi,Xm=l(()=>{"use strict";Gi=e=>e==="on_ready"||e==="degraded"||e==="on_configuring"});var Ki,V_,F9,$9=l(()=>{"use strict";Ki=u(require("node:fs")),V_=u(require("node:path"));ee();te();W_();F9=e=>{let t=V_.default.join(U(e),se,Rt);if(!Ki.default.existsSync(t))return[];let r=[];for(let o of Ki.default.readdirSync(t,{withFileTypes:!0})){if(!o.isDirectory()||o.name.startsWith("."))continue;let n=V_.default.join(t,o.name,Kn),s=V_.default.join(t,o.name,Vn);if(Ki.default.existsSync(n))try{let i=Ki.default.readFileSync(n,"utf8"),a="",c=o.name;if(Ki.default.existsSync(s)){let d=JSON.parse(Ki.default.readFileSync(s,"utf8"));typeof d.contentHash=="string"&&(a=d.contentHash),typeof d.name=="string"&&d.name.length>0&&(c=d.name)}if(a.length===0)continue;r.push({id:o.name,contentHash:a,name:c,stepLines:Gm(i)})}catch{}}return r}});var Zm,dj,z9,U9=l(()=>{"use strict";Zm=u(require("node:fs")),dj=u(require("node:path"));ee();te();z9=e=>{let t=dj.default.join(U(e),se);if(!Zm.default.existsSync(t))return[];let r=[];for(let o of Zm.default.readdirSync(t,{withFileTypes:!0})){if(!o.isDirectory()||o.name.startsWith("_"))continue;let n=dj.default.join(t,o.name,Dr);if(Zm.default.existsSync(n))try{let s=JSON.parse(Zm.default.readFileSync(n,"utf8"));if(typeof s.contentHash!="string")continue;r.push({id:o.name,contentHash:s.contentHash,name:typeof s.skillId=="string"?s.skillId:o.name,stepLines:[]})}catch{}}return r}});var XSe,pj,uj=l(()=>{"use strict";zm();Hm();XSe=(e,t,r,o)=>r===null||e>r?!0:e<r?!1:o===null?!0:t.localeCompare(o)>0,pj=e=>{let t=zi(e.projectId),r=[];for(let o of t){let n=Date.parse(o.savedAt);Number.isNaN(n)||XSe(n,o.messageId,e.cursorSavedAtMs,e.cursorMessageId)&&r.push({messageId:o.messageId,createdAtMs:n,text:Bi(o)})}return r}});var B9,G9=l(()=>{"use strict";B9=(e,t)=>{let r=e.findIndex(o=>o.episodeId===t.episodeId);return r<0?[...e,t]:e.map((o,n)=>n===r?t:o)}});var K9,mj,gj=l(()=>{"use strict";K9=u(require("node:path"));ft();ee();te();mj=e=>{let t=ge(e.projectId),r=K9.default.join(t,Te,y_),o={...e.budget,updatedAt:new Date().toISOString()};return ie(r,`${JSON.stringify(o)}
`),o}});var V9,fj,yj=l(()=>{"use strict";V9=u(require("node:path"));ft();ee();te();fj=e=>{let t=ge(e.projectId),r=V9.default.join(t,Te,f_),o={...e.file,updatedAt:new Date().toISOString()};return ie(r,`${JSON.stringify(o)}
`),o}});var q9,J9=l(()=>{"use strict";M_();G9();gj();yj();q9=e=>{let{result:t,episodesFile:r,budget:o,projectId:n,nowMs:s}=e,i=r.cursorMessageId,a=r.cursorSavedAtMs;t.episode.state!=="CAPTURING"&&t.episode.messageIds.length>0&&(i=t.episode.messageIds[t.episode.messageIds.length-1],a=t.episode.lastMessageAtMs??a),fj({projectId:n,file:{episodes:B9(r.episodes,t.episode),cursorMessageId:i,cursorSavedAtMs:a,updatedAt:new Date(s).toISOString()}}),mj({projectId:n,budget:{dayKey:o.dayKey,tokensUsedToday:o.tokensUsedToday+t.tokensSpent,lastClosedAtMs:t.episode.closedAtMs??o.lastClosedAtMs,updatedAt:new Date(s).toISOString()}}),Km({projectId:n,events:t.metrics})}});var q_,hj=l(()=>{"use strict";He();B_();G_();q_=e=>{try{let t=new Date(e.nowMs).toISOString(),r=e.maxOpenDrafts??20,o=Jm(e.projectId),{reviewFlag:n}=e;Ym({projectId:e.projectId,file:{historyLearnedPitfalls:o.historyLearnedPitfalls,skillgenDraftsReview:n.miningPaused?{active:!0,openDraftCount:n.draftWaitingCount,maxOpenDrafts:r,miningPaused:!0,notifiedAt:t,summary:`Mining paused: ${n.draftWaitingCount}/${r} open skill drafts await review`}:n.draftWaitingCount>0?{active:!0,openDraftCount:n.draftWaitingCount,maxOpenDrafts:r,miningPaused:!1,notifiedAt:t,summary:`${n.draftWaitingCount} skill draft(s) await owner review`}:null,updatedAt:t}})}catch{}}});var J_,Sj=l(()=>{"use strict";J_=e=>new Date(e).toISOString().slice(0,10)});var Y_,Y9=l(()=>{"use strict";Sj();Y_=e=>({dayKey:J_(e),tokensUsedToday:0,lastClosedAtMs:null,updatedAt:new Date(e).toISOString()})});var Pj,Z9,X9,ZSe,Aj,_j=l(()=>{"use strict";Pj=u(require("node:fs")),Z9=u(require("node:path"));Y9();ee();te();Sj();X9="[project-history-skillgen]",ZSe=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e;if(typeof r.dayKey!="string"||typeof r.tokensUsedToday!="number"||!(r.lastClosedAtMs===null||typeof r.lastClosedAtMs=="number")||typeof r.updatedAt!="string")return null;let o=J_(t);return r.dayKey!==o?{dayKey:o,tokensUsedToday:0,lastClosedAtMs:r.lastClosedAtMs,updatedAt:r.updatedAt}:{dayKey:r.dayKey,tokensUsedToday:Math.max(0,r.tokensUsedToday),lastClosedAtMs:r.lastClosedAtMs,updatedAt:r.updatedAt}},Aj=e=>{let t=Z9.default.join(U(e.projectId),Te,y_);if(!Pj.default.existsSync(t))return Y_(e.nowMs);try{let r=JSON.parse(Pj.default.readFileSync(t,"utf8")),o=ZSe(r,e.nowMs);return o===null?(console.error(X9,"budget_corrupt",e.projectId),Y_(e.nowMs)):o}catch(r){return console.error(X9,"budget_read_failed",e.projectId,r),Y_(e.nowMs)}}});var X_,Q9=l(()=>{"use strict";X_=(e=new Date(0).toISOString())=>({episodes:[],cursorMessageId:null,cursorSavedAtMs:null,updatedAt:e})});var bj,tZ,eZ,QSe,ePe,tPe,kj,Rj=l(()=>{"use strict";bj=u(require("node:fs")),tZ=u(require("node:path"));Q9();Bm();ee();te();eZ="[project-history-skillgen]",QSe=e=>typeof e=="string"&&LO.includes(e),ePe=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.episodeId=="string"&&typeof t.projectId=="string"&&QSe(t.state)&&Array.isArray(t.messageIds)&&typeof t.startedAtMs=="number"&&typeof t.lastMessageAtMs=="number"},tPe=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(!Array.isArray(t.episodes))return null;let r=t.episodes.filter(ePe);if(r.length!==t.episodes.length||typeof t.updatedAt!="string")return null;let o=t.cursorMessageId===null||typeof t.cursorMessageId=="string"?t.cursorMessageId:null,n=t.cursorSavedAtMs===null||typeof t.cursorSavedAtMs=="number"?t.cursorSavedAtMs:null;return{episodes:r,cursorMessageId:o,cursorSavedAtMs:n,updatedAt:t.updatedAt}},kj=e=>{let t=tZ.default.join(U(e),Te,f_);if(!bj.default.existsSync(t))return X_();try{let r=JSON.parse(bj.default.readFileSync(t,"utf8")),o=tPe(r);return o===null?(console.error(eZ,"episodes_corrupt",e),X_()):o}catch(r){return console.error(eZ,"episodes_read_failed",e,r),X_()}}});var oZ,rPe,oPe,nPe,rZ,wj,Ej=l(()=>{"use strict";oZ=require("node:crypto");j_();rj();cj();zm();H9();Xm();Hm();$9();U9();uj();Qn();J9();hj();He();L_();_j();Rj();z_();rPe="[project-history-skillgen]",oPe=e=>e!==void 0?e:process.env[M0]==="0"?null:lj(),nPe=(e,t)=>{let r=new Map;for(let o of zi(e)){let n=Date.parse(o.savedAt);Number.isNaN(n)||r.set(o.messageId,{messageId:o.messageId,createdAtMs:n,text:Bi(o)})}return t.map(o=>r.get(o)).filter(o=>o!==void 0)},rZ=e=>{let t=e.messages[0],r=e.messages[e.messages.length-1];return{episodeId:(0,oZ.randomUUID)(),projectId:e.projectId,state:"CAPTURING",messageIds:e.messages.map(o=>o.messageId),startedAtMs:t.createdAtMs,lastMessageAtMs:r.createdAtMs,closedAtMs:null,reason:null,scrubbedTranscript:null,ownerMarkedSaveAsSkill:!1,hasSuccessSignal:!1,validateAttempts:0,draftId:null,contentHash:null,mergeDraftId:null,tokensUsed:0}},wj=(e={})=>{let t=oPe(e.ownerLlm),r=e.nowMs??Date.now;return async o=>{try{let n=uo(o.projectId);if(!Gi(n?.state))return;let s=r(),i=kj(o.projectId),a=Aj({projectId:o.projectId,nowMs:s}),c=pj({projectId:o.projectId,cursorMessageId:i.cursorMessageId,cursorSavedAtMs:i.cursorSavedAtMs}),d=$_(o.projectId),p=pc({openDraftCount:d,maxOpenDrafts:20});q_({projectId:o.projectId,reviewFlag:p,nowMs:s});let m=D9(i.episodes,o.projectId);if(p.miningPaused&&m!==null&&m.state==="EPISODE_READY"){let h=new Set(m.messageIds),S=c.filter(E=>!h.has(E.messageId));S.length>0&&(m=rZ({projectId:o.projectId,messages:S}))}else if(m===null){if(c.length===0)return;m=rZ({projectId:o.projectId,messages:c})}else if(m.state==="CAPTURING"&&c.length>0){let h=new Set(m.messageIds),S=[...m.messageIds],E=m.lastMessageAtMs;for(let I of c)h.has(I.messageId)||(S.push(I.messageId),h.add(I.messageId),E=Math.max(E,I.createdAtMs));m={...m,messageIds:S,lastMessageAtMs:E}}let g=nPe(o.projectId,m.messageIds);if(g.length===0)return;let y=await O_({episode:m,messages:g,tokensUsedToday:a.tokensUsedToday,lastClosedAtMs:a.lastClosedAtMs,nowMs:s,deps:{ownerLlm:t,writeDraft:qm,listDraftFingerprints:()=>F9(o.projectId),listPublishedFingerprints:()=>z9(o.projectId),openDraftCount:()=>$_(o.projectId)}});if(q9({projectId:o.projectId,episodesFile:i,budget:a,result:y,nowMs:s}),q_({projectId:o.projectId,reviewFlag:y.reviewFlag,nowMs:s}),y.draftWritten!==null&&y.episode.state==="AWAITING_REVIEW"){let h=[...i.episodes.filter(S=>S.episodeId!==y.episode.episodeId),y.episode];tj({projectId:o.projectId,successEpisode:y.episode,episodes:h,draftWritten:y.draftWritten,nowMs:s})}}catch(n){console.error(rPe,"run_failed",o.projectId,n)}}}});var Z_,Tj,Cj,nZ,Ij=l(()=>{"use strict";Z_=u(require("node:path"));ee();Tj=(e,...t)=>{if(typeof e!="string"||e.trim().length===0)throw new Error("invalid_project_data_dir");for(let s of t)if(typeof s!="string"||s.trim().length===0)throw new Error("empty_purge_path_segment");let r=Z_.default.join(e,...t),o=Z_.default.resolve(e);if(Z_.default.resolve(r)===o)throw new Error("purge_target_is_project_data_dir");return r},Cj=e=>({drafts:Tj(e,se,Rt),skillgen:Tj(e,Te),outcomes:Tj(e,AX)}),nZ=e=>{let t=Cj(e);return[t.drafts,t.skillgen,t.outcomes]}});var sZ,Q_,Lj=l(()=>{"use strict";sZ=u(require("node:fs"));Ij();te();Q_=e=>{let t=U(e);return nZ(t).some(r=>sZ.default.existsSync(r))}});var vj,iZ,aZ=l(()=>{"use strict";vj=u(require("node:fs"));Q();Lj();rc();iZ=()=>{let e=z().projectDataDir;if(!vj.default.existsSync(e))return[];let t=[];for(let r of vj.default.readdirSync(e))kt(r)&&Q_(r)&&t.push(r);return t}});var lZ,cZ=l(()=>{"use strict";lZ=e=>e==="purged"||e==="nothing_to_purge"||e==="purge_failed"});var dZ,pZ=l(()=>{"use strict";dZ=e=>e.cloudState.kind!=="known"?"skipped_unknown":e.cloudState.state!=="off"?"history_on":e.hasPurgeTargets?"purge":"nothing_to_purge"});var sPe,uZ,mZ=l(()=>{"use strict";At();sPe=["off","on_configuring","on_ready","degraded"],uZ=async e=>{try{let t=await fetch(`${e.cloudApi.appOrigin}/api/agent-witch/projects/${encodeURIComponent(e.projectId)}/computer-history`,{method:"GET",headers:{[ae]:e.cloudApi.pairingToken,Accept:"application/json"},signal:AbortSignal.timeout(3e4)});if(!t.ok)return{kind:"unknown",reason:`http_${t.status}`};let r=await t.json();if(typeof r!="object"||r===null||r.ok!==!0)return{kind:"unknown",reason:"malformed_body"};let o=r.state;return typeof o!="string"||!sPe.includes(o)?{kind:"unknown",reason:"unknown_state"}:{kind:"known",state:o}}catch{return{kind:"unknown",reason:"fetch_failed"}}}});var Wj,xj,Oj,jj=l(()=>{"use strict";Wj=u(require("node:fs"));Ij();te();xj=e=>Wj.default.existsSync(e)?(Wj.default.rmSync(e,{recursive:!0,force:!0}),!0):!1,Oj=e=>{let t=Cj(U(e.projectId));return{removedDrafts:xj(t.drafts),removedSkillgen:xj(t.skillgen),removedOutcomes:xj(t.outcomes)}}});var eb,gZ,fZ=l(()=>{"use strict";pZ();mZ();Lj();Xm();Qn();jj();eb="[project-history-off-purge]",gZ=async e=>{let t=e.deps?.fetchCloudState??uZ,r=e.deps?.hasPurgeTargets??Q_,o=e.deps?.purge??Oj,n=e.deps?.isLocalOn??(a=>Gi(uo(a)?.state)),s=e.deps?.markLocalOff??(a=>{ac({projectId:a,state:"off"})}),i;try{let a=e.cloudApi===null?{kind:"unknown",reason:"no_cloud_api"}:await t({cloudApi:e.cloudApi,projectId:e.projectId}),c=a.kind==="known"&&a.state==="off",d=c?r(e.projectId):!1,p=dZ({cloudState:a,hasPurgeTargets:d}),m=!1;if(c&&n(e.projectId))try{s(e.projectId),m=!0}catch(g){console.error(eb,"mark_off_failed",e.projectId,g)}if(p==="purge"||p==="nothing_to_purge"&&m)try{o({projectId:e.projectId}),i=p==="purge"?"purged":"nothing_to_purge"}catch(g){console.error(eb,"purge_failed",e.projectId,g),i="purge_failed"}else i=p}catch(a){console.error(eb,"reconcile_failed",e.projectId,a),i="skipped_unknown"}return i!=="history_on"&&console.info(eb,`outcome=${i}`,`projectId=${e.projectId}`),i}});var tb,Mj,Nj=l(()=>{"use strict";Jn();ne();kr();SO();yO();Ej();Qn();aZ();cZ();fZ();tb="[project-history-tick]",Mj=async(e={})=>{let t=e.listProjectIds?.()??G0(),r=e.listPurgeCandidateIds?.()??iZ(),o=new Set(t),n=[...t,...r.filter(m=>!o.has(m))];if(n.length===0)return;let s=B(),i=e.cloudApi!==void 0?e.cloudApi:s===null?null:J({wsUrl:s.wsUrl,pairingToken:s.pairingToken}),a=fO(),c=e.pullSkills??__,d=e.runSkillgen??wj({...e.ownerLlm!==void 0?{ownerLlm:e.ownerLlm}:{}}),p=e.reconcileOffPurge??gZ;for(let m of n){let g="skipped_unknown";try{g=await p({projectId:m,cloudApi:i})}catch(y){console.error(tb,"off_purge_failed",m,y)}if(!lZ(g)&&o.has(m)){try{await d({projectId:m})}catch(y){console.error(tb,"skillgen_failed",m,y)}if(i===null){console.error(tb,"pull_skipped_no_cloud_api",m);continue}try{await c({projectId:m,deps:{history:a,awcPublished:hO(i)}})}catch(y){console.error(tb,"pull_failed",m,y)}}}}});var Dj,hZ=l(()=>{"use strict";He();Nj();Dj=e=>{let t=e?.intervalMs??6e4,r=e?.tick??(()=>Mj());r();let o=setInterval(()=>{r()},t);return{stop:()=>{clearInterval(o)}}}});var SZ=l(()=>{"use strict";j_()});var PZ=l(()=>{"use strict";Fi();T_();ic();ee();Nm();te()});var Hj,Fj=l(()=>{"use strict";$m();Qr();ic();Fi();Hj=e=>{let t=zt();if(t.ok){let n=Xn(e.projectId);if(n.ok)try{let s=n.db.prepare(`SELECT DISTINCT thread_key AS threadKey
             FROM records
             WHERE project_id = ? AND kind = ? AND thread_key IS NOT NULL
             ORDER BY thread_key ASC`).all(e.projectId,Zo),i=[];for(let a of s){let c=a.threadKey;typeof c=="string"&&c.length>0&&i.push(c)}return{available:!0,threadKeys:i}}catch{}finally{Zn(n.db)}else return{available:!1,threadKeys:[],reason:n.reason}}let r=Ui({projectId:e.projectId,limit:200}),o=[...new Set(r.rows.map(n=>n.threadKey).filter(n=>typeof n=="string"&&n.length>0))].sort();return{available:r.available,threadKeys:o,reason:t.ok?void 0:t.reason}}});var iPe,aPe,lPe,$j,AZ=l(()=>{"use strict";Qr();C_();rc();$m();Fj();iPe=/^\/api\/local\/projects\/([^/]+)\/chats$/,aPe=/^\/api\/local\/projects\/([^/]+)\/chats\/([^/]+)\/messages$/,lPe=e=>{if(e===null||e==="")return;let t=Number.parseInt(e,10);return Number.isFinite(t)?t:void 0},$j=e=>{let t=iPe.exec(e.pathname);if(t!==null){if(e.method!=="GET")return e.sendJson(e.response,405,{ok:!1,error:"method_not_allowed"}),!0;let o=decodeURIComponent(t[1]??"");if(!kt(o))return e.sendJson(e.response,400,{ok:!1,error:"invalid_project_id"}),!0;let n=zt(),s=Hj({projectId:o});return n.ok?(e.sendJson(e.response,200,{ok:!0,projectId:o,threadKeys:s.threadKeys}),!0):(e.sendJson(e.response,503,{ok:!1,error:"index_unavailable",reason:n.reason,threadKeys:s.threadKeys}),!0)}let r=aPe.exec(e.pathname);if(r!==null){if(e.method!=="GET")return e.sendJson(e.response,405,{ok:!1,error:"method_not_allowed"}),!0;let o=decodeURIComponent(r[1]??""),n=decodeURIComponent(r[2]??"");if(!kt(o)||n.length===0)return e.sendJson(e.response,400,{ok:!1,error:"invalid_path"}),!0;let s=new URL(e.requestUrl,"http://127.0.0.1").searchParams,i=s.get("before"),a=s.get("beforeMessageId"),c=lPe(s.get("limit")),d=zt(),m=Ui({projectId:o,threadKey:n,beforeCreatedAt:i,beforeMessageId:a,limit:c}).rows.map(g=>{let y=Dm({projectId:o,messageId:g.messageId});return{messageId:g.messageId,threadKey:g.threadKey,createdAt:g.createdAt,savedAt:g.savedAt,message:y?.message??null}});return d.ok?(e.sendJson(e.response,200,{ok:!0,projectId:o,threadKey:n,messages:m}),!0):(e.sendJson(e.response,503,{ok:!1,error:"index_unavailable",reason:d.reason,projectId:o,threadKey:n,messages:m}),!0)}return!1}});var es,rb,_Z,cPe,dPe,Qm,Vi,eg=l(()=>{"use strict";es=u(require("node:fs")),rb=u(require("node:path"));ee();te();_Z=e=>e.length>0&&!e.startsWith(".")&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),cPe=e=>Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.trim().length>0).map(t=>t.trim().toLowerCase()):[],dPe=e=>e==="Computer"?"Computer":"History",Qm=e=>{let t=rb.default.join(U(e),se,Rt);if(!es.default.existsSync(t))return[];let r=[];for(let o of es.default.readdirSync(t,{withFileTypes:!0})){if(!o.isDirectory()||!_Z(o.name))continue;let n=rb.default.join(t,o.name,Kn);if(es.default.existsSync(n))try{let s=es.default.readFileSync(n,"utf8"),i=rb.default.join(t,o.name,Vn),a=o.name,c="",d=[],p="History",m=es.default.statSync(n).mtime.toISOString();if(es.default.existsSync(i)){let g=JSON.parse(es.default.readFileSync(i,"utf8"));typeof g.name=="string"&&g.name.trim()&&(a=g.name.trim()),typeof g.description=="string"&&(c=g.description),d=cPe(g.tags),p=dPe(g.source),typeof g.updatedAt=="string"&&g.updatedAt.length>0&&(m=g.updatedAt)}r.push({id:o.name,title:a,body:s,description:c,tags:d,source:p,updatedAt:m,pathLabel:`skills/_drafts/${o.name}`})}catch{}}return r.sort((o,n)=>n.updatedAt.localeCompare(o.updatedAt))},Vi=(e,t)=>_Z(t)?Qm(e).find(r=>r.id===t)??null:null});var zj,ob,pPe,Uj,Bj=l(()=>{"use strict";zj=u(require("node:fs")),ob=u(require("node:path"));Jn();ft();ee();te();eg();pPe=e=>e.length>0&&!e.startsWith(".")&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),Uj=e=>{if(!pPe(e.draftId))throw new Error("invalid_draft_id");let t=Vi(e.projectId,e.draftId);if(t===null)throw new Error("draft_not_found");let r=ob.default.join(U(e.projectId),se,Rt,e.draftId),o=ob.default.join(r,Kn),n=ob.default.join(r,Vn),s=e.title.trim()||t.title,i=e.body,a=(e.tags??t.tags).map(y=>y.trim().toLowerCase()).filter(y=>y.length>0),c=Ye(i),d=new Date().toISOString(),p="",m=[],g=t.description;if(zj.default.existsSync(n))try{let y=JSON.parse(zj.default.readFileSync(n,"utf8"));typeof y.episodeId=="string"&&(p=y.episodeId),Array.isArray(y.sourceMessageIds)&&(m=y.sourceMessageIds.filter(h=>typeof h=="string")),typeof y.description=="string"&&(g=y.description)}catch{}return ie(o,i),ie(n,`${JSON.stringify({draftId:e.draftId,episodeId:p,name:s,description:g,sourceMessageIds:m,contentHash:c,status:"draft",tags:a,source:t.source,updatedAt:d})}
`),{id:e.draftId,title:s,body:i,description:g,tags:a,source:t.source,updatedAt:d,pathLabel:`skills/_drafts/${e.draftId}`}}});var Gj,bZ,uPe,tg,nb=l(()=>{"use strict";Gj=u(require("node:fs")),bZ=u(require("node:path"));ee();te();uPe=e=>e.length>0&&!e.startsWith(".")&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),tg=e=>{if(!uPe(e.draftId))throw new Error("invalid_draft_id");let t=bZ.default.join(U(e.projectId),se,Rt,e.draftId);if(!Gj.default.existsSync(t))throw new Error("draft_not_found");Gj.default.rmSync(t,{recursive:!0,force:!1})}});var gc,sb,kZ,mPe,Kj,Vj=l(()=>{"use strict";gc=u(require("node:fs")),sb=u(require("node:path"));ft();nb();eg();ee();te();b_();kZ=e=>e.length>0&&!e.startsWith("_")&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),mPe=(e,t)=>{let r=sb.default.join(U(e),se,t),o=sb.default.join(r,Dr);if(gc.default.existsSync(o))try{let s=JSON.parse(gc.default.readFileSync(o,"utf8"));if(typeof s.version=="number"&&Number.isInteger(s.version))return s.version+1}catch{}if(!gc.default.existsSync(r))return 1;let n=0;for(let s of gc.default.readdirSync(r)){let i=/^v(\d+)\.md$/.exec(s);i&&(n=Math.max(n,Number.parseInt(i[1]??"0",10)))}return n+1},Kj=e=>{let t=Vi(e.projectId,e.draftId);if(t===null)throw new Error("draft_not_found");let r=e.body??t.body,o=(e.title??t.title).trim()||t.title;if(!r.trim()||!o.trim())throw new Error("draft_incomplete");let n=kZ(e.draftId)?e.draftId:`skill-${e.draftId}`.replace(/[^a-zA-Z0-9_-]/g,"-").slice(0,64);if(!kZ(n))throw new Error("invalid_project_skill_id");let s=mPe(e.projectId,n),i=Im({projectId:e.projectId,skillId:n,version:s,body:r});try{let a=sb.default.join(U(e.projectId),se,n,Dr),c=JSON.parse(gc.default.readFileSync(a,"utf8"));ie(a,`${JSON.stringify({...c,name:o,version:c.version??s,contentHash:c.contentHash??i.contentHash,updatedAt:new Date().toISOString()})}
`)}catch{}return tg({projectId:e.projectId,draftId:e.draftId}),{skillId:n,version:s,path:i.path}}});var gPe,fPe,yPe,RZ,wZ=l(()=>{"use strict";gPe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),fPe=`:root{
  --awc-bg:#e8e6e1; --awc-surface:#ffffff; --awc-surface-2:#f7f6f4;
  --awc-tile:#f4f3f0; --awc-tile-2:#ebe9e4; --awc-fill:#e9e7e2;
  --awc-accent-soft:#e4ecff; --awc-accent-soft-2:#d6e2ff;
  --awc-border:#e0e5ed; --awc-line:#e0e5ed; --awc-border-strong:#cbd2de; --awc-control-border:#748094;
  --awc-fg:#101828; --awc-fg-muted:#475467; --awc-fg-subtle:#566073;
  --awc-blue-600:#2150d6; --awc-primary:var(--awc-blue-600);
  --font-ui:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
  --font-mono:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
  --r-s:6px; --r-m:10px; color-scheme:light;
}
*{box-sizing:border-box}
html,body{height:100%}
body{margin:0;background:var(--awc-bg);color:var(--awc-fg);font:14px/1.5 var(--font-ui);padding:16px}
button,input,textarea{font:inherit;color:inherit}
:focus-visible{outline:2px solid var(--awc-control-border);outline-offset:2px;border-radius:var(--r-s)}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.win{max-width:1280px;margin:0 auto;min-height:560px;height:100%;display:flex;flex-direction:column;background:var(--awc-surface);border:1px solid var(--awc-border);border-radius:12px;overflow:hidden}
.top{display:flex;align-items:center;gap:12px;padding:10px 16px;border-bottom:1px solid var(--awc-line);background:var(--awc-surface-2);flex-wrap:wrap}
.brand{font-weight:600}.crumb{color:var(--awc-fg-subtle);display:flex;align-items:center;gap:6px;min-width:0}
.crumb a{color:inherit;text-decoration:none}.crumb b{color:var(--awc-fg);font-weight:500}.top .sp{flex:1}
.pc{display:inline-flex;align-items:center;gap:6px;font-size:12px;color:var(--awc-fg-muted);background:var(--awc-tile);border:1px solid var(--awc-border);padding:2px 10px;border-radius:99px}
.dot{width:7px;height:7px;border-radius:50%;background:#12804a}.pc.off .dot{background:transparent;border:1.5px solid var(--awc-control-border)}
.banner{padding:8px 16px;background:var(--awc-tile-2);border-bottom:1px solid var(--awc-line);font-size:13px}
.body{flex:1;display:grid;grid-template-columns:minmax(260px,320px) 1fr;min-height:0}
.rail{border-right:1px solid var(--awc-line);display:flex;flex-direction:column;min-height:0;background:var(--awc-surface-2)}
.rail-h{display:flex;align-items:center;gap:6px;padding:14px 16px 8px}.rail-h h1{font-size:15px;margin:0;font-weight:600}
.count{font-size:12px;color:var(--awc-fg-subtle)}
.search{margin:0 16px 10px}.search input{width:100%;padding:7px 10px;border:1px solid var(--awc-control-border);border-radius:var(--r-s);background:var(--awc-surface)}
.list{list-style:none;margin:0;padding:0 8px 12px;overflow:auto;flex:1}
.item{display:grid;gap:2px;width:100%;text-align:left;border:1px solid transparent;background:none;padding:10px;border-radius:var(--r-m);cursor:pointer}
.item:hover{background:var(--awc-tile)}.item[aria-current="true"]{background:var(--awc-accent-soft);border-color:var(--awc-accent-soft-2)}
.item .n{font-weight:500;display:flex;gap:6px;align-items:center;min-width:0}
.item .n>span:last-child{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.item .p{color:var(--awc-fg-muted);font-size:13px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.item .m{color:var(--awc-fg-subtle);font-size:12px}.unsaved{width:6px;height:6px;border-radius:50%;background:var(--awc-fg);flex:none}
.main{display:flex;flex-direction:column;min-width:0;min-height:0}
.ed-h{display:flex;align-items:center;gap:8px;padding:12px 20px;border-bottom:1px solid var(--awc-line);flex-wrap:wrap}
.back{display:none}.path{font:12px var(--font-mono);color:var(--awc-fg-subtle);overflow-wrap:anywhere;min-width:0;flex:1}
.ed{flex:1;overflow:auto;padding:20px;display:grid;gap:16px;align-content:start;max-width:860px;width:100%}
label.l{font-size:12px;font-weight:500;color:var(--awc-fg-muted);display:block;margin-bottom:4px}
.title-in{width:100%;font-size:20px;font-weight:600;padding:6px 10px;border:1px solid var(--awc-border);border-radius:var(--r-s);background:var(--awc-surface)}
.meta{font-size:12px;color:var(--awc-fg-subtle);display:flex;gap:12px;flex-wrap:wrap}
.tags{display:flex;flex-wrap:wrap;gap:6px;align-items:center;padding:5px;border:1px solid var(--awc-control-border);border-radius:var(--r-s);background:var(--awc-surface)}
.tag{display:inline-flex;align-items:center;gap:4px;background:var(--awc-tile-2);border-radius:99px;padding:1px 4px 1px 10px;font-size:12px}
.tag button{border:0;background:none;cursor:pointer;width:20px;height:20px;border-radius:50%;color:var(--awc-fg-muted)}
.tags input{border:0;outline:0;flex:1;min-width:100px;padding:3px 4px;background:transparent}
.seg{display:inline-flex;border:1px solid var(--awc-border);border-radius:var(--r-s);padding:2px;background:var(--awc-tile)}
.seg button{border:0;background:none;padding:3px 10px;border-radius:4px;cursor:pointer;font-size:12px;color:var(--awc-fg-muted)}
.seg button[aria-pressed="true"]{background:var(--awc-surface);color:var(--awc-fg);box-shadow:0 0 0 1px var(--awc-border)}
.body-row{display:flex;justify-content:space-between;align-items:end;gap:8px;margin-bottom:4px}
textarea{width:100%;min-height:320px;resize:vertical;padding:12px;border:1px solid var(--awc-control-border);border-radius:var(--r-s);background:var(--awc-surface);font:13px/1.6 var(--font-mono)}
.preview{min-height:320px;padding:4px 14px;border:1px solid var(--awc-border);border-radius:var(--r-s);background:var(--awc-surface-2);overflow-wrap:anywhere}
.preview code{font:12.5px var(--font-mono);background:var(--awc-tile-2);padding:1px 4px;border-radius:4px}
.preview pre{background:var(--awc-tile-2);padding:10px;border-radius:var(--r-s);overflow-x:auto}.preview pre code{background:none;padding:0}
.bar{display:flex;align-items:center;gap:8px;padding:12px 20px;border-top:1px solid var(--awc-line);background:var(--awc-surface-2);flex-wrap:wrap}
.bar .sp{flex:1}.status{font-size:12px;color:var(--awc-fg-subtle)}
.btn{border:1px solid var(--awc-control-border);background:var(--awc-surface);padding:6px 14px;border-radius:var(--r-s);cursor:pointer;font-weight:500;white-space:nowrap}
.btn:hover{background:var(--awc-tile)}.btn:disabled{opacity:.45;cursor:not-allowed}
.btn.pri{background:var(--awc-primary);border-color:var(--awc-primary);color:#fff}.btn.pri:hover{opacity:.92}
.btn.ghost{border-color:transparent;background:none}.btn.ghost:hover{background:var(--awc-tile)}
.confirm{display:flex;align-items:center;gap:8px;background:var(--awc-tile-2);border:1px solid var(--awc-border-strong);border-radius:var(--r-s);padding:4px 4px 4px 10px;font-size:13px}
.state{flex:1;display:grid;place-items:center;padding:40px 20px;text-align:center}
.state .box{display:grid;gap:10px;justify-items:center;max-width:320px}.state h2{margin:0;font-size:16px}.state p{margin:0;color:var(--awc-fg-muted)}
.glyph{width:44px;height:44px;border-radius:12px;background:var(--awc-tile-2);display:grid;place-items:center;color:var(--awc-fg-muted);font:600 18px var(--font-mono)}
.sk{background:var(--awc-fill);border-radius:6px;height:12px;animation:pulse 1.4s ease-in-out infinite}@keyframes pulse{50%{opacity:.5}}
.toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:var(--awc-fg);color:var(--awc-surface);padding:8px 14px;border-radius:var(--r-s);font-weight:500;z-index:20}
@media (max-width:767px){
  body{padding:0}.win{border-radius:0;border-inline:0;min-height:100%}.body{grid-template-columns:1fr}
  .rail{border-right:0}.body.detail .rail{display:none}.body:not(.detail) .main{display:none}
  .back{display:inline-flex}.ed{padding:16px}.ed-h,.bar{padding-inline:16px}
  .bar .btn{flex:1}.bar .sp{display:none}.status{width:100%}
}
`,yPe=`(()=>{
const BOOT=window.__AW_SKILL_DRAFT_BOOT__;
const API='/api/local/projects/'+encodeURIComponent(BOOT.projectId)+'/skill-drafts';
const pad=n=>String(n).padStart(2,'0');
const fmt=iso=>{const d=new Date(iso),t=new Date(),y=new Date(t);y.setDate(t.getDate()-1);
  const hm=pad(d.getHours())+':'+pad(d.getMinutes());
  if(d.toDateString()===t.toDateString())return 'Today '+hm;
  if(d.toDateString()===y.toDateString())return 'Yesterday '+hm;
  return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())+' '+hm};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let S={mode:'ready',drafts:BOOT.drafts.slice(),sel:BOOT.drafts[0]?BOOT.drafts[0].id:null,edits:{},tab:'edit',confirm:false,detail:false,q:'',online:BOOT.online};
const view=document.getElementById('view');
const cur=()=>S.drafts.find(d=>d.id===S.sel);
const working=d=>S.edits[d.id]||d;
const dirty=d=>!!S.edits[d.id];
const preview=t=>t.replace(/^#+\\s+.*$/m,'').replace(/[#*\`>\\-\\d.]/g,' ').replace(/\\s+/g,' ').trim();
function md(src){
  const L=src.split('\\n');let o='',i=0,list=null;
  const inl=s=>esc(s).replace(/\`([^\`]+)\`/g,'<code>$1</code>').replace(/\\*\\*([^*]+)\\*\\*/g,'<strong>$1</strong>');
  const close=()=>{if(list){o+='</'+list+'>';list=null}};
  while(i<L.length){const l=L[i];
    if(l.startsWith('\`\`\`')){close();let c='';i++;while(i<L.length&&!L[i].startsWith('\`\`\`'))c+=L[i++]+'\\n';o+='<pre><code>'+esc(c)+'</code></pre>';i++;continue}
    let m;
    if(m=l.match(/^(#{1,3})\\s+(.*)/)){close();o+='<h'+m[1].length+'>'+inl(m[2])+'</h'+m[1].length+'>'}
    else if(m=l.match(/^\\d+\\.\\s+(.*)/)){if(list!=='ol'){close();o+='<ol>';list='ol'}o+='<li>'+inl(m[1])+'</li>'}
    else if(m=l.match(/^[-*]\\s+(.*)/)){if(list!=='ul'){close();o+='<ul>';list='ul'}o+='<li>'+inl(m[1])+'</li>'}
    else if(l.trim()===''){close()}
    else{close();o+='<p>'+inl(l)+'</p>'}
    i++}
  close();return o||'<p style="color:var(--awc-fg-subtle)">Nothing to preview.</p>';
}
function stateBox(g,h,p,btn){return '<div class="state"><div class="box"><div class="glyph" aria-hidden="true">'+g+'</div><h2>'+h+'</h2>'+(p?'<p>'+p+'</p>':'')+(btn||'')+'</div></div>'}
async function api(method, path, body){
  const res=await fetch(path,{method,headers:body?{'Content-Type':'application/json'}:undefined,body:body?JSON.stringify(body):undefined});
  const data=await res.json().catch(()=>({ok:false}));
  if(!res.ok||data.ok===false) throw new Error(data.error||('http_'+res.status));
  return data;
}
async function reload(){
  S.mode='loading';render();
  try{
    const data=await api('GET', API);
    S.drafts=(data.drafts||[]).map(d=>({id:d.id,title:d.title,body:d.body,tags:d.tags||[],source:d.source||'History',updated:d.updatedAt||d.updated,pathLabel:d.pathLabel||('skills/_drafts/'+d.id)}));
    if(!S.drafts.find(d=>d.id===S.sel)) S.sel=S.drafts[0]?S.drafts[0].id:null;
    S.edits={};S.mode=S.drafts.length?'ready':'empty';
  }catch(e){S.mode='error'}
  render();
}
function render(){
  const off=!S.online;
  document.getElementById('offline').hidden=!off;
  document.getElementById('pc').classList.toggle('off',off);
  document.getElementById('pcText').textContent=off?'This computer \xB7 offline':'This computer \xB7 online';
  view.classList.toggle('detail',S.detail);
  if(S.mode==='loading'){
    view.innerHTML='<aside class="rail" aria-busy="true"><div class="rail-h"><h1>Drafts</h1></div><div style="padding:8px 16px;display:grid;gap:18px">'+[1,2,3,4].map(()=>'<div style="display:grid;gap:6px"><div class="sk" style="width:70%"></div><div class="sk" style="width:95%"></div><div class="sk" style="width:35%;height:10px"></div></div>').join('')+'</div></aside><section class="main">'+stateBox('\u2026','Loading drafts','')+'</section>';
    return;
  }
  if(S.mode==='error'){
    view.innerHTML='<section class="main" style="grid-column:1/-1;display:flex">'+stateBox('!','Couldn\u2019t read drafts','The drafts folder on this computer isn\u2019t readable.','<button class="btn pri" id="retry">Try again</button>')+'</section>';
    document.getElementById('retry').onclick=()=>void reload();
    return;
  }
  const items=S.drafts.filter(d=>{const w=working(d);return !S.q||(w.title+' '+w.body+' '+(w.tags||[]).join(' ')).toLowerCase().includes(S.q.toLowerCase())});
  if(S.mode==='empty'||S.drafts.length===0){
    view.innerHTML='<section class="main" style="grid-column:1/-1;display:flex">'+stateBox('0','No drafts.','New drafts show up here.')+'</section>';
    return;
  }
  const rail='<aside class="rail" aria-label="Drafts"><div class="rail-h"><h1>Drafts</h1><span class="count">'+S.drafts.length+'</span></div><div class="search"><label for="q" class="sr">Search drafts</label><input id="q" type="search" placeholder="Search" value="'+esc(S.q)+'" autocomplete="off"></div><ul class="list" role="list">'+(items.length?items.map(d=>{const w=working(d);return '<li><button class="item" data-id="'+esc(d.id)+'" aria-current="'+(d.id===S.sel)+'"><span class="n">'+(dirty(d)?'<span class="unsaved" title="Unsaved changes"></span><span class="sr">Unsaved. </span>':'')+'<span>'+esc(w.title||'Untitled')+'</span></span><span class="p">'+esc(preview(w.body))+'</span><span class="m">'+esc(d.source)+' \xB7 '+fmt(d.updated)+'</span></button></li>'}).join(''):'<li class="status" style="padding:10px">No matches.</li>')+'</ul></aside>';
  const d=cur(); if(!d){view.innerHTML=rail;return}
  const w=working(d), isD=dirty(d);
  const main='<section class="main" aria-label="Draft"><div class="ed-h"><button class="btn ghost back" id="back" aria-label="Back to drafts">\u2039 Drafts</button><span class="path" title="Draft file">'+esc(d.pathLabel||('skills/_drafts/'+d.id))+'</span><div class="seg" role="group" aria-label="Body view"><button aria-pressed="'+(S.tab==='edit')+'" data-tab="edit">Edit</button><button aria-pressed="'+(S.tab==='preview')+'" data-tab="preview">Preview</button></div></div><div class="ed"><div><label class="l" for="title">Title</label><input id="title" class="title-in" value="'+esc(w.title)+'" autocomplete="off"></div><div class="meta"><span>From '+(d.source==='History'?'project history':'this computer')+'</span><span>Updated '+fmt(d.updated)+'</span></div><div><label class="l" for="tagIn">Tags <span style="font-weight:400;color:var(--awc-fg-subtle)">optional</span></label><div class="tags">'+(w.tags||[]).map((t,i)=>'<span class="tag">'+esc(t)+'<button type="button" data-rm="'+i+'" aria-label="Remove tag '+esc(t)+'">\xD7</button></span>').join('')+'<input id="tagIn" placeholder="Add tag" autocomplete="off"></div></div><div><div class="body-row"><label class="l" for="bodyIn" style="margin:0">Skill</label><span class="status">Markdown</span></div>'+(S.tab==='edit'?'<textarea id="bodyIn" spellcheck="false">'+esc(w.body)+'</textarea>':'<div class="preview" tabindex="0" aria-label="Preview">'+md(w.body)+'</div>')+'</div></div><div class="bar"><span class="status" role="status">'+(isD?'Unsaved changes':'Saved')+'</span><span class="sp"></span>'+(S.confirm?'<span class="confirm" role="alertdialog" aria-label="Confirm discard">Discard this draft?<button class="btn" id="cfYes">Discard</button><button class="btn ghost" id="cfNo">Keep</button></span>':'<button class="btn ghost" id="discard">Discard</button><button class="btn" id="save" '+(isD?'':'disabled')+'>Save</button><button class="btn pri" id="publish" '+(off?'disabled title="Publish when online"':'')+' '+(w.title.trim()&&w.body.trim()?'':'disabled')+'>Publish</button>')+'</div></section>';
  view.innerHTML=rail+main;wire();
}
function edit(patch){const d=cur();const w={...working(d),...patch};
  if(w.title===d.title&&w.body===d.body&&(w.tags||[]).join('|')===(d.tags||[]).join('|'))delete S.edits[d.id];else S.edits[d.id]=w;
  renderSoft()}
function renderSoft(){const st=view.querySelector('.bar .status');const d=cur();if(st)st.textContent=dirty(d)?'Unsaved changes':'Saved';
  const sv=document.getElementById('save');if(sv)sv.disabled=!dirty(d);
  const pb=document.getElementById('publish');const w=working(d);if(pb)pb.disabled=!S.online||!(w.title.trim()&&w.body.trim());
  const it=view.querySelector('.item[data-id="'+d.id+'"]');if(it){it.querySelector('.n').innerHTML=(dirty(d)?'<span class="unsaved" title="Unsaved changes"></span><span class="sr">Unsaved. </span>':'')+'<span>'+esc(w.title||'Untitled')+'</span>';it.querySelector('.p').textContent=preview(w.body)}}
async function save(){const d=cur();if(!dirty(d))return;const w=working(d);
  try{const data=await api('PUT', API+'/'+encodeURIComponent(d.id),{title:w.title,body:w.body,tags:w.tags||[]});
    Object.assign(d,{title:data.draft.title,body:data.draft.body,tags:data.draft.tags||[],updated:data.draft.updatedAt});delete S.edits[d.id];render();toast('Saved.')}
  catch(e){toast('Could not save.')}}
async function discard(){const d=cur();
  try{await api('DELETE', API+'/'+encodeURIComponent(d.id));const i=S.drafts.findIndex(x=>x.id===d.id);S.drafts.splice(i,1);delete S.edits[d.id];
    S.sel=S.drafts.length?S.drafts[Math.min(i,S.drafts.length-1)].id:null;S.confirm=false;S.detail=false;S.mode=S.drafts.length?'ready':'empty';render();toast('Discarded.')}
  catch(e){S.confirm=false;render();toast('Could not discard.')}}
async function publish(){const d=cur();const w=working(d);
  try{await api('POST', API+'/'+encodeURIComponent(d.id)+'/publish',{title:w.title,body:w.body});
    const i=S.drafts.findIndex(x=>x.id===d.id);S.drafts.splice(i,1);delete S.edits[d.id];
    S.sel=S.drafts.length?S.drafts[Math.min(i,S.drafts.length-1)].id:null;S.detail=false;S.mode=S.drafts.length?'ready':'empty';render();toast('Published.')}
  catch(e){toast('Could not publish.')}}
function wire(){
  view.querySelectorAll('.item').forEach(b=>b.onclick=()=>{S.sel=b.dataset.id;S.confirm=false;S.detail=true;render()});
  const q=document.getElementById('q');if(q)q.oninput=()=>{S.q=q.value;const p=q.selectionStart;render();const n=document.getElementById('q');n.focus();n.setSelectionRange(p,p)};
  view.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{S.tab=b.dataset.tab;render()});
  const t=document.getElementById('title');if(t)t.oninput=()=>edit({title:t.value});
  const b=document.getElementById('bodyIn');if(b)b.oninput=()=>edit({body:b.value});
  const ti=document.getElementById('tagIn');
  if(ti){ti.onkeydown=e=>{const v=ti.value.trim().toLowerCase().replace(/,/g,'');const w=working(cur());
    if((e.key==='Enter'||e.key===',')&&v){e.preventDefault();if(!(w.tags||[]).includes(v)){edit({tags:[...(w.tags||[]),v]});render()}document.getElementById('tagIn').focus()}
    else if(e.key==='Backspace'&&!ti.value&&(w.tags||[]).length){edit({tags:w.tags.slice(0,-1)});render();document.getElementById('tagIn').focus()}};
  view.querySelectorAll('[data-rm]').forEach(x=>x.onclick=()=>{const w=working(cur());edit({tags:w.tags.filter((_,i)=>i!=+x.dataset.rm)});render();document.getElementById('tagIn').focus()})}
  const bk=document.getElementById('back');if(bk)bk.onclick=()=>{S.detail=false;S.confirm=false;render()};
  const on=(id,f)=>{const e=document.getElementById(id);if(e)e.onclick=f};
  on('save',()=>void save());
  on('discard',()=>{S.confirm=true;render();document.getElementById('cfNo').focus()});
  on('cfNo',()=>{S.confirm=false;render()});
  on('cfYes',()=>void discard());
  on('publish',()=>void publish());
}
let tt;function toast(msg){const h=document.getElementById('toastHost');clearTimeout(tt);h.innerHTML='<div class="toast">'+esc(msg)+'</div>';tt=setTimeout(()=>h.innerHTML='',4000)}
document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='s'){e.preventDefault();if(S.mode==='ready')void save()}
  if(e.key==='Escape'&&S.confirm){S.confirm=false;render()}});
if(!S.drafts.length) S.mode='empty';
render();
})();
`,RZ=e=>{let t=JSON.stringify({projectId:e.projectId,projectName:e.projectName,online:e.online,drafts:e.drafts.map(r=>({id:r.id,title:r.title,body:r.body,tags:r.tags,source:r.source,updated:r.updatedAt,pathLabel:r.pathLabel}))}).replaceAll("<","\\u003c");return`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>AgentWitch \u2013 AWL skill draft review</title>
<style>${fPe}</style>
</head>
<body>
<div class="win" role="application" aria-label="AgentWitch Local">
  <header class="top">
    <span class="brand">AgentWitch</span>
    <nav class="crumb" aria-label="Location">
      <a href="/project?id=${encodeURIComponent(e.projectId)}">${gPe(e.projectName||"Project")}</a>
      <span aria-hidden="true">/</span><b>Skill drafts</b>
    </nav>
    <span class="sp"></span>
    <span class="pc${e.online?"":" off"}" id="pc"><span class="dot" aria-hidden="true"></span><span id="pcText">This computer \xB7 ${e.online?"online":"offline"}</span></span>
  </header>
  <div class="banner" id="offline" ${e.online?"hidden":""} role="status">Offline. Saves stay on this computer. Publish when back online.</div>
  <div id="view" class="body"></div>
</div>
<div id="toastHost" aria-live="polite"></div>
<script>window.__AW_SKILL_DRAFT_BOOT__=${t};</script>
<script>${yPe}</script>
</body>
</html>`}});var hPe,SPe,PPe,APe,EZ,TZ,qj,CZ=l(()=>{"use strict";wZ();nb();rc();eg();Vj();Bj();hPe=/^\/project\/skill-drafts$/,SPe=/^\/api\/local\/projects\/([^/]+)\/skill-drafts$/,PPe=/^\/api\/local\/projects\/([^/]+)\/skill-drafts\/([^/]+)$/,APe=/^\/api\/local\/projects\/([^/]+)\/skill-drafts\/([^/]+)\/publish$/,EZ=async e=>{let t=await e.readBody(e.request);if(!t.trim())return{};let r=JSON.parse(t);if(r===null||typeof r!="object"||Array.isArray(r))throw new Error("invalid_json");return r},TZ=e=>{let t=e instanceof Error?e.message:"error";return t==="draft_not_found"?{status:404,code:t}:t==="invalid_draft_id"||t==="invalid_project_id"||t==="draft_incomplete"||t==="invalid_project_skill_id"||t==="invalid_json"?{status:400,code:t}:{status:500,code:"error"}},qj=async e=>{if(hPe.test(e.pathname)){if(e.method!=="GET")return e.response.writeHead(405),e.response.end(),!0;let s=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("projectId")??"";if(!kt(s))return e.sendJson(e.response,400,{ok:!1,error:"invalid_project_id"}),!0;let i=[];try{i=Qm(s)}catch{i=[]}let a=e.resolveProjectName(s)??s.slice(0,8);return e.sendHtml(e.response,RZ({projectId:s,projectName:a,online:e.online,drafts:i})),!0}let t=APe.exec(e.pathname);if(t!==null){if(e.method!=="POST")return e.sendJson(e.response,405,{ok:!1,error:"method_not_allowed"}),!0;let n=decodeURIComponent(t[1]??""),s=decodeURIComponent(t[2]??"");if(!kt(n))return e.sendJson(e.response,400,{ok:!1,error:"invalid_project_id"}),!0;try{let i=await EZ(e),a=Kj({projectId:n,draftId:s,title:typeof i.title=="string"?i.title:void 0,body:typeof i.body=="string"?i.body:void 0});e.sendJson(e.response,200,{ok:!0,...a})}catch(i){let a=TZ(i);e.sendJson(e.response,a.status,{ok:!1,error:a.code})}return!0}let r=PPe.exec(e.pathname);if(r!==null){let n=decodeURIComponent(r[1]??""),s=decodeURIComponent(r[2]??"");if(!kt(n))return e.sendJson(e.response,400,{ok:!1,error:"invalid_project_id"}),!0;try{if(e.method==="GET"){let i=Vi(n,s);return i===null?(e.sendJson(e.response,404,{ok:!1,error:"draft_not_found"}),!0):(e.sendJson(e.response,200,{ok:!0,draft:i}),!0)}if(e.method==="PUT"){let i=await EZ(e),a=Uj({projectId:n,draftId:s,title:typeof i.title=="string"?i.title:"",body:typeof i.body=="string"?i.body:"",tags:Array.isArray(i.tags)?i.tags.filter(c=>typeof c=="string"):void 0});return e.sendJson(e.response,200,{ok:!0,draft:a}),!0}if(e.method==="DELETE")return tg({projectId:n,draftId:s}),e.sendJson(e.response,200,{ok:!0}),!0;e.sendJson(e.response,405,{ok:!1,error:"method_not_allowed"})}catch(i){let a=TZ(i);e.sendJson(e.response,a.status,{ok:!1,error:a.code})}return!0}let o=SPe.exec(e.pathname);if(o!==null){if(e.method!=="GET")return e.sendJson(e.response,405,{ok:!1,error:"method_not_allowed"}),!0;let n=decodeURIComponent(o[1]??"");if(!kt(n))return e.sendJson(e.response,400,{ok:!1,error:"invalid_project_id"}),!0;try{let s=Qm(n);e.sendJson(e.response,200,{ok:!0,projectId:n,drafts:s})}catch{e.sendJson(e.response,500,{ok:!1,error:"could_not_read_drafts"})}return!0}return!1}});var Yj,WZ,IZ,_Pe,Jj,LZ,bPe,vZ,kPe,xZ,RPe,rg,OZ=l(()=>{"use strict";Yj=u(require("node:fs")),WZ=u(require("node:path"));ft();Xm();Qn();ee();te();uc();IZ="[project-history-ai-session]",_Pe=280,Jj=e=>e.length>0&&e.length<=200&&!e.includes("/")&&!e.includes("\\")&&!e.includes("..")&&!e.startsWith("."),LZ=e=>{let t=e.trim().replace(/\s+/g," ").slice(0,_Pe);if(t.length===0)return"";let r=en(t);return r.residualSecret?"[redacted]":r.scrubbed},bPe=e=>{if(e.length===0)return"";let t=en(e);return t.residualSecret?"[redacted]":t.scrubbed},vZ=e=>e===null?null:bPe(e),kPe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),xZ=e=>typeof e!="string"?null:e,RPe=e=>{try{if(!Yj.default.existsSync(e))return null;let t=JSON.parse(Yj.default.readFileSync(e,"utf8"));if(!kPe(t))return null;let r=typeof t.taskId=="string"&&t.taskId.trim().length>0?t.taskId.trim():null,o=typeof t.projectId=="string"&&t.projectId.trim().length>0?t.projectId.trim():null,n=typeof t.status=="string"&&t.status.trim().length>0?t.status.trim():null,s=typeof t.createdAt=="string"&&t.createdAt.trim().length>0?t.createdAt.trim():null,i=typeof t.savedAt=="string"&&t.savedAt.trim().length>0?t.savedAt.trim():null;if(r===null||o===null||n===null||s===null||i===null)return null;let a=t.threadKey,c=a==null?null:typeof a=="string"&&a.trim().length>0?a.trim():null;return{taskId:r,projectId:o,threadKey:c,writerAgent:typeof t.writerAgent=="string"&&t.writerAgent.trim().length>0?t.writerAgent.trim():null,status:n,promptSummary:typeof t.promptSummary=="string"?t.promptSummary:"",resultSummary:typeof t.resultSummary=="string"?t.resultSummary:"",promptBody:xZ(t.promptBody),resultBody:xZ(t.resultBody),createdAt:s,completedAt:t.completedAt===null||t.completedAt===void 0?null:typeof t.completedAt=="string"&&t.completedAt.trim().length>0?t.completedAt.trim():null,agentRunId:typeof t.agentRunId=="string"&&t.agentRunId.trim().length>0?t.agentRunId.trim():null,savedAt:i}}catch{return null}},rg=e=>{let t=e.projectId.trim(),r=e.taskId.trim();if(!Jj(r))return{ok:!1,reason:"invalid_task_id"};let o=uo(t);if(o===null)return{ok:!1,reason:"history_unknown"};if(!Gi(o.state))return{ok:!1,reason:"history_off"};let n=new Date().toISOString(),s=typeof e.agentRunId=="string"&&e.agentRunId.trim().length>0?e.agentRunId.trim():r,i=s.length>0&&Jj(s)?s:r;if(!Jj(i))return{ok:!1,reason:"invalid_task_id"};let a;try{a=ge(t)}catch(S){return console.error(IZ,"write_failed",t,r,S),{ok:!1,reason:"write_failed"}}let c=WZ.default.join(a,ji,`${i}.json`),d=RPe(c),p=e.promptBody!==void 0?vZ(e.promptBody):d?.promptBody??null,m=e.resultBody!==void 0?vZ(e.resultBody):d?.resultBody??null,g=typeof e.promptSummary=="string"&&e.promptSummary.trim().length>0?e.promptSummary:p??d?.promptSummary??"",y=typeof e.resultSummary=="string"&&e.resultSummary.trim().length>0?e.resultSummary:m??d?.resultSummary??"",h={taskId:r,projectId:t,threadKey:typeof e.threadKey=="string"&&e.threadKey.trim().length>0?e.threadKey.trim():d?.threadKey??null,writerAgent:typeof e.writerAgent=="string"&&e.writerAgent.trim().length>0?e.writerAgent.trim():d?.writerAgent??null,status:e.status.trim()||d?.status||"completed",promptSummary:LZ(g),resultSummary:LZ(y),promptBody:p,resultBody:m,createdAt:typeof e.createdAt=="string"&&e.createdAt.trim().length>0?e.createdAt.trim():d?.createdAt??n,completedAt:e.completedAt===void 0?d?.completedAt??n:e.completedAt===null?null:e.completedAt.trim()||null,agentRunId:s,savedAt:n};try{return ie(c,`${JSON.stringify(h,null,2)}
`),{ok:!0,record:h}}catch(S){return console.error(IZ,"write_failed",t,r,S),{ok:!1,reason:"write_failed"}}}});var jZ=l(()=>{"use strict"});var MZ=l(()=>{"use strict";jZ()});var ib=l(()=>{"use strict";rc();te();b_();S0();_0();R0();B0();YX();r9();He();yO();SO();Nj();Jn();hZ();Qn();He();bO();AO();IO();uc();kO();wO();cj();sj();aj();hj();W_();z_();L_();x_();jj();OO();MO();j_();SZ();Bm();Nm();Hm();zm();uj();Rj();yj();_j();gj();M_();Ej();Xm();N_();qO();$O();UO();rj();KO();XO();B_();G_();He();T_();PZ();$m();C_();Fj();AZ();ic();jm();ee();H0();j0();R_();V0();Y0();pO();mO();lO();eg();Bj();nb();Vj();CZ();OZ();oO();iO();ee();MZ()});var dr,wPe,NZ,DZ,Xj,Zj,Qj,eM,tM,rM,oM=l(()=>{"use strict";dr=require("node:crypto"),wPe=Buffer.from("302a300506032b6570032100","hex"),NZ=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},DZ=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,dr.createPublicKey)({key:Buffer.concat([wPe,t]),format:"der",type:"spki"})},Xj=()=>{let{publicKey:e,privateKey:t}=(0,dr.generateKeyPairSync)("ed25519");return{publicKeyRaw:NZ(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},Zj=e=>(0,dr.createPrivateKey)(e),Qj=(e,t)=>(0,dr.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),eM=(e,t,r)=>{try{let o=DZ(e);return(0,dr.verify)(null,Buffer.from(t,"utf8"),o,Buffer.from(r,"base64url"))}catch{return!1}},tM=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,rM=()=>(0,dr.randomBytes)(32).toString("base64url")});var tn,ab,HZ,EPe,TPe,lb,nM,sM,FZ=l(()=>{"use strict";tn=u(require("node:fs")),ab=u(require("node:path"));oM();Q();Ge();HZ=e=>ab.default.join(e.installDir,pn),EPe=(e,t)=>{if(e.profileEmail===null||t===HZ(e)||tn.default.existsSync(t))return;let r=HZ(e);tn.default.existsSync(r)&&(tn.default.mkdirSync(ab.default.dirname(t),{recursive:!0}),tn.default.renameSync(r,t))},TPe=e=>{if(!tn.default.existsSync(e))return null;try{let t=tn.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},lb=e=>{let t=ed(e);EPe(e,t);let r=TPe(t);if(r!==null)return r;let o=Xj();return tn.default.mkdirSync(ab.default.dirname(t),{recursive:!0}),tn.default.writeFileSync(t,JSON.stringify(o,null,2),{mode:384}),o},nM=e=>{let t=lb(e.layout),r=rM(),o=tM({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),n=Zj(t.privateKeyPem),s=Qj(n,o);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},sM=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return eM(e.serverPublicKey,t,e.serverAttestation)}});var iM=l(()=>{"use strict";FZ();oM()});var $Z,zZ,UZ=l(()=>{"use strict";$Z=u(require("node:path")),zZ=e=>({osUid:typeof e.uid=="number"&&Number.isInteger(e.uid)&&e.uid>=0?e.uid:null,installRootName:$Z.default.basename(e.installDir)})});var BZ=l(()=>{"use strict";fs()});var VZ,og,ts,cM,GZ,IPe,aM,cb,Fe,qZ,LPe,lM,vPe,xPe,qi,WPe,de,Ze,KZ,Xe,OPe,jPe,MPe,ng,sg,JZ=l(()=>{"use strict";VZ=u(require("node:http")),og=u(require("node:fs")),ts=u(require("node:path"));Pl();EV();CV();lP();ti();HS();US();db();eu();UV();GV();XV();vs();VI();hL();I5();JA();tW();U3();Qr();iW();Q3();m7();f7();p_();C7();D7();En();_t();At();H7();$7();ET();hC();CT();B7();eX();rX();sX();KW();Kr();hX();ib();ne();iM();UZ();BZ();cM=e=>xI(e)??"never",GZ=48e3,IPe=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,aM=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??Oh(),reveal:t.reveal,installed:Eo(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),cb=async e=>{let t=B();return t===null?{ok:!1,projects:[],message:"Client config missing \u2014 pair this computer in AgentWitch Cloud to load projects."}:Xr(t,e)},Fe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),qZ=200,LPe=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',lM=e=>{let t=e.trim().slice(0,qZ),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},vPe=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${Fe(t)}</div>`,xPe=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${Fe(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',qi={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},WPe=()=>{let e=B();return e===null?null:J({wsUrl:e.wsUrl,pairingToken:e.pairingToken})},de=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...qi}),e.end(JSON.stringify(r))},Ze=(e,t)=>{e.writeHead(200,{"Content-Type":"text/plain; charset=utf-8",...qi}),e.end(ii)},KZ=e=>{Ze(e,"")},Xe=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},OPe=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Not linked</span>',r=e.status.wsConnected?"":'<p class="status-hint">This computer is not linked to AgentWitch cloud (token missing or revoked). Open Home \u2192 Connect this computer for a fresh install command \u2014 do not reuse an old one.</p>',o=LPe(e.healthBadge),n=e.status.wakeError?`<div class="alert-error">${Fe(e.status.wakeError)}</div>`:"",s=e.revived?`<div class="alert-success">${Fe(QI(process.platform))}</div>`:"",i=zW(e.status.wsConnected)?`<div class="actions">
        <form method="POST" action="/api/revive">
          <button class="btn btn-primary" type="submit">Revive WebSocket</button>
        </form>
      </div>`:"";return`<section class="card">
      <p class="eyebrow">Local bridge</p>
      <h1>Status</h1>
      <p class="lede">Connection and pairing details for AgentWitch on this computer.</p>
      ${s}
      <div class="meta-grid">
        <div class="meta-item"><span class="meta-label">WebSocket</span><span class="meta-value">${t}</span></div>${r}
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${YI(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${o}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${Fe(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${Fe(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${Fe(cM(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${Fe(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${n}
      ${i}
    </section>`},jPe=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},MPe=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,qZ)},ng=e=>{let t=ts.default.join(e.layout.installDir,"link-code.txt"),r=ts.default.join(e.layout.installDir,"profiles"),o=ts.default.dirname(e.layout.configPath),n=zC({profileDir:o,profilesDir:r}),s=n.start,i=!1,a=n.end-n.start+1,c=0,d=()=>ze(e.layout.installDir),p=()=>{let b=d();return{installBundleVersion:g_(b),installBundleUpdatedAt:b?.updatedAt??null,installVersion:b}},m=async b=>{let P=b.installVersion??d(),C=await y(),L=_L(C),pe=b.updateFlash??null,Z=bL(pe),$e=vPe(pe,b.updateError??null);return PL({title:b.title,activePath:b.activePath,body:b.body,cloudAppOrigin:Nr(P),installBundleVersionLabel:g_(P),prependBody:`${Z}${$e}${L}`,headerUpdateButtonHtml:AL(C)})},g=null,y=async()=>{let b=Date.now();if(g!==null&&b-g.cachedAtMs<6e4)return g.offer;let P=await $W(e.layout);return g={cachedAtMs:b,offer:P},P},h=()=>{g=null},S=!1,E=async b=>{if(h(),!(await y()).updateAvailable){b.writeHead(303,{Location:"/?update=ok"}),b.end();return}if(S){b.writeHead(303,{Location:lM("An update is already running.")}),b.end();return}S=!0;try{let C=await GW(),L=C.ok?"/?update=ok":lM(C.message);b.writeHead(303,{Location:L}),b.end()}catch(C){let L=C instanceof Error&&C.message.trim().length>0?C.message:"Install bundle update failed.";b.writeHead(303,{Location:lM(L)}),b.end()}finally{S=!1,h()}},I=async(b,P)=>{b.writeHead(404,{"Content-Type":"text/plain; charset=utf-8",...qi}),b.end(ii)},f=()=>{if(og.default.existsSync(t))return og.default.readFileSync(t,"utf8").trim();let b=Math.random().toString(36).slice(2,8).toUpperCase();return og.default.writeFileSync(t,b,"utf8"),b},w=Bn({layout:e.layout}),W=VZ.default.createServer((b,P)=>{(async()=>{let C=b.url?.split("?")[0]??"/",L=b.method??"GET";if(L==="OPTIONS"){P.writeHead(204,qi),P.end();return}let pe=b.headers["user-agent"],Z=Array.isArray(pe)?pe[0]:pe;if(OI({method:L,pathname:C,userAgent:Z})){KZ(P);return}if(await Ux({method:L,pathname:C,request:b,response:P,requestUrl:b.url??"/",storePath:Z3(ts.default.dirname(e.layout.configPath)),readBody:Xe,sendHtml:wV({pathname:C,userAgent:Z,headers:qi}),renderShell:m})||await $3({method:L,pathname:C,request:b,response:P,configPath:e.layout.configPath,readBody:Xe,sendJson:de})||await z3({method:L,pathname:C,request:b,response:P,profileDir:ts.default.dirname(e.layout.configPath),readCloudConfig:WPe,readBody:Xe,sendJson:de})||await kS({method:L,pathname:C,request:b,response:P,layout:e.layout,readBody:Xe,sendJson:de})||$j({method:L,pathname:C,requestUrl:b.url??"/",response:P,sendJson:de})||await qj({method:L,pathname:C,requestUrl:b.url??"/",request:b,response:P,online:e.controllers.getStatus().wsConnected,resolveProjectName:k=>k.slice(0,8),readBody:Xe,sendHtml:Ze,sendJson:de})||await QA({method:L,pathname:C,request:b,response:P,layout:e.layout,readBody:Xe,sendJson:de,server:w}))return;if(L==="GET"&&C==="/health"){let k=e.controllers.getStatus(),R=p();de(P,200,{ok:!0,...k,installBundleVersion:R.installBundleVersion,installBundleUpdatedAt:R.installBundleUpdatedAt,localAppPort:s,localPortRange:{start:n.start,end:n.end},portsExhausted:i,...TV(),...zZ({uid:process.getuid?.(),installDir:e.layout.installDir})});return}if(L==="GET"&&C==="/api/status"){let k=p();de(P,200,{...e.controllers.getStatus(),linkCode:f(),projectFolders:jo(ts.default.dirname(e.layout.configPath)),installBundleVersion:k.installBundleVersion,installBundleUpdatedAt:k.installBundleUpdatedAt});return}if(L==="GET"&&C==="/api/traffic"){de(P,200,{entries:cP(e.layout)});return}if(L==="DELETE"&&C==="/api/traffic"||L==="POST"&&C==="/api/traffic/clear"){if(NI(e.layout),L==="POST"){P.writeHead(303,{Location:"/traffic?cleared=1"}),P.end();return}de(P,200,{ok:!0});return}if(L==="GET"&&C==="/api/trace"){de(P,200,{entries:pP(e.layout)});return}if(L==="DELETE"&&C==="/api/trace"||L==="POST"&&C==="/api/trace/clear"){if(FI(e.layout),L==="POST"){P.writeHead(303,{Location:"/status"}),P.end();return}de(P,200,{ok:!0});return}if(L==="POST"&&C==="/api/errors/clear"){$I(e.layout.errorLogPath),P.writeHead(303,{Location:"/errors?cleared=1"}),P.end();return}if(L==="GET"&&C==="/api/knowledge"){let R=new URL(b.url??"/",`http://127.0.0.1:${s}`).searchParams.get("q")?.trim()??"";if(R.length>0){let O=await Rl({layout:e.layout,query:R,limit:20});de(P,200,{chunks:O,query:R});return}de(P,200,{chunks:iu(e.layout).slice(-50).reverse()});return}if(L==="POST"&&C==="/api/revive"){e.controllers.reviveWebSocket(),P.writeHead(303,{Location:"/status?revived=1"}),P.end();return}if(L==="GET"&&C==="/api/update-status"){let k=await y();de(P,200,{ok:!0,...k});return}if((L==="GET"||L==="POST")&&C==="/api/update"){await E(P);return}if(L==="GET"&&C==="/"){KZ(P);return}if(L==="GET"&&C==="/task"){let k=e.controllers.getStatus(),R=p(),O=B(),D=new URL(b.url??"/",`http://127.0.0.1:${s}`),H=D.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,$=D.searchParams.get("failed")==="1"?D.searchParams.get("error")?.trim()??"Task failed.":null,q=D.searchParams.get("runId");Ze(P,await m({title:"Task",activePath:"/task",installVersion:R.installVersion,body:aW({defaultWorkspace:O?.workspace??"",wsConnected:k.wsConnected,flashMessage:H,flashError:$,lastRunId:q})}));return}if(L==="POST"&&C==="/task/dispatch"){let k=await Xe(b),R=new URLSearchParams(k),O=R.get("prompt")?.trim()??"",D=R.get("writerAgent")?.trim()??"claude-cli",H=R.get("projectFolder")?.trim()??"",$=await qW({prompt:O,writerAgent:D,...H.length>0?{projectFolderPath:H}:{}}),q=new URLSearchParams;$.ok?q.set("ok","1"):(q.set("failed","1"),$.errorMessage!==void 0&&q.set("error",$.errorMessage.slice(0,240))),$.agentRunId!==void 0&&q.set("runId",$.agentRunId),P.writeHead(303,{Location:`/task?${q.toString()}`}),P.end();return}if(L==="GET"&&C==="/writer-sessions"){let k=p(),R=a_(e.layout,12);Ze(P,await m({title:"Writer sessions",activePath:"/writer-sessions",installVersion:k.installVersion,updateFlash:jPe(b.url??void 0),updateError:MPe(b.url??void 0),body:gW({sessions:R})}));return}if(L==="GET"&&C==="/errors"){let k=p(),R=zI(e.layout.errorLogPath);Ze(P,await m({title:"Errors",activePath:"/errors",installVersion:k.installVersion,body:BI({errorLogPath:e.layout.errorLogPath,content:R.content,exists:R.exists,truncated:R.truncated,byteSize:R.byteSize,cleared:new URL(b.url??"/",`http://127.0.0.1:${s}`).searchParams.get("cleared")==="1"})}));return}if(L==="GET"&&C==="/status"){let k=new URL(b.url??"/",`http://127.0.0.1:${s}`),R=e.controllers.getStatus(),O=Ue(e.layout),D=O!==null?tt(O,12e4):qI(R.lastHeartbeatAt,12e4),H=JI({lastHeartbeatAt:R.lastHeartbeatAt,heartbeatIsStale:D}),$=p();Ze(P,await m({title:"Status",activePath:"/status",installVersion:$.installVersion,body:`${OPe({status:R,healthBadge:H,revived:k.searchParams.get("revived")==="1",linkCode:f(),installBundleVersion:$.installBundleVersion,installBundleUpdatedAt:$.installBundleUpdatedAt})}${ZI({installDir:e.layout.installDir,platform:process.platform})}${XI({entries:pP(e.layout)})}`}));return}if(L==="GET"&&C==="/traffic"){let k=new URL(b.url??"/",`http://127.0.0.1:${s}`),R=cP(e.layout),O=p(),D=R.map(q=>`<tr><td title="${Fe(q.at)}">${Fe(cM(q.at))}</td><td>${Fe(q.direction)}</td><td><code>${Fe(q.type)}</code></td><td>${Fe(q.summary)}</td><td>${Fe(q.action??"")}</td></tr>`).join(""),H=R.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${D}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',$=k.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";Ze(P,await m({title:"Traffic",activePath:"/traffic",installVersion:O.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${$}
              ${H}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(L==="GET"&&C==="/projects"){let k=new URL(b.url??"/",`http://127.0.0.1:${s}`),R=p(),O=Nr(R.installVersion),D=await cb(e.layout),H=k.searchParams.get("folderError")==="1"?"Could not save the selected folder to AgentWitch. Check the Mac connection and try again.":k.searchParams.get("deleteError")==="1"?"Could not delete the project in AgentWitch Cloud. Check pairing on Status.":null,$=k.searchParams.get("deleted")==="1"?"Project removed from AgentWitch Cloud. Folders on your computer were not deleted.":null,q=B(),ye=q===null?null:J({wsUrl:q.wsUrl,pairingToken:q.pairingToken}),he=ye===null?{}:Object.fromEntries((await Promise.all(D.projects.map(async Ot=>{let jt=await vW(ye,Ot.id);return[Ot.id,jt?.counts??null]}))).filter(Ot=>Ot[1]!==null));Ze(P,await m({title:"Projects",activePath:"/projects",installVersion:R.installVersion,body:HW({projects:D.projects,compositionCountsByProjectId:he,cloudAppOrigin:O,syncMessage:D.message,syncOk:D.ok,flashMessage:$,flashError:H})}));return}if(L==="GET"&&C==="/projects/select-folder"){let R=new URL(b.url??"/",`http://127.0.0.1:${s}`).searchParams.get("projectId")?.trim()??"",O=B(),D=O===null?null:J({wsUrl:O.wsUrl,pairingToken:O.pairingToken}),H=R.length>0&&D!==null?In():null;if(H===null||D===null){P.writeHead(200,{"Content-Type":"text/plain; charset=utf-8",...qi}),P.end(ii);return}let $=await Mo({projectId:R,folderPath:H,allowOutsideHome:!0,profileDir:ts.default.dirname(e.layout.configPath),cloudConfig:D});if(!$.ok){de(P,$.httpStatus,{ok:!1,error:$.message});return}de(P,200,{ok:!0,projectId:R,folderPath:$.folderPath,bindingsSynced:$.bindingsSynced,summary:$.summary});return}if(L==="POST"&&C==="/projects/delete"){let k=await Xe(b),R=new URLSearchParams(k).get("projectId")?.trim()??"",O=B(),D=O===null?null:J({wsUrl:O.wsUrl,pairingToken:O.pairingToken});if(D===null||R.length===0){P.writeHead(303,{Location:"/projects?deleteError=1"}),P.end();return}let H=await HT(D,R);P.writeHead(303,{Location:H.ok?"/projects?deleted=1":"/projects?deleteError=1"}),P.end();return}if(L==="GET"&&C==="/project"){let k=new URL(b.url??"/",`http://127.0.0.1:${s}`),R=k.searchParams.get("id")?.trim()??"",O=p(),D=Nr(O.installVersion),H=await cb(e.layout),$=Rr(H.projects,R);if($===null){await I(P,"Project not found");return}let q=k.searchParams.get("linked")==="1"?k.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${k.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${k.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:k.searchParams.get("folderUpdated")==="1"?k.searchParams.get("bindingsSynced")==="0"?"Project folder updated. Harness composition sync to cloud failed \u2014 check WS connection on Status.":"Project folder updated and harness bindings synced with AgentWitch.":null,ye=k.searchParams.get("knowledgePromoted"),he=ye!==null?`Marked ${ye} lesson(s) as promoted in AgentWitch.`:null,Ot=k.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,jt=k.searchParams.get("tab")?.trim()??"harness",Be=jt==="workflows"||jt==="agents"||jt==="knowledge"||jt==="pitfalls"?jt:"harness",Mg=k.searchParams.get("retired")==="1",Fre=k.searchParams.get("edit")?.trim()||null,JN=U7(k.searchParams.get("pitfall")),Yb=B(),dn=Yb===null?null:J({wsUrl:Yb.wsUrl,pairingToken:Yb.pairingToken}),$re=dn===null?null:await vW(dn,$.id),Xb=0;if(dn!==null)try{let rD=await fetch(`${dn.appOrigin}/api/agent-witch/projects/${encodeURIComponent($.id)}/knowledge`,{method:"GET",headers:{[ae]:dn.pairingToken},signal:AbortSignal.timeout(1e4)});if(rD.ok){let Ng=await rD.json();typeof Ng=="object"&&Ng!==null&&typeof Ng.candidateCount=="number"&&(Xb=Ng.candidateCount)}}catch{Xb=0}let YN=k.searchParams.get("rulePrompt"),XN=YN!==null,zre=YN?.trim()??"",ZN=k.searchParams.get("ruleDropped")?.trim()||null,QN=k.searchParams.get("ruleDroppedTitle")?.trim()||null,eD=k.searchParams.get("ruleChangeError")?.trim()||null,Ure=(k.searchParams.get("ruleChangeAction")?.trim()||null)==="restore"?"restore":"drop",Bre=eD===null?null:{ok:!1,reason:eD},tD=Be==="pitfalls"||Be==="harness"&&XN?await B1({store:IS({layout:e.layout,cloud:dn===null?null:Ep(dn)}),projectId:$.id,includeRetired:Be==="pitfalls"?Mg:!1}):void 0,Gre=Be!=="harness"?void 0:await Q7({projectId:$.id,prompt:XN?zre:null,cloudConfig:dn,pitfalls:tD,dropFlash:ZN!==null&&QN!==null?{ruleId:ZN,title:QN}:null,changeError:Bre,changeAction:Ure});Ze(P,await m({title:$.name,activePath:"/projects",installVersion:O.installVersion,body:Tn({project:$,cloudAppOrigin:D,installed:Eo(e.layout),linkedSetSlugs:rr($.projectFolderPath),composition:$re,knowledgeCandidateCount:Xb,pitfalls:tD,pitfallsShowRetired:Mg,pitfallsEditId:Fre,activeTab:Be,harnessExtraHtml:Gre,flashMessage:q??he??JN?.message??null,flashError:Ot??JN?.error??null})}));return}if(L==="POST"&&(C==="/project/rules/drop"||C==="/project/rules/restore")){let k=await Xe(b),R=B(),O=R===null?null:J({wsUrl:R.wsUrl,pairingToken:R.pairingToken}),D=await tX({action:C.endsWith("/drop")?"drop":"restore",rawBody:k,cloudConfig:O});if(D.kind==="not_found"){await I(P,"Project not found");return}P.writeHead(303,{Location:D.location}),P.end();return}if(L==="POST"&&C==="/projects/pull-bound-harness"){let k=await Xe(b),R=await RT({rawBody:k,layout:e.layout});if(R.kind==="not_found"){await I(P,"Project not found");return}if(R.kind==="redirect"){P.writeHead(303,{Location:R.location}),P.end();return}let O=p();Ze(P,await m({title:R.title,activePath:"/projects",installVersion:O.installVersion,body:R.body}));return}if(L==="POST"&&C==="/projects/link-harness"){let k=await Xe(b),R=new URLSearchParams(k),O=R.get("projectId")?.trim()??"",D=await cb(e.layout),H=Rr(D.projects,O);if(H===null){await I(P,"Project not found");return}let $=R.getAll("applySet").map(Be=>String(Be)),q=yp({layout:e.layout,projectFolderPath:H.projectFolderPath,setSlugs:$});if(!q.ok){let Be=p(),Mg=Nr(Be.installVersion);Ze(P,await m({title:H.name,activePath:"/projects",installVersion:Be.installVersion,body:Tn({project:H,cloudAppOrigin:Mg,installed:Eo(e.layout),linkedSetSlugs:rr(H.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:q.errorMessage})}));return}let ye=B(),he=ye===null?null:J({wsUrl:ye.wsUrl,pairingToken:ye.pairingToken}),Ot=he===null?!1:await Co(he,H.id,q.appliedSetSlugs),jt=new URLSearchParams({linked:"1",files:String(q.writtenFileCount),bindingsSynced:Ot?"1":"0"});P.writeHead(303,{Location:`/project?id=${encodeURIComponent(H.id)}&${jt.toString()}`}),P.end();return}if(L==="POST"&&C==="/projects/remove-harness-set"){let k=await Xe(b),R=await wT({rawBody:k,layout:e.layout});if(R.kind==="not_found"){await I(P,"Project not found");return}if(R.kind==="redirect"){P.writeHead(303,{Location:R.location}),P.end();return}let O=p();Ze(P,await m({title:R.title,activePath:"/projects",installVersion:O.installVersion,body:R.body}));return}if(L==="POST"&&C==="/project/knowledge/promote-all"){let k=await Xe(b),O=new URLSearchParams(k).get("projectId")?.trim()??"",D=await cb(e.layout),H=Rr(D.projects,O);if(H===null){await I(P,"Project not found");return}let $=B(),q=$===null?null:J({wsUrl:$.wsUrl,pairingToken:$.pairingToken}),ye=q===null?{ok:!1,promotedCount:0}:await F7(q,H.id),he=new URLSearchParams({tab:"knowledge",...ye.ok?{knowledgePromoted:String(ye.promotedCount)}:{knowledgePromoteFailed:"1"}});P.writeHead(303,{Location:`/project?id=${encodeURIComponent(H.id)}&${he.toString()}`}),P.end();return}let $e=Jh(C);if(L==="POST"&&$e!==null){let k=await Xe(b),R=await IT({rawBody:k,action:$e,layout:e.layout,createStore:O=>IS({layout:e.layout,cloud:Ep(O)})});if(R.kind==="not_found"){await I(P,"Project not found");return}P.writeHead(303,{Location:R.location}),P.end();return}if(L==="GET"&&C==="/harness"){let k=new URL(b.url??"/",`http://127.0.0.1:${s}`),R=p(),O=Ap(e.layout),D=k.searchParams.get("submitted")==="1",H=D?k.searchParams.get("syncFailed")==="1"?`Local harness updated (${k.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:k.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${k.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":k.searchParams.get("stopped")==="1"?`Reveal stopped. ${O?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:k.searchParams.get("revealed")==="1"?`Reveal found ${O?.sets.length??0} set(s).`:null,$=O?.scanRoots[0]??Oh(),q=IPe(e.layout,{reveal:O,importQuery:k.searchParams.get("import")==="1",justSubmitted:D}),ye=Nr(R.installVersion);Ze(P,await m({title:"Harness",activePath:"/harness",installVersion:R.installVersion,body:bm(aM(e.layout,{cloudAppOrigin:ye,reveal:O,scanFolder:$,flashMessage:H,importSectionExpanded:q}))}));return}if(L==="POST"&&C==="/api/harness/pick-folder"){let k=In();if(k===null){de(P,200,{cancelled:!0});return}de(P,200,{path:k});return}if(L==="GET"&&C==="/api/harness/file-content"){let R=new URL(b.url??"/",`http://127.0.0.1:${s}`).searchParams.get("path")?.trim()??"",O=fp(R);if(O===null){de(P,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let D=og.default.readFileSync(O,"utf8"),H=D.length>GZ?`${D.slice(0,GZ)}
\u2026 (truncated)`:D;de(P,200,{content:H})}catch{de(P,500,{errorMessage:"Could not read file."})}return}if(L==="POST"&&C==="/api/harness/reveal/add-project"){let k=await Xe(b),R="";try{let H=JSON.parse(k);typeof H=="object"&&H!==null&&typeof H.projectPath=="string"&&(R=H.projectPath.trim())}catch{de(P,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(R.length===0){de(P,400,{ok:!1,errorMessage:"projectPath is required."});return}let O=Ap(e.layout),D=YE({reveal:O,projectPath:R});if(D===null||D.sets.length===0){de(P,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}Dh(e.layout,D),de(P,200,{ok:!0,setCount:D.sets.length});return}if(L==="GET"&&C==="/api/harness/reveal/stream"){let R=new URL(b.url??"/",`http://127.0.0.1:${s}`).searchParams.get("scanRoot")?.trim()??"";if(R.length===0){de(P,400,{errorMessage:"Choose a folder to scan first."});return}let O=!1;b.on("close",()=>{O=!0}),P.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...qi});let D=XE({scanRoot:R,response:P,shouldAbort:()=>O});Dh(e.layout,D),P.end();return}if(L==="POST"&&C==="/harness/reveal"){P.writeHead(410,{"Content-Type":"text/plain"}),P.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(L==="POST"&&C==="/harness/submit"){let k=Ap(e.layout);if(k===null){let ye=p(),he=Nr(ye.installVersion);Ze(P,await m({title:"Harness",activePath:"/harness",installVersion:ye.installVersion,body:bm(aM(e.layout,{cloudAppOrigin:he,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let R=await Xe(b),O=new URLSearchParams(R),D=LW(O,k),H=QE({layout:e.layout,sets:D});if(!H.ok){let ye=p(),he=Nr(ye.installVersion);Ze(P,await m({title:"Harness",activePath:"/harness",installVersion:ye.installVersion,body:bm(aM(e.layout,{cloudAppOrigin:he,reveal:k,flashError:H.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}tT(e.layout);let q=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";P.writeHead(303,{Location:`/harness?submitted=1&count=${H.writtenItemCount??0}${q}`}),P.end();return}if(L==="GET"&&C==="/writer-api"){let k=new URL(b.url??"/",`http://127.0.0.1:${s}`),O=B()?.writerExecutionBackend??pt(void 0),D=ot(e.layout.configPath),H=_n(D),$=k.searchParams.get("saved")==="1"?"Writer API settings saved on this computer.":null,q=p();Ze(P,await m({title:"Writer API",activePath:"/writer-api",installVersion:q.installVersion,body:CW({writerExecutionBackend:O,secrets:H,flashMessage:$})}));return}if(L==="POST"&&C==="/writer-api"){let k=await Xe(b),R=new URLSearchParams(k),O=R.get("writerExecutionBackend")?.trim()??"cli";nE({configPath:e.layout.configPath,writerExecutionBackend:pt(O),anthropicApiKey:R.get("anthropicApiKey")??void 0,anthropicModel:R.get("anthropicModel")??void 0,openaiApiKey:R.get("openaiApiKey")??void 0,openaiModel:R.get("openaiModel")??void 0,googleApiKey:R.get("googleApiKey")??void 0,googleModel:R.get("googleModel")??void 0}),P.writeHead(303,{Location:"/writer-api?saved=1"}),P.end();return}if(L==="GET"&&C==="/estimates"){P.writeHead(302,{Location:"/history"}),P.end();return}if(L==="GET"&&C==="/history"){let k=p();Ze(P,await m({title:"History",activePath:"/history",installVersion:k.installVersion,body:mW({reportsDir:e.layout.reportsDir})}));return}if(L==="GET"&&C==="/knowledge"){let R=new URL(b.url??"/",`http://127.0.0.1:${s}`).searchParams.get("q")?.trim()??"",O=p(),D=sL({layout:e.layout}),H=lL(D),$=R.length>0?await Rl({layout:e.layout,query:R,limit:20}):iu(e.layout).slice(-50).reverse(),q=$.map(he=>{let Ot=aL(D,he.id),jt=Ot>0?` \xB7 used in ${Ot} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${Fe(he.createdAt)}">${Fe(cM(he.createdAt))}${he.source?` \xB7 ${Fe(he.source)}`:""}${jt}</div><pre>${Fe(he.text)}</pre></article>`}).join(""),ye=H.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${H.map(he=>`<li><strong>P${he.priority}</strong> \u2014 ${Fe(he.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your computer.</p></section>`:"";Ze(P,await m({title:"Knowledge",activePath:"/knowledge",installVersion:O.installVersion,body:`<section class="card stack">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this computer. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${Fe(R)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
              ${xPe(R,$.length)}
            </section>${ye}${q}`}));return}L==="POST"&&await Xe(b),await I(P,"Not found")})().catch(C=>{console.error("[agent-witch-local-app]",C),P.writeHead(500),P.end("Internal error")})}),_=()=>{FS(o,s);try{cl()}catch(P){let C=P instanceof Error?P.message:String(P);console.error(`[agent-witch] writeGlobalTriggers failed: ${C}`)}console.log(`[agent-witch] Local app http://127.0.0.1:${s} (range ${n.start}\u2013${n.end})`);let b=dS();b!==null&&console.warn(b)},M=async()=>{if(c+=1,c>a){i=!0,zS(o),console.error(`[agent-witch] ${zp}`);return}let b=await BC({profileDir:o,range:n});if(!b.ok){i=!0,console.error(`[agent-witch] ${b.reason}`);return}i=!1,s=b.port,W.listen(s,"127.0.0.1",_)};W.on("error",b=>{if(b.code==="EADDRINUSE"){M();return}console.error("[agent-witch] Local app server error:",b)});let v=Dj();return W.on("close",()=>{v.stop()}),M(),W},sg=e=>lb(e).publicKeyRaw});var YZ=l(()=>{"use strict"});var db=l(()=>{"use strict";Pl();bV();JZ();ti();Pl();lP();HS();YZ();KC();US()});var ZZ={};Mt(ZZ,{runAgentWitchExternalLiveCli:()=>DPe});var dM,XZ,NPe,DPe,QZ=l(()=>{"use strict";dM=u(require("node:fs")),XZ=u(require("node:path"));vs();Q();Uc();ew();Ae();db();Ae();NPe=e=>{let t=XZ.default.join(e,"link-code.txt");if(!dM.default.existsSync(t))return null;let r=dM.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},DPe=()=>{Dt("agent-witch-live");let e=x(),t=z(),r=NPe(e),o=sg(t);ng({layout:t,controllers:{getStatus:()=>{let n=Ue(t);return{wsConnected:Dd(t,{socketOpen:!0}),lastHeartbeatAt:n?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:o}},reviveWebSocket:()=>{ik({platform:process.platform,installDir:e,runners:{kickstartLaunchAgents:()=>Ss(e,process.platform),restartSystemdUserService:vd}}).then(n=>{n.ok||console.warn(`[agent-witch-live] Revive: ${n.message}`)})}}})}});var rn=T((oyt,rQ)=>{"use strict";var eQ=["nodebuffer","arraybuffer","fragments"],tQ=typeof Blob<"u";tQ&&eQ.push("blob");rQ.exports={BINARY_TYPES:eQ,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:tQ,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var ig=T((nyt,pb)=>{"use strict";var{EMPTY_BUFFER:HPe}=rn(),pM=Buffer[Symbol.species];function FPe(e,t){if(e.length===0)return HPe;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),o=0;for(let n=0;n<e.length;n++){let s=e[n];r.set(s,o),o+=s.length}return o<t?new pM(r.buffer,r.byteOffset,o):r}function oQ(e,t,r,o,n){for(let s=0;s<n;s++)r[o+s]=e[s]^t[s&3]}function nQ(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function $Pe(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function uM(e){if(uM.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new pM(e):ArrayBuffer.isView(e)?t=new pM(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),uM.readOnly=!1),t}pb.exports={concat:FPe,mask:oQ,toArrayBuffer:$Pe,toBuffer:uM,unmask:nQ};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");pb.exports.mask=function(t,r,o,n,s){s<48?oQ(t,r,o,n,s):e.mask(t,r,o,n,s)},pb.exports.unmask=function(t,r){t.length<32?nQ(t,r):e.unmask(t,r)}}catch{}});var aQ=T((syt,iQ)=>{"use strict";var sQ=Symbol("kDone"),mM=Symbol("kRun"),gM=class{constructor(t){this[sQ]=()=>{this.pending--,this[mM]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[mM]()}[mM](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[sQ])}}};iQ.exports=gM});var hc=T((iyt,pQ)=>{"use strict";var ag=require("zlib"),lQ=ig(),zPe=aQ(),{kStatusCode:cQ}=rn(),UPe=Buffer[Symbol.species],BPe=Buffer.from([0,0,255,255]),mb=Symbol("permessage-deflate"),on=Symbol("total-length"),fc=Symbol("callback"),rs=Symbol("buffers"),yc=Symbol("error"),ub,fM=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!ub){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;ub=new zPe(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[fc];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,o=t.find(n=>!(r.serverNoContextTakeover===!1&&n.server_no_context_takeover||n.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>n.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&(typeof n.client_max_window_bits=="number"?r.clientMaxWindowBits>n.client_max_window_bits:!n.client_max_window_bits)));if(!o)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(o.server_no_context_takeover=!0),r.clientNoContextTakeover&&(o.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(o.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?o.client_max_window_bits=r.clientMaxWindowBits:(o.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete o.client_max_window_bits,o}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(o=>{let n=r[o];if(n.length>1)throw new Error(`Parameter "${o}" must have only a single value`);if(n=n[0],o==="client_max_window_bits"){if(n!==!0){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else if(o==="server_max_window_bits"){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(o==="client_no_context_takeover"||o==="server_no_context_takeover"){if(n!==!0)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else throw new Error(`Unknown parameter "${o}"`);r[o]=n})}),t}decompress(t,r,o){ub.add(n=>{this._decompress(t,r,(s,i)=>{n(),o(s,i)})})}compress(t,r,o){ub.add(n=>{this._compress(t,r,(s,i)=>{n(),o(s,i)})})}_decompress(t,r,o){let n=this._isServer?"client":"server";if(!this._inflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?ag.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=ag.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[mb]=this,this._inflate[on]=0,this._inflate[rs]=[],this._inflate.on("error",KPe),this._inflate.on("data",dQ)}this._inflate[fc]=o,this._inflate.write(t),r&&this._inflate.write(BPe),this._inflate.flush(()=>{let s=this._inflate[yc];if(s){this._inflate.close(),this._inflate=null,o(s);return}let i=lQ.concat(this._inflate[rs],this._inflate[on]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[on]=0,this._inflate[rs]=[],r&&this.params[`${n}_no_context_takeover`]&&this._inflate.reset()),o(null,i)})}_compress(t,r,o){let n=this._isServer?"server":"client";if(!this._deflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?ag.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=ag.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[on]=0,this._deflate[rs]=[],this._deflate.on("data",GPe)}this._deflate[fc]=o,this._deflate.write(t),this._deflate.flush(ag.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=lQ.concat(this._deflate[rs],this._deflate[on]);r&&(s=new UPe(s.buffer,s.byteOffset,s.length-4)),this._deflate[fc]=null,this._deflate[on]=0,this._deflate[rs]=[],r&&this.params[`${n}_no_context_takeover`]&&this._deflate.reset(),o(null,s)})}};pQ.exports=fM;function GPe(e){this[rs].push(e),this[on]+=e.length}function dQ(e){if(this[on]+=e.length,this[mb]._maxPayload<1||this[on]<=this[mb]._maxPayload){this[rs].push(e);return}this[yc]=new RangeError("Max payload size exceeded"),this[yc].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[yc][cQ]=1009,this.removeListener("data",dQ),this.reset()}function KPe(e){if(this[mb]._inflate=null,this[yc]){this[fc](this[yc]);return}e[cQ]=1007,this[fc](e)}});var Sc=T((ayt,gb)=>{"use strict";var{isUtf8:uQ}=require("buffer"),{hasBlob:VPe}=rn(),qPe=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function JPe(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function yM(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function YPe(e){return VPe&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}gb.exports={isBlob:YPe,isValidStatusCode:JPe,isValidUTF8:yM,tokenChars:qPe};if(uQ)gb.exports.isValidUTF8=function(e){return e.length<24?yM(e):uQ(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");gb.exports.isValidUTF8=function(t){return t.length<32?yM(t):e(t)}}catch{}});var _M=T((lyt,PQ)=>{"use strict";var{Writable:XPe}=require("stream"),mQ=hc(),{BINARY_TYPES:ZPe,EMPTY_BUFFER:gQ,kStatusCode:QPe,kWebSocket:eAe}=rn(),{concat:hM,toArrayBuffer:tAe,unmask:rAe}=ig(),{isValidStatusCode:oAe,isValidUTF8:fQ}=Sc(),fb=Buffer[Symbol.species],pr=0,yQ=1,hQ=2,SQ=3,SM=4,PM=5,yb=6,AM=class extends XPe{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||ZPe[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[eAe]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._numFragments=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=pr}_write(t,r,o){if(this._opcode===8&&this._state==pr)return o();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){o(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(o)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let o=this._buffers[0];return this._buffers[0]=new fb(o.buffer,o.byteOffset+t,o.length-t),new fb(o.buffer,o.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let o=this._buffers[0],n=r.length-t;t>=o.length?r.set(this._buffers.shift(),n):(r.set(new Uint8Array(o.buffer,o.byteOffset,t),n),this._buffers[0]=new fb(o.buffer,o.byteOffset+t,o.length-t)),t-=o.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case pr:this.getInfo(t);break;case yQ:this.getPayloadLength16(t);break;case hQ:this.getPayloadLength64(t);break;case SQ:this.getMask();break;case SM:this.getData(t);break;case PM:case yb:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let n=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(n);return}let o=(r[0]&64)===64;if(o&&!this._extensions[mQ.extensionName]){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(!this._fragmented){let n=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._compressed=o}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let n=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(n);return}if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let n=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(n);return}}else{let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let n=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(n);return}}else if(this._masked){let n=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(n);return}this._payloadLength===126?this._state=yQ:this._payloadLength===127?this._state=hQ:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),o=r.readUInt32BE(0);if(o>Math.pow(2,21)-1){let n=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(n);return}this._payloadLength=o*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=SQ:this._state=SM}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=SM}getData(t){let r=gQ;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&rAe(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._maxFragments>0&&++this._numFragments>this._maxFragments){let o=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(o);return}if(this._compressed){this._state=PM,this.decompress(r,t);return}r.length&&(this._messageLength=this._totalPayloadLength,this._fragments.push(r)),this.dataMessage(t)}decompress(t,r){this._extensions[mQ.extensionName].decompress(t,this._fin,(n,s)=>{if(n)return r(n);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===pr&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=pr;return}let r=this._messageLength,o=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._numFragments=0,this._fragments=[],this._opcode===2){let n;this._binaryType==="nodebuffer"?n=hM(o,r):this._binaryType==="arraybuffer"?n=tAe(hM(o,r)):this._binaryType==="blob"?n=new Blob(o):n=o,this._allowSynchronousEvents?(this.emit("message",n,!0),this._state=pr):(this._state=yb,setImmediate(()=>{this.emit("message",n,!0),this._state=pr,this.startLoop(t)}))}else{let n=hM(o,r);if(!this._skipUTF8Validation&&!fQ(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===PM||this._allowSynchronousEvents?(this.emit("message",n,!1),this._state=pr):(this._state=yb,setImmediate(()=>{this.emit("message",n,!1),this._state=pr,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,gQ),this.end();else{let o=t.readUInt16BE(0);if(!oAe(o)){let s=this.createError(RangeError,`invalid status code ${o}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let n=new fb(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!fQ(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",o,n),this.end()}this._state=pr;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=pr):(this._state=yb,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=pr,this.startLoop(r)}))}createError(t,r,o,n,s){this._loop=!1,this._errored=!0;let i=new t(o?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[QPe]=n,i}};PQ.exports=AM});var RM=T((dyt,bQ)=>{"use strict";var{Duplex:cyt}=require("stream"),{randomFillSync:nAe}=require("crypto"),{types:{isUint8Array:sAe}}=require("util"),AQ=hc(),{EMPTY_BUFFER:iAe,kWebSocket:aAe,NOOP:lAe}=rn(),{isBlob:Pc,isValidStatusCode:cAe}=Sc(),{mask:_Q,toBuffer:Ji}=ig(),ur=Symbol("kByteLength"),dAe=Buffer.alloc(4),hb=8*1024,Yi,Ac=hb,Hr=0,pAe=1,uAe=2,bM=class e{constructor(t,r,o){this._extensions=r||{},o&&(this._generateMask=o,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=Hr,this.onerror=lAe,this[aAe]=void 0}static frame(t,r){let o,n=!1,s=2,i=!1;r.mask&&(o=r.maskBuffer||dAe,r.generateMask?r.generateMask(o):(Ac===hb&&(Yi===void 0&&(Yi=Buffer.alloc(hb)),nAe(Yi,0,hb),Ac=0),o[0]=Yi[Ac++],o[1]=Yi[Ac++],o[2]=Yi[Ac++],o[3]=Yi[Ac++]),i=(o[0]|o[1]|o[2]|o[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[ur]!==void 0?a=r[ur]:(t=Buffer.from(t),a=t.length):(a=t.length,n=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(n?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=o[0],d[s-3]=o[1],d[s-2]=o[2],d[s-1]=o[3],i?[d,t]:n?(_Q(t,o,d,s,a),[d]):(_Q(t,o,t,0,a),[d,t])):[d,t]}close(t,r,o,n){let s;if(t===void 0)s=iAe;else{if(typeof t!="number"||!cAe(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(sAe(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[ur]:s.length,fin:!0,generateMask:this._generateMask,mask:o,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==Hr?this.enqueue([this.dispatch,s,!1,i,n]):this.sendFrame(e.frame(s,i),n)}ping(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):Pc(t)?(n=t.size,s=!1):(t=Ji(t),n=t.length,s=Ji.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[ur]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};Pc(t)?this._state!==Hr?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==Hr?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}pong(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):Pc(t)?(n=t.size,s=!1):(t=Ji(t),n=t.length,s=Ji.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[ur]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};Pc(t)?this._state!==Hr?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==Hr?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}send(t,r,o){let n=this._extensions[AQ.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):Pc(t)?(a=t.size,c=!1):(t=Ji(t),a=t.length,c=Ji.readOnly),this._firstFragment?(this._firstFragment=!1,i&&n&&n.params[n._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=n._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[ur]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};Pc(t)?this._state!==Hr?this.enqueue([this.getBlobData,t,this._compress,d,o]):this.getBlobData(t,this._compress,d,o):this._state!==Hr?this.enqueue([this.dispatch,t,this._compress,d,o]):this.dispatch(t,this._compress,d,o)}getBlobData(t,r,o,n){this._bufferedBytes+=o[ur],this._state=uAe,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(kM,this,a,n);return}this._bufferedBytes-=o[ur];let i=Ji(s);r?this.dispatch(i,r,o,n):(this._state=Hr,this.sendFrame(e.frame(i,o),n),this.dequeue())}).catch(s=>{process.nextTick(mAe,this,s,n)})}dispatch(t,r,o,n){if(!r){this.sendFrame(e.frame(t,o),n);return}let s=this._extensions[AQ.extensionName];this._bufferedBytes+=o[ur],this._state=pAe,s.compress(t,o.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");kM(this,c,n);return}this._bufferedBytes-=o[ur],this._state=Hr,o.readOnly=!1,this.sendFrame(e.frame(a,o),n),this.dequeue()})}dequeue(){for(;this._state===Hr&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][ur],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][ur],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};bQ.exports=bM;function kM(e,t,r){typeof r=="function"&&r(t);for(let o=0;o<e._queue.length;o++){let n=e._queue[o],s=n[n.length-1];typeof s=="function"&&s(t)}}function mAe(e,t,r){kM(e,t,r),e.onerror(t)}});var vQ=T((pyt,LQ)=>{"use strict";var{kForOnEventAttribute:lg,kListener:wM}=rn(),kQ=Symbol("kCode"),RQ=Symbol("kData"),wQ=Symbol("kError"),EQ=Symbol("kMessage"),TQ=Symbol("kReason"),_c=Symbol("kTarget"),CQ=Symbol("kType"),IQ=Symbol("kWasClean"),nn=class{constructor(t){this[_c]=null,this[CQ]=t}get target(){return this[_c]}get type(){return this[CQ]}};Object.defineProperty(nn.prototype,"target",{enumerable:!0});Object.defineProperty(nn.prototype,"type",{enumerable:!0});var Xi=class extends nn{constructor(t,r={}){super(t),this[kQ]=r.code===void 0?0:r.code,this[TQ]=r.reason===void 0?"":r.reason,this[IQ]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[kQ]}get reason(){return this[TQ]}get wasClean(){return this[IQ]}};Object.defineProperty(Xi.prototype,"code",{enumerable:!0});Object.defineProperty(Xi.prototype,"reason",{enumerable:!0});Object.defineProperty(Xi.prototype,"wasClean",{enumerable:!0});var bc=class extends nn{constructor(t,r={}){super(t),this[wQ]=r.error===void 0?null:r.error,this[EQ]=r.message===void 0?"":r.message}get error(){return this[wQ]}get message(){return this[EQ]}};Object.defineProperty(bc.prototype,"error",{enumerable:!0});Object.defineProperty(bc.prototype,"message",{enumerable:!0});var cg=class extends nn{constructor(t,r={}){super(t),this[RQ]=r.data===void 0?null:r.data}get data(){return this[RQ]}};Object.defineProperty(cg.prototype,"data",{enumerable:!0});var gAe={addEventListener(e,t,r={}){for(let n of this.listeners(e))if(!r[lg]&&n[wM]===t&&!n[lg])return;let o;if(e==="message")o=function(s,i){let a=new cg("message",{data:i?s:s.toString()});a[_c]=this,Sb(t,this,a)};else if(e==="close")o=function(s,i){let a=new Xi("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[_c]=this,Sb(t,this,a)};else if(e==="error")o=function(s){let i=new bc("error",{error:s,message:s.message});i[_c]=this,Sb(t,this,i)};else if(e==="open")o=function(){let s=new nn("open");s[_c]=this,Sb(t,this,s)};else return;o[lg]=!!r[lg],o[wM]=t,r.once?this.once(e,o):this.on(e,o)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[wM]===t&&!r[lg]){this.removeListener(e,r);break}}};LQ.exports={CloseEvent:Xi,ErrorEvent:bc,Event:nn,EventTarget:gAe,MessageEvent:cg};function Sb(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var Pb=T((uyt,xQ)=>{"use strict";var{tokenChars:dg}=Sc();function fo(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function fAe(e){let t=Object.create(null),r=Object.create(null),o=!1,n=!1,s=!1,i,a,c=-1,d=-1,p=-1,m=0;for(;m<e.length;m++)if(d=e.charCodeAt(m),i===void 0)if(p===-1&&dg[d]===1)c===-1&&(c=m);else if(m!==0&&(d===32||d===9))p===-1&&c!==-1&&(p=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);p===-1&&(p=m);let y=e.slice(c,p);d===44?(fo(t,y,r),r=Object.create(null)):i=y,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${m}`);else if(a===void 0)if(p===-1&&dg[d]===1)c===-1&&(c=m);else if(d===32||d===9)p===-1&&c!==-1&&(p=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);p===-1&&(p=m),fo(r,e.slice(c,p),!0),d===44&&(fo(t,i,r),r=Object.create(null),i=void 0),c=p=-1}else if(d===61&&c!==-1&&p===-1)a=e.slice(c,m),c=p=-1;else throw new SyntaxError(`Unexpected character at index ${m}`);else if(n){if(dg[d]!==1)throw new SyntaxError(`Unexpected character at index ${m}`);c===-1?c=m:o||(o=!0),n=!1}else if(s)if(dg[d]===1)c===-1&&(c=m);else if(d===34&&c!==-1)s=!1,p=m;else if(d===92)n=!0;else throw new SyntaxError(`Unexpected character at index ${m}`);else if(d===34&&e.charCodeAt(m-1)===61)s=!0;else if(p===-1&&dg[d]===1)c===-1&&(c=m);else if(c!==-1&&(d===32||d===9))p===-1&&(p=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);p===-1&&(p=m);let y=e.slice(c,p);o&&(y=y.replace(/\\/g,""),o=!1),fo(r,a,y),d===44&&(fo(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${m}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");p===-1&&(p=m);let g=e.slice(c,p);return i===void 0?fo(t,g,r):(a===void 0?fo(r,g,!0):o?fo(r,a,g.replace(/\\/g,"")):fo(r,a,g),fo(t,i,r)),t}function yAe(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(o=>[t].concat(Object.keys(o).map(n=>{let s=o[n];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?n:`${n}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}xQ.exports={format:yAe,parse:fAe}});var kb=T((fyt,BQ)=>{"use strict";var hAe=require("events"),SAe=require("https"),PAe=require("http"),jQ=require("net"),AAe=require("tls"),{randomBytes:_Ae,createHash:bAe}=require("crypto"),{Duplex:myt,Readable:gyt}=require("stream"),{URL:EM}=require("url"),os=hc(),kAe=_M(),RAe=RM(),{isBlob:wAe}=Sc(),{BINARY_TYPES:WQ,CLOSE_TIMEOUT:EAe,EMPTY_BUFFER:Ab,GUID:TAe,kForOnEventAttribute:TM,kListener:CAe,kStatusCode:IAe,kWebSocket:Qe,NOOP:MQ}=rn(),{EventTarget:{addEventListener:LAe,removeEventListener:vAe}}=vQ(),{format:xAe,parse:WAe}=Pb(),{toBuffer:OAe}=ig(),NQ=Symbol("kAborted"),CM=[8,13],sn=["CONNECTING","OPEN","CLOSING","CLOSED"],jAe=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,Pe=class e extends hAe{constructor(t,r,o){super(),this._binaryType=WQ[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=Ab,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?!o||o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]:Array.isArray(r)||(typeof r=="object"&&r!==null?(o=r,o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]):r=[r]),DQ(this,t,r,o)):(this._autoPong=o.autoPong,this._closeTimeout=o.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){WQ.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,o){let n=new kAe({allowSynchronousEvents:o.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation}),s=new RAe(t,this._extensions,o.generateMask);this._receiver=n,this._sender=s,this._socket=t,n[Qe]=this,s[Qe]=this,t[Qe]=this,n.on("conclude",DAe),n.on("drain",HAe),n.on("error",FAe),n.on("message",$Ae),n.on("ping",zAe),n.on("pong",UAe),s.onerror=BAe,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",$Q),t.on("data",bb),t.on("end",zQ),t.on("error",UQ),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[os.extensionName]&&this._extensions[os.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){qt(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._sender.close(t,r,!this._isServer,o=>{o||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),this._readyState=e.CLOSING,FQ(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){IM(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||Ab,r,o)}pong(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){IM(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||Ab,r,o)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(o=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){IM(this,t,o);return}let n={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[os.extensionName]||(n.compress=!1),this._sender.send(t||Ab,n,o)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){qt(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(Pe,"CONNECTING",{enumerable:!0,value:sn.indexOf("CONNECTING")});Object.defineProperty(Pe.prototype,"CONNECTING",{enumerable:!0,value:sn.indexOf("CONNECTING")});Object.defineProperty(Pe,"OPEN",{enumerable:!0,value:sn.indexOf("OPEN")});Object.defineProperty(Pe.prototype,"OPEN",{enumerable:!0,value:sn.indexOf("OPEN")});Object.defineProperty(Pe,"CLOSING",{enumerable:!0,value:sn.indexOf("CLOSING")});Object.defineProperty(Pe.prototype,"CLOSING",{enumerable:!0,value:sn.indexOf("CLOSING")});Object.defineProperty(Pe,"CLOSED",{enumerable:!0,value:sn.indexOf("CLOSED")});Object.defineProperty(Pe.prototype,"CLOSED",{enumerable:!0,value:sn.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(Pe.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(Pe.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[TM])return t[CAe];return null},set(t){for(let r of this.listeners(e))if(r[TM]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[TM]:!0})}})});Pe.prototype.addEventListener=LAe;Pe.prototype.removeEventListener=vAe;BQ.exports=Pe;function DQ(e,t,r,o){let n={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:EAe,protocolVersion:CM[1],maxBufferedChunks:262144,maxFragments:16384,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...o,socketPath:void 0,hostname:void 0,protocol:void 0,protocols:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=n.autoPong,e._closeTimeout=n.closeTimeout,!CM.includes(n.protocolVersion))throw new RangeError(`Unsupported protocol version: ${n.protocolVersion} (supported versions: ${CM.join(", ")})`);let s;if(t instanceof EM)s=t;else try{s=new EM(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let S=new SyntaxError(c);if(e._redirects===0)throw S;_b(e,S);return}let d=i?443:80,p=_Ae(16).toString("base64"),m=i?SAe.request:PAe.request,g=new Set,y;if(n.createConnection=n.createConnection||(i?NAe:MAe),n.defaultPort=n.defaultPort||d,n.port=s.port||d,n.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,n.headers={...n.headers,"Sec-WebSocket-Version":n.protocolVersion,"Sec-WebSocket-Key":p,Connection:"Upgrade",Upgrade:"websocket"},n.path=s.pathname+s.search,n.timeout=n.handshakeTimeout,n.perMessageDeflate&&(y=new os({...n.perMessageDeflate,isServer:!1,maxPayload:n.maxPayload}),n.headers["Sec-WebSocket-Extensions"]=xAe({[os.extensionName]:y.offer()})),r.length){for(let S of r){if(typeof S!="string"||!jAe.test(S)||g.has(S))throw new SyntaxError("An invalid or duplicated subprotocol was specified");g.add(S)}n.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(n.origin&&(n.protocolVersion<13?n.headers["Sec-WebSocket-Origin"]=n.origin:n.headers.Origin=n.origin),(s.username||s.password)&&(n.auth=`${s.username}:${s.password}`),a){let S=n.path.split(":");n.socketPath=S[0],n.path=S[1]}let h;if(n.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?n.socketPath:s.host;let S=o&&o.headers;if(o={...o,headers:{}},S)for(let[E,I]of Object.entries(S))o.headers[E.toLowerCase()]=I}else if(e.listenerCount("redirect")===0){let S=a?e._originalIpc?n.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!S||e._originalSecure&&!i)&&(delete n.headers.authorization,delete n.headers.cookie,S||delete n.headers.host,n.auth=void 0)}n.auth&&!o.headers.authorization&&(o.headers.authorization="Basic "+Buffer.from(n.auth).toString("base64")),h=e._req=m(n),e._redirects&&e.emit("redirect",e.url,h)}else h=e._req=m(n);n.timeout&&h.on("timeout",()=>{qt(e,h,"Opening handshake has timed out")}),h.on("error",S=>{h===null||h[NQ]||(h=e._req=null,_b(e,S))}),h.on("response",S=>{let E=S.headers.location,I=S.statusCode;if(E&&n.followRedirects&&I>=300&&I<400){if(++e._redirects>n.maxRedirects){qt(e,h,"Maximum redirects exceeded");return}h.abort();let f;try{f=new EM(E,t)}catch{let W=new SyntaxError(`Invalid URL: ${E}`);_b(e,W);return}DQ(e,f,r,o)}else e.emit("unexpected-response",h,S)||qt(e,h,`Unexpected server response: ${S.statusCode}`)}),h.on("upgrade",(S,E,I)=>{if(e.emit("upgrade",S),e.readyState!==Pe.CONNECTING)return;h=e._req=null;let f=S.headers.upgrade;if(f===void 0||f.toLowerCase()!=="websocket"){qt(e,E,"Invalid Upgrade header");return}let w=bAe("sha1").update(p+TAe).digest("base64");if(S.headers["sec-websocket-accept"]!==w){qt(e,E,"Invalid Sec-WebSocket-Accept header");return}let W=S.headers["sec-websocket-protocol"],_;if(W!==void 0?g.size?g.has(W)||(_="Server sent an invalid subprotocol"):_="Server sent a subprotocol but none was requested":g.size&&(_="Server sent no subprotocol"),_){qt(e,E,_);return}W&&(e._protocol=W);let M=S.headers["sec-websocket-extensions"];if(M!==void 0){if(!y){qt(e,E,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let v;try{v=WAe(M)}catch{qt(e,E,"Invalid Sec-WebSocket-Extensions header");return}let b=Object.keys(v);if(b.length!==1||b[0]!==os.extensionName){qt(e,E,"Server indicated an extension that was not requested");return}try{y.accept(v[os.extensionName])}catch{qt(e,E,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[os.extensionName]=y}e.setSocket(E,I,{allowSynchronousEvents:n.allowSynchronousEvents,generateMask:n.generateMask,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation})}),n.finishRequest?n.finishRequest(h,e):h.end()}function _b(e,t){e._readyState=Pe.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function MAe(e){return e.path=e.socketPath,jQ.connect(e)}function NAe(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=jQ.isIP(e.host)?"":e.host),AAe.connect(e)}function qt(e,t,r){e._readyState=Pe.CLOSING;let o=new Error(r);Error.captureStackTrace(o,qt),t.setHeader?(t[NQ]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(_b,e,o)):(t.destroy(o),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function IM(e,t,r){if(t){let o=wAe(t)?t.size:OAe(t).length;e._socket?e._sender._bufferedBytes+=o:e._bufferedAmount+=o}if(r){let o=new Error(`WebSocket is not open: readyState ${e.readyState} (${sn[e.readyState]})`);process.nextTick(r,o)}}function DAe(e,t){let r=this[Qe];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[Qe]!==void 0&&(r._socket.removeListener("data",bb),process.nextTick(HQ,r._socket),e===1005?r.close():r.close(e,t))}function HAe(){let e=this[Qe];e.isPaused||e._socket.resume()}function FAe(e){let t=this[Qe];t._socket[Qe]!==void 0&&(t._socket.removeListener("data",bb),process.nextTick(HQ,t._socket),t.close(e[IAe])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function OQ(){this[Qe].emitClose()}function $Ae(e,t){this[Qe].emit("message",e,t)}function zAe(e){let t=this[Qe];t._autoPong&&t.pong(e,!this._isServer,MQ),t.emit("ping",e)}function UAe(e){this[Qe].emit("pong",e)}function HQ(e){e.resume()}function BAe(e){let t=this[Qe];t.readyState!==Pe.CLOSED&&(t.readyState===Pe.OPEN&&(t._readyState=Pe.CLOSING,FQ(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function FQ(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function $Q(){let e=this[Qe];if(this.removeListener("close",$Q),this.removeListener("data",bb),this.removeListener("end",zQ),e._readyState=Pe.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[Qe]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",OQ),e._receiver.on("finish",OQ))}function bb(e){this[Qe]._receiver.write(e)||this.pause()}function zQ(){let e=this[Qe];e._readyState=Pe.CLOSING,e._receiver.end(),this.end()}function UQ(){let e=this[Qe];this.removeListener("error",UQ),this.on("error",MQ),e&&(e._readyState=Pe.CLOSING,this.destroy())}});var qQ=T((hyt,VQ)=>{"use strict";var yyt=kb(),{Duplex:GAe}=require("stream");function GQ(e){e.emit("close")}function KAe(){!this.destroyed&&this._writableState.finished&&this.destroy()}function KQ(e){this.removeListener("error",KQ),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function VAe(e,t){let r=!0,o=new GAe({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&o._readableState.objectMode?s.toString():s;o.push(a)||e.pause()}),e.once("error",function(s){o.destroyed||(r=!1,o.destroy(s))}),e.once("close",function(){o.destroyed||o.push(null)}),o._destroy=function(n,s){if(e.readyState===e.CLOSED){s(n),process.nextTick(GQ,o);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(n),process.nextTick(GQ,o)}),r&&e.terminate()},o._final=function(n){if(e.readyState===e.CONNECTING){e.once("open",function(){o._final(n)});return}e._socket!==null&&(e._socket._writableState.finished?(n(),o._readableState.endEmitted&&o.destroy()):(e._socket.once("finish",function(){n()}),e.close()))},o._read=function(){e.isPaused&&e.resume()},o._write=function(n,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){o._write(n,s,i)});return}e.send(n,i)},o.on("end",KAe),o.on("error",KQ),o}VQ.exports=VAe});var LM=T((Syt,JQ)=>{"use strict";var{tokenChars:qAe}=Sc();function JAe(e){let t=new Set,r=-1,o=-1,n=0;for(n;n<e.length;n++){let i=e.charCodeAt(n);if(o===-1&&qAe[i]===1)r===-1&&(r=n);else if(n!==0&&(i===32||i===9))o===-1&&r!==-1&&(o=n);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${n}`);o===-1&&(o=n);let a=e.slice(r,o);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=o=-1}else throw new SyntaxError(`Unexpected character at index ${n}`)}if(r===-1||o!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,n);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}JQ.exports={parse:JAe}});var ree=T((Ayt,tee)=>{"use strict";var YAe=require("events"),Rb=require("http"),{Duplex:Pyt}=require("stream"),{createHash:XAe}=require("crypto"),YQ=Pb(),Zi=hc(),ZAe=LM(),QAe=kb(),{CLOSE_TIMEOUT:e_e,GUID:t_e,kWebSocket:r_e}=rn(),o_e=/^[+/0-9A-Za-z]{22}==$/,XQ=0,ZQ=1,eee=2,vM=class extends YAe{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:256*1024,maxFragments:16*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:e_e,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:QAe,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=Rb.createServer((o,n)=>{let s=Rb.STATUS_CODES[426];n.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),n.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let o=this.emit.bind(this,"connection");this._removeListeners=n_e(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(n,s,i)=>{this.handleUpgrade(n,s,i,o)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=XQ}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===eee){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(pg,this);return}if(t&&this.once("close",t),this._state!==ZQ)if(this._state=ZQ,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(pg,this):process.nextTick(pg,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{pg(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,o,n){r.on("error",QQ);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){Qi(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){Qi(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!o_e.test(s)){Qi(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){Qi(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){ug(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=ZAe.parse(c)}catch{Qi(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let p=t.headers["sec-websocket-extensions"],m={};if(this.options.perMessageDeflate&&p!==void 0){let g=new Zi({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let y=YQ.parse(p);y[Zi.extensionName]&&(g.accept(y[Zi.extensionName]),m[Zi.extensionName]=g)}catch{Qi(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let g={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(g,(y,h,S,E)=>{if(!y)return ug(r,h||401,S,E);this.completeUpgrade(m,s,d,t,r,o,n)});return}if(!this.options.verifyClient(g))return ug(r,401)}this.completeUpgrade(m,s,d,t,r,o,n)}completeUpgrade(t,r,o,n,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[r_e])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>XQ)return ug(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${XAe("sha1").update(r+t_e).digest("base64")}`],p=new this.options.WebSocket(null,void 0,this.options);if(o.size){let m=this.options.handleProtocols?this.options.handleProtocols(o,n):o.values().next().value;m&&(d.push(`Sec-WebSocket-Protocol: ${m}`),p._protocol=m)}if(t[Zi.extensionName]){let m=t[Zi.extensionName].params,g=YQ.format({[Zi.extensionName]:[m]});d.push(`Sec-WebSocket-Extensions: ${g}`),p._extensions=t}this.emit("headers",d,n),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",QQ),p.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(p),p.on("close",()=>{this.clients.delete(p),this._shouldEmitClose&&!this.clients.size&&process.nextTick(pg,this)})),a(p,n)}};tee.exports=vM;function n_e(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let o of Object.keys(t))e.removeListener(o,t[o])}}function pg(e){e._state=eee,e.emit("close")}function QQ(){this.destroy()}function ug(e,t,r,o){r=r||Rb.STATUS_CODES[t],o={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...o},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${Rb.STATUS_CODES[t]}\r
`+Object.keys(o).map(n=>`${n}: ${o[n]}`).join(`\r
`)+`\r
\r
`+r)}function Qi(e,t,r,o,n,s){if(e.listenerCount("wsClientError")){let i=new Error(n);Error.captureStackTrace(i,Qi),e.emit("wsClientError",i,r,t)}else ug(r,o,n,s)}});var s_e,i_e,a_e,l_e,c_e,d_e,oee,p_e,kc,nee=l(()=>{s_e=u(qQ(),1),i_e=u(Pb(),1),a_e=u(hc(),1),l_e=u(_M(),1),c_e=u(RM(),1),d_e=u(LM(),1),oee=u(kb(),1),p_e=u(ree(),1),kc=oee.default});var xM,see=l(()=>{"use strict";xM=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var u_e,WM,iee=l(()=>{"use strict";Iy();see();u_e=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",WM=(e={})=>{let t=e.env??process.env,r=xM(t[Ty]),o=xM(t[Cy]);return{mode:u_e(r,o),skipInProcessBridge:r,skipInProcessLive:o}}});var aee=l(()=>{"use strict";Iy()});var lee=l(()=>{"use strict";iee();aee()});var m_e,cee,dee=l(()=>{"use strict";ne();_t();St();m_e={isPaused:Ro,loadFolders:bC,resolveFolder:_C},cee=async(e,t=m_e)=>{if(t.isPaused(e.config.layout.configPath))return{ok:!1,code:ue.CODING_TOOLS_PAUSED};if(e.requestedFolderPath===null)return{ok:!1,code:ue.FOLDER_REQUIRED};let r=await t.loadFolders({wsUrl:e.config.wsUrl,pairingToken:e.config.pairingToken});return t.resolveFolder({...e.projectId!==void 0?{projectId:e.projectId}:{},requestedFolderPath:e.requestedFolderPath,registeredFolders:r,managedProjectsDir:e.config.layout.projectsDir,defaultFolderPath:e.defaultFolderPath})}});var OM=l(()=>{"use strict"});var Rc,ea,pee,f_e,jM,MM,uee,mee,NM,gee,mg,DM=l(()=>{"use strict";Rc=u(require("node:fs")),ea=u(require("node:os")),pee=u(require("node:path"));OM();Ca();f_e=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),jM=(e=ea.default.hostname())=>pee.default.join(ea.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),MM=e=>{if(!Rc.default.existsSync(e))return null;try{let t=JSON.parse(Rc.default.readFileSync(e,"utf8"));return!f_e(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},uee=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},mee=(e,t)=>{Rc.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},NM=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??jM(),o=MM(r);if(o!==null&&o.pid!==process.pid&&Zt(o.pid)&&uee(o))return{ok:!1,reason:"held_by_other_process"};let n={hostname:ea.default.hostname(),macOsUsername:ea.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return mee(r,n),{ok:!0}},gee=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??jM(),o=MM(r);return o!==null&&o.pid!==process.pid&&Zt(o.pid)&&uee(o)?{ok:!1}:(mee(r,{hostname:ea.default.hostname(),macOsUsername:ea.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},mg=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??jM();MM(r)?.pid===process.pid&&Rc.default.existsSync(r)&&Rc.default.unlinkSync(r)}});var HM,gg,y_e,h_e,S_e,P_e,FM,fee=l(()=>{"use strict";HM=require("node:child_process"),gg=u(require("node:path"));Ca();dy();y_e=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),h_e=(e,t)=>{if(y_e(e)||!/\bnode\b/.test(e))return!1;let r=gg.default.resolve(t),o=gg.default.join(r,"app",pd),n=gg.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===pd||i==="agent-witch.ts")return e.includes(r);try{let a=gg.default.resolve(i);return a===o||a===n}catch{return i===o||i===n}})},S_e=e=>{let t=new Set,r=e;for(let o=0;o<32;o+=1){let n="";try{n=(0,HM.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(n,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},P_e=(e,t,r)=>{let o=S_e(r),n=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||o.has(c)||h_e(d,t)&&n.push(c)}return n},FM=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,HM.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let o=P_e(r,e.installDir,t),n=[];for(let s of o)if(Zt(s))try{process.kill(s,"SIGTERM"),n.push(s)}catch{}return n}});var fg,yg,yee,A_e,$M,hee=l(()=>{"use strict";fg=u(require("node:fs")),yg=u(require("node:path"));dt();yee=(e,t)=>{!fg.default.existsSync(e)||fg.default.existsSync(t)||(fg.default.mkdirSync(yg.default.dirname(t),{recursive:!0}),fg.default.renameSync(e,t))},A_e=e=>{if(e.profileEmail===null)return;let t=yg.default.join(e.installDir,gr);yee(yg.default.join(t,is),e.mainLogPath),yee(yg.default.join(t,as),e.errorLogPath)},$M=e=>{let t=z();e!==void 0&&t.installDir!==e||A_e(t)}});var See=l(()=>{"use strict";Yp();sP();sP();!Ht()&&_s(__agentWitchImportMetaUrl)&&(async()=>{Dt("agent-witch-wake-server");let e=await si(),t=_o(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var Pee=l(()=>{"use strict";See()});var Aee=l(()=>{"use strict";Np()});var zM,_ee=l(()=>{"use strict";OM();Pee();DM();Aee();zM=async(e={})=>{let t=e.skipInProcessBridge?null:await nP();OS();let r=setInterval(()=>{OS()},6e4),o=setInterval(()=>{if(!gee().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(o),t?.close()}}}});var hg,wb,k_e,bee,kee,Eb,Ree,wee,UM,Eee,Tb,Tee=l(()=>{"use strict";hg=u(require("node:fs")),wb=u(require("node:path")),k_e="pending-run-inputs.json",bee=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),kee=e=>{let t=e.profileEmail?wb.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return wb.default.join(t,k_e)},Eb=e=>{let t=kee(e);if(!hg.default.existsSync(t))return{};try{let r=JSON.parse(hg.default.readFileSync(t,"utf8"));return bee(r)?Object.fromEntries(Object.entries(r).flatMap(([o,n])=>{if(!bee(n))return[];let s=typeof n.originalPrompt=="string"?n.originalPrompt:"",i=typeof n.partialOutput=="string"?n.partialOutput:"",a=typeof n.question=="string"?n.question:"",c=typeof n.accumulatedOutput=="string"?n.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[o,{agentRunId:o,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},Ree=(e,t)=>{let r=kee(e);hg.default.mkdirSync(wb.default.dirname(r),{recursive:!0}),hg.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},wee=e=>Object.values(Eb(e)),UM=(e,t)=>Eb(e)[t]!==void 0,Eee=(e,t)=>{let r=Eb(e);r[t.agentRunId]=t,Ree(e,r)},Tb=(e,t)=>{let r=Eb(e);delete r[t],Ree(e,r)}});var Cb=l(()=>{"use strict";ne()});var Cee=l(()=>{"use strict";ne()});var Ib=l(()=>{"use strict";ne()});var Lb=l(()=>{"use strict";ne()});var Sg=l(()=>{"use strict";ne()});var R_e,w_e,Pg,BM=l(()=>{"use strict";Pr();Cb();Cee();Ib();Lb();Sg();R_e={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},w_e={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},Pg=e=>{if(!Ne(e.writerAgent))return"the selected writer";let t=Ft(e.writerAgent);if(pt(e.writerExecutionBackend)==="api"&&t!==null){let r=Et(ot(e.configPath),t);if(r!==null&&r.apiKey.length>0){let o=Gd(t,r.model);return`${w_e[t]} model ${o}`}}return R_e[e.writerAgent]}});var E_e,T_e,Iee,Lee,vee=l(()=>{"use strict";E_e=/"input_tokens"\s*:\s*(\d+)/,T_e=/"output_tokens"\s*:\s*(\d+)/,Iee=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},Lee=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=Iee(E_e.exec(t)),o=Iee(T_e.exec(t));if(r===null||o===null)return null;let n=r+o;return n>=1?n:null}});var vb=l(()=>{"use strict";_t()});var ns,Ag,C_e,Oee,KM,GM,jee,I_e,Mee,VM,Nee,xee,Dee,L_e,Wee,qM,Hee=l(()=>{"use strict";ns=u(require("node:fs")),Ag=u(require("node:path"));St();ne();vb();C_e="run-completion-outbox.json",Oee="run-completion-posted.json",KM=(e,t)=>{let r=e.profileEmail?Ag.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Ag.default.join(r,t)},GM=e=>KM(e,C_e),jee=e=>{try{let t=JSON.parse(ns.default.readFileSync(KM(e,Oee),"utf8"));return Array.isArray(t)?t.filter(r=>typeof r=="string"):[]}catch{return[]}},I_e=(e,t)=>{let r=KM(e,Oee);ns.default.mkdirSync(Ag.default.dirname(r),{recursive:!0}),ns.default.writeFileSync(r,JSON.stringify(ih(jee(e),t)),"utf8")},Mee=(e,t)=>jee(e).includes(t),VM=e=>{let t=GM(e);if(!ns.default.existsSync(t))return[];try{let r=JSON.parse(ns.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(o=>typeof o=="object"&&o!==null&&typeof o.runId=="string"&&typeof o.exitCode=="number"&&typeof o.output=="string"&&typeof o.createdAt=="string"):[]}catch{return[]}},Nee=(e,t)=>{ns.default.mkdirSync(Ag.default.dirname(GM(e)),{recursive:!0}),ns.default.writeFileSync(GM(e),JSON.stringify(t,null,2),"utf8")},xee=(e,t)=>{Nee(e,VM(e).filter(r=>r.runId!==t))},Dee=(e,t)=>{if(Mee(e,t.runId))return;let r={...t,output:Fd(t.output,Da("secretHidden"))},o=[...VM(e).filter(n=>n.runId!==t.runId),r];Nee(e,o)},L_e=async e=>{for(let t of VM(e.layout)){if(Mee(e.layout,t.runId)){xee(e.layout,t.runId);continue}await Rp(e.cloudApi,t.runId,t.exitCode,t.output,{estimateSeconds:t.estimateSeconds,actualSeconds:t.actualSeconds})&&(I_e(e.layout,t.runId),xee(e.layout,t.runId))}},Wee={chain:Promise.resolve()},qM=e=>{let t=e.cloudApi;if(t===null)return Promise.resolve();let r=Wee.chain.then(()=>L_e({layout:e.layout,cloudApi:t}));return Wee.chain=r.catch(()=>{}),r}});var Fee=l(()=>{"use strict"});var JM,_g,x_e,ta,$ee=l(()=>{"use strict";ne();Fee();JM=new Map,_g=e=>{let t=JM.get(e);t!==void 0&&(clearInterval(t),JM.delete(e))},x_e=(e,t,r,o={})=>{e.readyState===1&&e.send(JSON.stringify(Hs({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...o}})))},ta=(e,t,r,o={})=>{_g(t);let n=o.awaitingInput===!0,s=()=>{if(!r()){_g(t);return}let i=o.onTick?.()??{};x_e(e,t,n,i)};s(),JM.set(t,setInterval(s,15e3))}});var zee=l(()=>{"use strict";_t()});var Uee,Bee=l(()=>{"use strict";zee();Uee=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:De(t)}});var YM,bg,an,XM,yo,Gee,xb=l(()=>{"use strict";YM=new Set,bg=new Map,an=(e,t)=>{if(t.length===0)return;let r=bg.get(e)??[];r.push(t),bg.set(e,r)},XM=e=>{YM.add(e);let t=bg.get(e)??[];return bg.delete(e),t},yo=e=>YM.has(e),Gee=e=>{YM.delete(e),bg.delete(e)}});var Kee,Vee=l(()=>{"use strict";Kee=e=>e==null||!Number.isFinite(e)||e<=0?null:{limitSeconds:Math.floor(e)}});var qee,ZM,Wb,Jee,kg,W_e,Yee,O_e,Xee,QM=l(()=>{"use strict";Vee();zy();qee=Kee($d.maxMinutes*60)??{limitSeconds:1800},ZM=5e3,Wb=new Map,Jee=(e,t,r=qee)=>{kg(e);let o=setTimeout(()=>{Wb.delete(e),t()},r.limitSeconds*1e3);o.unref?.(),Wb.set(e,o)},kg=e=>{let t=Wb.get(e);t!==void 0&&(clearTimeout(t),Wb.delete(e))},W_e=(e=qee)=>`You've hit your session limit on this computer: the run was stopped after ${Math.round(e.limitSeconds/60)} minutes.`,Yee=e=>{let t=W_e(),r=e.trim();return r.length>0?`${r}

${t}`:t},O_e=e=>e.exitCode===null&&e.signalCode===null,Xee=(e,t=ZM)=>{let r=n=>{let s=e.pid;if(typeof s=="number"&&process.platform!=="win32")try{process.kill(-s,n);return}catch{}try{e.kill(n)}catch{}};r("SIGTERM"),setTimeout(()=>{O_e(e)&&r("SIGKILL")},t).unref?.()}});var wc,Zee,Qee,ete=l(()=>{"use strict";wc=u(require("node:path")),Zee=require("node:url");As();Qee=()=>{if(Ht()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?wc.default.dirname(wc.default.resolve(e)):wc.default.dirname(wc.default.resolve(__filename))}return wc.default.dirname((0,Zee.fileURLToPath)(__agentWitchImportMetaUrl))}});var tte,rte,ote,nte,Wt,Ec,ste,ite,Tc,eN,tN,rN,ate,oN,lte,Ob=l(()=>{"use strict";tte=require("node:crypto"),rte=u(require("node:fs")),ote=u(require("node:path")),nte=require("node:url");Ca();QM();As();ete();Wt=new Map,ste=async()=>{if(Ec!==void 0)return Ec;try{if(Ht()){let e=Qee(),t=ote.default.join(e,"deps","node-pty","lib","index.js");if(rte.default.existsSync(t)){let r=await import((0,nte.pathToFileURL)(t).href);return Ec=r,r}}return Ec=await import("node-pty"),Ec}catch{return Ec=null,null}},ite=(e,t,r,o)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:o})},Tc=(e,t,r)=>{let o=Wt.get(e);if(o!==void 0){Wt.delete(e);try{o.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},eN=(e,t)=>{let r=Wt.get(e);return r===void 0?!1:(r.pty.write(t),!0)},tN=(e,t,r)=>{let o=Wt.get(e);return o===void 0?!1:(o.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},rN=e=>{for(let t of Wt.values())if(!(t.mode!=="agent"||t.runId!==e))return Zt(t.pty.pid);return!1},ate=e=>{for(let[t,r]of Wt.entries()){if(r.mode!=="agent"||r.runId!==e)continue;Wt.delete(t);let o=r.pty.pid;try{r.pty.kill()}catch{}return setTimeout(()=>{if(Zt(o))try{process.kill(o,"SIGKILL")}catch{}},ZM).unref(),!0}return!1},oN=async e=>{let t=await ste();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this computer. Install AgentWitch deps again.\r
`},requestId:e.requestId}),!1;Wt.get(e.shellSessionId)!==void 0&&Tc(e.shellSessionId,e.send,e.requestId);let o=process.env.SHELL?.trim()||"/bin/zsh",n;try{n=t.spawn(o,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return Wt.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:n,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),n.onData(s=>{ite(e.send,e.shellSessionId,s,e.requestId)}),n.onExit(()=>{Wt.get(e.shellSessionId)?.pty===n&&(Wt.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},lte=async e=>{let t=e.shellSessionId??(0,tte.randomUUID)(),r=await ste();if(r===null)return{shellSessionId:t,usedPty:!1};let o;try{o=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(n){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",n instanceof Error?n.message:n),{shellSessionId:t,usedPty:!1}}return Wt.set(t,{shellSessionId:t,pty:o,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),o.onData(n=>{ite(e.send,t,n,e.requestId),e.onData(n)}),o.onExit(({exitCode:n})=>{Wt.get(t)?.pty===o&&(Wt.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(n??-1)}),{shellSessionId:t,usedPty:!0}}});var jb,cte,dte=l(()=>{"use strict";jb="[[AWAITING_INPUT]]",cte=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",jb,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var Rg,pte,Mb=l(()=>{"use strict";dte();Rg=e=>{let t=e.indexOf(jb);if(t<0)return null;let o=e.slice(t+jb.length).trim().split(`
`)[0]?.trim()??"";return o.length===0?null:{question:o,partialOutput:e.slice(0,t).trim()}},pte=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",cte].join(`
`)});var ute,mte=l(()=>{"use strict";xb();Ob();Mb();ute=async e=>{let t=[],r=!1,o=s=>{if(s.length!==0){if(yo(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}an(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await lte({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),o(s),r)return;let i=Rg(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var fte,yte,hte,gte,ln,Nb=l(()=>{"use strict";fte=require("node:child_process"),yte=u(require("node:fs")),hte=u(require("node:path"));dy();gte=12e4,ln=(e,t)=>{let r=hte.default.join(e,"app",DF,"ensure-writer.sh");return yte.default.existsSync(r)?new Promise((o,n)=>{let s=(0,fte.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"],detached:process.platform!=="win32"});s.stdout?.resume(),s.stderr?.resume();let i=()=>{if(s.pid!==void 0){if(process.platform==="win32"){s.kill("SIGTERM");return}try{process.kill(-s.pid,"SIGTERM")}catch{s.kill("SIGTERM")}}},a=setTimeout(()=>{i(),n(new Error(`ensure-writer.sh timed out after ${String(gte/1e3)}s`))},gte);s.on("error",c=>{clearTimeout(a),n(c)}),s.on("close",c=>{if(clearTimeout(a),c===0){o();return}n(new Error(`ensure-writer.sh exited with code ${String(c??-1)}`))})}):Promise.resolve()}});var Ste,ra,Eg,Db,nN,wg,Hb,Fb,sN,iN,j_e,Cc,M_e,N_e,aN,lN=l(()=>{"use strict";Ste=require("node:child_process");Pr();Nb();Ib();Cb();Sg();Lb();ra=new Map,Eg=e=>e==="cursor"||e==="antigravity",Db=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",nN=e=>ra.get(e)?.warmed===!0,wg=e=>{let t=ra.get(e);ra.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},Hb=e=>ra.get(e)?.conversationStarted===!0,Fb=e=>{let t=ra.get(e);ra.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},sN=e=>{ra.delete(e)},iN=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",j_e={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},Cc=e=>`${j_e[e]} is ready on your computer.
Send a task from the box below when you are ready.
`,M_e=(e,t,r,o)=>new Promise(n=>{let s=By(t,r),i=[],a=(0,Ste.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let p=d.toString("utf8");i.push(p),o?.(p)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{n({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{n({exitCode:-1,output:d.message})})}),N_e=(e,t)=>{let r=Cc(e);if(t.length===0)return r;let o=t.endsWith(`
`)?"":`
`;return`${t}${o}${r}`},aN=async e=>{if(!Ne(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&pt(e.runConfig.writerExecutionBackend)==="api"){let r=Ft(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let o=ot(e.runConfig.layout.configPath);return Et(o,r)===null?{exitCode:-1,output:`Add a ${r} API key in AgentWitch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this computer (no local CLI).
`),wg(e.writerAgent),{exitCode:0,output:Cc(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your computer\u2026
`),await ln(e.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${o}
`}}Eg(e.writerAgent)&&wg(e.writerAgent);let t=await M_e(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?N_e(e.writerAgent,t.output):Cc(e.writerAgent)}}});var Ic,Pte=l(()=>{"use strict";Ic={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var Ate,_te=l(()=>{"use strict";Ate="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var bte,kte=l(()=>{"use strict";St();_te();bte=e=>e.code===xs.SESSION_LIMIT?Ate:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var D_e,Rte,H_e,F_e,wte,$_e,Ete,Tte=l(()=>{"use strict";D_e=/\bauto-?denied\b/i,Rte=/\bno output produced\b/i,H_e=/headless mode cannot prompt for.*\bcommand\b.*permission/i,F_e=/\bpermissions\.allow\b/i,wte=/\bjetski:\s*no output produced\b/i,$_e=e=>{let t=e.trim();return t.length===0?!1:wte.test(t)||Rte.test(t)&&(D_e.test(t)||H_e.test(t)||F_e.test(t))},Ete=e=>{if($_e(e)){let t=e.split(/\r?\n/).map(r=>r.trim()).find(r=>r.length>0&&(wte.test(r)||Rte.test(r)))??e.trim();return t.length>0?t:"Antigravity headless run auto-denied a tool that needs command permission."}return null}});var Cte,Ite=l(()=>{"use strict";St();Pte();kte();Tte();Cte=e=>{let t=yw(e.output);if(t!==null)return{status:Ic.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:bte(t)};let r=Ete(e.output);return r!==null?{status:Ic.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:null,denialReason:r}:e.exitCode===0&&e.output.trim().length===0?{status:Ic.FAILED,resultExitCode:1,resultOutcomeCode:null,denialReason:"No agent output was captured."}:{status:e.exitCode===0?Ic.COMPLETED:Ic.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var cN,RSt,Lte=l(()=>{"use strict";cN={OPEN:"open",APPROVAL:"approval"},RSt=cN.APPROVAL});var ho,Tg=l(()=>{"use strict";ho=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var Lc,$b,vte,z_e,xte,Wte,Ote,vc,dN,pN=l(()=>{"use strict";Lc=u(require("node:fs")),$b=u(require("node:path")),vte="runs",z_e=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),xte=e=>{let t=e.profileEmail!==null?$b.default.join(e.installDir,"profiles",e.profileEmail,vte):$b.default.join(e.installDir,vte);return Lc.default.mkdirSync(t,{recursive:!0}),t},Wte=(e,t)=>$b.default.join(xte(e),`${t}.json`),Ote=(e,t)=>{Lc.default.writeFileSync(Wte(e,t.id),JSON.stringify(t,null,2))},vc=(e,t)=>{let r=Wte(e,t);if(!Lc.default.existsSync(r))return null;try{let o=JSON.parse(Lc.default.readFileSync(r,"utf8"));return!z_e(o)||typeof o.id!="string"?null:o}catch{return null}},dN=e=>{let t=xte(e),r=Lc.default.readdirSync(t,{withFileTypes:!0}),o=[];for(let n of r){if(!n.isFile()||!n.name.endsWith(".json"))continue;let s=n.name.replace(/\.json$/,""),i=vc(e,s);i!==null&&o.push(i)}return o.toSorted((n,s)=>s.createdAt.localeCompare(n.createdAt))}});var U_e,jte,Mte=l(()=>{"use strict";ib();Ite();Lte();Tg();pN();U_e=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",o=Cte({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:o.status,dispatchPolicy:cN.OPEN,resultOutput:e.output,resultExitCode:o.resultExitCode,resultOutcomeCode:o.resultOutcomeCode,denialReason:o.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},jte=(e,t)=>{let r=U_e(t);Ote(e,r);let o=t.projectId?.trim()??"";if(o.length>0){let n=ho(t.originalPrompt);rg({projectId:o,taskId:t.agentRunId,agentRunId:t.agentRunId,status:r.status,promptSummary:n,resultSummary:t.output,createdAt:r.createdAt,completedAt:r.completedAt,writerAgent:t.writerAgent??null,threadKey:null})}return r}});var Nte=l(()=>{"use strict";p_()});var Dte,Hte=l(()=>{"use strict";St();Dte=()=>[Fy,`agentRunWriterExecutionBackend=${$y}`,`agentRunWriterExecutionReasonCode=${hw}`].join(`
`)});var uN,B_e,G_e,Fte,$te=l(()=>{"use strict";uN=e=>e.toLocaleString("en-US"),B_e=e=>e<.01?e.toFixed(4):e.toFixed(3),G_e=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${B_e(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 AgentWitch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${uN(e.inputTokens)} in / ${uN(e.outputTokens)} out (${uN(e.totalTokens)} total)`,t].join(`
`)},Fte=(e,t)=>{if(t===void 0)return e;let r=G_e(t);if(e.includes("\u2014 AgentWitch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var zte=l(()=>{"use strict";ne()});var Gte,Cg,Ce,zb,mN,Ub,Ute,Bte,K_e,V_e,Kte,Vte,qte,Ig,gN,fN,yN,Jte,q_e,mr,Lg,cn,Yte,J_e,Y_e,Bb,hN,SN,vg,X_e,PN,Xte=l(()=>{"use strict";Gte=require("node:child_process");ne();St();Pr();Hw();Tee();ym();BM();vee();Bd();Hee();vb();$ee();Ca();Bee();xb();Ob();Mb();mte();QM();zy();lN();Mte();Nte();Hte();Tg();$te();La();zte();Sg();yd();Mb();Cg=new Map,Ce=new Map,zb=new Set,mN=new Set,Ub=new Map,Ute=op(),Bte=e=>{e!==void 0&&!Ub.has(e)&&Ub.set(e,Date.now())},K_e=(e,t,r,o)=>{let n=o.endsWith(`
`)?o:`${o}
`;if(yo(t)){mr(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:n},requestId:r});return}an(t,n)},V_e=(e,t,r,o,n)=>{if(!iE(e,n))return;let s=`${Dte()}
`;K_e(t,r,o,s);let i=Ce.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},Kte=130,Vte=`

Stopped by user.`,qte=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:ho(e)},Ig=null,gN=e=>{Ig=e},fN=(e,t)=>{if(Ig===null)return;let r=dW(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||lT(Ig,t,r)},yN=async e=>{await qM({layout:e,cloudApi:Ig})},Jte=e=>{let t=Cg.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:Zt(t.pid)},q_e=e=>Re({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),mr=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(Hs(t)))},Lg=(e,t,r,o,n,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(n===void 0||n.trim().length===0||s===void 0||s.trim().length===0)return{};let a=Sa(s),c=Ce.get(r);if(a!==null&&c!==void 0){let d=qF(a),p=Jte(r)||rN(r);d!==null&&!p&&cn(e,t,r,o,d.exitCode,d.output,c.originalPrompt)}return VF(a)}}),cn=(e,t,r,o,n,s,i,a,c)=>{if(r!==void 0){if(Ute.has(r))return;Ute.add(r)}let d=Ha(s,a),p=n,m=Fte(d.output,d.llmUsage);if(r!==void 0){let y=Ub.get(r);Ub.delete(r),y!==void 0&&lW({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-y)/1e3))});let h=Lee(d.llmUsage,m);h!==null&&c7({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:h})}r!==void 0&&kg(r),r!==void 0&&mN.has(r)?(mN.delete(r),zb.delete(r),p=K$,m=Yee(m.replace(/\n*Stopped by user\.$/,""))):r!==void 0&&zb.has(r)&&(zb.delete(r),p=Kte,m=m.trim().length>0&&!m.includes("Stopped by user.")?`${m.trim()}${Vte}`:"Stopped by user."),m=Pn(m).scrubbed;let g=r!==void 0?dW(e.layout.reportsDir,r):null;if(r!==void 0){_g(r),ep(e.layout,r),yo(r)&&(mr(t,{type:"terminal.stream.end",payload:{runId:r},requestId:o}),Gee(r));let y=Ce.get(r);i7({reportsDir:e.layout.reportsDir,agentRunId:r,input:ho(i),output:m,...y!==void 0?{writerLabel:Pg({writerAgent:y.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),y!==void 0&&c_({layout:e.layout,writerAgent:y.writerAgent,projectFolderPath:y.projectFolderPath,userPrompt:y.userTranscriptPrompt,assistantOutput:m,agentRunId:r}),jte(e.layout,{agentRunId:r,originalPrompt:i,exitCode:p,output:m,layout:e.layout,...y!==void 0&&y.projectId!==void 0&&y.projectId.trim().length>0?{projectId:y.projectId.trim()}:{},...y!==void 0?{writerAgent:y.writerAgent}:{}}),Dee(e.layout,{runId:r,exitCode:p,output:m,createdAt:new Date().toISOString(),...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{}}),qM({layout:e.layout,cloudApi:Ig}),Ce.delete(r),Cg.delete(r),Tb(e.layout,r)}mr(t,{type:"command.claude.result",payload:{exitCode:p,output:m,...r!==void 0?{agentRunId:r}:{},...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{},...c!==void 0?{errorCode:c}:{}},requestId:o}),Id(e.layout)},Yte=(e,t,r,o,n,s,i)=>{let a=Ce.get(r),c=a?.accumulatedOutput??s;kg(r),Eee(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:n,accumulatedOutput:c}),ta(t,r,()=>UM(e.layout,r),Lg(e,t,r,o,a?.projectFolderPath,a?.reportKey,!0)),mr(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:n,partialOutput:c},requestId:o})},J_e=(e,t,r,o,n,s,i,a)=>{let c=[],d=!1,p=y=>{if(!(n===void 0||y.length===0)){if(yo(n)){mr(r,{type:"terminal.stream.chunk",payload:{runId:n,chunk:y},requestId:o});return}an(n,y)}};if(n!==void 0){let y=Ce.get(n);Cg.set(n,t),Ce.set(n,{originalPrompt:s,userTranscriptPrompt:y?.userTranscriptPrompt??i,writerAgent:a,projectFolderPath:y?.projectFolderPath,reportKey:y?.reportKey,projectId:y?.projectId,accumulatedOutput:y?.accumulatedOutput??""}),mr(r,{type:"terminal.stream.start",payload:{runId:n},requestId:o}),ta(r,n,()=>Jte(n),Lg(e,r,n,o,y?.projectFolderPath,y?.reportKey))}let m=a==="claude-cli",g=[];t.stdout?.on("data",y=>{let h=y.toString("utf8");if(m?g.push(h):(c.push(h),p(h)),d||n===void 0)return;let S=Rg(c.join(""));if(S!==null){d=!0,t.kill("SIGTERM");let E=Ce.get(n),I=[E?.accumulatedOutput??"",S.partialOutput].filter(f=>f.length>0).join(`

`);E!==void 0&&(E.accumulatedOutput=I),Cg.delete(n),Yte(e,r,n,o,S.question,I,s)}}),t.stderr?.on("data",y=>{let h=y.toString("utf8");c.push(h),p(h)}),t.on("close",y=>{if(d)return;Fb(a);let h=n!==void 0?Ce.get(n):void 0,S=m?Ha(g.join("")):{output:c.join("").trim(),llmUsage:void 0},E=m?c.join("").trim():"",I=[S.output.trim(),E].filter(w=>w.length>0).join(`
`);m&&S.output.trim().length>0&&p(S.output);let f=h!==void 0&&h.accumulatedOutput.length>0?`${h.accumulatedOutput}

${I}`.trim():I;cn(e,r,n,o,y??-1,f,s,S.llmUsage)}),t.on("error",y=>{d||cn(e,r,n,o,-1,y.message,s)})},Y_e=(e,t,r,o,n,s,i,a,c,d)=>{let p=qte(r,c);s!==void 0&&(Ce.set(s,{originalPrompt:r,userTranscriptPrompt:p,writerAgent:t,projectFolderPath:i,reportKey:a,projectId:d,accumulatedOutput:""}),mr(n,{type:"terminal.stream.start",payload:{runId:s},requestId:o}),ta(n,s,()=>Ce.has(s),Lg(e,n,s,o,i,a))),qd(e,t,r,g=>{if(!(s===void 0||g.length===0)){if(yo(s)){mr(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:g},requestId:o});return}an(s,g)}}).then(g=>{Fb(t),cn(e,n,s,o,g.exitCode,g.output,r,g.llmUsage)}).catch(g=>{let y=g instanceof Error?g.message:String(g);cn(e,n,s,o,-1,y,r)})},Bb=(e,t,r,o,n,s,i,a,c,d,p,m,g)=>{let y=qte(r,p);Cd(e.layout);let h=f=>{cn(e,n,s,o,-1,Os(f),r,void 0,f)};if(Ro(e.layout.configPath)){h(ue.CODING_TOOLS_PAUSED);return}if(Ns(e,t)){Bte(s),Y_e(e,t,r,o,n,s,c,d,y,g);return}let S=er(t,r,q_e(e),i);if(S===null){cn(e,n,s,o,-1,"Writer instruction must be a non-empty string.",r);return}if(c===void 0||c.trim().length===0){h(ue.FOLDER_REQUIRED);return}Bte(s);let E=Uee({workspace:e.workspace,projectFolderPath:c}),I=()=>{eh(t);let f=(0,Gte.spawn)(S.command,[...S.args],{cwd:E,stdio:["ignore","pipe","pipe"],env:m??process.env,detached:process.platform!=="win32"});J_e(e,f,n,o,s,r,y,t)};if(s===void 0){I();return}Jee(s,()=>{X_e(e,n,s,o)}),Ce.set(s,{originalPrompt:r,userTranscriptPrompt:y,writerAgent:t,projectFolderPath:c,reportKey:d,projectId:g??Ce.get(s)?.projectId,accumulatedOutput:Ce.get(s)?.accumulatedOutput??""}),V_e(e,n,s,o,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&fd({reportKey:d,agentRunId:s,userSummary:"Task started on your computer."}),ta(n,s,()=>Ce.has(s),Lg(e,n,s,o,c,d)),ute({socket:n,sendMessage:mr,requestId:o,agentRunId:s,shellSessionId:a,command:S.command,args:S.args,cwd:E,processEnv:m,originalPrompt:r,writerAgent:t,onInputRequired:f=>{a!==void 0&&Tc(a,_=>{mr(n,_)},o);let w=Ce.get(s),W=[w?.accumulatedOutput??"",f.partialOutput].filter(_=>_.length>0).join(`

`);w!==void 0&&(w.accumulatedOutput=W),Yte(e,n,s,o,f.question,W,r)},onFinished:(f,w)=>{Fb(t);let W=Ha(w),_=Ce.get(s),M=_!==void 0&&_.accumulatedOutput.length>0?`${_.accumulatedOutput}

${W.output}`.trim():W.output;cn(e,n,s,o,f,M,r,W.llmUsage)}}).then(f=>{if(!f){I();return}ta(n,s,()=>rN(s),Lg(e,n,s,o,c,d))}).catch(f=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",f instanceof Error?f.message:f),I()})},hN=(e,t,r,o)=>{Tb(e.layout,t.agentRunId),t.shellSessionId!==void 0&&mr(o,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let n=pte(t),s=Ce.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;Bb(e,i,n,r,o,t.agentRunId,void 0,t.shellSessionId,a,c,s?.userTranscriptPrompt,void 0,s?.projectId)},SN=(e,t)=>{for(let r of wee(e.layout))Ce.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:ho(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),ta(t,r.agentRunId,()=>UM(e.layout,r.agentRunId),{awaitingInput:!0}),mr(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},vg=(e,t,r,o)=>{let n=Ce.get(r);if(n===void 0)return!1;zb.add(r),_g(r),kg(r);let s=Cg.get(r);if(s!==void 0)return Xee(s),!0;if(ate(r))return!0;Tb(e.layout,r);let i=n.accumulatedOutput.trim().length>0?`${n.accumulatedOutput.trim()}${Vte}`:"Stopped by user.";return cn(e,t,r,o,Kte,i,n.originalPrompt),!0},X_e=(e,t,r,o)=>Ce.has(r)?(mN.add(r),vg(e,t,r,o)):!1,PN=(e,t)=>[...Ce.keys()].filter(r=>vg(e,t,r)).length});var Z_e,AN,Zte=l(()=>{"use strict";ap();Z_e=()=>`http://127.0.0.1:${Ar()}/restart`,AN=async()=>{try{let e=await fetch(Z_e(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var Qte=l(()=>{"use strict";eu()});var ere=l(()=>{"use strict";KW()});var _N,tre=l(()=>{"use strict";_N=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var xg,Q_e,bN,kN,rre=l(()=>{"use strict";Q();Ae();Qte();nI();ere();tre();La();xg=(e,t)=>{Wn(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},Q_e=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(dw(),cw)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},bN=e=>_N({localBundleVersion:ze(e.installDir)?.bundleVersion??null,remoteBundleVersion:e.remoteBundleVersion}),kN=async e=>{let t=ze(e.layout.installDir)?.bundleVersion??null;if(!_N({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if(Qt(e.layout)){Ld({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),xg(e.layout,{summary:r,action:"install-bundle-update-start"}),Ao({launchAgentLabel:Ie(e.layout.installDir),installDir:e.layout.installDir});let o=await tc({force:!0});if(o.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,o.payload),xg(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!o.reachable){let n=await Q_e();if(n.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),xg(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",n.message),xg(e.layout,{summary:`Install bundle update failed: ${n.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",o.payload),xg(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var ebe,RN,ore=l(()=>{"use strict";ebe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),RN=e=>{if(!ebe(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var wN,EN,nre=l(()=>{"use strict";WC();OC();wN=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=Dp({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},EN=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await No(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var sre,tbe,rbe,obe,xc,ire=l(()=>{"use strict";sre=u(require("node:os"));dt();tbe="Default",rbe=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),obe=e=>{let t=sre.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},xc=()=>{let e=z(),t=Qc(e),r=rbe(tbe);return`${obe(t)}/${r.length>0?r:"project"}`}});var are=l(()=>{"use strict";eu()});var lre,TN,cre=l(()=>{"use strict";are();lre=!1,TN=e=>{lre||(lre=!0,process.on("uncaughtException",t=>{li(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",o=t instanceof Error?t.stack:void 0;li(e,{kind:"crash",message:r,stack:o})}))}});var dre,nbe,CN,pre=l(()=>{"use strict";dre=require("node:child_process");Nb();Pr();Ib();Cb();Sg();Lb();nbe=async(e,t)=>{let o={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(n=>{let s=(0,dre.spawn)(o,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{n(!1)}),s.on("close",i=>{n(i===0)})})},CN=async e=>{if(!Ne(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&pt(e.runConfig.writerExecutionBackend)==="api"){let r=Ft(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let o=ot(e.layout.configPath),n=Et(o,r),s=n!==null&&n.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in AgentWitch Local \u2192 Writer API.`}}}try{await ln(e.layout.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:o}}let t=await nbe(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var IN,ure=l(()=>{"use strict";IN=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var mre,LN,gre=l(()=>{"use strict";mre=require("node:crypto"),LN=()=>(0,mre.randomUUID)()});var Wc,fre,Gb=l(()=>{"use strict";Wc="[[WORKING_ESTIMATE]]",fre=(e,t,r,o="")=>["Estimate how long the following task will take on this computer, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",Wc,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var yre,hre=l(()=>{"use strict";yre=e=>e===null||e<=0?"Estimate saved locally. Starting work on your computer\u2026":e<60?`Estimated ~${e}s. Starting work on your computer\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your computer\u2026`});var sbe,Sre,Pre=l(()=>{"use strict";Gb();sbe=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,Sre=e=>{if(!e.includes(Wc))return null;let t=null;for(let r of e.matchAll(sbe)){let o=Number.parseInt(r[1]??"",10);Number.isFinite(o)&&o>0&&(t=o)}return t}});var ibe,vN,Are=l(()=>{"use strict";Pre();ibe=/^(\d{1,6})\b/,vN=e=>{let t=Sre(e);if(t!==null)return t;let r=ibe.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return!Number.isFinite(o)||o<=0?null:o}});var abe,lbe,cbe,Kb,xN=l(()=>{"use strict";Pr();Zp();abe="http://127.0.0.1:11434",lbe=45e3,cbe=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},Kb=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||abe,o=t===void 0?(await Tr({commands:Re({})})).estimateModel:t;if(o===null||o.trim().length===0)return null;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:o,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout(lbe)});return n.ok?cbe(await n.json()):null}catch{return null}}});var WN,ON,jN,_re=l(()=>{"use strict";yd();Gb();Tg();hre();Are();ym();xN();WN=async e=>{let t=ho(e.wrappedPrompt),r=a7(e.reportsDir);return{estimateOutput:await Kb(fre(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},ON=e=>{let t=vN(e.estimateOutput);t!==null&&r_({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},jN=e=>{let t=vN(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=yre(t);return gd({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Br.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),r_({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var Vb,bre,MN=l(()=>{"use strict";Vb="[[WORKING_TOKEN_ESTIMATE]]",bre=(e,t,r,o="")=>["Estimate the writer-reported token total for the following task on this computer.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",Vb,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var kre,dbe,Rre,wre=l(()=>{"use strict";MN();kre=/^(\d{1,8})\b/,dbe=e=>{let t=e.indexOf(Vb);if(t<0)return null;let r=e.slice(t+Vb.length).trim(),o=kre.exec(r);if(o===null)return null;let n=Number.parseInt(o[1]??"",10);return Number.isFinite(n)&&n>=1?n:null},Rre=e=>{let t=dbe(e);if(t!==null)return t;let r=kre.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return Number.isFinite(o)&&o>=1?o:null}});var NN,DN,Ere=l(()=>{"use strict";MN();Tg();wre();ym();xN();NN=async e=>{let t=ho(e.wrappedPrompt),r=d7(e.reportsDir);return{estimateOutput:await Kb(bre(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},DN=e=>{let t=Rre(e.estimateOutput);return t===null?null:(l7({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var Tre=l(()=>{"use strict";DM();fee();hee();_ee();ap();Xte();Nb();Pr();pN();xb();Zte();VC();rre();La();ore();nre();vb();ire();cre();pre();py();ure();gre();Gb();yd();_re();Ere();BM();Zp();Ob();lN();sw()});var Cre={};Mt(Cre,{buildContinuationPromptWithContext:()=>mbe});var pbe,ube,mbe,Ire=l(()=>{"use strict";pbe=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,ube=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),mbe=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),o=ube(e.priorOutput),n=e.maxContextChars??12e3;return r.length===0&&o.length===0?t:["Continue the same task on this computer using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,o.length>0?`Assistant: ${pbe(o,n)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var Lre={};Mt(Lre,{readHarnessExportSets:()=>fbe});var Wg,HN,qb,gbe,fbe,vre=l(()=>{"use strict";Wg=u(require("node:fs")),HN=u(require("node:path"));dt();qb=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),gbe=e=>{if(!Wg.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(Wg.default.readFileSync(e.harnessManifestPath,"utf8"));if(qb(t))return t}catch{return null}return null},fbe=(e,t)=>{let r=z(t),o=gbe(r);if(o===null)return[];let n=qb(o.sets)?o.sets:{},s=[];for(let i of e){let a=n[i];if(!qb(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let p of c){if(!qb(p))continue;let m=typeof p.path=="string"?p.path:void 0,g=typeof p.id=="string"?p.id:"",y=typeof p.kind=="string"?p.kind:"",h=typeof p.title=="string"?p.title:"";if(m===void 0||g.length===0||y.length===0||h.length===0)continue;let S=m.startsWith("shared/")?HN.default.join(r.harnessRootDir,m):HN.default.join(r.harnessSetsDir,i,m);Wg.default.existsSync(S)&&d.push({id:g,kind:y,title:h,content:Wg.default.readFileSync(S,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var VN,UN,Oc,xre,ybe,Wre,Ore,FN,$N,jre,BN,GN,KN,Mre,zN,fe,oe,Jb,hbe,Og,Sbe,Pbe,Abe,_be,bbe,kbe,Rbe,wbe,jg,Nre=l(()=>{"use strict";VN=require("node:child_process"),UN=u(require("node:fs")),Oc=u(require("node:os"));nee();Q();Ae();vs();iM();lee();ne();ib();ne();Kr();eu();hL();db();p_();_t();En();gI();fr();St();dee();Tre();xre=3e4,ybe=3e4,Wre=new Map,Ore=new Map,FN=new Map,$N=new Map,jre=e=>{try{rg({projectId:e.projectId,taskId:e.agentRunId,agentRunId:e.agentRunId,status:e.status,...e.promptBody!==void 0?{promptBody:e.promptBody}:{},...e.resultBody!==void 0?{resultBody:e.resultBody}:{},...typeof e.writerAgent=="string"?{writerAgent:e.writerAgent}:{},...e.completedAt!==void 0?{completedAt:e.completedAt}:{completedAt:null}})}catch{}},BN=new Map,GN=new Map,KN=new Map,Mre=op(),zN=new Set,fe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),oe=(e,t,r)=>{if(e.readyState===kc.OPEN){let o=Hs(t);e.send(JSON.stringify(o)),r!==void 0&&(Wn(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),dP(r,"out",o))}},Jb=e=>e,hbe=e=>{if(!UN.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(UN.default.readFileSync(e.harnessManifestPath,"utf8"));if(fe(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},Og=(e,t)=>{let r=hbe(t);r!==null&&oe(e,{type:"harness.manifest.report",payload:{hostname:Oc.default.hostname(),manifest:r}})},Sbe=async(e,t,r,o,n,s,i=!1,a,c,d,p,m)=>{let g=m?.trim()??"";if(!Ne(t)){oe(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let y=Pg({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),h=await Tr({commands:Re({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),S=s!==void 0?WN({wrappedPrompt:r,writerLabel:y,reportsDir:e.layout.reportsDir,estimateModel:h?.estimateModel,capabilityNote:h?.capabilityNote}).catch(()=>null):null,E=s!==void 0?NN({wrappedPrompt:r,writerLabel:y,reportsDir:e.layout.reportsDir,estimateModel:h?.estimateModel,capabilityNote:h?.capabilityNote}).catch(()=>null):null,I=Eg(t)&&!nN(t);if(I){try{await ln(e.layout.installDir,t)}catch(k){let R=k instanceof Error?k.message:String(k);oe(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${R}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}wg(t)}else if(!Eg(t))try{await ln(e.layout.installDir,t)}catch(k){let R=k instanceof Error?k.message:String(k);oe(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${R}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let f=Zd(d,xc,m);if(f===null){oe(n,np({code:ue.FOLDER_REQUIRED,...s!==void 0?{agentRunId:s}:{},...o!==void 0?{requestId:o}:{}}));return}$t({projectFolderPath:f,...g.length>0?{projectId:g}:{}}),i||_m(e.layout,t,f);let w=d_({sessionContinuation:i,supportsWriterSessionContinuation:Db(t),isWriterConversationStarted:Hb(t)}),W=i&&w==="first"?Am(e.layout,t,f):null,_=W!==null?Ql(e.layout,W):null,M=_!==null&&_.turns.length>0,v=wW({sessionContinuation:i,supportsWriterSessionContinuation:Db(t),isWriterConversationStarted:Hb(t),hasSourceRunId:typeof c=="string"&&c.trim().length>0,hasCanonicalTurns:M,userPromptCharacterCount:r.length}),b=r;if(v.continuationStrategy==="source_run_seed"){let k=typeof c=="string"&&c.length>0?vc(e.layout,c):null;if(k!==null){let{buildContinuationPromptWithContext:R}=await Promise.resolve().then(()=>(Ire(),Cre));b=R({priorPrompt:k.prompt,priorOutput:k.resultOutput??"",userMessage:r})}}else v.continuationStrategy==="transcript_seed"&&_!==null&&_.turns.length>0&&(b=s_({priorTurns:_.turns,userMessage:r}));let P=v.ragLimit>0?await Rl({layout:e.layout,query:b,limit:v.ragLimit,minScore:v.ragMinScore,projectFolderPath:f,...g.length>0?{projectId:g}:{}}):[],C=v.ragLimit>0&&f.trim().length>0?await fL({layout:e.layout,query:b,limit:2,minScore:.32,projectFolderPath:f,...g.length>0?{projectId:g}:{}}):[],L=v.injectMemory?fW(e.layout,f,g.length>0?g:void 0):[],pe=`${hW(L,v.memoryEntryLimit)}${uL(P)}${yL(C)}${b}`,Z=p?.trim()??(s!==void 0&&f.trim().length>0?LN():void 0);if(s!==void 0&&Z!==void 0&&Z.length>0&&f.trim().length>0){fd({reportKey:Z,agentRunId:s,userSummary:"Working on your computer\u2026"});let k=pe;S!==null&&S.then(R=>{if(R===null)return;let O=jN({estimateOutput:R.estimateOutput??"",reportKey:Z,agentRunId:s,reportsDir:e.layout.reportsDir,task:R.task,writerLabel:R.writerLabel,embedding:R.embedding});if(O.estimateSeconds===null)return;fN(e.layout.reportsDir,s);let D=`${Wc}
${O.estimateSeconds}
`;if(yo(s)){oe(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:D},requestId:o});return}an(s,D)}).catch(()=>{}),pe=IN(k),pe=AR(pe,{agentRunId:s,reportKey:Z,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&S!==null&&S.then(k=>{k!==null&&ON({estimateOutput:k.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:k.task,writerLabel:k.writerLabel,embedding:k.embedding})}).catch(()=>{}),s!==void 0&&E!==null&&E.then(k=>{k!==null&&DN({estimateOutput:k.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:k.task,writerLabel:k.writerLabel})}).catch(()=>{});let $e=s!==void 0&&KN.get(s)===!0;if(s!==void 0&&f.trim().length>0){let k=await oS(f);GN.set(s,k),Z!==void 0&&Z.length>0&&BN.set(s,Z)}Bb(e,t,pe,o,Jb(n),s,{sessionTurn:v.sessionTurn},a,f,Z,r,tE(e.layout,s,$e),g.length>0?g:void 0),I&&s!==void 0&&oe(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:iN(t)},requestId:o})},Pbe=async(e,t,r,o,n)=>{let s=(i,a)=>{oe(n,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:o})};try{let i="",a=await aN({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:Re({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:p=>{i+=p,oe(n,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:p},requestId:o})}}),c=Ne(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?Cc(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},Abe=(e,t,r)=>new Promise(o=>{if(!Ne(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let n=er(t,r,Re({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,VN.spawn)(n.command,[...n.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{o({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{o({exitCode:-1,output:a.message})})}),_be=async(e,t,r,o)=>{if(t.installMethod!=="deterministic-bundle")return!1;oe(o,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let n=Yr(t.bundle),s=fe(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(n!==null)return n;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let p=et(e.wsUrl)??Nt,m=await UE({appOrigin:p,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return m.ok?m.bundle:null})();if(i===null)return oe(o,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let a=Us({bundle:i,layout:e.layout});return oe(o,{type:"harness.request.result",payload:{success:a.ok,writerAgent:"deterministic",exitCode:a.ok?0:1,output:a.ok?`Installed harness set "${i.slug}" (${a.writtenItemCount??0} files).`:a.errorMessage??"Harness install failed.",...a.ok?{}:{errorMessage:a.errorMessage??"Harness install failed."}},requestId:r}),a.ok&&Og(o,e.layout),!0},bbe=async(e,t,r,o)=>{if(await _be(e,t,r,o))return;let n=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(oe(o,{type:"harness.request.ack",payload:{writerAgent:n,status:"dispatching"},requestId:r}),s.length===0){oe(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!Ne(n)){oe(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:`Unsupported writer agent: ${n}`},requestId:r});return}if(Ro(e.layout.configPath)){oe(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorCode:ue.CODING_TOOLS_PAUSED,errorMessage:np({code:ue.CODING_TOOLS_PAUSED}).payload.output},requestId:r});return}Cd(e.layout);let i=await(async()=>{try{await ln(e.layout.installDir,n)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${n}: ${c}`}}return Abe(e,n,s)})().finally(()=>{Id(e.layout)});oe(o,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:n,exitCode:i.exitCode,output:i.output},requestId:r}),Og(o,e.layout)},kbe=e=>{let t=1e3*2**e;return Math.min(ybe,t)},Rbe=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=f=>t.restartInFlight?"already_in_progress":Qt(e.layout)?(Ia(f),console.log(`[agent-witch] Deferring local restart (${f}) until the active writer task finishes.`),"deferred_writer_busy"):(t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${f})\u2026`),t.wakeError=`restart:${f}`,AN().then(w=>{if(w.ok){console.log("[agent-witch] Local restart completed.");return}if(!w.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",w.payload)}).finally(()=>{t.restartInFlight=!1}),"accepted"),o=f=>{if(t.restartInFlight)return"already_in_progress";if(Qt(e.layout))return Ia(f),console.log(`[agent-witch] Deferring host restart (${f}) until the active writer task finishes.`),"deferred_writer_busy";let w=ze(e.layout.installDir)?.bundleVersion??"unknown";return t.restartInFlight=!0,console.log(`[agent-witch] Host restart into updated bundle requested (${f})\u2026`),xd({installDir:e.layout.installDir,bundleVersion:w}).then(W=>{W.ok||(t.wakeError=W.message,console.error(`[agent-witch] Host restart after bundle update failed: ${W.message}`))}).finally(()=>{t.restartInFlight=!1}),"accepted"},n=(f,w,W,_)=>{oe(f,{type:"device.restart.ack",payload:dE({status:W,reason:w}),..._!==void 0?{requestId:_}:{}},e.layout)},s=(f,w="system.ack")=>{if(!t.selfUpdateInFlight&&bN({installDir:e.layout.installDir,remoteBundleVersion:f})){if(Qt(e.layout)){Ld({layout:e.layout,remoteBundleVersion:f,trigger:w}),console.log(`[agent-witch] Deferring install bundle update (${f} via ${w}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,kN({layout:e.layout,remoteBundleVersion:f,trigger:w}).finally(()=>{t.selfUpdateInFlight=!1})}},i=()=>{let f=Ue(e.layout);f!==null&&tt(f,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,d(),p(),S())},a=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},c=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},d=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},p=()=>{if(t.socket===void 0)return;let f=t.socket;t.socket=void 0,t.wsConnected=!1,f.removeAllListeners("open"),f.removeAllListeners("message"),f.removeAllListeners("close"),f.on("error",()=>{}),(f.readyState===kc.OPEN||f.readyState===kc.CONNECTING)&&f.close()},m=()=>{c(),t.localHealthTimer=setInterval(i,xre)},g=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let f=kbe(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${f}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,S()},f)},y=f=>{a();let w=()=>{let W=wd(e.layout.installDir),_=Ar();oe(f,{type:"agent.heartbeat",payload:{hostname:Oc.default.hostname(),macOsUsername:Oc.default.userInfo().username,wakeError:t.wakeError,wakePort:_,...e.email!==null?{email:e.email}:{},installBundleVersion:W}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};w(),t.heartbeatTimer=setInterval(w,xre)},h=(f,w)=>{if(typeof f.type!="string")return;if(mI(f)){t.stopped=!0,a(),d(),p(),dI({layout:e.layout}).finally(()=>{mg(),process.exit(0)});return}Wn(e.layout,{direction:"in",type:f.type,summary:"inbound WS frame"}),dP(e.layout,"in",f);let W=typeof f.requestId=="string"?f.requestId:void 0;if(f.type==="device.auth.attestation"&&fe(f.payload)){let _=typeof f.payload.serverPublicKey=="string"?f.payload.serverPublicKey:"",M=typeof f.payload.origin=="string"?f.payload.origin:"",v=typeof f.payload.devicePublicKey=="string"?f.payload.devicePublicKey:"",b=typeof f.payload.challenge=="string"?f.payload.challenge:"",P=typeof f.payload.serverAttestation=="string"?f.payload.serverAttestation:"";if(!sM({serverPublicKey:_,origin:M,devicePublicKey:v,challenge:b,serverAttestation:P})){t.wakeError="Server attestation verification failed",Wn(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(f.type==="writer.ensure"&&fe(f.payload)){let _=typeof f.payload.writerAgent=="string"?f.payload.writerAgent:"";Wn(e.layout,{direction:"local",type:"writer.ensure",summary:_,action:"ensure-writer"}),CN({layout:e.layout,writerAgent:_,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(M=>{oe(w,{type:"writer.status",payload:M},e.layout)})}if(f.type==="install.bundle.update"&&fe(f.payload)){let _=typeof f.payload.bundleVersion=="string"?f.payload.bundleVersion.trim():"";_.length>0&&s(_,"install.bundle.update")}if(f.type==="system.ack"){Ny(e.layout,{wsUrl:e.wsUrl});let _=fe(f.payload)?f.payload:null,M=RN(_);M!==null&&s(M)}if(f.type==="device.restart"){let _=r("cloud-device-restart");n(w,"cloud-device-restart",_,W)}if(f.type==="automations.sync"&&fe(f.payload)&&wN(f.payload),f.type==="project.message.history"&&fe(f.payload)){X0({payload:f.payload});return}if(f.type==="project.history.page.request"&&fe(f.payload)){let _=gO({payload:f.payload});oe(w,{type:"project.history.page.result",payload:_,requestId:W});return}if(f.type==="automations.run"&&fe(f.payload)&&EN(f.payload),f.type==="terminal.stream.accepted"&&fe(f.payload)){let _=typeof f.payload.runId=="string"?f.payload.runId:"";if(_.length>0){let M=XM(_);for(let v of M)oe(w,{type:"terminal.stream.chunk",payload:{runId:_,chunk:v},requestId:W})}}if(f.type==="agent.agentRun.list"&&oe(w,{type:"dashboard.agentRun.list.result",payload:{runs:dN(e.layout)},requestId:W}),f.type==="agent.agentRun.get"&&fe(f.payload)){let _=typeof f.payload.runId=="string"?f.payload.runId:"",M=_.length>0?vc(e.layout,_):null;oe(w,{type:"dashboard.agentRun.get.result",payload:{run:M},requestId:W})}if(f.type==="command.claude.run"&&fe(f.payload)){let _=f.payload.prompt,M=typeof f.payload.writerAgent=="string"&&Ne(f.payload.writerAgent)?f.payload.writerAgent:"claude-cli",v=typeof f.payload.agentRunId=="string"?f.payload.agentRunId:void 0,b=f.payload.sessionContinuation===!0,P=typeof f.payload.sourceRunId=="string"?f.payload.sourceRunId:void 0,C=typeof f.payload.shellSessionId=="string"?f.payload.shellSessionId:void 0,L=typeof f.payload.projectId=="string"?f.payload.projectId:void 0,pe=Zd(typeof f.payload.projectFolderPath=="string"?f.payload.projectFolderPath:void 0,xc,L),Z=qw(f.payload.compositionSnapshot),$e=typeof f.payload.reportKey=="string"?f.payload.reportKey:void 0;if(typeof _=="string"&&_.trim().length>0){if(console.log(`[agent-witch] Running ${M} task (${b?"continue":"first"})\u2026`),v!==void 0&&(Mre.has(v)||zN.has(v)||vc(e.layout,v)!==null)){console.log(`[agent-witch] Ignoring duplicate run ${v}.`);return}let k=O=>{oe(w,np({code:O,...v!==void 0?{agentRunId:v}:{},...W!==void 0?{requestId:W}:{}}))},R=O=>{if(Z!==null){let D=Yw(e.layout,Z);if(D!==null){oe(w,{type:"command.claude.result",payload:{exitCode:-1,output:D,...v!==void 0?{agentRunId:v}:{}},requestId:W});return}if(v!==void 0){let H=Zw(e.layout,v,Z);if(!H.ok){oe(w,{type:"command.claude.result",payload:{exitCode:-1,output:H.errorMessage,...v!==void 0?{agentRunId:v}:{}},requestId:W});return}KN.set(v,Z.entries.some($=>$.scope==="run"))}}v!==void 0&&C!==void 0&&Wre.set(v,C),v!==void 0&&(Ore.set(v,O),L!==void 0&&L.trim().length>0&&FN.set(v,L.trim()),$N.set(v,_.trim()),L!==void 0&&L.trim().length>0&&jre({projectId:L.trim(),agentRunId:v,status:"running",promptBody:_.trim(),resultBody:null,writerAgent:M,completedAt:null}),$t({projectFolderPath:O,...L!==void 0&&L.trim().length>0?{projectId:L.trim()}:{}})),Sbe(e,M,_.trim(),W,w,v,b,C,P,O,$e,L)};v!==void 0&&zN.add(v),cee({config:e,...L!==void 0?{projectId:L}:{},requestedFolderPath:pe,defaultFolderPath:xc()}).catch(()=>({ok:!1,code:ue.FOLDER_CHECK_UNAVAILABLE})).then(O=>{if(v!==void 0&&zN.delete(v),!O.ok){k(O.code);return}v!==void 0&&Mre.add(v),R(O.folderRealPath)}).catch(O=>{console.error("[agent-witch] Run start failed:",O instanceof Error?O.message:O)})}}if(f.type==="shell.session.open"&&fe(f.payload)){let _=typeof f.payload.shellSessionId=="string"?f.payload.shellSessionId:"",M=typeof f.payload.cols=="number"?f.payload.cols:120,v=typeof f.payload.rows=="number"?f.payload.rows:32;_.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),oN({shellSessionId:_,cwd:e.workspace,cols:M,rows:v,send:b=>{oe(w,b)},requestId:W}))}if(f.type==="shell.session.close"&&fe(f.payload)){let _=typeof f.payload.shellSessionId=="string"?f.payload.shellSessionId:"";_.length>0&&Tc(_,M=>{oe(w,M)},W)}if(f.type==="shell.input"&&fe(f.payload)){let _=typeof f.payload.shellSessionId=="string"?f.payload.shellSessionId:"",M=typeof f.payload.data=="string"?f.payload.data:"";_.length>0&&M.length>0&&eN(_,M)}if(f.type==="shell.resize"&&fe(f.payload)){let _=typeof f.payload.shellSessionId=="string"?f.payload.shellSessionId:"",M=typeof f.payload.cols=="number"?f.payload.cols:0,v=typeof f.payload.rows=="number"?f.payload.rows:0;_.length>0&&M>0&&v>0&&tN(_,M,v)}if(f.type==="command.writer.session.end"&&fe(f.payload)){let _=f.payload.writerAgent;typeof _=="string"&&Ne(_)&&(sN(_),l_(e.layout,_))}if(f.type==="command.writer.session.start"&&fe(f.payload)){let _=f.payload.writerAgent,M=typeof f.payload.writerSessionId=="string"?f.payload.writerSessionId:"";typeof _=="string"&&Ne(_)&&M.length>0&&(console.log(`[agent-witch] Starting ${_} session\u2026`),Pbe(e,_,M,W,w))}if(f.type==="command.claude.stop"&&fe(f.payload)){let _=typeof f.payload.agentRunId=="string"?f.payload.agentRunId:"";_.length>0&&(console.log(`[agent-witch] Stopping run ${_}\u2026`),vg(e,Jb(w),_,W))}if(f.type==="command.claude.input_respond"&&fe(f.payload)){let _=typeof f.payload.agentRunId=="string"?f.payload.agentRunId:"",M=typeof f.payload.response=="string"?f.payload.response.trim():"",v=typeof f.payload.originalPrompt=="string"?f.payload.originalPrompt:"",b=typeof f.payload.partialOutput=="string"?f.payload.partialOutput:"",P=typeof f.payload.question=="string"?f.payload.question:"";_.length>0&&M.length>0&&v.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),hN(e,{agentRunId:_,originalPrompt:v,partialOutput:b,question:P,response:M,shellSessionId:Wre.get(_)},W,Jb(w)))}if(f.type==="dispatch.approval.required"&&fe(f.payload)){let _=typeof f.payload.requesterEmail=="string"?f.payload.requesterEmail:"A teammate",M=typeof f.payload.prompt=="string"?f.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${_}: ${M}`),process.platform==="darwin"&&(0,VN.spawn)("osascript",["-e",`display notification "${M.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${_.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(f.type==="harness.request"&&fe(f.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),bbe(e,f.payload,W,w)),f.type==="harness.export.request"&&fe(f.payload)){let _=typeof f.payload.borrowerUserId=="string"?f.payload.borrowerUserId:"",M=typeof f.payload.targetDeviceId=="string"?f.payload.targetDeviceId:void 0,v=Array.isArray(f.payload.setSlugs)?f.payload.setSlugs.filter(b=>typeof b=="string"):[];_.length>0&&v.length>0&&(async()=>{let{readHarnessExportSets:b}=await Promise.resolve().then(()=>(vre(),Lre)),P=b(v,e.email);oe(w,{type:"harness.export.result",payload:{success:P.length>0,borrowerUserId:_,...M!==void 0?{targetDeviceId:M}:{},sets:P,errorMessage:P.length>0?void 0:"No readable harness sets were found on this machine."},requestId:W})})()}if(f.type==="harness.manifest.request"&&Og(w,e.layout),f.type==="command.claude.result"&&fe(f.payload)){let _=typeof f.payload.agentRunId=="string"?f.payload.agentRunId:void 0,M=typeof f.payload.output=="string"?f.payload.output:"",v=typeof f.payload.exitCode=="number"?f.payload.exitCode:null,b=Zd(_!==void 0?Ore.get(_):void 0,xc),P=_!==void 0?FN.get(_):void 0,C=_!==void 0?$N.get(_)??"":"",L=LT({exitCode:v,output:M});if(L&&b!==null&&pL({layout:e.layout,text:M,source:_??"command.claude.result",projectFolderPath:b,...P!==void 0?{projectId:P}:{}}),v!=null&&v!==0&&M.trim().length>0&&b!==null&&(iL({layout:e.layout,errorText:M,projectFolderPath:b,...P!==void 0?{projectId:P}:{}}),gL({layout:e.layout,text:M,source:_??"command.claude.result.failure",projectFolderPath:b,...P!==void 0?{projectId:P}:{}})),L&&C.trim().length>0&&b!==null&&yW({layout:e.layout,projectFolderPath:b,...P!==void 0?{projectId:P}:{},entry:{id:`${Date.now()}-${_??"run"}`,..._!==void 0?{agentRunId:_}:{},prompt:C,output:M,createdAt:new Date().toISOString()}}),_!==void 0&&b!==null){let Z=BN.get(_),$e=GN.get(_);Z!==void 0&&$e!==void 0&&oS(b).then(k=>{let R=OT({before:$e,after:k});_R(Z,R),GN.delete(_),BN.delete(_)})}if(L&&P!==void 0&&P.trim().length>0){let Z=B(),$e=Z===null?null:J({wsUrl:Z.wsUrl,pairingToken:Z.pairingToken});$e!==null&&MT($e,P,{..._!==void 0?{sourceRunId:_}:{},lesson:jT({prompt:C,output:M})})}if(_!==void 0&&P!==void 0&&P.trim().length>0){let Z=v==null||v===0?"completed":"failed";jre({projectId:P.trim(),agentRunId:_,status:Z,promptBody:C.length>0?C:void 0,resultBody:M,completedAt:new Date().toISOString()})}_!==void 0&&(ep(e.layout,_),KN.delete(_),FN.delete(_),$N.delete(_))}},S=()=>{if(t.stopped)return;d(),p();let f=new kc(e.wsUrl);t.socket=f,f.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),gN(J({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),yN(e.layout);let w=et(e.wsUrl)??"http://localhost:3000",W=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),_=nM({layout:e.layout,origin:w,...W!==void 0&&W.length>0?{claimToken:W}:{}});oe(f,{type:"agent.register",payload:{role:"agent",hostname:Oc.default.hostname(),macOsUsername:Oc.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},..._}},e.layout),Og(f,e.layout),SN(e,f),y(f)}),f.on("message",w=>{let W=typeof w=="string"?w:w.toString("utf8");try{let _=JSON.parse(W);if(!fe(_))return;h(_,f)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),f.on("close",(w,W)=>{a(),t.socket=void 0,t.wsConnected=!1,uw(e.layout),t.reconnectAttempt+=1;let _=typeof W=="string"?W:W.toString("utf8");li(e.layout,{kind:"ws_close",message:"WebSocket closed",code:w,reason:_}),console.log("[agent-witch] Disconnected from server."),g()}),f.on("error",w=>{t.wakeError=w.message,li(e.layout,{kind:"ws_error",message:w.message,stack:w.stack}),console.error(`[agent-witch] Socket error: ${w.message}`)})},E=uE(e.layout.configPath,f=>{if(!f)return;let w=PN(e,Jb(t.socket??{readyState:kc.CLOSED,send:()=>{}}));console.log(`[agent-witch] Coding tools paused; stopped ${w} run(s).`)}),I=()=>{t.stopped=!0,E(),a(),c(),d(),p()};return XR(()=>{let f=ZR();f!==null&&f.layout.installDir===e.layout.installDir&&f.layout.profileEmail===e.layout.profileEmail&&s(f.remoteBundleVersion,f.trigger);let w=QR();if(w==="install-bundle-update"){o(w);return}w!==null&&r(w)}),{connect:S,startLocalHealthCheck:m,stop:I,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:Dd(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:sg(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,S()},reportHarnessManifestIfConnected:()=>{let f=t.socket;return!t.wsConnected||f===void 0?{ok:!1,errorMessage:"Not connected to AgentWitch \u2014 manifest saved locally only."}:(Og(f,e.layout),{ok:!0})}}},wbe=async()=>{Dt("agent-witch");let e=WM(),t=x();NM().ok||(process.platform==="darwin"?(await Ss(t),process.stdout.write(`[agent-witch] Another AgentWitch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another AgentWitch process may already be running \u2014 exiting.
`),process.exit(0)),$M(t);let o=FM({installDir:t});if(o.length>0&&console.log(`[agent-witch] Stopped ${o.length} sibling process(es): ${o.join(", ")}`),process.platform==="darwin"){Ao({launchAgentLabel:Ie(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067).");try{let S=cd({launchAgentPrefix:Ie(t),wakePort:td(t)});S.length>0&&console.log(`[agent-witch] Synced AGENT_WITCH_WAKE_PORT to wake-port.json in ${String(S.length)} LaunchAgent plist(s).`)}catch(S){console.error(`[agent-witch] Could not sync LaunchAgent wake port: ${S instanceof Error?S.message:String(S)}`)}sd()}let n=await cE(),s=n[0];s!==void 0&&TN(s.layout);for(let h of n){let S=et(h.wsUrl)??Nt;Ed(h.layout.installDir,S)}let i=n.map(h=>Rbe(h)),a=i[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),mg(),process.exit(0));let c=()=>{n.forEach((h,S)=>{let E=i[S];if(E===void 0)return;let I=Ue(h.layout);mw(I,{socketOpen:E.hasMacSocketOpen(),staleAfterMs:12e4})&&E.reviveWebSocket()})},d=()=>{},p=()=>{if(e.skipInProcessLive)return;let h=n[0]?.layout;h!==void 0&&(Qt(h)||Bp(h.installDir))},m=await zM({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:p,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}});e.skipInProcessLive?console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE)."):ng({layout:n[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}}),e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let h of i)h.startLocalHealthCheck(),h.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let g=_o(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),id(),d()}),y=()=>{g(),m.stop();for(let h of i)h.stop();mg()};nw(y),d=()=>{y(),console.log("[agent-witch] Shutting down."),process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},jg=wbe});var qN=l(()=>{"use strict";Nre()});var Dre={};Mt(Dre,{startAgentWitchClient:()=>jg});var Hre=l(()=>{"use strict";qN();qN();As();bR();my();if(!Ht()&&_s(__agentWitchImportMetaUrl)){let e=process.argv.indexOf("report");e>=0&&process.exit(uy(process.argv.slice(e))),jg()}});SR();bR();As();my();var XF="20.x",ZF="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var qae=e=>[`Node.js ${XF} or newer is required (found ${e}).`,ZF].join(" "),QF=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${qae(process.version)}
`),process.exit(1))};_y();var Ebe=async()=>{Dt("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(dw(),cw)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},Tbe=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(yK(),fK)),t=await e();if(t.ok){process.stdout.write(`AgentWitch is waking up.
`);return}let r=t.kicked.filter(o=>!o.ok).map(o=>o.errorMessage??o.launchAgentLabel).join("; ");process.stderr.write(`Could not wake AgentWitch. ${r}
`),process.exit(1)},Cbe=async e=>{try{if(e===hy){let{resolveAgentWitchLocalLayout:t}=await Promise.resolve().then(()=>(Q(),nR)),{runCheckContextHookCli:r}=await Promise.resolve().then(()=>(Qr(),MG));await r({layout:t()})}else process.stderr.write(`[agent-witch] ${ba}: unknown hook ${e??"(none)"}
`)}catch(t){let r=t instanceof Error?t.message:String(t);process.stderr.write(`[agent-witch] ${ba}: ${r}
`)}await new Promise(t=>{process.stdout.write("",()=>t())}),process.exit(0)},Ibe=async()=>{if(!_s(Ht()?void 0:__agentWitchImportMetaUrl))return;process.argv[2]===ba&&await Cbe(process.argv[3]),QF();let e=process.argv.indexOf("report");e>=0&&process.exit(uy(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await Ebe();return}if(t==="wake"){await Tbe();return}if(t==="bridge"){let{runAgentWitchBridgeCli:o}=await Promise.resolve().then(()=>(_V(),AV));await o();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:o}=await Promise.resolve().then(()=>(QZ(),ZZ));o();return}if(t==="mcp"){let{resolveAgentWitchLocalLayout:o}=await Promise.resolve().then(()=>(Q(),nR)),{runAwlMcpStdio:n}=await Promise.resolve().then(()=>(iW(),X3));await n({layout:o()});return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(Hre(),Dre));await r()};Ibe();
