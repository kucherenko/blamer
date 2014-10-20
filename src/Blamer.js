var Promise = require('bluebird');
var Blamer = function (type) {
    this.type = type || 'git';
};

Blamer.prototype.blameByFile = function () {
    return Promise();
};

Blamer.prototype.getType = function () {
    return this.type;
};

module.exports = Blamer;
