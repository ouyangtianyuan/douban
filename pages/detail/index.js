// pages/detail/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{

    },
    rating:null,
    active:'',
    showText:'展开',
    types:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options)
      var id = options.id
      this.getData(id)
  },

  //获取数据
  getData(id){
    var url = app.globalData.doubanBase + app.globalData.detailUrl + id
    console.log(url)
    wx.showToast({
      title: '正在加载中',
      icon:'loading',
      duration:10000
    })
    wx.request({
      url,
      method: 'GET',
      header: {
        'content-type': 'json'
      },
      success:(res) => {
          wx.hideToast()
          var genres = res.data.genres.map(i => i).join(' / ')
          var countries = res.data.countries.map(i => i).join(' / ')
          var casts = res.data.casts
          var year = res.data.year
          genres = year + ' / ' + genres 
          this.setData({
            detail:{
              movies:res.data,
              genres,
              countries,
              casts,     
            },
            rating:res.data.rating
          })
          console.log(this.data)
      },
      fail:(err) =>{
        console.log(err)
      }
    })
  },

  //点击展开
  toggle(e){
    var types = e.currentTarget.dataset.type;
    if(!types){
      this.setData({
        active: 'active',
        showText: '收起',
        types: true
      })
    }else{
      this.setData({
        active: '',
        showText: '展开',
        types: false
      })
    }
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