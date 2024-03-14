import {queryNav,queryProList} from '../../api/api'
let navId = "63b9600be1a35c358c18483b";  // 定义一个变量记录用户点击的是哪一个种类的茶，展示对应的内容
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    classifyNav: [],
    proList: [],
    isLoading: false,
    isData: false
  },  

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    await this.getClassifyNav();
    let {index} = options;  // 拿到从首页传递过来的index值
    if(index){
      // 如果是从首页导航栏跳转过来的：
      // 拿到index后，然后模拟点击分类页面的导航栏，展示对应的内容
      this.navChange(index);
    }else{
      // 不是从首页导航栏跳转过来的，是直接点击分类页面：
      this.getProList();
    }
  },

  // 获取分类页面导航栏的数据
  async getClassifyNav(){
    await queryNav().then(res=>{
      this.setData({
        classifyNav: res.data
      })
    })
  },

  // 获取产品列表
  getProList(){
    this.setData({
      isLoading: true
    })
    queryProList({
      "navid": navId,
      "size": this.data.proList.length
    }).then(res=>{
      let oldData = this.data.proList;
      let newData = oldData.concat(res.data);
      this.setData({
        proList: newData,
        isLoading: false
      })
      // 判断如果已经获取到所有的数据，就把isData改为true
      if(this.data.proList.length == res.total){
        this.setData({
          isData: true
        })
      }
    })
  },

  // 点击导航条切换对应的内容
  navChange(e){
    // JS可选链：
    let index = e?.detail?.index??e;  // 拿到点击的导航条的索引值
    navId = this.data.classifyNav[index]._id;  // 根据索引值拿到对应品种茶的_id
    // 切换了不同的茶叶类别，这里需要先将proList数组的数据清空，并且把是否有数据改为有数据，因为是加载新的一个类型了
    this.setData({
      proList: [],
      isData: false,
      active: Number(index)
    })
    // 根据navId向后台获取对应的数据
    this.getProList();
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
    // 如果isData的值是true，就停止发送请求
    if(this.data.isData) return;
    // 触底了，就发送请求
    this.getProList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})