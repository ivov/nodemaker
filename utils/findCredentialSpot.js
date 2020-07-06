/**Find the spot where the input (credential or node) should be inserted in an alphabetically sorted array.*/
const findCredentialSpot = (input, credentials) => {
  for (let credential of credentials) {
    const relevantString = credential.slice(17);
    if (relevantString[0] < input[0]) {
      continue;
    }
    return relevantString.replace(".credentials.js", "");
  }
  throw Error("No spot found!");
};

module.exports = findCredentialSpot;
