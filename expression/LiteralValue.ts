import { Expression } from "./Expression";

/**
 * Represents a literal value (a number or a string) in an expression.
 * @template T The type of the data object used for evaluation (not used in this class).
 * @template R The type of the literal value.
 */
export class LiteralValue<T, R = number> extends Expression<T, R> {
  constructor(private _value: R) {
    super();
  }

  /**
   * Executes the literal value expression and returns the value.
   * 
   * @param {T} obj The object on which the expression is executed (not used in this case).
   * @returns {R} The literal value.
   */
  execute(obj: T): R {
    return this._value;
  }
}
