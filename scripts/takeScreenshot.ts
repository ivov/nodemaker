import ScreenshotTaker from "../services/ScreenshotTaker";
import { metaParameters } from "../parameters";
import Highlighter from "../services/Highlighter";

(async () => {
  const taker = new ScreenshotTaker(metaParameters);
  const result = await taker.run();

  Highlighter.showResult({
    result,
    successMessage: "Screenshot generation successful.",
    inspectMessage: true,
  });
})();
