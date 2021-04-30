const path = require('path');
const { merge } = require('webpack-merge');

const rootPath = path.resolve(__dirname)

const baseConf = {
    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    resolve: {
        modules: ['../node_modules']
    },
}

module.exports = env => {
    const projectName = env.PROJECT
    const projectPath = path.resolve(rootPath, projectName)
    return merge(baseConf, {
        context: projectPath,
        output: {
            path: path.resolve(projectPath, 'dist'),
            filename: '[name].js'
        },
    })
}