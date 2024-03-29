// pages/personinfo/personinfo.js
const requestUrl = require("../../utils/request.js").requestUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
     iseditor: true,
     dates: '2016-11-08',
    userName:'',
     email:'',
     postid: '',
     address:'',
     birthday: ''

  },
  //  点击日期组件确定事件  
  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      dates: e.detail.value
    })
  },
  // 编辑事件
  personinfoeditor: function (event) {
    this.setData({
      iseditor: false
    });
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  // 保存
  formSubmit: function (e) {
    this.setData({
      iseditor: true
    });
    wx.getStorage({
      key: 'curUserInfo',
      success: function (res) {
    wx.request({
      url: requestUrl +"/ajhUserinfo/updateAjhUserinfo",
      method: "POST",
      data: { 
        userName: e.detail.value.userName,
        email: e.detail.value.email,
        birthday: e.detail.value.birthday,
        address: e.detail.value.address,
        userId: res.data.id +""
      },
      header: {
        contentType: "application/json"
      },
      success: function (res) {
        console.log(res.data);
        wx.showToast({
          title: '修改成功！',
          icon: 'success',
          duration: 2000
        })
      },
    })
      },
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
    var that = this
    wx.getStorage({
      key: 'curUserInfo',
      success: function(res) {
        wx.request({
          url: requestUrl + '/ajhUserinfo/getAjhUserInfo',
          data: {
            userId: res.data.id
      },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
          // header: {}, // 设置请求的 header  
          header: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            console.log(res.data)
            that.setData({
              userName: res.data.userName,
              email: res.data.email,
              address: res.data.address,
              birthday: res.data.birthday,
              dates: res.data.birthday
            })
          }
        })

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