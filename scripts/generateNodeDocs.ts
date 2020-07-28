import NodeDocsGenerator from "../generators/NodeDocsGenerator";
import { metaParameters } from "../parameters";

const docsGenerator = new NodeDocsGenerator();

docsGenerator.generateNodeMainDocs();

if (metaParameters.authType !== "None") {
  docsGenerator.generateNodeCredentialDocs();
}
