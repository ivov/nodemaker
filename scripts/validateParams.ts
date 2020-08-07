import Validator from "../services/Validator";

const dataToValidate = {
  serviceName: "Hacker News",
  authType: "OAuth2",
  nodeColor: "#ff6600",
  apiUrl: "http://hn.algolia.com/api/v1/",
};

const validator = new Validator();

validator.validateDocsParameters(dataToValidate);
