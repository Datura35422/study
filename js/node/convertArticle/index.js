/**
 * author: Wang
 */

const fs = require('fs')
const https = require('https')
const axios = require('axios')
const FormData = require('form-data')
const { v4: uuidv4 } = require('uuid')
const cheerio = require('cheerio')

let config = {}
let dir = 'downloads'
let imgSrcPrefix = 'downloads/'

// 获取配置文件
function getConfig() {
  const file = 'config.json'
  return new Promise((resolve, reject) => {
    if (fs.existsSync(file)) {
      // 因为json文件比较小，所以使用readFile
      fs.readFile('config.json', {
        encoding: 'utf8'
      }, (err, data) => {
        if (err) {
          reject(err)
        } else {
          config = JSON.parse(data)
          dir = config?.outputImg?.dir || dir
          imgSrcPrefix = config.imgSrcPrefix || imgSrcPrefix
          if (!!(config?.inputOption) || (config.isUploadImg && !!!(config?.uploadImgOption))) {
            // 替换 !Object.prototype.hasOwnProperty.call(config, 'inputOption') || (config.isUploadImg && !Object.prototype.hasOwnProperty.call(config, 'uploadImgOption')) 
            reject(new Error('参数错误'))
          }
          resolve(config)
        }
      })
    } else {
      resolve()
    }
  })
}

const imgList = []
let htmlContent = ''

// 获取content中的image标签内容
function formatImg(content = '') {
  const reg = /<img.*? data-src="(.*?)".*?\/>/gi // 非贪婪匹配
  const resArr = content.match(reg) || []
  if (resArr.length > 0) {
    resArr.forEach((item) => {
      if (item.includes('data-src')) {
        item.match(/data-src="(.*?)"/g)
        const url = RegExp.$1
        const name = `${uuidv4()}.jpg`
        imgList.push({
          url,
          name
        })
        content = content.replace(
          `data-src="${url}"`,
          `src="${imgSrcPrefix}${name}"`
        )
      }
    })
  }
  htmlContent += content
}

// 删除无用代码
function formatContent(content) {
  const $ = cheerio.load(content, {
    decodeEntities: false
  })
  const removeDom = config.removeDom || {}
  if (removeDom.id && removeDom.id.length > 0) {
    removeDom.id.forEach(item => {
      $(`#${item}`).remove()
    })
  }
  const addDom = config.addDom || {}
  if (Object.keys(addDom).length > 0) {
    addDom.appendBody && $('body').append(addDom.appendBody)
  }
  let html = $.html()
  const code = $('script').attr('nonce') || ''
  if (code !== '' ) {
    html = html.replace(new RegExp(`<script nonce="${code}">.*?<\/script>`, 'g'), '') // 删除静态引用js代码
  }
  fs.createWriteStream(config?.output || 'test.html').write(html)
}

// 获取html页面代码
function getHtmlContent() {
  const isUploadImg = config.isUploadImg || false // 默认不上传照片
  const options = config.inputOption || {}
  const req = https
    .request(options, res => {
      res.setEncoding('utf8') // 设置编码
      // 接受数据 响应主体
      res.on('data', chunk => {
        formatImg(chunk)
      })
      // 响应中已无数据
      res.on('end', () => {
        imgList.forEach((item) => {
          const name = `${dir}/${item.name}`
          saveImageToDisk(item.url, name, () => {
            console.log('success download img: ', name)
            isUploadImg && upload(`${dir}/`, item.name)
          })
        })
        formatContent(htmlContent)
      })
    })
    .on('error', e => {
      console.error('getHtmlContent error: ', e.message)
    })

  req.end()
}

function saveImageToDisk(url, localPath, callback) {
  const req = https
    .get(url, res => {
      res.pipe(fs.createWriteStream(localPath)) // 管道写入
      res.on('close', callback)
    })
    .on('error', e => {
      console.error('error saveImageToDisk: ', localPath, e)
    })
  req.end()
}

// 创建目录
async function createDir(dirPath) {
  try {
    await fs.promises.mkdir(dirPath)
  } catch (err) {
    throw err
  }
}

// 删除目录
function delDir(path) {
  let files =
    fs.readdirSync(path, {
      withFileTypes: true,
    }) || []
  files.forEach((file) => {
    let curPath = `${path}/${file.name}`
    if (file.isDirectory()) {
      delDir(curPath) //递归删除文件夹
    } else {
      fs.unlinkSync(curPath) //删除文件
    }
  })
  fs.rmdirSync(path)
}

async function findOrCreateDir(path = dir) {
  const isClean = config?.outputImg?.beforeClean || false // 默认不清除
  const hasDir = fs.existsSync(path) || false
  if (hasDir) {
    if (isClean) {
      delDir(path)
      await createDir(path)
    }
  } else {
    await createDir(path)
  }
}

// 上传图片
function upload(path, name) {
  const { url, token } = config.uploadImgOption
  const form = new FormData()
  form.append('key', name)
  form.append('token', token)
  form.append('file', fs.createReadStream(path + name))
  axios.post(url, form, { headers: form.getHeaders() }).then(() => {
    console.log('success upload img: ', `${imgSrcPrefix}${name}`)
  }).catch(err => {
    console.error('error upload img: ', `${imgSrcPrefix}${name}`, err)
  })
}

// run
getConfig().then(() => {
  console.log('getConfig after')
  return findOrCreateDir()
}).then(() => {
  console.log('findOrCreateDir after')
  getHtmlContent()
}).catch(err => {
  console.error(err)
})
