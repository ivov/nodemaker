import chalk from "chalk";

/**Responsible for logging success and error messages in the CLI for a BackendOperationResult.*/
export default class Highlighter {
  /**Log a success or error message in a colored background in the CLI.*/
  static showResult(arg: HighlighterArgument) {
    const { result, successMessage, inspectMessage } = arg;

    result.completed
      ? this.highlight(
          "green",
          "\n" +
            successMessage +
            (inspectMessage ? "\nPlease inspect the /output directory." : "")
        )
      : this.highlight("red", result.error);
  }

  /**Log a message with a colored background in the CLI.*/
  static highlight(color: string, message: string) {
    console.log(chalk.keyword(color).inverse(message));
  }
}
