const findCredentialSpot = (input: string, credentials: string[]) => {
  for (let credential of credentials) {
    const relevantString = credential.slice(17);
    if (relevantString[0] < input[0]) {
      continue;
    }
    return relevantString.replace(".credentials.js", "");
  }
  throw Error("No spot found!");
};

export default findCredentialSpot;
