parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"v3go":[function(require,module,exports) {

var t,e,n=module.exports={};function r(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function i(e){if(t===setTimeout)return setTimeout(e,0);if((t===r||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(n){try{return t.call(null,e,0)}catch(n){return t.call(this,e,0)}}}function u(t){if(e===clearTimeout)return clearTimeout(t);if((e===o||!e)&&clearTimeout)return e=clearTimeout,clearTimeout(t);try{return e(t)}catch(n){try{return e.call(null,t)}catch(n){return e.call(this,t)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:r}catch(e){t=r}try{e="function"==typeof clearTimeout?clearTimeout:o}catch(t){e=o}}();var c,s=[],l=!1,a=-1;function f(){l&&c&&(l=!1,c.length?s=c.concat(s):a=-1,s.length&&h())}function h(){if(!l){var t=i(f);l=!0;for(var e=s.length;e;){for(c=s,s=[];++a<e;)c&&c[a].run();a=-1,e=s.length}c=null,l=!1,u(t)}}function m(t,e){this.fun=t,this.array=e}function p(){}n.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];s.push(new m(t,e)),1!==s.length||l||i(h)},m.prototype.run=function(){this.fun.apply(null,this.array)},n.title="browser",n.browser=!0,n.env={},n.argv=[],n.version="",n.versions={},n.on=p,n.addListener=p,n.once=p,n.off=p,n.removeListener=p,n.removeAllListeners=p,n.emit=p,n.prependListener=p,n.prependOnceListener=p,n.listeners=function(t){return[]},n.binding=function(t){throw new Error("process.binding is not supported")},n.cwd=function(){return"/"},n.chdir=function(t){throw new Error("process.chdir is not supported")},n.umask=function(){return 0};
},{}],"OtxC":[function(require,module,exports) {
var define;
var global = arguments[3];
var process = require("process");
var t,e=arguments[3],r=require("process");!function(e,r){"object"==typeof exports&&"undefined"!=typeof module?module.exports=r():"function"==typeof t&&t.amd?t(r):e.ES6Promise=r()}(this,function(){"use strict";function t(t){return"function"==typeof t}var n=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)},o=0,i=void 0,s=void 0,u=function(t,e){p[o]=t,p[o+1]=e,2===(o+=2)&&(s?s(_):w())};var c="undefined"!=typeof window?window:void 0,a=c||{},f=a.MutationObserver||a.WebKitMutationObserver,l="undefined"==typeof self&&void 0!==r&&"[object process]"==={}.toString.call(r),h="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel;function v(){var t=setTimeout;return function(){return t(_,1)}}var p=new Array(1e3);function _(){for(var t=0;t<o;t+=2){(0,p[t])(p[t+1]),p[t]=void 0,p[t+1]=void 0}o=0}var d,y,m,b,w=void 0;function g(t,e){var r=this,n=new this.constructor(S);void 0===n[j]&&N(n);var o=r._state;if(o){var i=arguments[o-1];u(function(){return K(o,n,i,r._result)})}else k(r,n,t,e);return n}function A(t){if(t&&"object"==typeof t&&t.constructor===this)return t;var e=new this(S);return O(e,t),e}l?w=function(){return r.nextTick(_)}:f?(y=0,m=new f(_),b=document.createTextNode(""),m.observe(b,{characterData:!0}),w=function(){b.data=y=++y%2}):h?((d=new MessageChannel).port1.onmessage=_,w=function(){return d.port2.postMessage(0)}):w=void 0===c&&"function"==typeof require?function(){try{var t=Function("return this")().require("vertx");return void 0!==(i=t.runOnLoop||t.runOnContext)?function(){i(_)}:v()}catch(t){return v()}}():v();var j=Math.random().toString(36).substring(2);function S(){}var E=void 0,T=1,M=2,P={error:null};function x(t){try{return t.then}catch(t){return P.error=t,P}}function C(e,r,n){r.constructor===e.constructor&&n===g&&r.constructor.resolve===A?function(t,e){e._state===T?F(t,e._result):e._state===M?Y(t,e._result):k(e,void 0,function(e){return O(t,e)},function(e){return Y(t,e)})}(e,r):n===P?(Y(e,P.error),P.error=null):void 0===n?F(e,r):t(n)?function(t,e,r){u(function(t){var n=!1,o=function(t,e,r,n){try{t.call(e,r,n)}catch(t){return t}}(r,e,function(r){n||(n=!0,e!==r?O(t,r):F(t,r))},function(e){n||(n=!0,Y(t,e))},t._label);!n&&o&&(n=!0,Y(t,o))},t)}(e,r,n):F(e,r)}function O(t,e){var r,n;t===e?Y(t,new TypeError("You cannot resolve a promise with itself")):(n=typeof(r=e),null===r||"object"!==n&&"function"!==n?F(t,e):C(t,e,x(e)))}function q(t){t._onerror&&t._onerror(t._result),D(t)}function F(t,e){t._state===E&&(t._result=e,t._state=T,0!==t._subscribers.length&&u(D,t))}function Y(t,e){t._state===E&&(t._state=M,t._result=e,u(q,t))}function k(t,e,r,n){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=e,o[i+T]=r,o[i+M]=n,0===i&&t._state&&u(D,t)}function D(t){var e=t._subscribers,r=t._state;if(0!==e.length){for(var n=void 0,o=void 0,i=t._result,s=0;s<e.length;s+=3)n=e[s],o=e[s+r],n?K(r,n,o,i):o(i);t._subscribers.length=0}}function K(e,r,n,o){var i=t(n),s=void 0,u=void 0,c=void 0,a=void 0;if(i){if((s=function(t,e){try{return t(e)}catch(t){return P.error=t,P}}(n,o))===P?(a=!0,u=s.error,s.error=null):c=!0,r===s)return void Y(r,new TypeError("A promises callback cannot return that same promise."))}else s=o,c=!0;r._state!==E||(i&&c?O(r,s):a?Y(r,u):e===T?F(r,s):e===M&&Y(r,s))}var L=0;function N(t){t[j]=L++,t._state=void 0,t._result=void 0,t._subscribers=[]}var U=function(){function t(t,e){this._instanceConstructor=t,this.promise=new t(S),this.promise[j]||N(this.promise),n(e)?(this.length=e.length,this._remaining=e.length,this._result=new Array(this.length),0===this.length?F(this.promise,this._result):(this.length=this.length||0,this._enumerate(e),0===this._remaining&&F(this.promise,this._result))):Y(this.promise,new Error("Array Methods must be provided an Array"))}return t.prototype._enumerate=function(t){for(var e=0;this._state===E&&e<t.length;e++)this._eachEntry(t[e],e)},t.prototype._eachEntry=function(t,e){var r=this._instanceConstructor,n=r.resolve;if(n===A){var o=x(t);if(o===g&&t._state!==E)this._settledAt(t._state,e,t._result);else if("function"!=typeof o)this._remaining--,this._result[e]=t;else if(r===W){var i=new r(S);C(i,t,o),this._willSettleAt(i,e)}else this._willSettleAt(new r(function(e){return e(t)}),e)}else this._willSettleAt(n(t),e)},t.prototype._settledAt=function(t,e,r){var n=this.promise;n._state===E&&(this._remaining--,t===M?Y(n,r):this._result[e]=r),0===this._remaining&&F(n,this._result)},t.prototype._willSettleAt=function(t,e){var r=this;k(t,void 0,function(t){return r._settledAt(T,e,t)},function(t){return r._settledAt(M,e,t)})},t}();var W=function(){function t(e){this[j]=L++,this._result=this._state=void 0,this._subscribers=[],S!==e&&("function"!=typeof e&&function(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}(),this instanceof t?function(t,e){try{e(function(e){O(t,e)},function(e){Y(t,e)})}catch(e){Y(t,e)}}(this,e):function(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}())}return t.prototype.catch=function(t){return this.then(null,t)},t.prototype.finally=function(t){var e=this.constructor;return this.then(function(r){return e.resolve(t()).then(function(){return r})},function(r){return e.resolve(t()).then(function(){throw r})})},t}();return W.prototype.then=g,W.all=function(t){return new U(this,t).promise},W.race=function(t){var e=this;return n(t)?new e(function(r,n){for(var o=t.length,i=0;i<o;i++)e.resolve(t[i]).then(r,n)}):new e(function(t,e){return e(new TypeError("You must pass an array to race."))})},W.resolve=A,W.reject=function(t){var e=new this(S);return Y(e,t),e},W._setScheduler=function(t){s=t},W._setAsap=function(t){u=t},W._asap=u,W.polyfill=function(){var t=void 0;if(void 0!==e)t=e;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(t){throw new Error("polyfill failed because global object is unavailable in this environment")}var r=t.Promise;if(r){var n=null;try{n=Object.prototype.toString.call(r.resolve())}catch(t){}if("[object Promise]"===n&&!r.cast)return}t.Promise=W},W.Promise=W,W});
},{"process":"v3go"}],"uUrv":[function(require,module,exports) {
"use strict";module.exports=require("./").polyfill();
},{"./":"OtxC"}],"KOdN":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Utils=void 0;var e=require("./board"),r=function(){function r(){}return r.showMessage=function(e){void 0===e&&(e="");var r=document.querySelector(".message");if(r){r.classList.remove("hidden");var o=document.querySelector(".message-body-content");if(o){o.innerHTML=e;var n=document.querySelector(".message-body-dismiss");if(n){n.addEventListener("click",function e(){r.classList.add("invisible"),r.addEventListener("transitionend",function(){r.classList.add("hidden"),r.classList.remove("invisible")}),n.removeEventListener("click",e)})}else console.error("Message body dismiss DOM is null!")}else console.error("Message body content DOM is null!")}else console.error("Message DOM is null!")},r.drawCircle=function(e,r){var o=r.x,n=void 0===o?0:o,t=r.y,i=void 0===t?0:t,a=r.r,s=void 0===a?0:a,d=r.fillStyle,c=void 0===d?"":d,l=r.strokeStyle,u=void 0===l?"":l;e.save(),e.fillStyle=c,e.strokeStyle=u,e.beginPath(),e.arc(n,i,s,0,2*Math.PI,!1),e.fill(),e.restore()},r.drawMask=function(r){var o=r.context;o.save(),o.fillStyle=e.Board.MASK_COLOR,o.beginPath();for(var n=2*e.Board.PIECE_RADIUS,t=3*e.Board.PIECE_RADIUS,i=0;i<e.Board.ROWS;i++)for(var a=0;a<e.Board.COLUMNS;a++)o.arc(t*a+e.Board.MASK_X_BEGIN+n,t*i+e.Board.MASK_Y_BEGIN+n,e.Board.PIECE_RADIUS,0,2*Math.PI),o.rect(t*a+e.Board.MASK_X_BEGIN+2*n,t*i+e.Board.MASK_Y_BEGIN,-2*n,2*n);o.fill(),o.restore()},r.clearCanvas=function(e){e.context.clearRect(0,0,e.canvas.width,e.canvas.height)},r.isCoordOnColumn=function(e,r,o){return(e.x-r)*(e.x-r)<=o*o},r.getColumnFromCoord=function(o){for(var n=0;n<e.Board.COLUMNS;n++)if(r.isCoordOnColumn(o,3*e.Board.PIECE_RADIUS*n+e.Board.MASK_X_BEGIN+2*e.Board.PIECE_RADIUS,e.Board.PIECE_RADIUS))return n;return-1},r.getRandomColumnNumber=function(){return Math.floor(Math.random()*e.Board.COLUMNS)},r.choose=function(e){return e[Math.floor(Math.random()*e.length)]},r.animationFrame=function(){var e=null,r=new Promise(function(r){return e=r});return e&&window.requestAnimationFrame(e),r},r.clone=function(e){for(var r=[],o=0;o<e.length;o++)r[o]=e[o].slice();return r},r.getMockPlayerAction=function(o,n,t){var i=r.clone(o);if(i[0][t]!==e.BoardPiece.EMPTY||t<0||t>=e.Board.COLUMNS)return{success:!1,map:i};for(var a=!1,s=0,d=0;d<e.Board.ROWS-1;d++)if(i[d+1][t]!==e.BoardPiece.EMPTY){a=!0,s=d;break}return a||(s=e.Board.ROWS-1),i[s][t]=n,{success:!0,map:i}},r.onresize=function(){var e=[],r=!1;function o(){r||(r=!0,window.requestAnimationFrame?window.requestAnimationFrame(n):setTimeout(n,66))}function n(){e.forEach(function(e){e()}),r=!1}return{add:function(r){e.length||window.addEventListener("resize",o),function(r){r&&e.push(r)}(r)}}},r.BIG_POSITIVE_NUMBER=Math.pow(10,9)+7,r.BIG_NEGATIVE_NUMBER=-r.BIG_POSITIVE_NUMBER,r}();exports.Utils=r;
},{"./board":"C8B6"}],"C8B6":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Board=exports.BoardPiece=void 0;var t=require("./utils"),e=function(t,e,r,n){return new(r||(r=Promise))(function(i,o){function a(t){try{c(n.next(t))}catch(t){o(t)}}function s(t){try{c(n.throw(t))}catch(t){o(t)}}function c(t){t.done?i(t.value):new r(function(e){e(t.value)}).then(a,s)}c((n=n.apply(t,e||[])).next())})},r=function(t,e){var r,n,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(o){return function(s){return function(o){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(i=2&o[0]?n.return:o[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,o[1])).done)return i;switch(n=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,n=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!(i=(i=a.trys).length>0&&i[i.length-1])&&(6===o[0]||2===o[0])){a=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1];break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o);break}i[2]&&a.ops.pop(),a.trys.pop();continue}o=e.call(t,a)}catch(t){o=[6,t],n=0}finally{r=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}},n=exports.BoardPiece=void 0;!function(t){t[t.EMPTY=0]="EMPTY",t[t.PLAYER_1=1]="PLAYER_1",t[t.PLAYER_2=2]="PLAYER_2",t[t.DRAW=3]="DRAW"}(n||(exports.BoardPiece=n={}));var i=function(){function i(t){this.canvas=t,this.context=t.getContext("2d"),this.map=[],this.winnerBoardPiece=n.EMPTY,this.getBoardScale(),this.initConstants(),this.reset(),this.onresize()}return i.prototype.reset=function(){this.map=[];for(var e=0;e<i.ROWS;e++){this.map.push([]);for(var r=0;r<i.COLUMNS;r++)this.map[e].push(n.EMPTY)}this.winnerBoardPiece=n.EMPTY,t.Utils.clearCanvas(this)},i.prototype.getBoardScale=function(){return window.innerWidth<640?i.SCALE=.5:i.SCALE=1},i.prototype.initConstants=function(){i.CANVAS_HEIGHT=480*i.SCALE,i.CANVAS_WIDTH=640*i.SCALE,i.PIECE_RADIUS=25*i.SCALE,i.MASK_X_BEGIN=Math.max(0,i.CANVAS_WIDTH-(3*i.COLUMNS+1)*i.PIECE_RADIUS)/2,i.MASK_Y_BEGIN=Math.max(0,i.CANVAS_HEIGHT-(3*i.ROWS+1)*i.PIECE_RADIUS)/2,i.MESSAGE_WIDTH=400*i.SCALE,i.MESSAGE_X_BEGIN=(i.CANVAS_WIDTH-i.MESSAGE_WIDTH)/2,i.MESSAGE_Y_BEGIN=20*i.SCALE,this.canvas.width=i.CANVAS_WIDTH,this.canvas.height=i.CANVAS_HEIGHT},i.prototype.onresize=function(){var e=this,r=i.SCALE;t.Utils.onresize().add(function(){e.getBoardScale(),r!==i.SCALE&&(r=i.SCALE,e.initConstants(),t.Utils.clearCanvas(e),e.render())})},i.prototype.applyPlayerAction=function(o,a){return e(this,void 0,Promise,function(){var e,s,c;return r(this,function(r){switch(r.label){case 0:if(this.map[0][a]!==n.EMPTY||a<0||a>=i.COLUMNS)return[2,!1];for(e=!1,s=0,c=0;c<i.ROWS-1;c++)if(this.map[c+1][a]!==n.EMPTY){e=!0,s=c;break}return e||(s=i.ROWS-1),[4,this.animateAction(s,a,o.boardPiece)];case 1:return r.sent(),this.map[s][a]=o.boardPiece,this.debug(),[4,t.Utils.animationFrame()];case 2:return r.sent(),this.render(),[2,!0]}})})},i.prototype.debug=function(){console.log(this.map.map(function(t){return t.join(" ")}).join("\n"))},i.prototype.getWinner=function(){var t=this;if(this.winnerBoardPiece!==n.EMPTY)return this.winnerBoardPiece;for(var e=[[0,-1],[0,1],[-1,-1],[-1,0],[-1,1],[1,-1],[1,0],[1,1]],r=function e(r,n,o,a,s){return s>=4||!(r<0||n<0||r>=i.ROWS||n>=i.COLUMNS||t.map[r][n]!==o)&&e(r+a[0],n+a[1],o,a,s+1)},o=0,a=0;a<i.ROWS;a++)for(var s=0;s<i.COLUMNS;s++){var c=this.map[a][s];if(c!==n.EMPTY)for(var u=0;u<e.length;u++){if(r(a+e[u][0],s+e[u][1],c,e[u],1))return this.winnerBoardPiece=c}else o++}return 0===o?this.winnerBoardPiece=n.DRAW:n.EMPTY},i.prototype.announceWinner=function(){if(this.winnerBoardPiece!==n.EMPTY){var e="<h1>Thank you for playing.</h1>";this.winnerBoardPiece===n.DRAW?e+="It's a draw":e+="Player "+this.winnerBoardPiece+" wins",e+=".<br />After dismissing this message, click the board to reset game.",t.Utils.showMessage(e)}},i.prototype.getPlayerColor=function(t){switch(t){case n.PLAYER_1:return i.PLAYER_1_COLOR;case n.PLAYER_2:return i.PLAYER_2_COLOR;default:return"transparent"}},i.prototype.animateAction=function(n,o,a){return e(this,void 0,Promise,function(){var s,c,u,E=this;return r(this,function(l){switch(l.label){case 0:s=this.getPlayerColor(a),c=0,u=function(){return e(E,void 0,void 0,function(){return r(this,function(e){return t.Utils.clearCanvas(this),t.Utils.drawCircle(this.context,{x:3*i.PIECE_RADIUS*o+i.MASK_X_BEGIN+2*i.PIECE_RADIUS,y:c+i.MASK_Y_BEGIN+2*i.PIECE_RADIUS,r:i.PIECE_RADIUS,fillStyle:s,strokeStyle:i.PIECE_STROKE_STYLE}),this.render(),c+=i.PIECE_RADIUS,[2]})})},l.label=1;case 1:return 3*n*i.PIECE_RADIUS>=c?[4,t.Utils.animationFrame()]:[3,3];case 2:return l.sent(),u(),[3,1];case 3:return[2]}})})},i.prototype.render=function(){t.Utils.drawMask(this);for(var e=0;e<i.ROWS;e++)for(var r=0;r<i.COLUMNS;r++)t.Utils.drawCircle(this.context,{x:3*i.PIECE_RADIUS*r+i.MASK_X_BEGIN+2*i.PIECE_RADIUS,y:3*i.PIECE_RADIUS*e+i.MASK_Y_BEGIN+2*i.PIECE_RADIUS,r:i.PIECE_RADIUS,fillStyle:this.getPlayerColor(this.map[e][r]),strokeStyle:i.PIECE_STROKE_STYLE})},i.ROWS=6,i.COLUMNS=7,i.PLAYER_1_COLOR="#ef453b",i.PLAYER_2_COLOR="#0059ff",i.PIECE_STROKE_STYLE="black",i.MASK_COLOR="#d8d8d8",i}();exports.Board=i;
},{"./utils":"KOdN"}],"lX9h":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.GameBase=void 0;var e=require("../board"),t=function(e,t,r,n){return new(r||(r=Promise))(function(o,i){function s(e){try{l(n.next(e))}catch(e){i(e)}}function a(e){try{l(n.throw(e))}catch(e){i(e)}}function l(e){e.done?o(e.value):new r(function(t){t(e.value)}).then(s,a)}l((n=n.apply(e,t||[])).next())})},r=function(e,t){var r,n,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;s;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,n=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!(o=(o=s.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){s=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){s.label=i[1];break}if(6===i[0]&&s.label<o[1]){s.label=o[1],o=i;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(i);break}o[2]&&s.ops.pop(),s.trys.pop();continue}i=t.call(e,s)}catch(e){i=[6,e],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}},n=function(){function n(t,r){this.isMoveAllowed=!1,this.isGameWon=!1,this.board=new e.Board(r),this.players=t,this.currentPlayerId=0,this.reset()}return n.prototype.reset=function(){this.isMoveAllowed=!1,this.isGameWon=!1,this.board.reset(),this.board.render(),this.board.debug()},n.prototype.start=function(){return t(this,void 0,void 0,function(){var t;return r(this,function(r){switch(r.label){case 0:this.isMoveAllowed=!0,r.label=1;case 1:return this.isGameWon?[3,3]:[4,this.move()];case 2:return r.sent(),(t=this.board.getWinner())!==e.BoardPiece.EMPTY?(console.log("Game over: winner is player ",t),this.isGameWon=!0,this.isMoveAllowed=!1,this.board.announceWinner(),[3,3]):[3,1];case 3:return[2]}})})},n.prototype.move=function(){return t(this,void 0,void 0,function(){var e,t,n;return r(this,function(r){switch(r.label){case 0:if(!this.isMoveAllowed)return[2];e=this.players[this.currentPlayerId],t=!1,r.label=1;case 1:return t?[3,4]:[4,e.getAction(this.board)];case 2:return n=r.sent(),this.isMoveAllowed=!1,[4,this.board.applyPlayerAction(e,n)];case 3:return t=r.sent(),this.isMoveAllowed=!0,t?this.afterMove(n):console.log("Move not allowed! Try again."),[3,1];case 4:return this.currentPlayerId=this.getNextPlayer(),[2]}})})},n.prototype.afterMove=function(e){},n.prototype.getNextPlayer=function(){return 0===this.currentPlayerId?1:0},n}();exports.GameBase=n;
},{"../board":"C8B6"}],"y4P3":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){return function(e,t){this.boardPiece=e,this.canvas=t}}();exports.Player=e;
},{}],"InOJ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.PlayerAi=void 0;var e=require("./player"),t=require("../board"),r=require("../utils"),o=function(){var e=function(t,r){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(t,r)};return function(t,r){function o(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(o.prototype=r.prototype,new o)}}(),i=function(e,t,r,o){return new(r||(r=Promise))(function(i,a){function n(e){try{u(o.next(e))}catch(e){a(e)}}function c(e){try{u(o.throw(e))}catch(e){a(e)}}function u(e){e.done?i(e.value):new r(function(t){t(e.value)}).then(n,c)}u((o=o.apply(e,t||[])).next())})},a=function(e,t){var r,o,i,a,n={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return a={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function c(a){return function(c){return function(a){if(r)throw new TypeError("Generator is already executing.");for(;n;)try{if(r=1,o&&(i=2&a[0]?o.return:a[0]?o.throw||((i=o.return)&&i.call(o),0):o.next)&&!(i=i.call(o,a[1])).done)return i;switch(o=0,i&&(a=[2&a[0],i.value]),a[0]){case 0:case 1:i=a;break;case 4:return n.label++,{value:a[1],done:!1};case 5:n.label++,o=a[1],a=[0];continue;case 7:a=n.ops.pop(),n.trys.pop();continue;default:if(!(i=(i=n.trys).length>0&&i[i.length-1])&&(6===a[0]||2===a[0])){n=0;continue}if(3===a[0]&&(!i||a[1]>i[0]&&a[1]<i[3])){n.label=a[1];break}if(6===a[0]&&n.label<i[1]){n.label=i[1],i=a;break}if(i&&n.label<i[2]){n.label=i[2],n.ops.push(a);break}i[2]&&n.ops.pop(),n.trys.pop();continue}a=t.call(e,n)}catch(e){a=[6,e],o=0}finally{r=i=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,c])}}},n=function(e){function n(r,o){var i=e.call(this,r,o)||this;return i.ownBoardPieceValue=i.getBoardPieceValue(r),i.enemyBoardPiece=r===t.BoardPiece.PLAYER_1?t.BoardPiece.PLAYER_2:t.BoardPiece.PLAYER_1,i}return o(n,e),n.prototype.getBoardPieceValue=function(e){return e===t.BoardPiece.EMPTY?0:e===this.boardPiece?1:-1},n.prototype.getStateValue=function(e){for(var r=t.BoardPiece.EMPTY,o=0,i=0;i<t.Board.ROWS;i++)for(var a=0;a<t.Board.COLUMNS;a++){for(var n=0,c=0,u=0,s=0,l=0;l<=3;l++)a+l<t.Board.COLUMNS&&(n+=this.getBoardPieceValue(e[i][a+l])),i+l<t.Board.ROWS&&(c+=this.getBoardPieceValue(e[i+l][a])),i+l<t.Board.ROWS&&a+l<t.Board.COLUMNS&&(u+=this.getBoardPieceValue(e[i+l][a+l])),i-l>=0&&a+l<7&&(s+=this.getBoardPieceValue(e[i-l][a+l]));o+=n*n*n,o+=c*c*c,o+=u*u*u,o+=s*s*s,4===Math.abs(n)?r=n>0?this.boardPiece:this.enemyBoardPiece:4===Math.abs(c)?r=c>0?this.boardPiece:this.enemyBoardPiece:4===Math.abs(u)?r=u>0?this.boardPiece:this.enemyBoardPiece:4===Math.abs(s)&&(r=s>0?this.boardPiece:this.enemyBoardPiece)}return{winnerBoardPiece:r,chain:o}},n.prototype.transformValues=function(e,t,o){var i=t===this.boardPiece,a=t===this.enemyBoardPiece;return i?e=r.Utils.BIG_POSITIVE_NUMBER-100:a&&(e=r.Utils.BIG_NEGATIVE_NUMBER+100),e-=o*o},n.prototype.getMove=function(e,t,r,o){var i=this.getStateValue(e),a=i.winnerBoardPiece===this.boardPiece,c=i.winnerBoardPiece===this.enemyBoardPiece;return t>=n.MAX_DEPTH||a||c?{value:this.transformValues(i.chain*this.ownBoardPieceValue,i.winnerBoardPiece,t),move:-1}:t%2==0?this.minState(e,t+1,r,o):this.maxState(e,t+1,r,o)},n.prototype.maxState=function(e,o,i,a){for(var n=r.Utils.BIG_NEGATIVE_NUMBER,c=[],u=0;u<t.Board.COLUMNS;u++){var s=r.Utils.getMockPlayerAction(e,this.boardPiece,u),l=s.success,h=s.map;if(l){var f=this.getMove(h,o,i,a),d=f.value;f.move;if(d>n?(n=d,c=[u]):d===n&&c.push(u),n>a)return{value:n,move:r.Utils.choose(c)};i=Math.max(i,n)}}return{value:n,move:r.Utils.choose(c)}},n.prototype.minState=function(e,o,i,a){for(var n=r.Utils.BIG_POSITIVE_NUMBER,c=[],u=0;u<t.Board.COLUMNS;u++){var s=r.Utils.getMockPlayerAction(e,this.enemyBoardPiece,u),l=s.success,h=s.map;if(l){var f=this.getMove(h,o,i,a),d=f.value;f.move;if(d<n?(n=d,c=[u]):d===n&&c.push(u),n<i)return{value:n,move:r.Utils.choose(c)};a=Math.min(a,n)}}return{value:n,move:r.Utils.choose(c)}},n.prototype.getAction=function(e){return i(this,void 0,Promise,function(){var t,o;return a(this,function(i){return t=r.Utils.clone(e.map),o=this.maxState(t,0,r.Utils.BIG_NEGATIVE_NUMBER,r.Utils.BIG_POSITIVE_NUMBER),console.log("AI "+this.boardPiece+" choose column "+o.move+" with value of "+o.value),[2,o.move]})})},n.MAX_DEPTH=4,n}(e.Player);exports.PlayerAi=n;
},{"./player":"y4P3","../board":"C8B6","../utils":"KOdN"}],"Uu6j":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.PlayerHuman=void 0;var t=require("./player"),e=require("../board"),n=require("../utils"),r=function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),o=function(t,e,n,r){return new(n||(n=Promise))(function(o,i){function c(t){try{l(r.next(t))}catch(t){i(t)}}function u(t){try{l(r.throw(t))}catch(t){i(t)}}function l(t){t.done?o(t.value):new n(function(e){e(t.value)}).then(c,u)}l((r=r.apply(t,e||[])).next())})},i=function(t,e){var n,r,o,i,c={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;c;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return c.label++,{value:i[1],done:!1};case 5:c.label++,r=i[1],i=[0];continue;case 7:i=c.ops.pop(),c.trys.pop();continue;default:if(!(o=(o=c.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){c=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){c.label=i[1];break}if(6===i[0]&&c.label<o[1]){c.label=o[1],o=i;break}if(o&&c.label<o[2]){c.label=o[2],c.ops.push(i);break}o[2]&&c.ops.pop(),c.trys.pop();continue}i=e.call(t,c)}catch(t){i=[6,t],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}},c=function(t){function c(e,n){var r=t.call(this,e,n)||this;return r.clickPromiseResolver=null,n.addEventListener("click",function(t){try{r.handleClick(t)}catch(t){console.error(t)}}),r}return r(c,t),c.prototype.doAction=function(t){this.clickPromiseResolver&&0<=t&&t<e.Board.COLUMNS&&this.clickPromiseResolver(t)},c.prototype.handleClick=function(t){var e=this.canvas.getBoundingClientRect(),r=t.clientX-e.left,o=t.clientY-e.top,i=n.Utils.getColumnFromCoord({x:r,y:o});this.doAction(i)},c.prototype.getAction=function(t){return o(this,void 0,Promise,function(){var t=this;return i(this,function(e){return[2,new Promise(function(e){return t.clickPromiseResolver=e})]})})},c}(t.Player);exports.PlayerHuman=c;
},{"./player":"y4P3","../board":"C8B6","../utils":"KOdN"}],"2i42":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./player");Object.keys(e).forEach(function(r){"default"!==r&&"__esModule"!==r&&Object.defineProperty(exports,r,{enumerable:!0,get:function(){return e[r]}})});var r=require("./player-ai");Object.keys(r).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(exports,e,{enumerable:!0,get:function(){return r[e]}})});var t=require("./player-human");Object.keys(t).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(exports,e,{enumerable:!0,get:function(){return t[e]}})});
},{"./player":"y4P3","./player-ai":"InOJ","./player-human":"Uu6j"}],"PbB1":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.initGameLocal2p=c;var e=require("../board"),t=require("./game-base"),n=require("../player"),r=require("../utils"),o=function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),a=function(e,t,n,r){return new(n||(n=Promise))(function(o,a){function i(e){try{c(r.next(e))}catch(e){a(e)}}function u(e){try{c(r.throw(e))}catch(e){a(e)}}function c(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(i,u)}c((r=r.apply(e,t||[])).next())})},i=function(e,t){var n,r,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function u(a){return function(u){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(o=2&a[0]?r.return:a[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,a[1])).done)return o;switch(r=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,r=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!(o=(o=i.trys).length>0&&o[o.length-1])&&(6===a[0]||2===a[0])){i=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){i.label=a[1];break}if(6===a[0]&&i.label<o[1]){i.label=o[1],o=a;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(a);break}o[2]&&i.ops.pop(),i.trys.pop();continue}a=t.call(e,i)}catch(e){a=[6,e],r=0}finally{n=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}},u=function(e){function t(t,n){return e.call(this,t,n)||this}return o(t,e),t}(t.GameBase);function c(){var t=this,o=document.querySelector("canvas");if(o){var c=new u([new n.PlayerHuman(e.BoardPiece.PLAYER_1,o),new n.PlayerHuman(e.BoardPiece.PLAYER_2,o)],o);c.start(),o.addEventListener("click",function(){return a(t,void 0,void 0,function(){return i(this,function(e){switch(e.label){case 0:return c.isGameWon?(c.reset(),[4,r.Utils.animationFrame()]):[3,2];case 1:e.sent(),c.start(),e.label=2;case 2:return[2]}})})})}else console.error("Canvas DOM is null")}
},{"../board":"C8B6","./game-base":"lX9h","../player":"2i42","../utils":"KOdN"}],"p2oG":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.initGameLocalAi=c;var e=require("../board"),t=require("./game-base"),n=require("../player"),r=require("../utils"),o=function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),a=function(e,t,n,r){return new(n||(n=Promise))(function(o,a){function i(e){try{c(r.next(e))}catch(e){a(e)}}function u(e){try{c(r.throw(e))}catch(e){a(e)}}function c(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(i,u)}c((r=r.apply(e,t||[])).next())})},i=function(e,t){var n,r,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function u(a){return function(u){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(o=2&a[0]?r.return:a[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,a[1])).done)return o;switch(r=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,r=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!(o=(o=i.trys).length>0&&o[o.length-1])&&(6===a[0]||2===a[0])){i=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){i.label=a[1];break}if(6===a[0]&&i.label<o[1]){i.label=o[1],o=a;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(a);break}o[2]&&i.ops.pop(),i.trys.pop();continue}a=t.call(e,i)}catch(e){a=[6,e],r=0}finally{n=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}},u=function(e){function t(t,n){return e.call(this,t,n)||this}return o(t,e),t}(t.GameBase);function c(){var t=this,o=document.querySelector("canvas");if(o){var c=new u([new n.PlayerHuman(e.BoardPiece.PLAYER_1,o),new n.PlayerAi(e.BoardPiece.PLAYER_2,o)],o);c.start(),o.addEventListener("click",function(){return a(t,void 0,void 0,function(){return i(this,function(e){switch(e.label){case 0:return c.isGameWon?(c.reset(),[4,r.Utils.animationFrame()]):[3,2];case 1:e.sent(),c.start(),e.label=2;case 2:return[2]}})})})}else console.error("Canvas DOM is null")}
},{"../board":"C8B6","./game-base":"lX9h","../player":"2i42","../utils":"KOdN"}],"ZX9e":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./game-local-2p");Object.keys(e).forEach(function(r){"default"!==r&&"__esModule"!==r&&Object.defineProperty(exports,r,{enumerable:!0,get:function(){return e[r]}})});var r=require("./game-local-ai");Object.keys(r).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(exports,e,{enumerable:!0,get:function(){return r[e]}})});
},{"./game-local-2p":"PbB1","./game-local-ai":"p2oG"}],"MMGd":[function(require,module,exports) {

},{}],"vaH9":[function(require,module,exports) {
"use strict";require("es6-promise/auto");var e=require("./game"),n=o(e),r=require("./board");function o(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n.default=e,n}require("./style.css"),document.addEventListener("DOMContentLoaded",function(){var e=document.querySelector("canvas");if(e){new r.Board(e).render();var o=document.querySelector(".mode-chooser-submit");o&&o.addEventListener("click",function(){var e=document.querySelector(".mode");if(e){for(var r=document.querySelectorAll(".mode-chooser-input"),o=null,t=0;t<r.length&&!(o=r[t].checked?r[t].value:null);t++);o||(o="offline-ai"),"offline-human"===o?n.initGameLocal2p():"offline-ai"===o&&n.initGameLocalAi(),e.classList.add("invisible"),e.addEventListener("transitionend",function(){e.classList.add("hidden")})}})}else console.error("Canvas DOM is null")});
},{"es6-promise/auto":"uUrv","./game":"ZX9e","./board":"C8B6","./style.css":"MMGd"}]},{},["vaH9"], null)
//# sourceMappingURL=/app.9b71a398.map