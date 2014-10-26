var blamerVCS = {
    'git': require("./vcs/git"),
    'svn': require("./vcs/svn")
};
var Blamer = function Blamer(type) {
    this.type = type || 'git';
};

Blamer.prototype.blameByFile = function blameByFile(file) {
    if (!blamerVCS.hasOwnProperty(this.type)) {
        throw new Error('VCS "' + this.type + '" don\'t supported');
    }
    return blamerVCS[this.type](file);
};

Blamer.prototype.getType = function () {
    return this.type;
};

module.exports = Blamer;
