export class InvalidFormulaError extends Error {
  name = "Invalid formula";
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
