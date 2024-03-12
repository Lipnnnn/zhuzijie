import {queryNav,queryNews} from '../../api/api'
import {formatNum,formatTime} from '../../utils/common'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navData: [],
    newsData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNav();
    this.getNews();
  },

  // 获取导航栏的数据，向后台发送请求
  getNav(){
    queryNav().then(res=>{
      this.setData({
        navData: res.data
      })
    })
  },

  // 获取三条新闻数据，展示到首页
  getNews(){
    queryNews({
      limit: 3,  // 表示只查询3条数据
      hot: true   // 表示只查询热点数据
    }).then(res=>{
      // 处理日期和评论数量显示的格式
      res.data.forEach(item=>{
        item.view_count = formatNum(item.view_count);
        item.publish_date = formatTime(item.publish_date,5);
      })
      // 设置新闻数据
      this.setData({
        newsData: res.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})