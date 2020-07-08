const { formatCommand, getServiceCredential } = require("./utils");

/**Command to generate a simple or complex node:
 * Simple: A node containing resources, operations and fields inside a single file.
 * Complex: A node divided into separate files for each of their resource operations and fields.
 * Note: `name` is passed in separately from `metaParameters` because it is needed in the file name, which is parsed first.*/
const createNodeCommand = (outputNodeType, metaParameters, mainParameters) =>
  formatCommand(`
  env HYGEN_OVERWRITE=1
  node node_modules/hygen/dist/bin.js
  gen createNode${outputNodeType}
    --name \"${metaParameters.serviceName}\"
    --metaParameters '${JSON.stringify(metaParameters)}'
    --mainParameters '${JSON.stringify(mainParameters)}'
`);

const createGenericFunctionsCommand = (metaParameters, mainParameters) =>
  formatCommand(`
  env HYGEN_OVERWRITE=1
  node node_modules/hygen/dist/bin.js
  gen createGenericFunctions
    --metaParameters '${JSON.stringify(metaParameters)}'
    --mainParameters '${JSON.stringify(mainParameters)}'
`);

const createoauth2CredentialCommand = (metaParameters) =>
  formatCommand(`
  env HYGEN_OVERWRITE=1
  node node_modules/hygen/dist/bin.js
  gen create${metaParameters.auth}Credential
    --name \"${metaParameters.serviceName}\"
    --serviceCredential ${getServiceCredential(metaParameters)}
`);

const createResourceDescriptionCommand = ({ resourceName, resourceObject }) =>
  formatCommand(`
  env HYGEN_OVERWRITE=1
  node node_modules/hygen/dist/bin.js
  gen createResourceDescription
    --resourceName ${resourceName}
    --resourceObject '${JSON.stringify(resourceObject)}'
`);

module.exports = {
  createNodeCommand,
  createGenericFunctionsCommand,
  createoauth2CredentialCommand,
  createResourceDescriptionCommand,
};
