import puppeteer from "puppeteer";
import config from "../config";
import { N8N_HOMEPAGE_URL } from "./constants";

/**Responsible for logging into the n8n website and creating a workflow.*/
export default class WorkflowCreator {
  private static browser: puppeteer.Browser;
  private static page: puppeteer.Page;

  public static async init() {
    WorkflowCreator.browser = await puppeteer.launch({ headless: false });
    WorkflowCreator.page = await WorkflowCreator.browser.newPage();
  }

  public static async doLogin() {
    await WorkflowCreator.page.goto(N8N_HOMEPAGE_URL);
    await WorkflowCreator.page.waitForNavigation();
    await WorkflowCreator.page.click("button.el-button--success");

    // await Promise.all([

    // ]);

    // const { username, password } = config.n8n;
    // await WebScraper.page.type("input[name='username']", email);
    // await WebScraper.page.type("input[name='password']", password);
  }
}
