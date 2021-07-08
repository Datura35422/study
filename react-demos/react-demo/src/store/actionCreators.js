import axios from 'axios'
import * as actionTypes from './actionTypes'

// 利用函数的形式 动态设置传入的对象参数
export const incrementAction = () => {
    return {
        type: actionTypes.INCREMENT
    }
}
export const decrementAction = () => {
    return {
        type: actionTypes.DECREMENT
    }
}
export const addNumberAction = num => {
    return {
        type: actionTypes.ADD_NUMBER,
        num
    }
}
export const subNumberAction = num => {
    return {
        type: actionTypes.SUB_NUMBER,
        num
    }
}

export const changeBannersAction = banners => {
    return {
        type: actionTypes.CHANGE_BANNERS,
        banners
    }
}

export const changeRecommendsAction = recommends => {
    return {
        type: actionTypes.CHANGE_RECOMMENDS,
        recommends
    }
}

// redux-thunk 中定义的函数
export const getHomeMultidataAction = dispatch => {
    axios({
        url: 'http://123.207.32.32:8000/home/multidata'
    }).then(res => {
        const { data: { banner: { list: banners }, recommend: { list: recommends } } } = res.data
        console.log(banners)
        dispatch(changeBannersAction(banners))
        dispatch(changeRecommendsAction(recommends))
    })
}

// redux-saga拉杰的action
export const fetchHomeMultidataAction = {
    type: actionTypes.FETCH_HOME_MULTIDATA,
}