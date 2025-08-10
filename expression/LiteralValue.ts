import { Expression } from "./Expression";

/**
 * Represents a literal value expression.
 * 
 * @template T The input type of the expression.
 * @template R The output type of the expression, defaulting to number.
 * @param {R} _value The literal value to be returned when executed.
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
