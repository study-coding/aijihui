const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getNowTime = () => {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  if (month < 10) {
    month = '0' + month;
  };
  if (day < 10) {
    day = '0' + day;
  };
  //  如果需要时分秒，就放开
  // var h = now.getHours();
  // var m = now.getMinutes();
  // var s = now.getSeconds();
  var formatDate = year + '-' + month + '-' + day;
  return formatDate;
} 

/**
 * @desc 图片路径去请求base64
 * @param imgUrl
 * @return imgBase64
 */
var requestUrl = require("./request.js").requestUrl 
const getBase64 = (imgUrl) => {
  return new Promise((resolve, rej) => {
    wx.request({
      url: requestUrl + '/goods/preview',
      data: {
        imageUrl: imgUrl
      },
      success(res) {
        var imgBase64 = res.data;
        if(!imgBase64) return resolve();
        imgBase64 = imgBase64.replace(/[\r\n]/g, "")
        return resolve(imgBase64)
      }
    })
  })
}


module.exports = {
  formatTime: formatTime,
  getNowTime: getNowTime,
  getBase64: getBase64
}
