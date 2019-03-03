// tools.js
// ========
module.exports = {
  getTime: function () {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var ms = d.getMilliseconds();
    var timestamp = '[' + h + ':' + m + ':' + s + ':' + ms + ']';
    return timestamp;
  },
  sleep: function (milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }
};