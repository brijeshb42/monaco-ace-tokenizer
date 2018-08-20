import * as monaco from 'monaco-editor';
import { AVAILABLE_LANGUAGES, registerRulesForLanguage } from './languages';

const languagePromises = {};

export function loadLanguage(languageId) {
  if (languagePromises[languageId]) {
    return languagePromises[languageId];
  }

  return import(`./ace/definitions/${languageId}`)
    .then(({ default: HighlightRules }) => {
      const rules = new HighlightRules();
      return registerRulesForLanguage(languageId, rules);

      // if (languageId === 'kotlin') {
      //   const javadefinition = monacoLanguages.getLanguages().find(lang => lang.id === 'java');
      //   if (javadefinition) {
      //     javadefinition.loader().then(({ conf }) => {
      //       monacoLanguages.setLanguageConfiguration(languageId, conf);
      //     });
      //   }
      // }
    });
}

export function registerLanguage(languageId) {
  monaco.languages.register({
    id: languageId,
  });

  monaco.languages.onLanguage(languageId, () => {
    loadLanguage(languageId);
  });
}

export function registerAllAvailableLanguages() {
  AVAILABLE_LANGUAGES.forEach(langId => registerLanguage(langId));
}
