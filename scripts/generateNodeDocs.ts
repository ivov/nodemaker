import NodeDocsGenerator from "../generators/NodeDocsGenerator";
import { metaParameters } from "../parameters";

const docsGenerator = new NodeDocsGenerator();

docsGenerator.createNodeMainDocs();

if (metaParameters.auth !== "") {
  console.log("here");
  docsGenerator.createNodeCredentialDocs();
}
