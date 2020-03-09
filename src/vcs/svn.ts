import execa from 'execa';
import which from 'which';
import { parseStringPromise } from 'xml2js';
import { BlamedLine, BlameResult } from '../blame-result.interface';

const parseResult = async (
  buffer: string
): Promise<{ [line: string]: BlamedLine }> => {
  const result = await parseStringPromise(buffer);
  const json: { [line: string]: BlamedLine } = {};
  result.blame.target[0].entry.forEach((line: any) => {
    json[line.$['line-number']] = {
      author: line.commit[0].author[0],
      date: line.commit[0].date[0],
      line: line.$['line-number'],
      rev: line.commit[0].$.revision
    };
  });
  return json;
};

export async function svn(path: string): Promise<BlameResult> {
  const pathToSvn: string = await which('svn');
  const result = execa.sync(pathToSvn, ['blame', '--xml', path]);
  return {
    [path]: await parseResult(result.stdout)
  };
}
