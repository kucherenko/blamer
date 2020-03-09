const proxyquire = require('proxyquire');
import test, { ExecutionContext } from 'ava';
import sinon from 'sinon';

const pathToSvn: string = '/path/to/svn';
const pathToFile: string = '/path/to/file';
const stubExeca = {
  sync: sinon.stub().returns({
    stdout:
      '<?xml version="1.0"?>\n' +
      '<blame>\n' +
      '<target path="' +
      pathToFile +
      '">\n' +
      '<entry line-number="1">\n' +
      '<commit revision="3">\n' +
      '<author>sally</author>\n' +
      '<date>2008-05-25T19:12:31.428953Z</date>\n' +
      '</commit>\n' +
      '</entry>\n' +
      '</target>\n' +
      '</blame>'
  })
};
const stubWhich = sinon.stub().returns(pathToSvn);
const { svn } = proxyquire('./svn', {
  execa: stubExeca,
  which: stubWhich
});

test('should parse svn blame command', async (t: ExecutionContext) => {
  t.deepEqual(await svn(pathToFile), {
    [pathToFile]: {
      '1': {
        author: 'sally',
        date: '2008-05-25T19:12:31.428953Z',
        line: '1',
        rev: '3'
      }
    }
  });
});
