import {queryNews} from "../../api/api"
import {formatNum,formatTime} from "../../utils/common"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsArr: [],
    isLoading: false,
    hasData: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getNewsArr();
  },

  getNewsArr(){
    this.setData({
      isLoading: true
    })
    queryNews({
      limit: 7,
      size: this.data.newsArr.length
    }).then(res=>{
      // 请求成功就关闭下拉刷新
      wx.stopPullDownRefresh();
      res.data.forEach(item=>{
        item.view_count = formatNum(item.view_count);
        item.publish_date = formatTime(item.publish_date);
      });
      let oldData = this.data.newsArr;
      let newData = oldData.concat(res.data);
      this.setData({
        newsArr: newData,
        isLoading: false
      })
      // 如果已经查询的数据达到了最大值，也就是没有数据了，就设置hasData=true
      if(this.data.newsArr.length == res.total){
        this.setData({
          hasData: true
        })
      }
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
    // 初始化数据
    this.setData({
      newsArr: [],
      isLoading: false,
      hasData: false
    });
    // 发送请求
    this.getNewsArr();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // 如果已经查询到所有数据，就不再发送请求查询了
    if(this.data.hasData) return;
    // 触底了就再次发送请求，并展示增加的数据
    this.getNewsArr();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})