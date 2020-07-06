const findCredentialSpot = require("./findCredentialSpot");

/**Find the spot where the input (credential or node) should be inserted in an alphabetically sorted array.*/
const findNodeSpot = (input, nodes) => {
  for (let node of nodes) {
    const relevantString = node.match(/dist\/nodes\/(.*)\.node\.js/)[1];
    if (relevantString[0] < input[0]) {
      continue;
    }
    return relevantString.replace(".node.js", "");
  }
  throw Error("No spot found!");
};

module.exports = findNodeSpot;
