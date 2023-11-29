try{self["workbox:core:7.0.0"]&&_()}catch{}const O=(s,...e)=>{let t=s;return e.length>0&&(t+=` :: ${JSON.stringify(e)}`),t},M=O;class l extends Error{constructor(e,t){const a=M(e,t);super(a),this.name=e,this.details=t}}const S=new Set,f={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:typeof registration<"u"?registration.scope:""},R=s=>[f.prefix,s,f.suffix].filter(e=>e&&e.length>0).join("-"),W=s=>{for(const e of Object.keys(f))s(e)},I={updateDetails:s=>{W(e=>{typeof s[e]=="string"&&(f[e]=s[e])})},getGoogleAnalyticsName:s=>s||R(f.googleAnalytics),getPrecacheName:s=>s||R(f.precache),getPrefix:()=>f.prefix,getRuntimeName:s=>s||R(f.runtime),getSuffix:()=>f.suffix};function j(s,e){const t=new URL(s);for(const a of e)t.searchParams.delete(a);return t.href}async function F(s,e,t,a){const i=j(e.url,t);if(e.url===i)return s.match(e,a);const n=Object.assign(Object.assign({},a),{ignoreSearch:!0}),r=await s.keys(e,n);for(const c of r){const o=j(c.url,t);if(i===o)return s.match(c,a)}}let g;function q(){if(g===void 0){const s=new Response("");if("body"in s)try{new Response(s.body),g=!0}catch{g=!1}g=!1}return g}class H{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}async function B(){for(const s of S)await s()}const $=s=>new URL(String(s),location.href).href.replace(new RegExp(`^${location.origin}`),"");function T(s){return new Promise(e=>setTimeout(e,s))}function U(s,e){const t=e();return s.waitUntil(t),t}async function G(s,e){let t=null;if(s.url&&(t=new URL(s.url).origin),t!==self.location.origin)throw new l("cross-origin-copy-response",{origin:t});const a=s.clone(),i={headers:new Headers(a.headers),status:a.status,statusText:a.statusText},n=e?e(i):i,r=q()?a.body:await a.blob();return new Response(r,n)}function z(){self.addEventListener("activate",()=>self.clients.claim())}try{self["workbox:precaching:7.0.0"]&&_()}catch{}const Q="__WB_REVISION__";function J(s){if(!s)throw new l("add-to-cache-list-unexpected-type",{entry:s});if(typeof s=="string"){const n=new URL(s,location.href);return{cacheKey:n.href,url:n.href}}const{revision:e,url:t}=s;if(!t)throw new l("add-to-cache-list-unexpected-type",{entry:s});if(!e){const n=new URL(t,location.href);return{cacheKey:n.href,url:n.href}}const a=new URL(t,location.href),i=new URL(t,location.href);return a.searchParams.set(Q,e),{cacheKey:a.href,url:i.href}}class X{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:a})=>{if(e.type==="install"&&t&&t.originalRequest&&t.originalRequest instanceof Request){const i=t.originalRequest.url;a?this.notUpdatedURLs.push(i):this.updatedURLs.push(i)}return a}}}class Y{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:t,params:a})=>{const i=(a==null?void 0:a.cacheKey)||this._precacheController.getCacheKeyForURL(t.url);return i?new Request(i,{headers:t.headers}):t},this._precacheController=e}}try{self["workbox:strategies:7.0.0"]&&_()}catch{}function y(s){return typeof s=="string"?new Request(s):s}class Z{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new H,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const a of this._plugins)this._pluginStateMap.set(a,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:t}=this;let a=y(e);if(a.mode==="navigate"&&t instanceof FetchEvent&&t.preloadResponse){const r=await t.preloadResponse;if(r)return r}const i=this.hasCallback("fetchDidFail")?a.clone():null;try{for(const r of this.iterateCallbacks("requestWillFetch"))a=await r({request:a.clone(),event:t})}catch(r){if(r instanceof Error)throw new l("plugin-error-request-will-fetch",{thrownErrorMessage:r.message})}const n=a.clone();try{let r;r=await fetch(a,a.mode==="navigate"?void 0:this._strategy.fetchOptions);for(const c of this.iterateCallbacks("fetchDidSucceed"))r=await c({event:t,request:n,response:r});return r}catch(r){throw i&&await this.runCallbacks("fetchDidFail",{error:r,event:t,originalRequest:i.clone(),request:n.clone()}),r}}async fetchAndCachePut(e){const t=await this.fetch(e),a=t.clone();return this.waitUntil(this.cachePut(e,a)),t}async cacheMatch(e){const t=y(e);let a;const{cacheName:i,matchOptions:n}=this._strategy,r=await this.getCacheKey(t,"read"),c=Object.assign(Object.assign({},n),{cacheName:i});a=await caches.match(r,c);for(const o of this.iterateCallbacks("cachedResponseWillBeUsed"))a=await o({cacheName:i,matchOptions:n,cachedResponse:a,request:r,event:this.event})||void 0;return a}async cachePut(e,t){const a=y(e);await T(0);const i=await this.getCacheKey(a,"write");if(!t)throw new l("cache-put-with-no-response",{url:$(i.url)});const n=await this._ensureResponseSafeToCache(t);if(!n)return!1;const{cacheName:r,matchOptions:c}=this._strategy,o=await self.caches.open(r),d=this.hasCallback("cacheDidUpdate"),p=d?await F(o,i.clone(),["__WB_REVISION__"],c):null;try{await o.put(i,d?n.clone():n)}catch(u){if(u instanceof Error)throw u.name==="QuotaExceededError"&&await B(),u}for(const u of this.iterateCallbacks("cacheDidUpdate"))await u({cacheName:r,oldResponse:p,newResponse:n.clone(),request:i,event:this.event});return!0}async getCacheKey(e,t){const a=`${e.url} | ${t}`;if(!this._cacheKeys[a]){let i=e;for(const n of this.iterateCallbacks("cacheKeyWillBeUsed"))i=y(await n({mode:t,request:i,event:this.event,params:this.params}));this._cacheKeys[a]=i}return this._cacheKeys[a]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const a of this.iterateCallbacks(e))await a(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if(typeof t[e]=="function"){const a=this._pluginStateMap.get(t);yield n=>{const r=Object.assign(Object.assign({},n),{state:a});return t[e](r)}}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,a=!1;for(const i of this.iterateCallbacks("cacheWillUpdate"))if(t=await i({request:this.request,response:t,event:this.event})||void 0,a=!0,!t)break;return a||t&&t.status!==200&&(t=void 0),t}}class k{constructor(e={}){this.cacheName=I.getRuntimeName(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,a=typeof e.request=="string"?new Request(e.request):e.request,i="params"in e?e.params:void 0,n=new Z(this,{event:t,request:a,params:i}),r=this._getResponse(n,a,t),c=this._awaitComplete(r,n,a,t);return[r,c]}async _getResponse(e,t,a){await e.runCallbacks("handlerWillStart",{event:a,request:t});let i;try{if(i=await this._handle(t,e),!i||i.type==="error")throw new l("no-response",{url:t.url})}catch(n){if(n instanceof Error){for(const r of e.iterateCallbacks("handlerDidError"))if(i=await r({error:n,event:a,request:t}),i)break}if(!i)throw n}for(const n of e.iterateCallbacks("handlerWillRespond"))i=await n({event:a,request:t,response:i});return i}async _awaitComplete(e,t,a,i){let n,r;try{n=await e}catch{}try{await t.runCallbacks("handlerDidRespond",{event:i,request:a,response:n}),await t.doneWaiting()}catch(c){c instanceof Error&&(r=c)}if(await t.runCallbacks("handlerDidComplete",{event:i,request:a,response:n,error:r}),t.destroy(),r)throw r}}class h extends k{constructor(e={}){e.cacheName=I.getPrecacheName(e.cacheName),super(e),this._fallbackToNetwork=e.fallbackToNetwork!==!1,this.plugins.push(h.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const a=await t.cacheMatch(e);return a||(t.event&&t.event.type==="install"?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,t){let a;const i=t.params||{};if(this._fallbackToNetwork){const n=i.integrity,r=e.integrity,c=!r||r===n;a=await t.fetch(new Request(e,{integrity:e.mode!=="no-cors"?r||n:void 0})),n&&c&&e.mode!=="no-cors"&&(this._useDefaultCacheabilityPluginIfNeeded(),await t.cachePut(e,a.clone()))}else throw new l("missing-precache-entry",{cacheName:this.cacheName,url:e.url});return a}async _handleInstall(e,t){this._useDefaultCacheabilityPluginIfNeeded();const a=await t.fetch(e);if(!await t.cachePut(e,a.clone()))throw new l("bad-precaching-response",{url:e.url,status:a.status});return a}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[a,i]of this.plugins.entries())i!==h.copyRedirectedCacheableResponsesPlugin&&(i===h.defaultPrecacheCacheabilityPlugin&&(e=a),i.cacheWillUpdate&&t++);t===0?this.plugins.push(h.defaultPrecacheCacheabilityPlugin):t>1&&e!==null&&this.plugins.splice(e,1)}}h.defaultPrecacheCacheabilityPlugin={async cacheWillUpdate({response:s}){return!s||s.status>=400?null:s}};h.copyRedirectedCacheableResponsesPlugin={async cacheWillUpdate({response:s}){return s.redirected?await G(s):s}};class ee{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:a=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new h({cacheName:I.getPrecacheName(e),plugins:[...t,new Y({precacheController:this})],fallbackToNetwork:a}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const t=[];for(const a of e){typeof a=="string"?t.push(a):a&&a.revision===void 0&&t.push(a.url);const{cacheKey:i,url:n}=J(a),r=typeof a!="string"&&a.revision?"reload":"default";if(this._urlsToCacheKeys.has(n)&&this._urlsToCacheKeys.get(n)!==i)throw new l("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(n),secondEntry:i});if(typeof a!="string"&&a.integrity){if(this._cacheKeysToIntegrities.has(i)&&this._cacheKeysToIntegrities.get(i)!==a.integrity)throw new l("add-to-cache-list-conflicting-integrities",{url:n});this._cacheKeysToIntegrities.set(i,a.integrity)}if(this._urlsToCacheKeys.set(n,i),this._urlsToCacheModes.set(n,r),t.length>0){const c=`Workbox is precaching URLs without revision info: ${t.join(", ")}
This is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(c)}}}install(e){return U(e,async()=>{const t=new X;this.strategy.plugins.push(t);for(const[n,r]of this._urlsToCacheKeys){const c=this._cacheKeysToIntegrities.get(r),o=this._urlsToCacheModes.get(n),d=new Request(n,{integrity:c,cache:o,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:r},request:d,event:e}))}const{updatedURLs:a,notUpdatedURLs:i}=t;return{updatedURLs:a,notUpdatedURLs:i}})}activate(e){return U(e,async()=>{const t=await self.caches.open(this.strategy.cacheName),a=await t.keys(),i=new Set(this._urlsToCacheKeys.values()),n=[];for(const r of a)i.has(r.url)||(await t.delete(r),n.push(r.url));return{deletedURLs:n}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,a=this.getCacheKeyForURL(t);if(a)return(await self.caches.open(this.strategy.cacheName)).match(a)}createHandlerBoundToURL(e){const t=this.getCacheKeyForURL(e);if(!t)throw new l("non-precached-url",{url:e});return a=>(a.request=new Request(e),a.params=Object.assign({cacheKey:t},a.params),this.strategy.handle(a))}}let C;const v=()=>(C||(C=new ee),C);try{self["workbox:routing:7.0.0"]&&_()}catch{}const K="GET",m=s=>s&&typeof s=="object"?s:{handle:s};class b{constructor(e,t,a=K){this.handler=m(t),this.match=e,this.method=a}setCatchHandler(e){this.catchHandler=m(e)}}class te extends b{constructor(e,t,a){const i=({url:n})=>{const r=e.exec(n.href);if(r&&!(n.origin!==location.origin&&r.index!==0))return r.slice(1)};super(i,t,a)}}class ae{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,a=this.handleRequest({request:t,event:e});a&&e.respondWith(a)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&e.data.type==="CACHE_URLS"){const{payload:t}=e.data,a=Promise.all(t.urlsToCache.map(i=>{typeof i=="string"&&(i=[i]);const n=new Request(...i);return this.handleRequest({request:n,event:e})}));e.waitUntil(a),e.ports&&e.ports[0]&&a.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const a=new URL(e.url,location.href);if(!a.protocol.startsWith("http"))return;const i=a.origin===location.origin,{params:n,route:r}=this.findMatchingRoute({event:t,request:e,sameOrigin:i,url:a});let c=r&&r.handler;const o=e.method;if(!c&&this._defaultHandlerMap.has(o)&&(c=this._defaultHandlerMap.get(o)),!c)return;let d;try{d=c.handle({url:a,request:e,event:t,params:n})}catch(u){d=Promise.reject(u)}const p=r&&r.catchHandler;return d instanceof Promise&&(this._catchHandler||p)&&(d=d.catch(async u=>{if(p)try{return await p.handle({url:a,request:e,event:t,params:n})}catch(D){D instanceof Error&&(u=D)}if(this._catchHandler)return this._catchHandler.handle({url:a,request:e,event:t});throw u})),d}findMatchingRoute({url:e,sameOrigin:t,request:a,event:i}){const n=this._routes.get(a.method)||[];for(const r of n){let c;const o=r.match({url:e,sameOrigin:t,request:a,event:i});if(o)return c=o,(Array.isArray(c)&&c.length===0||o.constructor===Object&&Object.keys(o).length===0||typeof o=="boolean")&&(c=void 0),{route:r,params:c}}return{}}setDefaultHandler(e,t=K){this._defaultHandlerMap.set(t,m(e))}setCatchHandler(e){this._catchHandler=m(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new l("unregister-route-but-not-found-with-method",{method:e.method});const t=this._routes.get(e.method).indexOf(e);if(t>-1)this._routes.get(e.method).splice(t,1);else throw new l("unregister-route-route-not-registered")}}let w;const se=()=>(w||(w=new ae,w.addFetchListener(),w.addCacheListener()),w);function x(s,e,t){let a;if(typeof s=="string"){const n=new URL(s,location.href),r=({url:c})=>c.href===n.href;a=new b(r,e,t)}else if(s instanceof RegExp)a=new te(s,e,t);else if(typeof s=="function")a=new b(s,e,t);else if(s instanceof b)a=s;else throw new l("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});return se().registerRoute(a),a}function ie(s,e=[]){for(const t of[...s.searchParams.keys()])e.some(a=>a.test(t))&&s.searchParams.delete(t);return s}function*ne(s,{ignoreURLParametersMatching:e=[/^utm_/,/^fbclid$/],directoryIndex:t="index.html",cleanURLs:a=!0,urlManipulation:i}={}){const n=new URL(s,location.href);n.hash="",yield n.href;const r=ie(n,e);if(yield r.href,t&&r.pathname.endsWith("/")){const c=new URL(r.href);c.pathname+=t,yield c.href}if(a){const c=new URL(r.href);c.pathname+=".html",yield c.href}if(i){const c=i({url:n});for(const o of c)yield o.href}}class re extends b{constructor(e,t){const a=({request:i})=>{const n=e.getURLsToCacheKeys();for(const r of ne(i.url,t)){const c=n.get(r);if(c){const o=e.getIntegrityForCacheKey(c);return{cacheKey:c,integrity:o}}}};super(a,e.strategy)}}function ce(s){const e=v(),t=new re(e,s);x(t)}function L(s){return v().getCacheKeyForURL(s)}function P(s){return v().matchPrecache(s)}function oe(s){v().precache(s)}function le(s,e){oe(s),ce(e)}class de extends b{constructor(e,{allowlist:t=[/./],denylist:a=[]}={}){super(i=>this._match(i),e),this._allowlist=t,this._denylist=a}_match({url:e,request:t}){if(t&&t.mode!=="navigate")return!1;const a=e.pathname+e.search;for(const i of this._denylist)if(i.test(a))return!1;return!!this._allowlist.some(i=>i.test(a))}}const ue={cacheWillUpdate:async({response:s})=>s.status===200||s.status===0?s:null};class fe extends k{constructor(e={}){super(e),this.plugins.some(t=>"cacheWillUpdate"in t)||this.plugins.unshift(ue),this._networkTimeoutSeconds=e.networkTimeoutSeconds||0}async _handle(e,t){const a=[],i=[];let n;if(this._networkTimeoutSeconds){const{id:o,promise:d}=this._getTimeoutPromise({request:e,logs:a,handler:t});n=o,i.push(d)}const r=this._getNetworkPromise({timeoutId:n,request:e,logs:a,handler:t});i.push(r);const c=await t.waitUntil((async()=>await t.waitUntil(Promise.race(i))||await r)());if(!c)throw new l("no-response",{url:e.url});return c}_getTimeoutPromise({request:e,logs:t,handler:a}){let i;return{promise:new Promise(r=>{i=setTimeout(async()=>{r(await a.cacheMatch(e))},this._networkTimeoutSeconds*1e3)}),id:i}}async _getNetworkPromise({timeoutId:e,request:t,logs:a,handler:i}){let n,r;try{r=await i.fetchAndCachePut(t)}catch(c){c instanceof Error&&(n=c)}return e&&clearTimeout(e),(n||!r)&&(r=await i.cacheMatch(t)),r}}class he extends k{constructor(e={}){super(e),this._networkTimeoutSeconds=e.networkTimeoutSeconds||0}async _handle(e,t){let a,i;try{const n=[t.fetch(e)];if(this._networkTimeoutSeconds){const r=T(this._networkTimeoutSeconds*1e3);n.push(r)}if(i=await Promise.race(n),!i)throw new Error(`Timed out the network response after ${this._networkTimeoutSeconds} seconds.`)}catch(n){n instanceof Error&&(a=n)}if(!i)throw new l("no-response",{url:e.url,error:a});return i}}importScripts("sw-runtime-resources-precache.js");self.skipWaiting();z();let A=[{url:".",revision:"ad08610512d30bad4307992b80025460"},{url:"VAADIN/build/FlowBootstrap-feff2646.js",revision:"86c7b60228bd60b898bd22f12bb25dd6"},{url:"VAADIN/build/FlowClient-341d667e.js",revision:"5b9fbf60cc8cc0bc2e4a23f47d1898d0"},{url:"VAADIN/build/generated-flow-imports-271a50e1.js",revision:"25f7a694d46a594c146c21ea132cdbe9"},{url:"VAADIN/build/indexhtml-fc9bddd6.js",revision:"2218472fad4686a0aa0537e7b70b4014"},{url:"VAADIN/build/vaadin-accordion-eed3b794-e57a94a6.js",revision:"4bea2b952c999d9ec4e7d57940149e7b"},{url:"VAADIN/build/vaadin-accordion-heading-c0acdd6d-f5d6a499.js",revision:"06950fc68e87d60fd45a0a6abe559950"},{url:"VAADIN/build/vaadin-accordion-panel-616e55d6-c9ff3373.js",revision:"4e02bdfc5479c7e017c3a8f8ab72b9c8"},{url:"VAADIN/build/vaadin-app-layout-e56de2e9-e5c07d5b.js",revision:"d7e02be067a6197e3d72828db2c15869"},{url:"VAADIN/build/vaadin-avatar-7599297d-a0bfadac.js",revision:"217acf22af52cc926a2a0f05b58bbd63"},{url:"VAADIN/build/vaadin-big-decimal-field-e51def24-afb43b58.js",revision:"014ddaf6700c597ffb6d97de53a4a18b"},{url:"VAADIN/build/vaadin-board-828ebdea-1f6f1dae.js",revision:"fd5e08a70723ec2f25b362fc0825815d"},{url:"VAADIN/build/vaadin-board-row-c70d0c55-1c09023f.js",revision:"bad57bac6b190c8c6fe7700b89cc33f5"},{url:"VAADIN/build/vaadin-button-2511ad84-28e31c04.js",revision:"f313710f14e6a94b12505dd1571ed38b"},{url:"VAADIN/build/vaadin-chart-5192dc15-9f3b365f.js",revision:"fe9f057d94389b6a96b7e84123472854"},{url:"VAADIN/build/vaadin-checkbox-4e68df64-0e341401.js",revision:"b1741a7a58fcf02a65c53579b0249504"},{url:"VAADIN/build/vaadin-checkbox-group-a7c65bf2-f80f0e13.js",revision:"460e2afbd89754ab0007db5fd3315c5a"},{url:"VAADIN/build/vaadin-combo-box-96451ddd-768cbe44.js",revision:"ea82749722a3b21a623a35ef3ee57263"},{url:"VAADIN/build/vaadin-confirm-dialog-4d718829-3de7c86d.js",revision:"4c1cd37990b70f5358efec84ea7ba9e6"},{url:"VAADIN/build/vaadin-cookie-consent-46c09f8b-bef6ee77.js",revision:"9fea1d2b7c4ff838218e8a9947774890"},{url:"VAADIN/build/vaadin-crud-8d161a22-f58c3547.js",revision:"126c23e11b985151e46cdaed520c3d6e"},{url:"VAADIN/build/vaadin-custom-field-42c85b9e-0e97af0c.js",revision:"806e69c3bef857a68cabec23b45781ee"},{url:"VAADIN/build/vaadin-date-picker-f2001167-df4843bf.js",revision:"c139fce5e004d3473bb07b3bc16e6515"},{url:"VAADIN/build/vaadin-date-time-picker-c8c047a7-221cc0d8.js",revision:"c026de966926098f0e87d1418ceba60e"},{url:"VAADIN/build/vaadin-details-bf336660-b900f3ab.js",revision:"706f94452f0ac52ff8a31dbad97c9de1"},{url:"VAADIN/build/vaadin-details-summary-351a1448-32155e6f.js",revision:"f55e0fe35a0c007900b12c4f7d9aa1d6"},{url:"VAADIN/build/vaadin-dialog-53253a08-4fdec122.js",revision:"11b28ab6e78fefb134e9f97317aabfe6"},{url:"VAADIN/build/vaadin-email-field-d7a35f04-00870cea.js",revision:"a2ec9272ef0d77167ab1aabcba80cf0c"},{url:"VAADIN/build/vaadin-form-layout-47744b1d-4f2541e4.js",revision:"1e7cef9c6ff9136a35741a6c1651ad8c"},{url:"VAADIN/build/vaadin-grid-0a4791c2-cbb1454f.js",revision:"79b6bb96bd379dfb270a327a23b88a75"},{url:"VAADIN/build/vaadin-grid-pro-ff415555-abcef51e.js",revision:"911c43649be31cab57214628c65a0343"},{url:"VAADIN/build/vaadin-horizontal-layout-3193943f-ff4988e4.js",revision:"c98ab8c3c56a82be22501aaf1855b701"},{url:"VAADIN/build/vaadin-icon-601f36ed-6dad6de5.js",revision:"35c53e107c0a400df7091f9fb5f13d31"},{url:"VAADIN/build/vaadin-integer-field-85078932-7ac0b9d2.js",revision:"a1cfd7236002d8acddc09159d0a522e9"},{url:"VAADIN/build/vaadin-list-box-d7a8433b-2343d551.js",revision:"29249e5113c33b09947a35553d53cc69"},{url:"VAADIN/build/vaadin-login-form-638996c6-5e9667f0.js",revision:"f2be121d0d0ee8e8ae3e19f102b13453"},{url:"VAADIN/build/vaadin-login-overlay-f8a5db8a-3ed60895.js",revision:"9c13217f99e45db7ec90b10cc14b98ee"},{url:"VAADIN/build/vaadin-map-d40a0116-308f5d06.js",revision:"f7657e45c592430bff2ea6a33a8103e4"},{url:"VAADIN/build/vaadin-menu-bar-3f5ab096-46145081.js",revision:"ec4066e5311d836626916a7ac832c7c5"},{url:"VAADIN/build/vaadin-message-input-996ac37c-d46eb33f.js",revision:"c7f6248a9b5b6e5aa7c8f22c4dd4ed39"},{url:"VAADIN/build/vaadin-message-list-70a435ba-80fe3eff.js",revision:"02aef4998999be60d1ff03f791575baa"},{url:"VAADIN/build/vaadin-multi-select-combo-box-a3373557-06abf197.js",revision:"f65ef9c0517d3194fe5cc38769d8ff85"},{url:"VAADIN/build/vaadin-notification-bd6eb776-0f726273.js",revision:"eb1e52c1e5e90b24eb31148d31a74e1a"},{url:"VAADIN/build/vaadin-number-field-cb3ee8b2-59c1118f.js",revision:"b4bd3df7082dd9a64675c3ae13aac7f1"},{url:"VAADIN/build/vaadin-password-field-d289cb18-8568457f.js",revision:"ac1d49345a6fc00ff1d00eda274e9c96"},{url:"VAADIN/build/vaadin-progress-bar-309ecf1f-98e7f341.js",revision:"2013ce1b81fea8290471d7cdc8568c35"},{url:"VAADIN/build/vaadin-radio-group-88b5afd8-aa0e03d6.js",revision:"2042c6461f9c0bb5960f20c2baeeebca"},{url:"VAADIN/build/vaadin-rich-text-editor-8cd892f2-8a93660e.js",revision:"806cff0b8295f6b711269735c59431f8"},{url:"VAADIN/build/vaadin-scroller-35e68818-54f7164d.js",revision:"2f8efb9fe6c658cd0179562952b3656c"},{url:"VAADIN/build/vaadin-select-df6e9947-f4e965a1.js",revision:"bf7dc700f33679e1668d43f5403de451"},{url:"VAADIN/build/vaadin-side-nav-ba80d91d-b7e712a9.js",revision:"abe7dbd68295d5ec78a7fc044177be8c"},{url:"VAADIN/build/vaadin-side-nav-item-34918f92-a84ef13e.js",revision:"25ea12c0a4a119eabf5e7d380634b923"},{url:"VAADIN/build/vaadin-split-layout-80c92131-3da19e4d.js",revision:"3266f2ebf699f69c623a52c67d6c7e66"},{url:"VAADIN/build/vaadin-spreadsheet-59d8c5ef-183391cb.js",revision:"e6ef1575c73980d3c5bf4ca662b8648a"},{url:"VAADIN/build/vaadin-tab-aaf32809-23af17d1.js",revision:"3905db6ec07f527d1d5cdb9d2f2a0e5d"},{url:"VAADIN/build/vaadin-tabs-d9a5e24e-8ef0ac33.js",revision:"ef67edeb6c47c3859f0ee80fa84cd0d8"},{url:"VAADIN/build/vaadin-tabsheet-dd99ed9a-a3978a0e.js",revision:"7d3bbb80540d98e6fd625371c692e1cf"},{url:"VAADIN/build/vaadin-text-area-83627ebc-e3244b7b.js",revision:"45e4c0590728507d2f045d6d70ae1d19"},{url:"VAADIN/build/vaadin-text-field-0b3db014-12c9e4c9.js",revision:"d13880c2742f97827489844a65e7f277"},{url:"VAADIN/build/vaadin-time-picker-715ec415-0fca4d71.js",revision:"acc2d1e41a85551ef8320401ec97c747"},{url:"VAADIN/build/vaadin-upload-d3c162ed-bf653c90.js",revision:"443d42a98c2b01d4f182df5caee01df7"},{url:"VAADIN/build/vaadin-vertical-layout-ad4174c4-b815875e.js",revision:"0033194440072d280d47530293b96110"},{url:"VAADIN/build/vaadin-virtual-list-96896203-4c31d1ca.js",revision:"3ae1ab2b7748cfed364d500261e6eff4"}],be=A.findIndex(s=>s.url===".")>=0;var V;(V=self.additionalManifestEntries)!=null&&V.length&&A.push(...self.additionalManifestEntries.filter(s=>s.url!=="."||!be));const pe="offline.html",ge=new URL(self.registration.scope);async function we(s){const e=await s.text();return new Response(e.replace(/<base\s+href=[^>]*>/,`<base href="${self.registration.scope}">`),s)}function ye(s){return A.some(e=>L(e.url)===L(`${s}`))}let N=!1;function E(){return{async fetchDidFail(){N=!0},async fetchDidSucceed({response:s}){return N=!1,s}}}const me=new he({plugins:[E()]});new fe({plugins:[E()]});x(new de(async s=>{async function e(){const a=await P(pe);return a?we(a):void 0}function t(){return s.url.pathname===ge.pathname?e():ye(s.url)?P(s.request):e()}if(!self.navigator.onLine){const a=await t();if(a)return a}try{return await me.handle(s)}catch(a){const i=await t();if(i)return i;throw a}}));le(A);self.addEventListener("message",s=>{var e;typeof s.data!="object"||!("method"in s.data)||s.data.method==="Vaadin.ServiceWorker.isConnectionLost"&&"id"in s.data&&((e=s.source)==null||e.postMessage({id:s.data.id,result:N},[]))});self.addEventListener("push",s=>{var t;const e=(t=s.data)==null?void 0:t.json();e&&self.registration.showNotification(e.title,{body:e.body})});self.addEventListener("notificationclick",s=>{s.notification.close(),s.waitUntil(ve())});async function ve(){const s=new URL("/",self.location.origin).href,t=(await self.clients.matchAll({type:"window"})).find(a=>a.url===s);return t?t.focus():self.clients.openWindow(s)}
