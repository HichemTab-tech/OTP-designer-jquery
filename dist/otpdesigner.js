/*!
 * OTP-designer-jquery v2.2.0
 * (c) HichemTech
 * Released under the MIT License.
 * Github: github.com/HichemTab-tech/OTP-designer-jquery
 */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["OTP-designer-jquery"] = factory();
	else
		root["OTP-designer-jquery"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 426:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(81);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.otp-fake-input {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.otp-fake-input .otp-content {
    font-size: 20px;
    font-weight: 600;
    color: #111;
    padding-bottom: 1px;
}

.otp-fake-input.otpdesigner__focus__ {
    border: 2px solid #007bff;
}

.realInput{
    position: absolute!important;
    z-index: -2000!important;
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 645:
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ 81:
/***/ ((module) => {



module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ 379:
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 569:
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ 216:
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ 565:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ 795:
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ 589:
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  otpdesigner: () => (/* reexport */ otpdesigner)
});

// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(379);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(795);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(569);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(565);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(216);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(589);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./src/style.css
var style = __webpack_require__(426);
;// CONCATENATED MODULE: ./src/style.css

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());

      options.insert = insertBySelector_default().bind(null, "head");
    
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(style/* default */.Z, options);




       /* harmony default export */ const src_style = (style/* default */.Z && style/* default */.Z.locals ? style/* default */.Z.locals : undefined);

;// CONCATENATED MODULE: ./src/otpdesigner.js
const otpdesigner = function (options = {}, ...args) {

    const optInputId = "opt_input_";
    let results = [];

    // noinspection JSUnusedGlobalSymbols
    const methods = {
        code: function (results, data) {
            let code = $('#otp_hidden_' + data.idSuffix).val();
            if (isDefined(code)) code = code.trim();
            else code = "";
            results.push({
                done: code.length === data.settings.length,
                code: code
            });
            return results;
        },
        set: function (results, data, args) {
            let code = args[0];
            if (isDefined(code)) code = code.trim();
            else code = "";
            if (code.length === data.settings.length) {
                for (let i = 0; i < code.length; i++) {
                    $('#'+optInputId + (i) + "_" + data.idSuffix).trigger('otp-written', [code[i], false]);
                }
                if (typeof data.settings.onchange === 'function') {
                    data.settings.onchange(code);
                }
            }
            return results;
        },
        clear: function (results, data) {
            for (let i = data.settings.length - 1; i >= 0; i--) {
                $('#'+optInputId + (i) + "_" + data.idSuffix).trigger('otp-written', ["Backspace", false]);
            }
            if (typeof data.settings.onchange === 'function') {
                data.settings.onchange("");
            }
            return results;
        },
        focus: function (results, data) {
            $('#'+optInputId + (data.settings.length - 1) + "_" + data.idSuffix).otpdesigner__toggleFocus__(true);
            return results;
        },
        option: function (results, data, args) {
            if (typeof data.settings === 'undefined') {
                data.settings = {};
            }
            if (!isDefined(args) || args.length < 1 || args.length > 2) {
                console.error('Arguments number not valid');
            }
            else if (args.length === 1) {
                results.push(data.settings[args[0]]);
            }
            else if (args.length === 2) {
                data.settings[args[0]] = args[1];
                $('#'+optInputId + (data.settings.length - 1) + "_" + data.idSuffix).data('otpdesigner', data);
            }
            return results;
        },
        addClass: function (results, data, args) {
            let $inputs = $('#otp_' + data.idSuffix).find('.otp-fake-input');
            $inputs.addClass(args[0]??[]);
            return results;
        },
        removeClass: function (results, data, args) {
            let $inputs = $('#otp_' + data.idSuffix).find('.otp-fake-input');
            $inputs.addClass(args[0]??[]);
            return results;
        },
        hiddenInput: function (results, data) {
            results.push($('#otp_hidden_' + data.idSuffix));
            return results;
        }
    };

    $(this).each(function() {
        let data = $(this).data('otpdesigner');
        let idSuffix = Math.floor((Math.random() * 1000) + 100);
        if (!data) {
            let settings = $.extend(
                {
                    length: 6,
                    onlyNumbers: false,
                    inputsClasses: '',
                    inputsParentClasses: '',
                    enterClicked: null,
                    typingDone : null,
                    onchange: null
                },
                options
            );
            let $parent = $(this);
            if (isDefined($(this).attr('data-otp-length'))) {
                settings.length = parseInt($(this).attr('data-otp-length'));
            }
            if (isDefined($(this).attr('data-otp-onlynumbers'))) {
                settings.onlyNumbers = stringToBool($(this).attr('data-otp-onlynumbers'));
            }
            if (isDefined($(this).attr('data-inputs-classes'))) {
                settings.inputsClasses = $(this).attr('data-inputs-classes');
            }
            if (isDefined($(this).attr('data-inputs-parent-classes'))) {
                settings.inputsParentClasses = $(this).attr('data-inputs-parent-classes');
            }

            data = {
                idSuffix: idSuffix,
                settings: settings
            };
            //save the settings of the element
            $(this).data('otpdesigner', data);
            $(this).attr('data-otpdesigner-id', idSuffix);

            let $fakeInputsParent = $('<div class="fake-inputs d-flex flex-row justify-content-center mt-2">');
            $fakeInputsParent.attr('id', 'otp_' + idSuffix);
            if (settings.inputsParentClasses !== "") {
                $fakeInputsParent.addClass(settings.inputsParentClasses);
            }

            let $hiddenInput = $('<input type="hidden">');
            $hiddenInput.attr('id', 'otp_hidden_' + idSuffix);
            $hiddenInput.attr('name', 'otp_hidden_' + idSuffix);
            $hiddenInput.appendTo($parent);

            let $realInput = $('<textarea class="realInput" maxlength="2" tabindex="-1">-</textarea>');
            $realInput.attr('id', 'otp_real_' + idSuffix);
            $realInput.attr('name', 'otp_real_' + idSuffix);
            $realInput.appendTo($fakeInputsParent);
            $realInput.on('input', function () {
                let a = getRealInputValue(data);
                resetRealInput(data);
                getFocusedFakeInput(data).trigger('otp-written', [a]);
            });
            $realInput.on('keydown', function (e) {
                if (e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "Tab") {
                    e.preventDefault();
                    let focusedInp = getFocusedFakeInput(data);
                    let $inputs = $fakeInputsParent.find('.otp-fake-input');
                    let index = $inputs.index(focusedInp);
                    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                        if (index > 0) $($inputs[index - 1]).otpdesigner__toggleFocus__(true);
                    }
                    else {
                        if (index < $inputs.length - 1) $($inputs[index + 1]).otpdesigner__toggleFocus__(true);
                    }
                }
            });
            $realInput.on('paste', (event) => {
                let pastedText = event.originalEvent.clipboardData.getData('text');
                event.preventDefault();
                let pastedTextParts = pastedText.split('');
                pastedTextParts = pastedTextParts.filter(function (value) {
                    return isAcceptedCharacter(value, settings.onlyNumbers);
                });
                pastedText = pastedTextParts.join('');
                if (pastedText.length >= settings.length) {
                    pastedText = pastedText.substring(0, settings.length);
                    $('[data-otpdesigner-id="' + data.idSuffix + '"]').otpdesigner('set', pastedText);
                }
            });

            for (let i = 0; i < settings.length; i++) {
                let $fakeInput = $('<div class="m-2 text-center form-control rounded otp-fake-input"><span class="otp-content"></span></div>');
                $fakeInput.attr('id', optInputId + (i) + "_" + idSuffix);
                $fakeInput[0].addEventListener('click', function () {
                    if (!$(this).otpdesigner__isFocused__()) {
                        $(this).otpdesigner__toggleFocus__(true);
                    }
                    else{
                        toggleRealInputFocus(this, true);
                    }
                });

                let type = "text";
                if (settings.type === 'numeric') {
                    type = "number";
                }
                if (settings.inputsClasses !== "") {
                    $fakeInput.addClass(settings.inputsClasses);
                }
                $fakeInput.appendTo($fakeInputsParent);
            }
            $fakeInputsParent.appendTo($parent);
            let $inputs = $fakeInputsParent.find('.otp-fake-input');
            $inputs.each(function (i) {
                $($inputs[i]).off('otp-written');
                $($inputs[i]).on("otp-written", function (event, value, triggerChange = true) {
                    if (value === "Backspace") {
                        $($inputs[i]).otpdesigner__fakeInputVal__("");
                        if (i !== 0) $($inputs[i - 1]).otpdesigner__toggleFocus__(true);
                    } else if (value === "Enter" && i === $inputs.length - 1 && $($inputs[i]).otpdesigner__fakeInputVal__() !== "") {
                        collectOtpCode(data, false);
                        if (settings.enterClicked != null) {
                            settings.enterClicked();
                        }
                        loseFocus(data);
                        return;
                    } else {
                        if (isAcceptedCharacter(value, settings.onlyNumbers)) {
                            value = value.toLowerCase();
                            $($inputs[i]).otpdesigner__fakeInputVal__(value);
                            if (i !== $inputs.length - 1) $($inputs[i + 1]).otpdesigner__toggleFocus__(true);
                        }
                    }
                    collectOtpCode(data, (i === $inputs.length - 1));
                    if (triggerChange && typeof settings.onchange === 'function') {
                        let code = $('#otp_hidden_' + data.idSuffix).val();
                        if (isDefined(code)) code = code.trim();
                        else code = "";
                        settings.onchange(code);
                    }
                });
                $($inputs[i]).off("focused");
                $($inputs[i]).on("focused", function () {
                    if (!!$($inputs[i]).data('f')) return;
                    for (let j = 0; j < i; j++) {
                        if ($($inputs[j]).otpdesigner__fakeInputVal__() === "") {
                            $($inputs[j]).data('f', "1");
                            $($inputs[j]).otpdesigner__toggleFocus__(true);
                            $($inputs[j]).removeData('f');
                            break;
                        }
                    }
                });
            });
        }
        else{
            if (typeof options === 'string' && typeof methods[options] !== 'undefined') {
                results = methods[options](results, data, [...args]);
            }
        }
    });
    return results.length > 1 ? results : (results.length === 0 ? null : results[0]);
}

let isDefined = (variable, notEmpty = true) => {
    return typeof variable !== 'undefined' && variable !== null && (typeof variable !== 'string' || !notEmpty || variable !== "");
}

let stringToBool = function (s) {
    return ['true', 'TRUE', '1'].includes(s.toString());
}

let collectOtpCode = (data, typingDone = true) => {
    let $inputs = $('#otp_' + data.idSuffix).find('.otp-fake-input');
    let code = '';
    $inputs.each(function (i, e) {
        code += $(e).otpdesigner__fakeInputVal__().trim();
    });
    $('#otp_hidden_' + data.idSuffix).val(code);
    if (code.length === $inputs.length && typingDone) {
        if (data.settings.typingDone != null) {
            data.settings.typingDone(code);
        }
        loseFocus(data);
    }
}

let loseFocus = (data) => {
    if (data.settings.enterClicked != null) return;
    $('.otpdesigner__focus__').otpdesigner__toggleFocus__(false);
};

$(document)[0].addEventListener('click', function(event) {
    let $target = $(event.target);
    let focused = $('.otp-fake-input');
    if(
        !$target.closest('.otp-fake-input').length &&
        focused.length !== 0 &&
        focused.is(":visible")
    ) {
        focused.otpdesigner__toggleFocus__(false)
    }
});

function onFakeInputFocused(ele) {
    toggleRealInputFocus(ele, true);
    $(ele).trigger('focused');
}

$.fn.otpdesigner__toggleFocus__ = function (toFocus = null) {
    $(this).each(function () {
        if (toFocus !== null) {
            if (toFocus === true) {
                $('.otpdesigner__focus__').removeClass('otpdesigner__focus__');
                $(this).addClass('otpdesigner__focus__');
                onFakeInputFocused(this);
            }
            else {
                $(this).removeClass('otpdesigner__focus__');
            }
            return;
        }
        if ($(this).hasClass('otpdesigner__focus__')) {
            $(this).removeClass('otpdesigner__focus__');
        }
        else {
            $('.otpdesigner__focus__').removeClass('otpdesigner__focus__');
            $(this).addClass('otpdesigner__focus__');
            onFakeInputFocused(this);
        }
    });
}

function getFocusedFakeInput(data) {
    return $('#otp_' + data.idSuffix).find('.otp-fake-input.otpdesigner__focus__');
}

$.fn.otpdesigner__isFocused__ = function () {
    return $(this).hasClass('otpdesigner__focus__');
}

$.fn.otpdesigner__fakeInputVal__ = function (val = "RETURN_REQUESTED") {
    if (val === "RETURN_REQUESTED") {
        return $(this).find('.otp-content').html();
    }
    $(this).find('.otp-content').html(val);
}

function toggleRealInputFocus(fakeInput, toFocus) {
    // noinspection JSCheckFunctionSignatures
    let $realInput = $(fakeInput).parents('.fake-inputs').find('.realInput');
    if (toFocus) {
        $realInput.focus();
        $realInput[0].setSelectionRange($realInput.val().length, $realInput.val().length);
    }
    else {
        $realInput.blur();
    }
}

function resetRealInput(data) {
    let $realInput = $('#otp_' + data.idSuffix).find('.realInput');
    $realInput.val("-");
    $realInput[0].setSelectionRange($realInput.val().length, $realInput.val().length);
}

function getRealInputValue(data) {
    let $realInput = $('#otp_' + data.idSuffix).find('.realInput');
    if ($realInput.val() === "") return "Backspace";
    else if ($realInput.val() === "-\n") return "Enter";
    return $realInput.val().substring(1);
}

const isAcceptedCharacter = (char, onlyNumbers) => {
    return (otpdesigner__alphabets__.includes(char) && !onlyNumbers) || otpdesigner__numbers__.includes(char);
};

const otpdesigner__alphabets__ = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("");
const otpdesigner__numbers__ = '0123456789'.split("");
;// CONCATENATED MODULE: ./index.js



(function ($) {
    $.fn.otpdesigner = otpdesigner;
})(jQuery);


})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});