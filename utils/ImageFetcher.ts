import fs from "fs";
import { join } from "path";
import fetch from "node-fetch";
import { CUSTOM_SEARCH_API_URL } from "./constants";
import config from "../config";

export default class ImageFetcher {
  imageObject: any;
  imageLinks: string[] = [];

  async fetchImageObject(query: string) {
    const endpoint = `
    ${CUSTOM_SEARCH_API_URL}?
    q="${query}"&
    cx=${config.searchEngineId}&
    key=${config.projectApiKey}&
    searchType=image&
    imgSize=medium&
    filetype=png&
    num=5&
    start=1
    `.replace(/\s/g, "");

    const response = await fetch(endpoint);
    this.imageObject = await response.json();
  }

  extractImageLinks() {
    this.imageObject.items.forEach((item: any) =>
      this.imageLinks.push(item.link)
    );
  }

  downloadIconCandidates() {
    this.imageLinks.forEach(async (imageLink, index) => {
      const response = await fetch(imageLink);

      const destination = join("output", "icon-candidates");

      if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination);
      }

      const dest = fs.createWriteStream(
        join(destination, `icon-candidate-${index + 1}.png`)
      );
      response.body.pipe(dest);
    });
  }
}
