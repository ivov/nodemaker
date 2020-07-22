import { exec } from "child_process";
import { mainParameters, metaParameters } from "../parameters";
import Generator from "./Generator";
import { NodeGenerationType } from "../utils/enums";

/**Responsible for generating all node functionality files at `/output`:
 * - `*.node.ts`
 * - `GenericFunctions.ts`
 * - `.credentials.ts`
 * - one or more `*Description.ts` files (in complex node generation)
 */
export default class NodeFilesGenerator extends Generator {
  /**Generate `*.node.ts`, with a different version for simple or complex node generation.*/
  generateMainNodeFile(nodeGenerationType: string) {
    const command = this.formatCommand(`
    gen generateNode${nodeGenerationType}
      --name \"${metaParameters.serviceName}\"
      --metaParameters '${JSON.stringify(metaParameters)}'
      --mainParameters '${JSON.stringify(mainParameters)}'
    `);
    exec(command);
  }

  /**Generate `GenericFunctions.ts`.*/
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
      --serviceCredential ${this.deriveServiceCredentialName()}
  `);

    exec(command);
  }

  /** In complex node generation, generate one additional file per resource.*/
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
