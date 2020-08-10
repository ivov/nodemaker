import fs from "fs";
import { join } from "path";
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

  // output/package.json
  private packageJson: string;

  // output/*.png
  private iconFile: string;

  // output/*.md
  private mainDocFile: string;

  // output/*.md
  private credentialDocFile: string;

  // icon candidates at /output/icon-candidates
  private iconCandidates: string[];

  // array of files to be relocated - used for verification
  private filesPlaced: string[] = [];

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

    this.packageJson = join(this.outputDir, "package.json");
    this.mainBaseDir = join(__dirname, "..", "..", "..", "n8n", "packages", "nodes-base");
    this.mainNodesDir = join(this.mainBaseDir, "nodes");
    this.mainCredentialsDir = join(this.mainBaseDir, "credentials");
    this.docsNodesDir = join(__dirname, "..", "..", "..", "n8n-docs", "docs", "nodes");
    this.docsFunctionalityDir = join(this.docsNodesDir, "nodes-library", "nodes");
    this.docsCredentialsDir = join(this.docsNodesDir, "credentials");
  }

  /**Verify that all the functionality files to be placed exist before placement.*/
  private verifyFunctionalityFilesToBePlaced() {
    if (!fs.existsSync(this.packageJson)) {
      throw Error("No package.json file found. Generate it before placement.");
    }

    const serviceFile = this.outputFiles.find((file) =>
      file.endsWith(".node.ts")
    );

    if (!serviceFile) {
      throw Error("No *.node.ts file found. Generate it before placement.");
    }

    if (!this.iconCandidates) {
      throw Error(
        "No icon-candidates directory found. Generate icon candidates before placement."
      );
    }

    const iconFile = this.iconCandidates.find(
      (file) => !file.startsWith("icon-candidate")
    );

    if (!iconFile) {
      throw Error(
        "No PNG icon file found. Generate icon candidates and resize one before placement."
      );
    }

    this.iconFile = iconFile;
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
    this.verifyFunctionalityFilesToBePlaced();
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
    this.verifyDocumentationFilesToBePlaced();

    [this.mainDocFile, this.credentialDocFile].forEach((file) =>
      this.placeDocFile(file)
    );

    return await this.sendResponse();
  }

  /**Send a response to be relayed by the PlacementChannel to the frontend.
   * Note: Returns a promise in order to conform to channel usage.*/
  private async sendResponse(): Promise<BackendOperationResult> {
    try {
      this.verifyPlacementSuccess();
      return { completed: true, error: false };
    } catch (thrownError) {
      return { completed: false, error: true, errorMessage: thrownError };
    }
  }

  /**Verify if all the files recorded as placed do not exist in /output anymore.*/
  private verifyPlacementSuccess() {
    this.filesPlaced.forEach((file) => {
      if (fs.existsSync(join(this.outputDir, file))) {
        throw Error("Placement failed for: " + file);
      }
    });
  }

  /**Verify that all the documentation files to be placed exist before placement.*/
  private verifyDocumentationFilesToBePlaced() {
    const isMainDocFile = (file: string) =>
      file.endsWith(".md") && !file.endsWith("Credentials.md");

    const isCredentialDocFile = (file: string) =>
      file.endsWith("Credentials.md");

    const mainDocFile = this.outputFiles.find(isMainDocFile);
    const credentialDocFile = this.outputFiles.find(isCredentialDocFile);

    if (!mainDocFile) {
      throw Error(
        "No main documentation file found. Generate it before placement."
      );
    }

    this.mainDocFile = mainDocFile;
    this.credentialDocFile = credentialDocFile || ""; // credential file (documentation) may not exist
  }

  /**Place in the `n8n-docs` repo one a node documentation file:
   * - a node functionality documentation file, or
   * - a node credential documentation file.*/
  private async placeDocFile(nodeDocFile: string) {
    const destinationDir = join(
      nodeDocFile === this.mainDocFile
        ? this.docsFunctionalityDir
        : this.docsCredentialsDir,
      this.deriveDocDestinationDirname()
    );

    if (!fs.existsSync(destinationDir)) {
      fs.mkdirSync(destinationDir);
    }

    const source = join(this.outputDir, nodeDocFile);

    await relocate(source, join(destinationDir, "README.md"));

    this.filesPlaced.push(nodeDocFile);
  }

  /**Place in the `n8n` repo the selected (resized) icon.*/
  private async placeIconFile() {
    const destinationDir = join(
      this.mainNodesDir,
      this.deriveNodeDestinationDirname()
    );

    if (!fs.existsSync(destinationDir)) {
      fs.mkdirSync(destinationDir);
    }

    const source = join(this.iconCandidatesDir, this.iconFile);
    const destination = join(destinationDir, this.iconFile);

    await relocate(source, destination);

    this.filesPlaced.push(this.iconFile);
  }

  /**Place `nodemaker/output/package.json` at `n8n/packages/nodes-base/package.json`. The target `package.json` is overwritten.*/
  private async placePackageJson() {
    const destination = join(this.mainBaseDir, "package.json");
    await relocate(this.packageJson, destination);

    this.filesPlaced.push("package.json");
  }

  /**Place `nodemaker/output/*.credentials.ts` at `n8n/packages/nodes-base/credentials/ServiceName`.*/
  private async placeCredentialFile() {
    const credentialsFilename = this.outputFiles.find((file) =>
      file.endsWith(".credentials.ts")
    );

    if (!credentialsFilename) return; // credential file (functionality) may not exist

    const source = join(this.outputDir, credentialsFilename);
    const destination = join(this.mainCredentialsDir, credentialsFilename);

    await relocate(source, destination);

    this.filesPlaced.push(credentialsFilename);
  }

  /**Place in the `n8n` repo the node logic files:
   * - `*.node.ts`,
   * - `GenericFunctions.ts`, and
   * - resource files (if any).
   */
  private async placeLogicFiles() {
    // TODO: Refactor `isLogicFile`
    const isLogicFile = (file: string) =>
      file !== ".gitkeep" &&
      file !== "package.json" &&
      file !== "workflow.png" &&
      file !== "unsaved_workflow.json" &&
      !file.startsWith("icon-candidate") &&
      !file.endsWith(".credentials.ts") &&
      !file.endsWith(".md") &&
      !file.endsWith(".txt");

    const nodeFilenames = this.outputFiles.filter(isLogicFile);

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

    this.filesPlaced.push(...nodeFilenames);
  }

  /**Create the string for the name of the service, to be used as a new node functionality dirname.*/
  private deriveNodeDestinationDirname() {
    const serviceFile = this.outputFiles.find((file) =>
      file.endsWith(".node.ts")
    );

    if (!serviceFile) {
      throw Error(
        "No source *.node.ts file found. Generate it before placement."
      );
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
