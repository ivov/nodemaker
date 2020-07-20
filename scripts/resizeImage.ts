import inquirer from "inquirer";
import ImageResizer from "../utils/ImageResizer";

inquirer
  .prompt([
    {
      name: "iconToResize",
      type: "list",
      message:
        "Which icon to resize?\n  - Inspect /output/icon-candidates and select the icon by its number\n",
      choices: "12345".split(""),
    },
  ])
  .then(({ iconToResize }) => {
    new ImageResizer().resize(iconToResize);
  });
