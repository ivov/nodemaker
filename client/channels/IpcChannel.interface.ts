import { IpcMainEvent } from "electron";

export default interface IpcChannel {
  name: string;
  handle(event: IpcMainEvent, argument?: any): Promise<void>;
}
