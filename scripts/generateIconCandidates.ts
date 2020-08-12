import ImageFetcher from "../services/ImageFetcher";
import Prompter from "../services/Prompter";
import Highlighter from "../services/Highlighter";

(async () => {
  const { imageQuery } = await Prompter.forIconGeneration();

  const fetcher = new ImageFetcher(imageQuery);

  const result = await fetcher.run();

  Highlighter.showResult({
    result,
    successMessage: "Icon candidates successfully generated.",
    inspectMessage: true,
  });
})();
