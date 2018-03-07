const path = require('path');
const webpack = require('webpack');
const BabelMinifyPlugin = require('babel-minify-webpack-plugin');
const packageJson = require('./package.json');

const PRODUCTION = (process.env.NODE_ENV === 'production');

module.exports = {
  entry: path.resolve(__dirname, packageJson.source),
  output: {
    path: __dirname,
    filename: packageJson.main,
    library: 'createPropTypes',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'awesome-typescript-loader']
      }
    ]
  },
  plugins: [
    PRODUCTION && new BabelMinifyPlugin({
      removeConsole: true,
      mangle: {
        topLevel: true
      }
    })
  ].filter(Boolean),
  resolve: {
    extensions: ['.ts', '.js']
  }
};
