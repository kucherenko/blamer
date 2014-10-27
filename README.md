Blamer
======

Blamer is a tool for get information about author of code from version control system. Supports git and subversion.

Status
------
[![Build Status](https://travis-ci.org/kucherenko/blamer.svg?branch=master)](https://travis-ci.org/kucherenko/blamer)
[![Coverage Status](https://img.shields.io/coveralls/kucherenko/blamer.svg)](https://coveralls.io/r/kucherenko/blamer?branch=master)
[![Dependency Status](https://gemnasium.com/kucherenko/blamer.svg)](https://gemnasium.com/kucherenko/blamer)

Setup
-----

    npm install blamer

Usage
-----

```javascript

var Blamer = require('blamer'),
// first parameter in Blamer is type of VCS, can be 'svn' or 'git', 'git' used by default
    blamer = new Blamer('svn');

// blameByFile return [Promises/A+](https://promisesaplus.com/)
blamer.blameByFile('/path/to/file/in/repo').then(
    function (result) {
        console.log("Blame json: %j", result);
//        will print
//        Blame json: {
//            "1": {
//                "rev": "rev",
//                "author": "author",
//                "date": "2014-10-15T12:33:31.675393Z",
//                "line": "1"
//            }
//        }
    },
    function (error) {
        console.log("Error: %j", error);
//        will print
//        Error: {
//            "error": "error type",
//            "message": "error message"
//        }
    }
);

```

License
-------

[The MIT License](https://github.com/kucherenko/blamer/blob/master/LICENSE)
