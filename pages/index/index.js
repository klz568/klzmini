// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    inputValue: ""
  },

  isValid: function(str) {
    var reg = /[\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F]/;
    return reg.test(str)
  },

  etozTap: function() {
    let str = this.data.inputValue
    var tmp = '';
    for(var i=0;i<str.length;i++) {
      if(this.isValid(str[i])){
        tmp += String.fromCharCode(str.charCodeAt(i)+65248)
      } else{
        tmp += str[i]
      }
    }
    this.setData({
      inputValue:tmp
    })
    wx.showToast({
      title: '转换成功',
      icon: 'none'
    })
  },

  ztoeTap: function() {
    let str = this.data.inputValue
    var tmp = "";
    for(var i=0;i<str.length;i++){
      if(str.charCodeAt(i) >= 65281 && str.charCodeAt(i) <= 65374){// 如果位于全角！到全角～区间内
        tmp += String.fromCharCode(str.charCodeAt(i)-65248)
      }else if(str.charCodeAt(i) == 12288){//全角空格的值，它没有遵从与ASCII的相对偏移，必须单独处理
        tmp += ' ';
      }else{// 不处理全角空格，全角！到全角～区间外的字符
        tmp += str[i];
      }
    }
    this.setData({
      inputValue:tmp
    })
    wx.showToast({
      title: '转换成功',
      icon: 'none'
    })
  },

  copyTap: function() {
    let key = this.data.inputValue;
    wx.setClipboardData({ //设置系统剪贴板的内容
      data: key,
      success(res) {
        console.log(res, key);
        wx.getClipboardData({ // 获取系统剪贴板的内容
          success(res) {
            wx.showToast({
              title: '复制成功',
            })
          }
        })
      }
    })
  },

  wrapTap: function() {
    const pattern = /[一二三四五六七八九十]|([1-9][0-9]*)[、.]/g
    var str = this.data.inputValue
    const result = str.match(pattern)
    console.log(result)
    var newStr = ''
    var index  = 0
    for (var i in result) {
      let replaceStr = result[i]
      if (i > 0) {
        index = str.indexOf(replaceStr)
        if (str.substr(index-1,1) != '\n') {
          str = str.substr(0, index) + "\n" + str.substr(index);
        }
      }
      let toindex = str.indexOf(replaceStr) + replaceStr.length
      if (i == result.length - 1) {
        newStr = newStr+str
      } else {
        newStr = newStr+str.substr(0,toindex)
      }
      str = str.substr(toindex)
      console.log(str)
    }
    this.setData({
      inputValue: newStr
    })
    console.log(this.data.inputValue)
  },

  bindinput: function (e) {
    console.log(e.detail.value)
    this.setData({
      inputValue: e.detail.value
    })
  }

})
