// 后台管理系统 圈子相关操作

const axios = require('axios')

const REFRESH_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjE0MTM2MzMsIm5iZiI6MTYyMTQxMzYzMywianRpIjoiNmE1MTdhYTUtMTM3Yi00MjJkLWI1ZDktMDZiNTRmOGQxODJlIiwiZXhwIjoxNjI0MDA1NjMzLCJpZGVudGl0eSI6InRlc3QiLCJ0eXBlIjoicmVmcmVzaCJ9.FmvslPGBkVzyhH_RumQfKJWcRPTu844W8nslSe9NDrc'

const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjE0OTc1MjksIm5iZiI6MTYyMTQ5NzUyOSwianRpIjoiMzc4OTFjOTUtMWYzYS00ZmQ2LThiYjMtNDExMWVmNjYxNTlhIiwiZXhwIjoxNjIxNDk3ODI5LCJpZGVudGl0eSI6InRlc3QiLCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MiLCJ1c2VyX2NsYWltcyI6eyJpZCI6MSwicm9sZXMiOnsiaWQiOjE1LCJuYW1lIjoicHJvZHVjdCIsImRpc3BsYXlfbmFtZSI6Ilx1NGVhN1x1NTRjMSJ9fX0.jELpfqPEFxOKej-jrCOYxj81A_wM-k8Kw9sAqPtiess'

const service = axios.create({
    baseURL: 'https://test.daqinjia.cn/stegosaur/api/', // api base_url
    timeout: 10000, // 请求超时时间
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TOKEN}`
    },
})

// response返回判断
const err = async (error) => {
    let originalRequest = error.config
    if (error.response) {
        console.log('err status: ', error.response.status)
        if (error.response.status === 401 && !originalRequest._retry) { // access_token过期, 自定义设置_retry避免重复请求
            originalRequest._retry = true
            return new Promise((resolve, reject) => {
                service.post(`/management/refresh_token`, null, {
                    'Authorization': `Bearer ${REFRESH_TOKEN}`
                })
                    .then(response => {
                        originalRequest.headers['Authorization'] = 'Bearer ' + response.data.access_token
                        originalRequest.baseURL = '' // 上一次请求如果不是绝对url则会添加到url上,因此上线之后都是相对URL
                        resolve(service(originalRequest))
                    }).catch(error => { // 如果refresh_token失败则清空token缓存
                        reject(error)
                    })
            })
        }
    }
    return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
//   config.headers['Authorization'] = `Bearer ${TOKEN}`
    return config
}, err)

// Response Interceptor to handle and log errors
service.interceptors.response.use(response => {
    return response.data
}, err)


const url = 'xqcircle/user_circle/'


function addCircles() {
    const addServers = list.map(item => {
        return service.post(url, {
            action: 1,
            user_id,
            circle_id: item
        })
    })
    Promise.all(addServers).then(res => {
        // console.log(res)
        return checkCircle()
    })
}

async function removeCircles() {
    const data = await checkCircle()
    if (data.length === 0) {
        return
    }
    const removeServers = data.map(item => {
        return service.post(url, {
            action: 2,
            user_id,
            circle_id: item.id
        })
    })
    Promise.all(removeServers).then(res => {
        // console.log(res)
        return checkCircle()
    })
}

async function checkCircle() {
    const res = await service.get(url, {
        params: {
            user_id
        }
    })
    const { data } = res
    if (data && data.length > 0) {
        console.log(data)
        console.log('all in: ', data.some(item => list.includes(item.id)))
    } else {
        console.log('all in: ', false)
    }
    return res.data
}

function delUser() {
    service.get('xqcircle/user/del_user', {
        params: {
            user_id
        }
    }).then(res => {
        console.log('delUser: ', res)
    })
}

const wxappRequest = axios.create({
    baseURL: 'https://test.daqinjia.cn/wx/api/xqcircle/v1/', // api base_url
    timeout: 10000, // 请求超时时间
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `XqCircleToken 813f53b10fda6d4b55654d17b1d000aa8ae6ab2c`
    },
})

// request interceptor
wxappRequest.interceptors.request.use(config => {
    //   config.headers['Authorization'] = `Bearer ${TOKEN}`
    return config
}, (error) => {
    console.log(error.response)
})
    
// Response Interceptor to handle and log errors
wxappRequest.interceptors.response.use(response => {
    return response.data
}, (error) => {
    console.log(error.response)
})

async function editInfo() {
    const info = await getInfo()
    if (info) {
        const beijing ='北京市-海淀区'
        const shanghai = '上海市-黄浦区'
        const city = '上海市'
        info.place_of_residence = info.place_of_residence.startsWith(city) ? beijing : shanghai
        info.residence = info.residence.startsWith(city) ? beijing : shanghai
        wxappRequest.post('cards/', info).then(res => {
            console.log('修改资料', res)
        })
    }
}

async function getInfo() {
    const { errcode, data } = await wxappRequest.get(`/users/info/`)
    console.log(data)
    if (errcode === 0) {
        return data
    }
}


// const list = [102, 16] // beijing
const list = [1, 2, 3, 4, 5] // shanghai

const user_id = 100067559 // 100064359 // 100067210
// const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 14]
// getInfo()
// editInfo()
addCircles()
// removeCircles()
// checkCircle()
// delUser()