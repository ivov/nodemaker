const camelify = (inputString) => {
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
      first = i === 0 && k === 0 ? first.toLowerCase() : first.toUpperCase();
      stringArray[k] = first + stringArray[k].substring(1);
    }

    stringPath[i] = stringArray.join("");
    console.log(stringPath[i]);
  }
};

const camel = (input) => {
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
};

const result = camel("Hacker News");
console.log(result);
