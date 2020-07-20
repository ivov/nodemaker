import inquirer from "inquirer";
import { NodeGenerationType } from "../utils/enums";

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

  private static iconPrompt = [
    {
      name: "imageQuery",
      type: "input",
      message: "Enter query string for image search:",
    },
  ];

  static async forNodeGeneration() {
    return inquirer.prompt<{ nodeGenerationType: NodeGenerationType }>(
      this.nodeGenerationPrompt
    );
  }

  static async forPlacement() {
    return inquirer.prompt<{ filesToPlace: string }>(this.placementPrompt);
  }

  static async forIconGeneration() {
    return inquirer.prompt<{ imageQuery: string }>(this.iconPrompt);
  }
}
