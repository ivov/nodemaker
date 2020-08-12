import DirectoryEmptier from "../services/DirectoryEmptier";
import Highlighter from "../services/Highlighter";

(async () => {
  const emptier = new DirectoryEmptier();
  const result = await emptier.run();

  Highlighter.showResult({
    result,
    successMessage: "Emptied /output dir successfully.",
  });
})();
