// pages/bookDetail/bookDetail.js
var Cloud = require("../../utils/av-weapp-min.js");
var query = new Cloud.Query('Books')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  swich: function(res) {
    console.log(res);
    this.setData({
      currentTab: res.currentTarget.dataset.current
    })
  },
  addorCancel: function() {
    var that =this;
    wx.showModal({
      title: '提示',
      content: '是否加入',
      success:function(res){
            if(res.confirm){
              wx.switchTab({
                url: '../gouwuche/gouwuche',
              })
            }
      }
    })

  },
  onLoad: function(options) {
    var bookid = options.bookid;
    var that = this;
    query.equalTo('objectId', bookid);
    query.find().then(function(res) {
      res[0].attributes.bookid=bookid;
      var book = res[0].attributes
      var catalogue = book.catalogue.split("#");
      that.setData({
        bookdetail: book,
        catalogue: catalogue,
        flag:book.addflag
      })

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