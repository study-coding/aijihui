// pages/shopping/shopping.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  tiaozhuanclass:function(res){
    console.log(res);
      wx.navigateTo({
        url: '../classfydetail/classfydetail?id='+res.currentTarget.dataset.bookid,
      })
  },
  onLoad: function (options) {
    var that =this;
    wx.request({
      url: 'https://www.easy-mock.com/mock/5b28c5669783c04a374a0d4e/woniu/classfy',
      success:function(res){
        that.setData({
          satisfycontent:res.data.cdata,
        })
        console.log(that.data.satisfycontent);
      }
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