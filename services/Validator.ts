import { assertType } from "typescript-is";

/**Responsible for validating an unknown object against a type and reporting missing properties or unexpected property types. Intended for troubleshooting why an object built on the frontend is failing to generate a node.*/
export default class Validator {
  private handleValidation(
    callback: () => void,
    hideStack = true,
    hideInput = true,
    hideMessage = true
  ) {
    try {
      callback();
      console.log("Parameters validation succeeded!");
    } catch (error) {
      if (hideStack) delete error.stack;
      if (hideInput) delete error.input;
      if (hideMessage) delete error.message;
      console.error(error);
    }
  }

  // TODO - De-duplicate these methods by abstracting away the type.
  // Beware: https://github.com/woutervh-/typescript-is/issues/32
  // Beware: https://github.com/woutervh-/typescript-is/blob/master/README.md#-what-it-wont-do
  // validate<T>(params: any) {
  //   this.handleValidation(() => assertType<T>(params));
  // }

  public validateMetaParameters(metaParameters: any) {
    this.handleValidation(() => assertType<MetaParameters>(metaParameters));
  }

  public validateRegularNodeParameters(regularNodeParameters: any) {
    this.handleValidation(() =>
      assertType<RegularNodeParameters>(regularNodeParameters)
    );
  }

  public validateTriggerNodeParameters(triggerNodeParameters: any) {
    this.handleValidation(() =>
      assertType<TriggerNodeParameters>(triggerNodeParameters)
    );
  }

  public validateDocsParameters(docsParameters: any) {
    this.handleValidation(() => assertType<DocsParameters>(docsParameters));
  }
}
