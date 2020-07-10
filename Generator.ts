import { metaParameters } from "./parameters";

export default class Generator {
  formatCommand(command: string) {
    return command.replace(/\s{2}/g, "").trim();
  }

  getServiceCredential() {
    const serviceName = metaParameters.serviceName.replace(/\s/g, "");
    return (
      serviceName + (metaParameters.auth === "OAuth2" ? "OAuth2" : "") + "Api"
    );
  }
}
