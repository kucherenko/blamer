var blamerVCS = {
    'git': require("./vcs/git"),
    'svn': require("./vcs/svn")
};
var Blamer = function Blamer(type, args) {
    this.args = args;
    this.type = type || 'git';
};

Blamer.prototype.blameByFile = function blameByFile(file, args) {
    if (!blamerVCS.hasOwnProperty(this.type)) {
        throw new Error('VCS "' + this.type + '" don\'t supported');
    }
    args = typeof args === 'string' ? args : this.args;
    return blamerVCS[this.type](file, args);
};

Blamer.prototype.getType = function () {
    return this.type;
};

module.exports = Blamer;
