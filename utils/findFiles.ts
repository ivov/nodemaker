export const isMainFuncFile = (file: string) => file.endsWith(".node.ts");

export const isCredFuncFile = (file: string) =>
  file.endsWith(".credentials.ts");

export const isIconFile = (file: string) => !file.startsWith("icon-candidate");

export const isMainDocFile = (file: string) =>
  file.endsWith(".md") && !file.endsWith("Credentials.md");

export const isCredDocFile = (file: string) => file.endsWith("Credentials.md");

// TODO: Refactor
export const isFuncFileInTypeScript = (file: string) =>
  file !== ".gitkeep" &&
  file !== "package.json" &&
  file !== "workflow.png" &&
  file !== "unsaved_workflow.json" &&
  !file.startsWith("icon-candidate") &&
  !file.endsWith(".credentials.ts") &&
  !file.endsWith(".md") &&
  !file.endsWith(".txt");

export const allButGitKeepAndIconCandidatesDir = (file: string) =>
  file !== ".gitkeep" && file !== "icon-candidates";
