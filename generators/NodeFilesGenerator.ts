import { exec } from "child_process";
import { mainParameters, metaParameters } from "../parameters";
import Generator from "./Generator";

/**Responsible for generating all node-related files in /output:
 * - `*.node.ts`
 * - `GenericFunctions.ts`
 * - `.credentials.ts`
 * - `*Description.ts` (if complex node generation)
 */
export default class NodeFilesGenerator extends Generator {
  /**Create `*.node.ts`. Different version based on simple or complex node generation.*/
  createMainNodeFile(nodeGenerationType: NodeGenerationType) {
    const command = this.formatCommand(`
    gen createNode${nodeGenerationType}
      --name \"${metaParameters.serviceName}\"
      --metaParameters '${JSON.stringify(metaParameters)}'
      --mainParameters '${JSON.stringify(mainParameters)}'
    `);
    exec(command);
  }

  /**Create `GenericFunctions.ts` with `*ApiRequest` and `*ApiRequestAllItems`.*/
  createGenericFunctionsFile() {
    const command = this.formatCommand(`
    gen createGenericFunctions
      --metaParameters '${JSON.stringify(metaParameters)}'
      --mainParameters '${JSON.stringify(mainParameters)}'
    `);

    exec(command);
  }

  /**Create `*.credentials.ts`.*/
  createOAuth2CredentialsFile() {
    const command = this.formatCommand(`
    gen create${metaParameters.auth}Credential
      --name \"${metaParameters.serviceName}\"
      --serviceCredential ${this.getServiceCredential()}
  `);

    exec(command);
  }

  /** In complex node generation, create one extra file per resource.*/
  createResourceDescriptionFile() {
    for (let resourceName in mainParameters) {
      const command = this.formatCommand(`
      gen createResourceDescription
        --resourceName ${resourceName}
        --resourceObject '${JSON.stringify(mainParameters[resourceName])}'
    `);

      exec(command);
    }
  }
}
