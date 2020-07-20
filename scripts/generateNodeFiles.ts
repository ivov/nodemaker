import { metaParameters } from "../parameters";
import NodeFilesGenerator from "../generators/NodeFilesGenerator";
import { NodeGenerationType } from "../utils/enums";
import Prompter from "../utils/Prompter";

// In the context of "generateNodeFiles", "files" means functionality-related node files, i.e. "*.node.ts", "*.credentials.ts" and node resource description files (if appropriate), as opposed to docs files and the package.json file.

(async () => {
  const { nodeGenerationType } = await Prompter.forNodeGeneration();

  const generator = new NodeFilesGenerator();

  generator.generateMainNodeFile(nodeGenerationType);
  generator.generateGenericFunctionsFile();

  if (nodeGenerationType === NodeGenerationType.complex) {
    generator.generateResourceDescriptionFile();
  }

  if (metaParameters.auth === "OAuth2") {
    generator.generateOAuth2CredentialsFile();
  }
})();
