import { Expression } from "./Expression";

/**
 * Represents a binary operation on two expressions.
 * 
 * @template T The input type of the expression.
 * @template R The output type of the expressions.
 * @param {Expression<T, R>} left The left expression.
 * @param {Expression<T, R>} right The right expression.
 * @param {(a: R, b: R) => number} operator The operator function that takes two values of type R and returns a number.
 */
export class BinaryOperation<T, R> extends Expression<T, number> {
  constructor(
    private left: Expression<T, R>,
    private right: Expression<T, R>,
    private operator: (a: R, b: R) => number
  ) {
    super();
  }

  /**
   * Executes the binary operation on the given object.
   * 
   * @param {T} obj The object on which the operation will be executed.
   * @returns {number} The result of the binary operation.
   */
  execute(obj: T): number {
    return this.operator(this.left.execute(obj), this.right.execute(obj));
  }
}
