import fs from "fs";
import { join } from "path";
import { promisify } from "util";
import FileFinder from "./FileFinder";

export default class DirectoryEmptier {
  private readonly outputDir = join(__dirname, "..", "..", "output");
  private readonly iconCandidatesDir = join(this.outputDir, "icon-candidates");
  private readonly deleteFile = promisify(fs.unlink);
  private readonly deleteDir = promisify(fs.rmdir);

  public async run(): Promise<BackendOperationResult> {
    try {
      await this.deleteIconCandidatesDir();
      this.getFilesToBeDeleted().forEach((file) =>
        this.deleteFile(join("output", file))
      );
      return { completed: true };
    } catch (error) {
      return { completed: false, error };
    }
  }

  /**Delete the output/icon-candidates dir.*/
  private async deleteIconCandidatesDir() {
    if (fs.existsSync(this.iconCandidatesDir)) {
      await this.deleteDir(this.iconCandidatesDir, { recursive: true });
    }
  }

  /**Return all filenames in the /output dir except for `.gitkeep` and the output/icon-candidates dir and its contents.*/
  private getFilesToBeDeleted() {
    return fs
      .readdirSync(this.outputDir)
      .filter(FileFinder.isAnyButGitKeepAndIconCandidatesDir);
  }
}
