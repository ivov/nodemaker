import ImageFetcher from "../services/ImageFetcher";
import Prompter from "../services/Prompter";

(async () => {
  const { imageQuery } = await Prompter.forIconGeneration();

  const fetcher = new ImageFetcher();

  await fetcher.fetchImageObject(imageQuery);
  fetcher.extractImageLinks();
  fetcher.downloadIconCandidates();
})();
