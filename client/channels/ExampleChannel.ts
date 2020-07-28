import { IpcMainEvent } from "electron";
import IpcChannel from "./IpcChannel.interface";
import { metaParameters } from "../../parameters";

export default class PrototypeChannel implements IpcChannel {
  public name = "prototype-channel";

  public async handle(event: IpcMainEvent) {
    event.sender.send(this.name, metaParameters.serviceName);
  }
}
