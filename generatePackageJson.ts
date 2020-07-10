import { exec } from "child_process";
import { metaParameters } from "./parameters";
import {
  createCredentialInsertionCommand,
  createServiceInsertionCommand,
} from "./commands";
import {
  sleep,
  retrievePackageJson,
  getServiceCredential,
  readPackageJson,
  findCredentialSpot,
  findNodeSpot,
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

  exec(createCredentialInsertionCommand(serviceCredential, credentialSpot));

  await sleep(1000); // to ensure both insertions succeed

  exec(createServiceInsertionCommand(formattedServiceName, nodeSpot));
};

main();
