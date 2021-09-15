// 教程：https://www.huaweicloud.com/articles/2687012349fabd74e9cc9da11c0ca640.html
const path = require('path');
const Koa = require('koa');
// https://github.com/koajs/router/blob/master/API.md
const Router = require('@koa/router');
// https://github.com/koajs/koa-body
const koaBody = require('koa-body');
// https://github.com/koajs/static
const koaStatic = require('koa-static');
// https://github.com/koajs/cors
// const cors = require('@koa/cors');

const app = new Koa();
const router = new Router();

// app.use(cors({
//   'Access-Control-Allow-Methods': 'POST',
//   'Access-Control-Allow-Origin': '*'
// }))

app.use(koaStatic(path.join(__dirname, 'public')));

router.post('/upload', 
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

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => {
  console.log('启动成功: http://localhost:3000');
})