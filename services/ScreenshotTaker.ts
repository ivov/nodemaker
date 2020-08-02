import puppeteer from "puppeteer";
import { N8N_APP_LOCALHOST } from "../utils/constants";
import { docsParameters } from "../parameters";
import { join } from "path";

/**Responsible for running n8n and taking a screenshot for the docs.*/
export default class ScreenshotTaker {
  private browser: puppeteer.Browser;
  private page: puppeteer.Page; // browser tab
  private savePath: string;

  public async init() {
    this.browser = await puppeteer.launch({ headless: false });
    this.page = await this.browser.newPage();
    this.savePath = join("output", "screenshot.png");
  }

  public async run() {
    await this.page.goto(N8N_APP_LOCALHOST);
    await this.placeNewNodeOnCanvas();
    await this.connectStartToNewNode();
    await this.page.screenshot({
      path: this.savePath,
    });
  }

  private async placeNewNodeOnCanvas() {
    const { serviceName } = docsParameters;

    const nodeCreatorButtonSelector = ".node-creator-button";
    const nodeFilterSelector = 'input[placeholder="Type to filter..."]';
    const nodeDivSelector = ".node-item.clickable.active";
    const closeButtonSelector = ".close-button.clickable.close-on-click";

    await this.page.waitFor(1000); // because waiting for UI does not work
    await this.page.mouse.click(400, 300); // spot where node will appear
    await this.page.click(nodeCreatorButtonSelector);
    await this.page.type(nodeFilterSelector, serviceName);

    await this.page.waitFor(nodeDivSelector);
    await this.page.click(nodeDivSelector);

    await this.page.waitFor(closeButtonSelector);
    await this.page.click(closeButtonSelector);
  }

  private async connectStartToNewNode() {
    await this.page.waitFor(1000);
    await this.page.mouse.click(360, 350); // circular connector
    await this.page.mouse.down();
    await this.page.mouse.move(410, 350); // rectangular connector
    await this.page.mouse.up();
  }
}
