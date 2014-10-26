var blamers = {
    'git': require("./vcs/git"),
    'svn': require("./vcs/svn")
};
var Blamer = function Blamer(type) {
    this.type = type || 'git';
};

Blamer.prototype.blameByFile = function blameByFile(file) {
    if (!blamers.hasOwnProperty(this.type)) {
        throw new Error('VCS "' + this.type + '" don\'t supported');
    }
    return blamers[this.type](file);
};

Blamer.prototype.getType = function () {
    return this.type;
};

module.exports = Blamer;
