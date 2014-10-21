var exec = require('child_process').exec;
var path = require('path');
var Promise = require('bluebird');


module.exports = function (file) {
    var realFile = path.basename(file);
    var cwd = path.dirname(file);

    function parseResult(buffer) {
        
    }

    return new Promise(function (resolve, reject) {
        exec('svn blame ' + realFile + ' --xml', {cwd: cwd}, function (error, stdout, stderr) {
            var result = {}, lines;
            if (error) {
                reject({
                    error: error,
                    message: stderr
                });
            } else {
                resolve(parseResult(stdout));
            }
        });
    });

};