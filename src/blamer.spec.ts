const proxyquire = require('proxyquire');
import test, { ExecutionContext } from 'ava';
import sinon from 'sinon';
import { BlameResult } from './blame-result.interface';

const stub = sinon.stub();
const path = '/path/to/file';
const mockedResult: BlameResult = {
  [path]: {
    '1': {
      author: 'author',
      date: '2020-03-03 10:00:00',
      line: '1',
      rev: '123'
    }
  }
};
stub.returns(mockedResult);
const { Blamer } = proxyquire('./blamer', {
  './vcs/git': { git: stub }
});

test('should show authors of code in file under git', async (t: ExecutionContext) => {
  const blamer = new Blamer();
  t.deepEqual(await blamer.blameByFile(path), mockedResult);
});
