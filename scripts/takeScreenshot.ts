import ScreenshotTaker from "../utils/ScreenshotTaker";

(async () => {
  await ScreenshotTaker.init();
  await ScreenshotTaker.run();
})();
