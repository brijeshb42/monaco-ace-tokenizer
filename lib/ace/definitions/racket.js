"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var MonacoAceTokenizer = require('monaco-ace-tokenizer');

var oop = MonacoAceTokenizer.oop;
var TextHighlightRules = MonacoAceTokenizer.TextHighlightRules;

var RacketHighlightRules = function RacketHighlightRules() {
  this.$rules = {
    start: [{
      token: ["text", "string.quoted.double.source.racket"],
      regex: /([^\\])(\"[^\"]*\")/
    }, {
      token: ["meta.variable.source.racket", "keyword.source.racket", "meta.variable.source.racket", "entity.name.variable.source.racket", "meta.variable.source.racket"],
      regex: /(\()(define)(\s+)([a-zA-Z0-9_\-?\+^]+)(\s*)/
    }, {
      token: ["meta.function.source.racket", "keyword.source.racket", "meta.function.source.racket", "entity.name.function", "meta.function.source.racket"],
      regex: /(\()(define)(\s+\()([a-zA-Z0-9_\-?\+^]+)(\s*)/
    }, {
      token: ["meta.struct.source.racket", "keyword.source.racket", "meta.struct.source.racket", "entity.name.type", "meta.struct.source.racket"],
      regex: /(\()(struct)(\s+)([a-zA-Z0-9_\-?\+^]+)(\s+)/
    }, {
      token: ["meta.keywords.source.racket", "keyword.source.racket", "meta.keywords.source.racket"],
      regex: /([\s\(])(if|lambda|cond|define|type-case|let|letrec|let!|\#lang|require|test|else|first|rest|define-type|define-type-alias|define-struct|not|local|error|lang)([\s\)])/
    }, {
      token: ["text", "constant.language.source.racket", "text"],
      regex: /([\s\(])(true|false|empty|null)([\s\)])/
    }, {
      token: ["text", "constant.language.source.racket", "text"],
      regex: /([\s\(])(#t|#f)([\s\)])/
    }, {
      token: "constant.language.source.racket",
      regex: /#\\[a-zA-Z0-9_\-?\+\.\!\"]+/
    }, {
      token: "constant.numeric.integer.source.racket",
      regex: /\b(?:0|[1-9][0-9_]*)\b/
    }, {
      token: "comment.line.documentation.source.racket",
      regex: /;/,
      push: [{
        token: "comment.line.documentation.source.racket",
        regex: /$/,
        next: "pop"
      }, {
        defaultToken: "comment.line.documentation.source.racket"
      }]
    }, {
      token: "comment.block.source.racket",
      regex: /#\|/,
      push: [{
        token: "comment.block.source.racket",
        regex: /\|#/,
        next: "pop"
      }, {
        defaultToken: "comment.block.source.racket"
      }]
    }]
  };
  this.normalizeRules();
};

RacketHighlightRules.metaData = {
  fileTypes: ["rkt"],
  name: "Racket",
  scopeName: "source.racket"
};
oop.inherits(RacketHighlightRules, TextHighlightRules);
var _default = RacketHighlightRules;
exports["default"] = _default;