## 使用须知

### 目的

为了满足运营同事的需求，将微信文章快速转换成目标网页，批量处理图片问题，和订制其他需求。

### 功能及使用

#### node版本

功能：**批量转换单个文章的图片链接并根据配置操作`dom`后，生成对应`html`文件。**

> 程序根据配置文件`config.json`，可选上传到图片服务器，转换文章中图片链接，并订制部分`html`代码后生成对应的`html`文件。

环境准备：

1. node运行环境，版本 ≥ 12.*
2. 运行`npm install`，下载项目依赖包

操作步骤：

1. 环境准备好后，打开配置文件`config.json`，根据需求，修改配置项。

   ```json
   // 配置文件参数说明
   {
     "inputOption": { // 待转换文章选项 -- 必填
       "hostname": "", // 待转换文章hostname
       "path": "" // 待转换文章path
     },
     "output": "test.html", // 输出文件名 -- 必填
     "outputImg": { // 输出图片选项 -- 选填
       "dir": "downloads", // 图片存入目录，默认值：downloads
       "beforeClean": false // 图片存入outputImg.dir中之前是否清空目录，默认值：false
     },
     "imgSrcPrefix": "downloads/", // 图片src前缀，默认值：downloads/
     "isUploadImg": false, // 是否上传图片，默认值：false，不上传
     "uploadImgOption": { // 上传文件配置，如果isUploadImg: true，则必须配置该项
       "url": "",
       "token": ""
     },
     "removeDom": { // 需要删除的dom元素，目前就只支持删除id选择器 -- 选填
       "id": [] // 需要删除dom的id
     },
     "addDom": { // 需要增加的dom元素，目前就只支持在body元素上append -- 选填
       "appendBody": "" // 需要新增的html代码
     }
   }
   ```

2. 修改配置文件后，在文件目录下的终端窗口中运行代码：

   ```shell
   node convert.js
   ```

3. 运行结束后，后续可继续根据需求进行订制`html`文件。

