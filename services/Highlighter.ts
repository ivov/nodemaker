import chalk from "chalk";

export default class Highlighter {
  static showResult(arg: {
    result: BackendOperationResult;
    successMessage: string;
    inspectMessage?: boolean;
  }) {
    const { result, successMessage, inspectMessage } = arg;

    result.error
      ? this.highlight("red", result.errorMessage)
      : this.highlight(
          "green",
          "\n" +
            successMessage +
            (inspectMessage ? "\nPlease inspect the /output directory." : "")
        );
  }

  static highlight(color: string, message: string) {
    console.log(chalk.keyword(color).inverse(message));
  }
}
