"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8592],{9262:(O,_,i)=>{i.d(_,{c:()=>a});var g=i(8411),l=i(967),d=i(9203);const a=(s,o)=>{let e,t;const u=(r,w,p)=>{if(typeof document>"u")return;const E=document.elementFromPoint(r,w);E&&o(E)?E!==e&&(n(),c(E,p)):n()},c=(r,w)=>{e=r,t||(t=e);const p=e;(0,g.w)(()=>p.classList.add("ion-activated")),w()},n=(r=!1)=>{if(!e)return;const w=e;(0,g.w)(()=>w.classList.remove("ion-activated")),r&&t!==e&&e.click(),e=void 0};return(0,d.createGesture)({el:s,gestureName:"buttonActiveDrag",threshold:0,onStart:r=>u(r.currentX,r.currentY,l.a),onMove:r=>u(r.currentX,r.currentY,l.b),onEnd:()=>{n(!0),(0,l.h)(),t=void 0}})}},4874:(O,_,i)=>{i.d(_,{g:()=>l});var g=i(6225);const l=()=>{if(void 0!==g.w)return g.w.Capacitor}},5149:(O,_,i)=>{i.d(_,{g:()=>g});const g=(o,e,t,u,c)=>d(o[1],e[1],t[1],u[1],c).map(n=>l(o[0],e[0],t[0],u[0],n)),l=(o,e,t,u,c)=>c*(3*e*Math.pow(c-1,2)+c*(-3*t*c+3*t+u*c))-o*Math.pow(c-1,3),d=(o,e,t,u,c)=>s((u-=c)-3*(t-=c)+3*(e-=c)-(o-=c),3*t-6*e+3*o,3*e-3*o,o).filter(r=>r>=0&&r<=1),s=(o,e,t,u)=>{if(0===o)return((o,e,t)=>{const u=e*e-4*o*t;return u<0?[]:[(-e+Math.sqrt(u))/(2*o),(-e-Math.sqrt(u))/(2*o)]})(e,t,u);const c=(3*(t/=o)-(e/=o)*e)/3,n=(2*e*e*e-9*e*t+27*(u/=o))/27;if(0===c)return[Math.pow(-n,1/3)];if(0===n)return[Math.sqrt(-c),-Math.sqrt(-c)];const r=Math.pow(n/2,2)+Math.pow(c/3,3);if(0===r)return[Math.pow(n/2,.5)-e/3];if(r>0)return[Math.pow(-n/2+Math.sqrt(r),1/3)-Math.pow(n/2+Math.sqrt(r),1/3)-e/3];const w=Math.sqrt(Math.pow(-c/3,3)),p=Math.acos(-n/(2*Math.sqrt(Math.pow(-c/3,3)))),E=2*Math.pow(w,1/3);return[E*Math.cos(p/3)-e/3,E*Math.cos((p+2*Math.PI)/3)-e/3,E*Math.cos((p+4*Math.PI)/3)-e/3]}},5085:(O,_,i)=>{i.d(_,{i:()=>g});const g=l=>l&&""!==l.dir?"rtl"===l.dir.toLowerCase():"rtl"===(null==document?void 0:document.dir.toLowerCase())},2779:(O,_,i)=>{i.r(_),i.d(_,{startFocusVisible:()=>a});const g="ion-focused",d=["Tab","ArrowDown","Space","Escape"," ","Shift","Enter","ArrowLeft","ArrowRight","ArrowUp","Home","End"],a=s=>{let o=[],e=!0;const t=s?s.shadowRoot:document,u=s||document.body,c=M=>{o.forEach(v=>v.classList.remove(g)),M.forEach(v=>v.classList.add(g)),o=M},n=()=>{e=!1,c([])},r=M=>{e=d.includes(M.key),e||c([])},w=M=>{if(e&&void 0!==M.composedPath){const v=M.composedPath().filter(m=>!!m.classList&&m.classList.contains("ion-focusable"));c(v)}},p=()=>{t.activeElement===u&&c([])};return t.addEventListener("keydown",r),t.addEventListener("focusin",w),t.addEventListener("focusout",p),t.addEventListener("touchstart",n,{passive:!0}),t.addEventListener("mousedown",n),{destroy:()=>{t.removeEventListener("keydown",r),t.removeEventListener("focusin",w),t.removeEventListener("focusout",p),t.removeEventListener("touchstart",n),t.removeEventListener("mousedown",n)},setFocus:c}}},5487:(O,_,i)=>{i.d(_,{c:()=>l});var g=i(839);const l=o=>{const e=o;let t;return{hasLegacyControl:()=>{if(void 0===t){const c=void 0!==e.label||d(e),n=e.hasAttribute("aria-label")||e.hasAttribute("aria-labelledby")&&null===e.shadowRoot,r=(0,g.h)(e);t=!0===e.legacy||!c&&!n&&null!==r}return t}}},d=o=>null!==o.shadowRoot&&!!(a.includes(o.tagName)&&null!==o.querySelector('[slot="label"]')||s.includes(o.tagName)&&""!==o.textContent),a=["ION-RANGE"],s=["ION-TOGGLE","ION-CHECKBOX","ION-RADIO"]},967:(O,_,i)=>{i.d(_,{I:()=>l,a:()=>e,b:()=>t,c:()=>o,d:()=>c,h:()=>u});var g=i(4874),l=function(n){return n.Heavy="HEAVY",n.Medium="MEDIUM",n.Light="LIGHT",n}(l||{});const a={getEngine(){const n=window.TapticEngine;if(n)return n;const r=(0,g.g)();return null!=r&&r.isPluginAvailable("Haptics")?r.Plugins.Haptics:void 0},available(){if(!this.getEngine())return!1;const r=(0,g.g)();return"web"!==(null==r?void 0:r.getPlatform())||typeof navigator<"u"&&void 0!==navigator.vibrate},isCordova:()=>void 0!==window.TapticEngine,isCapacitor:()=>void 0!==(0,g.g)(),impact(n){const r=this.getEngine();if(!r)return;const w=this.isCapacitor()?n.style:n.style.toLowerCase();r.impact({style:w})},notification(n){const r=this.getEngine();if(!r)return;const w=this.isCapacitor()?n.type:n.type.toLowerCase();r.notification({type:w})},selection(){const n=this.isCapacitor()?l.Light:"light";this.impact({style:n})},selectionStart(){const n=this.getEngine();n&&(this.isCapacitor()?n.selectionStart():n.gestureSelectionStart())},selectionChanged(){const n=this.getEngine();n&&(this.isCapacitor()?n.selectionChanged():n.gestureSelectionChanged())},selectionEnd(){const n=this.getEngine();n&&(this.isCapacitor()?n.selectionEnd():n.gestureSelectionEnd())}},s=()=>a.available(),o=()=>{s()&&a.selection()},e=()=>{s()&&a.selectionStart()},t=()=>{s()&&a.selectionChanged()},u=()=>{s()&&a.selectionEnd()},c=n=>{s()&&a.impact(n)}},2874:(O,_,i)=>{i.d(_,{I:()=>o,a:()=>c,b:()=>s,c:()=>w,d:()=>E,f:()=>n,g:()=>u,i:()=>t,p:()=>p,r:()=>M,s:()=>r});var g=i(5861),l=i(839),d=i(6710);const s="ion-content",o=".ion-content-scroll-host",e=`${s}, ${o}`,t=v=>"ION-CONTENT"===v.tagName,u=function(){var v=(0,g.Z)(function*(m){return t(m)?(yield new Promise(f=>(0,l.c)(m,f)),m.getScrollElement()):m});return function(f){return v.apply(this,arguments)}}(),c=v=>v.querySelector(o)||v.querySelector(e),n=v=>v.closest(e),r=(v,m)=>t(v)?v.scrollToTop(m):Promise.resolve(v.scrollTo({top:0,left:0,behavior:m>0?"smooth":"auto"})),w=(v,m,f,y)=>t(v)?v.scrollByPoint(m,f,y):Promise.resolve(v.scrollBy({top:f,left:m,behavior:y>0?"smooth":"auto"})),p=v=>(0,d.b)(v,s),E=v=>{if(t(v)){const f=v.scrollY;return v.scrollY=!1,f}return v.style.setProperty("overflow","hidden"),!0},M=(v,m)=>{t(v)?v.scrollY=m:v.style.removeProperty("overflow")}},5307:(O,_,i)=>{i.d(_,{a:()=>g,b:()=>w,c:()=>e,d:()=>p,e:()=>D,f:()=>o,g:()=>E,h:()=>d,i:()=>l,j:()=>y,k:()=>C,l:()=>t,m:()=>n,n:()=>M,o:()=>c,p:()=>s,q:()=>a,r:()=>f,s:()=>h,t:()=>r,u:()=>v,v:()=>m,w:()=>u});const g="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='square' stroke-miterlimit='10' stroke-width='48' d='M244 400L100 256l144-144M120 256h292' class='ionicon-fill-none'/></svg>",l="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 268l144 144 144-144M256 392V100' class='ionicon-fill-none'/></svg>",d="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M368 64L144 256l224 192V64z'/></svg>",a="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M64 144l192 224 192-224H64z'/></svg>",s="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M448 368L256 144 64 368h384z'/></svg>",o="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' d='M416 128L192 384l-96-96' class='ionicon-fill-none ionicon-stroke-width'/></svg>",e="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M328 112L184 256l144 144' class='ionicon-fill-none'/></svg>",t="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144' class='ionicon-fill-none'/></svg>",u="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M136 208l120-104 120 104M136 304l120 104 120-104' stroke-width='48' stroke-linecap='round' stroke-linejoin='round' class='ionicon-fill-none'/></svg>",c="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M184 112l144 144-144 144' class='ionicon-fill-none'/></svg>",n="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M184 112l144 144-144 144' class='ionicon-fill-none'/></svg>",r="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z'/></svg>",w="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm75.31 260.69a16 16 0 11-22.62 22.62L256 278.63l-52.69 52.68a16 16 0 01-22.62-22.62L233.37 256l-52.68-52.69a16 16 0 0122.62-22.62L256 233.37l52.69-52.68a16 16 0 0122.62 22.62L278.63 256z'/></svg>",p="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M400 145.49L366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49z'/></svg>",E="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><circle cx='256' cy='256' r='192' stroke-linecap='round' stroke-linejoin='round' class='ionicon-fill-none ionicon-stroke-width'/></svg>",M="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><circle cx='256' cy='256' r='48'/><circle cx='416' cy='256' r='48'/><circle cx='96' cy='256' r='48'/></svg>",v="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-miterlimit='10' d='M80 160h352M80 256h352M80 352h352' class='ionicon-fill-none ionicon-stroke-width'/></svg>",m="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M64 384h384v-42.67H64zm0-106.67h384v-42.66H64zM64 128v42.67h384V128z'/></svg>",f="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' d='M400 256H112' class='ionicon-fill-none ionicon-stroke-width'/></svg>",y="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' d='M96 256h320M96 176h320M96 336h320' class='ionicon-fill-none ionicon-stroke-width'/></svg>",C="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='square' stroke-linejoin='round' stroke-width='44' d='M118 304h276M118 208h276' class='ionicon-fill-none'/></svg>",h="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z' stroke-miterlimit='10' class='ionicon-fill-none ionicon-stroke-width'/><path stroke-linecap='round' stroke-miterlimit='10' d='M338.29 338.29L448 448' class='ionicon-fill-none ionicon-stroke-width'/></svg>",D="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M464 428L339.92 303.9a160.48 160.48 0 0030.72-94.58C370.64 120.37 298.27 48 209.32 48S48 120.37 48 209.32s72.37 161.32 161.32 161.32a160.48 160.48 0 0094.58-30.72L428 464zM209.32 319.69a110.38 110.38 0 11110.37-110.37 110.5 110.5 0 01-110.37 110.37z'/></svg>"},2894:(O,_,i)=>{i.d(_,{c:()=>a,g:()=>s});var g=i(6225),l=i(839),d=i(6710);const a=(e,t,u)=>{let c,n;void 0!==g.w&&"MutationObserver"in g.w&&(c=new MutationObserver(E=>{for(const M of E)for(const v of M.addedNodes)if(v.nodeType===Node.ELEMENT_NODE&&v.slot===t)return u(),void(0,l.r)(()=>r(v))}),c.observe(e,{childList:!0}));const r=E=>{var M;n&&(n.disconnect(),n=void 0),n=new MutationObserver(v=>{u();for(const m of v)for(const f of m.removedNodes)f.nodeType===Node.ELEMENT_NODE&&f.slot===t&&p()}),n.observe(null!==(M=E.parentElement)&&void 0!==M?M:E,{subtree:!0,childList:!0})},p=()=>{n&&(n.disconnect(),n=void 0)};return{destroy:()=>{c&&(c.disconnect(),c=void 0),p()}}},s=(e,t,u)=>{const c=null==e?0:e.toString().length,n=o(c,t);if(void 0===u)return n;try{return u(c,t)}catch(r){return(0,d.a)("Exception in provided `counterFormatter`.",r),n}},o=(e,t)=>`${e} / ${t}`},7484:(O,_,i)=>{i.d(_,{K:()=>a,a:()=>d});var g=i(4874),l=function(s){return s.Unimplemented="UNIMPLEMENTED",s.Unavailable="UNAVAILABLE",s}(l||{}),d=function(s){return s.Body="body",s.Ionic="ionic",s.Native="native",s.None="none",s}(d||{});const a={getEngine(){const s=(0,g.g)();if(null!=s&&s.isPluginAvailable("Keyboard"))return s.Plugins.Keyboard},getResizeMode(){const s=this.getEngine();return null!=s&&s.getResizeMode?s.getResizeMode().catch(o=>{if(o.code!==l.Unimplemented)throw o}):Promise.resolve(void 0)}}},1612:(O,_,i)=>{i.r(_),i.d(_,{KEYBOARD_DID_CLOSE:()=>s,KEYBOARD_DID_OPEN:()=>a,copyVisualViewport:()=>C,keyboardDidClose:()=>v,keyboardDidOpen:()=>E,keyboardDidResize:()=>M,resetKeyboardAssist:()=>c,setKeyboardClose:()=>p,setKeyboardOpen:()=>w,startKeyboardAssist:()=>n,trackViewportChanges:()=>y});var g=i(7484);i(4874),i(6225);const a="ionKeyboardDidShow",s="ionKeyboardDidHide";let e={},t={},u=!1;const c=()=>{e={},t={},u=!1},n=h=>{if(g.K.getEngine())r(h);else{if(!h.visualViewport)return;t=C(h.visualViewport),h.visualViewport.onresize=()=>{y(h),E()||M(h)?w(h):v(h)&&p(h)}}},r=h=>{h.addEventListener("keyboardDidShow",D=>w(h,D)),h.addEventListener("keyboardDidHide",()=>p(h))},w=(h,D)=>{m(h,D),u=!0},p=h=>{f(h),u=!1},E=()=>!u&&e.width===t.width&&(e.height-t.height)*t.scale>150,M=h=>u&&!v(h),v=h=>u&&t.height===h.innerHeight,m=(h,D)=>{const L=new CustomEvent(a,{detail:{keyboardHeight:D?D.keyboardHeight:h.innerHeight-t.height}});h.dispatchEvent(L)},f=h=>{const D=new CustomEvent(s);h.dispatchEvent(D)},y=h=>{e=Object.assign({},t),t=C(h.visualViewport)},C=h=>({width:Math.round(h.width),height:Math.round(h.height),offsetTop:h.offsetTop,offsetLeft:h.offsetLeft,pageTop:h.pageTop,pageLeft:h.pageLeft,scale:h.scale})},3459:(O,_,i)=>{i.d(_,{c:()=>o});var g=i(5861),l=i(6225),d=i(7484);const a=e=>{if(void 0===l.d||e===d.a.None||void 0===e)return null;const t=l.d.querySelector("ion-app");return null!=t?t:l.d.body},s=e=>{const t=a(e);return null===t?0:t.clientHeight},o=function(){var e=(0,g.Z)(function*(t){let u,c,n,r;const w=function(){var m=(0,g.Z)(function*(){const f=yield d.K.getResizeMode(),y=void 0===f?void 0:f.mode;u=()=>{void 0===r&&(r=s(y)),n=!0,p(n,y)},c=()=>{n=!1,p(n,y)},null==l.w||l.w.addEventListener("keyboardWillShow",u),null==l.w||l.w.addEventListener("keyboardWillHide",c)});return function(){return m.apply(this,arguments)}}(),p=(m,f)=>{t&&t(m,E(f))},E=m=>{if(0===r||r===s(m))return;const f=a(m);return null!==f?new Promise(y=>{const h=new ResizeObserver(()=>{f.clientHeight===r&&(h.disconnect(),y())});h.observe(f)}):void 0};return yield w(),{init:w,destroy:()=>{null==l.w||l.w.removeEventListener("keyboardWillShow",u),null==l.w||l.w.removeEventListener("keyboardWillHide",c),u=c=void 0},isKeyboardVisible:()=>n}});return function(u){return e.apply(this,arguments)}}()},3830:(O,_,i)=>{i.d(_,{c:()=>l});var g=i(5861);const l=()=>{let d;return{lock:function(){var s=(0,g.Z)(function*(){const o=d;let e;return d=new Promise(t=>e=t),void 0!==o&&(yield o),e});return function(){return s.apply(this,arguments)}}()}}},5857:(O,_,i)=>{i.d(_,{c:()=>d});var g=i(6225),l=i(839);const d=(a,s,o)=>{let e;const t=()=>!(void 0===s()||void 0!==a.label||null===o()),c=()=>{const r=s();if(void 0===r)return;if(!t())return void r.style.removeProperty("width");const w=o().scrollWidth;if(0===w&&null===r.offsetParent&&void 0!==g.w&&"IntersectionObserver"in g.w){if(void 0!==e)return;const p=e=new IntersectionObserver(E=>{1===E[0].intersectionRatio&&(c(),p.disconnect(),e=void 0)},{threshold:.01,root:a});p.observe(r)}else r.style.setProperty("width",.75*w+"px")};return{calculateNotchWidth:()=>{t()&&(0,l.r)(()=>{c()})},destroy:()=>{e&&(e.disconnect(),e=void 0)}}}},3781:(O,_,i)=>{i.d(_,{S:()=>l});const l={bubbles:{dur:1e3,circles:9,fn:(d,a,s)=>{const o=d*a/s-d+"ms",e=2*Math.PI*a/s;return{r:5,style:{top:32*Math.sin(e)+"%",left:32*Math.cos(e)+"%","animation-delay":o}}}},circles:{dur:1e3,circles:8,fn:(d,a,s)=>{const o=a/s,e=d*o-d+"ms",t=2*Math.PI*o;return{r:5,style:{top:32*Math.sin(t)+"%",left:32*Math.cos(t)+"%","animation-delay":e}}}},circular:{dur:1400,elmDuration:!0,circles:1,fn:()=>({r:20,cx:48,cy:48,fill:"none",viewBox:"24 24 48 48",transform:"translate(0,0)",style:{}})},crescent:{dur:750,circles:1,fn:()=>({r:26,style:{}})},dots:{dur:750,circles:3,fn:(d,a)=>({r:6,style:{left:32-32*a+"%","animation-delay":-110*a+"ms"}})},lines:{dur:1e3,lines:8,fn:(d,a,s)=>({y1:14,y2:26,style:{transform:`rotate(${360/s*a+(a<s/2?180:-180)}deg)`,"animation-delay":d*a/s-d+"ms"}})},"lines-small":{dur:1e3,lines:8,fn:(d,a,s)=>({y1:12,y2:20,style:{transform:`rotate(${360/s*a+(a<s/2?180:-180)}deg)`,"animation-delay":d*a/s-d+"ms"}})},"lines-sharp":{dur:1e3,lines:12,fn:(d,a,s)=>({y1:17,y2:29,style:{transform:`rotate(${30*a+(a<6?180:-180)}deg)`,"animation-delay":d*a/s-d+"ms"}})},"lines-sharp-small":{dur:1e3,lines:12,fn:(d,a,s)=>({y1:12,y2:20,style:{transform:`rotate(${30*a+(a<6?180:-180)}deg)`,"animation-delay":d*a/s-d+"ms"}})}}},8663:(O,_,i)=>{i.r(_),i.d(_,{createSwipeBackGesture:()=>s});var g=i(839),l=i(5085),d=i(9203);i(619);const s=(o,e,t,u,c)=>{const n=o.ownerDocument.defaultView;let r=(0,l.i)(o);const p=f=>r?-f.deltaX:f.deltaX;return(0,d.createGesture)({el:o,gestureName:"goback-swipe",gesturePriority:101,threshold:10,canStart:f=>(r=(0,l.i)(o),(f=>{const{startX:C}=f;return r?C>=n.innerWidth-50:C<=50})(f)&&e()),onStart:t,onMove:f=>{const C=p(f)/n.innerWidth;u(C)},onEnd:f=>{const y=p(f),C=n.innerWidth,h=y/C,D=(f=>r?-f.velocityX:f.velocityX)(f),L=D>=0&&(D>.2||y>C/2),P=(L?1-h:h)*C;let x=0;if(P>5){const B=P/Math.abs(D);x=Math.min(B,540)}c(L,h<=0?.01:(0,g.l)(0,h,.9999),x)}})}},5564:(O,_,i)=>{i.d(_,{w:()=>g});const g=(a,s,o)=>{if(typeof MutationObserver>"u")return;const e=new MutationObserver(t=>{o(l(t,s))});return e.observe(a,{childList:!0,subtree:!0}),e},l=(a,s)=>{let o;return a.forEach(e=>{for(let t=0;t<e.addedNodes.length;t++)o=d(e.addedNodes[t],s)||o}),o},d=(a,s)=>{if(1!==a.nodeType)return;const o=a;return(o.tagName===s.toUpperCase()?[o]:Array.from(o.querySelectorAll(s))).find(t=>t.value===o.value)}}}]);