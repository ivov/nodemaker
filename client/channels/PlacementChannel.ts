import { IpcMainEvent } from "electron";
import IpcChannel from "./IpcChannel.interface";
import FilePlacer from "../../services/FilePlacer";

export default class DocsgenChannel implements IpcChannel {
  public name = "placement-channel";

  public async handle(
    event: IpcMainEvent,
    { filesToPlace }: PlacementChannelArgument
  ) {
    process.chdir("..");

    const filePlacer = new FilePlacer();

    const result =
      filesToPlace === "functionality"
        ? filePlacer.placeNodeFunctionalityFiles()
        : filePlacer.placeDocumentationFiles();

    process.chdir("client");

    event.sender.send(this.name, result);
  }
}
