const { exec } = require("child_process");
const minimist = require("minimist");
const { mainParameters, metaParameters } = require("./parameters");
const {
  createNodeCommand,
  createGenericFunctionsCommand,
  createoauth2CredentialCommand,
  createResourceDescriptionCommand,
} = require("./commands");

const { outputNodeType } = minimist(process.argv.slice(2), {
  string: ["outputNodeType"],
});

(async () => {
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
})();
