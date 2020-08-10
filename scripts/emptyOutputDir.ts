import DirectoryEmptier from "../services/DirectoryEmptier";

(async () => {
  const emptier = new DirectoryEmptier();
  const result = await emptier.run();
  console.log(result);
})();
