import { Expression } from "./Expression";

/**
 * Represents a conditional expression that returns values based on a condition.
 * 
 * @template T The input type of the expression.
 * @template R The output type of the conditional expression.
 * @param {Expression<T, number>} condition The expression that determines the condition to evaluate.
 * @param {Expression<T, R>} isTrue The expression to execute if the condition is true.
 * @param {Expression<T, R>} isFalse The expression to execute if the condition is false.
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
