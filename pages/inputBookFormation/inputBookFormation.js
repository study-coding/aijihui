// pages/inputBookFormation/inputBookFormation.js
var Cloud = require("../../utils/av-weapp-min.js");
var Books =Cloud.Object.extend("Books");
var query = new Cloud.Query('Books');
var upload = require("../../utils/upload.js");
var getNowTime = require("../../utils/util.js").getNowTime
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: { img: '', bookname: '', author: '', classfy: '', catalogue: '', introduction:''},
    imgData: '',
    brandArray: ['小米', '华为'],
    brandIndex: 0,
    brand: [
      { id: 0},
      { id: 1}

    ],
    degreeIndex: 0,
    degrees: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    typeArray: ['手机', '电脑', '其他'],
    typeIndex: 0,
    type: [
      { id: 0 },
      { id: 1 },
      { id: 2 }
    ],

    formData: {
      useDate: getNowTime(),  // 购买时间
      priPrice: '',    // 原价
      productName: '',   // 商品名字
      kindId: '',    // 种类id
      bandId: '',  // 品牌ID
      degree: '',    // 成色
      isRepair: '',  // 是否维修
      isWater: '',    // 是否进水
      picUrl: '',  // 图片路径
      color: '',     // 颜色 
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  submitBookFormation:function(res){
        console.log(res)
        var that = this;
        if(this.data.book==null){
                var book = new Books();
                // book.set("img",res.detail.value.img);
                // book.set("bookname",res.detail.value.bookname);
                // book.set("author",res.detail.value.author);
                // book.set("introduction", res.detail.value.introduction);
                // book.set("classfy", res.detail.value.classfy);
                // book.set("catalogue", res.detail.value.catalogue);
                for(var attr in res.detail.value){
                    book.set(attr,res.detail.value[attr]);
                }
                book.save().then(function(res){
                    console.log(res);
                    that.setData({
                      book:{}
                    })
                })
        }
        else{
          var book = Cloud.Object.createWithoutData('Books', this.data.book.bookid);
          // 修改属性
          for (var attr in res.detail.value) {
            book.set(attr, res.detail.value[attr]);
          }
          // 保存到云端
          book.save();
        }
  },
  onLoad: function (options) {
      if (options.bookid==undefined){
       
      }
      else{
        console.log("daole")
        var bookid = options.bookid;
        var that = this;
        query.equalTo('objectId', bookid);
        query.find().then(function (res) {
          res[0].attributes.bookid = bookid;
          var book = res[0].attributes
          that.setData({
            book: book,
          })

        })
      }
  },
  /**
   * @des 选择品牌
   */
  brandPickerChange: function (e) {
    this.setData({
      brandIndex: e.detail.value
    })
  },

  /**
   * @des 选择成色
   */
  degreePickerChange: function (e) {
    this.setData({
      degreeIndex: e.detail.value
    })
  },

  /**
   * @des 选择商品类型
   */
  typePickerChange: function (e) {
    this.setData({
      typeIndex: e.detail.value
    })
  },

  chooseImage: function (e) {
    var that = this
    upload.upload().then( res=>{
      wx.request({
        url: 'http://localhost:8080/goods/preview',
        data: {
          imageUrl: res
        },
        success(res) {
          var imgBase64 = res.data;
          imgBase64 = imgBase64.replace(/[\r\n]/g, "")
          that.setData({
            imgData: imgBase64
          })
        }
      })
    })

  },

  /**
   * @desc 删除图片
   */
  deleteImg: function(){
    this.setData({
      imgData: ''
    })
  },
  
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.imgData // 需要预览的图片http链接列表
    })
  },

  /**
   * @desc 选择时间
   */
  bindDateChange: function(e){
    console.log(e.detail.value)
    var str = 'formData.useDate'
    this.setData({
      [str]: e.detail.value
    })
  },

  addPro: function(){
    console.log(this.data.formData, this.data.imgData)
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