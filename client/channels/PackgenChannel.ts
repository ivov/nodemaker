import { IpcMainEvent } from "electron";
import IpcChannel from "./IpcChannel.interface";
import PackageJsonGenerator from "../../generators/PackageJsonGenerator";

export default class PackgenChannel implements IpcChannel {
  public name = "packgen-channel";

  public async handle(event: IpcMainEvent, metaParameters: MetaParameters) {
    process.chdir("..");
    const generator = new PackageJsonGenerator(metaParameters);
    const result = await generator.run();
    process.chdir("client");

    event.sender.send(this.name, result);
  }
}
