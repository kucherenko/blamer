describe('Git VCS', function () {
    var sut, exec, file, cwd,
        callback, dirname, basename,
        fileRaw, blameString;

    beforeEach(function () {
        blameString = 'rev (author name 2014-10-18 17:51:36 +0300 1) A\n';

        callback = env.stub();

        exec = env.stub().callsArgWith(2, null, blameString, '');

        cwd = 'cwd';

        fileRaw = './README.md';
        file = __dirname + '/../README.md';

        dirname = env.stub().withArgs(fileRaw).returns(cwd);
        basename = env.stub().withArgs(fileRaw).returns(file);

        sut = proxyquire('../src/vcs/git.js', {
            "child_process": {exec: exec},
            "path": {
                dirname: dirname,
                basename: basename
            }
        });
    });

    it('should exec git blame', function () {
        sut(fileRaw, callback);
        exec.should.have.been.calledWith(
            'git blame ' + file,
            {cwd: cwd},
            sinon.match.any
        );
    });

    it('should parse result of blame', function () {
        sut(fileRaw, callback);
        callback.should.have.been.calledWith({
            "1": {
                "rev": "rev",
                "author": "author name",
                "date": "2014-10-18 17:51:36 +0300",
                "line": "1",
                "content": "A"
            }
        });
    });

});