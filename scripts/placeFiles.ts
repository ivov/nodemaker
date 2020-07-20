import FilePlacer from "../utils/FilePlacer";
import inquirer from "inquirer";
import { NodeDocFile } from "../utils/enums";

const placementPrompt = [
  {
    name: "filesToPlace",
    type: "list",
    message:
      "Which files to place?\n  - Node files in n8n repo: *.node.ts, GenericFunctions.ts, *.credentials.ts, PNG icon, etc.\n  - Docs files in n8n-docs repo: Markdown files for node and credentials, workflow screencap, etc.\n",
    choices: ["Node files", "Docs files"],
  },
];

(async () => {
  const { filesToPlace } = await inquirer.prompt<{ filesToPlace: string }>(
    placementPrompt
  );
  const filePlacer = new FilePlacer();

  if (filesToPlace === "Node files") {
    filePlacer.placeFunctionalFiles();
  } else if (filesToPlace === "Docs files") {
    [NodeDocFile.main, NodeDocFile.credential].forEach((file) =>
      filePlacer.placeDocFile(file)
    );
  }
})();
