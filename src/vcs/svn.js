var exec = require('child_process').exec;
var path = require('path');
var Promise = require('bluebird');
var xml2js = require("xml2js");


module.exports = function(file) {
  var realFile = path.basename(file);
  var cwd = path.dirname(file);

  function parseResult(buffer, resolve, reject) {
    xml2js.parseString(buffer, function(err, result) {
      if (err) {
        reject({
          error: err
        });
      } else {
        var json = {},
          res = {};
        if (result.blame.target[0].entry) {
          result.blame.target[0].entry.forEach(function(line) {
            json[line.$['line-number']] = {
              rev: line.commit[0].$.revision,
              author: line.commit[0].author[0],
              date: line.commit[0].date[0],
              line: line.$['line-number']
            };
          });
        }
        res[file] = json;
        resolve(res);
      }
    });
  }

  return new Promise(function(resolve, reject) {
    exec('svn blame ' + realFile + ' --xml', {
      cwd: cwd,
      maxBuffer: 1024 * 1024
    }, function(error, stdout, stderr) {
      if (error) {
        reject({
          error: error,
          message: stderr
        });
      } else {
        parseResult(stdout, resolve, reject);
      }
    });
  });

};
