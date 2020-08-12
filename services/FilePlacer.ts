import fs from "fs";
import { join } from "path";
import FileFinder from "./FileFinder";
import { promisify } from "util";

/**Responsible for placing the files at `/output` into their appropriate locations in the `n8n` and `n8n-docs` repos.*/
export default class FilePlacer {
  // ----------------------------------
  //         General
  // ----------------------------------

  private readonly relocate = promisify(fs.rename);

  // array of files to be relocated - used for verification
  private filesPlaced: string[] = [];

  // ----------------------------------
  //         nodemaker repo
  // ----------------------------------

  // /output
  private readonly outputDir = join(__dirname, "..", "..", "output");

  // /output/icon-candidates
  private readonly iconCandidatesDir = join(this.outputDir, "icon-candidates");

  // files at /output excluding icon candidates
  private readonly outputFiles = fs.readdirSync(this.outputDir);

  // output/package.json
  private readonly packageJson = join(this.outputDir, "package.json");

  // output/*.node.ts
  private mainFuncFile: string;

  // output/*.credentials.ts
  private credFuncFile: string | undefined; // non-existence allowed

  // output/*.png
  private iconFile: string;

  // output/*.md
  private mainDocFile: string;

  // output/*.md
  private credDocFile: string | undefined; // non-existence allowed

  // icon candidates at /output/icon-candidates
  private iconCandidates: string[];

  // ----------------------------------
  //         n8n repo
  // ----------------------------------

  // /packages/nodes-base/
  // prettier-ignore
  private readonly mainBaseDir = join(__dirname, "..", "..", "..", "n8n", "packages", "nodes-base");

  // /packages/nodes-base/nodes at n8n → node functionality files
  private readonly mainNodesDir = join(this.mainBaseDir, "nodes");

  // /packages/nodes-base/credentials at n8n → node credential file
  private readonly mainCredentialsDir = join(this.mainBaseDir, "credentials");

  // ----------------------------------
  //         n8n-docs repo
  // ----------------------------------

  // docs/nodes/
  // prettier-ignore
  private readonly docsNodesDir = join(__dirname, "..", "..", "..", "n8n-docs", "docs", "nodes");

  // docs/nodes/nodes-library/nodes
  // prettier-ignore
  private readonly docsFunctionalityDir = join(this.docsNodesDir, "nodes-library", "nodes");

  // docs/nodes/credentials
  private readonly docsCredentialsDir = join(this.docsNodesDir, "credentials");

  constructor() {
    if (fs.existsSync(this.iconCandidatesDir)) {
      this.iconCandidates = fs.readdirSync(this.iconCandidatesDir);
    }
  }

  /**Place in the `n8n` repo all the node functionality files:
   * - `*.node.ts`,
   * - `package.json`,
   * - `*.credentials.ts`,
   * - `GenericFunctions.ts`,
   * - the node PNG icon, and
   * - any resource files.
   *
   * Note: Returns a promise in order to conform to channel usage.*/
  public async placeNodeFunctionalityFiles(): Promise<BackendOperationResult> {
    try {
      this.verifyFunctionalityFilesToBePlaced();
      await this.placePackageJson();
      await this.placeCredFuncFile();
      await this.placeFuncFilesInTypeScript();
      await this.placeIconFile();
      this.verifyPlacementSuccess();
      return { completed: true, error: false };
    } catch (thrownError) {
      return { completed: false, error: true, errorMessage: thrownError };
    }
  }

  /**Place in the `n8n-docs` repo both node documentation files:
   * - the node functionality documentation file, and
   * - the node credential documentation file.
   *
   * Note: Returns a promise in order to conform to channel usage.*/
  public async placeNodeDocumentationFiles(): Promise<BackendOperationResult> {
    try {
      this.verifyDocumentationFilesToBePlaced();
      this.placeDocFile(this.mainDocFile);
      if (this.credDocFile) {
        this.placeDocFile(this.credDocFile);
      }
      this.verifyPlacementSuccess();
      return { completed: true, error: false };
    } catch (thrownError) {
      return { completed: false, error: true, errorMessage: thrownError };
    }
  }

  /**Verify if all the node functionality files to be placed exist before placement, and store references to them.*/
  private verifyFunctionalityFilesToBePlaced() {
    const mainFuncFile = this.outputFiles.find(FileFinder.isMainFuncFile);
    const credFuncFile = this.outputFiles.find(FileFinder.isCredFuncFile);
    const iconFile = this.iconCandidates.find(FileFinder.isIconFile);

    if (!fs.existsSync(this.packageJson)) {
      throw Error("No package.json file found. Generate it before placement.");
    }

    if (!mainFuncFile) {
      throw Error("No *.node.ts file found. Generate it before placement.");
    }

    if (!this.iconCandidates) {
      throw Error(
        "No icon-candidates dir found. Generate icon candidates before placement."
      );
    }

    if (!iconFile) {
      throw Error(
        "No PNG icon file found. Generate icon candidates and resize one before placement."
      );
    }

    this.mainFuncFile = mainFuncFile;
    this.credFuncFile = credFuncFile;
    this.iconFile = iconFile;
  }

  /**Verify if all the files recorded as placed do not exist in /output anymore.*/
  private verifyPlacementSuccess() {
    this.filesPlaced.forEach((file) => {
      if (fs.existsSync(join(this.outputDir, file))) {
        throw Error("Placement failed for: " + file);
      }
    });
  }

  /**Verify if the main documentation file to be placed exists before placement, and store references to the main documentation file and the credentials documentation file.*/
  private verifyDocumentationFilesToBePlaced() {
    const mainDocFile = this.outputFiles.find(FileFinder.isMainDocFile);
    const credDocFile = this.outputFiles.find(FileFinder.isCredDocFile);

    if (!mainDocFile) {
      throw Error(
        "No main documentation file found. Generate it before placement."
      );
    }

    this.mainDocFile = mainDocFile;
    this.credDocFile = credDocFile;
  }

  /**Place in the `n8n-docs` repo one a node documentation file:
   * - a node functionality documentation file, or
   * - a node credential documentation file.*/
  private async placeDocFile(nodeDocFile: string) {
    if (!nodeDocFile) return; // credential doc file may not exist

    const destinationDir = join(
      nodeDocFile === this.mainDocFile
        ? this.docsFunctionalityDir
        : this.docsCredentialsDir,
      this.getDocDestinationDirname()
    );

    if (!fs.existsSync(destinationDir)) {
      fs.mkdirSync(destinationDir);
    }

    const source = join(this.outputDir, nodeDocFile);

    await this.relocate(source, join(destinationDir, "README.md"));

    this.filesPlaced.push(nodeDocFile);
  }

  /**Place in the `n8n` repo the selected (resized) icon.*/
  private async placeIconFile() {
    const destinationDir = join(
      this.mainNodesDir,
      this.getNodeDestinationDirname()
    );

    if (!fs.existsSync(destinationDir)) {
      fs.mkdirSync(destinationDir);
    }

    const source = join(this.iconCandidatesDir, this.iconFile);
    const destination = join(destinationDir, this.iconFile);

    await this.relocate(source, destination);

    this.filesPlaced.push(this.iconFile);
  }

  /**Place `output/package.json` at `n8n/packages/nodes-base/package.json`. The target `package.json` is overwritten.*/
  private async placePackageJson() {
    const destination = join(this.mainBaseDir, "package.json");
    await this.relocate(this.packageJson, destination);
    this.filesPlaced.push("package.json");
  }

  /**Place `output/*.credentials.ts` at `n8n/packages/nodes-base/credentials/ServiceName`.*/
  private async placeCredFuncFile() {
    if (!this.credFuncFile) return;

    const source = join(this.outputDir, this.credFuncFile);
    const destination = join(this.mainCredentialsDir, this.credFuncFile);

    await this.relocate(source, destination);

    this.filesPlaced.push(this.credFuncFile);
  }

  /**Place in the `n8n` repo node functionality files in TypeScript:
   * - `*.node.ts`,
   * - `GenericFunctions.ts`, and
   * - resource files `*Description.ts` (if any).*/
  private async placeFuncFilesInTypeScript() {
    const funcFilesInTypeScript = this.outputFiles.filter(
      FileFinder.isFuncFileInTypeScript
    );

    const destinationDir = join(
      this.mainNodesDir,
      this.getNodeDestinationDirname()
    );

    if (!fs.existsSync(destinationDir)) {
      fs.mkdirSync(destinationDir);
    }

    funcFilesInTypeScript.forEach(async (file) => {
      const source = join(this.outputDir, file);
      const destination = join(destinationDir, file);
      await this.relocate(source, destination);
    });

    this.filesPlaced.push(...funcFilesInTypeScript);
  }

  /**Create the string for the name of the service, to be used as a new node functionality dirname.*/
  private getNodeDestinationDirname() {
    return this.mainFuncFile.replace(".node.ts", "");
  }

  /**Create the string for the name of the service, to be used as a new docs dirname.*/
  private getDocDestinationDirname() {
    return this.mainDocFile.replace(".md", "");
  }
}
