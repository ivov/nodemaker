import puppeteer from "puppeteer";
import fetch from "node-fetch";
import FormData from "form-data";
import { N8N_APP_LOCALHOST } from "../utils/constants";
import { join } from "path";
import { IMGBB_API_URL } from "../utils/constants";
import config from "../config";
import { readFileSync, writeFileSync } from "fs";

/**Responsible for running n8n and taking a screenshot for the docs.*/
export default class ScreenshotTaker {
  private browser: puppeteer.Browser;
  private page: puppeteer.Page; // browser tab
  private readonly pngSavePath = join("output", "workflow.png"); // in-app screenshot
  // prettier-ignore
  private readonly imageUploadUrlSavePath = join("output", "image-upload-url.txt"); // uploaded image URL

  constructor(private metaParameters: MetaParameters) {}

  public async run(): Promise<BackendOperationResult> {
    try {
      await this.init();
      await this.useChromeInstance();
      await this.uploadImage();
      return { completed: true, error: false };
    } catch (thrownError) {
      return { completed: false, error: true, errorMessage: thrownError };
    }
  }

  public async init() {
    this.browser = await puppeteer.launch({ headless: false });
    this.page = await this.browser.newPage();
  }

  public async useChromeInstance() {
    await this.page.goto(N8N_APP_LOCALHOST);
    await this.placeNewNodeOnCanvas();
    await this.connectStartToNewNode();
    await this.page.screenshot({ path: this.pngSavePath });
    await this.getJsonNodeCode();
  }

  private async placeNewNodeOnCanvas() {
    const nodeCreatorButtonSelector = ".node-creator-button";
    const nodeFilterSelector = 'input[placeholder="Type to filter..."]';
    const nodeDivSelector = ".node-item.clickable.active";
    const closeButtonSelector = ".close-button.clickable.close-on-click";

    await this.page.waitFor(1000); // waiting for UI element fails
    await this.page.mouse.click(400, 300); // spot where new node will appear
    await this.page.click(nodeCreatorButtonSelector);
    await this.page.type(nodeFilterSelector, this.metaParameters.serviceName);

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

  /**Upload image to https://imgbb.com and return URL.*/
  public async uploadImage() {
    const imageFile = readFileSync(this.pngSavePath, { encoding: "base64" });
    const formData = new FormData();
    formData.append("image", imageFile);

    const url = `${IMGBB_API_URL}?key=${config.imgbb.apiKey}`;

    const options = {
      method: "POST",
      body: formData,
      headers: formData.getHeaders(),
    };

    const response = await fetch(url, options);
    const jsonResponse = await response.json();
    this.saveImageUploadUrl(jsonResponse.data.url);
  }

  /**TODO - Temporary function to save image upload URL to a TXT file.
   * To be adjusted once UI is further developed.*/
  private saveImageUploadUrl(url: string) {
    writeFileSync(this.imageUploadUrlSavePath, url, "utf8");
  }

  private async getJsonNodeCode() {
    await this.setDownloadDirectory();
    await this.downloadJsonNodeCode();
  }

  private async setDownloadDirectory() {
    // @ts-ignore
    await this.page._client.send("Page.setDownloadBehavior", {
      behavior: "allow",
      downloadPath: join(__dirname, "..", "..", "output"),
    });
  }

  private async downloadJsonNodeCode() {
    await this.page.evaluate(() => {
      const findNodeBySelectorAndRegex = (selector: string, regexp: RegExp) => {
        const elements = Array.from(
          document.querySelectorAll<HTMLElement>(selector)
        );
        const matches = elements.filter((e) => e.innerText.match(regexp));
        return matches[0];
      };

      findNodeBySelectorAndRegex("span", /Download/).click();
    });

    await this.page.waitFor(2000);
  }
}
