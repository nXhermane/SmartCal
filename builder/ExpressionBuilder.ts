export class ExpressionBuilder {
  private stringExpression: string = "";
  static create(): ExpressionBuilder {
    return new this();
  }
  add(a: number | string, b: number | string): this {
    const addStringExpression = `(${a} + ${b})`;
    this.stringExpression += addStringExpression;
    return this;
  }
  str(): string {
    return this.stringExpression;
  }
}
