// pages/Mine/Mine.js
var upload = require("../../utils/upload.js")
var app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    items: [{ img: '/image/icon1.png', Text: '商品发布' }, {
      img: '/image/icon1.png', Text: '信息管理'
    }, { img: '/image/icon1.png', Text: '商品评价' }, {
        img: '/image/icon1.png', Text: '个人信息'
    }],

  },

  mineTo:function(res){
     console.log(res);
     if(res.currentTarget.dataset.index==0){
          wx.navigateTo({
            url: '../inputBookFormation/inputBookFormation',
          })
     }
     if (res.currentTarget.dataset.index ==1) {
       wx.navigateTo({
         url: '../booksmanager/booksmanager',
       })
     }
     if (res.currentTarget.dataset.index ==2) {

       wx.navigateTo({
         url: '../pingjia/pingjia',
       })
     }

    if (res.currentTarget.dataset.index == 3) {
      wx.navigateTo({
        url: '../personinfo/personinfo',
      })
    }
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
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
    let that = this
    wx.getStorage({
      key: 'curUserInfo',
      success: function(res) {
        that.setData({
          userInfo: res.data,
        })
        console.log(res.data)
      },
    })
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