const path = require('path');
const { merge } = require('webpack-merge');
const baseWebpackConf = require('../webpack.base.config.js');

const projectConfigs = {
  context: path.resolve(__dirname),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
}

module.exports = merge(baseWebpackConf, projectConfigs)