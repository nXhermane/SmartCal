/**
 * Represents an abstract expression that defines an interface for evaluating expressions.
 * @template T The input type for the expression.
 * @template R The type of result produced by the expression.
 */
export abstract class Expression<T, R> {
  /**
   * Evaluates the expression based on the given object.
   * @param {T} obj The object on which the expression will be evaluated.
   * @returns {R} The result of evaluating the expression.
   */
  abstract execute(obj: T): R;
}
