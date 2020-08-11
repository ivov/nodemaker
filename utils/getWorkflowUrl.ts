import { readFileSync } from "fs";
import { join } from "path";

/**Extracts the workflow number from `workflow-submission-url.txt`, for use in docsgen.*/
export const getWorkflowUrl = () =>
  readFileSync(join("output", "workflow-submission-url.txt")).toString();
