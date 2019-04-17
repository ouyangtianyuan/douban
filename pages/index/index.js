// pages/index/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTh: [],
    com: []
  },

  searchFn() {
    wx.navigateTo({
      url: '../search/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var inThUrl = app.globalData.doubanBase + app.globalData.inTheaters + '?start=0&&count=10'
    var comUrl = app.globalData.doubanBase + app.globalData.comingSoon + '?start=0&&count=10'
    this.getData(inThUrl, 'inTh')
    this.getData(comUrl, 'com')
  },

  //获取数据
  getData(url, types) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    wx.request({
      url,
      method: 'GET',
      header: {
        'content-type': 'json'
      },
      success: (res) => {
        this.setData({
          [types]: res.data.subjects
        })
      },
      fail: err => onsole.log(err),
      complete() {
        wx.hideToast()
      }
    })
  },

  bindToMore(e){
    var typeId = e.target.dataset.type;
    wx.navigateTo({
      url: '../more/index?typeId='+ typeId,
    })
  },

  // 跳转详情
  bindDetail(e) {
    console.log(e)
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/index?id=' + id,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})