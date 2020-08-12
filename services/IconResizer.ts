import fs from "fs";
import { join } from "path";
import { promisify } from "util";
import sharp from "sharp";

export default class ImageResizer {
  private readonly readFile = promisify(fs.readFile);

  // prettier-ignore
  private readonly iconCandidatesDir = join(__dirname, "..", "..", "output", "icon-candidates");

  constructor(private metaParameters: MetaParameters, private number: string) {}

  public async run(): Promise<BackendOperationResult> {
    try {
      this.resize(this.number);
      return { completed: true };
    } catch (error) {
      return { completed: false, error };
    }
  }

  /**Resize the selected icon candidate into a 60×60 px PNG icon.*/
  private async resize(number: string) {
    const filename = join(
      this.iconCandidatesDir,
      `icon-candidate-${number}.png`
    );
    const inputBuffer = await this.readFile(filename);

    const outputFile = this.metaParameters.serviceName
      .toLowerCase()
      .replace(/ /g, "");

    await sharp(inputBuffer)
      .resize({ width: 60, height: 60 })
      .toFile(join(this.iconCandidatesDir, `${outputFile}.png`));
  }
}
