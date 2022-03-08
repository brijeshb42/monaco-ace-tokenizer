"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var MonacoAceTokenizer = require('monaco-ace-tokenizer');

var oop = MonacoAceTokenizer.oop;
var TextHighlightRules = MonacoAceTokenizer.TextHighlightRules;
var DocCommentHighlightRules = MonacoAceTokenizer.DocCommentHighlightRules;

var ScalaHighlightRules = function ScalaHighlightRules() {
  var keywords = "case|default|do|else|for|if|match|while|throw|return|try|trye|catch|finally|yield|" + "abstract|class|def|extends|final|forSome|implicit|implicits|import|lazy|new|object|null|" + "override|package|private|protected|sealed|super|this|trait|type|val|var|with|" + "assert|assume|require|print|println|printf|readLine|readBoolean|readByte|readShort|" + "readChar|readInt|readLong|readFloat|readDouble";
  var buildinConstants = "true|false";
  var langClasses = "AbstractMethodError|AssertionError|ClassCircularityError|" + "ClassFormatError|Deprecated|EnumConstantNotPresentException|" + "ExceptionInInitializerError|IllegalAccessError|" + "IllegalThreadStateException|InstantiationError|InternalError|" + "NegativeArraySizeException|NoSuchFieldError|Override|Process|" + "ProcessBuilder|SecurityManager|StringIndexOutOfBoundsException|" + "SuppressWarnings|TypeNotPresentException|UnknownError|" + "UnsatisfiedLinkError|UnsupportedClassVersionError|VerifyError|" + "InstantiationException|IndexOutOfBoundsException|" + "ArrayIndexOutOfBoundsException|CloneNotSupportedException|" + "NoSuchFieldException|IllegalArgumentException|NumberFormatException|" + "SecurityException|Void|InheritableThreadLocal|IllegalStateException|" + "InterruptedException|NoSuchMethodException|IllegalAccessException|" + "UnsupportedOperationException|Enum|StrictMath|Package|Compiler|" + "Readable|Runtime|StringBuilder|Math|IncompatibleClassChangeError|" + "NoSuchMethodError|ThreadLocal|RuntimePermission|ArithmeticException|" + "NullPointerException|Long|Integer|Short|Byte|Double|Number|Float|" + "Character|Boolean|StackTraceElement|Appendable|StringBuffer|" + "Iterable|ThreadGroup|Runnable|Thread|IllegalMonitorStateException|" + "StackOverflowError|OutOfMemoryError|VirtualMachineError|" + "ArrayStoreException|ClassCastException|LinkageError|" + "NoClassDefFoundError|ClassNotFoundException|RuntimeException|" + "Exception|ThreadDeath|Error|Throwable|System|ClassLoader|" + "Cloneable|Class|CharSequence|Comparable|String|Object|" + "Unit|Any|AnyVal|AnyRef|Null|ScalaObject|Singleton|Seq|Iterable|List|" + "Option|Array|Char|Byte|Int|Long|Nothing|" + "App|Application|BufferedIterator|BigDecimal|BigInt|Console|Either|" + "Enumeration|Equiv|Fractional|Function|IndexedSeq|Integral|Iterator|" + "Map|Numeric|Nil|NotNull|Ordered|Ordering|PartialFunction|PartialOrdering|" + "Product|Proxy|Range|Responder|Seq|Serializable|Set|Specializable|Stream|" + "StringContext|Symbol|Traversable|TraversableOnce|Tuple|Vector|Pair|Triple";
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
      next: "tstring"
    }, {
      token: "string",
      regex: '"(?=.)',
      next: "string"
    }, {
      token: "symbol.constant",
      regex: "'[\\w\\d_]+"
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
      regex: "!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|instanceof|new|delete|typeof|void)"
    }, {
      token: "paren.lparen",
      regex: "[[({]"
    }, {
      token: "paren.rparen",
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
    "string": [{
      token: "escape",
      regex: '\\\\"'
    }, {
      token: "string",
      regex: '"',
      next: "start"
    }, {
      token: "string.invalid",
      regex: '[^"\\\\]*$',
      next: "start"
    }, {
      token: "string",
      regex: '[^"\\\\]+'
    }],
    "tstring": [{
      token: "string",
      regex: '"{3,5}',
      next: "start"
    }, {
      defaultToken: "string"
    }]
  };
  this.embedRules(DocCommentHighlightRules, "doc-", [DocCommentHighlightRules.getEndRule("start")]);
};

oop.inherits(ScalaHighlightRules, TextHighlightRules);
var _default = ScalaHighlightRules;
exports["default"] = _default;