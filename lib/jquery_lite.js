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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

window.$l = function(arg) {
  if (arg instanceof HTMLElement) {
    const elArr = [arg];
    return new DOMNodeCollection(elArr);
  } else {
    const nodeList = Array.from(document.querySelectorAll(arg));
    return new DOMNodeCollection(nodeList);
  }
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor (elArr) {
    this.elArr = elArr;
  }

  html (string) {
    if (string) {
      this.elArr.forEach((el) => {
        el.innerHTML = string;
      });
      // return this.elArr;
    } else {
      return this.elArr[0].innerHTML;
    }
  }

  empty() {
    this.elArr.html = "";
  }

  forEach (callback){
    for (let i = 0; i < this.elArr.length; i++) {
      callback(this.elArr[i]);
    }
  }

  append(args) {
    this.elArr.forEach(el => {
      args.forEach(arg => {
        el.innerHTML += arg.outerHTML;
      });
    });
    return this.elArr;
  }

  attr(name, value) {
    let element = this.elArr.find((el) => {
      el.getAttribute(name);
    });
    if (value) {
      return element.setAttribute(name, value);
    } else {
      return element.getAttribute(name);
    }
  }

  myClassName() {
    const classArr = [];
    this.elArr.forEach(el => {
      classArr.push(el.className);
    });
    return classArr;
  }

  addClass (name) {
    this.elArr.forEach(el => {
      let className = el.className;
      className += ` ${name}`;
      el.className = className;
    });
    return this.elArr;
  }

  removeClass (name) {
    if (name) {
      this.elArr.forEach(el => {
        let className = el.className.replace(` ${name}`, "");
        el.className = className;
      });
    } else {
      this.elArr.forEach(el => {
        el.className = "";
      });
    }
    return this.elArr;
  }

  children() {
    let childrenArr = [];
    this.elArr.forEach(el => {
      childrenArr = childrenArr.concat(Array.from(el.children));
    });
    return new DOMNodeCollection(childrenArr);
  }
  parent() {
    let parentArr = [];
    this.elArr.forEach(el => {
      parentArr.push(el.parentNode);
    });
    return new DOMNodeCollection(parentArr);
  }

  find(selector) {
    const foundEl = document.querySelectorAll(selector);
    return new DOMNodeCollection(Array.from(foundEl));
  }

  remove (selector) {
    if (selector) {
      let foundEl = this.find(selector);
      foundEl.empty();
      foundEl.elArr = [];
    } else {
      this.empty();
      this.elArr = [];
    }
    return this.elArr;
  }
}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);