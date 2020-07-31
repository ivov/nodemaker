import inquirer from "inquirer";

/**Responsible for prompting the user to select choices or enter input for four generation operations. Only static fields and methods allowed.*/
export default class Prompter {
  private static nodeGenerationPrompt = [
    {
      name: "nodeGenerationType",
      type: "list",
      message:
        "Node generation type?\n  - Simple: Node resources in single file.\n  - Complex: Node resources in Description files.\n",
      choices: ["simple", "complex"],
    },
  ];

  private static placementPrompt = [
    {
      name: "filesToPlace",
      type: "list",
      message:
        "Which files to place?\n  - Node files in n8n repo: *.node.ts, GenericFunctions.ts, *.credentials.ts, PNG icon, etc.\n  - Docs files in n8n-docs repo: Markdown files for node and credentials, workflow screencap, etc.\n",
      choices: ["Node files", "Docs files"],
    },
  ];

  private static iconQueryPrompt = [
    {
      name: "imageQuery",
      type: "input",
      message: "Enter query string for image search:",
    },
  ];

  private static iconNumberPrompt = [
    {
      name: "iconToResize",
      type: "list",
      message:
        "Which icon to resize?\n  - Inspect /output/icon-candidates and select the icon by its number\n",
      choices: "12345".split(""),
    },
  ];

  static async forNodeGeneration() {
    return inquirer.prompt<{ nodeGenerationType: "simple" | "complex" }>(
      this.nodeGenerationPrompt
    );
  }

  static async forPlacement() {
    return inquirer.prompt<{ filesToPlace: string }>(this.placementPrompt);
  }

  static async forIconGeneration() {
    return inquirer.prompt<{ imageQuery: string }>(this.iconQueryPrompt);
  }

  static async forIconResizing() {
    return await inquirer.prompt<{
      iconToResize: "1" | "2" | "3" | "4" | "5";
    }>(this.iconNumberPrompt);
  }
}
