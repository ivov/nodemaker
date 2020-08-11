import IconResizer from "../services/IconResizer";
import Prompter from "../services/Prompter";
import { metaParameters } from "../parameters";

(async () => {
  const { iconToResize } = await Prompter.forIconResizing();
  const resizer = new IconResizer(metaParameters);
  resizer.resize(iconToResize);
})();
