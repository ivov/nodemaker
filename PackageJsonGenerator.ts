import { exec } from "child_process";
import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import {
  createCredentialInsertionCommand,
  createServiceInsertionCommand,
} from "./commands";

export default class PackageJsonGenerator {
  public async getPackageJsonData() {
    this.retrievePackageJson();
    return this.readPackageJson();
  }

  private async retrievePackageJson() {
    const packageJsonData = await this.fetchPackageJson();
    this.savePackageJson(packageJsonData);
  }

  private async fetchPackageJson() {
    const url =
      "https://raw.githubusercontent.com/n8n-io/n8n/master/packages/nodes-base/package.json";
    const response = await fetch(url);
    return response.json();
  }

  private async savePackageJson(packageJsonData: any) {
    const destinationPath = path.join("output", "package.json");
    fs.writeFileSync(destinationPath, JSON.stringify(packageJsonData, null, 2));
  }

  private readPackageJson() {
    const sourcePath = path.join("output", "package.json");
    return JSON.parse(fs.readFileSync(sourcePath).toString());
  }

  public findCredentialSpot(input: string, credentials: string[]) {
    for (let credential of credentials) {
      const relevantString = credential.slice(17);
      if (relevantString[0] < input[0]) {
        continue;
      }
      return relevantString.replace(".credentials.js", "");
    }

    throw Error("No spot found!");
  }

  public findNodeSpot(input: string, nodes: string[]) {
    for (let node of nodes) {
      const pathMatch = node.match(/dist\/nodes\/(.*)\.node\.js/);

      if (pathMatch === null) {
        throw Error("No path match found in package.json retrieved from repo!");
      }

      const relevantString = pathMatch[1];

      if (relevantString[0] < input[0]) {
        continue;
      }
      return relevantString.replace(".node.js", "");
    }
    throw Error("No spot found!");
  }

  public insertCredential(serviceCredential: string, credentialSpot: string) {
    exec(createCredentialInsertionCommand(serviceCredential, credentialSpot));
  }

  public insertService(serviceName: string, nodeSpot: string) {
    exec(createServiceInsertionCommand(serviceName, nodeSpot));
  }
}
