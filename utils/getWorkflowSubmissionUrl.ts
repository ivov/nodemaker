import { readFileSync } from "fs";
import { join } from "path";

/**Extracts the workflow number from `workflow-submission-url.txt`, for use in `DocsParameters` for `docsgen`.*/
export const getWorkflowSubmissionUrl = () => {
  try {
    return readFileSync(
      join("output", "workflow-submission-url.txt")
    ).toString();
  } catch (error) {
    // TODO - temporary default
    return "https://n8n.io/workflows/123";
  }
};
