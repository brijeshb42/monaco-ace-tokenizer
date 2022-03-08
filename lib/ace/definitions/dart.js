"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var MonacoAceTokenizer = require('monaco-ace-tokenizer');

var oop = MonacoAceTokenizer.oop;
var TextHighlightRules = MonacoAceTokenizer.TextHighlightRules;
var DocCommentHighlightRules = MonacoAceTokenizer.DocCommentHighlightRules;

var DartHighlightRules = function DartHighlightRules() {
  var constantLanguage = "true|false|null";
  var variableLanguage = "this|super";
  var keywordControl = "try|catch|finally|throw|rethrow|assert|break|case|continue|default|do|else|for|if|in|return|switch|while|new|deferred|async|await";
  var keywordDeclaration = "abstract|class|extends|external|factory|implements|get|native|operator|set|typedef|with|enum";
  var storageModifier = "static|final|const";
  var storageType = "void|bool|num|int|double|dynamic|var|String";
  var keywordMapper = this.createKeywordMapper({
    "constant.language.dart": constantLanguage,
    "variable.language.dart": variableLanguage,
    "keyword.control.dart": keywordControl,
    "keyword.declaration.dart": keywordDeclaration,
    "storage.modifier.dart": storageModifier,
    "storage.type.primitive.dart": storageType
  }, "identifier");
  var stringfill = [{
    token: "constant.language.escape",
    regex: /\\./
  }, {
    token: "text",
    regex: /\$(?:\w+|{[^"'}]+})?/
  }, {
    defaultToken: "string"
  }];
  this.$rules = {
    "start": [{
      token: "comment",
      regex: /\/\/.*$/
    }, DocCommentHighlightRules.getStartRule("doc-start"), {
      token: "comment",
      regex: /\/\*/,
      next: "comment"
    }, {
      token: ["meta.preprocessor.script.dart"],
      regex: "^(#!.*)$"
    }, {
      token: "keyword.other.import.dart",
      regex: "(?:\\b)(?:library|import|export|part|of|show|hide)(?:\\b)"
    }, {
      token: ["keyword.other.import.dart", "text"],
      regex: "(?:\\b)(prefix)(\\s*:)"
    }, {
      regex: "\\bas\\b",
      token: "keyword.cast.dart"
    }, {
      regex: "\\?|:",
      token: "keyword.control.ternary.dart"
    }, {
      regex: "(?:\\b)(is\\!?)(?:\\b)",
      token: ["keyword.operator.dart"]
    }, {
      regex: "(<<|>>>?|~|\\^|\\||&)",
      token: ["keyword.operator.bitwise.dart"]
    }, {
      regex: "((?:&|\\^|\\||<<|>>>?)=)",
      token: ["keyword.operator.assignment.bitwise.dart"]
    }, {
      regex: "(===?|!==?|<=?|>=?)",
      token: ["keyword.operator.comparison.dart"]
    }, {
      regex: "((?:[+*/%-]|\\~)=)",
      token: ["keyword.operator.assignment.arithmetic.dart"]
    }, {
      regex: "=",
      token: "keyword.operator.assignment.dart"
    }, {
      token: "string",
      regex: "'''",
      next: "qdoc"
    }, {
      token: "string",
      regex: '"""',
      next: "qqdoc"
    }, {
      token: "string",
      regex: "'",
      next: "qstring"
    }, {
      token: "string",
      regex: '"',
      next: "qqstring"
    }, {
      regex: "(\\-\\-|\\+\\+)",
      token: ["keyword.operator.increment-decrement.dart"]
    }, {
      regex: "(\\-|\\+|\\*|\\/|\\~\\/|%)",
      token: ["keyword.operator.arithmetic.dart"]
    }, {
      regex: "(!|&&|\\|\\|)",
      token: ["keyword.operator.logical.dart"]
    }, {
      token: "constant.numeric",
      regex: "0[xX][0-9a-fA-F]+\\b"
    }, {
      token: "constant.numeric",
      regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
    }, {
      token: keywordMapper,
      regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
    }],
    "comment": [{
      token: "comment",
      regex: "\\*\\/",
      next: "start"
    }, {
      defaultToken: "comment"
    }],
    "qdoc": [{
      token: "string",
      regex: "'''",
      next: "start"
    }].concat(stringfill),
    "qqdoc": [{
      token: "string",
      regex: '"""',
      next: "start"
    }].concat(stringfill),
    "qstring": [{
      token: "string",
      regex: "'|$",
      next: "start"
    }].concat(stringfill),
    "qqstring": [{
      token: "string",
      regex: '"|$',
      next: "start"
    }].concat(stringfill)
  };
  this.embedRules(DocCommentHighlightRules, "doc-", [DocCommentHighlightRules.getEndRule("start")]);
};

oop.inherits(DartHighlightRules, TextHighlightRules);
var _default = DartHighlightRules;
exports["default"] = _default;