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
      for (let resource in mainParameters) {
        for (let operation of mainParameters[resource]) {
          if (operation.name === "Get All") return true;
        }
      }
      return false;
    },
    getCredentialsString: (name, auth) =>
      name + (auth === "OAuth2" ? "OAuth2" : "") + "Api",
    isRetrieval: (operation) => operation.requestMethod === "GET",
    hasAdditionalFields: (operation) =>
      operation.fields.filter((field) => field.name === "Additional Fields"),
    classify: (name) => name.replace(/\s/g, ""),
    hasEndpointVariable: (endpoint) => {
      return endpoint.split("").includes("$");
    },
    getVariableFromEndpoint: (endpoint) => {
      return endpoint.match(/\$\$(.*)\$\$/)[1];
    },
    fixEndpoint: (endpoint) => {
      return endpoint
        .replace(/\/\$\$/, "/${")
        .replace(/\$\$$/, "}")
        .replace(/\"/g, "`");
    },
  },
};
