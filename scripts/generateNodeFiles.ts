import inquirer from "inquirer";
import { metaParameters } from "../parameters";
import NodeFilesGenerator from "../generators/NodeFilesGenerator";
import { NodeGenerationType } from "../utils/enums";

// In the context of "generateNodeFiles", "files" means functionality-related node files, i.e. "*.node.ts", "*.credentials.ts" and node resource description files (if appropriate), as opposed to docs files and the package.json file.

const nodeGenerationPrompt = [
  {
    name: "nodeGenerationType",
    type: "list",
    message:
      "Node generation type?\n  - Simple: Node resources in single file.\n  - Complex: Node resources in Description files.\n",
    choices: ["simple", "complex"],
  },
];

(async () => {
  const { nodeGenerationType } = await inquirer.prompt<{
    nodeGenerationType: NodeGenerationType;
  }>(nodeGenerationPrompt);

  const generator = new NodeFilesGenerator();

  generator.generateMainNodeFile(nodeGenerationType);
  generator.generateGenericFunctionsFile();

  if (nodeGenerationType === NodeGenerationType.complex) {
    generator.generateResourceDescriptionFile();
  }

  if (metaParameters.auth === "OAuth2") {
    generator.generateOAuth2CredentialsFile();
  }
})();
