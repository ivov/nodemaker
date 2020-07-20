import { exec } from "child_process";
import Generator from "./Generator";
import { docsParameters, mainParameters, metaParameters } from "../parameters";

export default class NodeDocsGenerator extends Generator {
  public createNodeMainDocs() {
    const command = this.formatCommand(`
    gen createNodeMainDocs
      --name '${metaParameters.serviceName}'
      --docsParameters '${JSON.stringify(docsParameters)}'
      --nodeOperations '${JSON.stringify(this.getNodeOperations())}'
    `);
    exec(command);
  }

  // private getFileName() {
  //   return docsParameters.serviceName.replace(/\s/g, "");
  // }

  private getNodeOperations() {
    const nodeOperations: { [key: string]: string[] } = {};

    Object.keys(mainParameters).forEach((resource) => {
      nodeOperations[resource] = mainParameters[resource].map(
        (operation) => operation.description
      );
    });

    return nodeOperations;
  }

  public createNodeCredentialDocs() {
    const command = this.formatCommand(`
    gen createNodeCredentialDocs
      --name '${metaParameters.serviceName}'
      --docsParameters '${JSON.stringify(docsParameters)}'
      --metaParameters '${JSON.stringify(metaParameters)}'
    `);
    exec(command);
  }
}
