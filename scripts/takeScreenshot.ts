import ScreenshotTaker from "../services/ScreenshotTaker";

(async () => {
  await ScreenshotTaker.init();
  await ScreenshotTaker.run();
})();
