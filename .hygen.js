module.exports = {
  helpers: {
    camelify: (inputString) => {
      var stringPath = inputString.split("/");
      var i = 0;
      var j = stringPath.length;
      var stringArray, k, l, first;

      for (; i < j; i++) {
        stringArray = stringPath[i].split("_");
        k = 0;
        l = stringArray.length;

        for (; k < l; k++) {
          if (k !== 0) {
            stringArray[k] = stringArray[k].toLowerCase();
          }

          first = stringArray[k].charAt(0);
          first =
            i === 0 && k === 0 ? first.toLowerCase() : first.toUpperCase();
          stringArray[k] = first + stringArray[k].substring(1);
        }

        stringPath[i] = stringArray.join("");
      }

      return stringPath.join("::").replace(/\s/g, "");
    },
    hasGetAll: (mainParameters) => {
      const [operations] = Object.values(mainParameters);
      return operations.some((operation) => operation.name === "Get All");
    },
    getCredentialsString: (name, auth) =>
      name + (auth === "OAuth2" ? "OAuth2" : "") + "Api",
    isRetrieval: (operation) => operation.requestMethod === "GET",
    hasAdditionalFields: (operation) =>
      operation.fields.filter((field) => field.name === "Additional Fields"),
    classify: (name) => name.replace(/\s/g, ""),
    hasEndpointVariable: (endpoint) => endpoint.split("").includes("$"),
    getVariableFromEndpoint: (endpoint) => endpoint.match(/\$\$(.*)\$\$/)[1],
    fixEndpoint: (endpoint) =>
      endpoint
        .replace(/\/\$\$/, "/${")
        .replace(/\$\$$/, "}")
        .replace(/\"/g, "`"),
  },
};
