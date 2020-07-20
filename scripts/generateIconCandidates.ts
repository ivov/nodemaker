import ImageFetcher from "../utils/ImageFetcher";
import Prompter from "../utils/Prompter";

(async () => {
  const { imageQuery } = await Prompter.forIconGeneration();

  const fetcher = new ImageFetcher();

  await fetcher.fetchImageObject(imageQuery);
  fetcher.extractImageLinks();
  fetcher.downloadIconCandidates();
})();
