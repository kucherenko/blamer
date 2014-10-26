describe("Blamer", function(){
    var sut, file, git, Blamer;

    beforeEach(function () {
        file = 'zzz';
        git = env.stub().withArgs(file).returns('resultPromise');
        Blamer = proxyquire(sourcePath + 'Blamer',{
            "./vcs/git": git
        });
        sut = new Blamer();
    });


    it('should set type of vcs', function () {
        var blamer = new Blamer('git');
        blamer.getType().should.equal('git');
    });

    it('should set type git as default vcs', function () {
        sut.getType().should.equal('git');
    });

    it('should get data from git vcs', function (){
        sut.blameByFile(file).should.equal('resultPromise');
    });

    it('should throw exception in type of vcs dont supported', function (){
        sut.type = "test";
        chai.expect(function() {
            sut.blameByFile(file)
        }).to.throw('VCS "test" don\'t supported');
    });

});