module.exports = {
  helpers: {
    /**Check if a field or option is collective (contains fields or options).*/
    isCollective: (entity) =>
      entity.type === "collection" ||
      entity.type === "fixedCollection" ||
      entity.type === "multiOptions" ||
      entity.type === "options",
    /**Format a string as a class name, uppercase for each initial and no whitespace.*/
    classify: (name) => name.replace(/\s/g, ""),
    /**Format a string as a lowercase single word, or a lowercase first word and uppercase initial + lowercase rest for following words.*/
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
    /**Check if operations array has a Get All operation.*/
    hasGetAll: (operations) =>
      operations.some((operation) => operation.name === "Get All"),
    /**Check if a particular operation is a GET request.*/
    isRetrieval: (operation) => operation.requestMethod === "GET",
    /**Check if a particular operation has any associated additional fields.*/
    hasAdditionalFields: (operation) =>
      operation.fields.filter((field) => field.name === "Additional Fields"),
    /**Create the credential string for based on auth type.*/
    getCredentialsString: (name, auth) =>
      name + (auth === "OAuth2" ? "OAuth2" : "") + "Api",
    /**Check if the endpoint has an extractable variable.*/
    hasEndpointVariable: (endpoint) => endpoint.split("").includes("$"),
    /**Extract the variable from the endpoint.*/
    getVariableFromEndpoint: (endpoint) => endpoint.match(/\$\$(.*)\$\$/)[1],
    /**Reformat endpoint without variable boundary markers.*/
    fixEndpoint: (endpoint) =>
      endpoint
        .replace(/\/\$\$/, "/${")
        .replace(/\$\$$/, "}")
        .replace(/\"/g, "`"),
    hasNumericalLimits: (field) => field.numericalLimits,
  },
};
