import simpleGit from "simple-git";

export class GitUtils {
  private static git = simpleGit();

  static async getBranch(): Promise<string> {
    return await this.git.revparse(["--abbrev-ref", "HEAD"]);
  }

  static async getCommit(): Promise<string> {
    return await this.git.revparse(["HEAD"]);
  }
}
