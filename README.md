## monaco-ace-tokenizer

[![npm version](https://badge.fury.io/js/monaco-ace-tokenizer.svg)](https://www.npmjs.com/package/monaco-ace-tokenizer)

An alternative tokenizer for monaco-editor using `ace`'s tokenization. See [demo](https://editor-a5ea1.firebaseapp.com). Try to select `kotlin` or `elixir` in the demo.

This library is relevant only till monarch definitions of all the remaining languages are added directly in `monaco-editor` itself. Untill then, it can be used if you do not want to use web assembly.

I have observed that syntax highlighting for a particular language is better
with ace's tokenizer when compared to it's monarch counterpart. This may not be
true for all the languages (I observed for clojure) though.

### Install

#### Webpack/browserify
```sh
npm install monaco-ace-tokenizer
```

```js
import * as monaco from 'monaco-editor';
import { registerRulesForLanguage } from 'monaco-ace-tokenizer';
import KotlinHighlightRules from 'monaco-ace-tokenizer/lib/ace/definitions/kotlin';

monaco.languages.register({
  id: 'kotlin',
});
registerRulesForLanguage('kotlin', new KotlinHighlightRules());
```

This repo already contains definitions for 18 languages not yet available directly in monaco. If you need highlighting for a language which is not available here, you can copy over files from original ace project to your own project and modify it such that it's `default` export is the rule `class`. Check out any of the definition files already available in [src/ace/defintions](https://github.com/brijeshb42/monaco-ace-tokenizer/tree/master/src/ace/definitions/). Most of the highlight rules require `TextHighlightRules`, `DocCommentHighlightRules` and `oop`. They are directly exported in this project so that you don't have to modify the copied file too much. Example -

- `somelang.js`

```js
import { TextHighlightRules, DocCommentHighlightRules, oop } from 'monaco-ace-tokenizer';

// Copied syntax file
var SomeLangHighlightRules = function() {
  // internal defintions you probably don't need to change
  // unless there is some extra dependency other that the 3 already imported.
}
oop.inherits(SomeLangHighlightRules, TextHighlightRules);

export default SomeLangHighlightRules;
// some lang files may also depend on DocCommentHighlightRules
```

This file can then be used as -

```js
import * as monaco from 'monaco-editor';
import { registerRulesForLanguage } from 'monaco-ace-tokenizer';
import SomeLangHighlightRules from './somelang'; // in your project directory

const langId = 'somelang';
monaco.languages.register({
  id: langId,
});
registerRulesForLanguage(langId, new SomeLangHighlightRules());
```

If some language definition file requires any other dependency, you can copy over that file too to your project and modify accordingly.

An array of all available languages in `monaco-ace-tokenizer` is also exported in case you need it.

```js
import { AVAILABLE_LANGUAGES } from 'monaco-ace-tokenizer';
```

See [src/lazy.js](https://github.com/brijeshb42/monaco-ace-tokenizer/tree/master/src/lazy.js) if you want to register languages but only load their definitions dynamically when they are used for the first time in your editor.

#### AMD

If you are using the official guide to integrate AMD version of monaco, this is how you can use `monaco-ace-tokenizer` -

```html
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta http-equiv="Content-Type" content="text/html;charset=utf-8" >
</head>
<body>
  <div id="container" style="width:800px;height:600px;border:1px solid grey"></div>

  <script src="https://unpkg.com/monaco-editor/min/vs/loader.js"></script>
  <script>
    require.config({
      paths: {
        'vs': 'https://unpkg.com/monaco-editor/min/vs',
        'tokenizer': 'https://unpkg.com/monaco-ace-tokenizer/dist',
      }
    });
    require(['vs/editor/editor.main', 'tokenizer/monaco-tokenizer', 'tokenizer/definitions/kotlin'], function(a, MonacoAceTokenizer, KotlinDefinition) {
      monaco.languages.register({
        id: 'kotlin'
      });
      MonacoAceTokenizer.registerRulesForLanguage('kotlin', new KotlinDefinition.default);
      var editor = monaco.editor.create(document.getElementById('container'), {
        value: '',
        language: 'kotlin'
      });
    });
    /* To load All languages */
    require(['vs/editor/editor.main', 'tokenizer/monaco-tokenizer'], function(_, MonacoAceTokenizer) {
      MonacoAceTokenizer.AVAILABLE_LANGUAGES.forEach(lang => {
        require(['tokenizer/definitions/' + lang], function(LangDefinition) {
          monaco.languages.register({
            id: lang,
          });
          MonacoAceTokenizer.registerRulesForLanguage(lang, new LangDefinition.default);
        });
      });
    });
  </script>
</body>
</html>
```
