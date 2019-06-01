// pages/shopping/shopping.js
const upload = require("../../utils/upload.js")
const getBase64 = require("../../utils/util.js").getBase64
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodList: [
      { id: '1', name: 'ipd转卖', price: '2000', priPrice: '1300', imgUrl: 'C:/Users/pppjx/Desktop/img/ipad.png'},
      { id: '2', name: 'iphone7转卖', price: '2000', priPrice: '1300', imgUrl: 'C:/Users/pppjx/Desktop/img/iphone7.png' },
      { id: '3', name: 'iphone8转卖', price: '2000', priPrice: '1300', imgUrl: 'C:/Users/pppjx/Desktop/img/iphone8.png' },
      { id: '4', name: 'iphoneX转卖', price: '2000', priPrice: '1300', imgUrl: 'C:/Users/pppjx/Desktop/img/iphoneX.png' }
    ]
  
  },


  /**
   * @desc 展示图片
   */
  previewImage: function(imgUrl){
    return new Promise((resolve, rej) =>{
      getBase64(imgUrl).then(res => {
        return resolve(res)
      })
    })
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
   * @desc 跳转详情
   */
  displayDetail: function(e){
    wx.navigateTo({
      url: '../bookDetail/bookDetail',
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
    let list = JSON.parse(JSON.stringify(this.data.goodList));
    let time = 0;
    this.data.goodList.forEach((item, index) => {
      let i = index
      that.previewImage(item.imgUrl).then(res => {
        list[i].imgUrl = res;
        let str = "goodList[" + i + "].imgUrl" + ""
        that.setData({
          [str]: res
        })
        time++;
        if(time == list.length){
          that.setData({
            goodList: list
          })
        }
      })
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