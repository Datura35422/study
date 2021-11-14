// http://mockjs.com/examples.html
const { mock, Random } = require('mockjs')
const fs = require('fs')
const path = require('path')

Random.extend({
  imagesrc: function() {
    const srcList = ['https://images.daqinjia.cn/tmp_906190ab7e8f8d47a0e0b5adb0bf1cc73900804e362a5803.jpg', 'https://images.daqinjia.cn/tmp_6ee98313288c4799d3faa573d85315f2.jpg']
    return this.pick(srcList)
  },
  gender: function() {
    const str = ['女', '男']
    return this.pick(str)
  }
})

const data = mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'list|80': [{
    // 属性 id 是一个自增数，起始值为 1，每次增 1
    'id|+1': 1,
    'name': '@ctitle(3, 5)',
    'avatar': '@imagesrc',
    'text': '@cparagraph(1)',
    'time': '1秒以前推荐',
    'images|0-9': ['@imagesrc'],
    'liked|0-1': 1,
    'gender': '@gender',
  }],
  'interactives|80': [{
    'id|+1': 1,
    'direction|0-1': 1, // 方向 0 你向TA 1 TA向你
    'operate|1-3': 1, // 操作 1 评论 2 点赞 3 回复
    'name': '@ctitle(3, 5)',
    'avatar': '@imagesrc',
    'date': '@date(MM月dd日)',
    'read|0-1': 1, 
  }]
})

// 输出结果
const dir = path.resolve(__dirname, './mock-data/data.json')
fs.createWriteStream(dir).write(JSON.stringify(data, null, 4))