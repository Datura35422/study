const fs = require('fs');
const path = require('path');

// async function print(path) {
//   const dir = await fs.promises.opendir(path);
//   for await (const dirent of dir) {
//     console.log(dirent.name, dirent);
//   }
// }
// print(__dirname).catch(console.error);
const originPath = __dirname
// 同步读取目录 过滤非文件夹目录及非空文件夹
const files = fs.readdirSync(originPath, { withFileTypes: true })
                .filter(file => {
                    if (file.isDirectory()) {
                        return fs.readdirSync(path.resolve(originPath, file.name)).length > 0
                    }
                    return false
                })
console.log(files);