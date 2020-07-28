// Client-side JavaScript goes here!

import Requester from "./Requester";

const requester = new Requester();

const exampleButton = document.getElementById("example-button") as HTMLElement;
const exampleResponseContainer = document.getElementById(
  "example-response-container"
) as HTMLElement;

exampleButton.addEventListener("click", async () => {
  const response = await requester.request<string>(
    "prototype-channel",
    "optional argument goes here"
  );
  exampleResponseContainer.innerHTML = `The following is being retrieved from the backend via the example channel:<br><br>${response}`;
});
