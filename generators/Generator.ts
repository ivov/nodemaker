import { metaParameters } from "../parameters";

/**Container for methods shared by child generators.*/
export default class Generator {
  /**Prefix a command with an env var and the path to hygen, and remove readability formatting.*/
  formatCommand(command: string) {
    const formattedCommand =
      `env HYGEN_OVERWRITE=1
      node node_modules/hygen/dist/bin.js
       ` + command;

    return formattedCommand.replace(/\s{2}/g, "").trim();
  }

  /**Create a service credential name string based on auth type.*/
  deriveServiceCredentialName() {
    const serviceName = metaParameters.serviceName.replace(/\s/g, "");
    return (
      serviceName +
      (metaParameters.authType === "OAuth2" ? "OAuth2" : "") +
      "Api"
    );
  }
}
