import {queryNewsDetail} from '../../api/api'
import {formatNum,formatTime} from '../../utils/common'
let id;  // 定义一个变量存放上一个页面传递过来的参数id
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsDetail: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 接收传递过来的id，展示相应的新闻详情页，上一个页面传递过来的参数都在options里面
    id = options.id;
    this.getNewsDetail();
  },

  // 发送请求获取新闻详情
  getNewsDetail(){
    queryNewsDetail({
      id: id
    }).then(res=>{
      // 设置黑色导航栏头部的标题
      wx.setNavigationBarTitle({
        title: res.data.title,
      })
      // 格式化时间和浏览量
      res.data.view_count = formatNum(res.data.view_count);
      res.data.publish_date = formatTime(res.data.publish_date,6);
      this.setData({
        newsDetail: res.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return{
      // 设置转发的标题
      title: this.data.newsDetail.title,
      // 设置分享页的路劲，如果不设置的话就会默认显示首页
      path: '/pages/newsDetail/newsDetail?id=' + this.data.newsDetail._id
    }
  },

  // 分享到朋友圈
  onShareTimeline(){
    return{
      title: this.data.newsDetail.title,
      path: '/pages/newsDetail/newsDetail?id=' + this.data.newsDetail._id
    }
  }
})