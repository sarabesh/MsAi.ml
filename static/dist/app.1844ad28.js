// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"node_modules\\process\\browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};
},{}],"node_modules\\es6-promise\\dist\\es6-promise.js":[function(require,module,exports) {
var define;
var global = arguments[3];
var process = require("process");
/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.4+314e4831
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ES6Promise = factory());
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}



var _isArray = void 0;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = void 0;
var customSchedulerFn = void 0;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var vertx = Function('return this')().require('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = void 0;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && typeof require === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;


  if (_state) {
    var callback = arguments[_state - 1];
    asap(function () {
      return invokeCallback(_state, child, callback, parent._result);
    });
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(2);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var TRY_CATCH_ERROR = { error: null };

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    TRY_CATCH_ERROR.error = error;
    return TRY_CATCH_ERROR;
  }
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === TRY_CATCH_ERROR) {
      reject(promise, TRY_CATCH_ERROR.error);
      TRY_CATCH_ERROR.error = null;
    } else if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;


  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = void 0,
      callback = void 0,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = void 0,
      error = void 0,
      succeeded = void 0,
      failed = void 0;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value.error = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
    resolve(promise, value);
  } else if (failed) {
    reject(promise, error);
  } else if (settled === FULFILLED) {
    fulfill(promise, value);
  } else if (settled === REJECTED) {
    reject(promise, value);
  }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

var Enumerator = function () {
  function Enumerator(Constructor, input) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop);

    if (!this.promise[PROMISE_ID]) {
      makePromise(this.promise);
    }

    if (isArray(input)) {
      this.length = input.length;
      this._remaining = input.length;

      this._result = new Array(this.length);

      if (this.length === 0) {
        fulfill(this.promise, this._result);
      } else {
        this.length = this.length || 0;
        this._enumerate(input);
        if (this._remaining === 0) {
          fulfill(this.promise, this._result);
        }
      }
    } else {
      reject(this.promise, validationError());
    }
  }

  Enumerator.prototype._enumerate = function _enumerate(input) {
    for (var i = 0; this._state === PENDING && i < input.length; i++) {
      this._eachEntry(input[i], i);
    }
  };

  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
    var c = this._instanceConstructor;
    var resolve$$1 = c.resolve;


    if (resolve$$1 === resolve$1) {
      var _then = getThen(entry);

      if (_then === then && entry._state !== PENDING) {
        this._settledAt(entry._state, i, entry._result);
      } else if (typeof _then !== 'function') {
        this._remaining--;
        this._result[i] = entry;
      } else if (c === Promise$1) {
        var promise = new c(noop);
        handleMaybeThenable(promise, entry, _then);
        this._willSettleAt(promise, i);
      } else {
        this._willSettleAt(new c(function (resolve$$1) {
          return resolve$$1(entry);
        }), i);
      }
    } else {
      this._willSettleAt(resolve$$1(entry), i);
    }
  };

  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
    var promise = this.promise;


    if (promise._state === PENDING) {
      this._remaining--;

      if (state === REJECTED) {
        reject(promise, value);
      } else {
        this._result[i] = value;
      }
    }

    if (this._remaining === 0) {
      fulfill(promise, this._result);
    }
  };

  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
    var enumerator = this;

    subscribe(promise, undefined, function (value) {
      return enumerator._settledAt(FULFILLED, i, value);
    }, function (reason) {
      return enumerator._settledAt(REJECTED, i, reason);
    });
  };

  return Enumerator;
}();

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {Function} resolver
  Useful for tooling.
  @constructor
*/

var Promise$1 = function () {
  function Promise(resolver) {
    this[PROMISE_ID] = nextId();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  /**
  The primary way of interacting with a promise is through its `then` method,
  which registers callbacks to receive either a promise's eventual value or the
  reason why the promise cannot be fulfilled.
   ```js
  findUser().then(function(user){
    // user is available
  }, function(reason){
    // user is unavailable, and you are given the reason why
  });
  ```
   Chaining
  --------
   The return value of `then` is itself a promise.  This second, 'downstream'
  promise is resolved with the return value of the first promise's fulfillment
  or rejection handler, or rejected if the handler throws an exception.
   ```js
  findUser().then(function (user) {
    return user.name;
  }, function (reason) {
    return 'default name';
  }).then(function (userName) {
    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
    // will be `'default name'`
  });
   findUser().then(function (user) {
    throw new Error('Found user, but still unhappy');
  }, function (reason) {
    throw new Error('`findUser` rejected and we're unhappy');
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
  });
  ```
  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
   ```js
  findUser().then(function (user) {
    throw new PedagogicalException('Upstream error');
  }).then(function (value) {
    // never reached
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // The `PedgagocialException` is propagated all the way down to here
  });
  ```
   Assimilation
  ------------
   Sometimes the value you want to propagate to a downstream promise can only be
  retrieved asynchronously. This can be achieved by returning a promise in the
  fulfillment or rejection handler. The downstream promise will then be pending
  until the returned promise is settled. This is called *assimilation*.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // The user's comments are now available
  });
  ```
   If the assimliated promise rejects, then the downstream promise will also reject.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // If `findCommentsByAuthor` fulfills, we'll have the value here
  }, function (reason) {
    // If `findCommentsByAuthor` rejects, we'll have the reason here
  });
  ```
   Simple Example
  --------------
   Synchronous Example
   ```javascript
  let result;
   try {
    result = findResult();
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
  findResult(function(result, err){
    if (err) {
      // failure
    } else {
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findResult().then(function(result){
    // success
  }, function(reason){
    // failure
  });
  ```
   Advanced Example
  --------------
   Synchronous Example
   ```javascript
  let author, books;
   try {
    author = findAuthor();
    books  = findBooksByAuthor(author);
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
   function foundBooks(books) {
   }
   function failure(reason) {
   }
   findAuthor(function(author, err){
    if (err) {
      failure(err);
      // failure
    } else {
      try {
        findBoooksByAuthor(author, function(books, err) {
          if (err) {
            failure(err);
          } else {
            try {
              foundBooks(books);
            } catch(reason) {
              failure(reason);
            }
          }
        });
      } catch(error) {
        failure(err);
      }
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findAuthor().
    then(findBooksByAuthor).
    then(function(books){
      // found books
  }).catch(function(reason){
    // something went wrong
  });
  ```
   @method then
  @param {Function} onFulfilled
  @param {Function} onRejected
  Useful for tooling.
  @return {Promise}
  */

  /**
  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
  as the catch block of a try/catch statement.
  ```js
  function findAuthor(){
  throw new Error('couldn't find that author');
  }
  // synchronous
  try {
  findAuthor();
  } catch(reason) {
  // something went wrong
  }
  // async with promises
  findAuthor().catch(function(reason){
  // something went wrong
  });
  ```
  @method catch
  @param {Function} onRejection
  Useful for tooling.
  @return {Promise}
  */


  Promise.prototype.catch = function _catch(onRejection) {
    return this.then(null, onRejection);
  };

  /**
    `finally` will be invoked regardless of the promise's fate just as native
    try/catch/finally behaves
  
    Synchronous example:
  
    ```js
    findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }
  
    try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuther();
    } finally {
      // always runs
      // doesn't affect the return value
    }
    ```
  
    Asynchronous example:
  
    ```js
    findAuthor().catch(function(reason){
      return findOtherAuther();
    }).finally(function(){
      // author was either found, or not
    });
    ```
  
    @method finally
    @param {Function} callback
    @return {Promise}
  */


  Promise.prototype.finally = function _finally(callback) {
    var promise = this;
    var constructor = promise.constructor;

    return promise.then(function (value) {
      return constructor.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return constructor.resolve(callback()).then(function () {
        throw reason;
      });
    });
  };

  return Promise;
}();

Promise$1.prototype.then = then;
Promise$1.all = all;
Promise$1.race = race;
Promise$1.resolve = resolve$1;
Promise$1.reject = reject$1;
Promise$1._setScheduler = setScheduler;
Promise$1._setAsap = setAsap;
Promise$1._asap = asap;

/*global self*/
function polyfill() {
  var local = void 0;

  if (typeof global !== 'undefined') {
    local = global;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }

  var P = local.Promise;

  if (P) {
    var promiseToString = null;
    try {
      promiseToString = Object.prototype.toString.call(P.resolve());
    } catch (e) {
      // silently ignored
    }

    if (promiseToString === '[object Promise]' && !P.cast) {
      return;
    }
  }

  local.Promise = Promise$1;
}

// Strange compat..
Promise$1.polyfill = polyfill;
Promise$1.Promise = Promise$1;

return Promise$1;

})));



//# sourceMappingURL=es6-promise.map

},{"process":"node_modules\\process\\browser.js"}],"node_modules\\es6-promise\\auto.js":[function(require,module,exports) {
// This file can be required in Browserify and Node.js for automatic polyfill
// To use it:  require('es6-promise/auto');
'use strict';
module.exports = require('./').polyfill();

},{"./":"node_modules\\es6-promise\\dist\\es6-promise.js"}],"src\\utils.ts":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Utils = undefined;

var _board = require('./board');

var Utils = function () {
    function Utils() {}
    Utils.showMessage = function (message) {
        if (message === void 0) {
            message = '';
        }
        var messageDOM = document.querySelector('.message');
        if (!messageDOM) {
            console.error('Message DOM is null!');
            return;
        }
        messageDOM.classList.remove('hidden');
        var messageContentDOM = document.querySelector('.message-body-content');
        if (!messageContentDOM) {
            console.error('Message body content DOM is null!');
            return;
        }
        messageContentDOM.innerHTML = message;
        var messageDismissDOM = document.querySelector('.message-body-dismiss');
        if (!messageDismissDOM) {
            console.error('Message body dismiss DOM is null!');
            return;
        }
        var dismissHandler = function dismissHandler() {
            messageDOM.classList.add('invisible');
            messageDOM.addEventListener('transitionend', function () {
                messageDOM.classList.add('hidden');
                messageDOM.classList.remove('invisible');
            });
            messageDismissDOM.removeEventListener('click', dismissHandler);
        };
        messageDismissDOM.addEventListener('click', dismissHandler);
    };
    Utils.drawCircle = function (context, _a) {
        var _b = _a.x,
            x = _b === void 0 ? 0 : _b,
            _c = _a.y,
            y = _c === void 0 ? 0 : _c,
            _d = _a.r,
            r = _d === void 0 ? 0 : _d,
            _e = _a.fillStyle,
            fillStyle = _e === void 0 ? '' : _e,
            _f = _a.strokeStyle,
            strokeStyle = _f === void 0 ? '' : _f;
        context.save();
        context.fillStyle = fillStyle;
        context.strokeStyle = strokeStyle;
        context.beginPath();
        context.arc(x, y, r, 0, 2 * Math.PI, false);
        context.fill();
        context.restore();
    };
    Utils.drawMask = function (board) {
        var context = board.context;
        context.save();
        context.fillStyle = _board.Board.MASK_COLOR;
        context.beginPath();
        var doubleRadius = 2 * _board.Board.PIECE_RADIUS;
        var tripleRadius = 3 * _board.Board.PIECE_RADIUS;
        for (var y = 0; y < _board.Board.ROWS; y++) {
            for (var x = 0; x < _board.Board.COLUMNS; x++) {
                context.arc(tripleRadius * x + _board.Board.MASK_X_BEGIN + doubleRadius, tripleRadius * y + _board.Board.MASK_Y_BEGIN + doubleRadius, _board.Board.PIECE_RADIUS, 0, 2 * Math.PI);
                context.rect(tripleRadius * x + _board.Board.MASK_X_BEGIN + 2 * doubleRadius, tripleRadius * y + _board.Board.MASK_Y_BEGIN, -2 * doubleRadius, 2 * doubleRadius);
            }
        }
        context.fill();
        context.restore();
    };
    Utils.clearCanvas = function (board) {
        board.context.clearRect(0, 0, board.canvas.width, board.canvas.height);
    };
    Utils.isCoordOnColumn = function (coord, columnXBegin, radius) {
        return (coord.x - columnXBegin) * (coord.x - columnXBegin) <= radius * radius;
    };
    Utils.getColumnFromCoord = function (coord) {
        for (var i = 0; i < _board.Board.COLUMNS; i++) {
            if (Utils.isCoordOnColumn(coord, 3 * _board.Board.PIECE_RADIUS * i + _board.Board.MASK_X_BEGIN + 2 * _board.Board.PIECE_RADIUS, _board.Board.PIECE_RADIUS)) {
                return i;
            }
        }
        return -1;
    };
    Utils.getRandomColumnNumber = function () {
        return Math.floor(Math.random() * _board.Board.COLUMNS);
    };
    Utils.choose = function (choice) {
        return choice[Math.floor(Math.random() * choice.length)];
    };
    Utils.animationFrame = function () {
        var resolve = null;
        var promise = new Promise(function (r) {
            return resolve = r;
        });
        if (resolve) {
            window.requestAnimationFrame(resolve);
        }
        return promise;
    };
    Utils.clone = function (array) {
        var arr = [];
        for (var i = 0; i < array.length; i++) {
            arr[i] = array[i].slice();
        }
        return arr;
    };
    Utils.getMockPlayerAction = function (map, boardPiece, column) {
        var clonedMap = Utils.clone(map);
        if (clonedMap[0][column] !== _board.BoardPiece.EMPTY || column < 0 || column >= _board.Board.COLUMNS) {
            return {
                success: false,
                map: clonedMap
            };
        }
        var isColumnEverFilled = false;
        var row = 0;
        for (var i = 0; i < _board.Board.ROWS - 1; i++) {
            if (clonedMap[i + 1][column] !== _board.BoardPiece.EMPTY) {
                isColumnEverFilled = true;
                row = i;
                break;
            }
        }
        if (!isColumnEverFilled) {
            row = _board.Board.ROWS - 1;
        }
        clonedMap[row][column] = boardPiece;
        return {
            success: true,
            map: clonedMap
        };
    };
    Utils.onresize = function () {
        var callbacks = [],
            running = false;
        function resize() {
            if (!running) {
                running = true;
                if (window.requestAnimationFrame) {
                    window.requestAnimationFrame(runCallbacks);
                } else {
                    setTimeout(runCallbacks, 66);
                }
            }
        }
        function runCallbacks() {
            callbacks.forEach(function (callback) {
                callback();
            });
            running = false;
        }
        function addCallback(callback) {
            if (callback) {
                callbacks.push(callback);
            }
        }
        return {
            add: function add(callback) {
                if (!callbacks.length) {
                    window.addEventListener('resize', resize);
                }
                addCallback(callback);
            }
        };
    };
    Utils.BIG_POSITIVE_NUMBER = Math.pow(10, 9) + 7;
    Utils.BIG_NEGATIVE_NUMBER = -Utils.BIG_POSITIVE_NUMBER;
    return Utils;
}();
exports.Utils = Utils;
},{"./board":"src\\board.ts"}],"src\\board.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Board = exports.BoardPiece = undefined;

var _utils = require("./utils");

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = undefined && undefined.__generator || function (thisArg, body) {
    var _ = { label: 0, sent: function sent() {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t,
        g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
    }), g;
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) {
            try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0:case 1:
                        t = op;break;
                    case 4:
                        _.label++;return { value: op[1], done: false };
                    case 5:
                        _.label++;y = op[1];op = [0];continue;
                    case 7:
                        op = _.ops.pop();_.trys.pop();continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;continue;
                        }
                        if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];t = op;break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];_.ops.push(op);break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [6, e];y = 0;
            } finally {
                f = t = 0;
            }
        }if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var BoardPiece = exports.BoardPiece = undefined;
(function (BoardPiece) {
    BoardPiece[BoardPiece["EMPTY"] = 0] = "EMPTY";
    BoardPiece[BoardPiece["PLAYER_1"] = 1] = "PLAYER_1";
    BoardPiece[BoardPiece["PLAYER_2"] = 2] = "PLAYER_2";
    BoardPiece[BoardPiece["DRAW"] = 3] = "DRAW";
})(BoardPiece || (exports.BoardPiece = BoardPiece = {}));
var Board = function () {
    function Board(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.map = [];
        this.winnerBoardPiece = BoardPiece.EMPTY;
        this.getBoardScale();
        this.initConstants();
        this.reset();
        this.onresize();
    }
    Board.prototype.reset = function () {
        this.map = [];
        for (var i = 0; i < Board.ROWS; i++) {
            this.map.push([]);
            for (var j = 0; j < Board.COLUMNS; j++) {
                this.map[i].push(BoardPiece.EMPTY);
            }
        }
        this.winnerBoardPiece = BoardPiece.EMPTY;
        _utils.Utils.clearCanvas(this);
    };
    Board.prototype.getBoardScale = function () {
        return window.innerWidth < 640 ? Board.SCALE = 0.5 : Board.SCALE = 1.0;
    };
    Board.prototype.initConstants = function () {
        Board.CANVAS_HEIGHT = Board.SCALE * 480;
        Board.CANVAS_WIDTH = Board.SCALE * 640;
        Board.PIECE_RADIUS = Board.SCALE * 25;
        Board.MASK_X_BEGIN = Math.max(0, Board.CANVAS_WIDTH - (3 * Board.COLUMNS + 1) * Board.PIECE_RADIUS) / 2;
        Board.MASK_Y_BEGIN = Math.max(0, Board.CANVAS_HEIGHT - (3 * Board.ROWS + 1) * Board.PIECE_RADIUS) / 2;
        Board.MESSAGE_WIDTH = Board.SCALE * 400;
        Board.MESSAGE_X_BEGIN = (Board.CANVAS_WIDTH - Board.MESSAGE_WIDTH) / 2;
        Board.MESSAGE_Y_BEGIN = Board.SCALE * 20;
        this.canvas.width = Board.CANVAS_WIDTH;
        this.canvas.height = Board.CANVAS_HEIGHT;
    };
    Board.prototype.onresize = function () {
        var _this = this;
        var prevBoardScale = Board.SCALE;
        _utils.Utils.onresize().add(function () {
            _this.getBoardScale();
            if (prevBoardScale !== Board.SCALE) {
                prevBoardScale = Board.SCALE;
                _this.initConstants();
                _utils.Utils.clearCanvas(_this);
                _this.render();
            }
        });
    };
    Board.prototype.applyPlayerAction = function (player, column) {
        return __awaiter(this, void 0, Promise, function () {
            var isColumnEverFilled, row, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.map[0][column] !== BoardPiece.EMPTY || column < 0 || column >= Board.COLUMNS) {
                            return [2, false];
                        }
                        isColumnEverFilled = false;
                        row = 0;
                        for (i = 0; i < Board.ROWS - 1; i++) {
                            if (this.map[i + 1][column] !== BoardPiece.EMPTY) {
                                isColumnEverFilled = true;
                                row = i;
                                break;
                            }
                        }
                        if (!isColumnEverFilled) {
                            row = Board.ROWS - 1;
                        }
                        return [4, this.animateAction(row, column, player.boardPiece)];
                    case 1:
                        _a.sent();
                        this.map[row][column] = player.boardPiece;
                        this.debug();
                        return [4, _utils.Utils.animationFrame()];
                    case 2:
                        _a.sent();
                        this.render();
                        return [2, true];
                }
            });
        });
    };
    Board.prototype.debug = function () {
        console.log(this.map.map(function (row) {
            return row.join(' ');
        }).join('\n'));
    };
    Board.prototype.getWinner = function () {
        var _this = this;
        if (this.winnerBoardPiece !== BoardPiece.EMPTY) {
            return this.winnerBoardPiece;
        }
        var direction = [[0, -1], [0, 1], [-1, -1], [-1, 0], [-1, 1], [1, -1], [1, 0], [1, 1]];
        var isWinningSequence = function isWinningSequence(i, j, playerPiece, dir, count) {
            if (count >= 4) {
                return true;
            }
            if (i < 0 || j < 0 || i >= Board.ROWS || j >= Board.COLUMNS || _this.map[i][j] !== playerPiece) {
                return false;
            }
            return isWinningSequence(i + dir[0], j + dir[1], playerPiece, dir, count + 1);
        };
        var countEmpty = 0;
        for (var i = 0; i < Board.ROWS; i++) {
            for (var j = 0; j < Board.COLUMNS; j++) {
                var playerPiece = this.map[i][j];
                if (playerPiece !== BoardPiece.EMPTY) {
                    for (var k = 0; k < direction.length; k++) {
                        var isWon = isWinningSequence(i + direction[k][0], j + direction[k][1], playerPiece, direction[k], 1);
                        if (isWon) {
                            return this.winnerBoardPiece = playerPiece;
                        }
                    }
                } else {
                    countEmpty++;
                }
            }
        }
        if (countEmpty === 0) {
            return this.winnerBoardPiece = BoardPiece.DRAW;
        }
        return BoardPiece.EMPTY;
    };
    Board.prototype.announceWinner = function () {
        if (this.winnerBoardPiece === BoardPiece.EMPTY) {
            return;
        }
        var message = '<h1>Thank you for playing.</h1>';
        if (this.winnerBoardPiece === BoardPiece.DRAW) {
            message += "It's a draw";
        } else {
            message += "Player " + this.winnerBoardPiece + " wins";
        }
        message += '.<br />After dismissing this message, click the board to reset game.';
        _utils.Utils.showMessage(message);
    };
    Board.prototype.getPlayerColor = function (boardPiece) {
        switch (boardPiece) {
            case BoardPiece.PLAYER_1:
                return Board.PLAYER_1_COLOR;
            case BoardPiece.PLAYER_2:
                return Board.PLAYER_2_COLOR;
            default:
                return 'transparent';
        }
    };
    Board.prototype.animateAction = function (newRow, column, boardPiece) {
        return __awaiter(this, void 0, Promise, function () {
            var fillStyle, currentY, doAnimation;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fillStyle = this.getPlayerColor(boardPiece);
                        currentY = 0;
                        doAnimation = function doAnimation() {
                            return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    _utils.Utils.clearCanvas(this);
                                    _utils.Utils.drawCircle(this.context, {
                                        x: 3 * Board.PIECE_RADIUS * column + Board.MASK_X_BEGIN + 2 * Board.PIECE_RADIUS,
                                        y: currentY + Board.MASK_Y_BEGIN + 2 * Board.PIECE_RADIUS,
                                        r: Board.PIECE_RADIUS,
                                        fillStyle: fillStyle,
                                        strokeStyle: Board.PIECE_STROKE_STYLE
                                    });
                                    this.render();
                                    currentY += Board.PIECE_RADIUS;
                                    return [2];
                                });
                            });
                        };
                        _a.label = 1;
                    case 1:
                        if (!(newRow * 3 * Board.PIECE_RADIUS >= currentY)) return [3, 3];
                        return [4, _utils.Utils.animationFrame()];
                    case 2:
                        _a.sent();
                        doAnimation();
                        return [3, 1];
                    case 3:
                        return [2];
                }
            });
        });
    };
    Board.prototype.render = function () {
        _utils.Utils.drawMask(this);
        for (var y = 0; y < Board.ROWS; y++) {
            for (var x = 0; x < Board.COLUMNS; x++) {
                _utils.Utils.drawCircle(this.context, {
                    x: 3 * Board.PIECE_RADIUS * x + Board.MASK_X_BEGIN + 2 * Board.PIECE_RADIUS,
                    y: 3 * Board.PIECE_RADIUS * y + Board.MASK_Y_BEGIN + 2 * Board.PIECE_RADIUS,
                    r: Board.PIECE_RADIUS,
                    fillStyle: this.getPlayerColor(this.map[y][x]),
                    strokeStyle: Board.PIECE_STROKE_STYLE
                });
            }
        }
    };
    Board.ROWS = 6;
    Board.COLUMNS = 7;
    Board.PLAYER_1_COLOR = '#ef453b';
    Board.PLAYER_2_COLOR = '#0059ff';
    Board.PIECE_STROKE_STYLE = 'black';
    Board.MASK_COLOR = '#d8d8d8';
    return Board;
}();
exports.Board = Board;
},{"./utils":"src\\utils.ts"}],"src\\game\\game-base.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GameBase = undefined;

var _board = require("../board");

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = undefined && undefined.__generator || function (thisArg, body) {
    var _ = { label: 0, sent: function sent() {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t,
        g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
    }), g;
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) {
            try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0:case 1:
                        t = op;break;
                    case 4:
                        _.label++;return { value: op[1], done: false };
                    case 5:
                        _.label++;y = op[1];op = [0];continue;
                    case 7:
                        op = _.ops.pop();_.trys.pop();continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;continue;
                        }
                        if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];t = op;break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];_.ops.push(op);break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [6, e];y = 0;
            } finally {
                f = t = 0;
            }
        }if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var GameBase = function () {
    function GameBase(players, canvas) {
        this.isMoveAllowed = false;
        this.isGameWon = false;
        this.board = new _board.Board(canvas);
        this.players = players;
        this.currentPlayerId = 0;
        this.reset();
    }
    GameBase.prototype.reset = function () {
        this.isMoveAllowed = false;
        this.isGameWon = false;
        this.board.reset();
        this.board.render();
        this.board.debug();
    };
    GameBase.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var winner;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isMoveAllowed = true;
                        _a.label = 1;
                    case 1:
                        if (!!this.isGameWon) return [3, 3];
                        return [4, this.move()];
                    case 2:
                        _a.sent();
                        winner = this.board.getWinner();
                        if (winner !== _board.BoardPiece.EMPTY) {
                            console.log('Game over: winner is player ', winner);
                            this.isGameWon = true;
                            this.isMoveAllowed = false;
                            this.board.announceWinner();
                            return [3, 3];
                        }
                        return [3, 1];
                    case 3:
                        return [2];
                }
            });
        });
    };
    GameBase.prototype.move = function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentPlayer, actionSuccesful, action;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isMoveAllowed) {
                            return [2];
                        }
                        currentPlayer = this.players[this.currentPlayerId];
                        actionSuccesful = false;
                        _a.label = 1;
                    case 1:
                        if (!!actionSuccesful) return [3, 4];
                        return [4, currentPlayer.getAction(this.board)];
                    case 2:
                        action = _a.sent();
                        this.isMoveAllowed = false;
                        return [4, this.board.applyPlayerAction(currentPlayer, action)];
                    case 3:
                        actionSuccesful = _a.sent();
                        this.isMoveAllowed = true;
                        if (!actionSuccesful) {
                            console.log('Move not allowed! Try again.');
                        } else {
                            this.afterMove(action);
                        }
                        return [3, 1];
                    case 4:
                        this.currentPlayerId = this.getNextPlayer();
                        return [2];
                }
            });
        });
    };
    GameBase.prototype.afterMove = function (action) {};
    GameBase.prototype.getNextPlayer = function () {
        return this.currentPlayerId === 0 ? 1 : 0;
    };
    return GameBase;
}();
exports.GameBase = GameBase;
},{"../board":"src\\board.ts"}],"src\\player\\player.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Player = function () {
    function Player(boardPiece, canvas) {
        this.boardPiece = boardPiece;
        this.canvas = canvas;
    }
    return Player;
}();
exports.Player = Player;
},{}],"src\\player\\player-ai.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PlayerAi = undefined;

var _player = require("./player");

var _board = require("../board");

var _utils = require("../utils");

var __extends = undefined && undefined.__extends || function () {
    var _extendStatics = function extendStatics(d, b) {
        _extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) {
                if (b.hasOwnProperty(p)) d[p] = b[p];
            }
        };
        return _extendStatics(d, b);
    };
    return function (d, b) {
        _extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = undefined && undefined.__generator || function (thisArg, body) {
    var _ = { label: 0, sent: function sent() {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t,
        g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
    }), g;
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) {
            try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0:case 1:
                        t = op;break;
                    case 4:
                        _.label++;return { value: op[1], done: false };
                    case 5:
                        _.label++;y = op[1];op = [0];continue;
                    case 7:
                        op = _.ops.pop();_.trys.pop();continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;continue;
                        }
                        if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];t = op;break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];_.ops.push(op);break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [6, e];y = 0;
            } finally {
                f = t = 0;
            }
        }if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var PlayerAi = function (_super) {
    __extends(PlayerAi, _super);
    function PlayerAi(boardPiece, canvas) {
        var _this = _super.call(this, boardPiece, canvas) || this;
        _this.ownBoardPieceValue = _this.getBoardPieceValue(boardPiece);
        _this.enemyBoardPiece = boardPiece === _board.BoardPiece.PLAYER_1 ? _board.BoardPiece.PLAYER_2 : _board.BoardPiece.PLAYER_1;
        return _this;
    }
    PlayerAi.prototype.getBoardPieceValue = function (boardPiece) {
        return boardPiece === _board.BoardPiece.EMPTY ? 0 : boardPiece === this.boardPiece ? 1 : -1;
    };
    PlayerAi.prototype.getStateValue = function (state) {
        var winnerBoardPiece = _board.BoardPiece.EMPTY;
        var chainValue = 0;
        for (var i = 0; i < _board.Board.ROWS; i++) {
            for (var j = 0; j < _board.Board.COLUMNS; j++) {
                var tempRight = 0,
                    tempBottom = 0,
                    tempBottomRight = 0,
                    tempTopRight = 0;
                for (var k = 0; k <= 3; k++) {
                    if (j + k < _board.Board.COLUMNS) {
                        tempRight += this.getBoardPieceValue(state[i][j + k]);
                    }
                    if (i + k < _board.Board.ROWS) {
                        tempBottom += this.getBoardPieceValue(state[i + k][j]);
                    }
                    if (i + k < _board.Board.ROWS && j + k < _board.Board.COLUMNS) {
                        tempBottomRight += this.getBoardPieceValue(state[i + k][j + k]);
                    }
                    if (i - k >= 0 && j + k < 7) {
                        tempTopRight += this.getBoardPieceValue(state[i - k][j + k]);
                    }
                }
                chainValue += tempRight * tempRight * tempRight;
                chainValue += tempBottom * tempBottom * tempBottom;
                chainValue += tempBottomRight * tempBottomRight * tempBottomRight;
                chainValue += tempTopRight * tempTopRight * tempTopRight;
                if (Math.abs(tempRight) === 4) {
                    winnerBoardPiece = tempRight > 0 ? this.boardPiece : this.enemyBoardPiece;
                } else if (Math.abs(tempBottom) === 4) {
                    winnerBoardPiece = tempBottom > 0 ? this.boardPiece : this.enemyBoardPiece;
                } else if (Math.abs(tempBottomRight) === 4) {
                    winnerBoardPiece = tempBottomRight > 0 ? this.boardPiece : this.enemyBoardPiece;
                } else if (Math.abs(tempTopRight) === 4) {
                    winnerBoardPiece = tempTopRight > 0 ? this.boardPiece : this.enemyBoardPiece;
                }
            }
        }
        return {
            winnerBoardPiece: winnerBoardPiece,
            chain: chainValue
        };
    };
    PlayerAi.prototype.transformValues = function (returnValue, winnerBoardPiece, depth) {
        var isWon = winnerBoardPiece === this.boardPiece;
        var isLost = winnerBoardPiece === this.enemyBoardPiece;
        if (isWon) {
            returnValue = _utils.Utils.BIG_POSITIVE_NUMBER - 100;
        } else if (isLost) {
            returnValue = _utils.Utils.BIG_NEGATIVE_NUMBER + 100;
        }
        returnValue -= depth * depth;
        return returnValue;
    };
    PlayerAi.prototype.getMove = function (state, depth, alpha, beta) {
        var stateValue = this.getStateValue(state);
        var isWon = stateValue.winnerBoardPiece === this.boardPiece;
        var isLost = stateValue.winnerBoardPiece === this.enemyBoardPiece;
        if (depth >= PlayerAi.MAX_DEPTH || isWon || isLost) {
            return {
                value: this.transformValues(stateValue.chain * this.ownBoardPieceValue, stateValue.winnerBoardPiece, depth),
                move: -1
            };
        }
        return depth % 2 === 0 ? this.minState(state, depth + 1, alpha, beta) : this.maxState(state, depth + 1, alpha, beta);
    };
    PlayerAi.prototype.maxState = function (state, depth, alpha, beta) {
        var value = _utils.Utils.BIG_NEGATIVE_NUMBER;
        var moveQueue = [];
        for (var column = 0; column < _board.Board.COLUMNS; column++) {
            var _a = _utils.Utils.getMockPlayerAction(state, this.boardPiece, column),
                actionSuccessful = _a.success,
                nextState = _a.map;
            if (actionSuccessful) {
                var _b = this.getMove(nextState, depth, alpha, beta),
                    nextValue = _b.value,
                    nextMove = _b.move;
                if (nextValue > value) {
                    value = nextValue;
                    moveQueue = [column];
                } else if (nextValue === value) {
                    moveQueue.push(column);
                }
                if (value > beta) {
                    return {
                        value: value,
                        move: _utils.Utils.choose(moveQueue)
                    };
                }
                alpha = Math.max(alpha, value);
            }
        }
        return {
            value: value,
            move: _utils.Utils.choose(moveQueue)
        };
    };
    PlayerAi.prototype.minState = function (state, depth, alpha, beta) {
        var value = _utils.Utils.BIG_POSITIVE_NUMBER;
        var moveQueue = [];
        for (var column = 0; column < _board.Board.COLUMNS; column++) {
            var _a = _utils.Utils.getMockPlayerAction(state, this.enemyBoardPiece, column),
                actionSuccessful = _a.success,
                nextState = _a.map;
            if (actionSuccessful) {
                var _b = this.getMove(nextState, depth, alpha, beta),
                    nextValue = _b.value,
                    nextMove = _b.move;
                if (nextValue < value) {
                    value = nextValue;
                    moveQueue = [column];
                } else if (nextValue === value) {
                    moveQueue.push(column);
                }
                if (value < alpha) {
                    return {
                        value: value,
                        move: _utils.Utils.choose(moveQueue)
                    };
                }
                beta = Math.min(beta, value);
            }
        }
        return {
            value: value,
            move: _utils.Utils.choose(moveQueue)
        };
    };
    PlayerAi.prototype.getAction = function (board) {
        return __awaiter(this, void 0, Promise, function () {
            var state, action;
            return __generator(this, function (_a) {
                state = _utils.Utils.clone(board.map);
                action = this.maxState(state, 0, _utils.Utils.BIG_NEGATIVE_NUMBER, _utils.Utils.BIG_POSITIVE_NUMBER);
                console.log("AI " + this.boardPiece + " choose column " + action.move + " with value of " + action.value);
                return [2, action.move];
            });
        });
    };
    PlayerAi.MAX_DEPTH = 4;
    return PlayerAi;
}(_player.Player);
exports.PlayerAi = PlayerAi;
},{"./player":"src\\player\\player.ts","../board":"src\\board.ts","../utils":"src\\utils.ts"}],"src\\player\\player-human.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PlayerHuman = undefined;

var _player = require("./player");

var _board = require("../board");

var _utils = require("../utils");

var __extends = undefined && undefined.__extends || function () {
    var _extendStatics = function extendStatics(d, b) {
        _extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) {
                if (b.hasOwnProperty(p)) d[p] = b[p];
            }
        };
        return _extendStatics(d, b);
    };
    return function (d, b) {
        _extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = undefined && undefined.__generator || function (thisArg, body) {
    var _ = { label: 0, sent: function sent() {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t,
        g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
    }), g;
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) {
            try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0:case 1:
                        t = op;break;
                    case 4:
                        _.label++;return { value: op[1], done: false };
                    case 5:
                        _.label++;y = op[1];op = [0];continue;
                    case 7:
                        op = _.ops.pop();_.trys.pop();continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;continue;
                        }
                        if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];t = op;break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];_.ops.push(op);break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [6, e];y = 0;
            } finally {
                f = t = 0;
            }
        }if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var PlayerHuman = function (_super) {
    __extends(PlayerHuman, _super);
    function PlayerHuman(boardPiece, canvas) {
        var _this = _super.call(this, boardPiece, canvas) || this;
        _this.clickPromiseResolver = null;
        canvas.addEventListener('click', function (evt) {
            try {
                _this.handleClick(evt);
            } catch (e) {
                console.error(e);
            }
        });
        return _this;
    }
    PlayerHuman.prototype.doAction = function (column) {
        if (this.clickPromiseResolver && 0 <= column && column < _board.Board.COLUMNS) {
            this.clickPromiseResolver(column);
        }
    };
    PlayerHuman.prototype.handleClick = function (event) {
        var rect = this.canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        var column = _utils.Utils.getColumnFromCoord({ x: x, y: y });
        this.doAction(column);
    };
    PlayerHuman.prototype.getAction = function (board) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (r) {
                    return _this.clickPromiseResolver = r;
                })];
            });
        });
    };
    return PlayerHuman;
}(_player.Player);
exports.PlayerHuman = PlayerHuman;
},{"./player":"src\\player\\player.ts","../board":"src\\board.ts","../utils":"src\\utils.ts"}],"src\\player\\index.ts":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _player = require('./player');

Object.keys(_player).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _player[key];
    }
  });
});

var _playerAi = require('./player-ai');

Object.keys(_playerAi).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _playerAi[key];
    }
  });
});

var _playerHuman = require('./player-human');

Object.keys(_playerHuman).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _playerHuman[key];
    }
  });
});
},{"./player":"src\\player\\player.ts","./player-ai":"src\\player\\player-ai.ts","./player-human":"src\\player\\player-human.ts"}],"src\\game\\game-local-2p.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initGameLocal2p = initGameLocal2p;

var _board = require("../board");

var _gameBase = require("./game-base");

var _player = require("../player");

var _utils = require("../utils");

var __extends = undefined && undefined.__extends || function () {
    var _extendStatics = function extendStatics(d, b) {
        _extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) {
                if (b.hasOwnProperty(p)) d[p] = b[p];
            }
        };
        return _extendStatics(d, b);
    };
    return function (d, b) {
        _extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = undefined && undefined.__generator || function (thisArg, body) {
    var _ = { label: 0, sent: function sent() {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t,
        g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
    }), g;
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) {
            try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0:case 1:
                        t = op;break;
                    case 4:
                        _.label++;return { value: op[1], done: false };
                    case 5:
                        _.label++;y = op[1];op = [0];continue;
                    case 7:
                        op = _.ops.pop();_.trys.pop();continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;continue;
                        }
                        if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];t = op;break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];_.ops.push(op);break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [6, e];y = 0;
            } finally {
                f = t = 0;
            }
        }if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var GameLocal2p = function (_super) {
    __extends(GameLocal2p, _super);
    function GameLocal2p(players, canvas) {
        return _super.call(this, players, canvas) || this;
    }
    return GameLocal2p;
}(_gameBase.GameBase);
function initGameLocal2p() {
    var _this = this;
    var canvas = document.querySelector('canvas');
    if (!canvas) {
        console.error('Canvas DOM is null');
        return;
    }
    var game = new GameLocal2p([new _player.PlayerHuman(_board.BoardPiece.PLAYER_1, canvas), new _player.PlayerHuman(_board.BoardPiece.PLAYER_2, canvas)], canvas);
    game.start();
    canvas.addEventListener('click', function () {
        return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!game.isGameWon) return [3, 2];
                        game.reset();
                        return [4, _utils.Utils.animationFrame()];
                    case 1:
                        _a.sent();
                        game.start();
                        _a.label = 2;
                    case 2:
                        return [2];
                }
            });
        });
    });
}
},{"../board":"src\\board.ts","./game-base":"src\\game\\game-base.ts","../player":"src\\player\\index.ts","../utils":"src\\utils.ts"}],"src\\game\\game-local-ai.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initGameLocalAi = initGameLocalAi;

var _board = require("../board");

var _gameBase = require("./game-base");

var _player = require("../player");

var _utils = require("../utils");

var __extends = undefined && undefined.__extends || function () {
    var _extendStatics = function extendStatics(d, b) {
        _extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) {
                if (b.hasOwnProperty(p)) d[p] = b[p];
            }
        };
        return _extendStatics(d, b);
    };
    return function (d, b) {
        _extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = undefined && undefined.__generator || function (thisArg, body) {
    var _ = { label: 0, sent: function sent() {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t,
        g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
    }), g;
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) {
            try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0:case 1:
                        t = op;break;
                    case 4:
                        _.label++;return { value: op[1], done: false };
                    case 5:
                        _.label++;y = op[1];op = [0];continue;
                    case 7:
                        op = _.ops.pop();_.trys.pop();continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;continue;
                        }
                        if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];t = op;break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];_.ops.push(op);break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [6, e];y = 0;
            } finally {
                f = t = 0;
            }
        }if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var GameLocalAi = function (_super) {
    __extends(GameLocalAi, _super);
    function GameLocalAi(players, canvas) {
        return _super.call(this, players, canvas) || this;
    }
    return GameLocalAi;
}(_gameBase.GameBase);
function initGameLocalAi() {
    var _this = this;
    var canvas = document.querySelector('canvas');
    if (!canvas) {
        console.error('Canvas DOM is null');
        return;
    }
    var game = new GameLocalAi([new _player.PlayerHuman(_board.BoardPiece.PLAYER_1, canvas), new _player.PlayerAi(_board.BoardPiece.PLAYER_2, canvas)], canvas);
    game.start();
    canvas.addEventListener('click', function () {
        return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!game.isGameWon) return [3, 2];
                        game.reset();
                        return [4, _utils.Utils.animationFrame()];
                    case 1:
                        _a.sent();
                        game.start();
                        _a.label = 2;
                    case 2:
                        return [2];
                }
            });
        });
    });
}
},{"../board":"src\\board.ts","./game-base":"src\\game\\game-base.ts","../player":"src\\player\\index.ts","../utils":"src\\utils.ts"}],"src\\game\\index.ts":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _gameLocal2p = require('./game-local-2p');

Object.keys(_gameLocal2p).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _gameLocal2p[key];
    }
  });
});

var _gameLocalAi = require('./game-local-ai');

Object.keys(_gameLocalAi).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _gameLocalAi[key];
    }
  });
});
},{"./game-local-2p":"src\\game\\game-local-2p.ts","./game-local-ai":"src\\game\\game-local-ai.ts"}],"node_modules\\parcel-bundler\\src\\builtins\\bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules\\parcel-bundler\\src\\builtins\\css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules\\parcel-bundler\\src\\builtins\\bundle-url.js"}],"src\\style.css":[function(require,module,exports) {

var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules\\parcel-bundler\\src\\builtins\\css-loader.js"}],"src\\app.ts":[function(require,module,exports) {
'use strict';

require('es6-promise/auto');

var _game = require('./game');

var Game = _interopRequireWildcard(_game);

var _board = require('./board');

require('./style.css');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

document.addEventListener('DOMContentLoaded', function () {
    var canvas = document.querySelector('canvas');
    if (!canvas) {
        console.error('Canvas DOM is null');
        return;
    }
    var board = new _board.Board(canvas);
    board.render();
    var modeChooser = document.querySelector('.mode-chooser-submit');
    if (modeChooser) {
        modeChooser.addEventListener('click', function () {
            var modeDOM = document.querySelector('.mode');
            if (modeDOM) {
                var modeInputDOMs = document.querySelectorAll('.mode-chooser-input');
                var chosenMode = null;
                for (var i = 0; i < modeInputDOMs.length; i++) {
                    chosenMode = modeInputDOMs[i].checked ? modeInputDOMs[i].value : null;
                    if (chosenMode) {
                        break;
                    }
                }
                if (!chosenMode) {
                    chosenMode = 'offline-ai';
                }
                if (chosenMode === 'offline-human') {
                    Game.initGameLocal2p();
                } else if (chosenMode === 'offline-ai') {
                    Game.initGameLocalAi();
                }
                modeDOM.classList.add('invisible');
                modeDOM.addEventListener('transitionend', function () {
                    modeDOM.classList.add('hidden');
                });
            }
        });
    }
});
},{"es6-promise/auto":"node_modules\\es6-promise\\auto.js","./game":"src\\game\\index.ts","./board":"src\\board.ts","./style.css":"src\\style.css"}],"node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '62244' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js","src\\app.ts"], null)
//# sourceMappingURL=/app.1844ad28.map