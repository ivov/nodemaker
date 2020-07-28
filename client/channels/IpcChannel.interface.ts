import { IpcMainEvent } from "electron";

export default interface IpcChannel {
  name: string;
  handle(event: IpcMainEvent, argument?: string): Promise<void>;
}
