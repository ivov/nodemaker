const { exec } = require("child_process");
const {
  sleep,
  retrievePackageJson,
  getServiceCredential,
  readPackageJson,
  findCredentialSpot,
  findNodeSpot,
} = require("./utils");
const { metaParameters } = require("./parameters");
const { formatCommand } = require("./utils");

(async () => {
  await retrievePackageJson();
  const packageJsonData = readPackageJson();

  const serviceCredential = getServiceCredential(metaParameters);
  const formattedServiceName = metaParameters.serviceName.replace(/\s/, "");

  const credentialSpot = findCredentialSpot(
    serviceCredential,
    packageJsonData.n8n.credentials
  );

  const nodeSpot = findNodeSpot(
    metaParameters.serviceName,
    packageJsonData.n8n.nodes
  );

  const credentialInsertion = formatCommand(`
    env HYGEN_OVERWRITE=1
    node node_modules/hygen/dist/bin.js
    gen updateCredentialPackageJson
      --serviceCredential ${serviceCredential}
      --credentialSpot ${credentialSpot}
  `);

  const serviceInsertion = formatCommand(`
    env HYGEN_OVERWRITE=1
    node node_modules/hygen/dist/bin.js
    gen updateNodePackageJson
      --serviceName ${formattedServiceName}
      --nodeSpot ${nodeSpot}
  `);

  exec(credentialInsertion);
  await sleep(1000); // to ensure both insertions succeed
  exec(serviceInsertion);
})();
