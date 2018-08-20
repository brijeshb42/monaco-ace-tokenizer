import * as monaco from 'monaco-editor';
import { registerAllAvailableLanguages } from './lazy';

const editorNode = document.getElementById('editor');
const langNode = document.getElementById('lang');

registerAllAvailableLanguages();

const editor = monaco.editor.create(editorNode, {
  value: '',
  minimap: {
    enabled: false,
  },
  theme: 'vs',
  language: 'typescript',
  fontSize: 15,
  scrollBeyondLastLine: false,
});

monaco.languages.getLanguages().forEach((lang) => {
  const opt = document.createElement('option');
  opt.value = lang.id;
  opt.text = lang.id;

  if (lang.id === 'typescript') {
    opt.selected = true;
  }

  langNode.appendChild(opt);
});

langNode.addEventListener('change', function(ev) {
  monaco.editor.setModelLanguage(editor.model, ev.target.value);
});

editor.focus();
window.editor = editor;

if (window.localStorage.getItem('value')) {
  editor.setValue(window.localStorage.getItem('value'));
}

setInterval(() => {
  window.localStorage.setItem('value', editor.getValue());
}, 2000)
