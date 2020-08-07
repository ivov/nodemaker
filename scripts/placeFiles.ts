import FilePlacer from "../services/FilePlacer";
import Prompter from "../services/Prompter";

(async () => {
  const { filesToPlace } = await Prompter.forPlacement();
  const filePlacer = new FilePlacer();

  filesToPlace === "Node functionality files"
    ? filePlacer.placeNodeFunctionalityFiles()
    : filePlacer.placeDocumentationFiles();
})();
