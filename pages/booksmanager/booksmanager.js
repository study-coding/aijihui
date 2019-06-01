// pages/booksmanager/booksmanager.js
var Cloud = require("../../utils/av-weapp-min.js");
var query = new Cloud.Query('Books')

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
  
    isselected1: true,
    isselected2: false,
    ifdown:false,
    deletebooks:'',
    scbooksid:''
  },
  onclick1: function () {
    this.setData({
      isselected1: true,
      isselected2: false
    })
  },
  onclick2: function () {
    this.setData({
      isselected2: true,
      isselected1: false
    })
  },
  onclickdown:function(res){

    var books =this.data.books;
    books[res.currentTarget.dataset.key].changexia = !this.data.books[res.currentTarget.dataset.key].changexia;
    console.log(books[res.currentTarget.dataset.key].changexia);
    this.setData({
      books:books
    })
  },
onclickdown2: function (res) {

    var scbooks = this.data.scbooks;
    scbooks[res.currentTarget.dataset.key].changexia = !this.data.scbooks[res.currentTarget.dataset.key].changexia;
   
    this.setData({
      scbooks: scbooks
    })
  },
  pingjia:function(res){
        console.log(res)
        //res.currentTarget.dataset.key
        wx.navigateTo({
          url: '../pingjia/pingjia?bookid=' + this.data.scbooks[res.currentTarget.dataset.key].bookid,
        })
  },
  deleteone:function(res){
    // 执行 CQL 语句实现删除一个 Todo 对象
   
   
    var that = this;
    var key = res.currentTarget.dataset.key;
    var bookid = this.data.books[key].bookid;
    var books = this.data.books;
      wx.showModal({
        title: '提示',
        content: '是否删除',
        success:function(res){
          if(res.confirm){
            var todo = Cloud.Object.createWithoutData('Books', bookid);
            todo.destroy().then(function (success) {
              // 删除成功
              books.splice(key, 1);
              that.setData({
                books: books
              })
              console.log(that.data.books);
            }, function (error) {
              // 删除失败
            });
          }
        }
      })
          
    
  },
  remove:function(res){

    var that = this;
    var key = res.currentTarget.dataset.key;
    console.log(key);
    var bookid = this.data.scbooks[key].bookid;
    var scbooks = this.data.scbooks;
    wx.showModal({
      title: '提示',
      content: '是否取消',
      success: function (res) {
        if (res.confirm) {
          console.log(bookid)
          var book = Cloud.Object.createWithoutData('Books', bookid);
            book.set('addflag',false);
            book.save().then(function (res) {
            console.log(res);
            scbooks.splice(key,1)
            that.setData({
              scbooks: scbooks,
            })
          })
        }
      }
    })

  },
  checkboxChange:function(res){
    console.log(res);
    this.setData({
      deletebooks:res.detail.value
    })
  },
  checkboxChange2: function (res) {
    console.log(res);
    this.setData({
      scbooksid : res.detail.value
    })
  },
  piLiangDelete:function(){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否删除所有信息',
      success:function(res){
        if(res.confirm){
          var objects = [];
          var deletebooks = that.data.deletebooks;
          console.log(deletebooks);
          var dlength = deletebooks.length;
   
          var books = that.data.books;
          var ylength = books.length;
          for (var i = 0; i < dlength; i++) {
            var book = new Cloud.Object.createWithoutData('Books', deletebooks[i]);
            objects.push(book);
          }
          Cloud.Object.destroyAll(objects).then(function () {
            for (var i = 0; i < ylength; i++) {
              for (var j = 0; j < dlength; j++) {
                if (books[i].bookid == deletebooks[j]) {
                  books.splice(i, 1);
                  ylength--;
                  i--;
                  break;
                }

              }
            }
            that.setData({
              books: books
            })
          }, function (error) {
            // 异常处理
          });
        }
      }
    })
  
  },
  edit:function(res){
     wx.navigateTo({
       url: '../inputBookFormation/inputBookFormation?bookid='+res.currentTarget.dataset.book.bookid,
     })   
     console.log(res.currentTarget.dataset.book);
  },
  piLiangremove:function(){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否取消选中信息',
      success: function (res) {
        if (res.confirm) {
          var objects = [];
          console.log(that.data.scbooksid);
          var scbooksid = that.data.scbooksid;
          var sclength = scbooksid.length;
         
          var scbooks = that.data.scbooks;
          var ylength = scbooks.length;
          for (var i = 0; i < sclength; i++) {
            var book = new Cloud.Object.createWithoutData('Books', scbooksid[i]);
            book.set("addflag",false);
            objects.push(book);
          }
          Cloud.Object.saveAll(objects).then(function () {
            for (var i = 0; i < ylength; i++) {
              for (var j = 0; j < sclength; j++) {
                if (scbooks[i].bookid == scbooksid[j]) {
                   scbooks.splice(i, 1);
                  ylength--;
                  i--;
                  break;
                }

              }
            }
            that.setData({
              scbooks: scbooks
            })
          }, function (error) {
            // 异常处理
          });
        }
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    var that = this;
    query.find().then(function (res) {
      console.log(res);
      var arr = [];
      var shoucang=[]
      var length = res.length;
   
      for (var i = 0; i < res.length; i++) {
        var date = '';
        res[i].attributes.bookid = res[i].id;//加id
        date= res[i].createdAt.getFullYear() + '-' + (res[i].createdAt.getMonth() + 1) + '-' + res[i].createdAt.getDate();
        console.log(date);
        res[i].attributes.gouxuan = false;//构选
        res[i].attributes.changexia = false;
        res[i].attributes.date=date;
        arr.push(res[i].attributes);
        if (res[i].attributes.addflag==true){
          shoucang.push(res[i].attributes);
        }
      }
      that.setData({
        books: arr,
        scbooks:shoucang
      })
      // console.log(that.data.books);
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