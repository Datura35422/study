// Node.js program to demonstrate the fsPromises.truncate() Method

// Import the filesystem module
const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

async function doReadFile(filePath) {
  let filehandle = null;
  try {
    // 需要使用绝对路径
    filehandle = await fsPromises.open(filePath);
    const data = await filehandle.readFile('utf8');
    return data.match(/src\/(.)*:/g);
  } catch (e) {
    console.log('doReadFile Error: ', e);
    return [];
  } finally {
    await filehandle?.close();
  }
}

async function doWriteFile(filePath, data) {
  try {
    await fsPromises.writeFile(path.resolve(__dirname, filePath), data);
  } catch (e) {
    console.log('doWriteFile Error: ', e);
  }
}

const filterKey = 'holiday';
Promise.all(
  ['./data/filterResult.txt', './data/filterResult2.txt'].map((filePath) =>
    doReadFile(path.resolve(__dirname, filePath))
  )
)
  .then((res) => {
    const result = new Set(
      []
        .concat(...res)
        .filter((item) => item.includes(filterKey))
        .sort()
    );
    console.log(result.size);
    doWriteFile('./data/result.txt', Array.from(result).join('\n'));
  })
  .catch((err) => {
    console.log('Error: ', err);
  });
