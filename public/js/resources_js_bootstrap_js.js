(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_bootstrap_js"],{

/***/ "./resources/js/bootstrap.js":
/*!***********************************!*\
  !*** ./resources/js/bootstrap.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config_configs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config/configs */ "./resources/js/config/configs.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);


(axios__WEBPACK_IMPORTED_MODULE_1___default().defaults.headers.common["X-Requested-With"]) = "XMLHttpRequest";
(axios__WEBPACK_IMPORTED_MODULE_1___default().defaults.headers.common.potato) = "teste";
var token = localStorage.getItem(_config_configs__WEBPACK_IMPORTED_MODULE_0__.NAME_TOKEN);
var tokenType = "Bearer";
console.log("teste");
console.log(token);

if (token) {
  alert("das");
  (axios__WEBPACK_IMPORTED_MODULE_1___default().defaults.headers.common.Authorization) = "Bearer ".concat(token);
}

axios__WEBPACK_IMPORTED_MODULE_1___default().interceptors.request.use(function (config) {
  config.headers["Authorization"] = "".concat(tokenType, " ").concat(token);
  return config;
});

/***/ })

}]);