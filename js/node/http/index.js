const fs = require('fs')
const util = require('util')
const axios = require('axios')

const chars = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  				      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 
               	'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
  				      'U', 'V', 'W', 'X', 'Y', 'Z' ]
function generateMixed(n) {
  let res = ''
  for (let i = 0; i < n; i++) {
    res += chars[Math.ceil(Math.random() * 35)]
  }
  return res
}

function postUrl() {
  const url = util.format(
    'https://api.e.qq.com/v1.1/user_action_sets/add?access_token=%s&timestamp=%d&nonce=%s',
    'c37135cfe905c20eb8f5134cecb98af9',
    Math.floor(Date.now() / 1000),
    generateMixed(32)
  )
  axios.post(
    url,
    {
      type: 'WECHAT_MINI_PROGRAM',
      wechat_app_id: 'wx9fa47d9522cc0237',
      name: '测试数据源',
      description: '测试'
    }
  ).then(res => {
    console.log('success: ', res.config, res.data)
  }).catch(err => {
    console.log('error: ', err)
  })
}
postUrl()


function addAdv() {
  const url = util.format(
    'https://sandbox-api.e.qq.com/v1.1/advertiser/add?access_token=%s&timestamp=%d&nonce=%s',
    '31ecd56eb8d11431f5bb83b55ccd0f18',
    Math.floor(Date.now() / 1000),
    generateMixed(32)
  )
  axios.post(
    url,
    {
      corporation_name: '沙箱测试_test',
      certification_image_id: 'xxx',
      system_industry_id: 21474836785,
      introduction_url: 'https://www.daqinjia.cn',
      individual_qualification: {
        identification_front_image_id: 'xx',
        identification_back_image_id: 'xx'
      }
    }
  ).then(res => {
    console.log('success: ', res.config, res.data)
  }).catch(err => {
    console.log('error: ', err)
  })
}
// addAdv()

function uploadImg() {
  const data = {
    account_id: '19025976',
    upload_type: 'UPLOAD_TYPE_FILE',
    signature: 'f4c8a3bc4deb305fb74cb08ed395b98c'
  }
  fs.readFile('./test.jpg', (err, res) => {
    if (err) {
      console.log('error: ', err)
      throw err
    }
    data.file = res
    const url = util.format(
      'https://sandbox-api.e.qq.com/v1.1/images/add?access_token=%s&timestamp=%d&nonce=%s',
      '31ecd56eb8d11431f5bb83b55ccd0f18',
      Math.floor(Date.now() / 1000),
      generateMixed(32)
    )
    axios.post(
      url,
      data
    ).then(res => {
      console.log('success: ', res.config, res.data)
    }).catch(err => {
      console.log('error: ', err)
    })
  })
}
// uploadImg()