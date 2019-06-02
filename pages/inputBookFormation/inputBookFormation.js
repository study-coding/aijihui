// pages/inputBookFormation/inputBookFormation.js
var Cloud = require("../../utils/av-weapp-min.js");
var Books =Cloud.Object.extend("Books");
var query = new Cloud.Query('Books');
var upload = require("../../utils/upload.js");
var getNowTime = require("../../utils/util.js").getNowTime
var getBase64 = require("../../utils/util.js").getBase64
var requestUrl = require("../../utils/request.js").requestUrl 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: { img: '', bookname: '', author: '', classfy: '', catalogue: '', introduction:''},
    imgData: '',
    brandArray: [],
    brandIndex: 0,
    brand: [],
    degreeIndex: 0,
    degrees: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    typeArray: [],
    typeIndex: 0,
    type: [],

    formData: {
      useDate: getNowTime(),  // 购买时间
      priPrice: '',    // 原价
      productName: '',   // 商品名字
      kindId: '',    // 种类id
      bandId: '',  // 品牌ID
      degree: '1',    // 成色
      isRepair: '1',  // 是否维修
      isWater: '1',    // 是否进水
      picUrl: '',  // 图片路径
      color: '',     // 颜色 
      userId: ''
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
    var str = 'formData.bandId'
    this.setData({
      brandIndex: e.detail.value,
      [str]: this.data.brand[e.detail.value].id

    })
  },

  /**
   * @des 选择成色
   */
  degreePickerChange: function (e) {
    var str = 'formData.degree'
    this.setData({
      degreeIndex: e.detail.value,
      [str]: this.data.degrees[e.detail.value]

    })
  },

  /**
   * @des 选择商品类型
   */
  typePickerChange: function (e) {
    var str = 'formData.kindId'
    var str1 = 'formData.bandId'
    this.setData({
      typeIndex: e.detail.value,
      [str]: this.data.brand[e.detail.value].id,
      brandIndex: 0,
      str1: ''
    })
    this.initBrand(this.data.type[e.detail.value].id) 
  },

  chooseImage: function (e) {
    var that = this
    var str = 'formData.picUrl'
    upload.upload(getBase64).then( res=>{
      that.setData({
        [str]: res
      })
      getBase64(res).then(res => {
        that.setData({
          imgData: res
        })
      })
    })

  },

  /**
   * @desc 删除图片
   */
  deleteImg: function(){
    var str = 'formData.picUrl'
    this.setData({
      imgData: '',
      [str]: ''
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

  /**
   * @desc 设置商品名
   */
  setProductName: function(e){
    var str = 'formData.productName'
    this.setData({
      [str]: e.detail.value
    })
  },

  /**
   * @desc 设置原价
   */
  setPriPrice: function(e){
    var str = 'formData.priPrice'
    this.setData({
      [str]: e.detail.value
    })
  },

  /**
   * @desc 设置是否进水
   */
  waterChange: function(e){
    var str = 'formData.isWater'
    this.setData({
      [str]: e.detail.value
    })
  },

  /**
   * @desc 设置是否维修
   */
  repairChange: function (e) {
    var str = 'formData.isRepair'
    this.setData({
      [str]: e.detail.value
    })
  },

  /**
   * @desc 设置颜色
   */
  setColor: function(e){
    var str = 'formData.color'
    this.setData({
      [str]: e.detail.value
    })
  },

  addPro: function(){
    console.log(this.data.formData)
    let data = this.data.formData
    data.bandId = this.data.brand[this.data.brandIndex].id
    data.kindId = this.data.type[this.data.typeIndex].id
    wx.getStorage({
      key: 'curUserInfo',
      success: function(res) {
        data.userId = res.data.id
        wx.request({
          url: requestUrl + '/ajhProduct/insertAjhProduct',
          method: 'post',
          data: data,
          success(res) {
            console.log(res)
            if (res.data) {
              wx.switchTab({
                url: '../Mine/Mine'
              })
            }
          }
        })
      },
    })
    
  },

  /**
   * @desc 初始化商品类型
   */
  initType: function(){
    let that = this
    wx.request({
      url: requestUrl + '/ajhProduct/initProduct',
      method: 'get',
      success(res) {
        let list = []
        res.data.kind.forEach(v=>{
          list.push(v.kindName);
        })
        that.setData({
          typeArray: list,
          type: res.data.kind,
        })
        that.initBrand(res.data.kind[0].id)
      }
    })
  },

  /**
  * @desc 类型改变品牌改变
  */
  initBrand: function (kindId) {
    let that = this
    wx.request({
      url: requestUrl + '/ajhProduct/changeBandList',
      method: 'post',
      data: {
        fatherId: kindId
      },
      success(res) {
        let bandList = []
        res.data.forEach(v => {
          bandList.push(v.bandName);
        })
        that.setData({
          brandArray: bandList,
          brand: res.data
        })
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
    this.initType();
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