import fs from "fs";
import { join } from "path";
import { promisify } from "util";
import sharp from "sharp";

const readFile = promisify(fs.readFile);

export default class ImageResizer {
  constructor(private metaParameters: MetaParameters) {}

  // prettier-ignore
  private iconCandidatesDir = join(__dirname, "..", "..", "output", "icon-candidates");

  /**Resize the selected icon candidate into a 60×60 px PNG icon.*/
  public async resize(number: string) {
    const filename = join(
      this.iconCandidatesDir,
      `icon-candidate-${number}.png`
    );
    const inputBuffer = await readFile(filename);

    const outputFile = this.metaParameters.serviceName
      .toLowerCase()
      .replace(/ /g, "");

    await sharp(inputBuffer)
      .resize({ width: 60, height: 60 })
      .toFile(join(this.iconCandidatesDir, `${outputFile}.png`));
  }
}
