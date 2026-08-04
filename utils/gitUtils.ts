import simpleGit from "simple-git";

export class GitUtils {
  private static git = simpleGit();

  static async getBranch(): Promise<string> {
    try {
      return await this.git.revparse(["--abbrev-ref", "HEAD"]);
    } catch {
      return "N/A";
    }
  }

  static async getCommit(): Promise<string> {
    try {
      return await this.git.revparse(["HEAD"]);
    } catch {
      return "N/A";
    }
  }
}