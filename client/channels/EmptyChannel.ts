import { IpcMainEvent } from "electron";
import IpcChannel from "./IpcChannel.interface";
import DirectoryEmptier from "../../services/DirectoryEmptier";

export default class EmptyChannel implements IpcChannel {
  public name = "empty-channel";

  public async handle(event: IpcMainEvent) {
    process.chdir("..");
    const emptier = new DirectoryEmptier();
    const result = await emptier.run();
    process.chdir("client");

    event.sender.send(this.name, result);
  }
}
