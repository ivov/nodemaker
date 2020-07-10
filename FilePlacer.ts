import fs from "fs";
import { join } from "path";
import { promisify } from "util";

const relocate = promisify(fs.rename);

export default class FilePlacer {
  // /output at nodemaker
  private sourceDirPath: string;

  // files in /output in nodemaker
  private sourceFilenames: string[];

  // /packages/nodes-base/ at n8n
  private destinationNodesBaseDir: string;

  // /packages/nodes-base/nodes at n8n
  private destinationNodesDir: string;

  // /packages/nodes-base/credentials at n8n
  private destinationCredentialsDir: string;

  constructor() {
    this.sourceDirPath = join(__dirname, "..", "output");
    this.sourceFilenames = fs.readdirSync(this.sourceDirPath);
    this.destinationNodesBaseDir = join(
      __dirname,
      "..",
      "..",
      "n8n",
      "packages",
      "nodes-base"
    );
    this.destinationNodesDir = join(this.destinationNodesBaseDir, "nodes");
    this.destinationCredentialsDir = join(
      this.destinationNodesBaseDir,
      "credentials"
    );
  }

  /**Place `package.json`, credential file, and node files in their appropriate locations in the n8n repo.*/
  public async run() {
    await this.placePackageJson();
    await this.placeCredentialFile();
    await this.placeNodeFiles();
  }

  private async placePackageJson() {
    const source = join(this.sourceDirPath, "package.json");
    const destination = join(this.destinationNodesBaseDir, "package.json");

    await relocate(source, destination);
  }

  /**Place credential file (`*.credentials.ts`) in the appropriate location in the n8n repo.*/
  private async placeCredentialFile() {
    const credentialsFilename = this.sourceFilenames.find((file) =>
      file.endsWith(".credentials.ts")
    );

    if (!credentialsFilename) {
      throw Error("No source *.credentials.ts file found!");
    }

    const source = join(this.sourceDirPath, credentialsFilename);

    const destination = join(
      this.destinationCredentialsDir,
      credentialsFilename
    );

    await relocate(source, destination);
  }

  /**Place node files (`*.node.ts`, `GenericFunctions.ts`, and resource files if any) in their appropriate location in the n8n repo.*/
  private async placeNodeFiles() {
    const nodeFilenames = this.sourceFilenames.filter(
      (file) =>
        file !== "package.json" &&
        !file.endsWith(".credentials.ts") &&
        file !== ".gitkeep"
    );

    const destination = join(
      this.destinationNodesDir,
      this.getDestinationDirname()
    );

    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination);
    }

    nodeFilenames.forEach(async (filename) => {
      const source = join(this.sourceDirPath, filename);
      const fileDestination = join(destination, filename);
      await relocate(source, fileDestination);
    });
  }

  /**Returns the name of the service, to be used as a dirname.*/
  private getDestinationDirname() {
    const serviceFilename = this.sourceFilenames.find((file) =>
      file.endsWith(".node.ts")
    );

    if (!serviceFilename) {
      throw Error("No source *.node.ts file found!");
    }

    return serviceFilename.replace(".node.ts", "");
  }
}
