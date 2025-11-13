export default class CustomError {
  messages: string[];
  status: number;

  constructor(messages: string[] | string, status: number) {
    this.messages = messages instanceof Array ? messages : [messages];
    this.status = status;
  }
}
