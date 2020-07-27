import WorkflowCreator from "../utils/WorkflowCreator";

(async () => {
  await WorkflowCreator.init();
  await WorkflowCreator.doLogin();
  await WorkflowCreator.enterWorkflowDetails();
})();
