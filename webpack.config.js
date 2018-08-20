const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const package = require('./package.json');

const banner = [
  `${package.name}`,
  `Version - ${package.version}`,
  `Author - ${package.author}`,
].join('\n');

function getOutput(isProd = false) {
  const data = {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  };

  if (!isProd) {
    return data;
  }

  data.libraryTarget = 'umd';
  data.library = 'MonacoAceTokenizer';
  data.globalObject = 'self';
  return data;
}

module.exports = (_env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    target: 'web',
    entry: {
      'monaco-tokenizer': isProd ? './src/index.js' : './src/demo.js',
    },
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
        test: /\.css$/,
        // exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
        ],
      }],
    },
    plugins: isProd ? [
      new webpack.BannerPlugin(fs.readFileSync('./LICENSE.ace.txt', 'utf-8')),
      new webpack.BannerPlugin(banner),
    ] : [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, './index.html'),
      }),
      new MonacoWebpackPlugin(),
    ],
    externals: isProd ? {
      'monaco-editor': {
        root: 'monaco',
        commonjs: 'monaco-editor',
        commonjs2: 'monaco-editor',
        amd: 'monaco-editor',
      }
    } : {},
  }
};
