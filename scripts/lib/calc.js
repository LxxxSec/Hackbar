window.Calc = {}

window.Calc.calc = {
  //10->16
  decimalToHex: value => {
    var hex = "";
    var hexChars = "0123456789ABCDEF";
    while (value > 0) {
        hex = hexChars[value % 16] + hex;
        value = Math.floor(value / 16);
    }
    return hex;
  },
  //10->8
  decimalToOctal: value => {
    var octal = "";
    while (value > 0) {
        octal = (value % 8) + octal;
        value = Math.floor(value / 8);
    }
    return octal;
  },
  //10->2
  decimalToBinary: value => {
    var binary = "";
    while (value > 0) {
        binary = (value % 2) + binary;
        value = Math.floor(value / 2);
    }
    return binary;
  },
  //16->10
  hexToDecimal: value => {
    return parseInt(value, 16);
  },
  //8->10
  octalToDecimal: value => {
    return parseInt(value, 8);
  },
  //2->10
  binaryToDecimal: value => {
    return parseInt(value, 2);
  },
}