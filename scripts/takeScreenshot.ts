import ScreenshotTaker from "../services/ScreenshotTaker";

(async () => {
  const taker = new ScreenshotTaker();
  await taker.init();
  await taker.run();
})();
