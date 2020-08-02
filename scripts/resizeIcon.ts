import IconResizer from "../services/IconResizer";
import Prompter from "../services/Prompter";

(async () => {
  const { iconToResize } = await Prompter.forIconResizing();
  IconResizer.resize(iconToResize);
})();
