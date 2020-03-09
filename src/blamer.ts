import { BlameResult } from './blame-result.interface';
import { git } from './vcs/git';
import { svn } from './vcs/svn';

type VCSType = 'git' | 'svn';

export class Blamer {
  private readonly type: VCSType = 'git';

  constructor(type: VCSType = 'git') {
    this.type = type;
  }

  public async blameByFile(path: string): Promise<BlameResult> {
    return this.getVCSBlamer()(path);
  }

  private getVCSBlamer(): (path: string) => {} {
    if (this.type === 'svn') {
      return svn;
    }
    return git;
  }
}
