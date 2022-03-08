"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var MonacoAceTokenizer = require('monaco-ace-tokenizer');

var oop = MonacoAceTokenizer.oop;
var TextHighlightRules = MonacoAceTokenizer.TextHighlightRules;

var AdaHighlightRules = function AdaHighlightRules() {
  var keywords = "abort|else|new|return|abs|elsif|not|reverse|abstract|end|null|accept|entry|select|" + "access|exception|of|separate|aliased|exit|or|some|all|others|subtype|and|for|out|synchronized|" + "array|function|overriding|at|tagged|generic|package|task|begin|goto|pragma|terminate|" + "body|private|then|if|procedure|type|case|in|protected|constant|interface|until|" + "|is|raise|use|declare|range|delay|limited|record|when|delta|loop|rem|while|digits|renames|with|do|mod|requeue|xor";
  var builtinConstants = "true|false|null";
  var builtinFunctions = "count|min|max|avg|sum|rank|now|coalesce|main";
  var keywordMapper = this.createKeywordMapper({
    "support.function": builtinFunctions,
    "keyword": keywords,
    "constant.language": builtinConstants
  }, "identifier", true);
  this.$rules = {
    "start": [{
      token: "comment",
      regex: "--.*$"
    }, {
      token: "string",
      regex: '".*?"'
    }, {
      token: "string",
      regex: "'.'"
    }, {
      token: "constant.numeric",
      regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
    }, {
      token: keywordMapper,
      regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
    }, {
      token: "keyword.operator",
      regex: "\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|="
    }, {
      token: "paren.lparen",
      regex: "[\\(]"
    }, {
      token: "paren.rparen",
      regex: "[\\)]"
    }, {
      token: "text",
      regex: "\\s+"
    }]
  };
};

oop.inherits(AdaHighlightRules, TextHighlightRules);
var _default = AdaHighlightRules;
exports["default"] = _default;