// pages/pingjia/pingjia.js
var Cloud = require("../../utils/av-weapp-min.js");
var query = new Cloud.Query('Books')
Page({

  /**
   * 页面的初始数据
   */
  data: {
        items:['元气满满','内容精彩','感同身受','无语伦比','干活满满','无语','推荐阅读','思路很独到','很感人'],
        num:0,
        liangs:[true,false,false,false,false]


  },
getnum:function(res){
  console.log(res)
  this.setData({
    num:res.detail.cursor
  })
},
dianliang: function (res) {
  var liangs=this.data.liangs;
  console.log(liangs);
  liangs[res.currentTarget.dataset.key] = !liangs[res.currentTarget.dataset.key];
  for (var i = 0; i <= res.currentTarget.dataset.key;i++){
    if (liangs[res.currentTarget.dataset.key]==true) {
          liangs[i]=true
    } 
    else{
      for (var j = res.currentTarget.dataset.key+1;j<=4;j++)
      liangs[j]=false;
    }
  }
 
  console.log(liangs);
 this.setData({
   liangs: liangs
 })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
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