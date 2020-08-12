import fs from "fs";
import { join } from "path";
import fetch from "node-fetch";
import { CUSTOM_SEARCH_API_URL } from "../utils/constants";
import config from "../config";

/**Responsible for finding, fetching and saving to disk images for the icon candidates.*/
export default class ImageFetcher {
  private imageObject: any;
  private imageLinks: string[] = [];
  // prettier-ignore
  private readonly iconCandidatesDir = join(__dirname, "..", "..", "output", "icon-candidates");

  constructor(private imageQuery: string) {}

  public async run(): Promise<BackendOperationResult> {
    try {
      await this.fetchImageObject(this.imageQuery);
      this.extractImageLinks();
      this.downloadIconCandidates();
      return { completed: true };
    } catch (error) {
      return { completed: false, error };
    }
  }

  /**Fetch an image object from Google's Custom Search Engine based on the input query.*/
  private async fetchImageObject(query: string) {
    const endpoint = `
    ${CUSTOM_SEARCH_API_URL}?
    q="${query}"&
    cx=${config.googleImageSearch.engineId}&
    key=${config.googleImageSearch.apiKey}&
    searchType=image&
    imgSize=medium&
    filetype=png&
    num=5&
    start=1
    `.replace(/\s/g, "");

    const response = await fetch(endpoint);
    this.imageObject = await response.json();
  }

  /**Extract all the URLs of the image candidates in the image object.*/
  private extractImageLinks() {
    this.imageObject.items.forEach((item: any) =>
      this.imageLinks.push(item.link)
    );
  }

  /**Download and write to disk all the image candidates.*/
  private downloadIconCandidates() {
    this.imageLinks.forEach(async (imageLink, index) => {
      const response = await fetch(imageLink);

      if (!fs.existsSync(this.iconCandidatesDir)) {
        fs.mkdirSync(this.iconCandidatesDir);
      }

      const outputFile = fs.createWriteStream(
        join(this.iconCandidatesDir, `icon-candidate-${index + 1}.png`)
      );

      response.body.pipe(outputFile);
    });
  }
}
