import IconResizer from "../utils/IconResizer";
import Prompter from "../utils/Prompter";

(async () => {
  const { iconToResize } = await Prompter.forIconResizing();
  IconResizer.resize(iconToResize);
})();
