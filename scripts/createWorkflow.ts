import WorkflowCreator from "../services/WorkflowCreator";

(async () => {
  const creator = new WorkflowCreator();
  await creator.init();
  await creator.doLogin();
  await creator.enterWorkflowDetails();
})();
