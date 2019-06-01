// pages/loading/loading.js
const requestUrl = require("../../utils/request.js").requestUrl
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: '',
    password: '',
  },

  /**
   * @desc 登录
   */
  load: function(){
    wx.request({
      url: requestUrl + '/ajhUser/login',
      data: {
        "phone": this.data.account,
        "password": this.data.password
      },
      'method': 'post',
      success(res) {
        wx.setStorage({
          key: 'curUserInfo',
          data: res.data.user,
        })
      }
    })
    wx.switchTab({
      url: '../Mine/Mine'
    })
  },

  /**
   * @desc 设置账号
   */
  getAccount: function(e){
    this.setData({
      account: e.detail.value
    })
  },

  /**
   * @desc 设置密码
   */
  getPassword: function (e) {
    this.setData({
      password: e.detail.value
    })
  },


  /**
   * @desc 注册
   */
  register: function () {
    wx.navigateTo({
      url: '../zhuce/zhuce'
    })
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
  
