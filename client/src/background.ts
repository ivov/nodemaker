import { readdirSync } from "fs";
import { join } from "path";
import { app, protocol, BrowserWindow, ipcMain } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import IpcChannel from "../channels/IpcChannel.interface";

// Vue boilerplate
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

/**Responsible for managing the Electron app (main process), the various windows (renderer processes), and IPC channels.*/
class Client {
  mainWindow: BrowserWindow | null; // first renderer process

  constructor() {
    app.on("ready", async () => {
      this.installVueDevTools();
      this.createMainWindow();
      await this.registerIpcChannels();
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
  private async registerIpcChannels() {
    const ipcChannels: IpcChannel[] = [];

    for (let module of this.getChannelModules()) {
      const ChannelClass = require(`../channels/${module}`).default; // dynamic import
      ipcChannels.push(new ChannelClass());
    }

    ipcChannels.forEach((channel) =>
      ipcMain.on(channel.name, (event, argument?: any) =>
        channel.handle(event, argument)
      )
    );
  }

  private getChannelModules() {
    return readdirSync(join("channels")).filter(
      (channel) => !channel.endsWith(".interface.ts")
    );
  }
}

new Client();
