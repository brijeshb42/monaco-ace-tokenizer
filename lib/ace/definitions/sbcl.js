"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var MonacoAceTokenizer = require('monaco-ace-tokenizer');

var oop = MonacoAceTokenizer.oop;
var TextHighlightRules = MonacoAceTokenizer.TextHighlightRules;

var LispHighlightRules = function LispHighlightRules() {
  var keywordControl = "case|do|let|loop|if|else|when";
  var keywordOperator = "eq|neq|and|or";
  var constantLanguage = "null|nil";
  var supportFunctions = "cons|car|cdr|cond|lambda|format|setq|setf|quote|eval|append|list|listp|memberp|t|load|progn";
  var keywordMapper = this.createKeywordMapper({
    "keyword.control": keywordControl,
    "keyword.operator": keywordOperator,
    "constant.language": constantLanguage,
    "support.function": supportFunctions
  }, "identifier", true);
  this.$rules = {
    "start": [{
      token: "comment",
      regex: ";.*$"
    }, {
      token: ["storage.type.function-type.lisp", "text", "entity.name.function.lisp"],
      regex: "(?:\\b(?:(defun|defmethod|defmacro))\\b)(\\s+)((?:\\w|\\-|\\!|\\?)*)"
    }, {
      token: ["punctuation.definition.constant.character.lisp", "constant.character.lisp"],
      regex: "(#)((?:\\w|[\\\\+-=<>'\"&#])+)"
    }, {
      token: ["punctuation.definition.variable.lisp", "variable.other.global.lisp", "punctuation.definition.variable.lisp"],
      regex: "(\\*)(\\S*)(\\*)"
    }, {
      token: "constant.numeric",
      regex: "0[xX][0-9a-fA-F]+(?:L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"
    }, {
      token: "constant.numeric",
      regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?(?:L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"
    }, {
      token: keywordMapper,
      regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
    }, {
      token: "string",
      regex: '"(?=.)',
      next: "qqstring"
    }],
    "qqstring": [{
      token: "constant.character.escape.lisp",
      regex: "\\\\."
    }, {
      token: "string",
      regex: '[^"\\\\]+'
    }, {
      token: "string",
      regex: "\\\\$",
      next: "qqstring"
    }, {
      token: "string",
      regex: '"|$',
      next: "start"
    }]
  };
};

oop.inherits(LispHighlightRules, TextHighlightRules);
var _default = LispHighlightRules;
exports["default"] = _default;