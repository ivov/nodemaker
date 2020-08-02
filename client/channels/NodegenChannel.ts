import { IpcMainEvent } from "electron";
import IpcChannel from "./IpcChannel.interface";
import NodeFilesGenerator from "../../generators/NodeFilesGenerator";

export default class NodegenChannel implements IpcChannel {
  public name = "nodegen-channel";

  public async handle(event: IpcMainEvent, paramsBundle: NodegenParamsBundle) {
    process.chdir("..");
    const generator = new NodeFilesGenerator(paramsBundle);
    const result = await generator.run();
    process.chdir("client");

    event.sender.send(this.name, result);
  }
}
