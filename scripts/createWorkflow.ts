import WorkflowCreator from "../services/WorkflowCreator";

(async () => {
  await WorkflowCreator.init();
  await WorkflowCreator.doLogin();
  await WorkflowCreator.enterWorkflowDetails();
})();
