import WorkflowCreator from "../services/WorkflowCreator";
import { docsParameters } from "../parameters";
import Highlighter from "../services/Highlighter";

(async () => {
  const creator = new WorkflowCreator(docsParameters);
  const result = await creator.run();

  Highlighter.showResult({
    result,
    successMessage: "Workflow submission on n8n.io successful.",
    inspectMessage: true,
  });
})();
