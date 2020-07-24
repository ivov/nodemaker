import puppeteer from "puppeteer";
import config from "../config";
import { N8N_HOMEPAGE_URL } from "./constants";
import { docsParameters } from "../parameters";

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
    const homepageLoginButtonSelector = "a[title='Login']";
    const usernameSelector = 'input[placeholder="Username or email address"]';
    const passwordSelector = 'input[placeholder="Password"]';
    const loginButtonSelector = 'button[type="submit"]';

    await WorkflowCreator.page.goto(N8N_HOMEPAGE_URL);
    await WorkflowCreator.page.click(homepageLoginButtonSelector);

    await WorkflowCreator.page.waitForNavigation();

    await WorkflowCreator.page.type(usernameSelector, username);
    await WorkflowCreator.page.type(passwordSelector, password);
    await WorkflowCreator.page.click(loginButtonSelector);

    await WorkflowCreator.page.waitForNavigation({ waitUntil: "networkidle0" }); // due to auth redirection
  }

  public static async enterWorkflowDetails() {
    await WorkflowCreator.page.click('a[href="/workflows/edit"]');

    const nameSelector =
      'input[placeholder="The name the workflow should be published as"]';
    const codeAreaSelector = "pre.prism-editor__code";
    const imageLinkTextInputSelector = 'input[placeholder="Image Text"]';
    const imageLinkUrlInputSelector = 'input[placeholder="Image Link"]';
    const imageLinkUrlSubmissionButtonSelector = ".sure";
    const workflowSubmissionButtonSelector = ".main-button";

    const capitalizeFirstLetter = (string: string) =>
      string[0].toUpperCase() + string.slice(1);

    const workflowTitle = capitalizeFirstLetter(docsParameters.exampleUsage);

    await WorkflowCreator.page.waitFor(nameSelector);
    await WorkflowCreator.page.type(nameSelector, workflowTitle);

    await WorkflowCreator.clearTextArea(codeAreaSelector);
    await WorkflowCreator.page.type(codeAreaSelector, "ABC"); // TODO - insert node JSON once node is created

    await WorkflowCreator.page.evaluate(() => {
      const dropdownButtons = document.querySelectorAll(".dropdown-item");
      const imageLinkButton = dropdownButtons[6] as HTMLElement;
      imageLinkButton.click();
    });

    await WorkflowCreator.page.type(imageLinkTextInputSelector, "Workflow");
    await WorkflowCreator.page.type(imageLinkUrlInputSelector, "ABC"); // TODO - insert image URL once image is uploaded

    await WorkflowCreator.page.click(imageLinkUrlSubmissionButtonSelector);

    // await WorkflowCreator.page.click(workflowSubmissionButtonSelector); // TODO - uncomment once above TODOs are done
  }

  private static async clearTextArea(textArea: string) {
    await WorkflowCreator.page.focus(textArea);
    await WorkflowCreator.page.keyboard.down("Control");
    await WorkflowCreator.page.keyboard.press("A");
    await WorkflowCreator.page.keyboard.up("Control");
    await WorkflowCreator.page.keyboard.press("Backspace");
  }

  public static async close() {
    await WorkflowCreator.page.close();
    await WorkflowCreator.browser.close();
  }
}
