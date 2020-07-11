import ImageFetcher from "../utils/ImageFetcher";
import inquirer from "inquirer";

inquirer
  .prompt([
    {
      name: "imageQuery",
      type: "input",
      message: "Enter query string for image search:",
    },
  ])
  .then(async ({ imageQuery }) => {
    const fetcher = new ImageFetcher();
    await fetcher.fetchImageObject(imageQuery);
    fetcher.extractImageLinks();
    fetcher.downloadIconCandidates();
  });
