import FilePlacer from "../utils/FilePlacer";
import Prompter from "../utils/Prompter";

(async () => {
  const { filesToPlace } = await Prompter.forPlacement();
  const filePlacer = new FilePlacer();

  filesToPlace === "Node files"
    ? filePlacer.placeFunctionalFiles()
    : filePlacer.placeDocumentationFiles();
})();
