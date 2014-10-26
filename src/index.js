var svn = require('./vcs/svn');

svn('/home/apk/workspace/CTCMobile/README.md').then(function (result) {
    console.log("Session: %j", result);
});