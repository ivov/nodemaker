import FilePlacer from "../services/FilePlacer";
import Prompter from "../services/Prompter";

(async () => {
  const { filesToPlace } = await Prompter.forPlacement();
  const filePlacer = new FilePlacer();

  const result =
    filesToPlace === "Node functionality files"
      ? await filePlacer.placeNodeFunctionalityFiles()
      : await filePlacer.placeNodeDocumentationFiles();

  console.log(result);
})();
