import puppeteer from "puppeteer";
import config from "../config";
import { N8N_HOMEPAGE_URL } from "./constants";

/**Responsible for logging into the n8n website and creating a workflow.*/
export default class WorkflowCreator {
  private static browser: puppeteer.Browser;
  private static page: puppeteer.Page; // browser tab

  public static async init() {
    WorkflowCreator.browser = await puppeteer.launch({ headless: false });
    WorkflowCreator.page = await WorkflowCreator.browser.newPage();
  }

  public static async doLogin() {
    const { username, password } = config.n8n;
    const usernameSelector = 'input[placeholder="Username or email address"]';
    const passwordSelector = 'input[placeholder="password"]';

    await WorkflowCreator.page.goto(N8N_HOMEPAGE_URL);
    await WorkflowCreator.page.click("a[title='Login']");

    await WorkflowCreator.page.type(usernameSelector, username);
    await WorkflowCreator.page.type(passwordSelector, password);
  }

  public static async close() {
    await WorkflowCreator.page.close();
    await WorkflowCreator.browser.close();
  }
}
