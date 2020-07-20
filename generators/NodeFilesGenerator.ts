import { exec } from "child_process";
import { mainParameters, metaParameters } from "../parameters";
import Generator from "./Generator";
import { NodeGenerationType } from "../utils/enums";

/**Responsible for generating all node-related files in /output:
 * - `*.node.ts`
 * - `GenericFunctions.ts`
 * - `.credentials.ts`
 * - `*Description.ts` (if complex node generation)
 */
export default class NodeFilesGenerator extends Generator {
  /**Generate `*.node.ts`. Different version based on simple or complex node generation.*/
  generateMainNodeFile(nodeGenerationType: NodeGenerationType) {
    const command = this.formatCommand(`
    gen generateNode${nodeGenerationType}
      --name \"${metaParameters.serviceName}\"
      --metaParameters '${JSON.stringify(metaParameters)}'
      --mainParameters '${JSON.stringify(mainParameters)}'
    `);
    exec(command);
  }

  /**Generate `GenericFunctions.ts` with `*ApiRequest` and `*ApiRequestAllItems`.*/
  generateGenericFunctionsFile() {
    const command = this.formatCommand(`
    gen generateGenericFunctions
      --metaParameters '${JSON.stringify(metaParameters)}'
      --mainParameters '${JSON.stringify(mainParameters)}'
    `);

    exec(command);
  }

  /**Generate `*.credentials.ts`.*/
  generateOAuth2CredentialsFile() {
    const command = this.formatCommand(`
    gen generate${metaParameters.auth}Credential
      --name \"${metaParameters.serviceName}\"
      --serviceCredential ${this.getServiceCredential()}
  `);

    exec(command);
  }

  /** In complex node generation, generate one extra file per resource.*/
  generateResourceDescriptionFile() {
    for (let resourceName in mainParameters) {
      const command = this.formatCommand(`
      gen generateResourceDescription
        --resourceName ${resourceName}
        --resourceObject '${JSON.stringify(mainParameters[resourceName])}'
    `);

      exec(command);
    }
  }
}
