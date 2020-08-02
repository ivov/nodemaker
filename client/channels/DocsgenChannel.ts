import { IpcMainEvent } from "electron";
import IpcChannel from "./IpcChannel.interface";
import NodeDocsGenerator from "../../generators/NodeDocsGenerator";

export default class DocsgenChannel implements IpcChannel {
  public name = "docsgen-channel";

  public async handle(event: IpcMainEvent, paramsBundle: DocsgenParamsBundle) {
    process.chdir("..");
    const generator = new NodeDocsGenerator(paramsBundle);
    const result = await generator.run();
    process.chdir("client");

    event.sender.send(this.name, result);
  }
}
