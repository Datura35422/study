const path = require('path')

module.export = {
  mode: 'production',
  entry: './src/index.js',
  externals: ['lodash'], // 打包时，忽略lodash
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'library.js',
    library: 'library',  // 使用 <script src="./library.js"></script>的方式导入，library会作为全局变量
    libraryTarget: 'umd' // 挂载位置 umd - 通用模块方式使用 | this -- 挂载到this上 | window == 挂载到window上 | global -- node.global
  }
}