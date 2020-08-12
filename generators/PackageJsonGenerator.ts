import { exec } from "child_process";
import fs from "fs";
import fetch from "node-fetch";
import { join } from "path";
import Generator from "./Generator";
import { PACKAGE_JSON_URL } from "../utils/constants";
import sleep from "../utils/sleep";

export default class PackageJsonGenerator extends Generator {
  private packageJsonData: any;
  private localPackageJsonPath: string;

  constructor(private metaParameters: MetaParameters) {
    super();
    this.localPackageJsonPath = join("output", "package.json");
  }

  public async run(): Promise<BackendOperationResult> {
    try {
      await this.retrievePackageJson();
      this.insertCredentialPathIntoPackageJson();
      await sleep(1000); // to ensure both insertions succeed
      this.insertNodePathIntoPackageJson();
      return { completed: true };
    } catch (error) {
      return { completed: false, error };
    }
  }

  /**Download `package.json` from `packages/nodes-base` from official repo and store it at `/output` dir.*/
  public async retrievePackageJson() {
    const packageJsonData = await this.fetchPackageJson();
    this.savePackageJson(packageJsonData);
  }

  /**Insert the new node credential at their appropriate location in `package.json`.*/
  public insertCredentialPathIntoPackageJson() {
    const command = this.formatCommand(`
    gen updateCredentialPackageJson
      --serviceCredential ${this.getServiceCredentialName(this.metaParameters)}
      --credentialSpot ${this.findCredentialSpot()}
    `);

    exec(command);
  }

  /**Insert the new node at their appropriate location in `package.json`.*/
  public insertNodePathIntoPackageJson() {
    const { serviceName } = this.metaParameters;
    const formattedServiceName = serviceName.replace(/\s/, "");

    const command = this.formatCommand(`
    gen updateNodePackageJson
      --serviceName ${formattedServiceName}
      --nodeSpot ${this.findNodeSpot()}
    `);

    exec(command);
  }

  /**Get contents of `package.json` from `packages/nodes-base` from official repo.*/
  private async fetchPackageJson() {
    const response = await fetch(PACKAGE_JSON_URL);
    return response.json();
  }

  /**Write contents of `package.json` from `packages/nodes-base` from official repo in /output dir.*/
  private async savePackageJson(packageJsonData: any) {
    fs.writeFileSync(
      this.localPackageJsonPath,
      JSON.stringify(packageJsonData, null, 2)
    );
    this.packageJsonData = this.readPackageJson();
  }

  /**Parse `package.json` into JSON object.*/
  private readPackageJson() {
    return JSON.parse(fs.readFileSync(this.localPackageJsonPath).toString());
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

    throw Error("No spot for node credential path insertion found!");
  }

  /**Find the node right after which the new node is to be inserted in `package.json`.*/
  private findNodeSpot() {
    for (let node of this.packageJsonData.n8n.nodes) {
      const pathMatch = node.match(/dist\/nodes\/(.*)\.node\.js/);

      if (pathMatch === null) {
        throw Error("No path match found in package.json retrieved from repo!");
      }

      const relevantString = pathMatch[1];

      if (relevantString[0] < this.metaParameters.serviceName[0]) {
        continue;
      }
      return relevantString.replace(".node.js", "");
    }
    throw Error("No spot for node path insertion found!");
  }
}
