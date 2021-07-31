// https://webpack.docschina.org/guides/author-libraries/#root
const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'testlibrary.js',
    library: {
      name: 'testlibrary', // 使用 <script src="./library.js"></script>的方式导入，library会作为全局变量
      type: 'umd' // 挂载位置 umd - 通用模块方式使用 | this -- 挂载到this上 | window == 挂载到window上 | global -- node.global
    },
  },
  externals: {
    // 打包时，忽略lodash
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_',
    },
  },
}