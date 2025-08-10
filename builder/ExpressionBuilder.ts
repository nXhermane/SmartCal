/**
 * A builder class for creating mathematical expressions programmatically.
 * It uses a fluent interface to chain operations.
 *
 * @example
 * const expression = ExpressionBuilder.create()
 *   .add('x', 5)
 *   .str(); // "(x + 5)"
 */
export class ExpressionBuilder {
  private stringExpression: string = "";

  /**
   * Creates a new instance of the ExpressionBuilder.
   * @returns {ExpressionBuilder} A new ExpressionBuilder instance.
   */
  static create(): ExpressionBuilder {
    return new this();
  }

  /**
   * Adds a summation to the expression.
   * @param {number | string} a - The first operand (can be a number or a variable name).
   * @param {number | string} b - The second operand (can be a number or a variable name).
   * @returns {this} The ExpressionBuilder instance for chaining.
   */
  add(a: number | string, b: number | string): this {
    const addStringExpression = `(${a} + ${b})`;
    this.stringExpression += addStringExpression;
    return this;
  }

  /**
   * Returns the string representation of the built expression.
   * @returns {string} The expression string.
   */
  str(): string {
    return this.stringExpression;
  }
}
