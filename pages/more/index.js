// pages/more/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showInTh:true,
    showCom:false,
    inTh:{

    },
    com:{

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var typeId = options.typeId;
      console.log(typeId)
      if(typeId == 'inTh'){
        this.setData({
          showInTh: true,
          showCom: false,
        })
      } else {
        this.setData({
          showInTh: false,
          showCom: true,
        })
      }
      this.getData(typeId)
  },

  // 获取数据
  getData(typeId){
      let url;
      if(typeId == 'inTh'){
        url = app.globalData.doubanBase + app.globalData.inTheaters
      }else{
        url = app.globalData.doubanBase + app.globalData.comingSoon
        console.log(url)
      }
      wx.showToast({
        title: '加载中',
        icon:'loading',
        duration:10000
      })
      var offset  = this.data[typeId].offset || 0
      var total = this.data[typeId].total || 999
      if(offset >= total){
        return
      }
      wx.request({
        url,
        header: { 'content-type': 'json' },
        data:{
            start:offset,
            count:5
        },  
        success:(res) => {
          console.log(res)
          var subjects = res.data.subjects;
          var movies = this.data[typeId].movies || []
          var total = res.data.total
          var offset = this.data[typeId].offset || 0
          offset += subjects.length
          subjects.forEach(item => {
            let allCasts = item.casts.map(i => i.name).join(' / ')
            let allDir = item.directors.map(i => i.name).join(' / ')
            let allGenres = item.genres.map(i => i).join(' / ')
            let movie = {
              ...item,
              allCasts,
              allDir,
              allGenres,
              typeId
            }
            movies.push(movie)
          })
          this.setData({
            [typeId] : {offset,total,movies}
          })
        },
        fail: () => {

        },
        complete: () => {
          wx.hideToast()
        }
      })
  },

  //点击切换
  tabFn(e){
    var typeId = e.target.dataset.type
    console.log(typeId)
    if (typeId == 'inTh') {
      this.setData({
        showInTh: true,
        showCom: false,
      })
    } else {
      this.setData({
        showInTh: false,
        showCom: true,
      })
    }
    console.log(this.data[typeId].movies)
    if(!this.data[typeId].movies){
        this.getData(typeId)
    }
  },

  //滚动加载更多
  loadmore(e){
      let typeId;
      if(this.data.showInTh){
        typeId = 'inTh';
      }else{
        typeId = 'com';
      }
      this.getData(typeId)
  },

  // 点击进入详情
  bindDetail(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/index?id='+ id,
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