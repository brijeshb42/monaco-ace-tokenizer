"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var MonacoAceTokenizer = require('monaco-ace-tokenizer');

var oop = MonacoAceTokenizer.oop;
var TextHighlightRules = MonacoAceTokenizer.TextHighlightRules;
var DocCommentHighlightRules = MonacoAceTokenizer.DocCommentHighlightRules;

var GroovyHighlightRules = function GroovyHighlightRules() {
  var keywords = "assert|with|abstract|continue|for|new|switch|" + "assert|default|goto|package|synchronized|" + "boolean|do|if|private|this|" + "break|double|implements|protected|throw|" + "byte|else|import|public|throws|" + "case|enum|instanceof|return|transient|" + "catch|extends|int|short|try|" + "char|final|interface|static|void|" + "class|finally|long|strictfp|volatile|" + "def|float|native|super|while";
  var buildinConstants = "null|Infinity|NaN|undefined";
  var langClasses = "AbstractMethodError|AssertionError|ClassCircularityError|" + "ClassFormatError|Deprecated|EnumConstantNotPresentException|" + "ExceptionInInitializerError|IllegalAccessError|" + "IllegalThreadStateException|InstantiationError|InternalError|" + "NegativeArraySizeException|NoSuchFieldError|Override|Process|" + "ProcessBuilder|SecurityManager|StringIndexOutOfBoundsException|" + "SuppressWarnings|TypeNotPresentException|UnknownError|" + "UnsatisfiedLinkError|UnsupportedClassVersionError|VerifyError|" + "InstantiationException|IndexOutOfBoundsException|" + "ArrayIndexOutOfBoundsException|CloneNotSupportedException|" + "NoSuchFieldException|IllegalArgumentException|NumberFormatException|" + "SecurityException|Void|InheritableThreadLocal|IllegalStateException|" + "InterruptedException|NoSuchMethodException|IllegalAccessException|" + "UnsupportedOperationException|Enum|StrictMath|Package|Compiler|" + "Readable|Runtime|StringBuilder|Math|IncompatibleClassChangeError|" + "NoSuchMethodError|ThreadLocal|RuntimePermission|ArithmeticException|" + "NullPointerException|Long|Integer|Short|Byte|Double|Number|Float|" + "Character|Boolean|StackTraceElement|Appendable|StringBuffer|" + "Iterable|ThreadGroup|Runnable|Thread|IllegalMonitorStateException|" + "StackOverflowError|OutOfMemoryError|VirtualMachineError|" + "ArrayStoreException|ClassCastException|LinkageError|" + "NoClassDefFoundError|ClassNotFoundException|RuntimeException|" + "Exception|ThreadDeath|Error|Throwable|System|ClassLoader|" + "Cloneable|Class|CharSequence|Comparable|String|Object";
  var keywordMapper = this.createKeywordMapper({
    "variable.language": "this",
    "keyword": keywords,
    "support.function": langClasses,
    "constant.language": buildinConstants
  }, "identifier");
  this.$rules = {
    "start": [{
      token: "comment",
      regex: "\\/\\/.*$"
    }, DocCommentHighlightRules.getStartRule("doc-start"), {
      token: "comment",
      regex: "\\/\\*",
      next: "comment"
    }, {
      token: "string.regexp",
      regex: "[/](?:(?:\\[(?:\\\\]|[^\\]])+\\])|(?:\\\\/|[^\\]/]))*[/]\\w*\\s*(?=[).,;]|$)"
    }, {
      token: "string",
      regex: '"""',
      next: "qqstring"
    }, {
      token: "string",
      regex: "'''",
      next: "qstring"
    }, {
      token: "string",
      regex: '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'
    }, {
      token: "string",
      regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
    }, {
      token: "constant.numeric",
      regex: "0[xX][0-9a-fA-F]+\\b"
    }, {
      token: "constant.numeric",
      regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
    }, {
      token: "constant.language.boolean",
      regex: "(?:true|false)\\b"
    }, {
      token: keywordMapper,
      regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
    }, {
      token: "keyword.operator",
      regex: "\\?:|\\?\\.|\\*\\.|<=>|=~|==~|\\.@|\\*\\.@|\\.&|as|in|is|!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|instanceof|new|delete|typeof|void)"
    }, {
      token: "lparen",
      regex: "[[({]"
    }, {
      token: "rparen",
      regex: "[\\])}]"
    }, {
      token: "text",
      regex: "\\s+"
    }],
    "comment": [{
      token: "comment",
      regex: "\\*\\/",
      next: "start"
    }, {
      defaultToken: "comment"
    }],
    "qqstring": [{
      token: "constant.language.escape",
      regex: /\\(?:u[0-9A-Fa-f]{4}|.|$)/
    }, {
      token: "constant.language.escape",
      regex: /\$[\w\d]+/
    }, {
      token: "constant.language.escape",
      regex: /\$\{[^"\}]+\}?/
    }, {
      token: "string",
      regex: '"{3,5}',
      next: "start"
    }, {
      token: "string",
      regex: '.+?'
    }],
    "qstring": [{
      token: "constant.language.escape",
      regex: /\\(?:u[0-9A-Fa-f]{4}|.|$)/
    }, {
      token: "string",
      regex: "'{3,5}",
      next: "start"
    }, {
      token: "string",
      regex: ".+?"
    }]
  };
  this.embedRules(DocCommentHighlightRules, "doc-", [DocCommentHighlightRules.getEndRule("start")]);
};

oop.inherits(GroovyHighlightRules, TextHighlightRules);
var _default = GroovyHighlightRules;
exports["default"] = _default;