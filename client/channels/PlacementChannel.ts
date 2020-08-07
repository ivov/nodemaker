import { IpcMainEvent } from "electron";
import IpcChannel from "./IpcChannel.interface";
import FilePlacer from "../../services/FilePlacer";

export default class PlacementChannel implements IpcChannel {
  public name = "placement-channel";

  public async handle(
    event: IpcMainEvent,
    { filesToPlace }: PlacementChannelArgument
  ) {
    process.chdir("..");

    const filePlacer = new FilePlacer();

    const result =
      filesToPlace === "functionality"
        ? await filePlacer.placeNodeFunctionalityFiles()
        : await filePlacer.placeNodeDocumentationFiles();

    process.chdir("client");

    event.sender.send(this.name, result);
  }
}
