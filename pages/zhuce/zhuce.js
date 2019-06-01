// pages/zhuce/zhuce.js
Page({

  data: {
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
