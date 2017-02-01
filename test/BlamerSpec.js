describe("Blamer", function(){
    var sut, file, git, Blamer;

    beforeEach(function () {
        file = 'zzz';
        git = env.stub();
        git.withArgs(file, '--o').returns('promise (constructor args)');
        git.withArgs(file, '--a').returns('promise (call args)');
        git.withArgs(file).returns('promise (default args)');
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

    it('should get data from git with default args', function (){
        sut.blameByFile(file).should.equal('promise (default args)');
    });

    it('should get data from git with args passed to constructor', function (){
        var blamer = new Blamer('git', '--o');
        blamer.blameByFile(file).should.equal('promise (constructor args)');
    });

    it('should get data from git with args passed to method call', function (){
        sut.blameByFile(file, '--a').should.equal('promise (call args)');
    });

    it('should throw exception in type of vcs dont supported', function (){
        sut.type = "test";
        chai.expect(function() {
            sut.blameByFile(file)
        }).to.throw('VCS "test" don\'t supported');
    });

});
