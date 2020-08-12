/**Container of boolean checks to identify files in the `/output` dir.*/
export default class FileFinder {
  /**Identify `*.node.ts`.*/
  public static readonly isMainFuncFile = (file: string) =>
    file.endsWith(".node.ts");

  /**Identify `*.credentials.ts`.*/
  public static readonly isCredFuncFile = (file: string) =>
    file.endsWith(".credentials.ts");

  /**Identify final PNG icon inside output/icon-candidates dir.*/
  public static readonly isIconFile = (file: string) =>
    !file.startsWith("icon-candidate");

  /**Identify the main node documentation file.*/
  public static readonly isMainDocFile = (file: string) =>
    file.endsWith(".md") && !file.endsWith("Credentials.md");

  /**Identify the main credentials documentation file.*/
  public static readonly isCredDocFile = (file: string) =>
    file.endsWith("Credentials.md");

  /**Identify node functionality files in TypeScript.*/
  public static readonly isFuncFileInTypeScript = (file: string) => {
    // TODO: Refactor
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

  /**Identify all files in the /output dir except for `.gitkeep` and the /icon-candidates dir.*/
  public static isAnyButGitKeepAndIconCandidatesDir = (file: string) =>
    file !== ".gitkeep" && file !== "icon-candidates";
}
