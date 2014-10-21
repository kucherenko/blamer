var blamers = {
    'git': require("./vcs/git")
};
var Blamer = function (type) {
    this.type = type || 'git';
};

Blamer.prototype.blameByFile = function (file) {
    if (!blamers.hasOwnProperty(this.type)) {
        throw new Error('VCS "' + this.type + '" don\'t supported');
    }
    return blamers[this.type](file);
};

Blamer.prototype.getType = function () {
    return this.type;
};

module.exports = Blamer;
