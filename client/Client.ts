import { app, BrowserWindow, ipcMain } from "electron";
import IpcChannel from "./channels/IpcChannel.interface";
import ExampleChannel from "./channels/ExampleChannel";

/**Responsible for managing the Electron app (main process), the various windows (renderer processes), and IPC channels.*/
export default class Client {
  mainWindow: BrowserWindow | null; // first renderer process

  constructor() {
    app.on("ready", this.createMainWindow);
    app.on("window-all-closed", this.onWindowAllClosed);
    app.allowRendererProcessReuse = true;

    this.registerIpcChannels();
  }

  /**Registers all the IPC channels for handling requests from the renderer process.*/
  registerIpcChannels() {
    const ipcChannels: IpcChannel[] = [new ExampleChannel()];

    ipcChannels.forEach((channel) =>
      ipcMain.on(channel.name, (
        event,
        argument?: string // TODO - generalize arg type
      ) => channel.handle(event, argument))
    );
  }

  private createMainWindow() {
    this.mainWindow = new BrowserWindow({
      // transparent: true,
      // frame: false,
      width: 1000,
      height: 600,
      resizable: false,
      webPreferences: {
        nodeIntegration: true,
      },
    });

    this.mainWindow.loadURL("file://" + process.cwd() + "/client/index.html");
    // this.window.webContents.openDevTools();
    // this.window.setMenu(null);

    this.mainWindow.on("closed", () => {
      this.mainWindow = null; // ensure destruction
    });
  }

  private onWindowAllClosed = () => {
    // keep in background to replicate macOS
    if (process.platform === "darwin") return;

    app.quit();
  };
}
