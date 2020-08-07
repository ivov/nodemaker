import fs from "fs";
import { join } from "path";
import { NodeDocFileEnum } from "../utils/enums";
import relocate from "../utils/relocate";

/**Responsible for placing the output files located in `nodemaker/output` in their appropriate dirs in the `n8n` and `n8n-docs` repos.*/
export default class FilePlacer {
  // ----------------------------------
  //         nodemaker repo
  // ----------------------------------

  // /output
  private outputDir: string;

  // /output/icon-candidates
  private iconCandidatesDir: string;

  // files at /output excluding icon candidates
  private outputFiles: string[];

  // icon candidates at /output/icon-candidates
  private iconCandidates: string[];

  // ----------------------------------
  //         n8n repo
  // ----------------------------------

  // /packages/nodes-base/
  private mainBaseDir: string;

  // /packages/nodes-base/nodes at n8n → node functionality file
  private mainNodesDir: string;

  // /packages/nodes-base/credentials at n8n → node credential file
  private mainCredentialsDir: string;

  // ----------------------------------
  //         n8n-docs repo
  // ----------------------------------

  // docs/nodes/
  private docsNodesDir: string;

  // docs/nodes/nodes-library/nodes → node functionality documentation file
  private docsFunctionalityDir: string;

  // docs/nodes/credentials at n8n-docs → node credential documentation file
  private docsCredentialsDir: string;

  // prettier-ignore
  constructor() {
    this.outputDir = join(__dirname, "..", "..", "output");
    this.iconCandidatesDir = join(this.outputDir, "icon-candidates");
    this.outputFiles = fs.readdirSync(this.outputDir);

    if (fs.existsSync(this.iconCandidatesDir)) {
      this.iconCandidates = fs.readdirSync(this.iconCandidatesDir);
    }

    this.mainBaseDir = join(__dirname, "..", "..", "..", "n8n", "packages", "nodes-base");
    this.mainNodesDir = join(this.mainBaseDir, "nodes");
    this.mainCredentialsDir = join(this.mainBaseDir, "credentials");
    this.docsNodesDir = join(__dirname, "..", "..", "..", "n8n-docs", "docs", "nodes");
    this.docsFunctionalityDir = join(this.docsNodesDir, "nodes-library", "nodes");
    this.docsCredentialsDir = join(this.docsNodesDir, "credentials");
  }

  /**Place in the `n8n` repo all the node functionality files:
   * - `*.node.ts`,
   * - `package.json`,
   * - `*.credentials.ts`,
   * - `GenericFunctions.ts`,
   * - the node icon, and
   * - any resource files.
   */
  public async placeNodeFunctionalityFiles() {
    await this.placePackageJson();
    await this.placeCredentialFile();
    await this.placeLogicFiles();
    await this.placeIconFile();
    return await this.sendResponse();
  }

  /**Place in the `n8n-docs` repo both node documentation files:
   * - the node functionality documentation file, and
   * - the node credential documentation file.
   */
  public async placeNodeDocumentationFiles() {
    [NodeDocFileEnum.main, NodeDocFileEnum.credential].forEach((file) =>
      this.placeDocFile(file)
    );
    return await this.sendResponse();
  }

  /**Send a response to be relayed by the PlacementChannel to the frontend.*/
  private async sendResponse(): Promise<BackendOperationResult> {
    try {
      await this.verifyPlacementSuccess();
      return { completed: true, error: false };
    } catch (thrownError) {
      return { completed: false, error: true, errorMessage: thrownError };
    }
  }

  // TODO
  private async verifyPlacementSuccess() {
    return true;
  }

  /**Place in the `n8n-docs` repo one a node documentation file:
   * - a node functionality documentation file, or
   * - a node credential documentation file.
   */
  public async placeDocFile(nodeDocFile: NodeDocFileEnum) {
    const getMainDocFilename = (file: string) =>
      file.endsWith(".md") && !file.endsWith("Credentials.md");

    const getCredentialDocFilename = (file: string) =>
      file.endsWith("Credentials.md");

    const sourceFilename =
      nodeDocFile === NodeDocFileEnum.main
        ? this.outputFiles.find(getMainDocFilename)
        : this.outputFiles.find(getCredentialDocFilename);

    if (sourceFilename === undefined) {
      throw Error(
        `No ${NodeDocFileEnum[nodeDocFile]} documentation file found. Generate it before placement.`
      );
    }

    const destinationDir = join(
      nodeDocFile === NodeDocFileEnum.main
        ? this.docsFunctionalityDir
        : this.docsCredentialsDir,
      this.deriveDocDestinationDirname()
    );

    if (!fs.existsSync(destinationDir)) {
      fs.mkdirSync(destinationDir);
    }

    const source = join(this.outputDir, sourceFilename);

    await relocate(source, join(destinationDir, "README.md"));
  }

  /**Place in the `n8n` repo the selected (resized) icon.*/
  private async placeIconFile() {
    if (!this.iconCandidates) return;

    const iconFilename = this.iconCandidates.find(
      (file) => !file.startsWith("icon-candidate")
    );

    if (!iconFilename) {
      throw Error("No source icon file found!");
    }

    const destinationDir = join(
      this.mainNodesDir,
      this.deriveNodeDestinationDirname()
    );

    if (!fs.existsSync(destinationDir)) {
      fs.mkdirSync(destinationDir);
    }

    const source = join(this.iconCandidatesDir, iconFilename);
    const fileDestination = join(destinationDir, iconFilename);
    await relocate(source, fileDestination);
  }

  /**Place `nodemaker/output/package.json` at `n8n/packages/nodes-base/package.json`. The target `package.json` is overwritten.*/
  private async placePackageJson() {
    const packageJsonPath = join(this.outputDir, "package.json");

    if (!fs.existsSync(packageJsonPath)) {
      console.log("No package.json found → skipped");
      return;
    }

    const destination = join(this.mainBaseDir, "package.json");
    await relocate(packageJsonPath, destination);
  }

  /**Place `nodemaker/output/*.credentials.ts` at `n8n/packages/nodes-base/credentials/ServiceName`.*/
  private async placeCredentialFile() {
    const credentialsFilename = this.outputFiles.find((file) =>
      file.endsWith(".credentials.ts")
    );

    if (!credentialsFilename) return; // with no auth, there will be no credential to place

    const source = join(this.outputDir, credentialsFilename);

    const destination = join(this.mainCredentialsDir, credentialsFilename);

    await relocate(source, destination);
  }

  /**Place in the `n8n` repo the node logic files:
   * - `*.node.ts`,
   * - `GenericFunctions.ts`, and
   * - resource files (if any).
   */
  private async placeLogicFiles() {
    const nodeFilenames = this.outputFiles.filter(
      (file) =>
        file !== ".gitkeep" &&
        file !== "package.json" &&
        !file.endsWith(".credentials.ts") &&
        !file.endsWith(".md")
    );

    const destinationDir = join(
      this.mainNodesDir,
      this.deriveNodeDestinationDirname()
    );

    if (!fs.existsSync(destinationDir)) {
      fs.mkdirSync(destinationDir);
    }

    nodeFilenames.forEach(async (filename) => {
      const source = join(this.outputDir, filename);
      const fileDestination = join(destinationDir, filename);
      await relocate(source, fileDestination);
    });
  }

  /**Create the string for the name of the service, to be used as a new node functionality dirname.*/
  private deriveNodeDestinationDirname() {
    const serviceFile = this.outputFiles.find((file) =>
      file.endsWith(".node.ts")
    );

    if (!serviceFile) {
      throw Error("No source *.node.ts file found!");
    }

    return serviceFile.replace(".node.ts", "");
  }

  /**Create the string for the name of the service, to be used as a new docs dirname.*/
  private deriveDocDestinationDirname() {
    const docFile = this.outputFiles.find(
      (file) => file.endsWith(".md") && !file.endsWith("Credentials.md")
    );

    if (!docFile) {
      throw Error("No main docs file found!");
    }

    return docFile.replace(".md", "");
  }
}
