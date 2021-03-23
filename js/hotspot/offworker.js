/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../common/Message.ts":
/*!****************************!*\
  !*** ../common/Message.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

    "use strict";
    eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.messageDecode = exports.messageEncode = void 0;\nfunction messageEncode(state, data, code) {\n    return JSON.stringify({\n        state,\n        data,\n        code\n    });\n}\nexports.messageEncode = messageEncode;\nfunction messageDecode(message) {\n    const json = JSON.parse(message);\n    return json;\n}\nexports.messageDecode = messageDecode;\n\n\n//# sourceURL=webpack:///../common/Message.ts?");
    
    /***/ }),
    
    /***/ "./node_modules/node-color-log/index.js":
    /*!**********************************************!*\
      !*** ./node_modules/node-color-log/index.js ***!
      \**********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    eval("/* WEBPACK VAR INJECTION */(function(process) {const CONFIG = {\n        SYSTEM: {\n            reset: \"\\x1b[0m\",\n            bold: \"\\x1b[1m\",\n            dim: \"\\x1b[2m\",\n            italic: \"\\x1b[3m\",\n            underscore: \"\\x1b[4m\",\n            reverse: \"\\x1b[7m\",\n            strikethrough: \"\\x1b[9m\",\n            backoneline: \"\\x1b[1A\",\n            cleanthisline: \"\\x1b[K\"\n        },\n        FONT: {\n            black: \"\\x1b[30m\",\n            red: \"\\x1b[31m\",\n            green: \"\\x1b[32m\",\n            yellow: \"\\x1b[33m\",\n            blue: \"\\x1b[34m\",\n            magenta: \"\\x1b[35m\",\n            cyan: \"\\x1b[36m\",\n            white: \"\\x1b[37m\",\n        },\n        BACKGROUND: {\n            black: \"\\x1b[40m\",\n            red: \"\\x1b[41m\",\n            green: \"\\x1b[42m\",\n            yellow: \"\\x1b[43m\",\n            blue: \"\\x1b[44m\",\n            magenta: \"\\x1b[45m\",\n            cyan: \"\\x1b[46m\",\n            white: \"\\x1b[47m\"\n        }\n    },\n    // Sequence of levels is important.\n    LEVELS = [\"debug\", \"info\", \"warn\", \"error\"];\n\nclass Logger {\n    constructor() {\n        // Current command\n        this.command = '';\n        // Last line\n        this.lastCommand = '';\n\n        // set level from env\n        const level = process.env.LOGGER;\n        if (this.isLevelValid(level)) {\n            this.level = level;\n        }\n\n        this.noColor = false;\n    }\n\n    setLevel(level) {\n        if (this.isLevelValid(level)) {\n            this.level = level;\n        } else {\n            throw \"Level you are trying to set is invalid\";\n        }\n\n    }\n\n    setLevelNoColor() {\n        this.noColor = true;\n    }\n\n    setLevelColor() {\n        this.noColor = false;\n    }\n\n    isLevelValid(level) {\n        return LEVELS.includes(level);\n    }\n\n    isAllowedLevel(level) {\n        return this.level ? LEVELS.indexOf(this.level) <= LEVELS.indexOf(level) : true\n    }\n\n    log(...args) {\n\n        for (const idx in args) {\n            const arg = args[idx];\n            if (typeof arg === \"string\") {\n                this.command += arg;\n            } else {\n                this.command += JSON.stringify(arg);\n            }\n            if (args.length > 1 && idx < args.length - 1) {\n                this.command += \" \";\n            }\n        }\n\n        if (!this.noColor) {\n            this.command += CONFIG.SYSTEM.reset;\n        }\n        console.log(this.command);\n        // Save last command if we need to use for joint\n        this.lastCommand = this.command;\n        this.command = '';\n        return this;\n    }\n\n    joint() {\n        // Clear the last line\n        console.log(CONFIG.SYSTEM.backoneline + CONFIG.SYSTEM.cleanthisline);\n\n        // Reset the command to let it joint the next\n        // And print from the position of last line\n        this.command = '';\n\n        // if joint more than twice, we should clean the previous\n        // backline command, since we should only do it for the \n        // current time.\n        this.lastCommand = this.lastCommand.replace(CONFIG.SYSTEM.backoneline, \"\");\n\n        // back to the last line\n        this.command += CONFIG.SYSTEM.backoneline;\n\n        this.command += this.lastCommand;\n        return this;\n    }\n\n    color(ticket) {\n        if (ticket in CONFIG.FONT) {\n            this.command += CONFIG.FONT[ticket];\n        } else {\n            this.warn(\"node-color-log: Font color not found! Use the default.\")\n        }\n        return this;\n    }\n\n    bgColor(ticket) {\n        if (ticket in CONFIG.BACKGROUND) {\n            this.command += CONFIG.BACKGROUND[ticket];\n        } else {\n            this.warn(\"node-color-log: Background color not found! Use the default.\")\n        }\n        return this;\n    }\n\n    bold() {\n        this.command += CONFIG.SYSTEM.bold;\n        return this;\n    }\n\n    dim() {\n        this.command += CONFIG.SYSTEM.dim;\n        return this;\n    }\n\n    underscore() {\n        this.command += CONFIG.SYSTEM.underscore;\n        return this;\n    }\n\n    strikethrough() {\n        this.command += CONFIG.SYSTEM.strikethrough;\n        return this;\n    }\n\n    reverse() {\n        this.command += CONFIG.SYSTEM.reverse;\n        return this;\n    }\n\n    italic() {\n        this.command += CONFIG.SYSTEM.italic;\n        return this;\n    }\n\n    fontColorLog(ticket, text, setting) {\n        let command = '';\n        if (setting) {\n            command += this.checkSetting(setting);\n        }\n        if (ticket in CONFIG.FONT) {\n            command += CONFIG.FONT[ticket];\n        } else {\n            this.warn(\"node-color-log: Font color not found! Use the default.\")\n        }\n        command += text;\n\n        command += CONFIG.SYSTEM.reset;\n        console.log(command);\n    }\n\n    bgColorLog(ticket, text, setting) {\n        let command = '';\n        if (setting) {\n            command += this.checkSetting(setting);\n        }\n        if (ticket in CONFIG.BACKGROUND) {\n            command += CONFIG.BACKGROUND[ticket];\n        } else {\n            this.warn(\"node-color-log: Background color not found! Use the default.\")\n        }\n        command += text;\n\n        command += CONFIG.SYSTEM.reset;\n        console.log(command);\n    }\n\n    colorLog(ticketObj, text, setting) {\n        let command = '';\n        if (setting) {\n            command += this.checkSetting(setting);\n        }\n        if (ticketObj.font in CONFIG.FONT) {\n            command += CONFIG.FONT[ticketObj.font];\n        } else {\n            this.warn(\"node-color-log: Font color not found! Use the default.\")\n        }\n        if (ticketObj.bg in CONFIG.BACKGROUND) {\n            command += CONFIG.BACKGROUND[ticketObj.bg]\n        } else {\n            this.warn(\"node-color-log: Background color not found! Use the default.\")\n        }\n\n        command += text;\n\n        command += CONFIG.SYSTEM.reset;\n        console.log(command);\n    }\n\n    error(...args) {\n        if (this.isAllowedLevel(\"error\")) {\n            if (this.noColor) {\n                const d = (new Date()).toISOString();\n                this.log(d, \" [ERROR] \", ...args);\n            } else {\n                const d = (new Date()).toISOString();\n                this.log(d + \" \").joint()\n                    .bgColor('red').log('[ERROR]').joint()\n                    .log(\" \").joint()\n                    .color('red').log(...args);\n            }\n        }\n    }\n\n    warn(...args) {\n        if (this.isAllowedLevel(\"warn\")) {\n            if (this.noColor) {\n                const d = (new Date()).toISOString();\n                this.log(d, \" [WARN] \", ...args);\n            } else {\n                const d = (new Date()).toISOString();\n                this.log(d + \" \").joint()\n                    .bgColor('yellow').log('[WARN]').joint()\n                    .log(\" \").joint()\n                    .color('yellow').log(...args);\n            }\n        }\n    }\n\n    info(...args) {\n        if (this.isAllowedLevel(\"info\")) {\n            if (this.noColor) {\n                const d = (new Date()).toISOString();\n                this.log(d, \" [INFO] \", ...args);\n            } else {\n                const d = (new Date()).toISOString();\n                this.log(d + \" \").joint()\n                    .bgColor('green').log('[INFO]').joint()\n                    .log(\" \").joint()\n                    .color('green').log(...args);\n            }\n        }\n    }\n\n    debug(...args) {\n        if (this.isAllowedLevel(\"debug\")) {\n            if (this.noColor) {\n                const d = (new Date()).toISOString();\n                this.log(d, \" [DEBUG] \", ...args);\n            } else {\n                const d = (new Date()).toISOString();\n                this.log(d + \" \").joint()\n                    .bgColor('cyan').log(\"[DEBUG]\").joint()\n                    .log(' ').joint()\n                    .color('cyan')\n                    .log(...args);\n            }\n        }\n    }\n\n    checkSetting(setting) {\n        const validSetting = ['bold', 'italic', 'dim', 'underscore', 'reverse', 'strikethrough'];\n        let command = '';\n        for (const item in setting) {\n            if (validSetting.indexOf(item) !== -1) {\n                if (setting[item] === true) {\n                    command += CONFIG.SYSTEM[item];\n                } else if (setting[item] !== false) {\n                    this.warn(`node-color-log: The value ${item} should be boolean.`)\n                }\n            } else {\n                this.warn(`node-color-log: ${item} is not valid in setting.`)\n            }\n        }\n        return command;\n    }\n\n}\n\nconst logger = new Logger();\nmodule.exports = logger;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ \"./node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///./node_modules/node-color-log/index.js?");
    
    /***/ }),
    
    /***/ "./node_modules/process/browser.js":
    /*!*****************************************!*\
      !*** ./node_modules/process/browser.js ***!
      \*****************************************/
    /*! no static exports found */
    /***/ (function(module, exports) {
    
    eval("// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout () {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) { return [] }\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n\n\n//# sourceURL=webpack:///./node_modules/process/browser.js?");
    
    /***/ }),
    
    /***/ "./node_modules/uuid/dist/esm-browser/index.js":
    /*!*****************************************************!*\
      !*** ./node_modules/uuid/dist/esm-browser/index.js ***!
      \*****************************************************/
    /*! exports provided: v1, v3, v4, v5, NIL, version, validate, stringify, parse */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {
    
    "use strict";
    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _v1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v1.js */ \"./node_modules/uuid/dist/esm-browser/v1.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"v1\", function() { return _v1_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _v3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./v3.js */ \"./node_modules/uuid/dist/esm-browser/v3.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"v3\", function() { return _v3_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n/* harmony import */ var _v4_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./v4.js */ \"./node_modules/uuid/dist/esm-browser/v4.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"v4\", function() { return _v4_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]; });\n\n/* harmony import */ var _v5_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./v5.js */ \"./node_modules/uuid/dist/esm-browser/v5.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"v5\", function() { return _v5_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]; });\n\n/* harmony import */ var _nil_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./nil.js */ \"./node_modules/uuid/dist/esm-browser/nil.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"NIL\", function() { return _nil_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]; });\n\n/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./version.js */ \"./node_modules/uuid/dist/esm-browser/version.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"version\", function() { return _version_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"]; });\n\n/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./validate.js */ \"./node_modules/uuid/dist/esm-browser/validate.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"validate\", function() { return _validate_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"]; });\n\n/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./stringify.js */ \"./node_modules/uuid/dist/esm-browser/stringify.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"stringify\", function() { return _stringify_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"]; });\n\n/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./parse.js */ \"./node_modules/uuid/dist/esm-browser/parse.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"parse\", function() { return _parse_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"]; });\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack:///./node_modules/uuid/dist/esm-browser/index.js?");
    
    /***/ }),
    
    /***/ "./node_modules/uuid/dist/esm-browser/md5.js":
    /*!***************************************************!*\
      !*** ./node_modules/uuid/dist/esm-browser/md5.js ***!
      \***************************************************/
    /*! exports provided: default */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {
    
    "use strict";
    eval("__webpack_require__.r(__webpack_exports__);\n/*\n * Browser-compatible JavaScript MD5\n *\n * Modification of JavaScript MD5\n * https://github.com/blueimp/JavaScript-MD5\n *\n * Copyright 2011, Sebastian Tschan\n * https://blueimp.net\n *\n * Licensed under the MIT license:\n * https://opensource.org/licenses/MIT\n *\n * Based on\n * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message\n * Digest Algorithm, as defined in RFC 1321.\n * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009\n * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet\n * Distributed under the BSD License\n * See http://pajhome.org.uk/crypt/md5 for more info.\n */\nfunction md5(bytes) {\n  if (typeof bytes === 'string') {\n    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape\n\n    bytes = new Uint8Array(msg.length);\n\n    for (var i = 0; i < msg.length; ++i) {\n      bytes[i] = msg.charCodeAt(i);\n    }\n  }\n\n  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));\n}\n/*\n * Convert an array of little-endian words to an array of bytes\n */\n\n\nfunction md5ToHexEncodedArray(input) {\n  var output = [];\n  var length32 = input.length * 32;\n  var hexTab = '0123456789abcdef';\n\n  for (var i = 0; i < length32; i += 8) {\n    var x = input[i >> 5] >>> i % 32 & 0xff;\n    var hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);\n    output.push(hex);\n  }\n\n  return output;\n}\n/**\n * Calculate output length with padding and bit length\n */\n\n\nfunction getOutputLength(inputLength8) {\n  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;\n}\n/*\n * Calculate the MD5 of an array of little-endian words, and a bit length.\n */\n\n\nfunction wordsToMd5(x, len) {\n  /* append padding */\n  x[len >> 5] |= 0x80 << len % 32;\n  x[getOutputLength(len) - 1] = len;\n  var a = 1732584193;\n  var b = -271733879;\n  var c = -1732584194;\n  var d = 271733878;\n\n  for (var i = 0; i < x.length; i += 16) {\n    var olda = a;\n    var oldb = b;\n    var oldc = c;\n    var oldd = d;\n    a = md5ff(a, b, c, d, x[i], 7, -680876936);\n    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);\n    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);\n    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);\n    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);\n    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);\n    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);\n    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);\n    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);\n    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);\n    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);\n    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);\n    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);\n    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);\n    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);\n    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);\n    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);\n    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);\n    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);\n    b = md5gg(b, c, d, a, x[i], 20, -373897302);\n    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);\n    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);\n    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);\n    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);\n    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);\n    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);\n    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);\n    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);\n    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);\n    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);\n    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);\n    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);\n    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);\n    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);\n    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);\n    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);\n    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);\n    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);\n    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);\n    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);\n    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);\n    d = md5hh(d, a, b, c, x[i], 11, -358537222);\n    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);\n    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);\n    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);\n    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);\n    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);\n    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);\n    a = md5ii(a, b, c, d, x[i], 6, -198630844);\n    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);\n    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);\n    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);\n    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);\n    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);\n    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);\n    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);\n    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);\n    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);\n    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);\n    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);\n    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);\n    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);\n    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);\n    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);\n    a = safeAdd(a, olda);\n    b = safeAdd(b, oldb);\n    c = safeAdd(c, oldc);\n    d = safeAdd(d, oldd);\n  }\n\n  return [a, b, c, d];\n}\n/*\n * Convert an array bytes to an array of little-endian words\n * Characters >255 have their high-byte silently ignored.\n */\n\n\nfunction bytesToWords(input) {\n  if (input.length === 0) {\n    return [];\n  }\n\n  var length8 = input.length * 8;\n  var output = new Uint32Array(getOutputLength(length8));\n\n  for (var i = 0; i < length8; i += 8) {\n    output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;\n  }\n\n  return output;\n}\n/*\n * Add integers, wrapping at 2^32. This uses 16-bit operations internally\n * to work around bugs in some JS interpreters.\n */\n\n\nfunction safeAdd(x, y) {\n  var lsw = (x & 0xffff) + (y & 0xffff);\n  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);\n  return msw << 16 | lsw & 0xffff;\n}\n/*\n * Bitwise rotate a 32-bit number to the left.\n */\n\n\nfunction bitRotateLeft(num, cnt) {\n  return num << cnt | num >>> 32 - cnt;\n}\n/*\n * These functions implement the four basic operations the algorithm uses.\n */\n\n\nfunction md5cmn(q, a, b, x, s, t) {\n  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);\n}\n\nfunction md5ff(a, b, c, d, x, s, t) {\n  return md5cmn(b & c | ~b & d, a, b, x, s, t);\n}\n\nfunction md5gg(a, b, c, d, x, s, t) {\n  return md5cmn(b & d | c & ~d, a, b, x, s, t);\n}\n\nfunction md5hh(a, b, c, d, x, s, t) {\n  return md5cmn(b ^ c ^ d, a, b, x, s, t);\n}\n\nfunction md5ii(a, b, c, d, x, s, t) {\n  return md5cmn(c ^ (b | ~d), a, b, x, s, t);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (md5);\n\n//# sourceURL=webpack:///./node_modules/uuid/dist/esm-browser/md5.js?");
    
    /***/ }),
    
    /***/ "./node_modules/uuid/dist/esm-browser/nil.js":
    /*!***************************************************!*\
      !*** ./node_modules/uuid/dist/esm-browser/nil.js ***!
      \***************************************************/
    /*! exports provided: default */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {
    
    "use strict";
    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ('00000000-0000-0000-0000-000000000000');\n\n//# sourceURL=webpack:///./node_modules/uuid/dist/esm-browser/nil.js?");
    
    /***/ }),
    
    /***/ "./node_modules/uuid/dist/esm-browser/parse.js":
    /*!*****************************************************!*\
      !*** ./node_modules/uuid/dist/esm-browser/parse.js ***!
      \*****************************************************/
    /*! exports provided: default */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {
    
    "use strict";
    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ \"./node_modules/uuid/dist/esm-browser/validate.js\");\n\n\nfunction parse(uuid) {\n  if (!Object(_validate_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(uuid)) {\n    throw TypeError('Invalid UUID');\n  }\n\n  var v;\n  var arr = new Uint8Array(16); // Parse ########-....-....-....-............\n\n  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;\n  arr[1] = v >>> 16 & 0xff;\n  arr[2] = v >>> 8 & 0xff;\n  arr[3] = v & 0xff; // Parse ........-####-....-....-............\n\n  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;\n  arr[5] = v & 0xff; // Parse ........-....-####-....-............\n\n  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;\n  arr[7] = v & 0xff; // Parse ........-....-....-####-............\n\n  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;\n  arr[9] = v & 0xff; // Parse ........-....-....-....-############\n  // (Use \"/\" to avoid 32-bit truncation when bit-shifting high-order bytes)\n\n  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;\n  arr[11] = v / 0x100000000 & 0xff;\n  arr[12] = v >>> 24 & 0xff;\n  arr[13] = v >>> 16 & 0xff;\n  arr[14] = v >>> 8 & 0xff;\n  arr[15] = v & 0xff;\n  return arr;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (parse);\n\n//# sourceURL=webpack:///./node_modules/uuid/dist/esm-browser/parse.js?");
    
    /***/ }),
    
    /***/ "./node_modules/uuid/dist/esm-browser/regex.js":
    /*!*****************************************************!*\
      !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
      \*****************************************************/
    /*! exports provided: default */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {
    
    "use strict";
    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);\n\n//# sourceURL=webpack:///./node_modules/uuid/dist/esm-browser/regex.js?");
    
    /***/ }),
    
    /***/ "./node_modules/uuid/dist/esm-browser/rng.js":
    /*!***************************************************!*\
      !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
      \***************************************************/
    /*! exports provided: default */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {
    
    "use strict";
    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return rng; });\n// Unique ID creation requires a high quality random # generator. In the browser we therefore\n// require the crypto API and do not support built-in fallback to lower quality random number\n// generators (like Math.random()).\n// getRandomValues needs to be invoked in a context where \"this\" is a Crypto implementation. Also,\n// find the complete implementation of crypto (msCrypto) on IE11.\nvar getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);\nvar rnds8 = new Uint8Array(16);\nfunction rng() {\n  if (!getRandomValues) {\n    throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');\n  }\n\n  return getRandomValues(rnds8);\n}\n\n//# sourceURL=webpack:///./node_modules/uuid/dist/esm-browser/rng.js?");
    
    /***/ }),
    
    /***/ "./node_modules/uuid/dist/esm-browser/sha1.js":
    /*!****************************************************!*\
      !*** ./node_modules/uuid/dist/esm-browser/sha1.js ***!
      \****************************************************/
    /*! exports provided: default */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {
    
    "use strict";
    eval("__webpack_require__.r(__webpack_exports__);\n// Adapted from Chris Veness' SHA1 code at\n// http://www.movable-type.co.uk/scripts/sha1.html\nfunction f(s, x, y, z) {\n  switch (s) {\n    case 0:\n      return x & y ^ ~x & z;\n\n    case 1:\n      return x ^ y ^ z;\n\n    case 2:\n      return x & y ^ x & z ^ y & z;\n\n    case 3:\n      return x ^ y ^ z;\n  }\n}\n\nfunction ROTL(x, n) {\n  return x << n | x >>> 32 - n;\n}\n\nfunction sha1(bytes) {\n  var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];\n  var H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];\n\n  if (typeof bytes === 'string') {\n    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape\n\n    bytes = [];\n\n    for (var i = 0; i < msg.length; ++i) {\n      bytes.push(msg.charCodeAt(i));\n    }\n  } else if (!Array.isArray(bytes)) {\n    // Convert Array-like to Array\n    bytes = Array.prototype.slice.call(bytes);\n  }\n\n  bytes.push(0x80);\n  var l = bytes.length / 4 + 2;\n  var N = Math.ceil(l / 16);\n  var M = new Array(N);\n\n  for (var _i = 0; _i < N; ++_i) {\n    var arr = new Uint32Array(16);\n\n    for (var j = 0; j < 16; ++j) {\n      arr[j] = bytes[_i * 64 + j * 4] << 24 | bytes[_i * 64 + j * 4 + 1] << 16 | bytes[_i * 64 + j * 4 + 2] << 8 | bytes[_i * 64 + j * 4 + 3];\n    }\n\n    M[_i] = arr;\n  }\n\n  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);\n  M[N - 1][14] = Math.floor(M[N - 1][14]);\n  M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;\n\n  for (var _i2 = 0; _i2 < N; ++_i2) {\n    var W = new Uint32Array(80);\n\n    for (var t = 0; t < 16; ++t) {\n      W[t] = M[_i2][t];\n    }\n\n    for (var _t = 16; _t < 80; ++_t) {\n      W[_t] = ROTL(W[_t - 3] ^ W[_t - 8] ^ W[_t - 14] ^ W[_t - 16], 1);\n    }\n\n    var a = H[0];\n    var b = H[1];\n    var c = H[2];\n    var d = H[3];\n    var e = H[4];\n\n    for (var _t2 = 0; _t2 < 80; ++_t2) {\n      var s = Math.floor(_t2 / 20);\n      var T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[_t2] >>> 0;\n      e = d;\n      d = c;\n      c = ROTL(b, 30) >>> 0;\n      b = a;\n      a = T;\n    }\n\n    H[0] = H[0] + a >>> 0;\n    H[1] = H[1] + b >>> 0;\n    H[2] = H[2] + c >>> 0;\n    H[3] = H[3] + d >>> 0;\n    H[4] = H[4] + e >>> 0;\n  }\n\n  return [H[0] >> 24 & 0xff, H[0] >> 16 & 0xff, H[0] >> 8 & 0xff, H[0] & 0xff, H[1] >> 24 & 0xff, H[1] >> 16 & 0xff, H[1] >> 8 & 0xff, H[1] & 0xff, H[2] >> 24 & 0xff, H[2] >> 16 & 0xff, H[2] >> 8 & 0xff, H[2] & 0xff, H[3] >> 24 & 0xff, H[3] >> 16 & 0xff, H[3] >> 8 & 0xff, H[3] & 0xff, H[4] >> 24 & 0xff, H[4] >> 16 & 0xff, H[4] >> 8 & 0xff, H[4] & 0xff];\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (sha1);\n\n//# sourceURL=webpack:///./node_modules/uuid/dist/esm-browser/sha1.js?");
    
    /***/ }),
    
    /***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
    /*!*********************************************************!*\
      !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
      \*********************************************************/
    /*! exports provided: default */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {
    
    "use strict";
    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ \"./node_modules/uuid/dist/esm-browser/validate.js\");\n\n/**\n * Convert array of 16 byte values to UUID string format of the form:\n * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX\n */\n\nvar byteToHex = [];\n\nfor (var i = 0; i < 256; ++i) {\n  byteToHex.push((i + 0x100).toString(16).substr(1));\n}\n\nfunction stringify(arr) {\n  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;\n  // Note: Be careful editing this code!  It's been tuned for performance\n  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434\n  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one\n  // of the following:\n  // - One or more input array values don't map to a hex octet (leading to\n  // \"undefined\" in the uuid)\n  // - Invalid input values for the RFC `version` or `variant` fields\n\n  if (!Object(_validate_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(uuid)) {\n    throw TypeError('Stringified UUID is invalid');\n  }\n\n  return uuid;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (stringify);\n\n//# sourceURL=webpack:///./node_modules/uuid/dist/esm-browser/stringify.js?");
    
    /***/ }),
    
    /***/ "./node_modules/uuid/dist/esm-browser/v1.js":
    /*!**************************************************!*\
      !*** ./node_modules/uuid/dist/esm-browser/v1.js ***!
      \**************************************************/
    /*! exports provided: default */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {
    
    "use strict";
    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ \"./node_modules/uuid/dist/esm-browser/rng.js\");\n/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ \"./node_modules/uuid/dist/esm-browser/stringify.js\");\n\n // **`v1()` - Generate time-based UUID**\n//\n// Inspired by https://github.com/LiosK/UUID.js\n// and http://docs.python.org/library/uuid.html\n\nvar _nodeId;\n\nvar _clockseq; // Previous uuid creation time\n\n\nvar _lastMSecs = 0;\nvar _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details\n\nfunction v1(options, buf, offset) {\n  var i = buf && offset || 0;\n  var b = buf || new Array(16);\n  options = options || {};\n  var node = options.node || _nodeId;\n  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not\n  // specified.  We do this lazily to minimize issues related to insufficient\n  // system entropy.  See #189\n\n  if (node == null || clockseq == null) {\n    var seedBytes = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n\n    if (node == null) {\n      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)\n      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];\n    }\n\n    if (clockseq == null) {\n      // Per 4.2.2, randomize (14 bit) clockseq\n      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;\n    }\n  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,\n  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so\n  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'\n  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.\n\n\n  var msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock\n  // cycle to simulate higher resolution clock\n\n  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)\n\n  var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression\n\n  if (dt < 0 && options.clockseq === undefined) {\n    clockseq = clockseq + 1 & 0x3fff;\n  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new\n  // time interval\n\n\n  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {\n    nsecs = 0;\n  } // Per 4.2.1.2 Throw error if too many uuids are requested\n\n\n  if (nsecs >= 10000) {\n    throw new Error(\"uuid.v1(): Can't create more than 10M uuids/sec\");\n  }\n\n  _lastMSecs = msecs;\n  _lastNSecs = nsecs;\n  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch\n\n  msecs += 12219292800000; // `time_low`\n\n  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;\n  b[i++] = tl >>> 24 & 0xff;\n  b[i++] = tl >>> 16 & 0xff;\n  b[i++] = tl >>> 8 & 0xff;\n  b[i++] = tl & 0xff; // `time_mid`\n\n  var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;\n  b[i++] = tmh >>> 8 & 0xff;\n  b[i++] = tmh & 0xff; // `time_high_and_version`\n\n  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version\n\n  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)\n\n  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`\n\n  b[i++] = clockseq & 0xff; // `node`\n\n  for (var n = 0; n < 6; ++n) {\n    b[i + n] = node[n];\n  }\n\n  return buf || Object(_stringify_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(b);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (v1);\n\n//# sourceURL=webpack:///./node_modules/uuid/dist/esm-browser/v1.js?");
    
    /***/ }),
    
    /***/ "./node_modules/uuid/dist/esm-browser/v3.js":
    /*!**************************************************!*\
      !*** ./node_modules/uuid/dist/esm-browser/v3.js ***!
      \**************************************************/
    /*! exports provided: default */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {
    
    "use strict";
    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _v35_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v35.js */ \"./node_modules/uuid/dist/esm-browser/v35.js\");\n/* harmony import */ var _md5_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./md5.js */ \"./node_modules/uuid/dist/esm-browser/md5.js\");\n\n\nvar v3 = Object(_v35_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('v3', 0x30, _md5_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n/* harmony default export */ __webpack_exports__[\"default\"] = (v3);\n\n//# sourceURL=webpack:///./node_modules/uuid/dist/esm-browser/v3.js?");
    
    /***/ }),
    
    /***/ "./node_modules/uuid/dist/esm-browser/v35.js":
    /*!***************************************************!*\
      !*** ./node_modules/uuid/dist/esm-browser/v35.js ***!
      \***************************************************/
    /*! exports provided: DNS, URL, default */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {
    
    "use strict";
    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DNS\", function() { return DNS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"URL\", function() { return URL; });\n/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stringify.js */ \"./node_modules/uuid/dist/esm-browser/stringify.js\");\n/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parse.js */ \"./node_modules/uuid/dist/esm-browser/parse.js\");\n\n\n\nfunction stringToBytes(str) {\n  str = unescape(encodeURIComponent(str)); // UTF8 escape\n\n  var bytes = [];\n\n  for (var i = 0; i < str.length; ++i) {\n    bytes.push(str.charCodeAt(i));\n  }\n\n  return bytes;\n}\n\nvar DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';\nvar URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (name, version, hashfunc) {\n  function generateUUID(value, namespace, buf, offset) {\n    if (typeof value === 'string') {\n      value = stringToBytes(value);\n    }\n\n    if (typeof namespace === 'string') {\n      namespace = Object(_parse_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(namespace);\n    }\n\n    if (namespace.length !== 16) {\n      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');\n    } // Compute hash of namespace and value, Per 4.3\n    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =\n    // hashfunc([...namespace, ... value])`\n\n\n    var bytes = new Uint8Array(16 + value.length);\n    bytes.set(namespace);\n    bytes.set(value, namespace.length);\n    bytes = hashfunc(bytes);\n    bytes[6] = bytes[6] & 0x0f | version;\n    bytes[8] = bytes[8] & 0x3f | 0x80;\n\n    if (buf) {\n      offset = offset || 0;\n\n      for (var i = 0; i < 16; ++i) {\n        buf[offset + i] = bytes[i];\n      }\n\n      return buf;\n    }\n\n    return Object(_stringify_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(bytes);\n  } // Function#name is not settable on some platforms (#270)\n\n\n  try {\n    generateUUID.name = name; // eslint-disable-next-line no-empty\n  } catch (err) {} // For CommonJS default export support\n\n\n  generateUUID.DNS = DNS;\n  generateUUID.URL = URL;\n  return generateUUID;\n});\n\n//# sourceURL=webpack:///./node_modules/uuid/dist/esm-browser/v35.js?");
    
    /***/ }),
    
    /***/ "./node_modules/uuid/dist/esm-browser/v4.js":
    /*!**************************************************!*\
      !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
      \**************************************************/
    /*! exports provided: default */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {
    
    "use strict";
    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ \"./node_modules/uuid/dist/esm-browser/rng.js\");\n/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ \"./node_modules/uuid/dist/esm-browser/stringify.js\");\n\n\n\nfunction v4(options, buf, offset) {\n  options = options || {};\n  var rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`\n\n  rnds[6] = rnds[6] & 0x0f | 0x40;\n  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided\n\n  if (buf) {\n    offset = offset || 0;\n\n    for (var i = 0; i < 16; ++i) {\n      buf[offset + i] = rnds[i];\n    }\n\n    return buf;\n  }\n\n  return Object(_stringify_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(rnds);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (v4);\n\n//# sourceURL=webpack:///./node_modules/uuid/dist/esm-browser/v4.js?");
    
    /***/ }),
    
    /***/ "./node_modules/uuid/dist/esm-browser/v5.js":
    /*!**************************************************!*\
      !*** ./node_modules/uuid/dist/esm-browser/v5.js ***!
      \**************************************************/
    /*! exports provided: default */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {
    
    "use strict";
    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _v35_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v35.js */ \"./node_modules/uuid/dist/esm-browser/v35.js\");\n/* harmony import */ var _sha1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sha1.js */ \"./node_modules/uuid/dist/esm-browser/sha1.js\");\n\n\nvar v5 = Object(_v35_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('v5', 0x50, _sha1_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n/* harmony default export */ __webpack_exports__[\"default\"] = (v5);\n\n//# sourceURL=webpack:///./node_modules/uuid/dist/esm-browser/v5.js?");
    
    /***/ }),
    
    /***/ "./node_modules/uuid/dist/esm-browser/validate.js":
    /*!********************************************************!*\
      !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
      \********************************************************/
    /*! exports provided: default */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {
    
    "use strict";
    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ \"./node_modules/uuid/dist/esm-browser/regex.js\");\n\n\nfunction validate(uuid) {\n  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].test(uuid);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (validate);\n\n//# sourceURL=webpack:///./node_modules/uuid/dist/esm-browser/validate.js?");
    
    /***/ }),
    
    /***/ "./node_modules/uuid/dist/esm-browser/version.js":
    /*!*******************************************************!*\
      !*** ./node_modules/uuid/dist/esm-browser/version.js ***!
      \*******************************************************/
    /*! exports provided: default */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {
    
    "use strict";
    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ \"./node_modules/uuid/dist/esm-browser/validate.js\");\n\n\nfunction version(uuid) {\n  if (!Object(_validate_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(uuid)) {\n    throw TypeError('Invalid UUID');\n  }\n\n  return parseInt(uuid.substr(14, 1), 16);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (version);\n\n//# sourceURL=webpack:///./node_modules/uuid/dist/esm-browser/version.js?");
    
    /***/ }),
    
    /***/ "./node_modules/webpack/buildin/global.js":
    /*!***********************************!*\
      !*** (webpack)/buildin/global.js ***!
      \***********************************/
    /*! no static exports found */
    /***/ (function(module, exports) {
    
    eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || new Function(\"return this\")();\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?");
    
    /***/ }),
    
    /***/ "./src/BufferConnection.ts":
    /*!*********************************!*\
      !*** ./src/BufferConnection.ts ***!
      \*********************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.BufferConnection = void 0;\nconst Message_1 = __webpack_require__(/*! ../../common/Message */ \"../common/Message.ts\");\nconst logger = __webpack_require__(/*! node-color-log */ \"./node_modules/node-color-log/index.js\");\nlogger.setLevelNoColor();\nclass BufferConnection {\n    constructor(id, size, socket) {\n        this._id = id;\n        this._state = 0 /* Created */;\n        this._size = size;\n        this._isSync = false;\n        this._socket = socket;\n        // give frontend the lock at first\n        this._hasLock = true;\n    }\n    id() {\n        return this._id;\n    }\n    ready() {\n        this._state = 1 /* RemoteReady */;\n    }\n    isReady() {\n        return this._state === 1 /* RemoteReady */;\n    }\n    setLock() {\n        this._hasLock = true;\n    }\n    releaseLock() {\n        this._hasLock = false;\n    }\n    hasLock() {\n        return this._hasLock;\n    }\n    async acquireLockWithSync() {\n        if (!this._hasLock) {\n            // todo: what data I need?\n            const data = this._id;\n            const message = Message_1.messageEncode(\"acquire_lock_with_sync\" /* AcquireLockWithSync */, data, null);\n            this._socket.send(message);\n            logger.info(`Buffer ${this._id} requests the lock with sync.`);\n        }\n        else {\n            logger.info(`Buffer ${this._id} has already had the lock.`);\n        }\n        while (!this._hasLock) {\n            await wait();\n        }\n        return this._hasLock;\n    }\n}\nexports.BufferConnection = BufferConnection;\nasync function wait() {\n    await new Promise(resolve => setTimeout(resolve, 10));\n    return;\n}\n\n\n//# sourceURL=webpack:///./src/BufferConnection.ts?");
    
    /***/ }),
    
    /***/ "./src/OffWorkerManager.ts":
    /*!*********************************!*\
      !*** ./src/OffWorkerManager.ts ***!
      \*********************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.OffWorkerManager = void 0;\nconst Message_1 = __webpack_require__(/*! ../../common/Message */ \"../common/Message.ts\");\nconst WorkerConnection_1 = __webpack_require__(/*! ./WorkerConnection */ \"./src/WorkerConnection.ts\");\nconst BufferConnection_1 = __webpack_require__(/*! ./BufferConnection */ \"./src/BufferConnection.ts\");\nconst MemoryConnection_1 = __webpack_require__(/*! ./WebAssembly/MemoryConnection */ \"./src/WebAssembly/MemoryConnection.ts\");\nconst logger = __webpack_require__(/*! node-color-log */ \"./node_modules/node-color-log/index.js\");\nlogger.setLevelNoColor();\nconst DEFAULT_ADDRESS = \"ws://localhost:8080\";\nconst DEFAULT_THREAD_NUMBER = 4;\nclass OffWorkerManager {\n    constructor(serverAddress) {\n        this._serverAddress = serverAddress || DEFAULT_ADDRESS;\n        this._threadNumber = DEFAULT_THREAD_NUMBER;\n        this._workers = new Map();\n        this._buffers = new Map();\n        this._wasmMems = new Map();\n        this._isConnected = false;\n        logger.info(\"OffWorker created!\");\n    }\n    connect() {\n        try {\n            this._socket = new WebSocket(this._serverAddress);\n            this._socket.addEventListener('open', () => {\n                this._isConnected = true;\n                const helloMsg = Message_1.messageEncode(\"message\" /* Message */, \"Hello Server!\", null);\n                this._socket.send(helloMsg);\n                logger.info(`Socket constructed on ${this._serverAddress}.`);\n            });\n            this._socket.addEventListener('message', (event) => {\n                const msg = Message_1.messageDecode(event.data);\n                this.workDispatch(msg);\n            });\n        }\n        catch (e) {\n            logger.error(\"Error: Cannot connect to server.\" + e);\n        }\n    }\n    disconnect() {\n        this._socket.close();\n        logger.info(`Socket closed from ${this._serverAddress}.`);\n    }\n    async createSharedBuffer(id, size) {\n        const buffer = new BufferConnection_1.BufferConnection(id, size, this._socket);\n        this._buffers.set(buffer.id(), buffer);\n        const urlMsg = Message_1.messageEncode(\"create_buffer\" /* CreateBuffer */, {\n            size: size,\n            id: id\n        }, null);\n        while (!this.isReady()) {\n            await wait();\n        }\n        this._socket.send(urlMsg);\n        logger.info(`SharedArrayBuffer ${id} requests creating.`);\n        return;\n    }\n    async createWorker(id, url, listenPort) {\n        const worker = new WorkerConnection_1.WorkerConnection(id, listenPort, this._socket, this._buffers);\n        this._workers.set(id, worker);\n        const urlMsg = Message_1.messageEncode(\"create_worker\" /* CreateWorker */, {\n            id: id,\n            url: getAbsoluteUrl(url)\n        }, null);\n        while (!this.isReady()) {\n            await wait();\n        }\n        this._socket.send(urlMsg);\n        logger.info(`Worker ${id} requests creating.`);\n        return;\n    }\n    async createWasmModule(moduleId, url) {\n        const msg = Message_1.messageEncode(\"create_wasm_module\" /* CreateWasmModule */, {\n            moduleId: moduleId,\n            url: url\n        }, null);\n        while (!this.isReady()) {\n            await wait();\n        }\n        this._socket.send(msg);\n        logger.info(`Create wasm module ${moduleId} requests creating.`);\n        return;\n    }\n    async createWasmMemory(id, descriptor) {\n        const mem = new MemoryConnection_1.WasmMemoryConnection(id, this._socket);\n        this._wasmMems.set(mem.id(), mem);\n        const msg = Message_1.messageEncode(\"create_wasm_memory\" /* CreateWasmMemory */, {\n            descriptor: descriptor,\n            id: id\n        }, null);\n        while (!this.isReady()) {\n            await wait();\n        }\n        this._socket.send(msg);\n        logger.info(`Wasm Memory ${id} requests creating.`);\n        return;\n    }\n    isReady() {\n        return this._isConnected;\n    }\n    buffer(id) {\n        if (this._buffers.has(id)) {\n            return this._buffers.get(id);\n        }\n        throw \"No such buffer \" + id;\n    }\n    wasmMem(id) {\n        if (this._wasmMems.has(id)) {\n            return this._wasmMems.get(id);\n        }\n        throw \"No such Wasm Memory \" + id;\n    }\n    workDispatch(message) {\n        var _a, _b, _c, _d;\n        const data = message.data;\n        switch (message.state) {\n            case \"buffer_ready\" /* BufferReady */: {\n                const id = data;\n                if (this._buffers.has(id)) {\n                    (_a = this._buffers.get(id)) === null || _a === void 0 ? void 0 : _a.ready();\n                    logger.info(`Buffer ${id} set as ready`);\n                }\n                else {\n                    logger.warn(`Server created a buffer ${id} which is missed in the frontend.`);\n                }\n                break;\n            }\n            case \"get_lock_with_sync\" /* GetLockWithSync */: {\n                const id = data;\n                if (this._buffers.has(id)) {\n                    (_b = this.buffer(id)) === null || _b === void 0 ? void 0 : _b.setLock();\n                    logger.info(`Buffer ${id} get the lock with sync.`);\n                }\n                else {\n                    logger.warn(`Server give the lock to the buffer ${id} which is missed in the frontend.`);\n                }\n                break;\n            }\n            case \"message\" /* Message */: {\n                logger.info(\"server: \" + data);\n                break;\n            }\n            case \"worker_ready\" /* WorkerReady */: {\n                const id = data;\n                if (this._workers.has(id)) {\n                    (_c = this._workers.get(id)) === null || _c === void 0 ? void 0 : _c.ready();\n                    logger.info(`Worker ${id} set as ready`);\n                }\n                else {\n                    logger.warn(`Server start a worker ${id} which is missed in the frontend.`);\n                }\n                break;\n            }\n            case \"post_message\" /* PostMessage */: {\n                const workerId = data.id;\n                const msg = data.message;\n                logger.info(`Worker ${workerId} sent messages ${JSON.stringify(msg)} from server`);\n                if (this._workers.has(workerId)) {\n                    const worker = this._workers.get(workerId);\n                    worker === null || worker === void 0 ? void 0 : worker.receive(msg, []);\n                }\n                else {\n                    logger.warn(`Server start a worker ${workerId} which is missed in the frontend.`);\n                }\n                break;\n            }\n            case \"wasm_memory_ready\" /* WasmMemoryReady */: {\n                const id = data;\n                if (this._wasmMems.has(id)) {\n                    (_d = this._wasmMems.get(id)) === null || _d === void 0 ? void 0 : _d.ready();\n                    logger.info(`Wasm memory ${id} set as ready`);\n                }\n                else {\n                    logger.warn(`Server created a wasm memory ${id} which is missed in the frontend.`);\n                }\n                break;\n            }\n            case \"wasm_module_ready\" /* WasmModuleReady */: {\n                const id = data;\n                logger.info(`Wasm module ${id} set as ready`);\n                break;\n            }\n            default:\n                break;\n        }\n    }\n}\nexports.OffWorkerManager = OffWorkerManager;\nasync function wait() {\n    await new Promise(resolve => setTimeout(resolve, 10));\n    return;\n}\nfunction getAbsoluteUrl(url) {\n    try {\n        let a = document.createElement('A');\n        a.href = url;\n        url = a.href;\n        return url;\n    }\n    catch (e) {\n        return url;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/OffWorkerManager.ts?");
    
    /***/ }),
    
    /***/ "./src/SharedArrayBufferInterface.ts":
    /*!*******************************************!*\
      !*** ./src/SharedArrayBufferInterface.ts ***!
      \*******************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    eval("/* WEBPACK VAR INJECTION */(function(global) {\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.SharedArrayBufferInterface = void 0;\nconst uuid_1 = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/esm-browser/index.js\");\nclass SharedArrayBufferInterface extends SharedArrayBuffer {\n    constructor(size, manager) {\n        super(size);\n        this._id = \"\";\n        // @ts-ignore global is for browsers\n        this._manager = manager || global.OWM;\n        this._id = uuid_1.v4();\n        this._manager.createSharedBuffer(this._id, size);\n    }\n    id() {\n        return this._id;\n    }\n    acquireLockWithSync() {\n        var _a;\n        (_a = this.connection()) === null || _a === void 0 ? void 0 : _a.acquireLockWithSync();\n    }\n    connection() {\n        return this._manager.buffer(this._id);\n    }\n}\nexports.SharedArrayBufferInterface = SharedArrayBufferInterface;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./src/SharedArrayBufferInterface.ts?");
    
    /***/ }),
    
    /***/ "./src/WebAssembly/MemoryConnection.ts":
    /*!*********************************************!*\
      !*** ./src/WebAssembly/MemoryConnection.ts ***!
      \*********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.WasmMemoryConnection = void 0;\nconst logger = __webpack_require__(/*! node-color-log */ \"./node_modules/node-color-log/index.js\");\nlogger.setLevelNoColor();\nclass WasmMemoryConnection {\n    constructor(id, socket) {\n        this._id = id;\n        this._state = 0 /* Created */;\n        this._isSync = false;\n        this._socket = socket;\n        // give frontend the lock at first\n        this._hasLock = true;\n    }\n    id() {\n        return this._id;\n    }\n    ready() {\n        this._state = 1 /* RemoteReady */;\n    }\n    isReady() {\n        return this._state === 1 /* RemoteReady */;\n    }\n}\nexports.WasmMemoryConnection = WasmMemoryConnection;\n\n\n//# sourceURL=webpack:///./src/WebAssembly/MemoryConnection.ts?");
    
    /***/ }),
    
    /***/ "./src/WebAssembly/MemoryInterface.ts":
    /*!********************************************!*\
      !*** ./src/WebAssembly/MemoryInterface.ts ***!
      \********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    eval("/* WEBPACK VAR INJECTION */(function(global) {\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.WasmMemoryInterface = void 0;\nconst uuid_1 = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/esm-browser/index.js\");\nclass WasmMemoryInterface extends WebAssembly.Memory {\n    constructor(descriptor, manager) {\n        super(descriptor);\n        this._id = uuid_1.v4();\n        // @ts-ignore global is for browsers\n        manager = manager || global.OWM;\n        // Only manage Memory that is shared\n        if (descriptor.shared === true) {\n            manager.createWasmMemory(this._id, descriptor);\n        }\n        // don't know why cannot define as proto function\n        this.id = function () {\n            return this._id;\n        };\n    }\n}\nexports.WasmMemoryInterface = WasmMemoryInterface;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./src/WebAssembly/MemoryInterface.ts?");
    
    /***/ }),
    
    /***/ "./src/WebAssembly/function.ts":
    /*!*************************************!*\
      !*** ./src/WebAssembly/function.ts ***!
      \*************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    eval("/* WEBPACK VAR INJECTION */(function(global) {\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.instantiateStreaming = void 0;\nconst uuid_1 = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/esm-browser/index.js\");\nasync function instantiateStreaming(response, importObject, manager) {\n    // @ts-ignore global is for browsers\n    manager = manager || global.OWM;\n    const moduleId = uuid_1.v4();\n    // This implementation falls back to use `instantiate`, which may increase overhead\n    // Assume `response` is a `fetch` promise of WASM file\n    return await response.then(res => {\n        const url = res.url;\n        //@ts-ignore manager must be defined\n        manager.createWasmModule(moduleId, url);\n        ////////////////////////\n        //////////////////////////\n        /////////////////\n        return res.arrayBuffer();\n        //////////////////\n    }).then(async (buffer) => {\n        const source = await WebAssembly.instantiate(buffer, importObject);\n        Object.defineProperty(source.module, \"_id\", { value: moduleId });\n        return new Promise(resolve => { resolve(source); });\n    });\n}\nexports.instantiateStreaming = instantiateStreaming;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./src/WebAssembly/function.ts?");
    
    /***/ }),
    
    /***/ "./src/WebAssembly/index.ts":
    /*!**********************************!*\
      !*** ./src/WebAssembly/index.ts ***!
      \**********************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.NewWebAssembly = void 0;\nconst function_1 = __webpack_require__(/*! ./function */ \"./src/WebAssembly/function.ts\");\nconst MemoryInterface_1 = __webpack_require__(/*! ./MemoryInterface */ \"./src/WebAssembly/MemoryInterface.ts\");\nconst NewWebAssembly = {\n    instantiateStreaming: function_1.instantiateStreaming,\n    Memory: MemoryInterface_1.WasmMemoryInterface,\n};\nexports.NewWebAssembly = NewWebAssembly;\n\n\n//# sourceURL=webpack:///./src/WebAssembly/index.ts?");
    
    /***/ }),
    
    /***/ "./src/WorkerConnection.ts":
    /*!*********************************!*\
      !*** ./src/WorkerConnection.ts ***!
      \*********************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.WorkerConnection = void 0;\nconst Message_1 = __webpack_require__(/*! ../../common/Message */ \"../common/Message.ts\");\nconst logger = __webpack_require__(/*! node-color-log */ \"./node_modules/node-color-log/index.js\");\nlogger.setLevelNoColor();\nclass WorkerConnection {\n    constructor(id, listenPort, socket, buffers) {\n        this._id = id;\n        this._state = 0 /* Created */;\n        this._port = listenPort;\n        this._socket = socket;\n        this._buffers = buffers;\n        // receive data from WorkerInterface\n        this._port.onmessage = (data) => {\n            this.send(data.data);\n        };\n    }\n    id() {\n        return this._id;\n    }\n    ready() {\n        this._state = 1 /* RemoteReady */;\n    }\n    isReady() {\n        return this._state === 1 /* RemoteReady */;\n    }\n    // send data to server\n    async send(data) {\n        const message = Message_1.messageEncode(\"post_message\" /* PostMessage */, {\n            workerId: this._id,\n            message: data\n        }, null);\n        this._data = data;\n        while (!this.isReady()) {\n            await wait();\n        }\n        logger.info(`worker ${this._id} sent data ${JSON.stringify(data)}`);\n        this._socket.send(message);\n    }\n    // receive data from server\n    receive(message, transfer) {\n        // send data to WorkerConnection\n        this._port.postMessage(message, transfer);\n    }\n}\nexports.WorkerConnection = WorkerConnection;\nasync function wait() {\n    await new Promise(resolve => setTimeout(resolve, 10));\n    return;\n}\n\n\n//# sourceURL=webpack:///./src/WorkerConnection.ts?");
    
    /***/ }),
    
    /***/ "./src/WorkerInterface.ts":
    /*!********************************!*\
      !*** ./src/WorkerInterface.ts ***!
      \********************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    eval("/* WEBPACK VAR INJECTION */(function(global) {\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.WorkerInterface = void 0;\nconst uuid_1 = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/esm-browser/index.js\");\nconst logger = __webpack_require__(/*! node-color-log */ \"./node_modules/node-color-log/index.js\");\nlogger.setLevelNoColor();\nclass WorkerInterface {\n    constructor(url, manager, // remain empty for frontend, just for testing\n    channel // remain empty for frontend, just for testing\n    ) {\n        this._id = \"\";\n        this._id = uuid_1.v4();\n        // @ts-ignore global is for browsers\n        this._manager = manager || global.OWM;\n        this._channel = channel || new MessageChannel();\n        this._manager.createWorker(this._id, url, this._channel.port2);\n        // transparent pass message\n        this.onerror = null;\n        this.onmessage = null;\n        this.onmessageerror = null;\n        // start listening at the very beginning\n        this.addEventListener(\"message\", function () { }, false);\n    }\n    id() {\n        return this._id;\n    }\n    postMessage(message, transfer) {\n        this._tmp_transfer = transfer;\n        const newData = message;\n        if (typeof newData === 'object') {\n            const iterate = (obj) => {\n                for (const key in obj) {\n                    if (obj[key].toString() === '[object SharedArrayBuffer]' ||\n                        obj[key].toString() === '[object WebAssembly.Module]' ||\n                        obj[key].toString() === '[object WebAssembly.Memory]') {\n                        if (obj[key].id !== undefined) {\n                            obj[key] = obj[key].id();\n                        }\n                        else if (obj[key]._id !== undefined) {\n                            obj[key] = obj[key]._id;\n                        }\n                        else {\n                            logger.warn(`${key} is ${obj[key].toString()}, but it has no ID.`);\n                        }\n                        if (typeof obj[key] === 'object') {\n                            iterate(obj[key]);\n                        }\n                    }\n                }\n            };\n            iterate(newData);\n        }\n        this._tmp_message = newData;\n        // transparent pass message to WorkerConnection\n        this._channel.port1.postMessage(newData, transfer);\n    }\n    terminate() {\n        this._channel.port1.close();\n        this._channel.port2.close();\n    }\n    addEventListener(name, fn, option) {\n        if (name == \"message\") {\n            const this_ = this;\n            // replace the reference of the function\n            this.onmessage = fn;\n            this._channel.port1.onmessage = function (data) {\n                this_._tmp_data = data;\n                // @ts-ignore no possible is null\n                this_.onmessage.apply(undefined, [data]);\n            };\n        }\n    }\n    removeEventListener(name, fn, option) {\n    }\n}\nexports.WorkerInterface = WorkerInterface;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./src/WorkerInterface.ts?");
    
    /***/ }),
    
    /***/ "./src/index.ts":
    /*!**********************!*\
      !*** ./src/index.ts ***!
      \**********************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    eval("/* WEBPACK VAR INJECTION */(function(global) {\nObject.defineProperty(exports, \"__esModule\", { value: true });\n// @ts-nocheck\nconst OffWorkerManager_1 = __webpack_require__(/*! ./OffWorkerManager */ \"./src/OffWorkerManager.ts\");\n// Store the references of the native APIs\nglobal._Worker = globalThis.Worker;\nglobal._SharedArrayBuffer = globalThis.SharedArrayBuffer;\nglobal.WebAssembly = globalThis.WebAssembly;\nconst manager = new OffWorkerManager_1.OffWorkerManager('ws://localhost:8080');\nglobal.OWM = manager;\nmanager.connect();\nconst WorkerInterface_1 = __webpack_require__(/*! ./WorkerInterface */ \"./src/WorkerInterface.ts\");\nconst SharedArrayBufferInterface_1 = __webpack_require__(/*! ./SharedArrayBufferInterface */ \"./src/SharedArrayBufferInterface.ts\");\nconst index_1 = __webpack_require__(/*! ./WebAssembly/index */ \"./src/WebAssembly/index.ts\");\n// Change the APIs to ours\nglobal.Worker = WorkerInterface_1.WorkerInterface;\nglobal.SharedArrayBuffer = SharedArrayBufferInterface_1.SharedArrayBufferInterface;\nglobal.WebAssembly.Memory = index_1.NewWebAssembly.Memory;\nglobal.WebAssembly.instantiateStreaming = index_1.NewWebAssembly.instantiateStreaming;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./src/index.ts?");
    
    /***/ }),
    
    /***/ 0:
    /*!****************************!*\
      !*** multi ./src/index.ts ***!
      \****************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    eval("module.exports = __webpack_require__(/*! ./src/index.ts */\"./src/index.ts\");\n\n\n//# sourceURL=webpack:///multi_./src/index.ts?");
    
    /***/ })
    
    /******/ });