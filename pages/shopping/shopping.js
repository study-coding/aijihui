// pages/shopping/shopping.js
const upload = require("../../utils/upload.js")
const getBase64 = require("../../utils/util.js").getBase64
const requestUrl = require("../../utils/request.js").requestUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodList: [],
    brandArray: [],
    brandIndex: 0,
    brand: [],
    degreeIndex: 0,
    degrees: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    typeArray: [],
    typeIndex: 0,
    type: [],
    searchParam: {
      productName: '',
      kindId: '',
      bandId: '',
      degree: '',
      pageNo: '100',
      pageSize: '1'
    },
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
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../bookDetail/bookDetail?id=' + e.currentTarget.dataset.id,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * @desc 转picUrl
   */
  toPicUrl: function (goodList){
    let that = this
    let list = JSON.parse(JSON.stringify(goodList));
    let time = 0;
    goodList.forEach((item, index) => {
      let i = index
      that.previewImage(item.picUrl).then(res => {
        list[i].picUrl = res;
        time++;
        if (time == list.length) {
          that.setData({
            goodList: list
          })
        }
      })
    })
  },

  getProName: function(e){
    var str = 'searchParam.productName'
    let that = this
    this.setData({
      [str]: e.detail.value
    })
  },

  searchName: function(e){
    this.initProList
  },

  /**
   * @desc 获取商品列表
   */
  initProList: function(){
    let that = this
    let data = this.data.searchParam
    data.kindId = data.kindId + ''
    data.bandId = data.bandId + ''
    data.degree = data.degree + ''
    wx.request({
      url: requestUrl + '/ajhProduct/listAjhProduct',
      method: 'post',
      data: data,
      success(res){
        that.setData({
          goodList: []
        }, that.toPicUrl(res.data.pagination))
        
      }
    })
  },

  /**
   * @des 选择成色
   */
  degreePickerChange: function (e) {
    var str = 'searchParam.degree'
    var that = this;
    this.setData({
      degreeIndex: e.detail.value,
      [str]: this.data.degrees[e.detail.value]
    }, that.initProList)
  },

  /**
   * @des 选择品牌
   */
  brandPickerChange: function (e) {
    var str = 'searchParam.bandId'
    let that = this
    this.setData({
      brandIndex: e.detail.value,
      [str]: this.data.brand[e.detail.value].id

    }, that.initProList)
  },

  /**
   * @des 选择商品类型
   */
  typePickerChange: function (e) {
    var str = 'searchParam.kindId'
    var str1 = 'searchParam.bandId'
    this.setData({
      typeIndex: e.detail.value,
      [str]: this.data.type[e.detail.value].id,
      brandIndex: 0,
      [str1]: ''
    })
    console.log(1111)
    this.initBrand(this.data.type[e.detail.value].id)
  },

  /**
   * @desc 初始化商品类型
   */
  initType: function () {
    let that = this
    wx.request({
      url: requestUrl + '/ajhProduct/initProduct',
      method: 'get',
      success(res) {
        let list = []
        res.data.kind.forEach(v => {
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
        }, that.initProList())
      }
    })
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