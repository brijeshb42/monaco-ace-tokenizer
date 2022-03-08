"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerRulesForLanguage = registerRulesForLanguage;
exports.AVAILABLE_LANGUAGES = exports.State = void 0;

var monaco = _interopRequireWildcard(require("monaco-editor"));

var _tmTokenizer = _interopRequireDefault(require("./ace/tmTokenizer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var State = function () {
  function State(state) {
    _classCallCheck(this, State);

    this.state = state;
  }

  _createClass(State, [{
    key: "equals",
    value: function equals(other) {
      return other === this || other.state === this.state;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new State(this.state);
    }
  }]);

  return State;
}();

exports.State = State;
var AVAILABLE_LANGUAGES = ["ada", "cobol", "d", "dart", "elixir", "erlang", "fortran", "groovy", "haskell", "julia", "ocaml", "octave", "racket", "sbcl", "scala"];
exports.AVAILABLE_LANGUAGES = AVAILABLE_LANGUAGES;

function registerRulesForLanguage(languageId, highlightRules) {
  var tokenizer = new _tmTokenizer["default"](highlightRules.getRules());
  return monaco.languages.setTokensProvider(languageId, {
    getInitialState: function getInitialState() {
      return new State('');
    },
    tokenize: function tokenize(line, startState) {
      var _tokenizer$getLineTok = tokenizer.getLineTokens(line, startState.state),
          tokens = _tokenizer$getLineTok.tokens,
          state = _tokenizer$getLineTok.state;

      var offset = 0;
      var monacoTokens = tokens.map(function (token) {
        var tok = {
          startIndex: offset,
          scopes: token.type
        };
        offset += token.value.length;
        return tok;
      });
      return {
        endState: new State(state),
        tokens: monacoTokens
      };
    }
  });
}