const findNodeSpot = (input: string, nodes: string[]) => {
  for (let node of nodes) {
    const pathMatch = node.match(/dist\/nodes\/(.*)\.node\.js/);

    if (pathMatch === null) {
      throw Error("No path match found in package.json retrieved from repo!");
    }

    const relevantString = pathMatch[1];

    if (relevantString[0] < input[0]) {
      continue;
    }
    return relevantString.replace(".node.js", "");
  }
  throw Error("No spot found!");
};

export default findNodeSpot;
