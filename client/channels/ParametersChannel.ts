import { IpcMainEvent } from "electron";
import IpcChannel from "./IpcChannel.interface";
import NodeFilesGenerator from "../../generators/NodeFilesGenerator";
import { NodeGenerationType, AuthType } from "../../utils/enums";

export default class ParametersChannel implements IpcChannel {
  public name = "parameters-channel";

  // TODO - deduplicate this method, see generateNodeFiles in backend
  private generateNodeFiles(paramsBundle: ParamsBundle) {
    try {
      const { nodeGenerationType, metaParameters } = paramsBundle;

      const generator = new NodeFilesGenerator();

      generator.generateMainNodeFile(nodeGenerationType);
      generator.generateGenericFunctionsFile();

      if (nodeGenerationType === NodeGenerationType.Complex) {
        generator.generateResourceDescriptionFile();
      }

      if (metaParameters.authType === AuthType.OAuth2) {
        generator.generateOAuth2CredentialsFile();
      }
      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }

  public async handle(event: IpcMainEvent, paramsBundle: ParamsBundle) {
    const result = this.generateNodeFiles(paramsBundle);

    event.sender.send(this.name, result);
  }
}
