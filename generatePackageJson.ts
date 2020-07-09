import { exec } from "child_process";
import { metaParameters } from "./parameters";
import {
  sleep,
  retrievePackageJson,
  getServiceCredential,
  readPackageJson,
  findCredentialSpot,
  findNodeSpot,
  formatCommand,
} from "./utils/index";

const main = async () => {
  await retrievePackageJson();
  const packageJsonData = readPackageJson();

  const serviceCredential = getServiceCredential(metaParameters);
  const formattedServiceName = metaParameters.serviceName.replace(/\s/, "");

  const credentialSpot = findCredentialSpot(
    serviceCredential,
    packageJsonData.n8n.credentials as string[]
  );

  const nodeSpot = findNodeSpot(
    metaParameters.serviceName,
    packageJsonData.n8n.nodes as string[]
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
};

main();
