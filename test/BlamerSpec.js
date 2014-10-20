var Blamer = require('../src/Blamer');

describe("Blamer", function(){
    var sut, file, git;

    beforeEach(function () {
        file = 'zzz';
        sut = new Blamer();
    });

    it('should set type of vcs', function () {
        var blamer = new Blamer('git');
        blamer.getType().should.equal('git');
    });

    it('should set type git as default vcs', function () {
        sut.getType().should.equal('git');
    });

    xit('should get data from git vcs', function (){
        git.should.have.been.calledWith(file, sinon.match.any);
    });

});