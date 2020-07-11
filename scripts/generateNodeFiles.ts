import { metaParameters } from "../parameters";
import NodeFilesGenerator from "../generators/NodeFilesGenerator";
import inquirer from "inquirer";

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

    generator.createMainNodeFile(nodeGenerationType);
    generator.createGenericFunctionsFile();

    if (nodeGenerationType === "complex") {
      generator.createResourceDescriptionFile();
    }

    if (metaParameters.auth === "OAuth2") {
      generator.createOAuth2CredentialsFile();
    }
  });
