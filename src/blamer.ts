import { BlameResult } from './blame-result.interface';
import { git } from './vcs/git';

export class Blamer {
  public async blameByFile(path: string): Promise<BlameResult> {
    return this.getVCSBlamer()(path);
  }

  private getVCSBlamer(): (path: string) => {} {
    return git;
  }
}
