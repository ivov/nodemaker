import { exec } from "child_process";
import { mainParameters, metaParameters } from "./parameters";
import Generator from "./Generator";

export default class NodeFilesGenerator extends Generator {
  createMainNodeFile(nodeGenerationType: NodeGenerationType) {
    const command = this.formatCommand(`
    env HYGEN_OVERWRITE=1
    node node_modules/hygen/dist/bin.js
    gen createNode${nodeGenerationType}
      --name \"${metaParameters.serviceName}\"
      --metaParameters '${JSON.stringify(metaParameters)}'
      --mainParameters '${JSON.stringify(mainParameters)}'
    `);

    exec(command);
  }

  createGenericFunctionsFile() {
    const command = this.formatCommand(`
    env HYGEN_OVERWRITE=1
    node node_modules/hygen/dist/bin.js
    gen createGenericFunctions
      --metaParameters '${JSON.stringify(metaParameters)}'
      --mainParameters '${JSON.stringify(mainParameters)}'
    `);
    exec(command);
  }

  createOAuth2CredentialsFile() {
    const command = this.formatCommand(`
    env HYGEN_OVERWRITE=1
    node node_modules/hygen/dist/bin.js
    gen create${metaParameters.auth}Credential
      --name \"${metaParameters.serviceName}\"
      --serviceCredential ${this.getServiceCredential()}
  `);
    exec(command);
  }

  createResourceDescriptionFile() {
    for (let resourceName in mainParameters) {
      const command = this.formatCommand(`
      env HYGEN_OVERWRITE=1
      node node_modules/hygen/dist/bin.js
      gen createResourceDescription
        --resourceName ${resourceName}
        --resourceObject '${JSON.stringify(mainParameters[resourceName])}'
    `);

      exec(command);
    }
  }
}
