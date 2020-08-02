import FilePlacer from "../services/FilePlacer";
import Prompter from "../services/Prompter";

(async () => {
  const { filesToPlace } = await Prompter.forPlacement();
  const filePlacer = new FilePlacer();

  filesToPlace === "Node files"
    ? filePlacer.placeFunctionalFiles()
    : filePlacer.placeDocumentationFiles();
})();
