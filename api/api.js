import {request} from '../utils/request'

// 获取首页导航栏的数据
export function queryNav(){
  // 这里返回的就是一个Promise对象，所以在使用的时候可以使用.then()
  return request({
    url: '/nav/get',
    method: 'POST'
  })
}

// 获取首页新闻列表
// 调用这个方法需要传递一个参数，这个参数是一个对象类型，对象里面包括limit:要查多少条数据，hot:是否只查询热点数据
export function queryNews(data){
  return request({
    url: '/news/get',
    method: 'POST',
    data: data    // 这里第一个data是发送请求时的格式data，第二个data是传递过来的参数
  })
}

// 获取新闻详情数据
export function queryNewsDetail(data){
  return request({
    url: '/news/detail',
    method: 'POST',
    data: data
  })
}

// 获取产品列表数据
export function queryProList(data){
  return request({
    url: '/product/getlist',
    method: 'POST',
    data: data
  })
}

// 获取产品详情
export function queryProDetail(data){
  return request({
    url: '/product/detail',
    method: 'POST',
    data: data
  })
}