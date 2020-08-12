import inquirer from "inquirer";

/**Responsible for prompting the user to select choices or enter input.*/
export default class Prompter {
  private static readonly nodeGenerationTypePrompt = [
    {
      name: "nodeGenerationType",
      type: "list",
      message:
        "Node generation type?\n  - Simple: Node resources in single file.\n  - Complex: Node resources in Description files.\n",
      choices: ["Simple", "Complex"],
    },
  ];

  private static readonly nodeTypePrompt = [
    {
      name: "nodeType",
      type: "list",
      message:
        "Node type?\n  - Regular: Called when the workflow is executed.\n  - Trigger: Called when the workflow is activated.\n",
      choices: ["Regular", "Trigger"],
    },
  ];

  private static readonly placementPrompt = [
    {
      name: "filesToPlace",
      type: "list",
      message:
        "Which files to place?\n  - Node functionality files → n8n repo: *.node.ts, GenericFunctions.ts, *.credentials.ts, PNG icon, etc.\n  - Node documentation files → n8n-docs repo: Markdown files for node and credentials, workflow screencap, etc.\n",
      choices: ["Node functionality files", "Node documentation files"],
    },
  ];

  private static readonly iconQueryPrompt = [
    {
      name: "imageQuery",
      type: "input",
      message: "Enter query string for image search:",
    },
  ];

  private static readonly iconNumberPrompt = [
    {
      name: "iconToResize",
      type: "list",
      message:
        "Which icon to resize?\n  - Inspect /output/icon-candidates and select the icon by its number\n",
      choices: "12345".split(""),
    },
  ];

  static async forNodeGenerationType() {
    return inquirer.prompt<{ nodeGenerationType: NodeGenerationType }>(
      this.nodeGenerationTypePrompt
    );
  }

  static async forNodeType() {
    return inquirer.prompt<{ nodeType: NodeType }>(this.nodeTypePrompt);
  }

  static async forPlacement() {
    return inquirer.prompt<{ filesToPlace: string }>(this.placementPrompt);
  }

  static async forIconGeneration() {
    return inquirer.prompt<{ imageQuery: string }>(this.iconQueryPrompt);
  }

  static async forIconResizing() {
    return await inquirer.prompt<{ iconToResize: IconCandidate }>(
      this.iconNumberPrompt
    );
  }
}
