import FilePlacer from "../services/FilePlacer";
import Prompter from "../services/Prompter";
import Highlighter from "../services/Highlighter";

(async () => {
  const { filesToPlace } = await Prompter.forPlacement();
  const filePlacer = new FilePlacer();

  const result =
    filesToPlace === "Node functionality files"
      ? await filePlacer.placeNodeFunctionalityFiles()
      : await filePlacer.placeNodeDocumentationFiles();

  Highlighter.showResult({
    result,
    successMessage: "Placement of files successful.",
  });
})();
