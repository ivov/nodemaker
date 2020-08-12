import puppeteer from "puppeteer";
import config from "../config";
import { N8N_HOMEPAGE_URL } from "../utils/constants";
import fs from "fs";
import { join } from "path";

/**Responsible for logging into the n8n website and creating a workflow.*/
export default class WorkflowCreator {
  private browser: puppeteer.Browser;
  private page: puppeteer.Page; // browser tab
  private readonly nodeCodeSavePath = join("output", "unsaved_workflow.json");
  // prettier-ignore
  private readonly workflowUrlSavePath = join("output", "workflow-submission-url.txt");
  // prettier-ignore
  private readonly imageUploadUrlSavePath = join("output", "image-upload-url.txt");

  constructor(private docsParameters: DocsParameters) {}

  public async run(): Promise<BackendOperationResult> {
    try {
      await this.init();
      await this.doLogin();
      await this.createWorkflow();
      await this.close();
      return { completed: true };
    } catch (error) {
      return { completed: false, error };
    }
  }

  private async init() {
    this.browser = await puppeteer.launch({
      headless: false,
      args: ["--start-maximized"],
    });
    this.page = await this.browser.newPage();
    await this.page.setViewport({ width: 1100, height: 800 }); // prevent mobile layout
  }

  private async doLogin() {
    const { username, password } = config.n8n;
    const homepageLoginButtonSelector = "a[title='Login']";
    const usernameSelector = 'input[placeholder="Username or email address"]';
    const passwordSelector = 'input[placeholder="Password"]';
    const loginButtonSelector = 'button[type="submit"]';

    await this.page.goto(N8N_HOMEPAGE_URL);
    await this.page.click(homepageLoginButtonSelector);

    await this.page.waitFor(usernameSelector);

    await this.page.type(usernameSelector, username);
    await this.page.type(passwordSelector, password);
    await this.page.click(loginButtonSelector);

    await this.page.waitForNavigation({ waitUntil: "networkidle0" });
  }

  private async createWorkflow() {
    await this.page.click('a[href="/workflows/edit"]');

    const nameSelector =
      'input[placeholder="The name the workflow should be published as"]';
    const codeAreaSelector = "pre.prism-editor__code";
    const imageLinkTextInputSelector = 'input[placeholder="Image Text"]';
    const imageLinkUrlInputSelector = 'input[placeholder="Image Link"]';
    const imageLinkUrlSubmissionButtonSelector = ".sure";

    const capitalizeFirstLetter = (string: string) =>
      string[0].toUpperCase() + string.slice(1);

    const workflowTitle = capitalizeFirstLetter(
      this.docsParameters.exampleUsage
    );

    await this.page.waitFor(nameSelector);
    await this.page.type(nameSelector, workflowTitle);

    await this.clearTextArea(codeAreaSelector);
    await this.page.type(codeAreaSelector, this.readNodeCode());

    await this.page.evaluate(() => {
      const dropdownButtons = document.querySelectorAll(".dropdown-item");
      const imageLinkButton = dropdownButtons[6] as HTMLElement;
      imageLinkButton.click();
    });

    await this.page.type(imageLinkTextInputSelector, "Workflow");
    await this.page.type(imageLinkUrlInputSelector, this.readImageUploadUrl());

    await this.page.click(imageLinkUrlSubmissionButtonSelector);

    // TODO - Click inside `evaluate` because `this.page.click` fails to submit.
    await this.page.evaluate(() => {
      const btn = document.querySelector("button[type=submit]") as HTMLElement;
      btn.click();
    });

    await this.page.waitForNavigation({ waitUntil: "networkidle0" });
    await this.saveWorkflowUrl();
  }

  /**TODO - Temporary function to save workflow url into a TXT file.
   * To be adjusted once UI is further developed.*/
  private async saveWorkflowUrl() {
    fs.writeFileSync(this.workflowUrlSavePath, this.page.url(), "utf8");
  }

  /**TODO - Temporary function to read image upload URL from a TXT file.
   * To be adjusted once UI is further developed.*/
  private readImageUploadUrl() {
    return fs.readFileSync(this.imageUploadUrlSavePath, "utf-8");
  }

  private async clearTextArea(textArea: string) {
    await this.page.focus(textArea);
    await this.page.keyboard.down("Control");
    await this.page.keyboard.press("A");
    await this.page.keyboard.up("Control");
    await this.page.keyboard.press("Backspace");
  }

  private readNodeCode() {
    return fs.readFileSync(this.nodeCodeSavePath).toString();
  }

  private async close() {
    await this.page.close();
    await this.browser.close();
  }
}
