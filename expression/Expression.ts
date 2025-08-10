/**
 * Represents an abstract expression that can be evaluated.
 * This is the base class for all expression types.
 * @template T The type of the data object used for evaluation.
 * @template R The type of the result of the evaluation.
 */
export abstract class Expression<T, R> {
  /**
   * Evaluates the expression with the given data.
   * @param {T} obj The data object to use for evaluation.
   * @returns {R} The result of the evaluation.
   */
  abstract execute(obj: T): R;
}
