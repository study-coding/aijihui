// pages/zhuce/zhuce.js
var app = getApp();
var requestUrl = require("../../utils/request.js").requestUrl
Page({

  data: {
    password: '',
    confirmP: '',
    phone: '',
  },

  /**
   * @desc 注册
   */
  resgister: function(){
    let data = {}
    data.phone = this.data.phone + ''
    data.password = this.data.password
    if (this.data.confirmP !== this.data.password) {
      wx.showToast({
        title: '两次密码不一样',
        icon: 'none',
        duration: 2000
      })
    } else{
      wx.request({
        url: requestUrl + '/ajhUser/insertAjhUser',
        method: 'post',
        data: data,
        success(res) {
          if (res.data.flag) {
            wx.showToast({
              title: '注册成功',
              duration: 2000
            })
            wx.navigateTo({
              url: '../loading/loading',
            })
          }
        }
      })
    }
    
  },

  getPassword: function(e){
    this.setData({
      password: e.detail.value
    })
  },

  getPhoneNumber: function(e){
    this.setData({
      phone: e.detail.value
    })
  },

  getConfirmP: function(e){
    this.setData({
      confirmP: e.detail.value
    })
  },

  Submit: function (res) {
    console.log(res);
    wx.navigateTo({
      url: '../Mine/Mine',
    })

  },
  header: {
    'content-type': 'application/json' // 默认值
  },
  success: function (res) {
    console.log(res.data);
    if (res.statusCode == 200) {
      //访问正常
      if (res.data.error == true) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000,
        })
      } else {
        //缓存
        wx.setStorage({
          key: "student",
          data: res.data.student
        });
        wx.showToast({
          title: "登陆成功",
          icon: 'success',
          duration: 20000,
          success: function () {
            setTimeout(function () {
              wx.switchTab({
                url: '../Mine/Mine',
              })
            }, 2000)
          }
        })
      }
    }
  }
})
