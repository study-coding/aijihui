// pages/bookDetail/bookDetail.js
var Cloud = require("../../utils/av-weapp-min.js");
var query = new Cloud.Query('Books')
var requestUrl = require("../../utils/request.js").requestUrl
var getBase64 = require("../../utils/util.js").getBase64
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    goodId: '',
    userId: '',
    detail: {
      producName: '',
      priPrice: '',
      nowPrice: '',
      degree: '',
      picUrl: '',
      color: '',
      kindName: '',
      bandName: '',
    }
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
              that.addCart();
            }
      }
    })

  },

  /**
   * @desc 加入购物车
   */
  addCart: function(){
    let data = {}
    data.productId = this.data.goodId
    data.userId = this.data.userId
    wx.request({
      url: requestUrl + '/ajhCar/addShopCar',
      method: 'post',
      data: data,
      success(res){
        if(res.data){
          wx.switchTab({
            url: '../gouwuche/gouwuche',
          })
        }
      }
    })
  },

  /**
   * @desc 获取详情
   */
  initDetail: function(id){
    let that = this
    wx.request({
      url: requestUrl + '/ajhProduct/getAjhProduct',
      method: 'post',
      data: {
        id: id
      },
      success(res){
        let detail = res.data
        getBase64(detail.picUrl).then(res=>{
          detail.picUrl = res
          that.setData({
            detail: detail
          })
        })
      }
    })
  },

  cancel: function(){
    wx.switchTab({
      url: '../shopping/shopping',
    })
  },

  onLoad: function(e) {
    this.setData({
      goodId: e.id,
    })
    this.initDetail(e.id)
    let that = this
    wx.getStorage({
      key: 'curUserInfo',
      success: function (res) {
        that.setData({
          userId: res.data.id
        })
      }
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