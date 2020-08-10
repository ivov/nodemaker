import fs from "fs";
import { join } from "path";
import relocate from "../utils/relocate";
import {
  isMainFuncFile,
  isCredFuncFile,
  isIconFile,
  isMainDocFile,
  isCredDocFile,
  isFuncFileInTypeScript,
} from "../utils/findFiles";

/**Responsible for placing the files at `/output` into their appropriate locations in the `n8n` and `n8n-docs` repos.*/
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
    this.mainBaseDir = join(__dirname, "..", "..", "..", "n8n", "packages", "nodes-base");
    this.mainNodesDir = join(this.mainBaseDir, "nodes");
    this.mainCredentialsDir = join(this.mainBaseDir, "credentials");
    this.docsNodesDir = join(__dirname, "..", "..", "..", "n8n-docs", "docs", "nodes");
    this.docsFunctionalityDir = join(this.docsNodesDir, "nodes-library", "nodes");
    this.docsCredentialsDir = join(this.docsNodesDir, "credentials");

    this.outputFiles = fs.readdirSync(this.outputDir);
    this.packageJson = join(this.outputDir, "package.json");

    if (fs.existsSync(this.iconCandidatesDir)) {
      this.iconCandidates = fs.readdirSync(this.iconCandidatesDir);
    }
  }

  /**Place in the `n8n` repo all the node functionality files:
   * - `*.node.ts`,
   * - `package.json`,
   * - `*.credentials.ts`,
   * - `GenericFunctions.ts`,
   * - the node icon, and
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

  /**Verify that all the functionality files to be placed exist before placement.*/
  private verifyFunctionalityFilesToBePlaced() {
    const mainFuncFile = this.outputFiles.find(isMainFuncFile);
    const credFuncFile = this.outputFiles.find(isCredFuncFile);
    const iconFile = this.iconCandidates.find(isIconFile);

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

  /**Verify that all the documentation files to be placed exist before placement.*/
  private verifyDocumentationFilesToBePlaced() {
    const mainDocFile = this.outputFiles.find(isMainDocFile);
    const credDocFile = this.outputFiles.find(isCredDocFile);

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

    await relocate(source, join(destinationDir, "README.md"));

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

    await relocate(source, destination);

    this.filesPlaced.push(this.iconFile);
  }

  /**Place `output/package.json` at `n8n/packages/nodes-base/package.json`. The target `package.json` is overwritten.*/
  private async placePackageJson() {
    const destination = join(this.mainBaseDir, "package.json");

    await relocate(this.packageJson, destination);

    this.filesPlaced.push("package.json");
  }

  /**Place `output/*.credentials.ts` at `n8n/packages/nodes-base/credentials/ServiceName`.*/
  private async placeCredFuncFile() {
    if (!this.credFuncFile) return;

    const source = join(this.outputDir, this.credFuncFile);
    const destination = join(this.mainCredentialsDir, this.credFuncFile);

    await relocate(source, destination);

    this.filesPlaced.push(this.credFuncFile);
  }

  /**Place in the `n8n` repo node functionality files in TypeScript:
   * - `*.node.ts`,
   * - `GenericFunctions.ts`, and
   * - resource files `*Description.ts` (if any).*/
  private async placeFuncFilesInTypeScript() {
    const funcFilesInTypeScript = this.outputFiles.filter(
      isFuncFileInTypeScript
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
      await relocate(source, destination);
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
