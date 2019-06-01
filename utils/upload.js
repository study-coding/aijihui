var app = getApp();
const uploadPath = "http://cx5sm9.natappfree.cc/goods/upload"

const upload = () => {
  return new Promise((resolve, rej) =>{
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: uploadPath,
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': app.globalData.userInfo.nickName
          },
          success: function (res) {
            var data = res.data
            return resolve(data);
          }
        })
      }
    })
  })  
}

module.exports.upload = upload;