export class FormulaVariableNotFoundError extends Error {
  name: string;
  public data: { variableName: string; container: object };
  constructor(
    message: string,
    variableName: string,
    variableContainer: object
  ) {
    super(message);
    this.name = "FormulaVariableNotFound";
    this.data = { variableName, container: variableContainer };
  }
  getData() {
    return this.data;
  }
}
