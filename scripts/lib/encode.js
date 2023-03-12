window.Encode = {}

window.Encode.URL = {
  encode: value => encodeURIComponent(value),
  fullencode: value => {
    return value.replace(/./gs, (char) => {
      return '%' + char.charCodeAt(0).toString(16);
    })
  },
  decode: value => decodeURIComponent(value),
  decodePlus: value => decodeURIComponent(value.replaceAll('+', ' '))
}

window.Encode.Str = {
  strlen: value => value.length
}

window.Encode.Rot13 = {
  rot13: value => {
    function rot13(string) {
      // 对字符串中的每个字符进行编码
      return string.replace(/[a-zA-Z]/g, function(character) {
        // 将字符转换为ASCII码值
        var asciiCode = character.charCodeAt(0);
    
        // 如果是小写字母
        if (asciiCode >= 97 && asciiCode <= 122) {
          // 将ASCII码值向后移动13位
          asciiCode = (asciiCode - 97 + 13) % 26 + 97;
        }
        // 如果是大写字母
        else if (asciiCode >= 65 && asciiCode <= 90) {
          // 将ASCII码值向后移动13位
          asciiCode = (asciiCode - 65 + 13) % 26 + 65;
        }
    
        // 将ASCII码值转换为字符
        return String.fromCharCode(asciiCode);
      });
    }
    return rot13(value);
  }
}

window.Encode.Trim = {
  trim: value => {
    if (value.length === 0 ){
        return value;
    } else {
        return value.replace(/\s+/g, '');
    }
  }
}

window.Encode.Base64 = {
  encode: value => {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(value))
  },

  decode: value => {
    const wordArray = CryptoJS.enc.Base64.parse(value)

    let result = null
    try {
      result = CryptoJS.enc.Utf8.stringify(wordArray)
    } catch (error) {
      result = CryptoJS.enc.Latin1.stringify(wordArray)
    }

    return result
  }
}

window.Encode.Hexadecimal = {
  encode: value => {
    return CryptoJS.enc.Hex.stringify(CryptoJS.enc.Utf8.parse(value))
  },

  decode: value => {
    const wordArray = CryptoJS.enc.Hex.parse(value)

    let result = null
    try {
      result = CryptoJS.enc.Utf8.stringify(wordArray)
    } catch (error) {
      result = CryptoJS.enc.Latin1.stringify(wordArray)
    }

    return result
  }
}

window.Encode.Unicode = {
  encode: value => {
    return value.replace(/./gs, (char) => {
      return '\\u' + ('000' + char.charCodeAt().toString(16)).slice(-4)
    })
  },

  decode: value => {
    return value.replace(/\\u.{4}/g, (str) => {
      return String.fromCharCode(parseInt(str.substring(2, 6), 16))
    })
  }
}

window.Encode.Html = {
  encode: value => {
    return value.replace(/./gs, (char) => {
      return '&#x' + char.charCodeAt().toString(16) + ';'
    })
  },

  decode: value => {
    return value.replace(/&#x.{1,2};/g, (str) => {
      return String.fromCharCode(parseInt(str.substring(3, str.length - 1), 16))
    })
  }
}

window.Encode.CharCode = {
  encode: value => {
    return 'String.fromCharCode(' + value.split('').map((char) => {
      return char.charCodeAt()
    }).join(',') + ')'
  },

  decode: value => {
    return value.substring(20, value.length - 1).split(',').map((charCode) => {
      return String.fromCharCode(charCode)
    }).join('')
  }
}

//下面都是Base32编码和解码的代码了
window.Encode.Base32 = {
  encode: value => {
      const Base64 = {
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        encode: function (e) {
            var t = "";
            var n, r, i, s, o, u, a;
            var f = 0;
            e = Base64._utf8_encode(e);
            while (f < e.length) {
                n = e.charCodeAt(f++);
                r = e.charCodeAt(f++);
                i = e.charCodeAt(f++);
                s = n >> 2;
                o = (n & 3) << 4 | r >> 4;
                u = (r & 15) << 2 | i >> 6;
                a = i & 63;
                if (isNaN(r)) {
                    u = a = 64
                } else if (isNaN(i)) {
                    a = 64
                }
                t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
            }
            return t
        },
        decode: function (e) {
            var t = "";
            var n, r, i;
            var s, o, u, a;
            var f = 0;
            e = e.replace(/[^A-Za-z0-9+/=]/g, "");
            while (f < e.length) {
                s = this._keyStr.indexOf(e.charAt(f++));
                o = this._keyStr.indexOf(e.charAt(f++));
                u = this._keyStr.indexOf(e.charAt(f++));
                a = this._keyStr.indexOf(e.charAt(f++));
                n = s << 2 | o >> 4;
                r = (o & 15) << 4 | u >> 2;
                i = (u & 3) << 6 | a;
                t = t + String.fromCharCode(n);
                if (u != 64) {
                    t = t + String.fromCharCode(r)
                }
                if (a != 64) {
                    t = t + String.fromCharCode(i)
                }
            }
            t = Base64._utf8_decode(t);
            return t
        },
        _utf8_encode: function (e) {
            e = e.replace(/rn/g, "n");
            var t = "";
            for (var n = 0; n < e.length; n++) {
                var r = e.charCodeAt(n);
                if (r < 128) {
                    t += String.fromCharCode(r)
                } else if (r > 127 && r < 2048) {
                    t += String.fromCharCode(r >> 6 | 192);
                    t += String.fromCharCode(r & 63 | 128)
                } else {
                    t += String.fromCharCode(r >> 12 | 224);
                    t += String.fromCharCode(r >> 6 & 63 | 128);
                    t += String.fromCharCode(r & 63 | 128)
                }
            }
            return t
        },
        _utf8_decode: function (e) {
            var t = "";
            var n = 0;
            var r = c1 = c2 = 0;
            while (n < e.length) {
                r = e.charCodeAt(n);
                if (r < 128) {
                    t += String.fromCharCode(r);
                    n++
                } else if (r > 191 && r < 224) {
                    c2 = e.charCodeAt(n + 1);
                    t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                    n += 2
                } else {
                    c2 = e.charCodeAt(n + 1);
                    c3 = e.charCodeAt(n + 2);
                    t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                    n += 3
                }
            }
            return t
        }
    }

    //  字符串转base64位的编码格式方法
    function stringToBase64(srcString){
        if (!srcString) {
            return '';
        }
        return Base64.encode(srcString);
    }
    //  字符串转base32位的编码格式方法
    function base32Encode(srcString) {
      if (!srcString) {
          return '';
      }

      let BASE32CHAR = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
      let i = 0;
      let index = 0;
      let digit = 0;
      let currByte;
      let nextByte;
      let retrunString = '';
      // 先进行utf8编码，否则中文的字符串转码有问题
      srcString = Base64._utf8_encode(srcString);

      for (let i = 0; i < srcString.length;) {
          currByte = (srcString.charCodeAt(i) >= 0) ? srcString.charCodeAt(i)
              : (srcString.charCodeAt(i) + 256);

          if (index > 3) {
              if ((i + 1) < srcString.length) {
                  nextByte = (srcString.charCodeAt(i + 1) >= 0)
                      ? srcString.charCodeAt(i + 1)
                      : (srcString.charCodeAt(i + 1) + 256);
              } else {
                  nextByte = 0;
              }

              digit = currByte & (0xFF >> index);
              index = (index + 5) % 8;
              digit <<= index;
              digit |= (nextByte >> (8 - index));
              i++;
          } else {
              digit = (currByte >> (8 - (index + 5))) & 0x1F;
              index = (index + 5) % 8;

              if (index == 0) {
                  i++;
              }
          }

          retrunString = retrunString + BASE32CHAR.charAt(digit);
      }

      // 不满8位的需要进行补“=”号，这是base32转码的规范
      while((retrunString.length % 8) !== 0){
          retrunString += "=";
      }

      return retrunString;
    }
    return base32Encode(value);
  },
  decode: value => {
    function stringFromUTF8Array(data){
      var extraByteMap = [ 1, 1, 1, 1, 2, 2, 3, 0 ];
      var count = data.length;
      var str = "";
      
      for (var index = 0;index < count;) {
          var ch = data[index++];
          if (ch & 0x80) {
              var extra = extraByteMap[(ch >> 3) & 0x07];
              if (!(ch & 0x40) || !extra || ((index + extra) > count)) return null;
              ch = ch & (0x3F >> extra);
              for (;extra > 0;extra -= 1) {
                  var chx = data[index++];
                  if ((chx & 0xC0) != 0x80) return null;
                  ch = (ch << 6) | (chx & 0x3F);
              }
          }
          str += String.fromCharCode(ch);
      }
      return str;
    }
    function base32Decode(encodedStr){
      encodedStr = encodedStr.replace(/\=+?$/g, '');
      var base32Table = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
      "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", 
      "2", "3", "4", "5", "6", "7"];
      var intCode = function (chr){return base32Table.indexOf(chr.toUpperCase());};
      var toBinary = function (dec){return dec.toString(2);};
      var toDec = function (binStr){return parseInt(binStr, 2);};

      var strlen = encodedStr.length, pos = 0;
      var binStr = '', bytes = [];
      
      while (pos < strlen) {
          binStr += toBinary(intCode(encodedStr[pos])).padStart(5, '0');//将索引转为二进制串,补足5位。
          pos++;
          if (binStr.length < 8) { //小于8位长度则继续往下拼接。
              continue;
          }
          bytes.push(toDec(binStr.substring(0, 8)));//取8位二进制字符串转为整数。
          binStr = binStr.substring(8);//余下的二进制串作为下一次拼接的开始串。
      }
      var toAsciiStr = function (bytesArray){
          //Only for ASCII characters converting.
          var str = '';
          while (bytesArray.length > 0 ) {
              //String.fromCharCode() parameters sequence should be less than 65535
              str += String.fromCharCode.apply(null, bytesArray.splice(0,65535));
          }
          return str;
      }
      //return toAsciiStr(bytes);
      return stringFromUTF8Array(bytes);
    }
    return base32Decode(value);
  }
}