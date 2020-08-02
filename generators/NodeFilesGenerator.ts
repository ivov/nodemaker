import { exec } from "child_process";
import Generator from "./Generator";

/**Responsible for generating all node functionality files at `/output`:
 * - `*.node.ts`
 * - `GenericFunctions.ts`
 * - `.credentials.ts`
 * - one or more `*Description.ts` files (in complex node generation)
 */
export default class NodeFilesGenerator extends Generator {
  private mainParameters: MainParameters;
  private metaParameters: MetaParameters;
  private nodeGenerationType: NodeGenerationType;

  constructor(paramsBundle: ParamsBundle) {
    super();
    this.mainParameters = paramsBundle.mainParameters;
    this.metaParameters = paramsBundle.metaParameters;
    this.nodeGenerationType = paramsBundle.nodeGenerationType;
  }

  /**Generate `*.node.ts`, with a different version for simple or complex node generation.*/
  public generateMainNodeFile() {
    const command = this.formatCommand(`
    gen generateNode${this.nodeGenerationType}
      --name \"${this.metaParameters.serviceName}\"
      --metaParameters '${JSON.stringify(this.metaParameters)}'
      --mainParameters '${JSON.stringify(this.mainParameters)}'
    `);
    exec(command);
  }

  /**Generate `GenericFunctions.ts`.*/
  public generateGenericFunctionsFile() {
    const command = this.formatCommand(`
    gen generateGenericFunctions
      --metaParameters '${JSON.stringify(this.metaParameters)}'
      --mainParameters '${JSON.stringify(this.mainParameters)}'
    `);

    exec(command);
  }

  /**Generate `*.credentials.ts`.*/
  public generateOAuth2CredentialsFile() {
    const command = this.formatCommand(`
    gen generate${this.metaParameters.authType}Credential
      --name \"${this.metaParameters.serviceName}\"
      --serviceCredential ${this.deriveServiceCredentialName()}
    `);

    exec(command);
  }

  /** In complex node generation, generate one additional file per resource.*/
  public generateResourceDescriptionFile() {
    for (let resourceName in this.mainParameters) {
      const command = this.formatCommand(`
      gen generateResourceDescription
        --resourceName ${resourceName}
        --resourceObject '${JSON.stringify(this.mainParameters[resourceName])}'
      `);

      exec(command);
    }
  }
}
