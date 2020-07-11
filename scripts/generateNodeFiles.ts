import { metaParameters } from "../parameters";
import NodeFilesGenerator from "../generators/NodeFilesGenerator";

const nodeGenerationType = process.argv[3].replace("--", "");

if (nodeGenerationType !== "simple" && nodeGenerationType !== "complex") {
  throw Error('Node generation type is neither "simple" nor "complex"');
}

const main = () => {
  const generator = new NodeFilesGenerator();

  generator.createMainNodeFile(nodeGenerationType);
  generator.createGenericFunctionsFile();

  if (nodeGenerationType === "complex") {
    generator.createResourceDescriptionFile();
  }

  if (metaParameters.auth === "OAuth2") {
    generator.createOAuth2CredentialsFile();
  }
};

main();
