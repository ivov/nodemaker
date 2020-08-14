import { exec } from "child_process";
import fs from "fs";
import fetch from "node-fetch";
import { join } from "path";
import Generator from "./Generator";
import { PACKAGE_JSON_URL } from "../utils/constants";
import sleep from "../utils/sleep";

export default class PackageJsonGenerator extends Generator {
  private readonly localPackageJsonPath = join("output", "package.json");
  private packageJsonData: any;

  constructor(private metaParameters: MetaParameters) {
    super();
  }

  public async run(): Promise<BackendOperationResult> {
    try {
      await this.getPackageJson();
      this.verifyIfNodeToBeCreatedExists();
      this.savePackageJson();
      this.insertCredentialInPackageJson();
      await sleep(1000); // to ensure both insertions succeed
      this.insertNodeInPackageJson();
      return { completed: true };
    } catch (error) {
      return { completed: false, error };
    }
  }

  /**Verify if the service name of the node to be created already exists in the package.json of the official n8n repo.*/
  private verifyIfNodeToBeCreatedExists() {
    const nodeToBeCreated = this.metaParameters.serviceName.replace(/\s/, "");

    for (let node of this.packageJsonData.n8n.nodes) {
      let existingNode = node.match(/dist\/nodes\/(.*)\.node\.js/)[1];

      // remove dir name if it exists
      if (existingNode.split("").includes("/")) {
        existingNode = existingNode.replace(/.*\//, "");
      }

      if (nodeToBeCreated === existingNode) {
        throw Error(
          "The node you are trying to create already exists in the official n8n repo.\nPlease change the serviceName of the node in metaParameters in parameters.ts."
        );
      }
    }
  }

  /**Insert the new node credential at their appropriate location in `package.json`.*/
  private insertCredentialInPackageJson() {
    const command = this.formatCommand(`
    gen updateCredentialPackageJson
      --serviceCredential ${this.getServiceCredentialName(this.metaParameters)}
      --credentialSpot ${this.findCredentialSpot()}
    `);

    exec(command);
  }

  /**Insert the new node at their appropriate location in `package.json`.*/
  private insertNodeInPackageJson() {
    const { serviceName } = this.metaParameters;
    const formattedServiceName = serviceName.replace(/\s/, "");

    const command = this.formatCommand(`
    gen updateNodePackageJson
      --serviceName ${formattedServiceName}
      --nodeSpot ${this.findNodeSpot()}
    `);

    exec(command);
  }

  /**Get contents of `package.json` from `packages/nodes-base` from the official n8n repo.*/
  private async getPackageJson() {
    const response = await fetch(PACKAGE_JSON_URL);
    this.packageJsonData = await response.json();
  }

  /**Write contents of `package.json` from `packages/nodes-base` from official repo in /output dir.*/
  private savePackageJson() {
    fs.writeFileSync(
      this.localPackageJsonPath,
      JSON.stringify(this.packageJsonData, null, 2)
    );
  }

  /**Find the credential right after which the new node credential is to be inserted in `package.json`.*/
  private findCredentialSpot() {
    const serviceCredential = this.getServiceCredentialName(
      this.metaParameters
    );
    for (let credential of this.packageJsonData.n8n.credentials) {
      const relevantString = credential.slice(17);
      if (relevantString[0] < serviceCredential[0]) {
        continue;
      }
      return relevantString.replace(".credentials.js", "");
    }

    throw Error(
      "No spot for node credential path insertion found in package.json retrieved from official n8n repository."
    );
  }

  /**Find the node right after which the new node is to be inserted in `package.json`.*/
  private findNodeSpot() {
    for (let node of this.packageJsonData.n8n.nodes) {
      const pathMatch = node.match(/dist\/nodes\/(.*)\.node\.js/);

      if (pathMatch === null) {
        throw Error(
          "No path match found in package.json retrieved from official n8n repository."
        );
      }

      const relevantString = pathMatch[1];

      if (relevantString[0] < this.metaParameters.serviceName[0]) {
        continue;
      }
      return relevantString.replace(".node.js", "");
    }
    throw Error(
      "No spot for node path insertion found in package.json retrieved from official n8n repository."
    );
  }
}
