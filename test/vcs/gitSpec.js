var Promise = require('bluebird');
describe('Git', function() {
  var sut, exec, file, cwd,
    callback, dirname, basename,
    fileRaw, blameString;

  function initializeSut() {
    sut = proxyquire(sourcePath + 'vcs/git', {
      "child_process": {
        exec: exec
      },
      "path": {
        dirname: dirname,
        basename: basename
      }
    });
  }

  beforeEach(function() {
    blameString = 'rev (author name 2014-10-18 17:51:36 +0300 1) A\n';

    callback = env.stub();

    exec = env.stub().callsArgWith(2, null, blameString, '');

    cwd = 'cwd';

    fileRaw = './README.md';
    file = __dirname + '/../README.md';

    dirname = env.stub().withArgs(fileRaw).returns(cwd);
    basename = env.stub().withArgs(fileRaw).returns(file);
    initializeSut();
  });

  it('should exec git blame', function() {
    sut(fileRaw);
    exec.should.have.been.calledWith(
      'git blame -w ' + file, {
        cwd: cwd,
        maxBuffer: 1024 * 1024
      },
      sinon.match.any
    );
  });

  it('should parse result of blame', function(done) {
    sut(fileRaw).then(callback).finally(function() {
      var res = {};
      res[fileRaw] = {
        "1": {
          "rev": "rev",
          "author": "author name",
          "date": "2014-10-18 17:51:36 +0300",
          "line": "1"
        }
      };
      callback.should.have.been.calledWith(res);
      done();
    });
  });

  it('should reject promise on error', function() {
    exec = env.stub().callsArgWith(2, 111, blameString, 'ololo');
    initializeSut();
    sut(fileRaw).error(callback).finally(function() {
      callback.should.have.been.calledWith({
        error: 111,
        message: 'ololo'
      });
    });
  });


});
