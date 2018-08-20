import * as monaco from 'monaco-editor';

import Tokenizer from "./ace/tmTokenizer";

export class State {
  constructor(state) {
    this.state = state;
  }

  equals(other) {
    return (other === this || other.state === this.state);
  }

  clone() {
    return new State(this.state);
  }
}

export const AVAILABLE_LANGUAGES = preval`
  const fs = require('fs');
  const path = require('path');
  const langPath = path.join(process.cwd(), 'src', 'ace', 'definitions');
  const langFiles = fs.readdirSync(langPath);
  module.exports = langFiles.map(lang => lang.split('.')[0]);
`;

export function registerRulesForLanguage(languageId, highlightRules) {
  const tokenizer = new Tokenizer(highlightRules.getRules());
  return monaco.languages.setTokensProvider(languageId, {
    getInitialState() {
      return new State('');
    },
    tokenize(line, startState) {
      const { tokens, state } = tokenizer.getLineTokens(line, startState.state);
      let offset = 0;

      const monacoTokens = tokens.map((token) => {
        const tok = {
          startIndex: offset,
          scopes: token.type,
        };

        offset += token.value.length;

        return tok;
      });

      return {
        endState: new State(state),
        tokens: monacoTokens,
      };
    }
  });
}
