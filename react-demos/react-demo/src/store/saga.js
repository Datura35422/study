// redux-saga 使用 需要导出 generator 生成器函数
import { takeEvery, put, all } from 'redux-saga/effects'
import axios from 'axios'
import {
    FETCH_HOME_MULTIDATA
} from './actionTypes' // redux-saga 准备拦截的action type常量
import {
    changeBannersAction,
    changeRecommendsAction,
} from './actionCreators'

function* fetchHomeMultidata(action) {
    console.log('fetchHomeMultidata')
    // 异步获取数据
    const res = yield axios.get('http://123.207.32.32:8000/home/multidata')
    const { data: { banner: { list: banners }, recommend: { list: recommends } } } = res.data
    // 调用action存入数据
    // yield put(changeBannersAction(banners))
    // yield put(changeRecommendsAction(recommends))
    // 第二种写法 all
    yield all([
        put(changeBannersAction(banners)),
        put(changeRecommendsAction(recommends))
    ])
    console.log(res)
}

function* mySaga() {
    // takeEvery 用于监听对应的action
    // takeLatest 与 takeEvery 的区别
    // takeLatest：一次只能监听一个对应的action，如果顺序执行同一个action 会取消前面未执行的，执行最后一次
    // takeEvery：调用的 action 每一个都会被执行
    // 监听多个 action时 使用 all 方法进行监听
    yield takeEvery(FETCH_HOME_MULTIDATA, fetchHomeMultidata)
}

export default mySaga