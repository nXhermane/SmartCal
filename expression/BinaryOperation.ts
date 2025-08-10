import { Expression } from "./Expression";

/**
 * Represents a binary operation between two expressions, such as addition, subtraction, etc.
 * @template T The type of the data object used for evaluation.
 * @template R The type of the result of the sub-expressions.
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
