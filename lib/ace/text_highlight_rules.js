"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextHighlightRules = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function deepCopy(obj) {
  if (_typeof(obj) !== "object" || !obj) return obj;
  var copy;

  if (Array.isArray(obj)) {
    copy = [];

    for (var key = 0; key < obj.length; key++) {
      copy[key] = deepCopy(obj[key]);
    }

    return copy;
  }

  if (Object.prototype.toString.call(obj) !== "[object Object]") return obj;
  copy = {};

  for (var key in obj) {
    copy[key] = deepCopy(obj[key]);
  }

  return copy;
}

var TextHighlightRules = function TextHighlightRules() {
  this.$rules = {
    "start": [{
      token: "empty_line",
      regex: '^$'
    }, {
      defaultToken: "text"
    }]
  };
};

exports.TextHighlightRules = TextHighlightRules;
(function () {
  this.addRules = function (rules, prefix) {
    if (!prefix) {
      for (var key in rules) {
        this.$rules[key] = rules[key];
      }

      return;
    }

    for (var key in rules) {
      var state = rules[key];

      for (var i = 0; i < state.length; i++) {
        var rule = state[i];

        if (rule.next || rule.onMatch) {
          if (typeof rule.next == "string") {
            if (rule.next.indexOf(prefix) !== 0) rule.next = prefix + rule.next;
          }

          if (rule.nextState && rule.nextState.indexOf(prefix) !== 0) rule.nextState = prefix + rule.nextState;
        }
      }

      this.$rules[prefix + key] = state;
    }
  };

  this.getRules = function () {
    return this.$rules;
  };

  this.embedRules = function (HighlightRules, prefix, escapeRules, states, append) {
    var embedRules = typeof HighlightRules == "function" ? new HighlightRules().getRules() : HighlightRules;

    if (states) {
      for (var i = 0; i < states.length; i++) {
        states[i] = prefix + states[i];
      }
    } else {
      states = [];

      for (var key in embedRules) {
        states.push(prefix + key);
      }
    }

    this.addRules(embedRules, prefix);

    if (escapeRules) {
      var addRules = Array.prototype[append ? "push" : "unshift"];

      for (var i = 0; i < states.length; i++) {
        addRules.apply(this.$rules[states[i]], deepCopy(escapeRules));
      }
    }

    if (!this.$embeds) this.$embeds = [];
    this.$embeds.push(prefix);
  };

  this.getEmbeds = function () {
    return this.$embeds;
  };

  var pushState = function pushState(currentState, stack) {
    if (currentState != "start" || stack.length) stack.unshift(this.nextState, currentState);
    return this.nextState;
  };

  var popState = function popState(currentState, stack) {
    stack.shift();
    return stack.shift() || "start";
  };

  this.normalizeRules = function () {
    var id = 0;
    var rules = this.$rules;

    function processState(key) {
      var state = rules[key];
      state.processed = true;

      for (var i = 0; i < state.length; i++) {
        var rule = state[i];
        var toInsert = null;

        if (Array.isArray(rule)) {
          toInsert = rule;
          rule = {};
        }

        if (!rule.regex && rule.start) {
          rule.regex = rule.start;
          if (!rule.next) rule.next = [];
          rule.next.push({
            defaultToken: rule.token
          }, {
            token: rule.token + ".end",
            regex: rule.end || rule.start,
            next: "pop"
          });
          rule.token = rule.token + ".start";
          rule.push = true;
        }

        var next = rule.next || rule.push;

        if (next && Array.isArray(next)) {
          var stateName = rule.stateName;

          if (!stateName) {
            stateName = rule.token;
            if (typeof stateName != "string") stateName = stateName[0] || "";
            if (rules[stateName]) stateName += id++;
          }

          rules[stateName] = next;
          rule.next = stateName;
          processState(stateName);
        } else if (next == "pop") {
          rule.next = popState;
        }

        if (rule.push) {
          rule.nextState = rule.next || rule.push;
          rule.next = pushState;
          delete rule.push;
        }

        if (rule.rules) {
          for (var r in rule.rules) {
            if (rules[r]) {
              if (rules[r].push) rules[r].push.apply(rules[r], rule.rules[r]);
            } else {
              rules[r] = rule.rules[r];
            }
          }
        }

        var includeName = typeof rule == "string" ? rule : rule.include;

        if (includeName) {
          if (Array.isArray(includeName)) toInsert = includeName.map(function (x) {
            return rules[x];
          });else toInsert = rules[includeName];
        }

        if (toInsert) {
          var args = [i, 1].concat(toInsert);
          if (rule.noEscape) args = args.filter(function (x) {
            return !x.next;
          });
          state.splice.apply(state, args);
          i--;
        }

        if (rule.keywordMap) {
          rule.token = this.createKeywordMapper(rule.keywordMap, rule.defaultToken || "text", rule.caseInsensitive);
          delete rule.defaultToken;
        }
      }
    }

    Object.keys(rules).forEach(processState, this);
  };

  this.createKeywordMapper = function (map, defaultToken, ignoreCase, splitChar) {
    var keywords = Object.create(null);
    Object.keys(map).forEach(function (className) {
      var a = map[className];
      if (ignoreCase) a = a.toLowerCase();
      var list = a.split(splitChar || "|");

      for (var i = list.length; i--;) {
        keywords[list[i]] = className;
      }
    });

    if (Object.getPrototypeOf(keywords)) {
      keywords.__proto__ = null;
    }

    this.$keywordList = Object.keys(keywords);
    map = null;
    return ignoreCase ? function (value) {
      return keywords[value.toLowerCase()] || defaultToken;
    } : function (value) {
      return keywords[value] || defaultToken;
    };
  };

  this.getKeywords = function () {
    return this.$keywords;
  };
}).call(TextHighlightRules.prototype);