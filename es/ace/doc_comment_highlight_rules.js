"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DocCommentHighlightRules = void 0;

var oop = require("./oop");

var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var DocCommentHighlightRules = function DocCommentHighlightRules() {
  this.$rules = {
    "start": [{
      token: "comment.doc.tag",
      regex: "@[\\w\\d_]+"
    }, DocCommentHighlightRules.getTagRule(), {
      defaultToken: "comment.doc",
      caseInsensitive: true
    }]
  };
};

exports.DocCommentHighlightRules = DocCommentHighlightRules;
oop.inherits(DocCommentHighlightRules, TextHighlightRules);

DocCommentHighlightRules.getTagRule = function (start) {
  return {
    token: "comment.doc.tag.storage.type",
    regex: "\\b(?:TODO|FIXME|XXX|HACK)\\b"
  };
};

DocCommentHighlightRules.getStartRule = function (start) {
  return {
    token: "comment.doc",
    regex: "\\/\\*(?=\\*)",
    next: start
  };
};

DocCommentHighlightRules.getEndRule = function (start) {
  return {
    token: "comment.doc",
    regex: "\\*\\/",
    next: start
  };
};