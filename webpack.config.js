const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const pkg = require('./package.json');

const isLangMode = process.env.BUILD_MODE === 'lang';
const banner = [
  `${pkg.name}`,
  `Version - ${pkg.version}`,
  `Author - ${pkg.author}`,
].join('\n');

const definitionsPath = path.join(__dirname, 'src/ace/definitions');
const languages = fs.readdirSync(definitionsPath);

function getExternals(isProd = false) {
  if (!isProd) {
    return {};
  }

  if (!isLangMode) {
    return {
      'monaco-editor': {
        root: 'monaco',
        commonjs: 'monaco-editor',
        commonjs2: 'monaco-editor',
        amd: 'vs/editor/editor.main',
      },
      'monaco-editor/esm/vs/editor/editor.api': {
        root: 'monaco',
        commonjs: 'monaco-editor',
        commonjs2: 'monaco-editor',
        amd: 'vs/editor/editor.main',
      },
    }
  }

  return {
    'monaco-ace-tokenizer': {
      root: 'MonacoAceTokenizer',
      commonjs: 'monaco-ace-tokenizer',
      commonjs2: 'monaco-ace-tokenizer',
      amd: 'tokenizer/monaco-tokenizer',
    },
  };
}

function getOutput(isProd = false) {
  const data = {
    path: path.resolve(__dirname, 'dist'),
    filename: `${isLangMode ? 'definitions/' : ''}[name].js`,
  };

  if (!isProd) {
    return data;
  }

  data.libraryTarget = 'umd';

  if (isLangMode) {
    data.library = ['MonacoAceTokenizer', '[name]Definition'];
  } else {
    data.library = 'MonacoAceTokenizer';
  }

  data.globalObject = 'self';
  return data;
}

function getEntry(isProd = false) {
  const entry = {
    'monaco-tokenizer': './src/demo.js',
  };

  if (!isProd) {
    return entry;
  }

  if (isLangMode) {
    delete entry['monaco-tokenizer'];
    languages.forEach((lang) => {
      entry[lang.replace('.js', '')] = path.join(definitionsPath, lang);
    }); 
  } else {
    entry['monaco-tokenizer'] = './src/index.js';
  }

  return entry;
}

module.exports = (_env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    target: 'web',
    entry: getEntry(isProd),
    output: getOutput(isProd),
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            compact: false,
          },
        },
      }, {
        test: /\.ttf$/,
        use: 'file-loader',
      }, {
        test: /\.css$/,
        // exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
        ],
      }],
    },
    resolve: {
      alias: {
        'monaco-ace-tokenizer': path.resolve(__dirname, 'src'),
      },
    },
    plugins: isProd ? [
      new webpack.BannerPlugin(fs.readFileSync('./LICENSE.ace.txt', 'utf-8')),
      new webpack.BannerPlugin(banner),
    ] : [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, './index.html'),
      }),
      new MonacoWebpackPlugin({
        languages: ['clojure'],
        features: ['!multicursor'],
      }),
    ],
    externals: getExternals(isProd),
  }
};
