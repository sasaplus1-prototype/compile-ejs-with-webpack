'use strict';

const path = require('path');

const fromPairs = require('lodash.frompairs'),
      glob = require('glob');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const { config } = require('./package');

const {
  input,
  output,
} = config;

const files = glob.sync(`${path.resolve(input)}/**/!(_)*.+(ejs|htm|html)`),
      entry = fromPairs(
        files.map(filePath => [
          filePath.replace(path.resolve(input), '').replace(/\.(?:ejs|html?)$/, ''),
          filePath,
        ])
      );

module.exports = {

  entry,

  output: {
    path: path.resolve(output),
    filename: '[name].html',
  },

  module: {
    loaders: [
      {
        test: /\.(?:ejs|html?)$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('raw!ejs-html'),
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin('[name].html'),
  ],

};
