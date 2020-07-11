import { exec } from "child_process";
import fs from "fs";
import fetch from "node-fetch";
import { join } from "path";
import Generator from "./Generator";
import { metaParameters } from "../parameters";
import { PACKAGE_JSON_URL } from "../utils/constants";

export default class PackageJsonGenerator extends Generator {
  private packageJsonData: any;
  private localPackageJsonPath: string;

  constructor() {
    super();
    this.localPackageJsonPath = join("output", "package.json");
  }

  /**Download `package.json` from `packages/nodes-base` from official repo and store it in /output dir.*/
  public async retrievePackageJson() {
    const packageJsonData = await this.fetchPackageJson();
    this.savePackageJson(packageJsonData);
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
  public findCredentialSpot() {
    const serviceCredential = this.getServiceCredential();
    for (let credential of this.packageJsonData.n8n.credentials) {
      const relevantString = credential.slice(17);
      if (relevantString[0] < serviceCredential[0]) {
        continue;
      }
      return relevantString.replace(".credentials.js", "");
    }

    throw Error("No spot found!");
  }

  /**Find the node right after which the new node is to be inserted in `package.json`.*/
  public findNodeSpot() {
    for (let node of this.packageJsonData.n8n.nodes) {
      const pathMatch = node.match(/dist\/nodes\/(.*)\.node\.js/);

      if (pathMatch === null) {
        throw Error("No path match found in package.json retrieved from repo!");
      }

      const relevantString = pathMatch[1];

      if (relevantString[0] < metaParameters.serviceName[0]) {
        continue;
      }
      return relevantString.replace(".node.js", "");
    }
    throw Error("No spot found!");
  }

  /**Insert the new node credential at their appropriate location in `package.json`.*/
  public insertCredential() {
    const command = this.formatCommand(`
    gen updateCredentialPackageJson
      --serviceCredential ${this.getServiceCredential()}
      --credentialSpot ${this.findCredentialSpot()}
    `);

    exec(command);
  }

  /**Insert the new node at their appropriate location in `package.json`.*/
  public insertService() {
    const formattedServiceName = metaParameters.serviceName.replace(/\s/, "");

    const command = this.formatCommand(`
    gen updateNodePackageJson
      --serviceName ${formattedServiceName}
      --nodeSpot ${this.findNodeSpot()}
    `);

    exec(command);
  }
}
