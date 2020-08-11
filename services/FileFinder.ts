/**Responsible for identifying files in the `/output`  dir.*/
export default class FileFinder {
  public static isMainFuncFile = (file: string) => file.endsWith(".node.ts");

  public static isCredFuncFile = (file: string) =>
    file.endsWith(".credentials.ts");

  public static isIconFile = (file: string) =>
    !file.startsWith("icon-candidate");

  public static isMainDocFile = (file: string) =>
    file.endsWith(".md") && !file.endsWith("Credentials.md");

  public static isCredDocFile = (file: string) =>
    file.endsWith("Credentials.md");

  // TODO: Refactor
  public static isFuncFileInTypeScript = (file: string) => {
    return (
      file !== ".gitkeep" &&
      file !== "package.json" &&
      file !== "workflow.png" &&
      file !== "unsaved_workflow.json" &&
      !file.startsWith("icon-candidate") &&
      !file.endsWith(".credentials.ts") &&
      !file.endsWith(".md") &&
      !file.endsWith(".txt")
    );
  };

  public static isAnyButGitKeepAndIconCandidatesDir = (file: string) =>
    file !== ".gitkeep" && file !== "icon-candidates";
}
