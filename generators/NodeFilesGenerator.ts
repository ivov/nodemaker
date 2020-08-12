import { execSync as exec } from "child_process"; // sync to facilitate subsequent verification
import { join } from "path";
import Generator from "./Generator";
import { NodeGenerationEnum, AuthEnum } from "../utils/enums";
import { readdirSync } from "fs";
import { areTriggerNodeParameters } from "../utils/typeGuards";

/**Responsible for generating all node functionality files at `/output`:
 * - `*.node.ts`
 * - `GenericFunctions.ts`
 * - `.credentials.ts`
 * - one or more `*Description.ts` files (in complex node generation)
 */
export default class NodeFilesGenerator extends Generator {
  private metaParameters: MetaParameters;
  private mainParameters: MainParameters;
  private nodeGenerationType: NodeGenerationType;
  private nodeType: NodeType;

  constructor(paramsBundle: NodegenParamsBundle) {
    super();
    this.mainParameters = paramsBundle.mainParameters;
    this.metaParameters = paramsBundle.metaParameters;
    this.nodeGenerationType = paramsBundle.nodeGenerationType;
    this.nodeType = paramsBundle.nodeType;
  }

  /**Generate all node functionality files.*/
  async run(): Promise<BackendOperationResult> {
    try {
      this.generateMainNodeFile();
      this.generateGenericFunctionsFile();

      if (this.nodeGenerationType === NodeGenerationEnum.Complex) {
        this.generateResourceDescriptionFile();
      }

      if (this.metaParameters.authType !== AuthEnum.None) {
        this.generateCredentialsFile();
      }

      this.verifyGeneratedFuncFiles();
      return { completed: true, error: false };
    } catch (thrownError) {
      return { completed: false, error: true, errorMessage: thrownError };
    }
  }

  /**Generate `*.node.ts` (regular node) or `*Trigger.node.ts` (trigger node), with a different version for simple or complex node generation.*/
  private generateMainNodeFile() {
    const command = this.formatCommand(`
    gen generate${this.nodeType}Node${this.nodeGenerationType}
      --name \"${this.metaParameters.serviceName}\"
      --metaParameters '${JSON.stringify(this.metaParameters)}'
      --mainParameters '${JSON.stringify(this.mainParameters)}'
    `);
    exec(command);
  }

  /**Generate `GenericFunctions.ts`.*/
  private generateGenericFunctionsFile() {
    const command = this.formatCommand(`
    gen generateGenericFunctions
      --metaParameters '${JSON.stringify(this.metaParameters)}'
      --mainParameters '${JSON.stringify(this.mainParameters)}'
    `);

    exec(command);
  }

  /**Generate `*.credentials.ts` for OAuth2 or API Key.*/
  private generateCredentialsFile() {
    const command = this.formatCommand(`
    gen generate${this.metaParameters.authType}Credential
      --name \"${this.metaParameters.serviceName}\"
      --serviceCredential ${this.getServiceCredentialName(this.metaParameters)}
    `);

    exec(command);
  }

  /** In complex node generation, generate one additional file per resource.*/
  private generateResourceDescriptionFile() {
    if (areTriggerNodeParameters(this.mainParameters)) {
      throw Error("Descriptions cannot be generated for trigger nodes!");
    }

    for (let resourceName in this.mainParameters) {
      const command = this.formatCommand(`
      gen generateResourceDescription
        --resourceName ${resourceName}
        --resourceObject '${JSON.stringify(this.mainParameters[resourceName])}'
      `);

      exec(command);
    }
  }

  /**Verify if the two to four files that are to be generated by `generateNodeFuncFiles` were actually generated.*/
  private verifyGeneratedFuncFiles() {
    let files = readdirSync(join("output"));

    const wasGenerated = (snippet: string) =>
      files.some((file) => file.endsWith(snippet));

    const filesToBeVerified = [".node.ts", "GenericFunctions.ts"];

    if (this.nodeGenerationType === NodeGenerationEnum.Complex)
      filesToBeVerified.push("Description.ts");

    if (this.metaParameters.authType === AuthEnum.OAuth2)
      filesToBeVerified.push("OAuth2Api.credentials.ts");

    filesToBeVerified.forEach((file) => {
      if (!wasGenerated(file)) {
        throw Error("Generation failed for file: " + file);
      }
    });
  }
}
