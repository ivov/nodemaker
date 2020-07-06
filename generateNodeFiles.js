const { exec } = require("child_process");
const { mainParameters, metaParameters } = require("./parameters");
const { formatCommand, getServiceCredential } = require("./utils");

// `name` is passed in separately from `metaParameters` because it is needed in the file name, which is parsed first.

const nodeGeneration = formatCommand(`
  env HYGEN_OVERWRITE=1
  node node_modules/hygen/dist/bin.js
  gen new
    --name \"${metaParameters.serviceName}\"
    --metaParameters '${JSON.stringify(metaParameters)}'
    --mainParameters '${JSON.stringify(mainParameters)}'
`);

(async () => {
  exec(nodeGeneration);

  if (metaParameters.auth !== "") {
    const oauth2CredentialGeneration = formatCommand(`
      env HYGEN_OVERWRITE=1
      node node_modules/hygen/dist/bin.js
      gen create${metaParameters.auth}Credential
        --name \"${metaParameters.serviceName}\"
        --serviceCredential ${getServiceCredential(metaParameters)}
    `);

    exec(oauth2CredentialGeneration);
  }
})();
