// 教程：https://www.huaweicloud.com/articles/2687012349fabd74e9cc9da11c0ca640.html
const path = require('path');
const { writeFileSync } = require('fs');
const { Buffer } = require('buffer');
const Koa = require('koa');
// https://github.com/koajs/router/blob/master/API.md
const Router = require('@koa/router');
// https://github.com/koajs/koa-body
const koaBody = require('koa-body');
// https://github.com/koajs/static
const koaStatic = require('koa-static');
// https://github.com/koajs/cors
// const cors = require('@koa/cors');
const Crypto = require('crypto');
const SizeOf = require('image-size');
const images = require('images');

const app = new Koa();
const router = new Router();

// app.use(cors({
//   'Access-Control-Allow-Methods': 'POST',
//   'Access-Control-Allow-Origin': '*'
// }))

function _getHash(salt = Date.now().toString()) {
  return Crypto.createHash('md5').update(salt).digest('hex');
}

app.use(koaStatic(path.join(__dirname, 'public')));

router.post('/img', 
  koaBody({
    multipart: true, 
    // https://github.com/node-formidable/formidable
    formidable: {
      uploadDir: path.resolve(__dirname, './public/uploads'),
      keepExtensions: true,
      hash: 'sha1',
    }
  }),
  (ctx, next) => {
    const file = ctx.request.files.file;
    const basename = path.basename(file.path);
    ctx.body = { 
      url: `${ctx.origin}/uploads/${basename}`,
      hash: file.hash
    }
  }
);

router.post('/pixel', 
  koaBody(),
  (ctx, next) => {
    const data = ctx.request.body
    // => POST body
    const pixel = data.pixel
    if (pixel && Array.isArray(pixel)) {
      const sizeOld = pixel.length / 4
      console.log(sizeOld)
      const base64 = pixel.reduce((base, item) => {
        const reg = /rgba\(([\d]+), ([\d]+), ([\d]+), 255\)/g;
        const match = reg.exec(item).slice(1);

        match.forEach(item => {
          if (item !== 0) {
            base += String.fromCharCode(item)
          }
        })
        return base
      }, '');

      // 转图片
      const buf = Buffer.from(base64, 'base64');
      const unit = new Uint8Array(buf); // 返回一个被 string,编码格式是base64(默认编码格式是utf-8)的值初始化的新的 Buffer 实例
      const salt = Date.now().toString();
      const hash = _getHash(salt);
      const imgPath = `${hash}.jpg`;

      // 计算图片大小
      const { width, height } = SizeOf(buf);
      console.log(width, height)
      const sizeNew = width * height;
      const multiple = Math.abs((sizeOld / sizeNew));
      const newWidth = multiple * width;
      const newHeight = multiple * height;
      const newHash = _getHash(salt + 'new');
      console.log(multiple, newHeight, newWidth)

      try {
        // 用fs写入文件
        const uploadDir = path.resolve(__dirname, `./public/uploads`);
        writeFileSync(`${uploadDir}/${imgPath}`, unit);
        images(buf).size(newWidth, newHeight).save(`${uploadDir}/${newHash}.jpg`);

        ctx.body = {
          url: `${ctx.origin}/uploads/${imgPath}`,
          hash
        };
      } catch(err) {
        console.log(err);
      }
    }
  }
);

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => {
  console.log('启动成功: http://localhost:3000');
})