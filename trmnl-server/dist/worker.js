// TRMNL server for Cloudflare Workers. Built from trmnl-server/src by build.mjs; paste this whole file into the Worker editor.
var fe=(()=>{for(var t=new Uint8Array(128),e=0;e<64;e++)t[e<26?e+65:e<52?e+71:e<62?e-4:e*4-205]=e;return n=>{for(var s=n.length,i=new Uint8Array((s-(n[s-1]=="=")-(n[s-2]=="="))*3/4|0),r=0,a=0;r<s;){var o=t[n.charCodeAt(r++)],l=t[n.charCodeAt(r++)],c=t[n.charCodeAt(r++)],h=t[n.charCodeAt(r++)];i[a++]=o<<2|l>>4,i[a++]=l<<4|c>>2,i[a++]=c<<6|h}return i}})();var R=class{constructor(e,n,s,i,r){this.kind=e,this.input=n,this.begin=s,this.end=i,this.file=r}getText(){return this.input.slice(this.begin,this.end)}getPosition(){let[e,n]=[1,1];for(let s=0;s<this.begin;s++)this.input[s]===`
`?(e++,n=1):n++;return[e,n]}size(){return this.end-this.begin}},C=class{liquidMethodMissing(e){}},rs=Object.prototype.toString,Bt=String.prototype.toLowerCase,Nt=Object.hasOwnProperty;function f(t){return typeof t=="string"}function v(t){return typeof t=="function"}function as(t){return t&&v(t.then)}function ye(t){return t&&v(t.next)&&v(t.throw)&&v(t.return)}function os(t){return t.replace(/[-/\\^$*+?.()|[\]{}]/g,"\\$&")}function u(t){return t=p(t),f(t)?t:F(t)?"":I(t)?t.map(e=>u(e)).join(""):String(t)}function de(t){return t=p(t),I(t)?t:f(t)&&t.length>0?[t]:cs(t)?Array.from(t):Ee(t)?Object.keys(t).map(e=>[e,t[e]]):[]}function k(t){return t=p(t),F(t)?[]:I(t)?t:[t]}function p(t){return t instanceof C&&v(t.valueOf)?t.valueOf():t}function Kt(t){return t=Number(t),isNaN(t)?0:t}function Me(t){return typeof t=="number"}function wn(t){return t&&v(t.toLiquid)?wn(t.toLiquid()):t}function F(t){return t==null}function ls(t){return t===void 0}function I(t){return rs.call(t)==="[object Array]"}function yn(t){return t&&Me(t.length)}function cs(t){return Ee(t)&&Symbol.iterator in t}function Gt(t,e){t=t||{};for(let n in t)if(Nt.call(t,n)&&e(t[n],n,t)===!1)break;return t}function _n(t){return t[t.length-1]}function Ee(t){let e=typeof t;return t!==null&&(e==="object"||e==="function")}function xn(t,e,n=1){let s=[];for(let i=t;i<e;i+=n)s.push(i);return s}function re(t,e,n=" "){return bn(t,e,n,(s,i)=>i+s)}function hs(t,e,n=" "){return bn(t,e,n,(s,i)=>s+i)}function bn(t,e,n,s){t=String(t);let i=e-t.length;for(;i-- >0;)t=s(t,n);return t}function vn(t){return t}function us(t){return[...t].some(n=>n>="a"&&n<="z")?t.toUpperCase():t.toLowerCase()}function ds(t,e){return t.length>e?t.slice(0,e-3)+"...":t}function Ht(t,e){return t==null&&e==null?0:t==null?1:e==null||(t=Bt.call(t),e=Bt.call(e),t<e)?-1:t>e?1:0}function z(t){return function(...e){return t.call(this,...e.map(p))}}function At(t){return t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")}function*pe(t){let e=new Set;for(let n of t){let s=JSON.stringify(n);e.has(s)||(e.add(s),yield n)}}var Yt="__liquidClass__",U=class extends Error{constructor(e,n){super(typeof e=="string"?e:e.message),this.context="",typeof e!="string"&&Object.defineProperty(this,"originalError",{value:e,enumerable:!1}),Object.defineProperty(this,"token",{value:n,enumerable:!1}),Object.defineProperty(this,Yt,{value:"LiquidError",enumerable:!1})}update(){Object.defineProperty(this,"context",{value:fs(this.token),enumerable:!1}),this.message=ps(this.message,this.token),this.stack=this.message+`
`+this.context+`
`+this.stack,this.originalError&&(this.stack+=`
From `+this.originalError.stack)}static is(e){return e?.[Yt]==="LiquidError"}},Le=class extends U{constructor(e,n){super(e,n),this.name="TokenizationError",super.update()}},Ce=class extends U{constructor(e,n){super(e,n),this.name="ParseError",this.message=e.message,super.update()}},Ue=class extends U{constructor(e,n){super(e,n.token),this.name="RenderError",this.message=e.message,super.update()}static is(e){return e.name==="RenderError"}},_e=class extends U{constructor(e){super(e[0],e[0].token),this.errors=e,this.name="LiquidErrors";let n=e.length>1?"s":"";this.message=`${e.length} error${n} found`,super.update()}static is(e){return e.name==="LiquidErrors"}},We=class extends U{constructor(e,n){super(e,n),this.name="UndefinedVariableError",this.message=e.message,super.update()}},Ve=class extends Error{constructor(e){super(`undefined variable: ${e}`),this.name="InternalUndefinedVariableError",this.variableName=e}},De=class extends Error{constructor(e){super(e),this.name="AssertionError",this.message=e+""}};function fs(t){let[e,n]=t.getPosition(),s=t.input.split(`
`),i=Math.max(e-2,1),r=Math.min(e+3,s.length);return xn(i,r+1).map(o=>{let l=o===e?">> ":"   ",c=re(String(o),String(r).length),h=`${l}${c}| `,d=o===e?`
`+re("^",n+h.length):"";return h+=s[o-1],h+=d,h}).join(`
`)}function ps(t,e){e.file&&(t+=`, file:${e.file}`);let[n,s]=e.getPosition();return t+=`, line:${n}, col:${s}`,t}var g=[0,0,0,0,0,0,0,0,0,20,4,4,4,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,20,2,8,0,0,0,0,8,0,0,0,64,0,65,0,0,33,33,33,33,33,33,33,33,33,33,0,0,2,2,2,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0],ms=1,Q=4,Zt=8,kn=16,gs=32,ws=64,ys=128;function me(t){let e=t.charCodeAt(0);return e>=128?!g[e]:!!(g[e]&ms)}g[160]=g[5760]=g[6158]=g[8192]=g[8193]=g[8194]=g[8195]=g[8196]=g[8197]=g[8198]=g[8199]=g[8200]=g[8201]=g[8202]=g[8232]=g[8233]=g[8239]=g[8287]=g[12288]=Q;g[8220]=g[8221]=ys;function $(t,e){if(!t){let n=typeof e=="function"?e():e||`expect ${t} to be true`;throw new De(n)}}function xe(t,e=`unexpected ${JSON.stringify(t)}`){$(!t,e)}var Xe=class extends C{equals(e){return F(p(e))}gt(){return!1}geq(){return!1}lt(){return!1}leq(){return!1}valueOf(){return null}},ae=class t extends C{equals(e){return e instanceof t?!1:(e=p(e),f(e)||I(e)?e.length===0:Ee(e)?Object.keys(e).length===0:!1)}gt(){return!1}geq(){return!1}lt(){return!1}leq(){return!1}valueOf(){return""}static is(e){return e instanceof t}},Pe=class t extends ae{equals(e){return e===!1||F(p(e))?!0:f(e)?/^\s*$/.test(e):super.equals(e)}static is(e){return e instanceof t}},oe=class extends C{constructor(e,n,s){super(),this.i=0,this.length=e,this.name=`${s}-${n}`}next(){this.i++}index0(){return this.i}index(){return this.i+1}first(){return this.i===0}last(){return this.i===this.length-1}rindex(){return this.length-this.i}rindex0(){return this.length-this.i-1}valueOf(){return JSON.stringify(this)}},be=class extends C{constructor(e=()=>""){super(),this.superBlockRender=e}super(){return this.superBlockRender()}};function E(t){return t&&v(t.equals)&&v(t.gt)&&v(t.geq)&&v(t.lt)&&v(t.leq)}var Qt=new Xe,In={true:!0,false:!1,nil:Qt,null:Qt,empty:new ae,blank:new Pe};function en(t){let e={};for(let[n,s]of Object.entries(t)){let i=e;for(let r=0;r<n.length;r++){let a=n[r];i[a]=i[a]||{},r===n.length-1&&me(n[r])&&(i[a].needBoundary=!0),i=i[a]}i.data=s,i.end=!0}return e}var ve=function(){return ve=Object.assign||function(e){for(var n,s=1,i=arguments.length;s<i;s++){n=arguments[s];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},ve.apply(this,arguments)};function b(t,e,n,s){function i(r){return r instanceof n?r:new n(function(a){a(r)})}return new(n||(n=Promise))(function(r,a){function o(h){try{c(s.next(h))}catch(d){a(d)}}function l(h){try{c(s.throw(h))}catch(d){a(d)}}function c(h){h.done?r(h.value):i(h.value).then(o,l)}c((s=s.apply(t,e||[])).next())})}function N(t){return b(this,void 0,void 0,function*(){if(!ye(t))return t;let e,n=!1,s="next";do{let i=t[s](e);n=i.done,e=i.value,s="next";try{ye(e)&&(e=N(e)),as(e)&&(e=yield e)}catch(r){s="throw",e=r}}while(!n);return e})}function A(t){if(!ye(t))return t;let e,n=!1,s="next";do{let i=t[s](e);if(n=i.done,e=i.value,s="next",ye(e))try{e=A(e)}catch(r){s="throw",e=r}}while(!n);return e}var _s=/%([-_0^#:]+)?(\d+)?([EO])?(.)/;function xs(t){return[31,bs(t)?29:28,31,30,31,30,31,31,30,31,30,31]}function $n(t){let e=0;for(let n=0;n<t.getMonth();++n)e+=xs(t)[n];return e+t.getDate()}function tn(t,e){let n=$n(t)+(e-t.getDay()),i=7-new Date(t.getFullYear(),0,1).getDay()+e;return String(Math.floor((n-i)/7)+1)}function bs(t){let e=t.getFullYear();return!!(!(e&3)&&(e%100||e%400===0&&e))}function vs(t){let e=t.getDate();if([11,12,13].includes(e))return"th";switch(e%10){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}}function ks(t){return parseInt(t.getFullYear().toString().substring(0,2),10)}var Is={d:2,e:2,H:2,I:2,j:3,k:2,l:2,L:3,m:2,M:2,S:2,U:2,W:2},$s=new Set("aAbBceklpP");function nn(t,e){let n=Math.abs(t.getTimezoneOffset()),s=Math.floor(n/60),i=n%60;return(t.getTimezoneOffset()>0?"-":"+")+re(s,2,"0")+(e.flags[":"]?":":"")+re(i,2,"0")}var Je={a:t=>t.getShortWeekdayName(),A:t=>t.getLongWeekdayName(),b:t=>t.getShortMonthName(),B:t=>t.getLongMonthName(),c:t=>t.toLocaleString(),C:t=>ks(t),d:t=>t.getDate(),e:t=>t.getDate(),H:t=>t.getHours(),I:t=>String(t.getHours()%12||12),j:t=>$n(t),k:t=>t.getHours(),l:t=>String(t.getHours()%12||12),L:t=>t.getMilliseconds(),m:t=>t.getMonth()+1,M:t=>t.getMinutes(),N:(t,e)=>{let n=Number(e.width)||9,s=String(t.getMilliseconds()).slice(0,n);return hs(s,n,"0")},p:t=>t.getHours()<12?"AM":"PM",P:t=>t.getHours()<12?"am":"pm",q:t=>vs(t),s:t=>Math.round(t.getTime()/1e3),S:t=>t.getSeconds(),u:t=>t.getDay()||7,U:t=>tn(t,0),w:t=>t.getDay(),W:t=>tn(t,1),x:t=>t.toLocaleDateString(),X:t=>t.toLocaleTimeString(),y:t=>t.getFullYear().toString().slice(2,4),Y:t=>t.getFullYear(),z:nn,Z:(t,e)=>t.getTimeZoneName()||nn(t,e),t:()=>"	",n:()=>`
`,"%":()=>"%"};Je.h=Je.b;function ge(t,e){let n="",s=e,i;for(;i=_s.exec(s);)n+=s.slice(0,i.index),s=s.slice(i.index+i[0].length),n+=Ts(t,i);return n+s}function Ts(t,e){let[n,s="",i,r,a]=e,o=Je[a];if(!o)return n;let l={};for(let m of s)l[m]=!0;let c=String(o(t,{flags:l,width:i,modifier:r})),h=$s.has(a)?" ":"0",d=i||Is[a]||0;return l["^"]?c=c.toUpperCase():l["#"]&&(c=us(c)),l._?h=" ":l[0]&&(h="0"),l["-"]&&(d=0),re(c,d,h)}function Tn(){return typeof Intl<"u"?Intl.DateTimeFormat:void 0}var Rs=6e4,Ss=/([zZ]|([+-])(\d{2}):?(\d{2}))$/,Rn=["January","February","March","April","May","June","July","August","September","October","November","December"],zs=Rn.map(t=>t.slice(0,3)),Sn=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],Fs=Sn.map(t=>t.slice(0,3)),D=class t{constructor(e,n,s){this.locale=n,this.DateTimeFormat=Tn(),this.date=new Date(e),this.timezoneFixed=s!==void 0,s===void 0&&(s=this.date.getTimezoneOffset()),this.timezoneOffset=f(s)?t.getTimezoneOffset(s,this.date):s,this.timezoneName=f(s)?s:"";let i=(this.date.getTimezoneOffset()-this.timezoneOffset)*Rs,r=this.date.getTime()+i;this.displayDate=new Date(r)}getTime(){return this.displayDate.getTime()}getMilliseconds(){return this.displayDate.getMilliseconds()}getSeconds(){return this.displayDate.getSeconds()}getMinutes(){return this.displayDate.getMinutes()}getHours(){return this.displayDate.getHours()}getDay(){return this.displayDate.getDay()}getDate(){return this.displayDate.getDate()}getMonth(){return this.displayDate.getMonth()}getFullYear(){return this.displayDate.getFullYear()}toLocaleString(e,n){return n?.timeZone?this.date.toLocaleString(e,n):this.displayDate.toLocaleString(e,n)}toLocaleTimeString(e){return this.displayDate.toLocaleTimeString(e)}toLocaleDateString(e){return this.displayDate.toLocaleDateString(e)}getTimezoneOffset(){return this.timezoneOffset}getTimeZoneName(){if(this.timezoneFixed)return this.timezoneName;if(this.DateTimeFormat)return this.DateTimeFormat().resolvedOptions().timeZone}getLongMonthName(){var e;return(e=this.format({month:"long"}))!==null&&e!==void 0?e:Rn[this.getMonth()]}getShortMonthName(){var e;return(e=this.format({month:"short"}))!==null&&e!==void 0?e:zs[this.getMonth()]}getLongWeekdayName(){var e;return(e=this.format({weekday:"long"}))!==null&&e!==void 0?e:Sn[this.displayDate.getDay()]}getShortWeekdayName(){var e;return(e=this.format({weekday:"short"}))!==null&&e!==void 0?e:Fs[this.displayDate.getDay()]}valid(){return!isNaN(this.getTime())}format(e){return this.DateTimeFormat&&this.DateTimeFormat(this.locale,e).format(this.displayDate)}static createDateFixedToTimezone(e,n){let s=e.match(Ss);if(s&&s[1]==="Z")return new t(+new Date(e),n,0);if(s&&s[2]&&s[3]&&s[4]){let[,,i,r,a]=s,o=(i==="+"?-1:1)*(parseInt(r,10)*60+parseInt(a,10));return new t(+new Date(e),n,o)}return new t(e,n)}static getTimezoneOffset(e,n){let s=n.toLocaleString("en-US",{timeZone:e}),i=n.toLocaleString("en-US",{timeZone:"UTC"}),r=new Date(s);return(+new Date(i)-+r)/(60*1e3)}},le=class{constructor(e,n){this.base=0,this.message=`${e} limit exceeded`,this.limit=n}use(e){e=Kt(e),$(this.base+e<=this.limit,this.message),this.base+=e}check(e){e=Kt(e),$(e<=this.limit,this.message)}},ce=class extends R{constructor(e,[n,s],i,r,a,o,l,c){super(e,i,r,a,c),this.trimLeft=!1,this.trimRight=!1;let h=i[n]==="-",d=i[s-1]==="-",m=h?n+1:n,_=d?s-1:s;for(;m<_&&g[i.charCodeAt(m)]&Q;)m++;for(;_>m&&g[i.charCodeAt(_-1)]&Q;)_--;this.contentRange=[m,_],this.trimLeft=h||o,this.trimRight=d||l}get content(){return this.input.slice(this.contentRange[0],this.contentRange[1])}},ke=class extends ce{constructor(e,n,s,i,r){let{trimTagLeft:a,trimTagRight:o,tagDelimiterLeft:l,tagDelimiterRight:c}=i,[h,d]=[n+l.length,s-c.length];super(w.Tag,[h,d],e,n,s,a,o,r),this.tokenizer=new O(e,i.operators,r,this.contentRange),this.name=this.tokenizer.readTagName(),this.tokenizer.assert(this.name,"illegal tag syntax, tag name expected"),this.tokenizer.skipBlank(),this.args=this.tokenizer.input.slice(this.tokenizer.p,this.contentRange[1])}},qe=class extends ce{constructor(e,n,s,i,r){let{trimOutputLeft:a,trimOutputRight:o,outputDelimiterLeft:l,outputDelimiterRight:c}=i,h=[n+l.length,s-c.length];super(w.Output,h,e,n,s,a,o,r)}},Ie=class extends R{constructor(e,n,s,i){super(w.HTML,e,n,s,i),this.input=e,this.begin=n,this.end=s,this.file=i,this.trimLeft=0,this.trimRight=0}getContent(){return this.input.slice(this.begin+this.trimLeft,this.end-this.trimRight)}},Be=class extends R{constructor(e,n,s,i){super(w.Number,e,n,s,i),this.input=e,this.begin=n,this.end=s,this.file=i,this.content=Number(this.getText())}},ne=class extends R{constructor(e,n,s,i){super(w.Word,e,n,s,i),this.input=e,this.begin=n,this.end=s,this.file=i,this.content=this.getText()}},Ke=class extends R{constructor(e,n,s,i){super(w.Literal,e,n,s,i),this.input=e,this.begin=n,this.end=s,this.file=i,this.literal=this.getText(),this.content=In[this.literal]}},sn={"==":2,"!=":2,">":2,"<":2,">=":2,"<=":2,contains:2,not:1,and:0,or:0},Os={"==":0,"!=":0,">":0,"<":0,">=":0,"<=":0,contains:0,not:1,and:0,or:0},Ge=class extends R{constructor(e,n,s,i){super(w.Operator,e,n,s,i),this.input=e,this.begin=n,this.end=s,this.file=i,this.operator=this.getText()}getPrecedence(){let e=this.getText();return e in sn?sn[e]:1}},$e=class extends R{constructor(e,n,s,i,r,a){super(w.PropertyAccess,s,i,r,a),this.variable=e,this.props=n}},Te=class extends R{constructor(e,n,s,i,r,a){super(w.Filter,s,i,r,a),this.name=e,this.args=n}},He=class extends R{constructor(e,n,s,i,r,a){super(w.Hash,e,n,s,a),this.input=e,this.begin=n,this.end=s,this.name=i,this.value=r,this.file=a}},Ms=/[\da-fA-F]/,rn=/[0-7]/,an={b:"\b",f:"\f",n:`
`,r:"\r",t:"	",v:"\v"};function on(t){let e=t.charCodeAt(0);return e>=97?e-87:e>=65?e-55:e-48}function Es(t){let e="";for(let n=1;n<t.length-1;n++){if(t[n]!=="\\"){e+=t[n];continue}if(an[t[n+1]]!==void 0)e+=an[t[++n]];else if(t[n+1]==="u"){let s=0,i=n+2;for(;i<=n+5&&Ms.test(t[i]);)s=s*16+on(t[i++]);n=i-1,e+=String.fromCharCode(s)}else if(!rn.test(t[n+1]))e+=t[++n];else{let s=n+1,i=0;for(;s<=n+3&&rn.test(t[s]);)i=i*8+on(t[s++]);n=s-1,e+=String.fromCharCode(i)}}return e}var Ye=class extends R{constructor(e,n,s,i){super(w.Quoted,e,n,s,i),this.input=e,this.begin=n,this.end=s,this.file=i,this.content=Es(this.getText())}},Ze=class extends R{constructor(e,n,s,i,r,a){super(w.Range,e,n,s,a),this.input=e,this.begin=n,this.end=s,this.lhs=i,this.rhs=r,this.file=a}},Qe=class extends ce{constructor(e,n,s,i,r){super(w.Tag,[n,s],e,n,s,!1,!1,r),this.tokenizer=new O(e,i.operators,r,this.contentRange),this.name=this.tokenizer.readTagName(),this.tokenizer.assert(this.name,"illegal liquid tag syntax"),this.tokenizer.skipBlank()}get args(){return this.tokenizer.input.slice(this.tokenizer.p,this.contentRange[1])}},et=class extends R{constructor(e,n,s,i,r,a){super(w.FilteredValue,s,i,r,a),this.initial=e,this.filters=n,this.input=s,this.begin=i,this.end=r,this.file=a}},js={now:()=>Date.now()};function zn(){return typeof global=="object"&&global.performance||typeof window=="object"&&window.performance||js}var tt=class{constructor(){this.buffer=""}write(e){this.buffer+=u(e)}},nt=class{constructor(){throw this.buffer="",this.stream=null,new Error("streaming not supported in browser")}},st=class{constructor(){this.buffer=""}write(e){e=p(e),typeof e!="string"&&this.buffer===""?this.buffer=e:this.buffer=u(this.buffer)+u(e)}},it=class{renderTemplatesToNodeStream(e,n){let s=new nt;return Promise.resolve().then(()=>N(this.renderTemplates(e,n,s))).then(()=>s.end(),i=>s.error(i)),s.stream}*renderTemplates(e,n,s){s||(s=n.opts.keepOutputType?new st:new tt);let i=[];for(let r of e){n.renderLimit.check(zn().now());try{let a=yield r.render(n,s);if(a&&s.write(a),n.breakCalled||n.continueCalled)break}catch(a){let o=U.is(a)?a:new Ue(a,r);if(n.opts.catchAllErrors)i.push(o);else throw o}}if(i.length)throw new _e(i);return s.buffer}},rt=class{constructor(e){this.postfix=[...Cs(e)]}*evaluate(e,n){$(e,"unable to evaluate: context not defined");let s=[];for(let i of this.postfix)if(Nn(i)){let r=s.pop(),a;if(Os[i.operator]===1)a=yield e.opts.operators[i.operator](r,e);else{let o=s.pop();a=yield e.opts.operators[i.operator](o,r,e)}s.push(a)}else s.push(yield x(i,e,n));return s[0]}valid(){return!!this.postfix.length}};function*x(t,e,n=!1){if(t){if("content"in t)return t.content;if(Oe(t))return yield Ns(t,e,n);if(An(t))return yield Ls(t,e)}}function*Ns(t,e,n){let s=[];for(let i of t.props)s.push(yield x(i,e,!1));try{if(t.variable){let i=yield x(t.variable,e,n);return yield e._getFromScope(i,s)}else return yield e._get(s)}catch(i){if(n&&i.name==="InternalUndefinedVariableError")return null;throw new We(i,t)}}function As(t){return t.content}function*Ls(t,e){let n=yield x(t.lhs,e),s=yield x(t.rhs,e);return e.memoryLimit.use(s-n+1),xn(+n,+s+1)}function*Cs(t){let e=[];for(let n of t)if(Nn(n)){for(;e.length&&e[e.length-1].getPrecedence()>n.getPrecedence();)yield e.pop();e.push(n)}else yield n;for(;e.length;)yield e.pop()}function q(t,e){return!je(t,e)}function je(t,e){return t=p(t),e.opts.jsTruthy?!t:t===!1||t===void 0||t===null}var Us={"==":L,"!=":(t,e)=>!L(t,e),">":(t,e)=>E(t)?t.gt(e):E(e)?e.lt(t):p(t)>p(e),"<":(t,e)=>E(t)?t.lt(e):E(e)?e.gt(t):p(t)<p(e),">=":(t,e)=>E(t)?t.geq(e):E(e)?e.leq(t):p(t)>=p(e),"<=":(t,e)=>E(t)?t.leq(e):E(e)?e.geq(t):p(t)<=p(e),contains:(t,e)=>(t=p(t),I(t)?t.some(n=>L(n,e)):v(t?.indexOf)?t.indexOf(p(e))>-1:!1),not:(t,e)=>je(p(t),e),and:(t,e,n)=>q(p(t),n)&&q(p(e),n),or:(t,e,n)=>q(p(t),n)||q(p(e),n)};function L(t,e){return E(t)?t.equals(e):E(e)?e.equals(t):(t=p(t),e=p(e),I(t)?I(e)&&Ws(t,e):t===e)}function Ws(t,e){return t.length!==e.length?!1:!t.some((n,s)=>!L(n,e[s]))}function Vs(t,e){return t.some(n=>L(n,e))}var se=class{constructor(e,n,s,i){this.key=e,this.value=n,this.next=s,this.prev=i}},Re=class{constructor(e,n=0){this.limit=e,this.size=n,this.cache={},this.head=new se("HEAD",null,null,null),this.tail=new se("TAIL",null,null,null),this.head.next=this.tail,this.tail.prev=this.head}write(e,n){if(this.cache[e])this.cache[e].value=n;else{let s=new se(e,n,this.head.next,this.head);this.head.next.prev=s,this.head.next=s,this.cache[e]=s,this.size++,this.ensureLimit()}}read(e){if(!this.cache[e])return;let{value:n}=this.cache[e];return this.remove(e),this.write(e,n),n}remove(e){let n=this.cache[e];n.prev.next=n.next,n.next.prev=n.prev,delete this.cache[e],this.size--}clear(){this.head.next=this.tail,this.tail.prev=this.head,this.size=0,this.cache={}}ensureLimit(){this.size>this.limit&&this.remove(this.tail.prev.key)}};function Fn(t,e){let n=document.createElement("base");n.href=t;let s=document.getElementsByTagName("head")[0];s.insertBefore(n,s.firstChild);let i=document.createElement("a");i.href=e;let r=i.href;return s.removeChild(n),r}function Ds(t,e,n){return t.length&&_n(t)!=="/"&&(t+="/"),Fn(t,e).replace(/^(\w+:\/\/[^/]+)(\/[^?]+)/,(i,r,a)=>{let o=a.split("/").pop();return/\.\w+$/.test(o)?i:r+a+n})}function Xs(t){return b(this,void 0,void 0,function*(){return new Promise((e,n)=>{let s=new XMLHttpRequest;s.onload=()=>{s.status>=200&&s.status<300?e(s.responseText):n(new Error(s.statusText))},s.onerror=()=>{n(new Error("An error occurred whilst receiving the response."))},s.open("GET",t),s.send()})})}function Ps(t){let e=new XMLHttpRequest;if(e.open("GET",t,!1),e.send(),e.status<200||e.status>=300)throw new Error(e.statusText);return e.responseText}function Js(t){return b(this,void 0,void 0,function*(){return!0})}function qs(t){return!0}function Bs(t){return Fn(t,".")}var Ks="/",Gs=Object.freeze({__proto__:null,resolve:Ds,readFile:Xs,readFileSync:Ps,exists:Js,existsSync:qs,dirname:Bs,sep:Ks});function Hs(t,e,...n){return t=p(t),I(t)||f(t)?t.length?t:e:t===!1&&new Map(n).get("allow_false")?!1:je(t,this.context)?e:t}function ln(t,e=0){return JSON.stringify(t,null,e)}function Ys(t,e=0){let n=[];return JSON.stringify(t,function(s,i){if(typeof i!="object"||i===null)return i;for(;n.length>0&&n[n.length-1]!==this;)n.pop();return n.includes(i)?"[Circular]":(n.push(i),i)},e)}function Zs(t){return Number(t)}var Qs={raw:!0,handler:vn},On={default:Hs,raw:Qs,jsonify:ln,to_integer:Zs,json:ln,inspect:Ys},ei={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&#34;","'":"&#39;"},ti={"&amp;":"&","&lt;":"<","&gt;":">","&#34;":'"',"&#39;":"'"};function Ne(t){return t=u(t),this.context.memoryLimit.use(t.length),t.replace(/&|<|>|"|'/g,e=>ei[e])}function ni(t){return Ne.call(this,t)}function si(t){return t=u(t),this.context.memoryLimit.use(t.length),t.replace(/&(amp|lt|gt|#34|#39);/g,e=>ti[e])}function ii(t){return Ne.call(this,si.call(this,t))}function ri(t){let e=u(t);return this.context.memoryLimit.use(e.length),e.replace(/\r?\n/gm,`<br />
`)}function ai(t){let e=u(t);return this.context.memoryLimit.use(e.length),e.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<.*?>|<!--[\s\S]*?-->/g,"")}var oi=Object.freeze({__proto__:null,escape:Ne,xml_escape:ni,escape_once:ii,newline_to_br:ri,strip_html:ai}),at=class{constructor(e){this.mapping=e,this.sep="/"}exists(e){return b(this,void 0,void 0,function*(){return this.existsSync(e)})}existsSync(e){return!F(this.mapping[e])}readFile(e){return b(this,void 0,void 0,function*(){return this.readFileSync(e)})}readFileSync(e){let n=this.mapping[e];if(F(n))throw new Error(`ENOENT: ${e}`);return n}dirname(e){let n=e.split(this.sep);return n.pop(),n.join(this.sep)}resolve(e,n,s){if(n+=s,e===".")return n;let i=e.split(/\/+/);for(let r of n.split(this.sep))r==="."||r===""||(r===".."?(i.length>1||i[0]!=="")&&i.pop():i.push(r));return i.join(this.sep)}},Y={root:["."],layouts:["."],partials:["."],relativeReference:!0,jekyllInclude:!1,keyValueSeparator:":",cache:void 0,extname:"",fs:Gs,dynamicPartials:!0,jsTruthy:!1,dateFormat:"%A, %B %-e, %Y at %-l:%M %P %z",locale:"",trimTagRight:!1,trimTagLeft:!1,trimOutputRight:!1,trimOutputLeft:!1,greedy:!0,tagDelimiterLeft:"{%",tagDelimiterRight:"%}",outputDelimiterLeft:"{{",outputDelimiterRight:"}}",preserveTimezones:!1,strictFilters:!1,strictVariables:!1,ownPropertyOnly:!0,lenientIf:!1,globals:{},keepOutputType:!1,operators:Us,memoryLimit:1/0,parseLimit:1/0,renderLimit:1/0};function li(t){var e,n;if(t.hasOwnProperty("root")&&(t.hasOwnProperty("partials")||(t.partials=t.root),t.hasOwnProperty("layouts")||(t.layouts=t.root)),t.hasOwnProperty("cache")){let s;typeof t.cache=="number"?s=t.cache>0?new Re(t.cache):void 0:typeof t.cache=="object"?s=t.cache:s=t.cache?new Re(1024):void 0,t.cache=s}return t=Object.assign(Object.assign(Object.assign({},Y),t.jekyllInclude?{dynamicPartials:!1}:{}),t),(!t.fs.dirname||!t.fs.sep)&&t.relativeReference&&(console.warn("[LiquidJS] `fs.dirname` and `fs.sep` are required for relativeReference, set relativeReference to `false` to suppress this warning"),t.relativeReference=!1),t.root=we(t.root),t.partials=we(t.partials),t.layouts=we(t.layouts),t.outputEscape=t.outputEscape&&ci(t.outputEscape),t.locale||(t.locale=(n=(e=Tn())===null||e===void 0?void 0:e().resolvedOptions().locale)!==null&&n!==void 0?n:"en-US"),t.templates&&(t.fs=new at(t.templates),t.relativeReference=!0,t.root=t.partials=t.layouts="."),t}function ci(t){return t==="escape"?Ne:t==="json"?On.json:($(v(t),"`outputEscape` need to be of type string or function"),t)}function we(t){let e=[];return I(t)&&(e=t),f(t)&&(e=[t]),e}function hi(t,e){let n=!1;for(let s=0;s<t.length;s++){let i=t[s];mi(i)&&(!n&&i.trimLeft&&ui(t[s-1],e.greedy),H(i)&&(i.name==="raw"?n=!0:i.name==="endraw"&&(n=!1)),!n&&i.trimRight&&di(t[s+1],e.greedy))}}function ui(t,e){if(!t||!Lt(t))return;let n=e?Q:kn;for(;g[t.input.charCodeAt(t.end-1-t.trimRight)]&n;)t.trimRight++}function di(t,e){if(!t||!Lt(t))return;let n=e?Q:kn;for(;g[t.input.charCodeAt(t.begin+t.trimLeft)]&n;)t.trimLeft++;t.input.charAt(t.begin+t.trimLeft)===`
`&&t.trimLeft++}var O=class{constructor(e,n=Y.operators,s,i){this.input=e,this.file=s,this.rawBeginAt=-1,this.p=i?i[0]:0,this.N=i?i[1]:e.length,this.opTrie=en(n),this.literalTrie=en(In)}readExpression(){return new rt(this.readExpressionTokens())}*readExpressionTokens(){for(;this.p<this.N;){let e=this.readOperator();if(e){yield e;continue}let n=this.readValue();if(n){yield n;continue}return}}readOperator(){this.skipBlank();let e=this.matchTrie(this.opTrie);if(e!==-1)return new Ge(this.input,this.p,this.p=e,this.file)}matchTrie(e){let n=e,s=this.p,i;for(;n[this.input[s]]&&s<this.N;)n=n[this.input[s++]],n.end&&(i=n);return!i||i.needBoundary&&me(this.peek(s-this.p))?-1:s}readFilteredValue(){let e=this.p,n=this.readExpression();this.assert(n.valid(),`invalid value expression: ${this.snapshot()}`);let s=this.readFilters();return new et(n,s,this.input,e,this.p,this.file)}readFilters(){let e=[];for(;;){let n=this.readFilter();if(!n)return e;e.push(n)}}readFilter(){if(this.skipBlank(),this.end())return null;this.assert(this.read()==="|",'expected "|" before filter');let e=this.readIdentifier();if(!e.size())return this.assert(this.end(),"expected filter name"),null;let n=[];if(this.skipBlank(),this.peek()===":")do{++this.p;let s=this.readFilterArg();s&&n.push(s),this.skipBlank(),this.assert(this.end()||this.peek()===","||this.peek()==="|",()=>`unexpected character ${this.snapshot()}`)}while(this.peek()===",");else if(!(this.peek()==="|"||this.end()))throw this.error('expected ":" after filter name');return new Te(e.getText(),n,this.input,e.begin,this.p,this.file)}readFilterArg(){let e=this.readValue();if(!e)return;if(this.skipBlank(),this.peek()!==":")return e;++this.p;let n=this.readValue();return[e.getText(),n]}readTopLevelTokens(e=Y){let n=[];for(;this.p<this.N;){let s=this.readTopLevelToken(e);n.push(s)}return hi(n,e),n}readTopLevelToken(e){let{tagDelimiterLeft:n,outputDelimiterLeft:s}=e;return this.rawBeginAt>-1?this.readEndrawOrRawContent(e):this.match(n)?this.readTagToken(e):this.match(s)?this.readOutputToken(e):this.readHTMLToken([n,s])}readHTMLToken(e){let n=this.p;for(;this.p<this.N&&!e.some(s=>this.match(s));)++this.p;return new Ie(this.input,n,this.p,this.file)}readTagToken(e){let{file:n,input:s}=this,i=this.p;if(this.readToDelimiter(e.tagDelimiterRight)===-1)throw this.error(`tag ${this.snapshot(i)} not closed`,i);let r=new ke(s,i,this.p,e,n);return r.name==="raw"&&(this.rawBeginAt=i),r}readToDelimiter(e,n=!1){for(this.skipBlank();this.p<this.N;){if(n&&this.peekType()&Zt){this.readQuoted();continue}if(++this.p,this.rmatch(e))return this.p}return-1}readOutputToken(e=Y){let{file:n,input:s}=this,{outputDelimiterRight:i}=e,r=this.p;if(this.readToDelimiter(i,!0)===-1)throw this.error(`output ${this.snapshot(r)} not closed`,r);return new qe(s,r,this.p,e,n)}readEndrawOrRawContent(e){let{tagDelimiterLeft:n,tagDelimiterRight:s}=e,i=this.p,r=this.readTo(n)-n.length;for(;this.p<this.N;){if(this.readIdentifier().getText()!=="endraw"){r=this.readTo(n)-n.length;continue}for(;this.p<=this.N;){if(this.rmatch(s)){let a=this.p;return i===r?(this.rawBeginAt=-1,new ke(this.input,i,a,e,this.file)):(this.p=r,new Ie(this.input,i,r,this.file))}if(this.rmatch(n))break;this.p++}}throw this.error(`raw ${this.snapshot(this.rawBeginAt)} not closed`,i)}readLiquidTagTokens(e=Y){let n=[];for(;this.p<this.N;){let s=this.readLiquidTagToken(e);s&&n.push(s)}return n}readLiquidTagToken(e){if(this.skipBlank(),this.end())return;let n=this.p;this.readToDelimiter(`
`);let s=this.p;return new Qe(this.input,n,s,e,this.file)}error(e,n=this.p){return new Le(e,new ne(this.input,n,this.N,this.file))}assert(e,n,s){if(!e)throw this.error(typeof n=="function"?n():n,s)}snapshot(e=this.p){return JSON.stringify(ds(this.input.slice(e,this.N),32))}readWord(){return this.readIdentifier()}readIdentifier(){this.skipBlank();let e=this.p;for(;!this.end()&&me(this.peek());)++this.p;return new ne(this.input,e,this.p,this.file)}readNonEmptyIdentifier(){let e=this.readIdentifier();return e.size()?e:void 0}readTagName(){return this.skipBlank(),this.input[this.p]==="#"?this.input.slice(this.p,++this.p):this.readIdentifier().getText()}readHashes(e){let n=[];for(;;){let s=this.readHash(e);if(!s)return n;n.push(s)}}readHash(e){this.skipBlank(),this.peek()===","&&++this.p;let n=this.p,s=this.readNonEmptyIdentifier();if(!s)return;let i;this.skipBlank();let r=f(e)?e:e?"=":":";return this.peek()===r&&(++this.p,i=this.readValue()),new He(this.input,n,this.p,s,i,this.file)}remaining(){return this.input.slice(this.p,this.N)}advance(e=1){this.p+=e}end(){return this.p>=this.N}read(){return this.input[this.p++]}readTo(e){for(;this.p<this.N;)if(++this.p,this.rmatch(e))return this.p;return-1}readValue(){this.skipBlank();let e=this.p,n=this.readLiteral()||this.readQuoted()||this.readRange()||this.readNumber(),s=this.readProperties(!n);return s.length?new $e(n,s,this.input,e,this.p):n}readScopeValue(){this.skipBlank();let e=this.p,n=this.readProperties();if(n.length)return new $e(void 0,n,this.input,e,this.p)}readProperties(e=!0){let n=[];for(;;){if(this.peek()==="["){this.p++;let s=this.readValue()||new ne(this.input,this.p,this.p,this.file);this.assert(this.readTo("]")!==-1,"[ not closed"),n.push(s);continue}if(e&&!n.length){let s=this.readNonEmptyIdentifier();if(s){n.push(s);continue}}if(this.peek()==="."&&this.peek(1)!=="."){this.p++;let s=this.readNonEmptyIdentifier();if(!s)break;n.push(s);continue}break}return n}readNumber(){this.skipBlank();let e=!1,n=!1,s=0;for(this.peekType()&ws&&s++;this.p+s<=this.N;)if(this.peekType(s)&gs)n=!0,s++;else if(this.peek(s)==="."&&this.peek(s+1)!=="."){if(e||!n)return;e=!0,s++}else break;if(n&&!me(this.peek(s))){let i=new Be(this.input,this.p,this.p+s,this.file);return this.advance(s),i}}readLiteral(){this.skipBlank();let e=this.matchTrie(this.literalTrie);if(e===-1)return;let n=new Ke(this.input,this.p,e,this.file);return this.p=e,n}readRange(){this.skipBlank();let e=this.p;if(this.peek()!=="(")return;++this.p;let n=this.readValueOrThrow();this.skipBlank(),this.assert(this.read()==="."&&this.read()===".","invalid range syntax");let s=this.readValueOrThrow();return this.skipBlank(),this.assert(this.read()===")","invalid range syntax"),new Ze(this.input,e,this.p,n,s,this.file)}readValueOrThrow(){let e=this.readValue();return this.assert(e,()=>`unexpected token ${this.snapshot()}, value expected`),e}readQuoted(){this.skipBlank();let e=this.p;if(!(this.peekType()&Zt))return;++this.p;let n=!1;for(;this.p<this.N&&(++this.p,!(this.input[this.p-1]===this.input[e]&&!n));)n?n=!1:this.input[this.p-1]==="\\"&&(n=!0);return new Ye(this.input,e,this.p,this.file)}*readFileNameTemplate(e){let{outputDelimiterLeft:n}=e,s=[","," ",n],i=new Set(s);for(;this.p<this.N&&!i.has(this.peek());)yield this.match(n)?this.readOutputToken(e):this.readHTMLToken(s)}match(e){for(let n=0;n<e.length;n++)if(e[n]!==this.input[this.p+n])return!1;return!0}rmatch(e){for(let n=0;n<e.length;n++)if(e[e.length-1-n]!==this.input[this.p-1-n])return!1;return!0}peekType(e=0){return this.p+e>=this.N?0:g[this.input.charCodeAt(this.p+e)]}peek(e=0){return this.p+e>=this.N?"":this.input[this.p+e]}skipBlank(){for(;this.peekType()&Q;)++this.p}},ot=class{constructor(e,n){this.handlers={},this.stopRequested=!1,this.tokens=e,this.parseToken=n}on(e,n){return this.handlers[e]=n,this}trigger(e,n){let s=this.handlers[e];return s?(s.call(this,n),!0):!1}start(){this.trigger("start");let e;for(;!this.stopRequested&&(e=this.tokens.shift());){if(this.trigger("token",e)||H(e)&&this.trigger(`tag:${e.name}`,e))continue;let n=this.parseToken(e,this.tokens);this.trigger("template",n)}return this.stopRequested||this.trigger("end"),this}stop(){return this.stopRequested=!0,this}},he=class{constructor(e){this.token=e}},y=class extends he{constructor(e,n,s){super(e),this.name=e.name,this.liquid=s,this.tokenizer=e.tokenizer}},X=class{constructor(e,n){this.hash={};let s=e instanceof O?e:new O(e,{});for(let i of s.readHashes(n))this.hash[i.name.content]=i.value}*render(e){let n={};for(let s of Object.keys(this.hash))n[s]=this.hash[s]===void 0?!0:yield x(this.hash[s],e);return n}};function fi(t){return class extends y{constructor(e,n,s){super(e,n,s),v(t.parse)&&t.parse.call(this,e,n)}*render(e,n){let s=yield new X(this.token.args,e.opts.keyValueSeparator).render(e);return yield t.render.call(this,e,n,s)}}}function Mn(t){return I(t)}var Se=class{constructor(e,n,s){this.token=e,this.name=e.name,this.handler=v(n)?n:v(n?.handler)?n.handler:vn,this.raw=!v(n)&&!!n?.raw,this.args=e.args,this.liquid=s}*render(e,n){let s=[];for(let i of this.args)Mn(i)?s.push([i[0],yield x(i[1],n)]):s.push(yield x(i,n));return yield this.handler.apply({context:n,token:this.token,liquid:this.liquid},[e,...s])}},T=class{constructor(e,n){this.filters=[];let s=typeof e=="string"?new O(e,n.options.operators).readFilteredValue():e;this.initial=s.initial,this.filters=s.filters.map(i=>new Se(i,this.getFilter(n,i.name),n))}*value(e,n){n=n||e.opts.lenientIf&&this.filters.length>0&&this.filters[0].name==="default";let s=yield this.initial.evaluate(e,n);for(let i of this.filters)s=yield i.render(s,e);return s}getFilter(e,n){let s=e.filters[n];return $(s||!e.options.strictFilters,()=>`undefined filter: ${n}`),s}},lt=class extends he{constructor(e,n){var s;super(e);let i=new O(e.input,n.options.operators,e.file,e.contentRange);this.value=new T(i.readFilteredValue(),n);let r=this.value.filters,a=n.options.outputEscape;if(!(!((s=r[r.length-1])===null||s===void 0)&&s.raw)&&a){let o=new Te(toString.call(a),[],"",0,0);r.push(new Se(o,a,n))}}*render(e,n){let s=yield this.value.value(e,!1);n.write(s)}*arguments(){yield this.value}},ct=class extends he{constructor(e){super(e),this.str=e.getContent()}*render(e,n){n.write(this.str)}},K=class t{constructor(e,n){this.segments=e,this.location=n}toString(){return Fe(this.segments,!0)}toArray(){function*e(...n){for(let s of n)s instanceof t?yield Array.from(e(...s.segments)):yield s}return Array.from(e(...this.segments))}},ie=class{constructor(){this.map=new Map}get(e){let n=Fe([e.segments[0]]);return this.map.has(n)||this.map.set(n,[]),this.map.get(n)}has(e){return this.map.has(Fe([e.segments[0]]))}push(e){this.get(e).push(e)}asObject(){return Object.fromEntries(this.map)}},En={partials:!0};function*jn(t,e,n){let s=new ie,i=new ie,r=new ie,a=new ze(new Set),o=new Set;function l(h,d){s.push(h);let m=d.alias(h);if(m!==void 0){let _=m.segments[0];f(_)&&!a.has(_)&&i.push(m)}else{let _=h.segments[0];f(_)&&!d.has(_)&&i.push(h)}for(let _ of h.segments)_ instanceof K&&l(_,d)}function*c(h,d){if(h.arguments)for(let m of h.arguments())for(let _ of cn(m))l(_,d);if(h.localScope)for(let m of h.localScope()){d.add(m.content),d.deleteAlias(m.content);let[_,te]=m.getPosition();r.push(new K([m.content],{row:_,col:te,file:m.file}))}if(h.children)if(h.partialScope){let m=h.partialScope();if(m===void 0){for(let P of yield h.children(e,n))yield c(P,d);return}if(o.has(m.name))return;let _=new Set,te=m.isolated?new ze(_):d.push(_);for(let P of m.scope)if(f(P))_.add(P);else{let[Jt,is]=P;_.add(Jt);let qt=Array.from(cn(is));qt.length&&te.setAlias(Jt,qt[0].segments)}for(let P of yield h.children(e,n))yield c(P,te),o.add(m.name);te.pop()}else{h.blockScope&&d.push(new Set(h.blockScope()));for(let m of yield h.children(e,n))yield c(m,d);h.blockScope&&d.pop()}}for(let h of t)yield c(h,a);return{variables:s.asObject(),globals:i.asObject(),locals:r.asObject()}}function W(t,e={}){let n=Object.assign(Object.assign({},En),e);return N(jn(t,n.partials,!1))}function V(t,e={}){let n=Object.assign(Object.assign({},En),e);return A(jn(t,n.partials,!0))}var ze=class{constructor(e){this.stack=[{names:e,aliases:new Map}]}has(e){for(let n of this.stack)if(n.names.has(e))return!0;return!1}push(e){return this.stack.push({names:e,aliases:new Map}),this}pop(){var e;return(e=this.stack.pop())===null||e===void 0?void 0:e.names}add(e){this.stack[0].names.add(e)}alias(e){let n=e.segments[0];if(!f(n))return;let s=this.getAlias(n);if(s!==void 0)return new K([...s,...e.segments.slice(1)],e.location)}setAlias(e,n){this.stack[this.stack.length-1].aliases.set(e,n)}deleteAlias(e){this.stack[this.stack.length-1].aliases.delete(e)}getAlias(e){for(let n of this.stack){if(n.aliases.has(e))return n.aliases.get(e);if(n.names.has(e))return}}};function*cn(t){S(t)?yield*Z(t):t instanceof T&&(yield*pi(t))}function*pi(t){for(let e of t.initial.postfix)S(e)&&(yield*Z(e));for(let e of t.filters)for(let n of e.args)Mn(n)&&n[1]?yield*Z(n[1]):S(n)&&(yield*Z(n))}function*Z(t){An(t)?(yield*Z(t.lhs),yield*Z(t.rhs)):Oe(t)&&(yield ht(t))}function ht(t){let e=[],n=t.file,s=t.props[0];n=n||s.file,dt(s)||un(s)||dn(s)?e.push(s.content):Oe(s)&&e.push(...ht(s).segments);for(let a of t.props.slice(1))n=n||a.file,dt(a)||un(a)||dn(a)?e.push(a.content):Oe(a)&&e.push(ht(a));let[i,r]=t.getPosition();return new K(e,{row:i,col:r,file:n})}var hn=/^[\u0080-\uFFFFa-zA-Z_][\u0080-\uFFFFa-zA-Z0-9_-]*$/;function Fe(t,e=!1){let n=[],s=t[0];f(s)&&(!e||s.match(hn)?n.push(`${s}`):n.push(`['${s}']`));for(let i of t.slice(1))i instanceof K?n.push(`[${Fe(i.segments)}]`):f(i)?i.match(hn)?n.push(`.${i}`):n.push(`['${i}']`):n.push(`[${i}]`);return n.join("")}var G;(function(t){t.Partials="partials",t.Layouts="layouts",t.Root="root"})(G||(G={}));var ut=class{constructor(e){if(this.options=e,e.relativeReference){let n=e.fs.sep;$(n,"`fs.sep` is required for relative reference");let s=new RegExp(["."+n,".."+n,"./","../"].map(i=>os(i)).join("|"));this.shouldLoadRelative=i=>s.test(i)}else this.shouldLoadRelative=n=>!1;this.contains=this.options.fs.contains||(()=>!0)}*lookup(e,n,s,i){let{fs:r}=this.options,a=this.options[n];for(let o of this.candidates(e,a,i,n!==G.Root))if(s?r.existsSync(o):yield r.exists(o))return o;throw this.lookupError(e,a)}*candidates(e,n,s,i){let{fs:r,extname:a}=this.options;if(this.shouldLoadRelative(e)&&s){let o=r.resolve(this.dirname(s),e,a);for(let l of n)if(!i||this.contains(l,o)){yield o;break}}for(let o of n){let l=r.resolve(o,e,a);(!i||this.contains(o,l))&&(yield l)}if(r.fallback!==void 0){let o=r.fallback(e);o!==void 0&&(yield o)}}dirname(e){let n=this.options.fs;return $(n.dirname,"`fs.dirname` is required for relative reference"),n.dirname(e)}lookupError(e,n){let s=new Error("ENOENT");return s.message=`ENOENT: Failed to lookup "${e}" in "${n}"`,s.code="ENOENT",s}},j=class{constructor(e){this.liquid=e,this.cache=this.liquid.options.cache,this.fs=this.liquid.options.fs,this.parseFile=this.cache?this._parseFileCached:this._parseFile,this.loader=new ut(this.liquid.options),this.parseLimit=new le("parse length",e.options.parseLimit)}parse(e,n){e=String(e),this.parseLimit.use(e.length);let i=new O(e,this.liquid.options.operators,n).readTopLevelTokens(this.liquid.options);return this.parseTokens(i)}parseTokens(e){let n,s=[],i=[];for(;n=e.shift();)try{s.push(this.parseToken(n,e))}catch(r){if(this.liquid.options.catchAllErrors)i.push(r);else throw r}if(i.length)throw new _e(i);return s}parseToken(e,n){try{if(H(e)){let s=this.liquid.tags[e.name];return $(s,`tag "${e.name}" not found`),new s(e,n,this.liquid,this)}return gi(e)?new lt(e,this.liquid):new ct(e)}catch(s){throw U.is(s)?s:new Ce(s,e)}}parseStream(e){return new ot(e,(n,s)=>this.parseToken(n,s))}*_parseFileCached(e,n,s=G.Root,i){let r=this.cache,a=this.loader.shouldLoadRelative(e)?i+","+e:s+":"+e,o=yield r.read(a);if(o)return o;let l=this._parseFile(e,n,s,i),c=n?yield l:N(l);r.write(a,c);try{return yield c}catch(h){throw r.remove(a),h}}*_parseFile(e,n,s=G.Root,i){let r=yield this.loader.lookup(e,s,n,i);return this.parse(n?this.fs.readFileSync(r):yield this.fs.readFile(r),r)}},w;(function(t){t[t.Number=1]="Number",t[t.Literal=2]="Literal",t[t.Tag=4]="Tag",t[t.Output=8]="Output",t[t.HTML=16]="HTML",t[t.Filter=32]="Filter",t[t.Hash=64]="Hash",t[t.PropertyAccess=128]="PropertyAccess",t[t.Word=256]="Word",t[t.Range=512]="Range",t[t.Quoted=1024]="Quoted",t[t.Operator=2048]="Operator",t[t.FilteredValue=4096]="FilteredValue",t[t.Delimited=12]="Delimited"})(w||(w={}));function mi(t){return!!(M(t)&w.Delimited)}function Nn(t){return M(t)===w.Operator}function Lt(t){return M(t)===w.HTML}function gi(t){return M(t)===w.Output}function H(t){return M(t)===w.Tag}function dt(t){return M(t)===w.Quoted}function un(t){return M(t)===w.Number}function Oe(t){return M(t)===w.PropertyAccess}function dn(t){return M(t)===w.Word}function An(t){return M(t)===w.Range}function S(t){return(M(t)&1667)>0}function M(t){return t?t.kind:-1}var J=class t{constructor(e={},n=Y,s={},{memoryLimit:i,renderLimit:r}={}){var a,o,l,c,h;this.scopes=[{}],this.registers={},this.breakCalled=!1,this.continueCalled=!1,this.sync=!!s.sync,this.opts=n,this.globals=(a=s.globals)!==null&&a!==void 0?a:n.globals,this.environments=Ee(e)?e:Object(e),this.strictVariables=(o=s.strictVariables)!==null&&o!==void 0?o:this.opts.strictVariables,this.ownPropertyOnly=(l=s.ownPropertyOnly)!==null&&l!==void 0?l:n.ownPropertyOnly,this.memoryLimit=i??new le("memory alloc",(c=s.memoryLimit)!==null&&c!==void 0?c:n.memoryLimit),this.renderLimit=r??new le("template render",zn().now()+((h=s.renderLimit)!==null&&h!==void 0?h:n.renderLimit))}getRegister(e){return this.registers[e]=this.registers[e]||{}}setRegister(e,n){return this.registers[e]=n}saveRegister(...e){return e.map(n=>[n,this.getRegister(n)])}restoreRegister(e){return e.forEach(([n,s])=>this.setRegister(n,s))}getAll(){return[this.globals,this.environments,...this.scopes].reduce((e,n)=>ve(e,n),{})}get(e){return this.getSync(e)}getSync(e){return A(this._get(e))}*_get(e){let n=this.findScope(e[0]);return yield this._getFromScope(n,e)}getFromScope(e,n){return A(this._getFromScope(e,n))}*_getFromScope(e,n,s=this.strictVariables){f(n)&&(n=n.split("."));for(let i=0;i<n.length;i++)if(e=yield wi(e,n[i],this.ownPropertyOnly),s&&ls(e))throw new Ve(n.slice(0,i+1).join("."));return e}push(e){return this.scopes.push(e)}pop(){return this.scopes.pop()}bottom(){return this.scopes[0]}spawn(e={}){return new t(e,this.opts,{sync:this.sync,globals:this.globals,strictVariables:this.strictVariables},{renderLimit:this.renderLimit,memoryLimit:this.memoryLimit})}findScope(e){for(let n=this.scopes.length-1;n>=0;n--){let s=this.scopes[n];if(e in s)return s}return e in this.environments?this.environments:this.globals}};function wi(t,e,n){if(t=wn(t),e=p(e),F(t))return t;if(I(t)&&e<0)return t[t.length+ +e];let s=yi(t,e,n);return s===void 0&&t instanceof C?t.liquidMethodMissing(e):v(s)?s.call(t):e==="size"?bi(t):e==="first"?_i(t):e==="last"?xi(t):s}function yi(t,e,n){if(!(n&&!Nt.call(t,e)&&!(t instanceof C)))return t[e]}function _i(t){return I(t)?t[0]:t.first}function xi(t){return I(t)?t[t.length-1]:t.last}function bi(t){if(Nt.call(t,"size")||t.size!==void 0)return t.size;if(I(t)||f(t))return t.length;if(typeof t=="object")return Object.keys(t).length}var B;(function(t){t[t.OUTPUT=0]="OUTPUT",t[t.STORE=1]="STORE"})(B||(B={}));var vi=z(Math.abs),ki=z(Math.max),Ii=z(Math.min),$i=z(Math.ceil),Ti=z((t,e,n=!1)=>n?Math.floor(t/e):t/e),Ri=z(Math.floor),Si=z((t,e)=>t-e),zi=z((t,e)=>t%e),Fi=z((t,e)=>t*e);function Oi(t,e=0){t=p(t),e=p(e);let n=Math.pow(10,e);return Math.round(t*n)/n}function Mi(t,e){return t=p(t),e=p(e),Number(t)+Number(e)}var Ei=Object.freeze({__proto__:null,abs:vi,at_least:ki,at_most:Ii,ceil:$i,divided_by:Ti,floor:Ri,minus:Si,modulo:zi,times:Fi,round:Oi,plus:Mi}),ji=t=>decodeURIComponent(u(t)).replace(/\+/g," "),Ni=t=>encodeURIComponent(u(t)).replace(/%20/g,"+"),Ai=t=>encodeURIComponent(u(t)).replace(/%20/g,"+").replace(/[!'()*]/g,e=>"%"+e.charCodeAt(0).toString(16).toUpperCase()),Li=t=>encodeURI(u(t)).replace(/%5B/g,"[").replace(/%5D/g,"]"),fn=/[^\p{M}\p{L}\p{Nd}]+/ug,Ci={raw:/\s+/g,default:fn,pretty:/[^\p{M}\p{L}\p{Nd}._~!$&'()+,;=@]+/ug,ascii:/[^A-Za-z0-9]+/g,latin:fn,none:null};function Ui(t,e="default",n=!1){t=u(t);let s=Ci[e];return s&&(e==="latin"&&(t=Wi(t)),t=t.replace(s,"-").replace(/^-|-$/g,"")),n?t:t.toLowerCase()}function Wi(t){return t.replace(/[àáâãäå]/g,"a").replace(/[æ]/g,"ae").replace(/[ç]/g,"c").replace(/[èéêë]/g,"e").replace(/[ìíîï]/g,"i").replace(/[ð]/g,"d").replace(/[ñ]/g,"n").replace(/[òóôõöø]/g,"o").replace(/[ùúûü]/g,"u").replace(/[ýÿ]/g,"y").replace(/[ß]/g,"ss").replace(/[œ]/g,"oe").replace(/[þ]/g,"th").replace(/[ẞ]/g,"SS").replace(/[Œ]/g,"OE").replace(/[Þ]/g,"TH")}var Vi=Object.freeze({__proto__:null,url_decode:ji,url_encode:Ni,cgi_escape:Ai,uri_escape:Li,slugify:Ui}),Di=z(function(t,e){let n=k(t),s=F(e)?" ":u(e),i=n.length*(1+s.length);return this.context.memoryLimit.use(i),n.join(s)}),Xi=z(t=>yn(t)?_n(t):""),Pi=z(t=>yn(t)?t[0]:""),Ji=z(function(t){let e=k(t);return this.context.memoryLimit.use(e.length),[...e].reverse()});function*qi(t,e){let n=[],s=k(t);this.context.memoryLimit.use(s.length);for(let i of s)n.push([i,e?yield this.context._getFromScope(i,u(e).split("."),!1):i]);return n.sort((i,r)=>{let a=i[1],o=r[1];return a<o?-1:a>o?1:0}).map(i=>i[0])}function Bi(t,e){let n=u(e),s=e===void 0?Ht:(r,a)=>Ht(r[n],a[n]),i=k(t);return this.context.memoryLimit.use(i.length),[...i].sort(s)}var Ki=t=>t&&t.length||0;function*Gi(t,e){let n=[],s=k(t);this.context.memoryLimit.use(s.length);for(let i of s)n.push(yield this.context._getFromScope(i,u(e),!1));return n}function*Hi(t,e){let n=0,s=k(t);for(let i of s){let r=Number(e?yield this.context._getFromScope(i,u(e),!1):i);n+=Number.isNaN(r)?0:r}return n}function Yi(t){let e=k(t);return this.context.memoryLimit.use(e.length),e.filter(n=>!F(p(n)))}function Ln(t,e=[]){let n=k(t),s=k(e);return this.context.memoryLimit.use(n.length+s.length),n.concat(s)}function Zi(t,e){return Ln.call(this,t,[e])}function Qi(t,e){let n=k(t);this.context.memoryLimit.use(n.length);let s=[...n];return s.unshift(e),s}function er(t){let e=[...k(t)];return e.pop(),e}function tr(t){let e=k(t);this.context.memoryLimit.use(e.length);let n=[...e];return n.shift(),n}function nr(t,e,n=1){return t=p(t),F(t)?[]:(I(t)||(t=u(t)),e=e<0?t.length+e:e,this.context.memoryLimit.use(n),t.slice(e,e+n))}function Cn(t){return this.context.opts.jekyllWhere?e=>ae.is(t)?L(e,t):I(e)?Vs(e,t):L(e,t):t===void 0?e=>q(e,this.context):e=>L(e,t)}function*Un(t,e,n,s){let i=[];e=k(e),this.context.memoryLimit.use(e.length);let r=new O(u(n)).readScopeValue();for(let o of e)i.push(yield x(r,this.context.spawn(o)));let a=Cn.call(this,s);return e.filter((o,l)=>a(i[l])===t)}function*Wn(t,e,n,s){let i=[],r=new T(u(s),this.liquid),a=k(e);this.context.memoryLimit.use(a.length);for(let o of a){this.context.push({[n]:o});let l=yield r.value(this.context);this.context.pop(),l===t&&i.push(o)}return i}function*sr(t,e,n){return yield*Un.call(this,!0,t,e,n)}function*ir(t,e,n){return yield*Un.call(this,!1,t,e,n)}function*rr(t,e,n){return yield*Wn.call(this,!0,t,e,n)}function*ar(t,e,n){return yield*Wn.call(this,!1,t,e,n)}function*or(t,e){let n=new Map;t=de(t);let s=new O(u(e)).readScopeValue();this.context.memoryLimit.use(t.length);for(let i of t){let r=yield x(s,this.context.spawn(i));n.has(r)||n.set(r,[]),n.get(r).push(i)}return[...n.entries()].map(([i,r])=>({name:i,items:r}))}function*lr(t,e,n){let s=new Map,i=new T(u(n),this.liquid);t=de(t),this.context.memoryLimit.use(t.length);for(let r of t){this.context.push({[e]:r});let a=yield i.value(this.context);this.context.pop(),s.has(a)||s.set(a,[]),s.get(a).push(r)}return[...s.entries()].map(([r,a])=>({name:r,items:a}))}function*Ct(t,e,n){let s=new O(u(e)).readScopeValue(),i=k(t),r=Cn.call(this,n);for(let a=0;a<i.length;a++){let o=yield x(s,this.context.spawn(i[a]));if(r(o))return[a,i[a]]}}function*Ut(t,e,n){let s=new T(u(n),this.liquid),i=k(t);for(let r=0;r<i.length;r++){this.context.push({[e]:i[r]});let a=yield s.value(this.context);if(this.context.pop(),a)return[r,i[r]]}}function*cr(t,e,n){return!!(yield*Ct.call(this,t,e,n))}function*hr(t,e,n){return!!(yield*Ut.call(this,t,e,n))}function*ur(t,e,n){let s=yield*Ct.call(this,t,e,n);return s?s[0]:void 0}function*dr(t,e,n){let s=yield*Ut.call(this,t,e,n);return s?s[0]:void 0}function*fr(t,e,n){let s=yield*Ct.call(this,t,e,n);return s?s[1]:void 0}function*pr(t,e,n){let s=yield*Ut.call(this,t,e,n);return s?s[1]:void 0}function mr(t){return t=k(t),this.context.memoryLimit.use(t.length),[...new Set(t)]}function gr(t,e=1){if(t=p(t),F(t))return[];I(t)||(t=u(t)),this.context.memoryLimit.use(e);let n=[...t].sort(()=>Math.random()-.5);return e===1?n[0]:n.slice(0,e)}var wr=Object.freeze({__proto__:null,join:Di,last:Xi,first:Pi,reverse:Ji,sort:qi,sort_natural:Bi,size:Ki,map:Gi,sum:Hi,compact:Yi,concat:Ln,push:Zi,unshift:Qi,pop:er,shift:tr,slice:nr,where:sr,reject:ir,where_exp:rr,reject_exp:ar,group_by:or,group_by_exp:lr,has:cr,has_exp:hr,find_index:ur,find_index_exp:dr,find:fr,find_exp:pr,uniq:mr,sample:gr});function Wt(t,e,n){var s,i,r;let a=((s=t?.length)!==null&&s!==void 0?s:0)+((i=e?.length)!==null&&i!==void 0?i:0)+((r=n?.length)!==null&&r!==void 0?r:0);this.context.memoryLimit.use(a);let o=Dn(t,this.context.opts,n);return o?(e=p(e),e=F(e)?this.context.opts.dateFormat:u(e),ge(o,e)):t}function yr(t){return Wt.call(this,t,"%Y-%m-%dT%H:%M:%S%:z")}function _r(t){return Wt.call(this,t,"%a, %d %b %Y %H:%M:%S %z")}function xr(t,e,n){return Vn.call(this,t,"%b",e,n)}function br(t,e,n){return Vn.call(this,t,"%B",e,n)}function Vn(t,e,n,s){let i=Dn(t,this.context.opts);if(!i)return t;if(n==="ordinal"){let r=i.getDate();return s==="US"?ge(i,`${e} ${r}%q, %Y`):ge(i,`${r}%q ${e} %Y`)}return ge(i,`%d ${e} %Y`)}function Dn(t,e,n){let s,i=n??e.timezoneOffset,r=e.locale;return t=p(t),t==="now"||t==="today"?s=new D(Date.now(),r,i):Me(t)?s=new D(t*1e3,r,i):f(t)?/^\d+$/.test(t)?s=new D(+t*1e3,r,i):e.preserveTimezones&&n===void 0?s=D.createDateFixedToTimezone(t,r):s=new D(t,r,i):s=new D(t,r,i),s.valid()?s:void 0}var vr=Object.freeze({__proto__:null,date:Wt,date_to_xmlschema:yr,date_to_rfc822:_r,date_to_string:xr,date_to_long_string:br}),Ae=/[\u4E00-\u9FFF\uF900-\uFAFF\u3400-\u4DBF\u3040-\u309F\u30A0-\u30FF\uAC00-\uD7AF]/gu,pn=/[^\u4E00-\u9FFF\uF900-\uFAFF\u3400-\u4DBF\u3040-\u309F\u30A0-\u30FF\uAC00-\uD7AF\s]+/gu;function kr(t,e){$(arguments.length===2,"append expect 2 arguments");let n=u(t),s=u(e);return this.context.memoryLimit.use(n.length+s.length),n+s}function Ir(t,e){$(arguments.length===2,"prepend expect 2 arguments");let n=u(t),s=u(e);return this.context.memoryLimit.use(n.length+s.length),s+n}function $r(t,e){let n=u(t);return this.context.memoryLimit.use(n.length),e?(e=At(u(e)),n.replace(new RegExp(`^[${e}]+`,"g"),"")):n.replace(/^\s+/,"")}function Tr(t){let e=u(t);return this.context.memoryLimit.use(e.length),e.toLowerCase()}function Rr(t){let e=u(t);return this.context.memoryLimit.use(e.length),u(e).toUpperCase()}function Sr(t,e){let n=u(t);return this.context.memoryLimit.use(n.length),n.split(u(e)).join("")}function zr(t,e){let n=u(t);return this.context.memoryLimit.use(n.length),n.replace(u(e),"")}function Fr(t,e){let n=u(t);this.context.memoryLimit.use(n.length);let s=u(e),i=n.lastIndexOf(s);return i===-1?n:n.substring(0,i)+n.substring(i+s.length)}function Or(t,e){return t=u(t),this.context.memoryLimit.use(t.length),e?(e=At(u(e)),t.replace(new RegExp(`[${e}]+$`,"g"),"")):t.replace(/\s+$/,"")}function Mr(t,e){let n=u(t);this.context.memoryLimit.use(n.length);let s=n.split(u(e));for(;s.length&&s[s.length-1]==="";)s.pop();return s}function Er(t,e){let n=u(t);return this.context.memoryLimit.use(n.length),e?(e=At(u(e)),n.replace(new RegExp(`^[${e}]+`,"g"),"").replace(new RegExp(`[${e}]+$`,"g"),"")):n.trim()}function jr(t){let e=u(t);return this.context.memoryLimit.use(e.length),e.replace(/\r?\n/gm,"")}function Nr(t){return t=u(t),this.context.memoryLimit.use(t.length),t.charAt(0).toUpperCase()+t.slice(1).toLowerCase()}function Ar(t,e,n){let s=u(t);return this.context.memoryLimit.use(s.length),s.split(u(e)).join(n)}function Lr(t,e,n){let s=u(t);return this.context.memoryLimit.use(s.length),s.replace(u(e),n)}function Cr(t,e,n){let s=u(t);this.context.memoryLimit.use(s.length);let i=u(e),r=s.lastIndexOf(i);if(r===-1)return s;let a=u(n);return s.substring(0,r)+a+s.substring(r+i.length)}function Ur(t,e=50,n="..."){let s=u(t);return this.context.memoryLimit.use(s.length),s.length<=e?t:s.substring(0,e-n.length)+n}function Wr(t,e=15,n="..."){let s=u(t);this.context.memoryLimit.use(s.length);let i=s.split(/\s+/);e<=0&&(e=1);let r=i.slice(0,e).join(" ");return i.length>=e&&(r+=n),r}function Vr(t){let e=u(t);return this.context.memoryLimit.use(e.length),e.replace(/\s+/g," ")}function Dr(t,e){let n=u(t);if(this.context.memoryLimit.use(n.length),t=n.trim(),!t)return 0;switch(e){case"cjk":return(t.match(Ae)||[]).length+(t.match(pn)||[]).length;case"auto":return Ae.test(t)?t.match(Ae).length+(t.match(pn)||[]).length:t.split(/\s+/).length;default:return t.split(/\s+/).length}}function Xr(t,e="and"){switch(this.context.memoryLimit.use(t.length),t.length){case 0:return"";case 1:return t[0];case 2:return`${t[0]} ${e} ${t[1]}`;default:return`${t.slice(0,-1).join(", ")}, ${e} ${t[t.length-1]}`}}var Pr=Object.freeze({__proto__:null,append:kr,prepend:Ir,lstrip:$r,downcase:Tr,upcase:Rr,remove:Sr,remove_first:zr,remove_last:Fr,rstrip:Or,split:Mr,strip:Er,strip_newlines:jr,capitalize:Nr,replace:Ar,replace_first:Lr,replace_last:Cr,truncate:Ur,truncatewords:Wr,normalize_whitespace:Vr,number_of_words:Dr,array_to_sentence_string:Xr}),Jr=Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},oi),Ei),Vi),wr),vr),Pr),On),ft=class extends y{constructor(e,n,s){super(e,n,s),this.identifier=this.tokenizer.readIdentifier(),this.key=this.identifier.content,this.tokenizer.assert(this.key,"expected variable name"),this.tokenizer.skipBlank(),this.tokenizer.assert(this.tokenizer.peek()==="=",'expected "="'),this.tokenizer.advance(),this.value=new T(this.tokenizer.readFilteredValue(),this.liquid)}*render(e){e.bottom()[this.key]=yield this.value.value(e,this.liquid.options.lenientIf)}*arguments(){yield this.value}*localScope(){yield this.identifier}},mn=["offset","limit","reversed"],pt=class extends y{constructor(e,n,s,i){super(e,n,s);let r=this.tokenizer.readIdentifier(),a=this.tokenizer.readIdentifier(),o=this.tokenizer.readValue();if(!r.size()||a.content!=="in"||!o)throw new Error(`illegal tag: ${e.getText()}`);this.variable=r.content,this.collection=o,this.hash=new X(this.tokenizer,s.options.keyValueSeparator),this.templates=[],this.elseTemplates=[];let l,c=i.parseStream(n).on("start",()=>l=this.templates).on("tag:else",h=>{xe(h.args),l=this.elseTemplates}).on("tag:endfor",h=>{xe(h.args),c.stop()}).on("template",h=>l.push(h)).on("end",()=>{throw new Error(`tag ${e.getText()} not closed`)});c.start()}*render(e,n){let s=this.liquid.renderer,i=de(yield x(this.collection,e));if(!i.length){yield s.renderTemplates(this.elseTemplates,e,n);return}let r="continue-"+this.variable+"-"+this.collection.getText();e.push({continue:e.getRegister(r)});let a=yield this.hash.render(e);e.pop(),i=(this.liquid.options.orderedFilterParameters?Object.keys(a).filter(c=>mn.includes(c)):mn.filter(c=>a[c]!==void 0)).reduce((c,h)=>h==="offset"?Br(c,a.offset):h==="limit"?Kr(c,a.limit):qr(c),i),e.setRegister(r,(a.offset||0)+i.length);let l={forloop:new oe(i.length,this.collection.getText(),this.variable)};e.push(l);for(let c of i){if(l[this.variable]=c,e.continueCalled=e.breakCalled=!1,yield s.renderTemplates(this.templates,e,n),e.breakCalled)break;l.forloop.next()}e.continueCalled=e.breakCalled=!1,e.pop()}*children(){let e=this.templates.slice();return this.elseTemplates&&e.push(...this.elseTemplates),e}*arguments(){yield this.collection;for(let e of Object.values(this.hash.hash))S(e)&&(yield e)}blockScope(){return[this.variable,"forloop"]}};function qr(t){return[...t].reverse()}function Br(t,e){return t.slice(e)}function Kr(t,e){return t.slice(0,e)}var mt=class extends y{constructor(e,n,s,i){for(super(e,n,s),this.templates=[],this.identifier=this.readVariable(),this.variable=this.identifier.content;n.length;){let r=n.shift();if(H(r)&&r.name==="endcapture")return;this.templates.push(i.parseToken(r,n))}throw new Error(`tag ${e.getText()} not closed`)}readVariable(){let e=this.tokenizer.readIdentifier();if(e.content||(e=this.tokenizer.readQuoted(),e))return e;throw this.tokenizer.error("invalid capture name")}*render(e){let s=yield this.liquid.renderer.renderTemplates(this.templates,e);e.bottom()[this.variable]=s}*children(){return this.templates}*localScope(){yield this.identifier}},gt=class extends y{constructor(e,n,s,i){super(e,n,s),this.branches=[],this.elseTemplates=[],this.value=new T(this.tokenizer.readFilteredValue(),this.liquid),this.elseTemplates=[];let r=[],a=0,o=i.parseStream(n).on("tag:when",l=>{if(a>0)return;r=[];let c=[];for(;!l.tokenizer.end();)c.push(l.tokenizer.readValueOrThrow()),l.tokenizer.skipBlank(),l.tokenizer.peek()===","?l.tokenizer.readTo(","):l.tokenizer.readTo("or");this.branches.push({values:c,templates:r})}).on("tag:else",()=>{a++,r=this.elseTemplates}).on("tag:endcase",()=>o.stop()).on("template",l=>{(r!==this.elseTemplates||a===1)&&r.push(l)}).on("end",()=>{throw new Error(`tag ${e.getText()} not closed`)});o.start()}*render(e,n){let s=this.liquid.renderer,i=p(yield this.value.value(e,e.opts.lenientIf)),r=!1;for(let a of this.branches)for(let o of a.values){let l=yield x(o,e,e.opts.lenientIf);if(L(i,l)){yield s.renderTemplates(a.templates,e,n),r=!0;break}}r||(yield s.renderTemplates(this.elseTemplates,e,n))}*arguments(){yield this.value,yield*this.branches.flatMap(e=>e.values)}*children(){let e=this.branches.flatMap(n=>n.templates);return this.elseTemplates&&e.push(...this.elseTemplates),e}},wt=class extends y{constructor(e,n,s){for(super(e,n,s);n.length;){let i=n.shift();if(H(i)&&i.name==="endcomment")return}throw new Error(`tag ${e.getText()} not closed`)}render(){}},yt=class extends y{constructor(e,n,s,i){super(e,n,s);let r=this.tokenizer;for(this.file=Vt(r,this.liquid,i),this.currentFile=e.file;!r.end();){r.skipBlank();let a=r.p,o=r.readIdentifier();if((o.content==="with"||o.content==="for")&&(r.skipBlank(),r.peek()!==":")){let l=r.readValue();if(l){let c=r.p,h=r.readIdentifier(),d;h.content==="as"?d=r.readIdentifier():r.p=c,this[o.content]={value:l,alias:d&&d.content},r.skipBlank(),r.peek()===","&&r.advance();continue}}r.p=a;break}this.hash=new X(r,s.options.keyValueSeparator)}*render(e,n){let{liquid:s,hash:i}=this,r=yield Dt(this.file,e,s);$(r,()=>`illegal file path "${r}"`);let a=e.spawn(),o=a.bottom();if(ve(o,yield i.render(e)),this.with){let{value:l,alias:c}=this.with;o[c||r]=yield x(l,e)}if(this.for){let{value:l,alias:c}=this.for,h=de(yield x(l,e));o.forloop=new oe(h.length,l.getText(),c);for(let d of h){o[c]=d;let m=yield s._parsePartialFile(r,a.sync,this.currentFile);yield s.renderer.renderTemplates(m,a,n),o.forloop.next()}}else{let l=yield s._parsePartialFile(r,a.sync,this.currentFile);yield s.renderer.renderTemplates(l,a,n)}}*children(e,n){return e&&f(this.file)?yield this.liquid._parsePartialFile(this.file,n,this.currentFile):[]}partialScope(){if(f(this.file)){let e=Object.keys(this.hash.hash);if(this.with){let{value:n,alias:s}=this.with;f(s)?e.push([s,n]):f(this.file)&&e.push([this.file,n])}if(this.for){let{value:n,alias:s}=this.for;f(s)?e.push([s,n]):f(this.file)&&e.push([this.file,n])}return{name:this.file,isolated:!0,scope:e}}}*arguments(){for(let e of Object.values(this.hash.hash))S(e)&&(yield e);if(this.with){let{value:e}=this.with;S(e)&&(yield e)}if(this.for){let{value:e}=this.for;S(e)&&(yield e)}}};function Vt(t,e,n){if(e.options.dynamicPartials){let r=t.readValue();if(t.assert(r,"illegal file path"),r.getText()==="none")return;if(dt(r)){let a=n.parse(As(r));return gn(a)}return r}let s=[...t.readFileNameTemplate(e.options)],i=gn(n.parseTokens(s));return i==="none"?void 0:i}function gn(t){return t.length===1&&Lt(t[0].token)?t[0].token.getContent():t}function*Dt(t,e,n){return typeof t=="string"?t:Array.isArray(t)?n.renderer.renderTemplates(t,e):yield x(t,e)}var _t=class extends y{constructor(e,n,s,i){super(e,n,s);let{tokenizer:r}=e;this.file=Vt(r,this.liquid,i),this.currentFile=e.file;let a=r.p;r.readIdentifier().content==="with"?(r.skipBlank(),r.peek()!==":"?this.withVar=r.readValue():r.p=a):r.p=a,this.hash=new X(r,s.options.jekyllInclude||s.options.keyValueSeparator)}*render(e,n){let{liquid:s,hash:i,withVar:r}=this,{renderer:a}=s,o=yield Dt(this.file,e,s);$(o,()=>`illegal file path "${o}"`);let l=e.saveRegister("blocks","blockMode");e.setRegister("blocks",{}),e.setRegister("blockMode",B.OUTPUT);let c=yield i.render(e);r&&(c[o]=yield x(r,e));let h=yield s._parsePartialFile(o,e.sync,this.currentFile);e.push(e.opts.jekyllInclude?{include:c}:c),yield a.renderTemplates(h,e,n),e.pop(),e.restoreRegister(l)}*children(e,n){return e&&f(this.file)?yield this.liquid._parsePartialFile(this.file,n,this.currentFile):[]}partialScope(){if(f(this.file)){let e;return this.liquid.options.jekyllInclude?e=["include"]:(e=Object.keys(this.hash.hash),this.withVar&&e.push([this.file,this.withVar])),{name:this.file,isolated:!1,scope:e}}}*arguments(){yield*Object.values(this.hash.hash).filter(S),S(this.file)&&(yield this.file),S(this.withVar)&&(yield this.withVar)}},xt=class extends y{constructor(e,n,s){super(e,n,s),this.identifier=this.tokenizer.readIdentifier(),this.variable=this.identifier.content}render(e,n){let s=e.environments;Me(s[this.variable])||(s[this.variable]=0),n.write(u(--s[this.variable]))}*localScope(){yield this.identifier}},bt=class extends y{constructor(e,n,s){super(e,n,s),this.candidates=[];let i=this.tokenizer.readValue();for(this.tokenizer.skipBlank(),i&&(this.tokenizer.peek()===":"?(this.group=i,this.tokenizer.advance()):this.candidates.push(i));!this.tokenizer.end();){let r=this.tokenizer.readValue();r&&this.candidates.push(r),this.tokenizer.readTo(",")}this.tokenizer.assert(this.candidates.length,()=>`empty candidates: "${e.getText()}"`)}*render(e,n){let i=`cycle:${yield x(this.group,e)}:`+this.candidates.join(","),r=e.getRegister("cycle"),a=r[i];a===void 0&&(a=r[i]=0);let o=this.candidates[a];return a=(a+1)%this.candidates.length,r[i]=a,yield x(o,e)}*arguments(){yield*this.candidates,this.group&&(yield this.group)}},vt=class extends y{constructor(e,n,s,i){super(e,n,s),this.branches=[];let r=[];i.parseStream(n).on("start",()=>this.branches.push({value:new T(e.tokenizer.readFilteredValue(),this.liquid),templates:r=[]})).on("tag:elsif",a=>{$(!this.elseTemplates,"unexpected elsif after else"),this.branches.push({value:new T(a.tokenizer.readFilteredValue(),this.liquid),templates:r=[]})}).on("tag:else",a=>{xe(a.args),$(!this.elseTemplates,"duplicated else"),r=this.elseTemplates=[]}).on("tag:endif",function(a){xe(a.args),this.stop()}).on("template",a=>r.push(a)).on("end",()=>{throw new Error(`tag ${e.getText()} not closed`)}).start()}*render(e,n){let s=this.liquid.renderer;for(let{value:i,templates:r}of this.branches){let a=yield i.value(e,e.opts.lenientIf);if(q(a,e)){yield s.renderTemplates(r,e,n);return}}yield s.renderTemplates(this.elseTemplates||[],e,n)}*children(){let e=this.branches.flatMap(n=>n.templates);return this.elseTemplates&&e.push(...this.elseTemplates),e}arguments(){return this.branches.map(e=>e.value)}},kt=class extends y{constructor(e,n,s){super(e,n,s),this.identifier=this.tokenizer.readIdentifier(),this.variable=this.identifier.content}render(e,n){let s=e.environments;Me(s[this.variable])||(s[this.variable]=0);let i=s[this.variable];s[this.variable]++,n.write(u(i))}*localScope(){yield this.identifier}},It=class extends y{constructor(e,n,s,i){super(e,n,s),this.file=Vt(this.tokenizer,this.liquid,i),this.currentFile=e.file,this.args=new X(this.tokenizer,s.options.keyValueSeparator),this.templates=i.parseTokens(n)}*render(e,n){let{liquid:s,args:i,file:r}=this,{renderer:a}=s;if(r===void 0){e.setRegister("blockMode",B.OUTPUT),yield a.renderTemplates(this.templates,e,n);return}let o=yield Dt(this.file,e,s);$(o,()=>`illegal file path "${o}"`);let l=yield s._parseLayoutFile(o,e.sync,this.currentFile);e.setRegister("blockMode",B.STORE);let c=yield a.renderTemplates(this.templates,e),h=e.getRegister("blocks");h[""]===void 0&&(h[""]=(d,m)=>m.write(c)),e.setRegister("blockMode",B.OUTPUT),e.push(yield i.render(e)),yield a.renderTemplates(l,e,n),e.pop()}*children(e){let n=this.templates.slice();return e&&f(this.file)&&n.push(...yield this.liquid._parsePartialFile(this.file,!0,this.currentFile)),n}*arguments(){for(let e of Object.values(this.args.hash))S(e)&&(yield e);S(this.file)&&(yield this.file)}partialScope(){if(f(this.file))return{name:this.file,isolated:!1,scope:Object.keys(this.args.hash)}}},$t=class extends y{constructor(e,n,s,i){super(e,n,s),this.templates=[];let r=/\w+/.exec(e.args);for(this.block=r?r[0]:"";n.length;){let a=n.shift();if(H(a)&&a.name==="endblock")return;let o=i.parseToken(a,n);this.templates.push(o)}throw new Error(`tag ${e.getText()} not closed`)}*render(e,n){let s=this.getBlockRender(e);e.getRegister("blockMode")===B.STORE?e.getRegister("blocks")[this.block]=s:yield s(new be,n)}getBlockRender(e){let{liquid:n,templates:s}=this,i=e.getRegister("blocks")[this.block],r=function*(a,o){e.push({block:a}),yield n.renderer.renderTemplates(s,e,o),e.pop()};return i?(a,o)=>i(new be(()=>r(a,o)),o):r}*children(){return this.templates}blockScope(){return["block"]}},Tt=class extends y{constructor(e,n,s){for(super(e,n,s),this.tokens=[];n.length;){let i=n.shift();if(H(i)&&i.name==="endraw")return;this.tokens.push(i)}throw new Error(`tag ${e.getText()} not closed`)}render(){return this.tokens.map(e=>e.getText()).join("")}},Rt=class extends oe{constructor(e,n,s,i){super(e,s,i),this.length=e,this.cols=n}row(){return Math.floor(this.i/this.cols)+1}col0(){return this.i%this.cols}col(){return this.col0()+1}col_first(){return this.col0()===0}col_last(){return this.col()===this.cols}},St=class extends y{constructor(e,n,s,i){super(e,n,s);let r=this.tokenizer.readIdentifier();this.tokenizer.skipBlank();let a=this.tokenizer.readIdentifier(),o=this.tokenizer.readValue();if(a.content!=="in"||!o)throw new Error(`illegal tag: ${e.getText()}`);this.variable=r.content,this.collection=o,this.args=new X(this.tokenizer,s.options.keyValueSeparator),this.templates=[];let l,c=i.parseStream(n).on("start",()=>l=this.templates).on("tag:endtablerow",()=>c.stop()).on("template",h=>l.push(h)).on("end",()=>{throw new Error(`tag ${e.getText()} not closed`)});c.start()}*render(e,n){let s=de(yield x(this.collection,e)),i=yield this.args.render(e),r=i.offset||0,a=i.limit===void 0?s.length:i.limit;s=s.slice(r,r+a);let o=i.cols||s.length,l=this.liquid.renderer,c=new Rt(s.length,o,this.collection.getText(),this.variable),h={tablerowloop:c};e.push(h);for(let d=0;d<s.length;d++,c.next())h[this.variable]=s[d],c.col0()===0&&(c.row()!==1&&n.write("</tr>"),n.write(`<tr class="row${c.row()}">`)),n.write(`<td class="col${c.col()}">`),yield l.renderTemplates(this.templates,e,n),n.write("</td>");s.length&&n.write("</tr>"),e.pop()}*children(){return this.templates}*arguments(){yield this.collection;for(let e of Object.values(this.args.hash))S(e)&&(yield e)}blockScope(){return[this.variable,"tablerowloop"]}},zt=class extends y{constructor(e,n,s,i){super(e,n,s),this.branches=[],this.elseTemplates=[];let r=[],a=0;i.parseStream(n).on("start",()=>this.branches.push({value:new T(e.tokenizer.readFilteredValue(),this.liquid),test:je,templates:r=[]})).on("tag:elsif",o=>{if(a>0){r=[];return}this.branches.push({value:new T(o.tokenizer.readFilteredValue(),this.liquid),test:q,templates:r=[]})}).on("tag:else",()=>{a++,r=this.elseTemplates}).on("tag:endunless",function(){this.stop()}).on("template",o=>{(r!==this.elseTemplates||a===1)&&r.push(o)}).on("end",()=>{throw new Error(`tag ${e.getText()} not closed`)}).start()}*render(e,n){let s=this.liquid.renderer;for(let{value:i,test:r,templates:a}of this.branches){let o=yield i.value(e,e.opts.lenientIf);if(r(o,e)){yield s.renderTemplates(a,e,n);return}}yield s.renderTemplates(this.elseTemplates,e,n)}*children(){let e=this.branches.flatMap(n=>n.templates);return this.elseTemplates&&e.push(...this.elseTemplates),e}arguments(){return this.branches.map(e=>e.value)}},Ft=class extends y{render(e,n){e.breakCalled=!0}},Ot=class extends y{render(e,n){e.continueCalled=!0}},Mt=class extends y{constructor(e,n,s){super(e,n,s),this.tokenizer.skipBlank(),this.tokenizer.end()||(this.value=new T(this.tokenizer.readFilteredValue(),this.liquid))}*render(e,n){if(!this.value)return;let s=yield this.value.value(e,!1);n.write(s)}*arguments(){this.value&&(yield this.value)}},Et=class extends y{constructor(e,n,s,i){super(e,n,s);let r=this.tokenizer.readLiquidTagTokens(this.liquid.options);this.templates=i.parseTokens(r)}*render(e,n){yield this.liquid.renderer.renderTemplates(this.templates,e,n)}*children(){return this.templates}},jt=class extends y{constructor(e,n,s){if(super(e,n,s),e.args.search(/\n\s*[^#\s]/g)!==-1)throw new Error("every line of an inline comment must start with a '#' character")}render(){}},Gr={assign:ft,for:pt,capture:mt,case:gt,comment:wt,include:_t,render:yt,decrement:xt,increment:kt,cycle:bt,if:vt,layout:It,block:$t,raw:Tt,tablerow:St,unless:zt,break:Ft,continue:Ot,echo:Mt,liquid:Et,"#":jt},ue=class t{constructor(e={}){this.renderer=new it,this.filters={},this.tags={},this.options=li(e),this.parser=new j(this),Gt(Gr,(n,s)=>this.registerTag(s,n)),Gt(Jr,(n,s)=>this.registerFilter(s,n))}parse(e,n){return new j(this).parse(e,n)}_render(e,n,s){let i=n instanceof J?n:new J(n,this.options,s);return this.renderer.renderTemplates(e,i)}render(e,n,s){return b(this,void 0,void 0,function*(){return N(this._render(e,n,Object.assign(Object.assign({},s),{sync:!1})))})}renderSync(e,n,s){return A(this._render(e,n,Object.assign(Object.assign({},s),{sync:!0})))}renderToNodeStream(e,n,s={}){let i=new J(n,this.options,s);return this.renderer.renderTemplatesToNodeStream(e,i)}_parseAndRender(e,n,s){let i=this.parse(e);return this._render(i,n,s)}parseAndRender(e,n,s){return b(this,void 0,void 0,function*(){return N(this._parseAndRender(e,n,Object.assign(Object.assign({},s),{sync:!1})))})}parseAndRenderSync(e,n,s){return A(this._parseAndRender(e,n,Object.assign(Object.assign({},s),{sync:!0})))}_parsePartialFile(e,n,s){return new j(this).parseFile(e,n,G.Partials,s)}_parseLayoutFile(e,n,s){return new j(this).parseFile(e,n,G.Layouts,s)}_parseFile(e,n,s,i){return new j(this).parseFile(e,n,s,i)}parseFile(e,n){return b(this,void 0,void 0,function*(){return N(new j(this).parseFile(e,!1,n))})}parseFileSync(e,n){return A(new j(this).parseFile(e,!0,n))}*_renderFile(e,n,s){let i=yield this._parseFile(e,s.sync,s.lookupType);return yield this._render(i,n,s)}renderFile(e,n,s){return b(this,void 0,void 0,function*(){return N(this._renderFile(e,n,Object.assign(Object.assign({},s),{sync:!1})))})}renderFileSync(e,n,s){return A(this._renderFile(e,n,Object.assign(Object.assign({},s),{sync:!0})))}renderFileToNodeStream(e,n,s){return b(this,void 0,void 0,function*(){let i=yield this.parseFile(e);return this.renderToNodeStream(i,n,s)})}_evalValue(e,n){let s=new T(e,this),i=n instanceof J?n:new J(n,this.options);return s.value(i)}evalValue(e,n){return b(this,void 0,void 0,function*(){return N(this._evalValue(e,n))})}evalValueSync(e,n){return A(this._evalValue(e,n))}registerFilter(e,n){this.filters[e]=n}registerTag(e,n){this.tags[e]=v(n)?n:fi(n)}plugin(e){return e.call(this,t)}express(){let e=this,n=!0;return function(s,i,r){if(n){n=!1;let a=we(this.root);e.options.root.unshift(...a),e.options.layouts.unshift(...a),e.options.partials.unshift(...a)}e.renderFile(s,i).then(a=>r(null,a),r)}}analyze(e,n={}){return b(this,void 0,void 0,function*(){return W(e,n)})}analyzeSync(e,n={}){return V(e,n)}parseAndAnalyze(e,n,s={}){return b(this,void 0,void 0,function*(){return W(this.parse(e,n),s)})}parseAndAnalyzeSync(e,n,s={}){return V(this.parse(e,n),s)}variables(e,n={}){return b(this,void 0,void 0,function*(){let s=yield W(f(e)?this.parse(e):e,n);return Object.keys(s.variables)})}variablesSync(e,n={}){let s=V(f(e)?this.parse(e):e,n);return Object.keys(s.variables)}fullVariables(e,n={}){return b(this,void 0,void 0,function*(){let s=yield W(f(e)?this.parse(e):e,n);return Array.from(new Set(Object.values(s.variables).flatMap(i=>i.map(r=>String(r)))))})}fullVariablesSync(e,n={}){let s=V(f(e)?this.parse(e):e,n);return Array.from(new Set(Object.values(s.variables).flatMap(i=>i.map(r=>String(r)))))}variableSegments(e,n={}){return b(this,void 0,void 0,function*(){let s=yield W(f(e)?this.parse(e):e,n);return Array.from(pe(Object.values(s.variables).flatMap(i=>i.map(r=>r.toArray()))))})}variableSegmentsSync(e,n={}){let s=V(f(e)?this.parse(e):e,n);return Array.from(pe(Object.values(s.variables).flatMap(i=>i.map(r=>r.toArray()))))}globalVariables(e,n={}){return b(this,void 0,void 0,function*(){let s=yield W(f(e)?this.parse(e):e,n);return Object.keys(s.globals)})}globalVariablesSync(e,n={}){let s=V(f(e)?this.parse(e):e,n);return Object.keys(s.globals)}globalFullVariables(e,n={}){return b(this,void 0,void 0,function*(){let s=yield W(f(e)?this.parse(e):e,n);return Array.from(new Set(Object.values(s.globals).flatMap(i=>i.map(r=>String(r)))))})}globalFullVariablesSync(e,n={}){let s=V(f(e)?this.parse(e):e,n);return Array.from(new Set(Object.values(s.globals).flatMap(i=>i.map(r=>String(r)))))}globalVariableSegments(e,n={}){return b(this,void 0,void 0,function*(){let s=yield W(f(e)?this.parse(e):e,n);return Array.from(pe(Object.values(s.globals).flatMap(i=>i.map(r=>r.toArray()))))})}globalVariableSegmentsSync(e,n={}){let s=V(f(e)?this.parse(e):e,n);return Array.from(pe(Object.values(s.globals).flatMap(i=>i.map(r=>r.toArray()))))}};var ee={transport:{polling_urls:["https://api.tfl.gov.uk/StopPoint/{{ bus_stop_1 }}/Arrivals","https://api.tfl.gov.uk/StopPoint/{{ bus_stop_2 }}/Arrivals","https://api1.raildata.org.uk/1010-live-departure-board-dep1_2/LDBWS/api/20220120/GetDepartureBoard/{{ station_crs }}?numRows=20","https://api1.raildata.org.uk/1010-live-departure-board-dep1_2/LDBWS/api/20220120/GetDepartureBoard/{{ second_station_crs }}?numRows=10"],polling_headers:"x-apikey={{ rail_api_key }}",defaults:{bus_stop_1:"490004972S",bus_stop_2:"490004972N",station_crs:"DMK",station_operators:"Thameslink, London Overground, Southeastern",second_station_crs:"EDW",rail_api_key:""},shared:`{%- comment -%}
  Shared by every view (TRMNL puts this in front of each one).
  Polling URLs, in order:
    IDX_0  TfL arrivals for the first bus stop
    IDX_1  TfL arrivals for the second bus stop (TfL answers 404 to several stops in one request)
    IDX_2  departure board for the main station (split by operator)
    IDX_3  departure board for the second station
{%- endcomment -%}

{%- assign settings = trmnl.plugin_settings.custom_fields_values -%}
{%- assign utc_offset = trmnl.user.utc_offset | default: 0 -%}
{%- assign now_s = "now" | date: "%s" | plus: 0 -%}
{%- assign now_local = now_s | plus: utc_offset | date: "%H:%M" -%}

{%- comment -%} TRMNL wraps a bare JSON array as { "data": [...] } {%- endcomment -%}
{%- assign no_arrivals = "" | split: "," -%}
{%- assign arrivals_1 = IDX_0.data | default: no_arrivals -%}
{%- assign arrivals_2 = IDX_1.data | default: no_arrivals -%}
{%- assign arrivals = arrivals_1 | concat: arrivals_2 | sort: "timeToStation" -%}
{%- assign stop_ids = settings.bus_stop_1 | append: "," | append: settings.bus_stop_2 | remove: " " | split: "," -%}
{%- assign main = IDX_2 -%}
{%- assign second = IDX_3 -%}
{%- assign operators = settings.station_operators | split: "," -%}

{%- comment -%}
  One bus stop: its name, then a row per route, "40  Aldgate / 2, 11, 23 min".
  Args: stop_arrivals, now_s, max_routes, times_per_route, hide_under_mins (drop buses you can't make).
{%- endcomment -%}
{% template bus_stop %}
{%- assign routes = stop_arrivals | map: "lineName" | uniq -%}
{%- assign first = stop_arrivals | first -%}
<span class="label label--underline">{{ first.stationName | default: "Bus stop" }}{% if first.platformName %} ({{ first.platformName }}){% endif %}</span>
{%- assign shown = 0 -%}
{%- for route in routes -%}
  {%- if shown >= max_routes -%}{%- break -%}{%- endif -%}
  {%- assign these = stop_arrivals | where: "lineName", route -%}
  {%- assign n = 0 -%}
  {%- capture times -%}
    {%- for a in these -%}
      {%- if n >= times_per_route -%}{%- break -%}{%- endif -%}
      {%- assign due_s = a.expectedArrival | date: "%s" | plus: 0 -%}
      {%- assign mins = due_s | minus: now_s | divided_by: 60 | floor -%}
      {%- if mins >= hide_under_mins -%}
        {%- if n > 0 %}, {% endif -%}{{ mins }}
        {%- assign n = n | plus: 1 -%}
      {%- endif -%}
    {%- endfor -%}
  {%- endcapture -%}
  {%- if n > 0 -%}
    <div class="flex flex--row flex--left flex--center-y gap--small bus">
      <span class="value value--xsmall route">{{ route }}</span>
      <span class="title title--small stretch" data-clamp="1">{{ these[0].destinationName }}</span>
      <span class="label one-line">{{ times }}\u2032</span>
    </div>
    {%- assign shown = shown | plus: 1 -%}
  {%- endif -%}
{%- endfor -%}
{%- if shown == 0 -%}
  <span class="description">No buses due</span>
{%- endif -%}
{% endtemplate %}

{%- comment -%}
  Both bus stops, first then second. Args as bus_stop, plus stop_ids and arrivals.
{%- endcomment -%}
{% template bus_stops %}
{%- for id in stop_ids -%}
  {%- assign stop_arrivals = arrivals | where: "naptanId", id -%}
  <div class="flex flex--col flex--left gap--xsmall stop">
    {% render "bus_stop", stop_arrivals: stop_arrivals, now_s: now_s, max_routes: max_routes, times_per_route: times_per_route, hide_under_mins: hide_under_mins %}
  </div>
{%- endfor -%}
{% endtemplate %}

{%- comment -%}
  Train rows. Args: services, max_trains, show_plat.
{%- endcomment -%}
{% template trains %}
{%- if services and services.size > 0 -%}
  <div class="trains">
    {%- for t in services limit: max_trains -%}
      {%- assign status = t.etd -%}
      {%- if t.isCancelled or status == "Cancelled" -%}{%- assign status = "Canc" -%}
      {%- elsif status == "Delayed" -%}{%- assign status = "Late" -%}{%- endif -%}
      <div class="train">
        <span class="label t-time">{{ t.std }}</span>
        <span class="label t-dest one-line">{{ t.destination[0].locationName | remove: " (London)" | remove: " (Kent)" }}</span>
        {%- if show_plat -%}<span class="label t-plat">{{ t.platform | default: "\u2013" }}</span>{%- endif -%}
        <span class="t-status">
          {%- comment -%} Blank when on time, so problems stand out {%- endcomment -%}
          {%- if status != "On time" -%}<span class="label label--inverted">{{ status }}</span>{%- endif -%}
        </span>
      </div>
    {%- endfor -%}
  </div>
{%- else -%}
  <span class="label">No departures listed</span>
{%- endif -%}
{% endtemplate %}

{%- comment -%}
  A station split into one block per operator (or one list if no operators are set).
  Args: board, operators, per_operator, show_plat.
{%- endcomment -%}
{% template station_by_operator %}
{%- if operators.size > 0 -%}
  {%- for op in operators -%}
    {%- assign op_name = op | strip -%}
    {%- assign services = board.trainServices | where: "operator", op_name -%}
    <div class="flex flex--col flex--left gap--xsmall">
      <span class="label label--inverted">{{ op_name }}</span>
      {% render "trains", services: services, max_trains: per_operator, show_plat: show_plat %}
    </div>
  {%- endfor -%}
{%- else -%}
  {% render "trains", services: board.trainServices, max_trains: per_operator, show_plat: show_plat %}
{%- endif -%}
{% endtemplate %}

<style>
  /* Inverted route number so it reads from across the room */
  .route { background: black; color: white; min-width: 2.6em; padding: 0 0.2em; text-align: center; }
  .stretch { flex: 1; min-width: 0; }
  .stop, .bus { width: 100%; }
  .one-line { display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .trains { width: 100%; }
  .train { display: flex; align-items: center; gap: 0.5em; padding: 0.15em 0; border-bottom: 1px dotted black; }
  .train .t-time { flex: 0 0 auto; }
  .train .t-dest { flex: 1; min-width: 0; }
  .train .t-plat { flex: 0 0 1.2em; text-align: center; }
  .train .t-status { flex: 0 0 3.3em; text-align: right; }
  .col-buses { flex: 0 0 30%; }
  .rail-grid > * { min-width: 0; }
  /* Box around the second station so it reads as separate from the main one */
  .second-station { border: 2px solid black; border-radius: 6px; padding: 0.3em 0.5em 0.4em; }
  .second-station .train:last-child { border-bottom: none; }
</style>
`,full:`<div class="layout layout--row layout--top layout--stretch-x">
  <div class="columns">
    <div class="column gap col-buses">
      <span class="title">Buses</span>
      {% render "bus_stops", stop_ids: stop_ids, arrivals: arrivals, now_s: now_s, max_routes: 4, times_per_route: 3, hide_under_mins: 1 %}
    </div>
    <div class="column gap--small">
      <span class="title">{{ main.locationName | default: settings.station_crs }}</span>
      {%- comment -%}
        Two-by-two grid: the main station's operators fill the first cells and the
        second station takes whatever cell is left, so the main station gets most of the room.
      {%- endcomment -%}
      <div class="grid grid--cols-2 gap--small rail-grid">
        {% render "station_by_operator", board: main, operators: operators, per_operator: 5, show_plat: true %}
        <div class="flex flex--col flex--left gap--xsmall second-station">
          <span class="label label--underline">{{ second.locationName | default: settings.second_station_crs }}</span>
          {% render "trains", services: second.trainServices, max_trains: 5, show_plat: true %}
        </div>
      </div>
    </div>
  </div>
</div>

<div class="title_bar">
  <span class="title">Departures</span>
  <span class="instance">Updated {{ now_local }}</span>
</div>
`},weather:{polling_urls:["https://api.open-meteo.com/v1/forecast?latitude={{ location | split: ',' | first | strip }}&longitude={{ location | split: ',' | last | strip }}&current=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,is_day&hourly=temperature_2m,precipitation_probability,precipitation,weather_code,wind_speed_10m,wind_direction_10m,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,wind_speed_10m_max,wind_direction_10m_dominant&forecast_hours=24&forecast_days=4&wind_speed_unit=mph&timezone=auto"],polling_headers:"",defaults:{location:"51.4660,-0.0880",place_name:"Denmark Hill"},shared:`{%- comment -%}
  Shared by every view (TRMNL puts this in front of each one).
  One polling URL (Open-Meteo), so its answer arrives at the top level:
  current, hourly (24 hours from this hour), daily (today and the next two days).
{%- endcomment -%}

{%- assign settings = trmnl.plugin_settings.custom_fields_values -%}
{%- assign place = settings.place_name | default: trmnl.plugin_settings.instance_name | default: "Weather" -%}
{%- assign utc_offset = trmnl.user.utc_offset | default: utc_offset_seconds | default: 0 -%}
{%- assign now_s = "now" | date: "%s" | plus: utc_offset -%}
{%- comment -%} No clock: the screen only redraws every refresh, so a time would always be stale {%- endcomment -%}
{%- assign today = now_s | date: "%A %-d %B" -%}
{%- assign today_short = now_s | date: "%a %-d %b" -%}
{%- assign night = false -%}{%- if current.is_day == 0 -%}{%- assign night = true -%}{%- endif -%}

{%- comment -%}
  When rain is due. "Wet" means at least 0.1 mm in the hour or a 50% chance.
  Raining now: say when it should stop. Dry now: say when it should start.
{%- endcomment -%}
{%- assign wet_now = false -%}
{%- assign code_now = current.weather_code | default: 0 -%}
{%- if current.precipitation >= 0.1 -%}{%- assign wet_now = true -%}{%- endif -%}
{%- if code_now >= 51 and code_now <= 67 -%}{%- assign wet_now = true -%}{%- endif -%}
{%- if code_now >= 80 -%}{%- assign wet_now = true -%}{%- endif -%}
{%- assign rain_hour = nil -%}
{%- assign rain_chance = 0 -%}
{%- assign last_hour = hourly.time.size | minus: 1 -%}
{%- for i in (1..last_hour) -%}
  {%- assign mm = hourly.precipitation[i] | default: 0 -%}
  {%- assign pc = hourly.precipitation_probability[i] | default: 0 -%}
  {%- assign wet = false -%}
  {%- if mm >= 0.1 or pc >= 50 -%}{%- assign wet = true -%}{%- endif -%}
  {%- if wet != wet_now -%}
    {%- assign rain_hour = hourly.time[i] | slice: 11, 5 -%}
    {%- assign rain_chance = pc -%}
    {%- break -%}
  {%- endif -%}
{%- endfor -%}
{%- if wet_now -%}
  {%- if rain_hour -%}{%- capture rain_text -%}Raining, dry from about {{ rain_hour }}{%- endcapture -%}
  {%- else -%}{%- assign rain_text = "Rain on and off all day" -%}{%- endif -%}
{%- elsif rain_hour -%}
  {%- capture rain_text -%}Rain from about {{ rain_hour }} ({{ rain_chance }}%){%- endcapture -%}
{%- else -%}
  {%- assign rain_text = "No rain in the next 24 hours" -%}
{%- endif -%}

{%- comment -%}
  A one-line summary of the next 12 hours, e.g. "Mild and windy, rain from 4pm (60%)":
  how warm it gets, how windy, then when rain starts or stops (or the sky, if dry).
{%- endcomment -%}
{%- assign win = 12 -%}{%- if win > last_hour -%}{%- assign win = last_hour -%}{%- endif -%}
{%- assign t_hi = hourly.temperature_2m[0] | default: current.temperature_2m | round -%}
{%- assign w_hi = current.wind_speed_10m | default: 0 -%}
{%- assign n_sun = 0 -%}{%- assign n_part = 0 -%}{%- assign n_cloud = 0 -%}{%- assign n_fog = 0 -%}
{%- for i in (0..win) -%}
  {%- assign t = hourly.temperature_2m[i] | default: t_hi | round -%}
  {%- if t > t_hi -%}{%- assign t_hi = t -%}{%- endif -%}
  {%- assign w = hourly.wind_speed_10m[i] | default: 0 -%}
  {%- if w > w_hi -%}{%- assign w_hi = w -%}{%- endif -%}
  {%- assign c = hourly.weather_code[i] | default: code_now -%}
  {%- if c <= 1 -%}{%- assign n_sun = n_sun | plus: 1 -%}
  {%- elsif c == 2 -%}{%- assign n_part = n_part | plus: 1 -%}
  {%- elsif c == 45 or c == 48 -%}{%- assign n_fog = n_fog | plus: 1 -%}
  {%- else -%}{%- assign n_cloud = n_cloud | plus: 1 -%}{%- endif -%}
{%- endfor -%}
{%- if t_hi <= 3 -%}{%- assign feel = "Very cold" -%}
{%- elsif t_hi <= 8 -%}{%- assign feel = "Cold" -%}
{%- elsif t_hi <= 12 -%}{%- assign feel = "Cool" -%}
{%- elsif t_hi <= 18 -%}{%- assign feel = "Mild" -%}
{%- elsif t_hi <= 23 -%}{%- assign feel = "Warm" -%}
{%- elsif t_hi <= 28 -%}{%- assign feel = "Very warm" -%}
{%- else -%}{%- assign feel = "Hot" -%}{%- endif -%}
{%- assign windy = "" -%}
{%- if w_hi >= 25 -%}{%- assign windy = " and very windy" -%}
{%- elsif w_hi >= 17 -%}{%- assign windy = " and windy" -%}
{%- elsif w_hi >= 11 -%}{%- assign windy = " and breezy" -%}{%- endif -%}
{%- if rain_hour -%}
  {%- assign rh = rain_hour | slice: 0, 2 | plus: 0 -%}
  {%- if rh == 0 -%}{%- assign rain_at = "midnight" -%}
  {%- elsif rh == 12 -%}{%- assign rain_at = "midday" -%}
  {%- elsif rh > 12 -%}{%- capture rain_at -%}{{ rh | minus: 12 }}pm{%- endcapture -%}
  {%- else -%}{%- capture rain_at -%}{{ rh }}am{%- endcapture -%}{%- endif -%}
{%- endif -%}
{%- if wet_now and rain_hour -%}{%- capture clause -%}rain until {{ rain_at }}{%- endcapture -%}
{%- elsif wet_now -%}{%- assign clause = "rain on and off" -%}
{%- elsif rain_hour -%}{%- capture clause -%}rain from {{ rain_at }}{% if rain_chance > 0 %} ({{ rain_chance }}%){% endif %}{%- endcapture -%}
{%- else -%}
  {%- assign sky = "cloudy" -%}{%- assign most = n_cloud -%}
  {%- if n_part > most -%}{%- assign sky = "sunny spells" -%}{%- assign most = n_part -%}{%- endif -%}
  {%- if n_sun > most -%}{%- assign sky = "sunny" -%}{%- assign most = n_sun -%}{%- endif -%}
  {%- if n_fog > most -%}{%- assign sky = "foggy" -%}{%- endif -%}
  {%- if night and sky == "sunny" -%}{%- assign sky = "clear" -%}{%- endif -%}
  {%- if night and sky == "sunny spells" -%}{%- assign sky = "partly cloudy" -%}{%- endif -%}
  {%- capture clause -%}{{ sky }} and dry{%- endcapture -%}
{%- endif -%}
{%- capture summary -%}{{ feel }}{{ windy }}, {{ clause }}{%- endcapture -%}

{%- comment -%}
  Weather icon drawn as SVG, so it needs no image hosting and stays sharp on e-ink.
  Args: code (WMO weather code), night (true to show a moon), size (px).
{%- endcomment -%}
{% template weather_icon %}
{%- assign k = "cloud" -%}
{%- case code -%}
  {%- when 0, 1 -%}{%- assign k = "sun" -%}
  {%- when 2 -%}{%- assign k = "part" -%}
  {%- when 3 -%}{%- assign k = "cloud" -%}
  {%- when 45, 48 -%}{%- assign k = "fog" -%}
  {%- when 51, 53, 55, 56, 57 -%}{%- assign k = "drizzle" -%}
  {%- when 61, 63, 65, 66, 67 -%}{%- assign k = "rain" -%}
  {%- when 71, 73, 75, 77, 85, 86 -%}{%- assign k = "snow" -%}
  {%- when 80, 81, 82 -%}{%- assign k = "showers" -%}
  {%- when 95, 96, 99 -%}{%- assign k = "storm" -%}
{%- endcase -%}
<svg class="wx-icon" viewBox="0 0 64 64" width="{{ size }}" height="{{ size }}" fill="white" stroke="black" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
  {%- if k == "sun" or k == "part" or k == "showers" -%}
    {%- if k == "sun" -%}{%- assign cx = 32 -%}{%- assign cy = 32 -%}{%- assign r = 12 -%}{%- assign ray = 20 -%}
    {%- else -%}{%- assign cx = 42 -%}{%- assign cy = 19 -%}{%- assign r = 9 -%}{%- assign ray = 15 -%}{%- endif -%}
    {%- if night -%}
      <path d="M{{ cx | plus: 2 }} {{ cy | minus: r | minus: 3 }} a{{ r | plus: 3 }} {{ r | plus: 3 }} 0 1 0 {{ r | plus: 5 }} {{ r | plus: 12 }} a{{ r }} {{ r }} 0 0 1 -{{ r | plus: 5 }} -{{ r | plus: 12 }}z" fill="black"/>
    {%- else -%}
      <g>
        {%- for a in (0..7) -%}
          {%- assign dx = "1,0.71,0,-0.71,-1,-0.71,0,0.71" | split: "," -%}
          {%- assign dy = "0,0.71,1,0.71,0,-0.71,-1,-0.71" | split: "," -%}
          {%- assign ix = dx[a] | times: 1.0 -%}{%- assign iy = dy[a] | times: 1.0 -%}
          {%- assign inner = r | plus: 4 -%}
          <line x1="{{ ix | times: inner | plus: cx }}" y1="{{ iy | times: inner | plus: cy }}" x2="{{ ix | times: ray | plus: cx }}" y2="{{ iy | times: ray | plus: cy }}"/>
        {%- endfor -%}
      </g>
      <circle cx="{{ cx }}" cy="{{ cy }}" r="{{ r }}" fill="black"/>
    {%- endif -%}
  {%- endif -%}
  {%- if k != "sun" and k != "fog" -%}
    {%- assign lift = -8 -%}{%- assign shift = 0 -%}
    {%- if k == "cloud" -%}{%- assign lift = 0 -%}{%- elsif k == "part" -%}{%- assign lift = 4 -%}{%- endif -%}
    {%- if k == "part" or k == "showers" -%}{%- assign shift = -6 -%}{%- endif -%}
    <path transform="translate({{ shift }} {{ lift }})" d="M18 50h30a10 10 0 0 0 1-20a14 14 0 0 0-27-4a12 12 0 0 0-4 24z"/>
  {%- endif -%}
  {%- case k -%}
    {%- when "rain", "showers" -%}
      <path d="M22 48l-3 9M32 48l-3 9M42 48l-3 9" stroke-width="4"/>
    {%- when "drizzle" -%}
      <path d="M23 50l-1 3M33 50l-1 3M43 50l-1 3M28 56l-1 3M38 56l-1 3" stroke-width="3.5"/>
    {%- when "snow" -%}
      <g fill="black" stroke="none"><circle cx="22" cy="51" r="2.6"/><circle cx="32" cy="55" r="2.6"/><circle cx="42" cy="51" r="2.6"/><circle cx="27" cy="59" r="2.6"/><circle cx="37" cy="59" r="2.6"/></g>
    {%- when "storm" -%}
      <path d="M34 40l-8 12h7l-4 10 11-14h-7l4-8z" fill="black" stroke-width="2"/>
    {%- when "fog" -%}
      <path d="M10 22h44M14 32h40M10 42h40M16 52h34"/>
  {%- endcase -%}
</svg>
{% endtemplate %}

{%- comment -%}
  Wind: an arrow pointing the way it's blowing, speed, where it's from, and gusts if given.
  Args: speed (mph), dir (degrees it comes from), gust (optional).
{%- endcomment -%}
{% template wind %}
{%- assign dir = dir | default: 0 -%}
{%- assign compass = "N,NE,E,SE,S,SW,W,NW" | split: "," -%}
{%- assign idx = dir | plus: 22.5 | divided_by: 45 | floor | modulo: 8 -%}
{%- assign toward = dir | plus: 180 | modulo: 360 -%}
<span class="label wx-wind"><svg class="wx-arrow" viewBox="0 0 20 20" width="1em" height="1em"><g transform="rotate({{ toward }} 10 10)"><path d="M10 2l6 14-6-4-6 4z" fill="black"/></g></svg> {{ speed | round }} mph {{ compass[idx] }}{% if gust %}, gusts {{ gust | round }}{% endif %}</span>
{% endtemplate %}

{%- comment -%} A few words for a WMO weather code. Args: code. {%- endcomment -%}
{% template weather_words %}
{%- case code -%}
  {%- when 0 -%}Clear
  {%- when 1 -%}Mostly clear
  {%- when 2 -%}Partly cloudy
  {%- when 3 -%}Cloudy
  {%- when 45, 48 -%}Fog
  {%- when 51, 53, 55 -%}Drizzle
  {%- when 56, 57 -%}Freezing drizzle
  {%- when 61 -%}Light rain
  {%- when 63 -%}Rain
  {%- when 65 -%}Heavy rain
  {%- when 66, 67 -%}Freezing rain
  {%- when 71, 73, 75, 77 -%}Snow
  {%- when 80 -%}Light showers
  {%- when 81, 82 -%}Heavy showers
  {%- when 85, 86 -%}Snow showers
  {%- when 95 -%}Thunderstorms
  {%- when 96, 99 -%}Thunder and hail
  {%- else -%}\u2013
{%- endcase -%}
{% endtemplate %}

{%- comment -%}
  Temperature line over expected-rain bars, one column per hour.
  Bar height is the expected rain in mm (labelled on the bar); the chance of rain is printed under each hour.
  The bar scale runs to 2 mm, or to the wettest hour if that's more.
  Args: hourly, hours (columns), w and h (drawing size), label_every (optional, 2 labels every other hour),
  wind_every (optional, wind arrow and mph every N hours; leave out for no wind row).
{%- endcomment -%}
{% template rain_temp_chart %}
{%- assign last = hours | minus: 1 -%}
{%- assign every = label_every | default: 1 -%}
{%- assign sorted = hourly.temperature_2m | slice: 0, hours | sort -%}
{%- assign t_min = sorted | first | floor | minus: 1 -%}
{%- assign t_max = sorted | last | ceil | plus: 1 -%}
{%- assign t_span = t_max | minus: t_min -%}
{%- comment -%} At least 8 degrees of range, so a one-degree change doesn't look like a plunge {%- endcomment -%}
{%- if t_span < 8 -%}{%- assign t_span = 8 -%}{%- endif -%}
{%- assign top = 30 -%}
{%- comment -%} An optional wind row (arrow and mph) goes under the chance-of-rain row {%- endcomment -%}
{%- assign wind_every = wind_every | default: 0 -%}
{%- if wind_every > 0 and hourly.wind_speed_10m -%}{%- assign axis = h | minus: 68 -%}{%- else -%}{%- assign wind_every = 0 -%}{%- assign axis = h | minus: 44 -%}{%- endif -%}
{%- assign ph = axis | minus: top | times: 1.0 -%}
{%- assign ph_half = ph | times: 0.5 -%}
{%- comment -%}
  The "plus: 0.001" before each divided_by keeps the division fractional: Liquid divides two
  whole numbers to a whole number, which flattened the line on the Cloudflare server.
{%- endcomment -%}
{%- assign colw = w | minus: 8 | plus: 0.001 | divided_by: hours -%}
{%- assign bar_w = colw | times: 0.6 | round: 1 -%}
{%- assign mm_sorted = hourly.precipitation | slice: 0, hours | sort -%}
{%- assign mm_max = mm_sorted | last | default: 0 -%}
{%- if mm_max < 2 -%}{%- assign mm_max = 2 -%}{%- endif -%}
{%- comment -%} Bars use up to 55% of the height, leaving the top for the temperature line {%- endcomment -%}
{%- assign bar_room = ph | times: 0.55 -%}
{%- capture points -%}
  {%- for i in (0..last) -%}
    {%- assign cx = i | plus: 0.5 | times: colw | plus: 4 | round: 1 -%}
    {%- comment -%} Temperatures use the top half, so the line rarely crosses the bars {%- endcomment -%}
    {%- comment -%} Plot the rounded value, so the line agrees with the labels {%- endcomment -%}
    {%- assign ty = hourly.temperature_2m[i] | round | minus: t_min | plus: 0.001 | divided_by: t_span | times: ph | times: 0.5 | plus: ph_half -%}
    {{ cx }},{{ axis | minus: ty | round: 1 }}{% unless forloop.last %} {% endunless %}
  {%- endfor -%}
{%- endcapture -%}
<svg class="wx-chart" viewBox="0 0 {{ w }} {{ h }}" width="100%" height="100%">
  <defs>
    <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="6" height="6" fill="white"/><rect width="3" height="6" fill="black"/>
    </pattern>
    <pattern id="night" width="6" height="6" patternUnits="userSpaceOnUse">
      <rect width="6" height="6" fill="white"/><rect width="1.5" height="1.5" fill="black"/><rect x="3" y="3" width="1.5" height="1.5" fill="black"/>
    </pattern>
  </defs>
  {%- comment -%} Night: a dotted background behind the hours after dark, with a moon where it starts {%- endcomment -%}
  {%- if hourly.is_day -%}
    {%- for i in (0..last) -%}
      {%- if hourly.is_day[i] == 0 -%}
        {%- assign nx = i | times: colw | plus: 4 | round: 1 -%}
        <rect x="{{ nx }}" y="0" width="{{ colw | plus: 0.5 | round: 1 }}" height="{{ axis }}" fill="url(#night)"/>
        {%- assign prev = i | minus: 1 -%}
        {%- if i == 0 or hourly.is_day[prev] == 1 -%}
          {%- assign mx = nx | plus: 4 -%}
          <g transform="translate({{ mx }} 4)"><circle cx="10" cy="10" r="9" fill="black" stroke="white" stroke-width="2"/><circle cx="15" cy="7" r="8" fill="white"/></g>
        {%- endif -%}
      {%- endif -%}
    {%- endfor -%}
  {%- endif -%}
  {%- for i in (0..last) -%}
    {%- assign cx = i | plus: 0.5 | times: colw | plus: 4 -%}
    {%- assign mm = hourly.precipitation[i] | default: 0 -%}
    {%- if mm >= 0.1 -%}
      {%- assign bh = mm | times: bar_room | plus: 0.001 | divided_by: mm_max | round: 1 -%}
      {%- if bh < 3 -%}{%- assign bh = 3 -%}{%- endif -%}
      <rect x="{{ cx | minus: bar_w | plus: cx | plus: 0.001 | divided_by: 2 | round: 1 }}" y="{{ axis | minus: bh }}" width="{{ bar_w }}" height="{{ bh }}" fill="url(#hatch)" stroke="black" stroke-width="1.5"/>
      {%- assign skip = i | modulo: every -%}
      {%- if skip == 0 -%}
      <text class="t-mm" x="{{ cx | round: 1 }}" y="{{ axis | minus: bh | minus: 5 }}" text-anchor="middle" stroke="white" stroke-width="4" paint-order="stroke">{{ mm | round: 1 }}</text>
      {%- endif -%}
    {%- endif -%}
  {%- endfor -%}
  <line x1="0" y1="{{ axis }}" x2="{{ w }}" y2="{{ axis }}" stroke="black" stroke-width="2"/>
  <polyline points="{{ points }}" fill="none" stroke="white" stroke-width="12" stroke-linejoin="round" stroke-linecap="round"/>
  <polyline points="{{ points }}" fill="none" stroke="black" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>
  {%- assign pts = points | split: " " -%}
  {%- for p in pts -%}
    {%- assign xy = p | split: "," -%}
    {%- assign i = forloop.index0 -%}
    {%- comment -%} Narrow layouts label every other hour so the numbers don't run together {%- endcomment -%}
    {%- assign skip = i | modulo: every -%}
    {%- if skip == 0 -%}
    <circle cx="{{ xy[0] }}" cy="{{ xy[1] }}" r="5.5" fill="black" stroke="white" stroke-width="2"/>
    <text class="t-temp" x="{{ xy[0] }}" y="{{ xy[1] | minus: 13 }}" text-anchor="middle" stroke="white" stroke-width="6" paint-order="stroke">{{ hourly.temperature_2m[i] | round }}\xB0</text>
    {%- endif -%}
    {%- if skip == 0 -%}
    <text class="t-hour" x="{{ xy[0] }}" y="{{ axis | plus: 21 }}" text-anchor="middle">{% if i == 0 %}Now{% else %}{{ hourly.time[i] | slice: 11, 2 }}{% endif %}</text>
    <text class="t-rain" x="{{ xy[0] }}" y="{{ axis | plus: 40 }}" text-anchor="middle">{{ hourly.precipitation_probability[i] | default: 0 }}%</text>
    {%- endif -%}
    {%- if wind_every > 0 -%}
      {%- assign wskip = i | modulo: wind_every -%}
      {%- if wskip == 0 -%}
        {%- assign toward = hourly.wind_direction_10m[i] | default: 0 | plus: 180 | modulo: 360 -%}
        <g transform="translate({{ xy[0] | minus: 10 }} {{ axis | plus: 57 }}) rotate({{ toward }})"><path d="M0 -8l6 13-6-4-6 4z" fill="black"/></g>
        <text class="t-wind" x="{{ xy[0] | minus: 1 }}" y="{{ axis | plus: 63 }}" text-anchor="start">{{ hourly.wind_speed_10m[i] | round }}</text>
      {%- endif -%}
    {%- endif -%}
  {%- endfor -%}
</svg>
{% endtemplate %}

{%- comment -%} Key for the chart. Args: short (true to leave out "Next 12 hours"). {%- endcomment -%}
{% template chart_key %}
<div class="flex flex--row flex--between w--full">
  {%- unless short -%}<span class="label">Next 12 hours</span>{%- endunless -%}
  <span class="label wx-nowrap"><span class="wx-key wx-key--light"></span>&nbsp;rain mm&nbsp;&nbsp;&nbsp;% chance&nbsp;&nbsp;&nbsp;<svg class="wx-arrow" viewBox="0 0 20 20" width="1em" height="1em"><path d="M10 2l6 14-6-4-6 4z" fill="black" transform="rotate(45 10 10)"/></svg>&nbsp;wind mph</span>
</div>
{% endtemplate %}

{%- comment -%}
  One day: name, icon, high and low, words, rain, wind.
  Args: daily, i, label, size, compact (true for short day name and no words, for narrow layouts).
{%- endcomment -%}
{% template day %}
{%- assign code = daily.weather_code[i] -%}
<div class="flex flex--row flex--left flex--center-y gap wx-day">
  {% render "weather_icon", code: code, night: false, size: size %}
  <div class="flex flex--col flex--left wx-day-text">
    <div class="flex flex--row flex--left flex--bottom gap--small">
      <span class="title title--small">{% if compact %}{{ daily.time[i] | date: "%a" }}{% elsif label %}{{ label }}{% else %}{{ daily.time[i] | date: "%A" }}{% endif %}</span>
      <span class="value value--xsmall">{{ daily.temperature_2m_max[i] | round }}\xB0</span><span class="label">/ {{ daily.temperature_2m_min[i] | round }}\xB0</span>
    </div>
    {%- unless compact -%}<span class="label" data-clamp="1">{% render "weather_words", code: code %}</span>{%- endunless -%}
    <span class="label">{% unless compact %}Rain {% endunless %}{{ daily.precipitation_probability_max[i] }}%{% if daily.precipitation_sum[i] >= 0.1 %} \xB7 {{ daily.precipitation_sum[i] | round: 1 }}mm{% endif %}</span>
    {%- if daily.wind_speed_10m_max -%}
      {% render "wind", speed: daily.wind_speed_10m_max[i], dir: daily.wind_direction_10m_dominant[i] %}
    {%- endif -%}
  </div>
</div>
{% endtemplate %}

<style>
  .wx-chart text { font-family: var(--font-small-font-family); fill: black; }
  .wx-chart .t-temp { font-family: var(--value-font-family); font-size: 21px; font-weight: 600; }
  .wx-chart .t-hour { font-family: var(--value-font-family); font-size: 19px; font-weight: 700; }
  .wx-chart .t-rain { font-size: 15px; }
  .wx-chart .t-mm { font-size: 16px; }
  .wx-chart .t-wind { font-size: 16px; }
  .wx-icon { flex: 0 0 auto; }
  .wx-day-text { min-width: 0; }
  .wx-days > .wx-day + .wx-day { border-top: 2px dotted black; padding-top: 0.5em; }
  /* The chart fills whatever room the layout leaves it */
  .chart-box { flex: 1 1 0; min-width: 0; min-height: 0; position: relative; align-self: stretch; }
  .chart-box > svg { position: absolute; inset: 0; }
  .wx-bottom { min-height: 0; }
  .wx-main { min-width: 0; min-height: 0; }
  .wx-days { border-left: 2px dotted black; padding-left: 1em; }
  .wx-nowrap { white-space: nowrap; }
  .wx-arrow { vertical-align: -0.15em; }
  .rain-note { white-space: nowrap; align-self: flex-start; }
  .wx-key { display: inline-block; width: 0.9em; height: 0.9em; border: 1.5px solid black; vertical-align: -0.1em; }
  .wx-key--light { background: repeating-linear-gradient(45deg, black 0 2px, white 2px 4px); }
</style>
`,full:`<div class="layout layout--row layout--left layout--stretch-y gap--large">
  <div class="flex flex--col flex--left gap stretch wx-main">
    <div class="flex flex--row flex--left flex--center-y gap--large w--full">
      {% render "weather_icon", code: current.weather_code, night: night, size: 110 %}
      <span class="value value--xxxlarge">{{ current.temperature_2m | round }}\xB0</span>
      <div class="flex flex--col flex--left gap--xsmall">
        <span class="label label--underline">{{ today }}</span>
        <span class="title title--large">{% render "weather_words", code: current.weather_code %}</span>
        <span class="label">Feels {{ current.apparent_temperature | round }}\xB0</span>
        {% render "wind", speed: current.wind_speed_10m, dir: current.wind_direction_10m, gust: current.wind_gusts_10m %}
        <span class="label">Today {{ daily.temperature_2m_max[0] | round }}\xB0 / {{ daily.temperature_2m_min[0] | round }}\xB0</span>
      </div>
    </div>
    <span class="label label--inverted rain-note">{{ summary }}</span>
    {% render "chart_key" %}
    <div class="chart-box">
      {% render "rain_temp_chart", hourly: hourly, hours: 13, w: 540, h: 222, wind_every: 2 %}
    </div>
  </div>
  <div class="flex flex--col flex--around flex--left wx-days">
    {% render "day", daily: daily, i: 1, label: "Tomorrow", size: 52 %}
    {% render "day", daily: daily, i: 2, label: nil, size: 52 %}
    {% render "day", daily: daily, i: 3, label: nil, size: 52 %}
  </div>
</div>

<div class="title_bar">
  <span class="title">Weather</span>
  <span class="instance">{{ place }}</span>
</div>
`},radar:{polling_urls:["https://api.rainviewer.com/public/weather-maps.json","https://api.open-meteo.com/v1/forecast?latitude={{ location | split: ',' | first | strip }}&longitude={{ location | split: ',' | last | strip }}&current=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,is_day&hourly=temperature_2m,precipitation_probability,precipitation,weather_code,wind_speed_10m&forecast_hours=12&wind_speed_unit=mph&timezone=auto"],polling_headers:"",defaults:{location:"51.4660,-0.0880",place_name:"Denmark Hill"},shared:`{%- comment -%}
  Rain radar screen. Polling URLs, in order:
    IDX_0  RainViewer's list of radar images (free, no key)
    IDX_1  Open-Meteo for temperature, wind and when rain is due
  The map is drawn in the browser: coastline and towns from the data below,
  radar tiles from RainViewer turned into black-and-white patterns for e-ink.
{%- endcomment -%}

{%- assign settings = trmnl.plugin_settings.custom_fields_values -%}
{%- assign place = settings.place_name | default: "Rain radar" -%}
{%- assign loc = settings.location | default: "51.4660,-0.0880" | split: "," -%}
{%- assign utc_offset = trmnl.user.utc_offset | default: IDX_1.utc_offset_seconds | default: 0 -%}
{%- assign now_s = "now" | date: "%s" | plus: utc_offset -%}
{%- assign today_short = now_s | date: "%a %-d %b" -%}
{%- assign frame = IDX_0.radar.past | last -%}
{%- assign current = IDX_1.current -%}
{%- assign hourly = IDX_1.hourly -%}
{%- assign night = false -%}{%- if current.is_day == 0 -%}{%- assign night = true -%}{%- endif -%}
{%- comment -%} An older radar image (about 30 minutes back) to see which way the rain is moving. {%- endcomment -%}
{%- assign back = IDX_0.radar.past.size | minus: 4 -%}{%- if back < 0 -%}{%- assign back = 0 -%}{%- endif -%}
{%- assign old_frame = IDX_0.radar.past[back] -%}
{%- if frame -%}{%- assign radar_time = frame.time | plus: utc_offset | date: "%H:%M" -%}{%- endif -%}

{%- comment -%} When rain is due, as on the weather screen: 0.1 mm or a 50% chance in an hour. {%- endcomment -%}
{%- assign wet_now = false -%}
{%- assign code_now = current.weather_code | default: 0 -%}
{%- if current.precipitation >= 0.1 -%}{%- assign wet_now = true -%}{%- endif -%}
{%- if code_now >= 51 and code_now <= 67 -%}{%- assign wet_now = true -%}{%- endif -%}
{%- if code_now >= 80 -%}{%- assign wet_now = true -%}{%- endif -%}
{%- assign rain_hour = nil -%}
{%- assign rain_chance = 0 -%}
{%- assign last_hour = hourly.time.size | minus: 1 -%}
{%- for i in (1..last_hour) -%}
  {%- assign mm = hourly.precipitation[i] | default: 0 -%}
  {%- assign pc = hourly.precipitation_probability[i] | default: 0 -%}
  {%- assign wet = false -%}
  {%- if mm >= 0.1 or pc >= 50 -%}{%- assign wet = true -%}{%- endif -%}
  {%- if wet != wet_now -%}{%- assign rain_hour = hourly.time[i] | slice: 11, 5 -%}{%- assign rain_chance = pc -%}{%- break -%}{%- endif -%}
{%- endfor -%}
{%- if wet_now -%}
  {%- if rain_hour -%}{%- capture rain_text -%}Forecast: dry from about {{ rain_hour }}{%- endcapture -%}
  {%- else -%}{%- assign rain_text = "Forecast: wet for the next 12 hours" -%}{%- endif -%}
{%- elsif rain_hour -%}
  {%- capture rain_text -%}Forecast: rain from about {{ rain_hour }}{%- endcapture -%}
{%- else -%}
  {%- assign rain_text = "Forecast: dry for the next 12 hours" -%}
{%- endif -%}

{%- comment -%}
  A one-line summary of the next 12 hours, e.g. "Mild and windy, rain from 4pm (60%)":
  how warm it gets, how windy, then when rain starts or stops (or the sky, if dry).
{%- endcomment -%}
{%- assign win = 12 -%}{%- if win > last_hour -%}{%- assign win = last_hour -%}{%- endif -%}
{%- assign t_hi = hourly.temperature_2m[0] | default: current.temperature_2m | round -%}
{%- assign w_hi = current.wind_speed_10m | default: 0 -%}
{%- assign n_sun = 0 -%}{%- assign n_part = 0 -%}{%- assign n_cloud = 0 -%}{%- assign n_fog = 0 -%}
{%- for i in (0..win) -%}
  {%- assign t = hourly.temperature_2m[i] | default: t_hi | round -%}
  {%- if t > t_hi -%}{%- assign t_hi = t -%}{%- endif -%}
  {%- assign w = hourly.wind_speed_10m[i] | default: 0 -%}
  {%- if w > w_hi -%}{%- assign w_hi = w -%}{%- endif -%}
  {%- assign c = hourly.weather_code[i] | default: code_now -%}
  {%- if c <= 1 -%}{%- assign n_sun = n_sun | plus: 1 -%}
  {%- elsif c == 2 -%}{%- assign n_part = n_part | plus: 1 -%}
  {%- elsif c == 45 or c == 48 -%}{%- assign n_fog = n_fog | plus: 1 -%}
  {%- else -%}{%- assign n_cloud = n_cloud | plus: 1 -%}{%- endif -%}
{%- endfor -%}
{%- if t_hi <= 3 -%}{%- assign feel = "Very cold" -%}
{%- elsif t_hi <= 8 -%}{%- assign feel = "Cold" -%}
{%- elsif t_hi <= 12 -%}{%- assign feel = "Cool" -%}
{%- elsif t_hi <= 18 -%}{%- assign feel = "Mild" -%}
{%- elsif t_hi <= 23 -%}{%- assign feel = "Warm" -%}
{%- elsif t_hi <= 28 -%}{%- assign feel = "Very warm" -%}
{%- else -%}{%- assign feel = "Hot" -%}{%- endif -%}
{%- assign windy = "" -%}
{%- if w_hi >= 25 -%}{%- assign windy = " and very windy" -%}
{%- elsif w_hi >= 17 -%}{%- assign windy = " and windy" -%}
{%- elsif w_hi >= 11 -%}{%- assign windy = " and breezy" -%}{%- endif -%}
{%- if rain_hour -%}
  {%- assign rh = rain_hour | slice: 0, 2 | plus: 0 -%}
  {%- if rh == 0 -%}{%- assign rain_at = "midnight" -%}
  {%- elsif rh == 12 -%}{%- assign rain_at = "midday" -%}
  {%- elsif rh > 12 -%}{%- capture rain_at -%}{{ rh | minus: 12 }}pm{%- endcapture -%}
  {%- else -%}{%- capture rain_at -%}{{ rh }}am{%- endcapture -%}{%- endif -%}
{%- endif -%}
{%- if wet_now and rain_hour -%}{%- capture clause -%}rain until {{ rain_at }}{%- endcapture -%}
{%- elsif wet_now -%}{%- assign clause = "rain on and off" -%}
{%- elsif rain_hour -%}{%- capture clause -%}rain from {{ rain_at }}{% if rain_chance > 0 %} ({{ rain_chance }}%){% endif %}{%- endcapture -%}
{%- else -%}
  {%- assign sky = "cloudy" -%}{%- assign most = n_cloud -%}
  {%- if n_part > most -%}{%- assign sky = "sunny spells" -%}{%- assign most = n_part -%}{%- endif -%}
  {%- if n_sun > most -%}{%- assign sky = "sunny" -%}{%- assign most = n_sun -%}{%- endif -%}
  {%- if n_fog > most -%}{%- assign sky = "foggy" -%}{%- endif -%}
  {%- if night and sky == "sunny" -%}{%- assign sky = "clear" -%}{%- endif -%}
  {%- if night and sky == "sunny spells" -%}{%- assign sky = "partly cloudy" -%}{%- endif -%}
  {%- capture clause -%}{{ sky }} and dry{%- endcapture -%}
{%- endif -%}
{%- capture summary -%}{{ feel }}{{ windy }}, {{ clause }}{%- endcapture -%}

{%- comment -%} Wind: arrow pointing the way it blows, speed, where it's from, gusts. Args: speed, dir, gust. {%- endcomment -%}
{% template wind %}
{%- assign dir = dir | default: 0 -%}
{%- assign compass = "N,NE,E,SE,S,SW,W,NW" | split: "," -%}
{%- assign idx = dir | plus: 22.5 | divided_by: 45 | floor | modulo: 8 -%}
{%- assign toward = dir | plus: 180 | modulo: 360 -%}
<span class="label"><svg class="wx-arrow" viewBox="0 0 20 20" width="1em" height="1em"><g transform="rotate({{ toward }} 10 10)"><path d="M10 2l6 14-6-4-6 4z" fill="black"/></g></svg> {{ speed | round }} mph {{ compass[idx] }}{% if gust %}, gusts {{ gust | round }}{% endif %}</span>
{% endtemplate %}

{%- comment -%}
  Weather icon drawn as SVG, so it needs no image hosting and stays sharp on e-ink.
  Args: code (WMO weather code), night (true to show a moon), size (px).
{%- endcomment -%}
{% template weather_icon %}
{%- assign k = "cloud" -%}
{%- case code -%}
  {%- when 0, 1 -%}{%- assign k = "sun" -%}
  {%- when 2 -%}{%- assign k = "part" -%}
  {%- when 3 -%}{%- assign k = "cloud" -%}
  {%- when 45, 48 -%}{%- assign k = "fog" -%}
  {%- when 51, 53, 55, 56, 57 -%}{%- assign k = "drizzle" -%}
  {%- when 61, 63, 65, 66, 67 -%}{%- assign k = "rain" -%}
  {%- when 71, 73, 75, 77, 85, 86 -%}{%- assign k = "snow" -%}
  {%- when 80, 81, 82 -%}{%- assign k = "showers" -%}
  {%- when 95, 96, 99 -%}{%- assign k = "storm" -%}
{%- endcase -%}
<svg class="wx-icon" viewBox="0 0 64 64" width="{{ size }}" height="{{ size }}" fill="white" stroke="black" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
  {%- if k == "sun" or k == "part" or k == "showers" -%}
    {%- if k == "sun" -%}{%- assign cx = 32 -%}{%- assign cy = 32 -%}{%- assign r = 12 -%}{%- assign ray = 20 -%}
    {%- else -%}{%- assign cx = 42 -%}{%- assign cy = 19 -%}{%- assign r = 9 -%}{%- assign ray = 15 -%}{%- endif -%}
    {%- if night -%}
      <path d="M{{ cx | plus: 2 }} {{ cy | minus: r | minus: 3 }} a{{ r | plus: 3 }} {{ r | plus: 3 }} 0 1 0 {{ r | plus: 5 }} {{ r | plus: 12 }} a{{ r }} {{ r }} 0 0 1 -{{ r | plus: 5 }} -{{ r | plus: 12 }}z" fill="black"/>
    {%- else -%}
      <g>
        {%- for a in (0..7) -%}
          {%- assign dx = "1,0.71,0,-0.71,-1,-0.71,0,0.71" | split: "," -%}
          {%- assign dy = "0,0.71,1,0.71,0,-0.71,-1,-0.71" | split: "," -%}
          {%- assign ix = dx[a] | times: 1.0 -%}{%- assign iy = dy[a] | times: 1.0 -%}
          {%- assign inner = r | plus: 4 -%}
          <line x1="{{ ix | times: inner | plus: cx }}" y1="{{ iy | times: inner | plus: cy }}" x2="{{ ix | times: ray | plus: cx }}" y2="{{ iy | times: ray | plus: cy }}"/>
        {%- endfor -%}
      </g>
      <circle cx="{{ cx }}" cy="{{ cy }}" r="{{ r }}" fill="black"/>
    {%- endif -%}
  {%- endif -%}
  {%- if k != "sun" and k != "fog" -%}
    {%- assign lift = -8 -%}{%- assign shift = 0 -%}
    {%- if k == "cloud" -%}{%- assign lift = 0 -%}{%- elsif k == "part" -%}{%- assign lift = 4 -%}{%- endif -%}
    {%- if k == "part" or k == "showers" -%}{%- assign shift = -6 -%}{%- endif -%}
    <path transform="translate({{ shift }} {{ lift }})" d="M18 50h30a10 10 0 0 0 1-20a14 14 0 0 0-27-4a12 12 0 0 0-4 24z"/>
  {%- endif -%}
  {%- case k -%}
    {%- when "rain", "showers" -%}
      <path d="M22 48l-3 9M32 48l-3 9M42 48l-3 9" stroke-width="4"/>
    {%- when "drizzle" -%}
      <path d="M23 50l-1 3M33 50l-1 3M43 50l-1 3M28 56l-1 3M38 56l-1 3" stroke-width="3.5"/>
    {%- when "snow" -%}
      <g fill="black" stroke="none"><circle cx="22" cy="51" r="2.6"/><circle cx="32" cy="55" r="2.6"/><circle cx="42" cy="51" r="2.6"/><circle cx="27" cy="59" r="2.6"/><circle cx="37" cy="59" r="2.6"/></g>
    {%- when "storm" -%}
      <path d="M34 40l-8 12h7l-4 10 11-14h-7l4-8z" fill="black" stroke-width="2"/>
    {%- when "fog" -%}
      <path d="M10 22h44M14 32h40M10 42h40M16 52h34"/>
  {%- endcase -%}
</svg>
{% endtemplate %}

{%- comment -%} One key entry. Args: level (1 light, 2 moderate, 3 heavy), text. {%- endcomment -%}
{% template key %}
<div class="flex flex--row flex--left flex--center-y gap--small"><span class="rr-key rr-key--{{ level }}"></span><span class="label">{{ text }}</span></div>
{% endtemplate %}

<style>
  .rr-map { position: relative; flex: 0 0 560px; height: 392px; border: 2px solid black; overflow: hidden; }
  .rr-map > * { position: absolute; left: 0; top: 0; }
  .rr-map text { font-family: var(--font-small-font-family); fill: black; paint-order: stroke; stroke: white; stroke-width: 4px; }
  .rr-map .town { font-size: 15px; }
  .rr-map .home { font-size: 20px; font-weight: 700; }
  .rr-side { min-width: 0; }
  .rr-key { display: inline-block; width: 30px; height: 20px; border: 1.5px solid black; }
  .rr-key--1 { background: radial-gradient(black 0.8px, transparent 1.1px) 0 0 / 3px 3px, white; }
  .rr-key--2 { background: repeating-linear-gradient(0deg, black 0 2px, transparent 2px 5px), repeating-linear-gradient(90deg, black 0 2px, white 2px 5px); }
  .rr-key--3 { background: black; }
  .wx-arrow { vertical-align: -0.15em; }
</style>

<script type="application/json" id="rr-land">[[[-3.6,53.2],[2.8,53.2],[2.8,50],[-2.914,50],[1.222,50],[1.262,50.008],[1.391,50.075],[1.456,50.124],[1.489,50.185],[1.521,50.215],[1.557,50.217],[1.654,50.187],[1.665,50.187],[1.672,50.192],[1.672,50.199],[1.654,50.2],[1.643,50.212],[1.665,50.212],[1.665,50.221],[1.625,50.224],[1.611,50.232],[1.593,50.256],[1.55,50.27],[1.543,50.278],[1.543,50.31],[1.55,50.349],[1.571,50.376],[1.611,50.371],[1.611,50.378],[1.553,50.405],[1.553,50.411],[1.575,50.445],[1.579,50.533],[1.611,50.548],[1.582,50.575],[1.575,50.636],[1.564,50.678],[1.568,50.717],[1.6,50.771],[1.607,50.79],[1.582,50.85],[1.582,50.869],[1.615,50.884],[1.654,50.889],[1.697,50.926],[1.73,50.943],[1.921,50.997],[1.939,50.994],[1.975,51.007],[2.133,51.019],[2.306,51.055],[2.317,51.06],[2.385,51.055],[2.468,51.068],[2.507,51.08],[2.543,51.097],[2.579,51.105],[2.716,51.17],[2.8,51.247],[2.8,53.2],[-3.6,53.2]],[[-3.325,53.2],[0.344,53.2],[0.355,53.189],[0.358,53.145],[0.337,53.093],[0.329,53.086],[0.283,53.074],[0.193,53.02],[0.16,53.008],[0.081,52.939],[0.059,52.926],[0.023,52.912],[0.009,52.899],[0.009,52.887],[0.041,52.885],[0.092,52.892],[0.106,52.89],[0.171,52.861],[0.221,52.814],[0.247,52.796],[0.265,52.804],[0.326,52.802],[0.34,52.797],[0.369,52.774],[0.383,52.769],[0.38,52.791],[0.398,52.809],[0.427,52.828],[0.437,52.841],[0.455,52.892],[0.484,52.934],[0.52,52.956],[0.571,52.97],[0.625,52.976],[0.671,52.975],[0.664,52.981],[0.686,52.986],[0.751,52.975],[0.837,52.975],[0.877,52.968],[0.92,52.954],[0.97,52.948],[1.013,52.959],[0.992,52.968],[0.967,52.968],[0.967,52.975],[1.276,52.929],[1.395,52.892],[1.643,52.775],[1.672,52.755],[1.697,52.731],[1.715,52.684],[1.748,52.625],[1.741,52.603],[1.748,52.588],[1.748,52.532],[1.769,52.487],[1.766,52.476],[1.755,52.468],[1.73,52.416],[1.726,52.397],[1.683,52.325],[1.629,52.27],[1.633,52.2],[1.582,52.081],[1.503,52.061],[1.489,52.049],[1.471,52.056],[1.463,52.036],[1.456,52.029],[1.424,52.002],[1.355,51.955],[1.345,51.943],[1.334,51.94],[1.265,51.994],[1.237,52],[1.186,52.026],[1.157,52.029],[1.157,52.022],[1.193,52],[1.215,51.992],[1.269,51.982],[1.276,51.977],[1.276,51.961],[1.273,51.956],[1.251,51.96],[1.204,51.953],[1.165,51.967],[1.143,51.967],[1.067,51.953],[1.096,51.946],[1.262,51.94],[1.283,51.946],[1.28,51.928],[1.201,51.877],[1.229,51.867],[1.265,51.864],[1.287,51.882],[1.287,51.86],[1.276,51.845],[1.219,51.811],[1.168,51.791],[1.136,51.782],[1.064,51.776],[1.046,51.777],[1.039,51.782],[0.988,51.83],[0.981,51.843],[0.977,51.825],[0.963,51.815],[0.923,51.803],[0.887,51.782],[0.88,51.752],[0.873,51.747],[0.837,51.733],[0.823,51.733],[0.79,51.742],[0.769,51.74],[0.7,51.72],[0.751,51.708],[0.761,51.693],[0.79,51.71],[0.851,51.718],[0.884,51.727],[0.913,51.742],[0.931,51.744],[0.945,51.733],[0.949,51.725],[0.938,51.706],[0.952,51.678],[0.941,51.673],[0.938,51.664],[0.938,51.641],[0.934,51.636],[0.913,51.624],[0.938,51.625],[0.949,51.622],[0.952,51.617],[0.923,51.588],[0.873,51.56],[0.815,51.538],[0.772,51.527],[0.693,51.536],[0.646,51.536],[0.625,51.522],[0.581,51.517],[0.571,51.509],[0.553,51.517],[0.524,51.517],[0.455,51.506],[0.441,51.477],[0.43,51.467],[0.383,51.453],[0.448,51.46],[0.47,51.48],[0.535,51.492],[0.697,51.477],[0.711,51.47],[0.722,51.457],[0.722,51.446],[0.715,51.441],[0.693,51.44],[0.643,51.445],[0.61,51.424],[0.574,51.419],[0.556,51.413],[0.585,51.391],[0.671,51.391],[0.715,51.384],[0.704,51.396],[0.7,51.409],[0.704,51.419],[0.725,51.419],[0.74,51.387],[0.765,51.364],[0.977,51.349],[1.1,51.374],[1.424,51.392],[1.449,51.382],[1.435,51.343],[1.42,51.33],[1.384,51.33],[1.377,51.327],[1.388,51.288],[1.406,51.261],[1.413,51.222],[1.406,51.183],[1.384,51.151],[1.355,51.131],[1.291,51.117],[1.262,51.104],[1.229,51.104],[1.208,51.095],[1.201,51.087],[1.172,51.077],[1.107,51.077],[1.085,51.073],[1.067,51.065],[1.028,51.041],[0.967,50.982],[0.981,50.918],[0.945,50.909],[0.801,50.94],[0.761,50.931],[0.664,50.871],[0.625,50.859],[0.409,50.83],[0.365,50.818],[0.344,50.8],[0.344,50.795],[0.308,50.781],[0.272,50.747],[0.232,50.747],[0.157,50.761],[0.121,50.761],[0.077,50.779],[0.016,50.785],[-0.175,50.828],[-0.207,50.832],[-0.232,50.822],[-0.268,50.832],[-0.398,50.801],[-0.571,50.801],[-0.733,50.768],[-0.758,50.778],[-0.769,50.774],[-0.772,50.766],[-0.765,50.747],[-0.772,50.737],[-0.79,50.73],[-0.812,50.736],[-0.913,50.778],[-0.905,50.788],[-0.862,50.801],[-0.862,50.808],[-0.905,50.83],[-0.923,50.822],[-0.931,50.823],[-0.92,50.837],[-0.938,50.844],[-0.97,50.847],[-1.021,50.844],[-1.035,50.827],[-1.042,50.801],[-1.057,50.783],[-1.082,50.781],[-1.103,50.795],[-1.067,50.844],[-1.089,50.85],[-1.165,50.844],[-1.129,50.825],[-1.125,50.818],[-1.121,50.8],[-1.125,50.788],[-1.139,50.781],[-1.15,50.781],[-1.186,50.793],[-1.201,50.808],[-1.233,50.818],[-1.255,50.832],[-1.301,50.844],[-1.337,50.872],[-1.467,50.918],[-1.467,50.911],[-1.424,50.899],[-1.323,50.825],[-1.316,50.812],[-1.316,50.8],[-1.42,50.788],[-1.406,50.781],[-1.406,50.774],[-1.478,50.764],[-1.489,50.758],[-1.525,50.761],[-1.561,50.719],[-1.582,50.722],[-1.604,50.732],[-1.694,50.741],[-1.755,50.722],[-1.773,50.72],[-1.856,50.727],[-1.895,50.717],[-1.939,50.692],[-1.946,50.698],[-1.949,50.714],[-1.989,50.72],[-2.021,50.72],[-2.032,50.737],[-2.039,50.741],[-2.083,50.698],[-2.047,50.707],[-2.036,50.714],[-2.014,50.688],[-2.003,50.682],[-1.953,50.676],[-1.946,50.668],[-1.953,50.651],[-1.931,50.644],[-1.967,50.617],[-1.964,50.602],[-1.985,50.597],[-2.083,50.597],[-2.158,50.621],[-2.342,50.634],[-2.378,50.648],[-2.399,50.646],[-2.435,50.638],[-2.461,50.607],[-2.464,50.585],[-2.457,50.575],[-2.432,50.57],[-2.428,50.558],[-2.453,50.528],[-2.461,50.528],[-2.461,50.565],[-2.482,50.59],[-2.695,50.693],[-2.864,50.734],[-2.889,50.734],[-2.961,50.724],[-2.997,50.709],[-3.022,50.707],[-3.058,50.714],[-3.127,50.685],[-3.166,50.693],[-3.26,50.675],[-3.296,50.638],[-3.368,50.617],[-3.407,50.621],[-3.422,50.629],[-3.451,50.673],[-3.465,50.678],[-3.469,50.676],[-3.469,50.666],[-3.454,50.658],[-3.443,50.624],[-3.433,50.611],[-3.469,50.585],[-3.483,50.568],[-3.505,50.521],[-3.505,50.501],[-3.487,50.459],[-3.533,50.455],[-3.548,50.447],[-3.555,50.432],[-3.548,50.416],[-3.533,50.41],[-3.487,50.411],[-3.487,50.405],[-3.497,50.384],[-3.515,50.379],[-3.526,50.351],[-3.541,50.344],[-3.569,50.356],[-3.577,50.334],[-3.598,50.325],[-3.6,50.212],[-3.6,50.459],[-3.6,50.141],[-3.6,51.247],[-3.6,51.227],[-3.559,51.229],[-3.433,51.21],[-3.404,51.191],[-3.386,51.186],[-3.271,51.19],[-3.163,51.207],[-3.098,51.205],[-3.058,51.208],[-3.029,51.22],[-3.022,51.213],[-3.037,51.2],[-3.022,51.193],[-3.001,51.22],[-3.001,51.24],[-3.008,51.254],[-3.011,51.311],[-3.022,51.323],[-2.993,51.321],[-2.986,51.347],[-2.965,51.365],[-2.961,51.374],[-2.975,51.384],[-2.954,51.399],[-2.921,51.394],[-2.885,51.418],[-2.817,51.473],[-2.799,51.482],[-2.781,51.489],[-2.716,51.499],[-2.695,51.512],[-2.608,51.607],[-2.579,51.619],[-2.576,51.636],[-2.558,51.659],[-2.5,51.696],[-2.464,51.725],[-2.407,51.742],[-2.389,51.75],[-2.381,51.762],[-2.385,51.774],[-2.399,51.782],[-2.403,51.764],[-2.421,51.754],[-2.482,51.744],[-2.522,51.706],[-2.583,51.681],[-2.666,51.617],[-2.713,51.587],[-2.759,51.58],[-2.817,51.556],[-2.86,51.546],[-2.943,51.543],[-2.957,51.546],[-2.975,51.563],[-3.011,51.538],[-3.015,51.531],[-3.076,51.507],[-3.091,51.506],[-3.13,51.48],[-3.145,51.46],[-3.173,51.453],[-3.159,51.431],[-3.166,51.411],[-3.184,51.397],[-3.22,51.403],[-3.289,51.384],[-3.541,51.399],[-3.559,51.406],[-3.6,51.446],[-3.6,53.2],[-1.759,53.2],[-3.325,53.2]],[[0.913,51.413],[0.934,51.397],[0.941,51.382],[0.938,51.37],[0.913,51.364],[0.794,51.37],[0.758,51.386],[0.743,51.401],[0.733,51.413],[0.747,51.44],[0.754,51.446],[0.769,51.448],[0.891,51.421],[0.913,51.413]],[[-1.082,50.714],[-1.064,50.693],[-1.064,50.685],[-1.075,50.678],[-1.129,50.666],[-1.157,50.651],[-1.165,50.641],[-1.165,50.609],[-1.168,50.604],[-1.28,50.582],[-1.316,50.589],[-1.496,50.673],[-1.535,50.67],[-1.55,50.665],[-1.568,50.658],[-1.546,50.687],[-1.507,50.709],[-1.42,50.734],[-1.424,50.72],[-1.402,50.722],[-1.377,50.734],[-1.345,50.761],[-1.319,50.773],[-1.294,50.773],[-1.143,50.734],[-1.111,50.732],[-1.096,50.727],[-1.096,50.714],[-1.082,50.714]],[[-0.959,50.808],[-0.959,50.801],[-0.938,50.788],[-0.938,50.781],[-1.021,50.788],[-1.021,50.795],[-0.999,50.801],[-0.974,50.83],[-0.959,50.83],[-0.949,50.823],[-0.949,50.818],[-0.959,50.808]]]<\/script>
<script>
  // Everything the map needs from the data, filled in by Liquid.
  window.RADAR = {
    lat: {{ loc[0] | strip | default: 51.466 }}, lon: {{ loc[1] | strip | default: -0.088 }},
    time: {% if frame %}{{ frame.time | plus: utc_offset }}{% else %}0{% endif %},
    tiles: {% if frame %}"{{ IDX_0.host }}{{ frame.path }}"{% else %}null{% endif %},
    oldTiles: {% if old_frame and old_frame.time != frame.time %}"{{ IDX_0.host }}{{ old_frame.path }}"{% else %}null{% endif %},
    minutes: {% if old_frame %}{{ frame.time | minus: old_frame.time | divided_by: 60 }}{% else %}0{% endif %}
  };
<\/script>
<script>
document.addEventListener('DOMContentLoaded', function () {
  var R = window.RADAR, box = document.getElementById('rr-map');
  if (!box) return;
  var W = box.clientWidth, H = box.clientHeight;
  var Z = 8, TS = 256 * Math.pow(2, Z);            // map scale: web mercator zoom 8, about 380 m a pixel
  var RADAR_Z = 7;                                  // radar tiles come one zoom out and are drawn at double size
  function merc(lon, lat) {
    return [(lon + 180) / 360 * TS, (1 - Math.log(Math.tan(Math.PI / 4 + lat * Math.PI / 360)) / Math.PI) / 2 * TS];
  }
  var home = merc(R.lon, R.lat), ox = home[0] - W * 0.55, oy = home[1] - H * 0.5;
  function P(lon, lat) { var p = merc(lon, lat); return [p[0] - ox, p[1] - oy]; }
  var mPerPx = 156543.03 * Math.cos(R.lat * Math.PI / 180) / Math.pow(2, Z);
  var NS = 'http://www.w3.org/2000/svg';
  function svg(id) { var s = document.createElementNS(NS, 'svg'); s.setAttribute('width', W); s.setAttribute('height', H); s.id = id; box.appendChild(s); return s; }
  function el(parent, name, attrs, text) {
    var e = document.createElementNS(NS, name);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (text) e.textContent = text;
    parent.appendChild(e); return e;
  }

  // 1. Sea and land, both plain white with a bold coastline, so the rain stands out
  var base = svg('rr-base');
  el(base, 'rect', { width: W, height: H, fill: 'white' });
  var land = JSON.parse(document.getElementById('rr-land').textContent), d = '';
  land.forEach(function (ring) {
    d += 'M' + ring.map(function (p) { var q = P(p[0], p[1]); return q[0].toFixed(1) + ' ' + q[1].toFixed(1); }).join('L') + 'Z';
  });
  el(base, 'path', { d: d, fill: 'white', stroke: 'black', 'stroke-width': 2.5, 'stroke-linejoin': 'round' });

  // 2. Rain, as patterns: light = stripes, moderate = grid, heavy = solid
  var canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H; box.appendChild(canvas);
  var marks = svg('rr-marks');
  var near = document.getElementById('rr-near');

  // 3. Towns (skipping any whose label would overlap one already placed), you, and a scale bar
  var TOWNS = [['Reading',-0.973,51.454],['Oxford',-1.258,51.752],['Guildford',-0.57,51.236],['Luton',-0.42,51.879],
    ['Chelmsford',0.47,51.736],['Maidstone',0.522,51.27],['Crawley',-0.187,51.109],['Southend',0.71,51.54],
    ['Basingstoke',-1.087,51.266],['Cambridge',0.121,52.205],['Brighton',-0.137,50.822],['Canterbury',1.08,51.28],
    ['Milton Keynes',-0.759,52.04],['Watford',-0.396,51.656],['Slough',-0.595,51.511],['High Wycombe',-0.749,51.629],
    ['Tonbridge',0.274,51.195],['Colchester',0.902,51.889],['Margate',1.386,51.389],['Hastings',0.573,50.854],
    ['Eastbourne',0.284,50.768],['Portsmouth',-1.091,50.805],['Southampton',-1.404,50.909],['Winchester',-1.313,51.063],
    ['Bedford',-0.466,52.136],['Stevenage',-0.202,51.903],['Harlow',0.111,51.772],['Horsham',-0.327,51.063],
    ['Newbury',-1.323,51.401],['Aylesbury',-0.813,51.816],['Ashford',0.872,51.146],['Ipswich',1.155,52.059]];
  var hp = P(R.lon, R.lat), placed = [[hp[0] - 14, hp[1] - 30, 70, 44]];
  function free(b) {
    return b[0] > 2 && b[1] > 2 && b[0] + b[2] < W - 2 && b[1] + b[3] < H - 30 &&
      placed.every(function (o) { return b[0] > o[0] + o[2] || b[0] + b[2] < o[0] || b[1] > o[1] + o[3] || b[1] + b[3] < o[1]; });
  }
  TOWNS.forEach(function (t) {
    var p = P(t[1], t[2]), b = [p[0] - 5, p[1] - 10, 12 + t[0].length * 8.5, 20];
    if (!free(b)) return;
    placed.push(b);
    el(marks, 'circle', { cx: p[0], cy: p[1], r: 3.5, fill: 'black', stroke: 'white', 'stroke-width': 1.5 });
    el(marks, 'text', { x: p[0] + 6, y: p[1] + 5, 'class': 'town' }, t[0]);
  });
  el(marks, 'circle', { cx: hp[0], cy: hp[1], r: 11, fill: 'white', stroke: 'black', 'stroke-width': 3 });
  el(marks, 'circle', { cx: hp[0], cy: hp[1], r: 4.5, fill: 'black' });
  el(marks, 'text', { x: hp[0] + 15, y: hp[1] - 8, 'class': 'home' }, 'You');
  var bar = 20000 / mPerPx;
  el(marks, 'rect', { x: W - 96, y: H - 36, width: bar + 22, height: 28, fill: 'white', stroke: 'black' });
  el(marks, 'text', { x: W - 86, y: H - 23, 'class': 'town' }, '20 km');
  el(marks, 'line', { x1: W - 86, y1: H - 16, x2: W - 86 + bar, y2: H - 16, stroke: 'black', 'stroke-width': 3 });

  if (!R.tiles) { near.textContent = 'Radar unavailable'; return; }
  var scale = Math.pow(2, Z - RADAR_Z), size = 256 * scale, tiles = [];
  for (var tx = Math.floor(ox / size); tx <= Math.floor((ox + W) / size); tx++)
    for (var ty = Math.floor(oy / size); ty <= Math.floor((oy + H) / size); ty++) tiles.push([tx, ty]);
  var ctx = canvas.getContext('2d');

  // Which way is the rain moving? Compare the rain now with the radar image from about
  // 30 minutes earlier: find the shift that lines the old rain up best with the new.
  var CELL = 4, GW = Math.floor(W / CELL), GH = Math.floor(H / CELL);
  function rainGrid(data, isRain) {
    var g = new Uint8Array(GW * GH);
    for (var y = 0; y < GH * CELL; y++) for (var x = 0; x < GW * CELL; x++)
      if (isRain((y * W + x) * 4)) g[Math.floor(y / CELL) * GW + Math.floor(x / CELL)] = 1;
    return g;
  }
  function loadTiles(c, path) {
    return Promise.all(tiles.map(function (t) {
      return new Promise(function (done) {
        var img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = function () { c.drawImage(img, t[0] * size - ox, t[1] * size - oy, size, size); done(true); };
        img.onerror = function () { done(false); };
        img.src = path + '/256/' + RADAR_Z + '/' + t[0] + '/' + t[1] + '/2/1_0.png';
      });
    }));
  }
  var oldGrid = Promise.resolve(null);
  if (R.oldTiles && R.minutes > 0) {
    var oc = document.createElement('canvas'); oc.width = W; oc.height = H;
    var octx = oc.getContext('2d');
    oldGrid = loadTiles(octx, R.oldTiles).then(function (ok) {
      if (!ok.some(Boolean)) return null;
      try { var d = octx.getImageData(0, 0, W, H).data; return rainGrid(d, function (i) { return d[i + 3] > 40; }); }
      catch (e) { return null; }
    });
  }
  // Resolves to the rain's movement { sx, sy, kmh } in grid cells over R.minutes, or null.
  function track(nowGrid) {
    return oldGrid.then(function (old) {
      if (!old) return null;
      var nOld = 0, nNow = 0, k;
      for (k = 0; k < old.length; k++) { nOld += old[k]; nNow += nowGrid[k]; }
      if (nOld < 40 || nNow < 40) return null;            // too little rain to tell
      var MAX = 25, bestScore = -1, sx = 0, sy = 0;        // up to 25 cells (about 38 km) either way
      for (var dy = -MAX; dy <= MAX; dy++) for (var dx = -MAX; dx <= MAX; dx++) {
        var score = 0;
        for (var y = Math.max(0, -dy); y < Math.min(GH, GH - dy); y++) {
          var ro = y * GW, rn = (y + dy) * GW + dx;
          for (var x = Math.max(0, -dx); x < Math.min(GW, GW - dx); x++) score += old[ro + x] & nowGrid[rn + x];
        }
        if (score > bestScore || (score === bestScore && dx * dx + dy * dy < sx * sx + sy * sy)) { bestScore = score; sx = dx; sy = dy; }
      }
      if (bestScore < 0.3 * Math.min(nOld, nNow)) return null;  // no clear match
      return { sx: sx, sy: sy, kmh: Math.sqrt(sx * sx + sy * sy) * CELL * mPerPx / 1000 / (R.minutes / 60) };
    });
  }
  // Minutes until the rain reaches you if it keeps going the same way (up to 3 hours), or null.
  function arrival(grid, m) {
    var hx = hp[0] / CELL, hy = hp[1] / CELL, vx = m.sx / R.minutes, vy = m.sy / R.minutes;
    for (var t = 5; t <= 180; t += 5) {
      var cx = Math.round(hx - vx * t), cy = Math.round(hy - vy * t);
      if (cx < 0 || cy < 0 || cx >= GW || cy >= GH) return null;   // would come from off the map
      for (var y = cy - 1; y <= cy + 1; y++) for (var x = cx - 1; x <= cx + 1; x++)
        if (x >= 0 && y >= 0 && x < GW && y < GH && grid[y * GW + x]) return t;
    }
    return null;
  }
  // "in 40 min" within the hour, otherwise a clock time to the nearest 10 minutes, e.g. "by 19:00".
  function inTime(t) {
    if (t < 60 || !R.time) return 'in ' + t + ' min';
    var at = new Date(Math.round((R.time + t * 60) / 600) * 600000);
    return 'by ' + String(at.getUTCHours()).padStart(2, '0') + ':' + String(at.getUTCMinutes()).padStart(2, '0');
  }
  function heading(m) {
    var short = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    var ang = (Math.atan2(m.sx, -m.sy) * 180 / Math.PI + 360) % 360;
    return '<svg class="wx-arrow" viewBox="0 0 20 20" width="1em" height="1em"><g transform="rotate(' +
      Math.round(ang) + ' 10 10)"><path d="M10 2l6 14-6-4-6 4z" fill="black"/></g></svg> Heading ' +
      short[Math.round(ang / 45) % 8] + ' at ' + Math.round(m.kmh / 1.609) + ' mph';
  }

  loadTiles(ctx, R.tiles).then(function (loaded) {
    if (!loaded.some(Boolean)) { near.textContent = 'Radar unavailable'; return; }
    var img;
    try { img = ctx.getImageData(0, 0, W, H); } catch (e) {
      // The tiles can't be read (no CORS): show them as plain dark shapes instead.
      canvas.style.filter = 'grayscale(1) brightness(0.6) contrast(3)';
      near.textContent = 'Rain on the map'; return;
    }
    var px = img.data, best = Infinity, bx = 0, by = 0;
    for (var y = 0; y < H; y++) for (var x = 0; x < W; x++) {
      var i = (y * W + x) * 4, a = px[i + 3], level = 0;
      if (a > 40) {
        var r = px[i], g = px[i + 1], b = px[i + 2];
        // RainViewer's colours: pale to deep blue as rain gets heavier, then yellow, orange and red.
        if (r > b + 20) level = 3;
        else level = (r + g + b) / 3 > 165 ? 1 : 2;
      }
      var ink = level === 3 || (level === 2 && (x % 5 < 2 || y % 5 < 2)) || (level === 1 && x % 3 === 0 && (y + (x % 6 ? 0 : 1)) % 3 === 0);
      px[i] = px[i + 1] = px[i + 2] = ink ? 0 : 255;
      px[i + 3] = level ? 255 : 0;  // rain areas are opaque, so their pattern hides the coastline under them
      if (level) { var dd = (x - hp[0]) * (x - hp[0]) + (y - hp[1]) * (y - hp[1]); if (dd < best) { best = dd; bx = x; by = y; } }
    }
    ctx.putImageData(img, 0, 0);
    if (best === Infinity) { near.textContent = 'No rain on the map'; return; }
    var km = Math.sqrt(best) * mPerPx / 1000;
    var dirs = ['north', 'north-east', 'east', 'south-east', 'south', 'south-west', 'west', 'north-west'];
    var ang = (Math.atan2(bx - hp[0], hp[1] - by) * 180 / Math.PI + 360) % 360;
    var where = Math.round(km) + ' km ' + dirs[Math.round(ang / 45) % 8];
    near.textContent = km < 2 ? 'Raining here' : 'Rain ' + where;
    var grid = rainGrid(px, function (i) { return px[i + 3] > 0; });
    track(grid).then(function (m) {
      var move = document.getElementById('rr-move'), move2 = document.getElementById('rr-move2');
      if (!m || !move || !move2) return;
      if (m.kmh < 5) { move.textContent = 'Rain barely moving'; return; }
      if (km < 2) { move.innerHTML = heading(m); return; }
      var t = arrival(grid, m);
      if (t) { near.textContent = 'Rain ' + inTime(t); move.textContent = 'Now ' + where; move2.innerHTML = heading(m); }
      else { move.innerHTML = heading(m); move2.textContent = 'Not heading this way'; }
    });
  });
});
<\/script>
`,full:`<div class="layout layout--row layout--left layout--stretch-y gap--large">
  <div class="rr-map" id="rr-map"></div>
  <div class="flex flex--col flex--left gap--medium rr-side">
    <div class="flex flex--col flex--left gap--xsmall">
      <span class="label label--underline">{% if radar_time %}Radar at {{ radar_time }}{% else %}Radar{% endif %}</span>
      <span class="title" id="rr-near">Rain nearby</span>
      <span class="label" id="rr-move"></span>
      <span class="label" id="rr-move2"></span>
    </div>
    <div class="flex flex--col flex--left gap--xsmall">
      <div class="flex flex--row flex--left flex--center-y gap--small">
        <span class="value value--large">{{ current.temperature_2m | round }}\xB0</span>
        {% render "weather_icon", code: current.weather_code, night: night, size: 64 %}
      </div>
      <span class="label">{{ summary }}</span>
      <span class="label">Feels {{ current.apparent_temperature | round }}\xB0</span>
      {% render "wind", speed: current.wind_speed_10m, dir: current.wind_direction_10m, gust: current.wind_gusts_10m %}
    </div>
    <div class="flex flex--col flex--left gap--xsmall">
      {% render "key", level: 1, text: "Light" %}
      {% render "key", level: 2, text: "Moderate" %}
      {% render "key", level: 3, text: "Heavy" %}
    </div>
  </div>
</div>

<div class="title_bar">
  <span class="title">Rain radar</span>
  <span class="instance">{{ place }} \xB7 {{ today_short }}</span>
</div>
`},forecast:{polling_urls:["https://api.open-meteo.com/v1/forecast?latitude={{ location | split: ',' | first | strip }}&longitude={{ location | split: ',' | last | strip }}&current=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,is_day&hourly=temperature_2m,precipitation_probability,precipitation,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,wind_speed_10m_max,wind_direction_10m_dominant,sunrise,sunset&forecast_hours=36&forecast_days=2&wind_speed_unit=mph&timezone=auto"],polling_headers:"",defaults:{location:"51.4660,-0.0880",place_name:"Denmark Hill"},shared:`{%- comment -%}
  The day's weather written out as a few sentences, under a large date, with
  small weather icons in the text. One polling URL (Open-Meteo), so its answer
  arrives at the top level: current, hourly (36 hours from this hour), daily
  (today and tomorrow, with sunrise and sunset).
{%- endcomment -%}

{%- comment -%} A time like 16:00 as "4pm". Args: t (HH:MM or an hourly time) {%- endcomment -%}
{% template clock %}
{%- assign hm = t | slice: -5, 5 -%}{%- assign h = hm | slice: 0, 2 | plus: 0 -%}{%- assign m = hm | slice: 3, 2 -%}
{%- if h == 0 and m == "00" -%}midnight{%- elsif h == 12 and m == "00" -%}midday{%- else -%}
{%- assign h12 = h | modulo: 12 -%}{%- if h12 == 0 -%}{%- assign h12 = 12 -%}{%- endif -%}
{{ h12 }}{% if m != "00" %}:{{ m }}{% endif %}{% if h < 12 %}am{% else %}pm{% endif %}
{%- endif -%}
{% endtemplate %}

{%- comment -%} Weather in a few lower-case words. Args: code, night {%- endcomment -%}
{% template words %}
{%- case code -%}
  {%- when 0 -%}{% if night %}clear{% else %}sunny{% endif %}
  {%- when 1 -%}{% if night %}mostly clear{% else %}mostly sunny{% endif %}
  {%- when 2 -%}{% if night %}partly cloudy{% else %}sunny spells{% endif %}
  {%- when 3 -%}cloudy
  {%- when 45, 48 -%}foggy
  {%- when 51, 53, 55 -%}drizzly
  {%- when 56, 57, 66, 67 -%}freezing rain
  {%- when 61, 63 -%}rainy
  {%- when 65 -%}heavy rain
  {%- when 71, 73, 75, 77, 85, 86 -%}snowy
  {%- when 80, 81 -%}showery
  {%- when 82 -%}heavy showers
  {%- when 95, 96, 99 -%}stormy
  {%- else -%}cloudy
{%- endcase -%}
{% endtemplate %}

{%- comment -%} A weather icon sitting in a line of text {%- endcomment -%}
{% template ico %}<span class="fc-ico">{% render "weather_icon", code: code, night: night, size: "1.5em" %}</span>{% endtemplate %}

<style>
  .fc { font-family: "Inter Variable", Inter, sans-serif; color: black; display: flex; flex-direction: column; width: 100%; height: 100%; }
  .fc-head { display: flex; align-items: flex-end; justify-content: space-between; border-bottom: 3px solid black; padding-bottom: 12px; }
  .fc-day { font-size: 26px; font-weight: 600; line-height: 1; letter-spacing: 0.18em; text-transform: uppercase; }
  .fc-date { font-size: 68px; font-weight: 800; line-height: 1; letter-spacing: -0.025em; margin-top: 8px; }
  .fc-now { display: flex; align-items: center; gap: 12px; }
  .fc-now .fc-temp { font-size: 76px; font-weight: 300; line-height: 1; letter-spacing: -0.04em; }
  .fc-body { flex: 1; display: flex; flex-direction: column; justify-content: center; font-size: 27px; line-height: 1.45; font-weight: 450; }
  .fc-body p { margin: 0 0 10px 0; }
  .fc-body p:last-child { margin-bottom: 0; }
  .fc-body b { font-weight: 750; }
  .fc-lead { font-style: italic; font-weight: 600; }
  .fc-ico { display: inline-block; vertical-align: -0.38em; margin: 0 0.1em 0 0.28em; }
  .fc-ico svg { display: block; }
  .fc-foot { display: flex; justify-content: space-between; font-size: 18px; font-weight: 600; border-top: 1.5px solid black; padding-top: 8px; letter-spacing: 0.04em; text-transform: uppercase; }
</style>

{%- comment -%}
  Weather icon drawn as SVG, so it needs no image hosting and stays sharp on e-ink.
  Args: code (WMO weather code), night (true to show a moon), size (px).
{%- endcomment -%}
{% template weather_icon %}
{%- assign k = "cloud" -%}
{%- case code -%}
  {%- when 0, 1 -%}{%- assign k = "sun" -%}
  {%- when 2 -%}{%- assign k = "part" -%}
  {%- when 3 -%}{%- assign k = "cloud" -%}
  {%- when 45, 48 -%}{%- assign k = "fog" -%}
  {%- when 51, 53, 55, 56, 57 -%}{%- assign k = "drizzle" -%}
  {%- when 61, 63, 65, 66, 67 -%}{%- assign k = "rain" -%}
  {%- when 71, 73, 75, 77, 85, 86 -%}{%- assign k = "snow" -%}
  {%- when 80, 81, 82 -%}{%- assign k = "showers" -%}
  {%- when 95, 96, 99 -%}{%- assign k = "storm" -%}
{%- endcase -%}
<svg class="wx-icon" viewBox="0 0 64 64" width="{{ size }}" height="{{ size }}" fill="white" stroke="black" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
  {%- if k == "sun" or k == "part" or k == "showers" -%}
    {%- if k == "sun" -%}{%- assign cx = 32 -%}{%- assign cy = 32 -%}{%- assign r = 12 -%}{%- assign ray = 20 -%}
    {%- else -%}{%- assign cx = 42 -%}{%- assign cy = 19 -%}{%- assign r = 9 -%}{%- assign ray = 15 -%}{%- endif -%}
    {%- if night -%}
      <path d="M{{ cx | plus: 2 }} {{ cy | minus: r | minus: 3 }} a{{ r | plus: 3 }} {{ r | plus: 3 }} 0 1 0 {{ r | plus: 5 }} {{ r | plus: 12 }} a{{ r }} {{ r }} 0 0 1 -{{ r | plus: 5 }} -{{ r | plus: 12 }}z" fill="black"/>
    {%- else -%}
      <g>
        {%- for a in (0..7) -%}
          {%- assign dx = "1,0.71,0,-0.71,-1,-0.71,0,0.71" | split: "," -%}
          {%- assign dy = "0,0.71,1,0.71,0,-0.71,-1,-0.71" | split: "," -%}
          {%- assign ix = dx[a] | times: 1.0 -%}{%- assign iy = dy[a] | times: 1.0 -%}
          {%- assign inner = r | plus: 4 -%}
          <line x1="{{ ix | times: inner | plus: cx }}" y1="{{ iy | times: inner | plus: cy }}" x2="{{ ix | times: ray | plus: cx }}" y2="{{ iy | times: ray | plus: cy }}"/>
        {%- endfor -%}
      </g>
      <circle cx="{{ cx }}" cy="{{ cy }}" r="{{ r }}" fill="black"/>
    {%- endif -%}
  {%- endif -%}
  {%- if k != "sun" and k != "fog" -%}
    {%- assign lift = -8 -%}{%- assign shift = 0 -%}
    {%- if k == "cloud" -%}{%- assign lift = 0 -%}{%- elsif k == "part" -%}{%- assign lift = 4 -%}{%- endif -%}
    {%- if k == "part" or k == "showers" -%}{%- assign shift = -6 -%}{%- endif -%}
    <path transform="translate({{ shift }} {{ lift }})" d="M18 50h30a10 10 0 0 0 1-20a14 14 0 0 0-27-4a12 12 0 0 0-4 24z"/>
  {%- endif -%}
  {%- case k -%}
    {%- when "rain", "showers" -%}
      <path d="M22 48l-3 9M32 48l-3 9M42 48l-3 9" stroke-width="4"/>
    {%- when "drizzle" -%}
      <path d="M23 50l-1 3M33 50l-1 3M43 50l-1 3M28 56l-1 3M38 56l-1 3" stroke-width="3.5"/>
    {%- when "snow" -%}
      <g fill="black" stroke="none"><circle cx="22" cy="51" r="2.6"/><circle cx="32" cy="55" r="2.6"/><circle cx="42" cy="51" r="2.6"/><circle cx="27" cy="59" r="2.6"/><circle cx="37" cy="59" r="2.6"/></g>
    {%- when "storm" -%}
      <path d="M34 40l-8 12h7l-4 10 11-14h-7l4-8z" fill="black" stroke-width="2"/>
    {%- when "fog" -%}
      <path d="M10 22h44M14 32h40M10 42h40M16 52h34"/>
  {%- endcase -%}
</svg>
{% endtemplate %}



{%- assign settings = trmnl.plugin_settings.custom_fields_values -%}
{%- assign place = settings.place_name | default: "Forecast" -%}
{%- assign utc_offset = trmnl.user.utc_offset | default: utc_offset_seconds | default: 0 -%}
{%- assign now_s = "now" | date: "%s" | plus: utc_offset -%}
{%- assign weekday = now_s | date: "%A" -%}
{%- assign date_long = now_s | date: "%-d %B" -%}
{%- assign night = false -%}{%- if current.is_day == 0 -%}{%- assign night = true -%}{%- endif -%}
{%- assign code_now = current.weather_code | default: 3 -%}
{%- assign hour_now = hourly.time[0] | slice: 11, 2 | plus: 0 -%}
{%- assign last_hour = hourly.time.size | minus: 1 -%}

{%- comment -%}
  The stretch to describe: from now until 7am tomorrow, or until 6pm if it's
  already the small hours.
{%- endcomment -%}
{%- if hour_now >= 7 -%}{%- assign span_end = 31 | minus: hour_now -%}{%- else -%}{%- assign span_end = 18 | minus: hour_now -%}{%- endif -%}
{%- if span_end > last_hour -%}{%- assign span_end = last_hour -%}{%- endif -%}

{%- comment -%} 1. Now {%- endcomment -%}
{%- capture now_words -%}{% render "words", code: code_now, night: night %}{%- endcapture -%}
{%- assign t_now = current.temperature_2m | round -%}
{%- assign feels = current.apparent_temperature | round -%}

{%- comment -%} 2. Rain: when it starts or stops, and the heaviest hour. Wet = 0.1 mm or a 50% chance. {%- endcomment -%}
{%- assign wet_now = false -%}
{%- if current.precipitation >= 0.1 -%}{%- assign wet_now = true -%}{%- endif -%}
{%- if code_now >= 51 and code_now <= 67 -%}{%- assign wet_now = true -%}{%- endif -%}
{%- if code_now >= 80 -%}{%- assign wet_now = true -%}{%- endif -%}
{%- assign r_start = nil -%}{%- assign r_end = nil -%}{%- assign r_peak = nil -%}{%- assign peak_mm = 0 -%}
{%- assign showery = false -%}{%- assign rain_code = 61 -%}
{%- if wet_now -%}{%- assign r_start = 0 -%}{%- endif -%}
{%- for i in (0..span_end) -%}
  {%- assign mm = hourly.precipitation[i] | default: 0 -%}
  {%- assign pc = hourly.precipitation_probability[i] | default: 0 -%}
  {%- assign c = hourly.weather_code[i] | default: 0 -%}
  {%- assign wet = false -%}
  {%- if mm >= 0.1 or pc >= 50 -%}{%- assign wet = true -%}{%- endif -%}
  {%- if i == 0 and wet_now -%}{%- assign wet = true -%}{%- endif -%}
  {%- if wet -%}
    {%- if r_start == nil -%}{%- assign r_start = i -%}{%- endif -%}
    {%- if r_end == nil -%}
      {%- if mm > peak_mm -%}{%- assign peak_mm = mm -%}{%- assign r_peak = i -%}{%- endif -%}
      {%- if c >= 80 and c <= 82 -%}{%- assign showery = true -%}{%- assign rain_code = c -%}{%- elsif c >= 51 -%}{%- assign rain_code = c -%}{%- endif -%}
    {%- endif -%}
  {%- elsif r_start != nil and r_end == nil -%}
    {%- assign r_end = i -%}
  {%- endif -%}
{%- endfor -%}
{%- if showery -%}{%- assign rain_word = "Showers" -%}{%- assign rain_the = "the showers" -%}{%- else -%}{%- assign rain_word = "Rain" -%}{%- assign rain_the = "the rain" -%}{%- endif -%}

{%- comment -%} 3. Temperatures: the high still to come today, and the low overnight {%- endcomment -%}
{%- assign t_hi = t_now -%}{%- assign t_lo = t_now -%}{%- assign hi_i = 0 -%}
{%- assign day0 = hourly.time[0] | slice: 8, 2 -%}
{%- for i in (0..span_end) -%}
  {%- assign hh = hourly.time[i] | slice: 11, 2 | plus: 0 -%}
  {%- assign day_n = hourly.time[i] | slice: 8, 2 -%}
  {%- assign t = hourly.temperature_2m[i] | round -%}
  {%- assign same_day = false -%}{%- if day_n == day0 -%}{%- assign same_day = true -%}{%- endif -%}
  {%- if same_day and hh < 19 and t > t_hi -%}{%- assign t_hi = t -%}{%- assign hi_i = i -%}{%- endif -%}
  {%- if t < t_lo -%}{%- assign t_lo = t -%}{%- endif -%}
{%- endfor -%}
{%- comment -%} What the night sky looks like: the commonest sky in the dark hours {%- endcomment -%}
{%- assign n_clear = 0 -%}{%- assign n_part = 0 -%}{%- assign n_cloud = 0 -%}
{%- for i in (0..span_end) -%}
  {%- if hourly.is_day[i] == 0 -%}
    {%- assign c = hourly.weather_code[i] | default: 3 -%}
    {%- if c <= 1 -%}{%- assign n_clear = n_clear | plus: 1 -%}{%- elsif c == 2 -%}{%- assign n_part = n_part | plus: 1 -%}{%- else -%}{%- assign n_cloud = n_cloud | plus: 1 -%}{%- endif -%}
  {%- endif -%}
{%- endfor -%}
{%- assign night_sky = "cloudy" -%}
{%- if n_part > n_cloud and n_part >= n_clear -%}{%- assign night_sky = "partly cloudy" -%}{%- endif -%}
{%- if n_clear > n_cloud and n_clear > n_part -%}{%- assign night_sky = "clear" -%}{%- endif -%}
{%- assign hi_hour = hourly.time[hi_i] | slice: 11, 2 | plus: 0 -%}
{%- if hi_hour < 12 -%}{%- assign hi_when = "this morning" -%}{%- elsif hi_hour < 17 -%}{%- assign hi_when = "this afternoon" -%}{%- else -%}{%- assign hi_when = "this evening" -%}{%- endif -%}

{%- comment -%} 4. Wind: the strongest hour, where it's from, and gusts {%- endcomment -%}
{%- assign w_hi = current.wind_speed_10m | default: 0 -%}{%- assign g_hi = current.wind_gusts_10m | default: 0 -%}{%- assign w_dir = current.wind_direction_10m | default: 0 -%}
{%- for i in (0..span_end) -%}
  {%- assign w = hourly.wind_speed_10m[i] | default: 0 -%}
  {%- if w > w_hi -%}{%- assign w_hi = w -%}{%- assign w_dir = hourly.wind_direction_10m[i] | default: w_dir -%}{%- endif -%}
  {%- assign g = hourly.wind_gusts_10m[i] | default: 0 -%}
  {%- if g > g_hi -%}{%- assign g_hi = g -%}{%- endif -%}
{%- endfor -%}
{%- assign compass = "northerly,north-easterly,easterly,south-easterly,southerly,south-westerly,westerly,north-westerly" | split: "," -%}
{%- assign w_idx = w_dir | plus: 22.5 | divided_by: 45 | floor | modulo: 8 -%}
{%- assign w_from = compass[w_idx] -%}
{%- assign w_round = w_hi | round -%}{%- assign g_round = g_hi | round -%}

{%- comment -%} 5. Tomorrow {%- endcomment -%}
{%- capture tmrw_words -%}{% render "words", code: daily.weather_code[1], night: false %}{%- endcapture -%}

{%- comment -%} Sunrise and sunset: today's sunset if still to come, otherwise tomorrow's sunrise {%- endcomment -%}
{%- assign now_hm = hourly.time[0] | slice: 11, 5 -%}
{%- assign sunset = daily.sunset[0] | slice: 11, 5 -%}
{%- assign sunrise_next = daily.sunrise[1] | slice: 11, 5 -%}
{%- assign sunrise_today = daily.sunrise[0] | slice: 11, 5 -%}
`,full:`<div class="fc">
  <div class="fc-head">
    <div>
      <div class="fc-day">{{ weekday }}</div>
      <div class="fc-date">{{ date_long }}</div>
    </div>
    <div class="fc-now">
      {% render "weather_icon", code: code_now, night: night, size: 84 %}
      <span class="fc-temp">{{ t_now }}\xB0</span>
    </div>
  </div>

  <div class="fc-body">
    <p><span class="fc-lead">{{ now_words | capitalize }}</span>{% render "ico", code: code_now, night: night %} for now{% if feels != t_now %}, feeling like <b>{{ feels }}\xB0</b>{% endif %}.
    {%- if r_start == nil -%}
      {%- if code_now <= 2 -%}{%- assign dry_code = code_now -%}{%- else -%}{%- assign dry_code = 3 -%}{%- endif %}
      It should stay dry{% render "ico", code: dry_code, night: night %}{% if hour_now >= 7 %} through to tomorrow morning{% else %} until this evening{% endif %}.
    {%- elsif r_start == 0 -%}
      {%- if r_end %}
      {{ rain_the | capitalize }}{% render "ico", code: rain_code, night: false %} should clear by <b>{% render "clock", t: hourly.time[r_end] %}</b>.
      {%- else %}
      {{ rain_word }}{% render "ico", code: rain_code, night: false %} carries on into the night.
      {%- endif -%}
    {%- else %}
      {{ rain_word }}{% render "ico", code: rain_code, night: false %} arrive{% unless showery %}s{% endunless %} around <b>{% render "clock", t: hourly.time[r_start] %}</b>
      {%- if peak_mm >= 0.5 and r_peak != r_start -%}, heaviest at <b>{% render "clock", t: hourly.time[r_peak] %}</b>{%- endif -%}
      {%- if r_end %} and clear{% unless showery %}s{% endunless %} by <b>{% render "clock", t: hourly.time[r_end] %}</b>{% else %} and last{% unless showery %}s{% endunless %} into the night{% endif %}.
    {%- endif -%}
    </p>
    <p>
    {%- if hour_now < 17 and hi_i > 0 -%}
      Highs of <b>{{ t_hi }}\xB0</b> {{ hi_when }}, then a {{ night_sky }} night, down to <b>{{ t_lo }}\xB0</b>.
    {%- else -%}
      A {{ night_sky }} night ahead, down to <b>{{ t_lo }}\xB0</b>.
    {%- endif %}
    {% if w_round < 8 -%}Light winds
    {%- elsif w_round < 15 -%}A gentle {{ w_from }} breeze
    {%- elsif w_round < 22 -%}A brisk {{ w_from }} wind
    {%- elsif w_round < 32 -%}A strong {{ w_from }} wind
    {%- else -%}Gale-force {{ w_from }} winds{%- endif -%}
    {%- if w_round >= 8 %}, up to {{ w_round }} mph{% endif -%}
    {%- assign g_min = w_round | plus: 8 -%}
    {%- if g_round >= g_min and g_round >= 20 %}, gusting to {{ g_round }}{% endif %}.
    </p>
    <p><span class="fc-lead">Tomorrow</span>{% render "ico", code: daily.weather_code[1], night: false %} looks {{ tmrw_words }}, <b>{{ daily.temperature_2m_max[1] | round }}\xB0</b> by day and {{ daily.temperature_2m_min[1] | round }}\xB0 at night
    {%- assign tp = daily.precipitation_probability_max[1] | default: 0 -%}
    {%- if tp >= 30 %}, with a {{ tp }}% chance of rain{% endif %}.</p>
  </div>

  <div class="fc-foot">
    <span>{% if now_hm < sunset %}Sunset {% render "clock", t: sunset %}{% else %}Sunrise {% render "clock", t: sunrise_next %}{% endif %}</span>
    <span>{{ place }}</span>
  </div>
</div>
`}};var Xn=Object.keys(ee),Hr={rail_api_key:"RAIL_KEY"};function Pn(t,e){let n={...ee[t].defaults};for(let s of Object.keys(n)){let i=e[Hr[s]||s.toUpperCase()];i!==void 0&&i!==""&&(n[s]=String(i))}return n}var Yr=/{%-?\s*template\s+(\w+)\s*-?%}([\s\S]*?){%-?\s*endtemplate\s*-?%}/g;function Zr(t){let e={},n=t.replace(Yr,(i,r,a)=>(e[r]=a,"")),s=new ue({templates:e,timezoneOffset:0});return s.registerFilter("divided_by",(i,r)=>{let a=Number(i),o=Number(r);return Number.isInteger(a)&&Number.isInteger(o)?Math.floor(a/o):a/o}),{engine:s,shared:n}}var Qr={},ea=t=>Qr[t]||=Zr(ee[t].shared);function ta(t,e=new Date){let n=Object.fromEntries(new Intl.DateTimeFormat("en-GB",{timeZone:t,hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).formatToParts(e).map(i=>[i.type,i.value])),s=Date.UTC(n.year,n.month-1,n.day,n.hour,n.minute,n.second);return Math.round((s-e.getTime())/6e4)*60}async function Jn(t,e,n){n.TFL_KEY&&t.startsWith("https://api.tfl.gov.uk/")&&(t+=(t.includes("?")?"&":"?")+"app_key="+encodeURIComponent(n.TFL_KEY));try{let s=await fetch(t,{headers:{accept:"application/json",...e}});s.ok||console.log(`${s.status} from ${t.split("?")[0]}`);let i=await s.json();return Array.isArray(i)?{data:i}:i}catch(s){return console.log(`failed ${t.split("?")[0]}: ${s}`),{}}}function na(t){let e={};for(let n of t.split("&")){let s=n.indexOf("=");s>0&&(e[n.slice(0,s).trim()]=n.slice(s+1).trim())}return e}async function sa(t,e){let n=ee[t],s=Pn(t,e),i=new ue,r=h=>i.parseAndRender(h,s),a=await Promise.all(n.polling_urls.map(r)),o=na(await r(n.polling_headers||"")),l=await Promise.all(a.map(h=>Jn(h,o,e))),c=l.length===1?l[0]:Object.fromEntries(l.map((h,d)=>[`IDX_${d}`,h]));return{fields:s,data:c}}async function qn(t){let[e,n]=(Pn("radar",t).location||"51.4660,-0.0880").split(",").map(a=>a.trim()),s=`https://api.open-meteo.com/v1/forecast?latitude=${e}&longitude=${n}&current=precipitation&minutely_15=precipitation&forecast_minutely_15=8&hourly=precipitation_probability&forecast_hours=2&timezone=auto`,i=await Jn(s,{},t),r=a=>Number(a)>=.1;return r(i.current?.precipitation)||(i.minutely_15?.precipitation||[]).some(r)||(i.hourly?.precipitation_probability||[]).some(a=>Number(a)>=60)}async function ia(t,e,{fields:n,data:s}){let{engine:i,shared:r}=ea(t),a=e.TIME_ZONE||"Europe/London",o={...s,trmnl:{user:{utc_offset:ta(a),time_zone_iana:a,locale:"en"},plugin_settings:{instance_name:t,custom_fields_values:n}}};return i.parseAndRender(r+ee[t].full,o)}function ra(t,e){let n=e.FRAMEWORK_HOST||"https://trmnl.com",s=e.FRAMEWORK_VERSION||"latest";return`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="${n}/css/${s}/plugins.css">
<script type="module" src="${n}/js/${s}/plugins.js"><\/script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">
<style>
  /* Pure black and white, as the e-ink panel shows it. Grey edges on text would
     make the PNG several times bigger, and the TRMNL OG only takes up to 90 KB. */
  body { filter: url(#one-bit); }
</style>
</head>
<body class="environment trmnl">
<svg width="0" height="0" style="position:absolute">
  <filter id="one-bit" color-interpolation-filters="sRGB">
    <feColorMatrix type="saturate" values="0"/>
    <feComponentTransfer>
      <feFuncR type="discrete" tableValues="0 1"/>
      <feFuncG type="discrete" tableValues="0 1"/>
      <feFuncB type="discrete" tableValues="0 1"/>
    </feComponentTransfer>
  </filter>
</svg>
<div class="screen screen--fonts-trmnl">
<div class="view view--full">
${t}
</div>
</div>
</body>
</html>`}async function Bn(t,e){return ra(await ia(t,e,await sa(t,e)),e)}var Kn=new Set(["button","EXT0","EXT1","gpio"]),Xt=(t,e)=>Math.max(1,Number(t)||e)*60;function Gn(t){let e=Xt(t.RAIN_MINUTES,15);return{transport:{screen:t.BUTTON_SCREEN||"transport",refresh:Xt(t.TRANSPORT_MINUTES,2)+1},weather:{screen:t.DEFAULT_SCREEN||"weather",refresh:Xt(t.WEATHER_MINUTES,20)},radar:{screen:"radar",refresh:e+2},rainyWeather:{screen:t.DEFAULT_SCREEN||"weather",refresh:e+3},forecast:{screen:"forecast",refresh:e+4}}}function aa(t,e=new Date){let n=String(t.FORECAST_HOURS??"6-9").match(/^(\d+)\s*-\s*(\d+)$/);if(!n)return!1;let s=Number(new Intl.DateTimeFormat("en-GB",{hour:"numeric",hourCycle:"h23",timeZone:t.TIME_ZONE||"Europe/London"}).format(e));return s>=Number(n[1])&&s<Number(n[2])}var Hn=t=>String(t.RADAR||"").toLowerCase()==="off";function Yn(t,e,n){return t===e.transport.refresh?Hn(n)?"forecast":"radar":t===e.radar.refresh?"forecast":t===e.forecast.refresh?"weather":"transport"}function Zn(t,e,n){return Hn(n)?!1:Kn.has(t||"")?Yn(Number(e),Gn(n),n)==="weather":!0}function Qn(t,e,n,s=!1,i=new Date){let r=Gn(n),a=Number(e);if(Kn.has(t||"")){let c=Yn(a,r,n);return c!=="weather"?r[c]:s?r.rainyWeather:r.weather}let o=aa(n,i),l=c=>o?{screen:"forecast",refresh:c.refresh}:c;return s?a===r.radar.refresh||a===r.transport.refresh?l(r.rainyWeather):r.radar:l(r.weather)}var es=fe("iVBORw0KGgoAAAANSUhEUgAAAyAAAAHgCAIAAADSZZ6iAAAWfmNhQlgAABZ+anVtYgAAAB5qdW1kYzJwYQARABCAAACqADibcQNjMnBhAAAAFlhqdW1iAAAAR2p1bWRjMm1hABEAEIAAAKoAOJtxA3VybjpjMnBhOjMyZmI2ZmE4LTExMjYtNDUxZi1iNjYzLWNjZDUxODg2YTY3OAAAAAOTanVtYgAAAClqdW1kYzJhcwARABCAAACqADibcQNjMnBhLmFzc2VydGlvbnMAAAAAuGp1bWIAAABEanVtZGNib3IAEQAQgAAAqgA4m3ETYzJwYS5pbmdyZWRpZW50LnYzAAAAABhjMnNo+VwaJ1upvoi806BdhOWkfQAAAGxjYm9yo2lkYzpmb3JtYXRpaW1hZ2UvcG5namluc3RhbmNlSUR4LHhtcDppaWQ6ZGFjNGE4ZTItZWRmNC00NzAyLTk2Y2MtN2Y0MDUwMDhhMjMzbHJlbGF0aW9uc2hpcGhwYXJlbnRPZgAAAeJqdW1iAAAAQWp1bWRjYm9yABEAEIAAAKoAOJtxE2MycGEuYWN0aW9ucy52MgAAAAAYYzJzaLvIFF5Wn8iCye2AFb7vLnYAAAGZY2JvcqJnYWN0aW9uc4KiZmFjdGlvbmtjMnBhLm9wZW5lZGpwYXJhbWV0ZXJzoWtpbmdyZWRpZW50c4GiY3VybHgtc2VsZiNqdW1iZj1jMnBhLmFzc2VydGlvbnMvYzJwYS5pbmdyZWRpZW50LnYzZGhhc2hYIAAakD4lermSdOYu3/7R84VAxVojnTA4bTIg8gaZJ/DwpGZhY3Rpb254HWNvbS5hbnRocm9waWMuY2xhdWRlLnByb3ZpZGVkanBhcmFtZXRlcnOheB9jb20uYW50aHJvcGljLm9yaWdpbi1jb25maWRlbmNlZ3Vua25vd25rZGVzY3JpcHRpb254ZkNsYXVkZSBwcm92aWRlZCB0aGlzIGZpbGUgYXQgdGhlIHJlcXVlc3Qgb2YgYSB1c2VyIGFuZCBtYXkgaGF2ZSBjcmVhdGVkIG9yIG1vZGlmaWVkIHRoZSBmaWxlIGNvbnRlbnRzLm1zb2Z0d2FyZUFnZW50oWRuYW1lZkNsYXVkZXJhbGxBY3Rpb25zSW5jbHVkZWT1AAAAyGp1bWIAAABAanVtZGNib3IAEQAQgAAAqgA4m3ETYzJwYS5oYXNoLmRhdGEAAAAAGGMyc2hkFnPFxSfCQvGALTCXZaIcAAAAgGNib3KlY2FsZ2ZzaGEyNTZjcGFkTQAAAAAAAAAAAAAAAABkaGFzaFggzNHUZO1XvLnqWzMQkZwBw79EyrmmJtXawwo+4G2umm1kbmFtZW5qdW1iZiBtYW5pZmVzdGpleGNsdXNpb25zgaJlc3RhcnQYIWZsZW5ndGgZFooAAAI+anVtYgAAACdqdW1kYzJjbAARABCAAACqADibcQNjMnBhLmNsYWltLnYyAAAAAg9jYm9ypWNhbGdmc2hhMjU2aXNpZ25hdHVyZXhNc2VsZiNqdW1iZj0vYzJwYS91cm46YzJwYTozMmZiNmZhOC0xMTI2LTQ1MWYtYjY2My1jY2Q1MTg4NmE2NzgvYzJwYS5zaWduYXR1cmVqaW5zdGFuY2VJRHgseG1wOmlpZDpiMzgyNmRlYi1mYTBmLTRjOWItODA5My1kMzliMTI2OGJlNzhyY3JlYXRlZF9hc3NlcnRpb25zg6JjdXJseC1zZWxmI2p1bWJmPWMycGEuYXNzZXJ0aW9ucy9jMnBhLmluZ3JlZGllbnQudjNkaGFzaFggABqQPiV6uZJ05i7f/tHzhUDFWiOdMDhtMiDyBpkn8PCiY3VybHgqc2VsZiNqdW1iZj1jMnBhLmFzc2VydGlvbnMvYzJwYS5hY3Rpb25zLnYyZGhhc2hYIDityKq1wXBSSCP59zmC5Oz8LkqepWOFOBwLoV+qBze3omN1cmx4KXNlbGYjanVtYmY9YzJwYS5hc3NlcnRpb25zL2MycGEuaGFzaC5kYXRhZGhhc2hYIBA9VW/A+1IeLoFvxQHnSgTO/dMOT1lq/oFtPevhSlIodGNsYWltX2dlbmVyYXRvcl9pbmZvo2RuYW1lb0FudGhyb3BpYyBGaWxlc2d2ZXJzaW9uZTEuMC4wa3NwZWNWZXJzaW9uZTIuNC4wAAAQOGp1bWIAAAAoanVtZGMyY3MAEQAQgAAAqgA4m3EDYzJwYS5zaWduYXR1cmUAAAAQCGNib3LShFkCEqIBJhghWQIKMIICBjCCAY2gAwIBAgIUQOWgCu7COdC+uIP6BkIFPWdVEwAwCgYIKoZIzj0EAwMwSTEXMBUGA1UEChMOQW50aHJvcGljLCBQQkMxLjAsBgNVBAMTJUFudGhyb3BpYyBDb250ZW50IENyZWRlbnRpYWxzIFJvb3QgQ0EwHhcNMjYwODA3MTg0MzU2WhcNMjgwODA2MTk0MzU2WjBEMRcwFQYDVQQKEw5BbnRocm9waWMsIFBCQzEpMCcGA1UEAxMgQW50aHJvcGljIENsYXVkZSBDb250ZW50IFNpZ25pbmcwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAASYegpry1AYBRTVNL1CpTlbROnY3dey+UrsF9C3phYrATN3ZHf93Mo8RQN0KOUuOn19P4oWNFWe5n2/She9N7eTo1gwVjAOBgNVHQ8BAf8EBAMCB4AwFQYDVR0lBA4wDAYKKwYBBAGD6F4CATAMBgNVHRMBAf8EAjAAMB8GA1UdIwQYMBaAFM5R4gSBTmRbI/jjxM+aPpzB11zCMAoGCCqGSM49BAMDA2cAMGQCMDFzHRSeAXrSy1WOzkbhPZ6Km2wGTmZ/2gK18k8BQGXyqz88Rdrz6CTX9flAnYNVxgIwcF9c3fVhqmJKpi+UhasNUMko69cyX6STPfta3Q8EjyzDjzoyrol46FP6VFHhvUcJoWNwYWRZDZ4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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rbfeSvbUm2++aSLo1q2bumEDAEC+l4XXYBUpUqRLly6KUB9//HG/fv3uuuuuwAzPPfecKlh6oGcPOuggsye56KKLxo8fH5jYvXv3YcOG7b333p9++mngKUVJ/38VGV9//XX7WAFr7ty577zzzvz58/WazZo169u3b8I31V/99NNPqmApHh1xxBGBZ1esWDFmzJh99903vCgomzZt0rbt3LmzySvnnXee3VxaPINMYlMDQFqy8yL32267TWNtSgzNmzevXr36iSee6D2laNWuXTs9uP/++y+55BKzhzn66KM1qBeY+P777+tfjabFPxVwwAEH+Oe54oorWrZseemll2pkRwOFylinnXaaf369polF0lKlSo0dO3bw4MHxY6a2fHXNNdfMmjUrJGCdccYZ8+bN69Wrl97l+OOPN3lC+TLlNoETbGoASEvWfotQeeLrr7/WQOEdd9zx+eef24kaFlRlS0OEJUqUeP75572Zd+/erdE01XtUyNFTZ555poo68a/5448/Ll++/JBDDjn77LPjn/3yyy///vtvJZVChQp5EydPnrxjx47ixYufcMIJ27dvVwRZsGDBypUrFXoqVqxoMs9eZ6aApcfffPNNIGB5brnlFgUsjRLGB6wBAwbo35tvvlkBK+Hr2wePPvqoMquKWMqvvXv3NnlCn682qYlV/vba6/+Md//xxx/6RJYtW7Z+/XrF1uOOO65MmTIRk58+qalTp+qBPmh93FqpGTNmqHnoQ7zgggv8n2+8VatWac5vv/322GOPVUPSBi9YsKB/BrUHtQrvxb3pajxaYD2Ib2AqIqp97r///iojmVA5aKIm1v61syxZsmT16tUHH3xw4cKFTznlFG0u78M1STZ1bjaU3m727Nna404//fTy5cvrM1LNVX+up84991ydKoT8rYL+okWL9ODCCy8MbF5r27Zt06ZNM7HcH6jy/vXXX9oHtZCq1+oD0lsfdthh8a+gnWXLli1aEe28gac2b948c+ZME6vq6UNJuCn04lq777//Xtvt3nvvPeaYY0wqUY5Ca9as+e6777TKWnH/dL2d/lAP4hdYBWztAvos9LnbKf6Dkh5ov9Ynq3evVKmSNpdJU1o7mo692iba/mrSpUuX1rZKuGW0jlpTfXBanl27dulPtBZqMGqWlStXXrx4sUm0y1veB6HFUNHd7btfe+21Bogs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t1o7HZbjr+swsf1XTdRugfBtla6IjT/KkSGEtpj+POF2yzN6d7WN7du3R5k54mZBStkZsFTcNrGaqn93tQWtC2LUh9lEZSmKaeRFA4slS5b0Jo4ePVpR7JBDDqlYseJhhx123nnnDR06NPBGL7zwgubRsbVUqVKVK1c+6aSTjj322FdeeUXHTW8evWzz5s31oH379t5lDffff7//df78888HH3zwyCOPLFu27Omnn37UUUe99tpr8eulxdYZpN5CY3NlypQ55phjGjduvG7dOv88GozX63fo0EHF5HLlyh166KHnn39+wleTbt26aeaWLVv6J2qNNFFbyT/xiSee0MQePXrY//bs2VP/feyxx4wLUTajf9U++eQTnU9rK5UvX17/atNpA+ZsThPr5NR5nHrqqUccccQ555yjLXbllVcq6eZsIWvUqKG3Vom0c+fO+uiPP/54tUZ/Ywv4/vvvr776an2UhQoVOvfcc7W0hx9+eK1atfwF/759++o17YUjBxxwgNeKknU2UZqc9OrVS3NqRexaN23aNH7jRGlyCXkfgfpOvb7dgzSyrO2TcLHDdzcFLzVm+4L+v1K3YaerJeu/t956q97LxPZob8W1SUOWM/zzSrn6+tvjjjvOxJKE9472apjwV1ZMr1u3rjb7WWedVbhwYR15NAQc2P7jx4+/5JJLDjroIOWbi2O0LgnH5TUwWqdOHY3laesVL15cjdn5tY9qnPaBzgBNquNMlGajlW3WrJmahLaM/lZrp7NfHQP9X53p3bu3/lx7rj5WuwW0rRo0aBCynA4bf8QjQwglTo2x6g/159qv9RkFzjEGDhyYcPE+/vhjTa9fv374SunooQcffPCBnqpZs6b31Lvvvmv/UPl10KBB2pvsnqUKqza196zHa6tRNguiy87bNGivVitZvny5QpX6KjtRj/fee291jfrX/tc7ZNjspb3Xe4WHH364a9eup5xySqdOnU477TQdPfXfa665RtN1uPRmGzVqlA5n11133YknnliwYEGdIrz++utq9+oP7P4gOoiMGzdO/Yc9QNiJ6u+9F9E+oBE39UOXX365WraOjDqw3n333XpNtXtvNp3FXnHFFTq3uOeee1Rp02FX1XsFHfVD+pOTTz7ZvwV01GvduvXZZ5+td1d3pYVMuKHs8ujtvCle9FSRRo/1t3a6nce/iRyKshk9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Rdnd/hUZWn01J72mXll1GkUrvXL8SYIyombQdihUqNDJJ58c/dupe4KU203DuKpsaTuoRKfUGLilu6WdV/umSl9K26reRby9n0NRjgwhtHZaR52majQw5MuDmzZt0tmaWr4qr/HfnM0lbWcdtfRBaLfSNoz+HXPkEgEL/xn+2ORqTgAAMiHLhwgBAADyHgELAADAsYJt2rQxwH+BhrOLFy9+4YUXprzIN/qcAABkAtdgAQAAOMYQIQAAgGMELAAAAMcIWAAAAI4RsAAAABwjYAEAADhGwAIAAHCMgAUAAOAYAQsAAMCxvP5lcgRcc801NWrU2L59u9mTDB8+vHHjxrVq1dKyffDBByZjRo4cWbdu3f79+3tT9HZ60z59+pi81bx5c73vvHnzTL6xa9curXLt2rXNvyrPdoGlS5fqje677z4DAJlHBSsvTJo0ady4cZUrV65WrVrgqa+//nr16tXq6swe46mnnnruuee8/9avX99kzPLlyz/66KPSpUt7U3755ZfPPvusfPnyJm/NnTtX77tp0yaTb+zevVurfOCBB6ac8/nnn//rr79atmy5997ujxjOd4FkS7t161atr/41AJB5BKy8MGXKlFatWj3xxBPxAev8889Xp16wYEGzZ1izZk3nzp1POeWU999/X7lnn332MXmrSJEi1atXL1asmMEeQ5FFrbRFixaZCFjOd4FkS3vQQQepaZUsWdIAQOYRsP5lyjFmT7JgwYI//vjj7LPPLlu2rPk31IsxyDfybBc4+eSTP/30UwMAeSLLA9aOHTt++umnDRs2qC5y/PHHpzxL1onv999/X7Ro0cKFC5s9w9KlS7ds2VKmTJm99vr/L5jTeIqSkMpLJUqUCCkqKCrNmzevVKlShxxyiIlGFSz9u//++yebQW89e/Zs9VVHHHGESWXlypU//PDDGWecEWVmh3Kw4gE//vij1tRJtePXX3/Vh/j777/rsRapUKFCEf9Qn8XPP/98wAEHnHDCCYcddlj4zH///ff8+fPVGIoXL77ffvslm23t2rWrVq1Sc8pE0XTz5s1aBq2gvwCZ1lokpD9ft26dPov//e9/JpO2b9+u5dcbHXroof7p+gTVHk466aRjjjkm5M83btyo2XRmkqzuqzFZjYBrdf7880/tzhoHP/jggw2ALJW1F7m/8MILlSpVOvDAA9WlVa5cWQfHY4899pVXXlE/5J/t2WefLVCgQIcOHSZNmnTOOeeoAzjvvPOUxmrUqLF69WpvtjvuuEOzdevWLf6NevTooaduvfXWZEuifqV58+Z60L59+wL/uP/+++2zSnL6r+19Lb21pkycOFFDdVoS9VU6ZB955JGPPfaYDtBaqquvvlo9jSZqCE9Z8Msvv4x/09GjR2v1FS8qVqxoV2ro0KEm1BdffKH3vemmm/R44MCBdjn9PaU20eWXX67XrFChgpZHG1bbTVHG/yL+hdeKK9RWrVp12rRpJrKePXvqFbSy9r/asPrvyy+/HD9nr1699NSNN97eFdgRAAAQAElEQVRocrfiARpgUkTQIOmpp56qZqN38T+rvK43PfPMMwN/pe2g6YEA0bt3b0WZo446Sk3r4hh93A0aNAhfAEV8fcTqy7UY5557rt7r8MMPr1WrljrvwJx6x3333Ve99YMPPqhPRE3i9NNP19u99tpr8S+rdqIeXXvBWWedpRds2LChTj9MKn379tW72EvTFJK8Bmz3Dm/3+fzzz8uVK6dcovE+++7R1yJkF9DGVyvSp6ANqBdv2rSpVjbHS6vwpMc6Gnjz2zavVr1s2bJLL71Uu5VtNvrXft3h1VdfVTPQJtUqaNPpOBC/0XRI6dixo2bTWYRdziuvvHLu3Ln+ebTYzZo1s6d52kRqCVWqVNFHlvdf5gCQZ7K2gjVq1Cidyl933XUnnniiTtanT5/++uuvK9aoI7Rxx2/ChAlt2rRRx6ODoM7C9befffaZ/tbLLvfcc8+AAQPUc+gQH/hbe4jUkTfZkug1x40bp47fdrF2YsqLuNXNjxkzpk6dOsoxM2fO1NBGp06d1IMqaixatOiqq65Sv6WXnTVrVt26dVUlUh/g/e3DDz/ctWtXRQT9yWmnnabyif57zTXXaLpyT7J3VDfWtm1bdUJDhgzREKE6CU30KkDKptp66s6feuopPaseq1+/fk888cRbb701Y8aMQMVLPa7W94orrlA80pm6f9nSpVd48803teWVIQJPabr+veWWW3K54n4KwVOmTGnZsqWCkf68e/fuTZo0Ue+rNTJpst/EtFFG3bM6V31M+rxUjAn/Q0WQJUuW3H333WrA6o+1GGoJH374obpkpZZAzUOZWyOqNvvqE5w6der48eP1t2r2iinebO+9956is/5WUUBZR0UUNaRrr73WpKKGqlahzaIdp1WrVl651L8YSletW7dWq1BTVzrRYqe7Fgm9+OKLml+Z7Oabb9ar6fFLL72kBqlUl5uljaeSnkKP5tHS6r96Ix0u1K60UtrxldEfeeQRVZ70geogoM/R/xWQbdu21axZ86uvvqpevbpm05rqI9bOq7ipba791M6mEwadnqnerE9BJwB2+yjeqaBoAGSpAjpAm2yknBQYUFixYoXGqhS2dNz3ntLBWgdiPWgdo9NZExsRUCekQ6p6Dn8k0qFTkevCCy/0XlOdsQ6XOm4q9IQsTJcuXZTqFEf8h2ZLp+8KKxoE9PoA9YuKd+ob9K96IzuxXbt2Tz/9tHoXhRXlKo3Qmdips47g6g/0snpxO6eimM7FL7nkkpEjR+ok3k7U619wwQU6q1bPofpTyKIqMKlruf3229WXeBO1QbSOGgFR9FSHZydu3bq1WrVq6tGVZlq0aBFY+E8++cTbdCFUolCCUfejPslOUQXrvvvue/TRRxUFTCxAqIqmupE2vhKw94fqpBWh1NstX77cDp7mcsXtkuulJk+erAKGnag2oJqEPiDVM+xXHbUk2vhqSIEShXp0vamqF7/99pudokSofDZ48ODrr7/eP6cWKXzgUk1XM9im6FHnrYyo9KBm4E208yjBaN1tkzCxjPjkk0+qv/euN9KyadhLG0qrprhgJ6pr1wbRRFV5U36xTrFJZSGNoAWStLf7qH3qTXO2FiG7gGK6FxNV0NKup3k080EHHZSDpdXJgz447bDKo3aKIo5tpSq2Ka/b+Tds2KDPWiObWv6HHnrIy3M6kVBj0KFDC+A1MK2I1l3rpZK590bffvut5jz66KP1wH5JU013zpw5+kOVwfyLlLIxAPjvytohwvjLNXRyqaqMssI333wTeEpxSgdKrzNQ6d4OPOn46M1jb5/jv2OTqCpmYvUt49q9997rpSu58847TexwrAKS15UqDdx1113+5fzrr79UrTGxmOL1ASZWiLJd2ttvv23Sp9SldKWuzktXJvadLC2MiYWkwPzaIFHSVRT6UGyNatCgQf7pNv/pKZuuXK24ijpeujKxrzQ2atRIQTakapKM+mn9qwpWYHrKDlVNN5BLRIthYsN88fNr2bwmYf5pqP4bemmbKEgpQ3jpSjR45+qOUNp9VPMLTEx3LeKpnuQvwiko66PRSKJOkIxTqsuq0umlMY302cqTisQ2PlrKo6pEKjgqZNspqkIpL6pwaE8GPMpnKluqTKjTDDtl/fr1epf4XEi6ArJYNl/kruKHzno1NqEhAHvpxsqVK/WvRnwCcyrKBK751QiLid2lyZuiyKVCi4bPVOq318DqvN+e9aa8qiYH/OnKxI71ShLq6atWreqfrgTgX06VVXSarirXqaeeGnhBe722RqlM+ux1M6oPBaZrcERLpS2saoE/1vg78txTuFSRQJta3Zi9fFjb4Y033jC+kVlXK+7v0S2VgtTLjh071qRJJU8FU4UYdd4qvQSum05JxbNp06apxdqgZivN6rPj5wzc+0NvpNqJCjBqn7ZHVzXIJFo1faCPP/64yTXFDv83MHK2FvHiM7r2Sr2aWrsKUcYdlUJPOOEE/xS7WynSBS5X93Y3/YkejBgxQi1fY6Pxq6+Kr/5dvHix/a8KWh988EH9+vWVhjV6GPItBABZI2sDls4dmzVr5i9BeZS3AlPiv9hlj4D+K7hV6r/tttvUWaprt5eoqyiybdu2m266KTfXGCUTWCQdwZXk9HaBrzfa5fTugm0v79XpcnzxwIrYtwUoQunf4447LjBdgziaqP5GHYn/uu/4OXND5RnFzQkTJmjsz971VHFHPbfGekqVKmXncbXi8UtetGhRE7vUxqRJ0UodsBa7Tp06JtZ+FI5VwrH/DbFjxw79rZpZ/AXd/sRv6SOI/2qb1ypswLLNI9mq5Z6NHQFprUVCyfZK5/d8j38jVZuiLICqWfp36NChyVqddy6ncVuNMH4Wo/9qoFB5VydsZcqUMQCyVHYGrO+//15jPfbbPSrsq4dWX6IaVevWrdu2bRt/2Vmy42NAkyZNFLB69+5tA5YdH7SDd84lW6TwRbXfYrMDWwlniB+xys3CJJvB9k8O3XrrrUoqKmLZgBV/eburFU92SWLKG2zG/6E643Hjxo0ZM0YpX4lw/Pjxo2N69OgRPjb34IMP9uvXT9VBVUZVflPZRoNWO3fuVDUl/nbnUZquHYfK3NWWCesxaa1FQhH3ytzL2b5mYsVCE7tR6mWXXZZwBu+qQVW8VGTVWZ/qrMOGDVOTUBvWCcOoUaP832oEkE2yM2ANHz5cJ5fPPffco48+6p8ePziYllNOOUWjKjpKTpkyRbWByZMnayDgkksuMXuM008/3cSu/nnyySeTjdrkgL1Zgx1g9VN/aSdm+u7YN9xwQ9OmTVUQWrdunXpofb6q59k7SliuVjx+HW2bsa9vYl/+N7Fv3QdmW7FiRfyrKdNfEaN2qBk0SKQHjzzySN26dQNjUh6dFagyqkhk19GbnrPSo3XSSSeZ5KuWCZlYiz2QHY/2rvMLp4h/fYxGCWfNmjVo0KBu3bo1btx4zpw5BkA2ys6L3O1lsPYyCI/GLCZOnGhy59577zWx2tWrr76qBw0bNoxeQsiDn7NVLUFrrZHNDz/80Lhjr6H2rtj1qDyjrlTPZvqaEsXZq6++Wnnurbfeeuedd7SC9erV8990ytWK2xGc+Cne/cA0HqfEoLASuKGailWhL/z/vmOhwqcqOlrI6dOnJ5tNw2e///673i7wDbiUrx/CXlAYv2rxH2gy9isj0RtwJtYiunSXNsfslVhff/11xEFPT7ly5VQLVwNWWctenQYg+2RnwLKn7N6XsU3sW2bNmzfP2SXefqo9qLt6J0YDYREvb7cXqWjg0mSe/UrjAw88MHXq1MBTq1atWrBggUnfVVddpcrNp59+6u+St27dau86EXKTVYduu+02E/sWpzJWwjd1suLvvffejBkzvP/+8ssvGhE2vqvpladr1aql9DBw4EBvtu+++y7+a4YKE4GxMDVCe1FgyDVqqmxpU+sMwV9wUsEjcBOEtFx33XUazBo6dKgqr97EtWvXvvLKKxFfQenQ/N8v1YbLxFpEl+7S5piOM3Xq1NmyZYsaZ/yVnVrfX3/91cQu5Yz/4qSORb/99ps+F+88QePIalohd9QD8N+SnUOE6n07deqkCrzGZVSTX7p0qbpDdbEXXXRRxK+IJ7P33nvfddddrVq10lFV41bhP53h0fsee+yxqvecd955tppVu3bt+HuWOqEcqVrFxx9/rPdSmadGjRpHH320RjPVuapwoj7VG+2KTj2WstTDDz+s7sR/o1FFGZ3EO/kmWkoXX3yx+jN79wEFVpWCAjM4WfFzzz1Xo8D+G40qY2lcz3+RjaqYw4YNa9SokRKzKjTqyEeOHFmxYkXN6X8pvcjGjRvVWs455xyVu9TdaraFCxdWq1ZNGzDZAmh8U6+vpluhQgW1EI29fvTRR2+88UblypVz3HQVd3r16qUQcPnll2upvBuN6mONWHrR564tqa3qXVT07rvvhvz8USbWIrp0lzY3+vTpo0/2iy++0HChgqwaj2LT1BgdcJS8jzzySAWsKlWqXHjhhRrULlWqlA4d06ZN0yKZ2JVq3oi22o8OEfwWNZA1sjNgFS1aVF2gRmTejzGx4cLBgwcvWrQo98d3G7BMOpe3K1S9+eabGk/0iivxdxNwRSWW0aNHq29r3br1BzHeU+pQ7aBGDjRr1kx/3qRJE/+dgVTZ0mip/wYNmaP1UkRo27at8d3+KjBD7ldcrz9q1CiFSHuVlaqVqmDZcWGPOtEePXo88sgjCvEmFiYU6Nu1axe4rEobR2VO/w2i1NfqlZVHwy+Z10upS9b72uSqmdUxd+zYMTe/j3njjTdqI6g7936DqH79+l26dPHfQCvEQw899NNPP/Xt29cbZwz/yZoMrUVEOVjaHNPqzJ8/X+uoNe0X4z1Vvnx5feIm9sueOmioQNW4cWPvWSUtzZyhr8gA2BNk7Z3cTexrUzpTX7ZsWcGCBVXVcPXrtopoOh9VQtLpaZ590SkHdu7cqTqTRi40lqdKmxJG7pdWY14qCuo1FRnVYad7b6e8kfsVVy1BWVx1spBygtKDRnnWr1+vEBYSUxSpt2/fvs8++2hzKYFFvwB/27Zt6rn1b7FixVzdT8HERgZVcitUqJB3h4uMytBa7IH0KavZrFmzRmFOzSb+1hU7duxQMVUHpQMPPFBtJnBLdwDZJ5sDVobcfvvtgwYN6ty5s711OAAAQAABKw2bNm3q37+/xoZUF1myZEneDI0BAID/nGz+qRy3LrnkkvHjx9vHgR+8AwAA8KOCFdXrr79ubyZZtWrVCy+80AAAACRBwAIAAHCMIUIAAADHCFgAAACOEbAAAAAcI2ABAAA4RsACAABwjIAFAADgGAELAADAMQIWAACAYwQsAAAAxwhYAAAAjhGwAAAAHCNgAQAAOEbAAgAAcIyABQAA4BgBCwAAwDECFgAAgGMELAAAAMcIWAAAAI4RsAAAABwjYAEAADhGwAIAAHCMgAUAAOAYAQsAAMAx5tsu5AAAAvJJREFUAhYAAIBjBCwAAADHCFgAAACOEbAAAAAcI2ABAAA4RsACAABwjIAFAADgGAELAADAMQIWAACAYwQsAAAAxwhYAAAAjhGwAAAAHCNgAQAAOEbAAgAAcIyABQAA4BgBCwAAwDECFgAAgGMELAAAAMcIWAAAAI4RsAAAABwjYAEAADhGwAIAAHCMgAUAAOAYAQsAAMAxAhYAAIBjBCwAAADHCFgAAACOEbAAAAAcI2ABAAA4RsACAABwjIAFAADgGAELAADAMQIWAACAYwQsAAAAxwhYAAAAjhGwAAAAHCNgAQAAOEbAAgAAcIyABQAA4BgBCwAAwDECFgAAgGMELAAAAMcIWAAAAI4RsAAAABwjYAEAADhGwAIAAHCMgAUAAOAYAQsAAMAxAhYAAIBjBCwAAADHCFgAAACOEbAAGACAWwQsAAAAxwhYAAAAjhGwAAAAHCNgAQAAOEbAAgAAcIyABQAA4BgBCwAAwDECFgAAgGMELAAAAMcIWAAAAI4RsAAAABwjYAEAADhGwAIAAHCMgAUAAOAYAQsAAMAxAhYAAIBjBCwAAADHCFgAAACOEbAAAAAcI2ABAAA4RsACAABwjIAFAADgGAELAADAMQIWAACAYwQsAAAAxwhYAAAAjhGwAAAAHCNgAQAAOEbAAgAAcIyABQAA4BgBCwAAwDECFgAAgGMELAAAAMcIWAAAAI4RsAAAABwjYAEAADhGwAIAAHCMgAUAAOAYAQsAAMAxAhYAAIBjBCwAAADHCFgAAACOEbAAAAAcI2ABAAA4RsACAABwjIAFAADgGAELAADAMQIWAACAYwQsAAAAxwhYAAAAjhGwAAAAHCNgAQAAOEbAAgAAcIyABQAA4BgBCwAAwDECFgAAgGMELAAAAMcIWAAAAI4RsAAAABwjYAEAADhGwAIAAHCMgAUAAOAYAQsAAMAxAhYAAIBjBCwAAADHCFgAAACOEbAAAAAcI2ABAAA4RsACAABwjIAFAADg2P8HAAD///4gixsAAAAGSURBVAMAp9n/vLV1RrgAAAAASUVORK5CYII=");var ts=fe("iVBORw0KGgoAAAANSUhEUgAAAyAAAAHgCAIAAADSZZ6iAAAWfmNhQlgAABZ+anVtYgAAAB5qdW1kYzJwYQARABCAAACqADibcQNjMnBhAAAAFlhqdW1iAAAAR2p1bWRjMm1hABEAEIAAAKoAOJtxA3VybjpjMnBhOjgyMmExZGJjLWVmOWQtNDFkMC1hYjkxLWJmZmU4YzFiN2RlMgAAAAOTanVtYgAAAClqdW1kYzJhcwARABCAAACqADibcQNjMnBhLmFzc2VydGlvbnMAAAAAuGp1bWIAAABEanVtZGNib3IAEQAQgAAAqgA4m3ETYzJwYS5pbmdyZWRpZW50LnYzAAAAABhjMnNo1+xI9SZbyjAshUx5vLfR1AAAAGxjYm9yo2lkYzpmb3JtYXRpaW1hZ2UvcG5namluc3RhbmNlSUR4LHhtcDppaWQ6NzQzMGQxZDEtZDVjNy00YWIwLTg0MDAtY2FlNDY5MzgyOTlmbHJlbGF0aW9uc2hpcGhwYXJlbnRPZgAAAeJqdW1iAAAAQWp1bWRjYm9yABEAEIAAAKoAOJtxE2MycGEuYWN0aW9ucy52MgAAAAAYYzJzaCLqYOw/0vurATatSHe/ZucAAAGZY2JvcqJnYWN0aW9uc4KiZmFjdGlvbmtjMnBhLm9wZW5lZGpwYXJhbWV0ZXJzoWtpbmdyZWRpZW50c4GiY3VybHgtc2VsZiNqdW1iZj1jMnBhLmFzc2VydGlvbnMvYzJwYS5pbmdyZWRpZW50LnYzZGhhc2hYIEH5ILLBrZgnHhbNQwehZ3eeUOV4RW/Bgjne2l8XpbMapGZhY3Rpb254HWNvbS5hbnRocm9waWMuY2xhdWRlLnByb3ZpZGVkanBhcmFtZXRlcnOheB9jb20uYW50aHJvcGljLm9yaWdpbi1jb25maWRlbmNlZ3Vua25vd25rZGVzY3JpcHRpb254ZkNsYXVkZSBwcm92aWRlZCB0aGlzIGZpbGUgYXQgdGhlIHJlcXVlc3Qgb2YgYSB1c2VyIGFuZCBtYXkgaGF2ZSBjcmVhdGVkIG9yIG1vZGlmaWVkIHRoZSBmaWxlIGNvbnRlbnRzLm1zb2Z0d2FyZUFnZW50oWRuYW1lZkNsYXVkZXJhbGxBY3Rpb25zSW5jbHVkZWT1AAAAyGp1bWIAAABAanVtZGNib3IAEQAQgAAAqgA4m3ETYzJwYS5oYXNoLmRhdGEAAAAAGGMyc2iWxD0HHB0QMqRfgPD3w4I/AAAAgGNib3KlY2FsZ2ZzaGEyNTZjcGFkTQAAAAAAAAAAAAAAAABkaGFzaFggBEXVSrlLs0ufsPG40HUw01Y6+w8pTkzKyq+NVL6ADO9kbmFtZW5qdW1iZiBtYW5pZmVzdGpleGNsdXNpb25zgaJlc3RhcnQYIWZsZW5ndGgZFooAAAI+anVtYgAAACdqdW1kYzJjbAARABCAAACqADibcQNjMnBhLmNsYWltLnYyAAAAAg9jYm9ypWNhbGdmc2hhMjU2aXNpZ25hdHVyZXhNc2VsZiNqdW1iZj0vYzJwYS91cm46YzJwYTo4MjJhMWRiYy1lZjlkLTQxZDAtYWI5MS1iZmZlOGMxYjdkZTIvYzJwYS5zaWduYXR1cmVqaW5zdGFuY2VJRHgseG1wOmlpZDo4NmM2YjNmZS0wMDMxLTRjOWYtOTEwNC1lMTliYTQ1YjRjMjhyY3JlYXRlZF9hc3NlcnRpb25zg6JjdXJseC1zZWxmI2p1bWJmPWMycGEuYXNzZXJ0aW9ucy9jMnBhLmluZ3JlZGllbnQudjNkaGFzaFggQfkgssGtmCceFs1DB6Fnd55Q5XhFb8GCOd7aXxelsxqiY3VybHgqc2VsZiNqdW1iZj1jMnBhLmFzc2VydGlvbnMvYzJwYS5hY3Rpb25zLnYyZGhhc2hYILYaU1pzLM40y1xgYxJ2RGdsc72BL8/p8N3pQYNaZWImomN1cmx4KXNlbGYjanVtYmY9YzJwYS5hc3NlcnRpb25zL2MycGEuaGFzaC5kYXRhZGhhc2hYIEDting7aBDHDUvDwVVqsURbNCfLF2BtHNEZSLl455AOdGNsYWltX2dlbmVyYXRvcl9pbmZvo2RuYW1lb0FudGhyb3BpYyBGaWxlc2d2ZXJzaW9uZTEuMC4wa3NwZWNWZXJzaW9uZTIuNC4wAAAQOGp1bWIAAAAoanVtZGMyY3MAEQAQgAAAqgA4m3EDYzJwYS5zaWduYXR1cmUAAAAQCGNib3LShFkCEqIBJhghWQIKMIICBjCCAY2gAwIBAgIUQOWgCu7COdC+uIP6BkIFPWdVEwAwCgYIKoZIzj0EAwMwSTEXMBUGA1UEChMOQW50aHJvcGljLCBQQkMxLjAsBgNVBAMTJUFudGhyb3BpYyBDb250ZW50IENyZWRlbnRpYWxzIFJvb3QgQ0EwHhcNMjYwODA3MTg0MzU2WhcNMjgwODA2MTk0MzU2WjBEMRcwFQYDVQQKEw5BbnRocm9waWMsIFBCQzEpMCcGA1UEAxMgQW50aHJvcGljIENsYXVkZSBDb250ZW50IFNpZ25pbmcwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAASYegpry1AYBRTVNL1CpTlbROnY3dey+UrsF9C3phYrATN3ZHf93Mo8RQN0KOUuOn19P4oWNFWe5n2/She9N7eTo1gwVjAOBgNVHQ8BAf8EBAMCB4AwFQYDVR0lBA4wDAYKKwYBBAGD6F4CATAMBgNVHRMBAf8EAjAAMB8GA1UdIwQYMBaAFM5R4gSBTmRbI/jjxM+aPpzB11zCMAoGCCqGSM49BAMDA2cAMGQCMDFzHRSeAXrSy1WOzkbhPZ6Km2wGTmZ/2gK18k8BQGXyqz88Rdrz6CTX9flAnYNVxgIwcF9c3fVhqmJKpi+UhasNUMko69cyX6STPfta3Q8EjyzDjzoyrol46FP6VFHhvUcJoWNwYWRZDZ4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD2WECzgYaqZSUN579QAO7VICFB9lkskwp2cwmVa85mm0lQBG0RsiJ+SkY54qMOmWr+8k6NjxJ66J5JfEOU3WfPXBd72OlEXAAAEABJREFUeJzs3Xe01NTagPHY9dp7b6hgV7D3CvaOHRW7omJBvXYRe+9dVMSuWLBhu4oNFLyioFzs4gUpKhYsiOV7vtnLrNwpOZk5mQMcnt8fZ83JZJJMsrP3u9+dZKb/66+/IkmSJOVn+kiSJEm5MsCSJEnKmQGWJElSzgywJEmScmaAJUmSlDMDLEmSpJwZYEmSJOXMAEuSJClnBliSJEk5M8CSJEnKmQGWJElSzgywJEmScmaAJUmSlDMDLEmSpJwZYEmSJOXMAEuSJClnBliSJEk5M8CSJEnKmQGWJElSzgywJEmScmaAJUmSlDMDLEmSpJwZYEmSJOXMAEuSJClnBliSJEk5M8CSJEnKmQGWJElSzgywJEmScmaAJUmSlDMDLEmSpJwZYEmSJOXMAEuSJClnBliSJEk5M8CSJEnKmQGWJElSzgywJEmScmaAJUmSlDMDLEmSpJwZYEmSJOXMAEuSJClnBliSJEk5M8CSJEnKmQGWJElSzgywJEmScmaAJUmSlDMDLEmSpJwZYEmSJOXMAEuSJClnBliSJEk5M8CSJEnKmQGWJElSzgywJEmScmaAJUmSlDMDLEmSpJwZYEmSJOXMAEuSJClnBliSJEk5M8CSJEnKmQGWJElSzgywJEmScmaAJUmSlDMDLEmSpJwZYEmSJOXMAEuSJClnBliSJEk5M8CSJEnKmQGWJElSzgywJEmScmaAJUmSlDMDLEmSpJwZYEmSJOXMAEuSJClnBliSJEk5M8CSJEnKmQGWJElSzgywJEmScmaAJUmSlDMDLEmSpJwZYEmSJOXMAEuSJClnBliSJEk5M8CSJEnKmQGWJElSzgywJEmScmaAJUmSlDMDLEmSpJwZYEmSJOXMAEuSJClnBliSJEk5M8CSJEnKmQGWJElSzgywJEmScmaAJUmSlDMDLEmSpJwZYEmSJOXMAEuSJClnBliSJEk5M8CSJEnKmQGWJElSzgywJEmScmaAJUmSlDMDLEmSpJwZYEmSJOXMAEuSJClnBliSJEk5M8CSJEnKmQGWJElSzgywJEmScmaAJUmSlDMDLEmSpJwZYEmSJOXMAEuSJClnBliSJEk5M8CSJEnKmQGWJElSzgywJEmScmaAJUmSlDMDLEmSpJwZYEmSJOXMAEuSJClnBliSJEk5M8CSJEnKmQGWJElSzgywJEmScmaAJUmSlDMDLEmSpJwZYEmSJOXMAEuSJClnBliSJEk5M8CSJEnKmQGWJElSzgywJEmScmaAJUmSlDMDLEmSpJwZYEmSJOXMAEuSJClnBliSJEk5M8CSJEnKmQGWJElSzgywJEmScmaAJUmSlDMDLEmSpJwZYEmSJOXMAEuSJClnBliSJEk5M8CSJEnKmQGWJElSzgywJEmScmaAJUmSlDMDLEmSpJwZYEmSJOVs2kiSlMHnn38+TWU9evSIJOlvU2kG6/nnn3/vvfc++OADaswxY8Z8/fXXo0aNmn/++eebb74FFlhgrrnmmqdgwQUXbNWq1VJLLdWyZcuZZ545kiRJymDqCrCGDx9+ww033H333SNGjCh9d2zB0KFDy352o4022myzzbbcckteRJIkSZVNLUOEEyZMOO+881ZeeeWLL764bHTVoFdffbVbt24bb7zxPffcE0mqHnnilCG2Bx54IJKk5mKqyGD9/PPP22yzzSuvvBJJkiTV31QRYO22225GV5Ikqck0/wDr+uuv79OnTyRJktRUmnmANW7cuG7dukWSJElNqJkHWA888MCYMWPS59l9993XWmuteeedd7755pt11llHjhzJR0aMGDF48OD333//q6++iiRJkqrRzAOsF198MeXdE088sWvXrgRVKfMMGzbs0Ucf7d27d79+/SJJkqQMmnmARRaq0luHHnropZdeGjWkVatWpxR8+umn3bt3z+UZDX/99dd3333H8CV/f/3110UWWWSxxRabfvo6HgtWFJ7y9dtvv7G6ZZZZZrrppsv+cTb122+/5S8fn7eAbF9UN2zntwVsJCtidXPOOWfUVPiao0eP/uabb1j14osv/o9//COaXE2YMIFUK1tLJ2HRRRdlR0V5Yz+Eo//HH3/MM888c8899wILLBA1U6NGjSJjzV5doGC22WaLJpE///yTPc+JwF/+XXrppakiMn6W6iX+LAVj7oKmPIMmW1PQqa3moZkHWOSfKr3Vvn37qBotWrQ4v4DGJqoetXafPn1Igw0YMIC/v/zyS/LdaaedlrhnqaWWWmGFFdZZZ50tttiC15UW9dprr7300ktl3yJKO/XUU+N/CQp79Ohx1113ff7558nZLr/88hNOOCFKRfKvb9++bOoLL7xQdoa2bdtusskmW2+99RprrBE1zs8///z000/zvfr37//mm2+WzkBrt+mmm2600UY77rjjEkssEWVGQMxOKPsWB3TfffeN/yVSufPOO2+//fai+Vu2bLnBBhsccMABfNmonrIf1vHjx993331s7RtvvJGcbcEFF9xwww232247tpYSFdWKY/HKK69wIF5++eWyM6xbwOHYZpttZplllvSlsUvjJ8+x5SlzPvbYYx9++GGld7t06VKnFvGBBx545JFHOD1/+OGH5PS11lqLbtgee+zR+Ogkezl8/fXX7777bo7v999/n5yNemPNNdcs+izh4NChQ99///0PC4gexowZQ2j1+++/F83JrltppZXoLq6yyip777034UWUwbnnnlvpraOPPpq4raoPFhXjIhQSikrZt8p+cAo6tTXVmobuTtRMkbZJqQK++OKLqprqmtEtvuGGG26++eYGrwZLWm+99a688kqCrdK3Lrnkkn/+859lP0U1+tNPP4XXF1544VlnnVVa1UapARaR3x133HH99dd/8MEHUTZEWmwPQWFUPXbOtddee9ttt2XcOTPOOON+++1HQnHZZZfNMv8OO+zw5JNPln1r++23f+KJJ3hBWu6CCy5gd/EiZVFU2TfddFP9shoZDyvtCkPb7LeURbVu3ZrZCNajahBe3HrrrZTVSu1WqYUXXviII4446qijUpJnG2+88auvvho1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u8RV9A8POuigspeHt27dOuXmhnThRx1Kp48fP75///7s29GjRyenU8BSAix6sKNGjarHAxqkyYcBVkVrr732LLPMUmmko2wokx5DpN9jOElQHVPNlX1r/fXXL/uw0JqlpzQOP/zw9N8oVI5o1AmAKuVsSCpMnDix9NdXSmdLebd+j4yq2eQZYFUr5fHlJMOefvppoqhKMzTmZyIZ5isbYEWFpFpp92attdaKH/JOb43yUBSBvfjiiykBVsqzIaQpRTMfIqzt8UgBjVBKTqXsfeyrrrpqVNlTTz3V4GOOm9jqq69e6a0Gn1lfLUYZUkZDan5qhmqTMgLO2G6DD7J67733itrLJNr4ssM0jXzwRyMtssgiKTHWwIEDG7xPYpI/3+ubb7754osvKr277777pkRXZNCrvU4xKf1pWCkXYAWlT8PiI2UfRxzU6ZFjUlNq5gHWWWed1bJlyxtvvPHXX3+NqvTBBx+UffRLUHZ8rfQXLZLGjh17yimnRJOTlKcrkZ8YOnRolJ+ZZpop5UGOjQmFVYN27dqlvHvttddGqdJ/MnmrrbYqOz39AsF632dKlynloeS//fZb+m9qcTrk3uuoVsrDFKLU/hLuvvvuqBFIQVV6APqrr77at2/foolFu7p0lLBXr16VkqA1P19Umqw0/4vcGZjr1KnTMsss889//jPlOc5F6OodddRRKTOUfao4HfT0x1DdfPPNRc8+roSIsAmu2Sr7W12xLl26pN8XWRa90h122KHsBTrp8dyFF14YVen333+/66672rdvH6lK6YeekaayT3oLSKL07Nkz5eOVAqz0y+zef//9qM7Sf0KKAOunn36q9O7ll18eTWrpV2enPH1j+PDhl156adQ4lcLT77//vvR8L5p5gw02KJohJZ72Aiw1D1PLXYQjR4685JJL1lxzTQKjrl279unTp1K2fNSoUVdddRX57fScSqUMdqWfa42Rab/gggtS7hgnpmG8bJ111mmCH3QjvZcS9DzzzDOHH354lA2V+x133MFms2cqXSay++67p9xBfdppp3Xv3j3Khrj54osvXnbZZQ844AByjZGqtPzyy6f/MgxdhbI/bcTeTn9A0SqrrFL6bMlYyqOkbrrppvS4rfH23HPPlHHqESNGcHqWbfhPPvnk7IWzfhZffPGUCz0feeSRshULvTW6iz///HPUONkfTEVNG1+AFay00krZL8ur+QlY0mRlqrvI/f2C8JqM+hJLLDFPAQNYtBy8lTFvVJrxDsiiH3jggYQalT7ISMTpp5/eu3fvDh06LLfcci1atFhyySWJ6uhivvnmm6+99hqBXVNeqkW0V/ZnfwIalRdffJHWpdKP07311ltsMwmPLJen0LadeuqpKT+pe8ghh7BG9s92221X+u4vv/xC/o+4k7337rvvRmqcc845J2XMa/To0euvv/65557LwPeKK65Ie0lOixzw+eefn/7ETj6ScmfcqquumnKK7V9A8Ff0UACyL+njXxlxmrP8lAFQyjOpl+OOO47tJFL85JNPqBYYzHr44YejycNqq61W6VwbOHAg5ymZtuTjGIYMGbL33nvzN2o04h6ObJanm5Z9Nj15qQceeKChj/5/LbHWWmtF0pRvqr6LcFBBVL1jjjkm5WqSyy67jBRU/FsQZb1ZEE0GWrdufdZZZ3Xr1q3SDHyRTgVkpwgHGWz98ccfyVfRAPMV0i8KKcWuIzxKadfJmmy//fZzzz03LRzroqH9uoAcZOmFtGoM4icOR/rlVmeeeWZUjV133XWnnXZKmYFMBomWKNV/CpJTcuxynHTSSXfeeWdKuR06dGj2xG3TI+xL6czcdtttnF/EiJyqY8aMoR9CFZfXA99nnXVWOpall1uVKhtgMTFLgNWuXbtJezOElBcf01C1+eefPyUciQrPI6DLS03U+Jx80zj77LMHDBhQ6Yd7Y3kFhffccw+xWnoAOm7cuL4FkeqJbEf//v05+lEeyMj26NEjfZ699tqLHFiOv/FSLUbZunbt2qVLl2jKRI6KLG9KgEhc9dBDD5V9i25hIyslslBZzsqyY3yVsv5ZPitNiXySe3WIrp588skGn2nZpk2bm2++udpHCE4qbCdBT9nL9uthgQUWePDBB30u6ORghhlmIKmw0EILRY3GyA7tetGVN6UYbTz00EOjSeqEE05IuUosRfpDPptGy5Yta7vcnkR1q1atosbJEv2Qey770Dtyb1nOegMsNRsGWFWgg87Y39prr51l5g4dOrz66qtLL710NCVgSI6xuSZ71Odaa601cODAlAflq8lQRP/973/XFnDEGGh+++23M/5W+qWXXtr4lr6RHn/88ZRHRpWaccYZn3vuOTKv0WSACHXnnXeu6iNUR+ecc07UaBtssEGDP8ZVKVNFR67Bp1sttthiyy+/fCQ1C808wCJTcv3112+55ZaN/Pl0qobOnTu/++67K620UvZPrb/++oMGDTr++OMb7NZPDtjI22+/nT1GjiFqhK233vrqq6+u9MtlsWWWWeaNN9644IILyj6yNaP55ptv3333Pe+88yI1wsILL8y4z4UXXljD49dJXJ1++umEaBzQjB+ZffbZGZekyY8mHVIpffr0yfi48BVWWIH9U/qozEmIXBrFPkvFwt4mom1w6DYjKtIGM0xlL8Bq8K0g/fFs0pSlmQdYjH106tTp+eefHz58OKNgJ598MsFWVb8huuSSS5JaHzZsGEHDLLPMElVpjjnmuOKKK0aMGHHdddeRtsk4aLjsssuedNJJ6XfR18nuu+/+/vvv0/bQRc4+isemnnrqqb179/7xxx+feeaZlPsEi/Cp0aNH33HHHdkzKARkbBuRGdnEsWPH3n333bvuumukRjvllFNGjRp1yy230DHIMj/j4FdddRVnVg0BLkWrZ8+en3zyCScXWY1J0gOhIL344otEHim9JvoJXbt2JXxcd911o8nJTDPNRFw7ePDgHXbYodI81FdEsfTxTjzxxBwvV2gwwEp5ilWDl2E5PqjmZJq//vormvqMHDny008//eyzz7788suvv/76u4JffvmF2Iuqf5555llkkUVaFTSYianK+PERnIUsAAAQAElEQVTj33zzzQEDBowZM4Y1fv/997/++iv5g8UXX5y/SyyxBBEhr9N/hrkpvffeeyQb2FHf/Y0BAjYv7KLlClKebFQtBlUZOuTohHURroXDQaaKncOKWrZsmfKsfOWFgsqQMceCgjqu4I8//pi7gGOx+uqr01JW1VGZzA0ZMoSOwRdffEGIOWHCBL7j/PPPT4+I/kY02fvqq68G/43ajI3nDKXuSn/ol6R6m0oDLEmSpPrxMQ2SJEk5M8CSJEnKmQGWJElSzgywJEmScmaAJUmSlDMDLEmSpJwZYEmSJOXMAEuSJClnBliSJEk5M8CSJEnKmQGWJElSzgywJEmScmaAJUmSlDMDLEmSpJwZYEmSJOXMAEuSJClnBliSJEk5M8CSJEnKmQGWJElSzgywJEmScmaAJUmSlDMDLEmSpJwZYEmSJOXMAEuSJClnBliSJEk5M8CSJEnKmQGWJElSzgywJEmScmaAJUmSlDMDLEmSpJwZYEmSJOXMAEuSJClnBliSJEk5M8CSJEnKmQGWJElSzgywJEmScmaAJUmSlDMDLEmSpJwZYEmSJOVs2kgFF154Ydu2bc8444xI+tvRRx/drl277t27Z5z/448/blswYsSIaArRq1cvNnifffaJmiO+F9/uwQcfzDh/v379whH87bffIjWJo446ih1+2223RVLz0twyWF9//fX888+fff4555zzu+++48WwYcNeeOGF2WabLZL+9s4777zxxhtrr712xvnHjx9PKeLFL7/8EjXOLrvs8thjj80wwwzJln7MmDEffPABLzbZZJNpppkmygOxINu89NJLR1Mgdg4HiBerrbba3HPPXTpD//79P/vss2222Sbb8qJvv/02HME///wzUpPgLCOuzX6WNdKHH344cuRIav7WrVtHUj2ZwZKmGC+99NJmBX/88UekQjwUdsi///3vSMrgmmuuocB06dIlkuqsuWWw6JfQCBVN7Nu3b9euXXlx3XXXrbTSSsm3pptuukia/Hz++ef8ZYAyUhNad911QwUy44wzRmoS11577Y8//rjEEktEUvPS3AIshlQ23XTToomjR48OLxhH2HDDDSNp8kaJHTRoEC8uuOCCSE1o3nnnLa1AVFdrrLFGJDVH3kVYxp9//vn++++/9957X3/99VoFxG0p83/22WfMP2zYMDphjOsvs8wy1V4f8+uvv77yyivDhw8P15AtuuiiK6+88mKLLdaYNX711VfMQIpuo4024t8vvvhi8ODBTPnrr7/23nvvjz76iIkbb7zxtNOWGSb+5Zdf3nzzTV6wGfPNN1++az/xxBOjbL788sv//Oc/Q4YMmWmmmZZeemnWtdBCC5XOxjI//vhjjhdZn+WWW27VVVddaqmlSmf75ptv2AZesEmlmUs+zngTy19++eWjbNgP77zzDislLdqmTZtKF//FO5OGZPbZZ//+++8HDhzI6hZffHHC/bLfKCRR9txzT75LmMKY4KuvvsreCP9SWuIDN+uss1JEowwo2O++++6AAQN+//33VVZZhW3ms2XnzHj4Pv300w8//JDDNG7cuJULyuYh+PrsBMoJXzk5nXG9H374ISo5IuPHj2cXRYV80swzz1zp67z99tucMuE1+zO5hA022KD0nJ0wYQLHiy/Ct1hvvfXYA6XLjAtJ6akxatSo/v37jxgx4qeffuKocXpyQEmZR5lV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SjlkhBFkL6JaZdwt48aNY7aJEydGk0KlIvrrr7+yl3788ceyn6LM8HeWWWapvODot99++3dB0fT0JQfffPMN++TlgvRDwJjRm2++mZJeqllYb/p3rFYNZ8rPP/88ZMiQsCvqcQVS9nKevaCyzczJ30ozUOpGjBjB0Cpf6pVXXhk/fnxUpQb3ZLXVC0XunXfeyXHOLOU84BAQzX/wwQdsc1SljJ9lmznKjjMmTS0B1uKLL96lSxdekI2f5m9HH3102Zk5M+eaa66ZZpopec3Hk08+GT71zDPPxBOZgdnoffKRMGXhhRdmnhpO5qo2mNczzjgjZ9fhhx9Own/55ZffbLPNhg4dSo53kUUWKa2emMJ0PvXRRx+lrPTSSy9db731/vGPf7DA9ddff6mlluKrXX/99aWhG+MaHTt2nHvuuddaa61555139dVXZ/Di7LPPZhWXXHJJPNt//vOf3XbbbYEFFlhooYXWWWedVVddlY9su+22pUNspfutbdu2THnttdduvPFG9gYbw7rmnHPO4447jmY1akiW71JVqeC78O5jjz3G66233jqe/4EHHkjONnLkyB122GGOOeZYe+21l1lmmVatWtE2ly6NennHHXfk67Dr+O4tW7a86KKLsnyvqnYLX/biiy9mGygkYbaddtopZE2Cjz/+mIkzzDDD66+/nvwglSnTKdtU39XuqKBsEY0r6KeffpqjM/vss7OXONfWXXfdXr16xZ8999xz+ThfkNcHH3xwWB3ljX9pLHm9zTbbfPnll/xlCWusscaxxx4bfzZ9ycFNN93EaON8883HPtmsgEMQll+E5pl5wnI4g9j5jYmGkxIzaaoAABAASURBVMJxfP/993m93HLLhe94++23l5054/5vsEjsvffefPCpp56Kp7z00kubb775rLPOusoqq4RdwUlaW8qQPdOmTRuWz6bGZ1nGct5gQY0Sh55+C+NZzMOc1CecbkWxL8s//vjjOV6LLbYYg198qU022YRq6uabb46yaXBPZqwqQ0m+8MILn3vuOXYsRY5dxN/OnTsXLTD7nEGWch7OQT7OQvj6q6222korrcQyb7vttqI5S6vf7J/FPffcE7aWo8wROeSQQ2gZWQLlKpq6TS1DhJxvL774IoUyVCJhImWi7MyUjHbt2j300EMEDZy9YWJ89QPL4SQPr6meKIJbbLEFH4madoMJ6aiDaP+IV6ig6WYtu+yybBi15yOPPLLnnnsml/bEE09QB7GdzJmyUj5LTLDHHnssueSSxGos/I477qAep5kM9XtATUoVMHbsWKrO3XffnWCCnbPddttRlxUtkECK2vDQQw9lsVR2n332GeHp448/Tn1HvDLbbLNFDbnsssuYn++47777sjReX3311VQr1EfpH8zyXaoqFVQf3bp1I5yiUTzggANYeJhOvZPcMxtttBEv9t9/f+rlPn36MDPRGHEtH49nu++++w466CDqrxNOOIH4gKweU0499VS+HZFTlishsuwWOves+tVXX6U1OvHEE9n/9Ilp3lq3bk3ZDjd/UGaoMdlLe+2116BBg6hJwwc5rJQolkkDU+2OipUW0Wmn/f8eHd/6yiuvZNXE4iussAKlgn/bt2/P9Msvv5wZ2Ifsao4gsSnbSa3NxOQFWBRm5iEuZD8vscQS8dXWDS4Zjz766JFHHhmaAYJ+mmGiTPYM5blo+/v27du1a1fWztdn49meF154gX1FOiRqtA4dOmy88cbXXXcdfRWWz/YwMXzTUln2fw1nyvDhw3feeWe+GruI1pqSzBT6aQ8++GBUJQIpVs3HKU7ExGFixnKepaDGOPSMGq+55pp33nknFQhHhH1IkEH4FZ+S//znP6+66iqK3D777MP3igoVETPENxOky7InM1aVQeh8Eqmcf/757IR777332muvJXx8/vnnKcM1zJmlnAecgxxi+gk0DUSBnFC0WVTIbDYhfvp+yPjZM844g60lyCNEpl2gDLDNVCCRpp4Ai5IX/R31n3nmmQ3OTy3GuU15igMsXhPmR4WOVDxbiLriKq8pN/j333+nKJOSpacVTzzssMM48znViwIspvD3wAMPTF9p7969iZbif2kdjzjiCLq29Ks4r+K3OKtpjXiXSC40mURadOBOO+20ogXSCjJ8k4w+yWdQh1ILUCNkORB8Hbp08flMvcwyqT1POeWU9O5Rlu9SVakgQmIevg4xE5mArbbaqnQeYhQCzfvvvz/EjtQ47BmWf8MNN8SXv1DLH3XUUWwANVfcJOy33340Sxwm6qYsN3ll2S18Uxot9ja97TCFipIak5iJL06TRv+biVSF7BmSOrRGRIQcLEoRGSzqayr68MFqT5+gbBGlqeDQkzUhJRwPjRFtbLjhhldccQU7lrZz0wLGd6jT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vh5XymapXs4991yiVYb5COj5dpQ6AuXVV1+9dObsc8bqdwY1HoMVO+64I5mtZPxHPqJv376k+pog4zuZ8C7C5om+FNEVvbpqfxOKU3SpgqhKdN2IruidlD75hjqOHEnU5Gr+Lk2DzVugIKozsgvLFESTE5IlixVEecuyZH/KI9aqIKqb7OU8e0Flmem5Xgan6nr9RlR99RIexZzjnPU7gxov/PgSA4XxFKLAV199NTyvJ5pq+FM5zRA5pHDVLenlLA9VqsEBBxxwzz33kPKlE/npp5/efvvt4aKNc845Z3JLFEmS6uTJJ59keJeUGym98ePH9+vXb++996Z7v8oqqyQHT2gsGIhn9DCampjBalZefPHF+LIwstbHHntsVB+DBw9miD05hTQVvZaiH9CVJDVjjMZeXJCcuPHGG/fo0SM58s5AfPbfiW82vAarWSGZFH5FlfH7gw8+OJefkytr9OjRffr0CQ/Wm2OOORiLXGONNSa3QShJzcbnn3/es2dPhuT222+/aArx8ssvMy7GYCUBR15zTm7++OMPslavvfbaxIkTGbVccMEFGbXcYostHMqIDLAkSZJy5xChJElSzgywJEmScmaAJUmSlDMDLEmSpJwZYEmSJOXMAEuSJClnBliSJEk5M8CSJEnK2VT3W4SDBg1q27btySefHNXf77//ft1113Xs2LFdu3as9LPPPosmV7fffjtbeN9990XVa9++PZ/95Zdf4in77bffjjvu+Ouvv0Z56NKlC8sfPHhwpMwobOy0o446KlJmTVk5TD6OP/54vvUHH3wQScpVs81gXXTRRRMnTjz11FOnn/5/vuN33333wgsvFE2sh7/++mvLLbfs27dvPOWnn36KJldffPEFu4V6Nqre66+/PmrUqD/++COe8uKLL3711VfJKY3x3nvvsW3ff/99pBLExB9//PHee++97LLLJqdT2Nhpk3ORmww1WeUwWXn33XdfeumlH374IZKUq2abwSLAOuuss8ghRZPI448/TnRFdueTTz75888/ibdWXnnlqDnaYIMNCCX95alJ4sEHH6ScU8aKps8666wclNatW0eSpEnBa7DqhX4hfzfddNMWLVpEzdrDDz8caTKz9NJLP//885EkaRKZ6q7BKjJhwoQBAwZ8+umn6eNZv/76K7P9+OOPUWajR4/m7yyzzJIyz2+//fbvgppX99lnn73//vtR9fi+rPfbb79tcE6+yFtvvTV48GAGUKLJANmaDz/8sMHZSBkOGzbs5ZdfJn2YnP7zzz+zb5NXjOWFJQ8ZMuTlgpQrxqoqSyNGjCAPmuUwVYsCQB9g+PDhRdPD/mHIOP1n4MeNGzdw4EBG4aOasP9ZS+mw7zfffENhGzNmTFR5s9m2N954gzLAyRvVE7uC78jf9NkoYOxJRsmjem5JlqKVcUsYOOZ71eMUKMXxeuedd8aOHRtJU59mGGDdcsst00wzTai7iW+m+VtRvTNy5MgddthhjjnmWHvttZdZZplWrVq9+eabpUt7+umn11tvvdlnn53Z5pprrnXXXbdXr17pG3DuueeyuhtvvJHXBx98cFh7x44d+Zf6kdfbbLPNl19+yV8Wu8Yaaxx77LHVro5Y54gjjlhwwQVJjzHyuMACCxx55JEZazGapU6dOs0777ysmr+rr776v/71r9LZ/vOf/+y2224seaGFFlpnnXVWXXXVueeee9ttty0djVp44YX5UuPHjy+7Oir95ZZbjhlK40jsueeevMUhizJg2JeNWXbZZTlYSy21VNjDSSxqxhlnJII5/PDD55lnnuWXX36zzTYLzTDhwl133cX+DPt2ttlmY2TzgQceSH6c78sSnnnmmXgKTRFDn0w89dRTk3NutNFGTHzvvffCvy+99NLmm2/OqNwqq6yyWQG7qzRzmeXgtm3bliW/9tprl19++eKLL77YYouRBCXmKN0bHCDmfOyxx3i99dZbx+U8fCnaY16vv/76ZffPoYceytHk0C+55JKsJdzcwFrizWP3sn/++9//Fq2Uo3nxxRez/9m9a6211pxzzrnTTjvF+yFFXPIJ6dq1axfOO3YCf0PEcOutt7LY+eabj8JGwT7wwAOL4qcnn3ySD7J5YduY+R//+Mdxxx2XvHjo9ttvZy0cx9INYC28xWeLAu6y6HExwMq34zuyo6govvrqq9LZiOB33HFHZmNPcha0bNmSIkqvqcHlM2dpjYSNN96Y6UQ/8ZSMRSvjlnBAOYX5RnwvDgGFrfQQN36bQzEjKKTS4xC3adOGamTNNdfs169fJE1NmuEQIedzt27dLrjgAhqSs846K75klTY1nodqgjaSF/vvvz+1Up8+fcgD0Up99NFHVPHxbCeccMKVV15Ji37JJZessMIKpIv4t3379kyn/au0ASyZDXjqqaeI2HbddVeqPCYmL8CismaeGWaYgbUvscQS8RZmXB1t5/bbb08//rDDDqN2o/JlMOiGG26gtWaNjA1FldFoUUdT01Ed77777lSyL7zwwnbbbUeLVTQngRTNDC0x0SfNPBtD5PH4449vsskmNO3JnZlu2mmnPeSQQ0455RQaPw5N8q2vv/76kUceYf/vu+++DS6HA9q/f38CHfYkG3PttdcSJtJaX3jhhcnZCKRo8smO0JAQ2NH6sgFM33vvvYk8CCauuuoqpvMVLr300r322uu5557r3r17+CyhDNtDuEkcEKawY0N7nIxBibrIoNBm0NTxL9uw8847syKOFAHKSiutxJShQ4c++OCDyQ2rqizxpYjGOMr77bcf258skzEmUsz4UhTdAw44gMMUprMBUWXsH7aWYHeXXXaZf/75+YKER3ycSGurrbYifuWI0zo++uijFBJ22quvvhp/liaTc4QpBB8nnngipYLkBA1569atH3roIYp61BBKPiWNwsNaosJ1ihypDh06nH322RRmIk4WS8+Htd95552LLLLI+eefH3+W9bIrzjzzTDaV8I6z4J577rn66qs///zzEGWCgnTyySf37t2bFRFnJFdN8eMvcVsoD+kbSUkgIGAb2FROkOuuu45AkBgx3slR4faCgw46iH3FEaSvQp+HKZRPvhTxcS6XJGYsWhm3hDJPrMa3IyqlEmCxzMaLmWeeOcpbOA05wa+44grKyaBBgyjSVB2UE6ZH0tRhmvSBgCkXPSeSWKTBi6oPaknqFF4QVdx///0hUCCPTcBBk3bOOecQk4U5aXvoMVMl0XWOR/oY2dlwww1pk2gYqIJTNoAM080330zjTd1XunaaN5qH5ABi9tVR+zNsRO3JNscfv+OOO1gRjVx6go24pHPnztRxRBJxS3PeeefRbvGC5ER8jzr1L9kCOqPJj9P+EQ3Qrof5A1oyAlY2NY66aBqpx8lpEfxFhXEfpvClGPAKUwJCjX/+859km2666aaUbaafTSPH1tLk086FiTTD9MJZL5mJFVdcMUwMW0viirCJWCpeQkgDkBdhN8bTCaYJ+NhIMjcsiilEKkRv7GdmC/OQXLzmmmtWW201Rl5IEIZAh+acw0dY0LNnT/6lzdhjjz2OOuoomuHkZrND2IHhdfaDG74sMTdfIRSVdGwJ20MPgfAoOZ34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");var ns=9e4,Pt=t=>new Response(t,{headers:{"content-type":"image/png","content-length":String(t.length)}}),ss=(t,e=200)=>new Response(JSON.stringify(t),{status:e,headers:{"content-type":"application/json"}});async function ca(t,e){let n={html:t,viewport:{width:800,height:480},gotoOptions:{waitUntil:"networkidle0",timeout:12e3},screenshotOptions:{type:"png"}};for(let s=0;;s++)try{return await ha(n,e)}catch(i){if(s>0||!String(i).includes(" 429"))throw i;console.log("browser busy, retrying"),await new Promise(r=>setTimeout(r,5e3))}}async function ha(t,e){let n;if(e.BROWSER&&typeof e.BROWSER.quickAction=="function")n=await e.BROWSER.quickAction("screenshot",t);else{if(!e.CF_ACCOUNT_ID||!e.CF_API_TOKEN)throw new Error("CF_ACCOUNT_ID and CF_API_TOKEN are not set");n=await fetch(`https://api.cloudflare.com/client/v4/accounts/${e.CF_ACCOUNT_ID}/browser-rendering/screenshot`,{method:"POST",headers:{authorization:`Bearer ${e.CF_API_TOKEN}`,"content-type":"application/json"},body:JSON.stringify(t)})}if(n instanceof Response){if(!n.ok)throw new Error(`browser rendering ${n.status}: ${(await n.text()).slice(0,300)}`);let s=n.headers.get("x-browser-ms-used");return s&&console.log(`browser time ${s} ms`),new Uint8Array(await n.arrayBuffer())}return new Uint8Array(n instanceof ArrayBuffer?n:n.buffer||n)}async function ua(t,e){let n=new URL(t.url);if(!e.SECRET||e.SECRET.length<12)return new Response("Set a SECRET variable (12+ random characters) to finish setting up.",{status:503});let s=`/${e.SECRET}`;if(n.pathname==="/")return new Response("TRMNL server is running.");if(!n.pathname.startsWith(s+"/"))return new Response("Not found",{status:404});let i=n.pathname.slice(s.length),r=n.origin+s,a=Date.now().toString(36);if(i==="/api/setup")return ss({status:200,api_key:"byos",friendly_id:"HOME",image_url:`${r}/connected.png`,message:"Connected to your Cloudflare server"});if(i==="/api/display"){let l=t.headers.get("update-source"),c=t.headers.get("refresh-rate"),h=Zn(l,c,e)?await qn(e):!1,{screen:d,refresh:m}=Qn(l,c,e,h);return console.log(`wake: ${l||"unknown"}${h?", rain near":""} -> ${d}, next in ${Math.round(m/60)} min`),ss({status:0,image_url:`${r}/screen/${d}-${a}.png`,filename:`${d}-${a}`,refresh_rate:m,reset_firmware:!1,update_firmware:!1,firmware_url:null,special_function:"none"})}if(i==="/api/log")return new Response(null,{status:204});if(i==="/connected.png")return Pt(es);let o=i.match(/^\/screen\/([a-z]+)(?:-[a-z0-9]+)?\.(png|html)$/);if(o&&Xn.includes(o[1])){let l=await Bn(o[1],e);if(o[2]==="html")return new Response(l,{headers:{"content-type":"text/html; charset=utf-8"}});try{let c=await ca(l,e);if(console.log(`${o[1]}: ${c.length} bytes`),c.length>ns)throw new Error(`${o[1]} is ${c.length} bytes, over the TRMNL's ${ns} byte limit`);return Pt(c)}catch(c){return console.log(`could not draw ${o[1]}: ${c}`),Pt(ts)}}return new Response("Not found",{status:404})}var Sa={async fetch(t,e){try{return await ua(t,e)}catch(n){return console.log(`error: ${n.stack||n}`),new Response("Server error",{status:500})}}};export{Sa as default};
