import puppeteer from "puppeteer";
import { N8N_APP_LOCALHOST } from "./constants";

/**Responsible for running n8n and taking a screenshot for the docs.*/
export default class ScreenshotTaker {
  private static browser: puppeteer.Browser;
  private static page: puppeteer.Page; // browser tab

  public static async init() {
    ScreenshotTaker.browser = await puppeteer.launch({ headless: false });
    ScreenshotTaker.page = await ScreenshotTaker.browser.newPage();
  }

  public static async createNode() {
    const nodeCreatorButtonSelector = ".node-creator-button";

    await ScreenshotTaker.page.goto(N8N_APP_LOCALHOST);
    await ScreenshotTaker.page.waitForNavigation();

    await ScreenshotTaker.page.click(nodeCreatorButtonSelector);
  }
}
