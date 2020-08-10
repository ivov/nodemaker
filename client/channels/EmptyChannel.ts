import { IpcMainEvent } from "electron";
import IpcChannel from "./IpcChannel.interface";
// import PackageJsonGenerator from "../../generators/PackageJsonGenerator";

export default class EmptyChannel implements IpcChannel {
  public name = "empty-channel";

  public async handle(event: IpcMainEvent) {
    process.chdir("..");
    // const generator = new PackageJsonGenerator(metaParameters);
    // const result = await generator.run();
    process.chdir("client");

    // event.sender.send(this.name, result);
  }
}
