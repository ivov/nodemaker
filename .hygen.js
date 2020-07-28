module.exports = {
  helpers: {
    camelify: (input) => {
      const isSingleWord = input.split(" ").length === 1;
      const uppercaseInitialLowercaseRest = (input) =>
        input[0].toUpperCase() + input.slice(1);

      if (isSingleWord) return input.toLowerCase();

      // multi-word
      let result = [];
      input.split(" ").forEach((word, index) => {
        index === 0
          ? result.push(word.toLowerCase())
          : result.push(uppercaseInitialLowercaseRest(word));
      });
      return result.join("");
    },
    hasGetAll: (operations) =>
      operations.some((operation) => operation.name === "Get All"),
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
