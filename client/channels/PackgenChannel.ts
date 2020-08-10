import { IpcMainEvent } from "electron";
import IpcChannel from "./IpcChannel.interface";
import PackageJsonGenerator from "../../generators/PackageJsonGenerator";
import sleep from "../../utils/sleep";

export default class PackgenChannel implements IpcChannel {
  public name = "docsgen-channel";

  public async handle(event: IpcMainEvent, metaParameters: MetaParameters) {
    process.chdir("..");

    const generator = new PackageJsonGenerator(metaParameters);
    await generator.retrievePackageJson();

    generator.insertCredentialPathIntoPackageJson();

    await sleep(1000); // to ensure both insertions succeed

    const result = await generator.insertNodePathIntoPackageJson();

    process.chdir("client");

    event.sender.send(this.name, result);
  }
}
