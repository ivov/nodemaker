import { exec } from "child_process";
import Generator from "./Generator";
import { docsParameters, mainParameters } from "../parameters";

export default class NodeDocsGenerator extends Generator {
  public createNodeDocs() {
    const filename = docsParameters.serviceName.replace(/\s/, "");

    const command = this.formatCommand(`
    gen createNodeDocs
      --name ${filename}
      --docsParameters '${JSON.stringify(docsParameters)}'
      --nodeOperations '${JSON.stringify(this.getNodeOperations())}'
    `);
    exec(command);
  }

  private getNodeOperations() {
    const nodeOperations: { [key: string]: string[] } = {};

    Object.keys(mainParameters).forEach((resource) => {
      nodeOperations[resource] = mainParameters[resource].map(
        (operation) => operation.description
      );
    });

    return nodeOperations;
  }
}
