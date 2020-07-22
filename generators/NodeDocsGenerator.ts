import { exec } from "child_process";
import Generator from "./Generator";
import { docsParameters, mainParameters, metaParameters } from "../parameters";

/**Responsible for generating the node functionality documentation file and the node credential documentation file.*/
export default class NodeDocsGenerator extends Generator {
  /**Generate the node functionality documentation file.*/
  public generateNodeMainDocs() {
    const command = this.formatCommand(`
    gen generateNodeMainDocs
      --name '${metaParameters.serviceName}'
      --docsParameters '${JSON.stringify(docsParameters)}'
      --nodeOperations '${JSON.stringify(this.getNodeOperations())}'
    `);

    exec(command);
  }

  /**Generate the node credential documentation file.*/
  public generateNodeCredentialDocs() {
    const command = this.formatCommand(`
    gen generateNodeCredentialDocs
      --name '${metaParameters.serviceName}'
      --docsParameters '${JSON.stringify(docsParameters)}'
      --metaParameters '${JSON.stringify(metaParameters)}'
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
