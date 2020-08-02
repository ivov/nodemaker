import { IpcMainEvent } from "electron";
import IpcChannel from "./IpcChannel.interface";

export default class ExampleChannel implements IpcChannel {
  public name = "example-channel";

  public async handle(event: IpcMainEvent) {
    event.sender.send(this.name, "hello my name is erin");
  }
}
