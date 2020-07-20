import FilePlacer from "../utils/FilePlacer";
import { NodeDocFile } from "../utils/enums";
import Prompter from "../utils/Prompter";

(async () => {
  const { filesToPlace } = await Prompter.forPlacement();
  const filePlacer = new FilePlacer();

  if (filesToPlace === "Node files") {
    filePlacer.placeFunctionalFiles();
  } else if (filesToPlace === "Docs files") {
    [NodeDocFile.main, NodeDocFile.credential].forEach((file) =>
      filePlacer.placeDocFile(file)
    );
  }
})();
