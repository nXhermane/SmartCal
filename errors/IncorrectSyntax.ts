export class IncorrectSyntaxError extends Error {
  name = "IncorrectSyntaxError";
  private data: {
    exp: string;
  };
  constructor(message: string, exp: string) {
    super(message);
    this.data = { exp };
  }
    getData() {
    return this.data;
  }
}
