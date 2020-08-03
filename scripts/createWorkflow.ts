import WorkflowCreator from "../services/WorkflowCreator";
import { docsParameters } from "../parameters";

(async () => {
  const creator = new WorkflowCreator(docsParameters);
  await creator.run();
})();
