import NodeDocsGenerator from "../generators/NodeDocsGenerator";
import { metaParameters } from "../parameters";
import { AuthType } from "../utils/enums";

const docsGenerator = new NodeDocsGenerator();

docsGenerator.generateNodeMainDocs();

if (metaParameters.authType !== AuthType.None) {
  docsGenerator.generateNodeCredentialDocs();
}
