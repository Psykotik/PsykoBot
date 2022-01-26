// tools.js
// ========
module.exports = {
  getTime: function () {
    var d = new Date();
    var h = ("00" + d.getHours()).substr(-2, 2);
    var m = ("00" + d.getMinutes()).substr(-2, 2);
    var s = ("00" + d.getSeconds()).substr(-2, 2);
    var ms = ("000" + d.getMilliseconds()).substr(-3, 3);
    var timestamp = '[' + h + ':' + m + ':' + s + '.' + ms + ']';
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
          console.log(module.exports.getTime() + " Directory " + path + " has been created");
          dirCreated = 1;
        }
      });
    } else {
      console.log(module.exports.getTime() + " Directory " + path + " already exist");
      dirCreated = 2;
    }
    return dirCreated;
  },


  logBoot: function () {   // This files log boot time, for more accurate uptime function

    var timestamp = new Date();
    var timestampMS = Date.now();

    var dirPath = "miscallenous";
    var fileName = "bootTime.json";

    module.exports.createDir(dirPath);

    var fs = require("fs");
    var Object = {
      bootTimestamp: timestamp,
      bootTimestampMS: timestampMS
    };

    fs.writeFile(dirPath + "/" + fileName, JSON.stringify(Object, null, 4), (err) => {
      if (err) {
        console.error(err);
        return;
      };
      console.log(module.exports.getTime() + " File " + dirPath + "/" + fileName + " has been created");
    });
  },


  createLogFile: function (text) { // This function create the file for the current instance


    var dirPath = "miscallenous";
    var fileName = "log.txt";
    var fs = require("fs");

    console.log(text);

    fs.writeFile(dirPath + "/" + fileName, text + "\n", (err) => {
      if (err) {
        console.error(err);
        return;
      };
      console.log(module.exports.getTime() + " File " + dirPath + "/" + fileName + " has been created");
    });
  },


  appendLogFile: function (text) { // This function append a new line each time it's called
    var d = new Date();
    var year = d.getFullYear();
    var month = ("00" + (d.getMonth() + 1)).substr(-2, 2);
    var day = ("00" + d.getDate()).substr(-2, 2);
    var hour = ("00" + d.getHours()).substr(-2, 2);
    var mins = ("00" + d.getMinutes()).substr(-2, 2);
    var secs = ("00" + d.getSeconds()).substr(-2, 2);
    var ms = ("000" + d.getMilliseconds()).substr(-3, 3);

    var dirPath = "miscallenous";
    //var fileName = "log " + year + "_" + month + "_" + day + "-" + hour + "" + mins + "" + secs + "" + ms + ".txt";
    var fileName = "log.txt";
    var fs = require("fs");

    console.log(text);

    fs.appendFile(dirPath + "/" + fileName, text + "\n", function (err) {
      if (err) throw err;
      //console.log('Saved!');
    });
  }
};