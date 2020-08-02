import { IpcMainEvent } from "electron";
import IpcChannel from "./IpcChannel.interface";
import { generateNodeFiles } from "../../scripts/generateNodeFiles";

export default class ParametersChannel implements IpcChannel {
  public name = "parameters-channel";

  public async handle(event: IpcMainEvent, paramsBundle: ParamsBundle) {
    process.chdir("..");
    const result = await generateNodeFiles(paramsBundle);
    process.chdir("client");

    event.sender.send(this.name, result);
  }
}
