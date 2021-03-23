// index.js为仅简单的模块间相互调用的示例

// 简易的打包工具
// 对项目的打包，首先要先读取入口文件，对项目代码进行分析
// cli-highlight插件，帮助高亮cli输出
// @babel/parser 帮助进行源代码语义分析 https://www.babeljs.cn/docs/babel-parser
// @babel/traverse 对解析出的抽象语法树进行遍历 https://www.babeljs.cn/docs/babel-traverse
// @babel/core babel的核心模块，对代码进行转义，使得可以在浏览器中运行 https://babeljs.io/docs/en/babel-core
// @babel/preset-env代码转义插件，将代码转换为目标环境可运行的代码  https://babeljs.io/docs/en/babel-preset-env

const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default; // 默认ES6 module的导出，使用要用default
const babel = require('@babel/core')

const moduleAnalyser = (filename) => { // 读取文件，获取文件内容 进行解析抽象语法树
    const content = fs.readFileSync(filename, 'utf-8');
    // 获取抽象语法树
    const ast = parser.parse(content, {
        sourceType: 'module'
    })
    const dependencies = {} // 获取依赖文件信息, 存入的路径是绝对路径或者是相对于bundle的相对路径
    // 如果只存一个相对路径会在打包的时候比较麻烦，所以存一个相对路径和绝对路径
    traverse(ast, {
        ImportDeclaration({ node }) {
            const dirname = path.dirname(filename)
            const sourceValue = node.source.value
            const newFile = './' + path.join(dirname, sourceValue)
            dependencies[sourceValue] = newFile; // 键值对的方式进行存储
        }
    });
    // 对抽象语法树进行转换, 将转换后的code取出
    const { code } = babel.transformFromAst(ast, null, {
        presets: ['@babel/preset-env']
    })
    return {
        filename, // 文件
        dependencies, // 依赖
        code // 转移后的代码
    }
}

// 依赖图谱，将入口文件中的依赖文件再进一步分析，一层一层递进
const makeDependenciedGraph = (entry) => {
    // 分析入口文件
    const entryModule = moduleAnalyser(entry);
    const graphArray = [ entryModule ]; // 初始化图谱数组

    for (let i = 0; i < graphArray.length; i++) {
        const item = graphArray[i];
        const { dependencies } = item; // 获取依赖文件
        if (dependencies) {
            // 如果存在依赖，则循环依赖
            for (let j in dependencies) {
                // 对依赖文件进行分析，将分析结果存入到图谱数组中
                graphArray.push(
                    moduleAnalyser(dependencies[j]) // 依赖的对象文件 
                ); // 推入graphArray中后，长度变长，下一个进行遍历分析的文件
            }
        }
    }

    // 关系图谱数据解构转化，将数组转化为对象
    const graph = {};
    graphArray.forEach(item => {
        graph[item.filename] = {
            dependencies: item.dependencies,
            code: item.code
        }
    });
    return graph;
}

// 最后的结果返回代码字符串
const generateCode = (entry) => {
    // 转化成字符串传入到闭包中
    const graph = JSON.stringify(makeDependenciedGraph(entry));
    // 代码在闭包中执行避免污染外部环境
    // require无法在浏览器中直接运行，需要进行创建require方法
    // exports存储导出的内容
    // 返回一个字符串
    // localRequire转换文件的相对路径返回真实路径
    // 递归调用到最内层的依赖文件，然后通过exports导出
    return `
        (function(graph) {
            function require(module) {
                function localRequire(relativePath) {
                    return require(graph[module].dependencies[relativePath]);
                }
                var exports = {};
                (function(require, exports, code) {
                    eval(code);
                })(localRequire, exports, graph[module].code);
                return exports;
            };
            require('${entry}');
        })(${graph});
    `;
}

const code = generateCode('./src/index.js')
console.log(code)

// 注意：示例文件中本来是有注释的，但是注释加上去了之后就会出现问题，所以删除注释后在chrome://test模式下运行成功