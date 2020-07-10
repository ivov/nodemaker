import { metaParameters } from "./parameters";
import PackageJsonGenerator from "./PackageJsonGenerator";
import { getServiceCredential, sleep } from "./utils/index";

const main = async () => {
  const generator = new PackageJsonGenerator();

  const packageJsonData = await generator.getPackageJsonData();

  const serviceCredential = getServiceCredential(metaParameters);
  const formattedServiceName = metaParameters.serviceName.replace(/\s/, "");

  const credentialSpot = generator.findCredentialSpot(
    serviceCredential,
    packageJsonData.n8n.credentials as string[]
  );

  const nodeSpot = generator.findNodeSpot(
    metaParameters.serviceName,
    packageJsonData.n8n.nodes as string[]
  );

  generator.insertCredential(serviceCredential, credentialSpot);

  await sleep(1000); // to ensure both insertions succeed

  generator.insertService(formattedServiceName, nodeSpot);
};

main();
