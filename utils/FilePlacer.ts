import fs from "fs";
import { join } from "path";
import { promisify } from "util";
import { NodeDocFile } from "./enums";

const relocate = promisify(fs.rename);

/**Responsible for placing the various files in /output in various dirs in the n8n repo.
 * **Requirement:** The n8n and nodemaker repos must be located side by side.*/
export default class FilePlacer {
  // dir /output at nodemaker
  private sourceDir: string;

  // files in /output in nodemaker
  private sourceFilenames: string[];

  // dir /packages/nodes-base/ at n8n
  private destinationNodesBaseDir: string;

  // dir /packages/nodes-base/nodes at n8n
  private destinationNodesDir: string;

  // dir /packages/nodes-base/credentials at n8n
  private destinationCredentialsDir: string;

  // dir docs/nodes/ at n8n-docs
  private destinationDocsNodesDir: string;

  // dir docs/nodes/nodes-library/nodes at n8n-docs
  private destinationDocsRegularNodesDir: string;

  // dir docs/nodes/credentials at n8n-docs
  private destinationDocsCredentialsDir: string;

  constructor() {
    this.sourceDir = join(__dirname, "..", "..", "output");
    this.sourceFilenames = fs.readdirSync(this.sourceDir);
    this.destinationNodesBaseDir = join(
      __dirname,
      "..",
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
    this.destinationDocsNodesDir = join(
      __dirname,
      "..",
      "..",
      "..",
      "n8n-docs",
      "docs",
      "nodes"
    );
    this.destinationDocsRegularNodesDir = join(
      this.destinationDocsNodesDir,
      "nodes-library",
      "nodes"
    );
    this.destinationDocsCredentialsDir = join(
      this.destinationDocsNodesDir,
      "credentials"
    );
  }

  /**Places a documentation file (either main documentation file or credential documentation file) in n8n-docs repo.*/
  public async placeDocFile(docfile: NodeDocFile) {
    const getMainDocFilename = (file: string) =>
      file.endsWith(".md") && !file.endsWith("Credentials.md");

    const getCredentialDocFilename = (file: string) =>
      file.endsWith("Credentials.md");

    const sourceFilename =
      docfile === NodeDocFile.main
        ? this.sourceFilenames.find(getMainDocFilename)
        : this.sourceFilenames.find(getCredentialDocFilename);

    if (sourceFilename === undefined) {
      throw Error(
        `No ${NodeDocFile[docfile]} documentation file found. Generate it before placement.`
      );
    }

    const destinationDir = join(
      docfile === NodeDocFile.main
        ? this.destinationDocsRegularNodesDir
        : this.destinationDocsCredentialsDir,
      this.getDocFileDestinationDirname()
    );

    if (!fs.existsSync(destinationDir)) {
      fs.mkdirSync(destinationDir);
    }

    const source = join(this.sourceDir, sourceFilename);

    await relocate(source, join(destinationDir, "README.md"));
  }

  public async placeFunctionalFiles() {
    await this.placePackageJson();
    await this.placeCredentialFile();
    await this.placeNodeFiles();
  }

  /**Place `output/package.json` at `/packages/nodes-base/package.json` in the n8n repo, overwriting it.*/
  private async placePackageJson() {
    const source = join(this.sourceDir, "package.json");

    if (!fs.existsSync(source)) {
      throw Error(
        "No output/package.json found. Generate a package.json before placement."
      );
    }

    const destination = join(this.destinationNodesBaseDir, "package.json");
    await relocate(source, destination);
  }

  /**Place `output/*.credentials.ts` at `/packages/nodes-base/credentials` in the n8n repo.*/
  private async placeCredentialFile() {
    const credentialsFilename = this.sourceFilenames.find((file) =>
      file.endsWith(".credentials.ts")
    );

    if (!credentialsFilename) {
      // Not an error, since the node may need no auth. TODO: Make code reflect this.
      console.log("No output/*.credentials.ts file found.");
      return;
    }

    const source = join(this.sourceDir, credentialsFilename);

    const destination = join(
      this.destinationCredentialsDir,
      credentialsFilename
    );

    await relocate(source, destination);
  }

  /**Place `*.node.ts` and `GenericFunctions.ts` (and resource files if any) at a new dir in /packages/nodes-base/nodes in the n8n repo.*/
  private async placeNodeFiles() {
    const nodeFilenames = this.sourceFilenames.filter(
      (file) =>
        file !== ".gitkeep" &&
        file !== "package.json" &&
        !file.endsWith(".credentials.ts") &&
        !file.endsWith(".md")
    );

    const destinationDir = join(
      this.destinationNodesDir,
      this.getNodeDestinationDirname()
    );

    if (!fs.existsSync(destinationDir)) {
      fs.mkdirSync(destinationDir);
    }

    nodeFilenames.forEach(async (filename) => {
      const source = join(this.sourceDir, filename);
      const fileDestination = join(destinationDir, filename);
      await relocate(source, fileDestination);
    });
  }

  /**Returns the name of the service, to be used as a new dirname.*/
  private getNodeDestinationDirname() {
    const serviceFilename = this.sourceFilenames.find((file) =>
      file.endsWith(".node.ts")
    );

    if (!serviceFilename) {
      throw Error("No source *.node.ts file found!");
    }

    return serviceFilename.replace(".node.ts", "");
  }

  private getDocFileDestinationDirname() {
    const docsFilename = this.sourceFilenames.find((file) =>
      // TODO: Change this endsWith check when docs credentials generation functionality is added.
      file.endsWith(".md")
    );

    if (!docsFilename) {
      throw Error("No main docs file found!");
    }

    return docsFilename.replace(".md", "");
  }
}
