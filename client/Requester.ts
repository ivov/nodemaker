const { ipcRenderer } = window.require("electron");

type RequesterInputType = string | ParamsBundle;

// prettier-ignore
type RequesterOutputType<T> =
    T extends string ? string :
    T extends ParamsBundle ? NodemakerResult :
    never;

/**Responsible for receiving a request (with an optional argument) through a channel and returning a response through that same channel.*/
export default class Requester {
  public request<T extends RequesterInputType>(
    channel: string,
    argument?: any
  ): Promise<RequesterOutputType<T>> {
    ipcRenderer.send(channel, argument);

    return new Promise((resolve) => {
      ipcRenderer.on(channel, (event, response) => resolve(response));
    });
  }
}
