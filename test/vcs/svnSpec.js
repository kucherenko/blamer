var Promise = require('bluebird');
describe('SVN', function() {
  var sut, exec, file, cwd,
    callback, dirname, basename,
    fileRaw, blameString;

  function initializeSut() {
    sut = proxyquire(sourcePath + 'vcs/svn', {
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
    blameString =
      '<?xml version="1.0" encoding="UTF-8"?><blame><target path="file"><entry line-number="1"><commit revision="rev"><author>author</author><date>2014-10-15T12:33:31.675393Z</date></commit></entry></target></blame>';

    callback = env.stub();

    exec = env.stub().callsArgWith(2, null, blameString, '');

    cwd = 'cwd';

    fileRaw = './README.md';
    file = __dirname + '/../README.md';

    dirname = env.stub().withArgs(fileRaw).returns(cwd);
    basename = env.stub().withArgs(fileRaw).returns(file);
    initializeSut();
  });

  it('should exec svn blame', function() {
    sut(fileRaw);
    exec.should.have.been.calledWith(
      'svn blame ' + file + ' --xml', {
        cwd: cwd,
        maxBuffer: 1024 * 1024
      },
      sinon.match.any
    );
  });

  it('should exec svn blame with args', function() {
    sut(fileRaw, '--xml --verbose');
    exec.should.have.been.calledWith(
      'svn blame ' + file + ' --xml --verbose', {
        cwd: cwd,
        maxBuffer: 1024 * 1024
      },
      sinon.match.any
    );
  });

  it('should exec svn blame without args', function() {
    sut(fileRaw, '');
    exec.should.have.been.calledWith(
      'svn blame ' + file + ' ', {
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
          "author": "author",
          "date": "2014-10-15T12:33:31.675393Z",
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
