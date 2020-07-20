import { metaParameters } from "../parameters";
import NodeFilesGenerator from "../generators/NodeFilesGenerator";
import inquirer from "inquirer";

// In the context of "generateNodeFiles", "files" means functionality-related node files, i.e. "*.node.ts", "*.credentials.ts" and node resource description files (if appropriate), as opposed to docs files and the package.json file.

inquirer
  .prompt([
    {
      name: "nodeGenerationType",
      type: "list",
      message:
        "Node generation type?\n  - Simple: Node resources in single file.\n  - Complex: Node resources in Description files.\n",
      choices: ["simple", "complex"],
    },
  ])
  .then(({ nodeGenerationType }) => {
    const generator = new NodeFilesGenerator();

    generator.generateMainNodeFile(nodeGenerationType);
    generator.generateGenericFunctionsFile();

    if (nodeGenerationType === "complex") {
      generator.generateResourceDescriptionFile();
    }

    if (metaParameters.auth === "OAuth2") {
      generator.generateOAuth2CredentialsFile();
    }
  });
