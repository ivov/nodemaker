import ScreenshotTaker from "../services/ScreenshotTaker";
import { metaParameters } from "../parameters";

(async () => {
  const taker = new ScreenshotTaker(metaParameters);
  // await taker.init();
  // await taker.run();
  await taker.uploadImage();
})();
