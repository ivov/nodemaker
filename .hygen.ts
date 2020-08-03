module.exports = {
  helpers: {
    /**Format a string as a class name, uppercase for each initial and no whitespace.*/
    classify: (name: string) => name.replace(/\s/g, ""),
    /**Format a string as a lowercase single word, or a lowercase first word
     * and uppercase initial + lowercase rest for following words.*/
    camelify: (input: string) => {
      const isSingleWord = input.split(" ").length === 1;
      const uppercaseInitialLowercaseRest = (input: string) =>
        input[0].toUpperCase() + input.slice(1);

      if (isSingleWord) return input.toLowerCase();

      // multi-word
      let result: string[] = [];
      input.split(" ").forEach((word, index) => {
        index === 0
          ? result.push(word.toLowerCase())
          : result.push(uppercaseInitialLowercaseRest(word));
      });
      return result.join("");
    },
    /**Check if operations array has a Get All operation.*/
    hasGetAll: (operations: Operation[]) =>
      operations.some((operation) => operation.name === "Get All"),
    /**Check if a particular operation is a GET request.*/
    isRetrieval: (operation: Operation) => operation.requestMethod === "GET",
    /**Check if a particular operation has any associated additional fields.*/
    hasAdditionalFields: (operation: Operation) =>
      operation.fields.filter((field) => field.name === "Additional Fields"),
    /**Create the credential string for based on auth type.*/
    getCredentialsString: (name: string, auth: string) =>
      name + (auth === "OAuth2" ? "OAuth2" : "") + "Api",
    /**Check if the endpoint has an extractable variable.*/
    hasEndpointVariable: (endpoint: string) => endpoint.split("").includes("$"),
    /**Extract the variable from the endpoint.*/
    getVariableFromEndpoint: (endpoint: string) =>
      endpoint.match(/\$\$(.*)\$\$/)![1],
    /**Reformat endpoint without variable boundary markers.*/
    fixEndpoint: (endpoint: string) =>
      endpoint
        .replace(/\/\$\$/, "/${")
        .replace(/\$\$$/, "}")
        .replace(/\"/g, "`"),
  },
};
