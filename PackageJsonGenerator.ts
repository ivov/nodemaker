import { exec } from "child_process";
import fs from "fs";
import fetch from "node-fetch";
import { join } from "path";
import Generator from "./Generator";
import { metaParameters } from "./parameters";
import { PACKAGE_JSON_URL } from "./constants";

export default class PackageJsonGenerator extends Generator {
  private packageJsonData: any;
  private localPackageJsonPath: string;

  constructor() {
    super();
    this.localPackageJsonPath = join("output", "package.json");
  }

  public async retrievePackageJson() {
    const packageJsonData = await this.fetchPackageJson();
    this.savePackageJson(packageJsonData);
  }

  private async fetchPackageJson() {
    const response = await fetch(PACKAGE_JSON_URL);
    return response.json();
  }

  private async savePackageJson(packageJsonData: any) {
    fs.writeFileSync(
      this.localPackageJsonPath,
      JSON.stringify(packageJsonData, null, 2)
    );
    this.packageJsonData = this.readPackageJson();
  }

  private readPackageJson() {
    return JSON.parse(fs.readFileSync(this.localPackageJsonPath).toString());
  }

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

  public insertCredential() {
    const command = this.formatCommand(`
    env HYGEN_OVERWRITE=1
    node node_modules/hygen/dist/bin.js
    gen updateCredentialPackageJson
      --serviceCredential ${this.getServiceCredential()}
      --credentialSpot ${this.findCredentialSpot()}
    `);

    exec(command);
  }

  public insertService() {
    const formattedServiceName = metaParameters.serviceName.replace(/\s/, "");

    const command = this.formatCommand(`
    env HYGEN_OVERWRITE=1
    node node_modules/hygen/dist/bin.js
    gen updateNodePackageJson
      --serviceName ${formattedServiceName}
      --nodeSpot ${this.findNodeSpot()}
    `);

    exec(command);
  }
}
