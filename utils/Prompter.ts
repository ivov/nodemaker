export default class Prompter {
  prompts = [
    {
      name: "nodeGenerationType",
      type: "list",
      message:
        "Node generation type?\n- Simple: Node resources in single file.\n- Complex: Node resources in Description files.",
      choices: ["Simple", "Complex"],
    },
    {
      name: "imageQuery",
      type: "input",
      message: "Enter query string for image search:",
    },
  ];
}
