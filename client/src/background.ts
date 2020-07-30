import { app, protocol, BrowserWindow, ipcMain } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import IpcChannel from "../channels/IpcChannel.interface";
import ExampleChannel from "../channels/ExampleChannel";

// Vue boilerplate
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

/**Responsible for managing the Electron app (main process), the various windows (renderer processes), and IPC channels.*/
class Client {
  mainWindow: BrowserWindow | null; // first renderer process

  constructor() {
    app.on("ready", () => {
      this.installVueDevTools();
      this.createMainWindow();
      this.registerIpcChannels();
    });
    app.on("window-all-closed", app.quit);
    app.allowRendererProcessReuse = true;
  }

  // Vue boilerplate
  private installVueDevTools() {
    if (process.env.NODE_ENV !== "production" && !process.env.IS_TEST) {
      try {
        installExtension(VUEJS_DEVTOOLS);
      } catch (error) {
        console.error("Vue Devtools failed to install: ", error.toString());
      }
    }
  }

  private createMainWindow() {
    this.mainWindow = new BrowserWindow({
      width: 1000,
      height: 600,
      resizable: false,
      webPreferences: { nodeIntegration: true },
    });

    // Vue boilerplate
    if (process.env.WEBPACK_DEV_SERVER_URL) {
      this.mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
      if (!process.env.IS_TEST) {
        this.mainWindow.webContents.openDevTools();
      }
    } else {
      createProtocol("app");
      this.mainWindow.loadURL("app://./index.html");
    }

    this.mainWindow.on("closed", () => {
      this.mainWindow = null;
    });
  }

  /**Registers all the IPC channels for handling requests from the renderer process.*/
  private registerIpcChannels() {
    const ipcChannels: IpcChannel[] = [new ExampleChannel()];

    // TODO - generalize argument string type
    ipcChannels.forEach((channel) =>
      ipcMain.on(channel.name, (event, argument?: string) =>
        channel.handle(event, argument)
      )
    );
  }
}

new Client();
