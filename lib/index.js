"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Tokenizer", {
  enumerable: true,
  get: function get() {
    return _tmTokenizer["default"];
  }
});
Object.defineProperty(exports, "TextHighlightRules", {
  enumerable: true,
  get: function get() {
    return _text_highlight_rules.TextHighlightRules;
  }
});
Object.defineProperty(exports, "DocCommentHighlightRules", {
  enumerable: true,
  get: function get() {
    return _doc_comment_highlight_rules.DocCommentHighlightRules;
  }
});
Object.defineProperty(exports, "AVAILABLE_LANGUAGES", {
  enumerable: true,
  get: function get() {
    return _languages.AVAILABLE_LANGUAGES;
  }
});
Object.defineProperty(exports, "registerRulesForLanguage", {
  enumerable: true,
  get: function get() {
    return _languages.registerRulesForLanguage;
  }
});
exports.oop = void 0;

var _tmTokenizer = _interopRequireDefault(require("./ace/tmTokenizer"));

var _text_highlight_rules = require("./ace/text_highlight_rules");

var _doc_comment_highlight_rules = require("./ace/doc_comment_highlight_rules");

var _languages = require("./languages");

var oop = _interopRequireWildcard(require("./ace/oop"));

exports.oop = oop;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }