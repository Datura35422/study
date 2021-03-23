const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const webpack = require('webpack');

module.exports = {
  // entry: './src/index.js',
  entry: {
    app: './src/index.js',
    // print: './src/print.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    publicPath: './',
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port : 9000,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management'
    }),
    new CleanWebpackPlugin(),
    // new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    // filename: 'bundle.js',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
      rules: [
          {
              test: /\.css$/,
              use: [
                  'style-loader',
                  'css-loader'
              ]
          },
          {
              test: /\.(png|svg|jpg|gif)$/,
              use: [
                  'file-loader'
              ]
          },
          {
              test: /\.xml$/,
              use: [
                  'xml-loader'
              ]
          }
      ]
  }
};