import FilePlacer from "../utils/FilePlacer";
import { NodeDocFile, FilesToPlace } from "../utils/enums";
import Prompter from "../utils/Prompter";

(async () => {
  const { filesToPlace } = await Prompter.forPlacement();
  const filePlacer = new FilePlacer();

  if (filesToPlace === FilesToPlace.nodeFunctionalityFiles) {
    filePlacer.placeFunctionalFiles();
  } else if (FilesToPlace.nodeDocumentationFiles) {
    [NodeDocFile.main, NodeDocFile.credential].forEach((file) =>
      filePlacer.placeDocFile(file)
    );
  }
})();
