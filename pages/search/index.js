// pages/search/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resList:[]
  },

  backHome(){
      wx.navigateBack({
        delta:1
      })
  },

  //搜索
  searchFn(e) {
    var val = e.detail.value;
    var url = app.globalData.doubanBase + app.globalData.searchUrl + val
    wx.request({
      url,
      method:'GET',
      header:{'content-type':'json'},
      success:(res) => {
        this.dealData(res.data.subjects)
      }
    })
  },

  // 点击进入详情
  bindDetails(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/index?id='+id,
    })
  },

  //处理数据
  dealData(data){
    var resList = []
    
    data.forEach((ele,index)=>{
       var dir = ele.directors.map(i => i.name).join('/')
       var des = ele.rating.average + '分/' + ele.year
       resList.push({
         title:ele.title,
         image:ele.images.small,
         dir,
         des,
         id:ele.id
       })
    })
    this.setData({resList})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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