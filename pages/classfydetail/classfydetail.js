// pages/classfydetail/classfydetail.js
var Cloud =require("../../utils/av-weapp-min.js");
var query = new Cloud.Query('Books')
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  tiaozhuanbookdetail(res){
        console.log(res);
        wx.navigateTo({
          url: '../bookDetail/bookDetail?bookid='+res.currentTarget.dataset.bookid,
        })
  },
  onLoad: function (options) {
    var classid=options.id;
    console.log(options);
    var that=this;
    //   wx.request({
    //     url: 'https://www.easy-mock.com/mock/5b28c5669783c04a374a0d4e/woniu/classdetail',
    //   success:function(res){
    //       that.setData({
    //         classdetail:res.data.bookdata,
           
    //       })
    //   }
    //   })
    query.equalTo('classfy',classid);
    query.find().then(function(res){
      var alength=res.length;
      console.log(alength);
      var arr = new Array;
      for(var i=0;i<alength;i++){
        // console.log(res);
        res[i].attributes.bookid=res[i].id;
        arr.push(res[i].attributes);
       console.log(res[i].attributes);
      }
      that.setData({
            classdetail:arr,
          })
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