/**Container for methods shared by child generators.*/
export default class Generator {
  /**Format a command by adding a prefix and removing whitespaces included in the codebase for readability.*/
  protected formatCommand(command: string) {
    return this.addPrefix(command).replace(/\s{2}/g, "").trim();
  }

  /**Prefix a command with an env var and the path to hygen.*/
  private addPrefix(command: string) {
    return (
      "env HYGEN_OVERWRITE=1 node node_modules/hygen/dist/bin.js" + command
    );
  }

  /**Create a service credential name string based on auth type.*/
  protected getServiceCredentialName(metaParameters: MetaParameters) {
    const serviceName = metaParameters.serviceName.replace(/\s/g, "");
    return (
      serviceName +
      (metaParameters.authType === "OAuth2" ? "OAuth2" : "") +
      "Api"
    );
  }
}
