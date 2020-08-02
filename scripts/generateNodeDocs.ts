import NodeDocsGenerator from "../generators/NodeDocsGenerator";
import { metaParameters } from "../parameters";
import { AuthEnum } from "../utils/enums";

const docsGenerator = new NodeDocsGenerator();

docsGenerator.generateNodeMainDocs();

if (metaParameters.authType !== AuthEnum.None) {
  docsGenerator.generateNodeCredentialDocs();
}
