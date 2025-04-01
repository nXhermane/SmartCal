export class FormulaInterpreterError implements Error {
  name: string;
  stack?: string | undefined;
  constructor(public message: string, error?: string) {
    this.name = "FormulaInterpreterError";
    this.stack = error;
  }
}
