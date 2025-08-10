import { Expression } from "./Expression";

/**
 * Represents a ternary conditional expression (condition ? value_if_true : value_if_false).
 * @template T The type of the data object used for evaluation.
 * @template R The type of the result of the true/false sub-expressions.
 */
export class ConditionalExpression<T, R> extends Expression<T, R> {
   constructor(
      private condition: Expression<T, number>,
      private isTrue: Expression<T, R>,
      private isFalse: Expression<T, R>,
   ) {
      super();
   }

   /**
    * Executes the conditional expression on the given object.
    * 
    * @param {T} obj The object on which the expression will be evaluated.
    * @returns {R} The value returned by the conditional expression, based on the evaluation of the condition.
    */
   execute(obj: T): R {
      return this.condition.execute(obj) != 0 ? this.isTrue.execute(obj) : this.isFalse.execute(obj);
   }
}
