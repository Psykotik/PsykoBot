// tools.js
// ========
module.exports = {
  getTime: function () {
    var d = new Date();
    var h = d.getHours();
    h = ("00" + h).substr(-2,2);
    var m = d.getMinutes();
    m = ("00" + m).substr(-2,2);
    var s = d.getSeconds();
    s = ("00" + s).substr(-2,2);
    var ms = d.getMilliseconds();
    ms = ("000" + ms).substr(-3,3);
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
  },
  createDir: function (path) {
    var dirCreated = 0;

    const fs = require("fs");
    if (!fs.existsSync(path)) {
      var mkdirp = require('mkdirp');
      mkdirp(path, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("dir created");
          dirCreated = 1;
        }
      });
    } else {
      console.log("dir already exist");
      dirCreated = 2;
    }

    return dirCreated;
  },
  createFile: function (filename) {
    var filenameCreated = 0
    
  }
};