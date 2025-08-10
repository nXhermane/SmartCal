import { Expression } from "./Expression";

/**
 * Represents a unary operation, such as negation.
 * @template T The type of the data object used for evaluation.
 * @template R The type of the result of the sub-expression.
 */
export class UnaryOperation<T, R> extends Expression<T, R> {
  constructor(
    private operand: Expression<T, R>,
    private operator: (a: R) => R
  ) {
    super();
  }

  execute(obj: T): R {
    return this.operator(this.operand.execute(obj));
  }
}
