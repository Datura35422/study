function request(formData = null) {
  if (!formData) {
      return
  }
  return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.onreadystatechange = function() {
          // 请求操作已完成
          if (xhr.readyState === 4) {
              // 判断响应状态
              if (xhr.status.toString().startsWith('2') || xhr.status === 304) {
                  // 获取返回结果
                  const res = xhr.response
                  resolve(res)
              } else {
                  reject(xhr.status)
              }
          }
      }
      // 初始化一个请求，第三个参数设置异步请求还是同步请求，默认值为false为异步请求
      xhr.open(formData.method, formData.url)
      // 必须在 open 之后，send之前设置 header
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
      // 设置超时
      xhr.timeout = 10000 // 设置 10 秒超时
      xhr.ontimeout = function() {
          console.log("Request did not return in a second.")
      }
      // 发送请求
      xhr.send(formData.data || null)
  })
}

request({
  method: 'GET',
  url: 'www.baidu.com',
  data: null,
}).then(res => console.log(res)).catch(err => console.error(err))