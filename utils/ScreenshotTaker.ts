import puppeteer from "puppeteer";
import { N8N_APP_LOCALHOST } from "./constants";
import { docsParameters } from "../parameters";
import { join } from "path";

/**Responsible for running n8n and taking a screenshot for the docs.*/
export default class ScreenshotTaker {
  private static browser: puppeteer.Browser;
  private static page: puppeteer.Page; // browser tab
  private static savePath: string;

  public static async init() {
    ScreenshotTaker.browser = await puppeteer.launch({ headless: false });
    ScreenshotTaker.page = await ScreenshotTaker.browser.newPage();
    ScreenshotTaker.savePath = join("output", "screenshot.png");
  }

  public static async run() {
    await ScreenshotTaker.page.goto(N8N_APP_LOCALHOST);
    await ScreenshotTaker.placeNewNodeOnCanvas();
    await ScreenshotTaker.connectStartToNewNode();
    await ScreenshotTaker.page.screenshot({
      path: ScreenshotTaker.savePath,
    });
  }

  private static async placeNewNodeOnCanvas() {
    const { serviceName } = docsParameters;

    const nodeCreatorButtonSelector = ".node-creator-button";
    const nodeFilterSelector = 'input[placeholder="Type to filter..."]';
    const nodeDivSelector = ".node-item.clickable.active";
    const closeButtonSelector = ".close-button.clickable.close-on-click";

    await ScreenshotTaker.page.waitFor(1000); // because waiting for UI does not work
    await ScreenshotTaker.page.mouse.click(400, 300); // spot where node will appear
    await ScreenshotTaker.page.click(nodeCreatorButtonSelector);
    await ScreenshotTaker.page.type(nodeFilterSelector, serviceName);

    await ScreenshotTaker.page.waitFor(nodeDivSelector);
    await ScreenshotTaker.page.click(nodeDivSelector);

    await ScreenshotTaker.page.waitFor(closeButtonSelector);
    await ScreenshotTaker.page.click(closeButtonSelector);
  }

  private static async connectStartToNewNode() {
    await ScreenshotTaker.page.waitFor(1000);
    await ScreenshotTaker.page.mouse.click(360, 350); // circular connector
    await ScreenshotTaker.page.mouse.down();
    await ScreenshotTaker.page.mouse.move(410, 350); // rectangular connector
    await ScreenshotTaker.page.mouse.up();
  }
}
