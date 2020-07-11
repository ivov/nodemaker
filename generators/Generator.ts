import { metaParameters } from "../parameters";

export default class Generator {
  /**Prefix the command with a environment variable and hygen execution from bin, and remove readability formatting.*/
  formatCommand(command: string) {
    const formattedCommand =
      `
    env HYGEN_OVERWRITE=1
    node node_modules/hygen/dist/bin.js
     ` + command; // mind the final whitespace

    return formattedCommand.replace(/\s{2}/g, "").trim();
  }

  /**Build a service credential string based on auth type, for node credential file and credential file string insertion into `package.json`.*/
  getServiceCredential() {
    const serviceName = metaParameters.serviceName.replace(/\s/g, "");
    return (
      serviceName + (metaParameters.auth === "OAuth2" ? "OAuth2" : "") + "Api"
    );
  }
}
