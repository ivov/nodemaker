import { IpcMainEvent } from "electron";
import IpcChannel from "./IpcChannel.interface";
import { generateNodeFiles } from "../../scripts/generateNodeFiles";

export default class ParametersChannel implements IpcChannel {
  public name = "parameters-channel";

  private performGeneration(paramsBundle: ParamsBundle) {
    try {
      process.chdir("..");
      generateNodeFiles(paramsBundle);
      process.chdir("client");
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  }

  public async handle(event: IpcMainEvent, paramsBundle: ParamsBundle) {
    const result = this.performGeneration(paramsBundle);

    event.sender.send(this.name, result);
  }
}
