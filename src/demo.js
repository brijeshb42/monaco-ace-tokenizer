import * as monaco from 'monaco-editor';
import { registerAllAvailableLanguages } from './lazy';

const editorNode = document.getElementById('editor');
const langNode = document.getElementById('lang');

registerAllAvailableLanguages();

class LanguageSelectorWidget {
  constructor(editor) {
    this.dom = document.createElement('select');

    monaco.languages.getLanguages().forEach((lang) => {
      const opt = document.createElement('option');
      opt.value = lang.id;
      opt.text = lang.id;

      if (lang.id === 'clojure') {
        opt.selected = true;
      }

      this.dom.appendChild(opt);
    });

    this.dom.addEventListener('change', function(ev) {
      monaco.editor.setModelLanguage(editor.getModel(), ev.target.value);
    });
  }

  getId() {
    return 'language.selector';
  }

  getDomNode() {
    return this.dom;
  }

  getPosition() {
    return {
      preference: monaco.editor.OverlayWidgetPositionPreference.TOP_RIGHT_CORNER,
    };
  }
}

const editor = monaco.editor.create(editorNode, {
  value: '',
  minimap: {
    enabled: false,
  },
  theme: 'vs',
  language: 'clojure',
  fontSize: 15,
  scrollBeyondLastLine: false,
});
const widget = new LanguageSelectorWidget(editor);
editor.addOverlayWidget(widget);

editor.focus();
window.editor = editor;
window.addEventListener('resize', () => editor.layout());

if (window.localStorage.getItem('value')) {
  editor.setValue(window.localStorage.getItem('value'));
}

setInterval(() => {
  window.localStorage.setItem('value', editor.getValue());
}, 2000)
