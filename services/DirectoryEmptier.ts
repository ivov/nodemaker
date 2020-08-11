import fs, { readdirSync } from "fs";
import { join } from "path";
import { promisify } from "util";
import FileFinder from "./FileFinder";

const deleteFile = promisify(fs.unlink);
const deleteDir = promisify(fs.rmdir);

export default class DirectoryEmptier {
  private outputDir = join(__dirname, "..", "..", "output");
  private iconCandidatesDir = join(this.outputDir, "icon-candidates");

  public async run(): Promise<BackendOperationResult> {
    try {
      await this.deleteIconCandidatesDir();
      const files = this.getFilesToBeDeleted();
      files.forEach((file) => deleteFile(join("output", file)));
      return { completed: true, error: false };
    } catch (thrownError) {
      return { completed: false, error: true, errorMessage: thrownError };
    }
  }

  private async deleteIconCandidatesDir() {
    if (fs.existsSync(this.iconCandidatesDir)) {
      await deleteDir(this.iconCandidatesDir, { recursive: true });
    }
  }

  /**Returns all filenames in the /output dir except for `.gitkeep` and the /icon-candidates dir and its contents.*/
  private getFilesToBeDeleted() {
    return readdirSync(this.outputDir).filter(
      FileFinder.isAnyButGitKeepAndIconCandidatesDir
    );
  }
}
