import { IpcMainEvent } from "electron";
import IpcChannel from "./IpcChannel.interface";
import { metaParameters } from "../../parameters";

export default class ExampleChannel implements IpcChannel {
  public name = "example-channel";

  public async handle(event: IpcMainEvent) {
    event.sender.send(this.name, metaParameters.serviceName);
  }
}
