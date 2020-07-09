import { exec } from "child_process";
import minimist from "minimist";
import { mainParameters, metaParameters } from "./parameters";
import {
  createNodeCommand,
  createGenericFunctionsCommand,
  createoauth2CredentialCommand,
  createResourceDescriptionCommand,
} from "./commands";

const { outputNodeType } = minimist(process.argv.slice(2), {
  string: ["outputNodeType"],
}) as { [key: string]: string };

const main = () => {
  exec(createNodeCommand(outputNodeType, metaParameters, mainParameters));
  exec(createGenericFunctionsCommand(metaParameters, mainParameters));

  if (outputNodeType === "complex") {
    for (let resourceName in mainParameters) {
      exec(
        createResourceDescriptionCommand({
          resourceName: resourceName,
          resourceObject: mainParameters[resourceName],
        })
      );
    }
  }

  if (metaParameters.auth === "OAuth2") {
    exec(createoauth2CredentialCommand(metaParameters));
  }
};

main();
