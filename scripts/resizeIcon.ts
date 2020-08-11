import IconResizer from "../services/IconResizer";
import Prompter from "../services/Prompter";
import { metaParameters } from "../parameters";
import Highlighter from "../services/Highlighter";

(async () => {
  const { iconToResize } = await Prompter.forIconResizing();
  const resizer = new IconResizer(metaParameters, iconToResize);
  const result = await resizer.run();

  Highlighter.showResult({
    result,
    successMessage: `Icon candidate ${iconToResize} successfully resized.`,
    inspectMessage: true,
  });
})();
