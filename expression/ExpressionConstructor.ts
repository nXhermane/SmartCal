import { LiteralValue } from "./LiteralValue";
import { Expression } from "./Expression";
import { FieldReference } from "./FieldReference";
import { BinaryOperation } from "./BinaryOperation";
import { ConditionalExpression } from "./ConditionalExpression";

export class ExpressionConstructor {
  /**
   * Creates a literal value expression.
   *
   * @template T The input type of the expression.
   * @template R The output type of the literal value.
   * @param {R} value The value to be represented as a literal.
   * @returns {Expression<T, R>} The literal value expression.
   */
  static literalValue<T, R = number>(value: R): Expression<T, R> {
    return new LiteralValue<T, R>(value);
  }

  /**
   * Creates a field reference expression based on the provided field name.
   *
   * @template T The type of the input object.
   * @template R The type of the output value from the field.
   * @param {string} fieldName The name of the field to reference.
   * @returns {Expression<T, R>} The field reference expression.
   */
  static fieldReference<T extends { [key: string]: any }, R>(
    fieldName: string
  ): Expression<T, R> {
    return new FieldReference<T, R>(fieldName);
  }

  /**
   * Creates an addition operation expression between two expressions.
   *
   * @template T The type of the input expressions.
   * @param {Expression<T, number>} left The left operand.
   * @param {Expression<T, number>} right The right operand.
   * @returns {Expression<T, number>} The addition expression.
   */
  static addition<T>(
    left: Expression<T, number>,
    right: Expression<T, number>
  ): Expression<T, number> {
    return new BinaryOperation<T, number>(left, right, (a, b) => a + b);
  }

  /**
   * Creates a subtraction operation expression between two expressions.
   *
   * @template T The type of the input expressions.
   * @param {Expression<T, number>} left The left operand.
   * @param {Expression<T, number>} right The right operand.
   * @returns {Expression<T, number>} The subtraction expression.
   */
  static subtraction<T>(
    left: Expression<T, number>,
    right: Expression<T, number>
  ): Expression<T, number> {
    return new BinaryOperation<T, number>(left, right, (a, b) => a - b);
  }

  /**
   * Creates a multiplication operation expression between two expressions.
   *
   * @template T The type of the input expressions.
   * @param {Expression<T, number>} left The left operand.
   * @param {Expression<T, number>} right The right operand.
   * @returns {Expression<T, number>} The multiplication expression.
   */
  static multiplication<T>(
    left: Expression<T, number>,
    right: Expression<T, number>
  ): Expression<T, number> {
    return new BinaryOperation<T, number>(left, right, (a, b) => a * b);
  }

  /**
   * Creates a division operation expression between two expressions.
   *
   * @template T The type of the input expressions.
   * @param {Expression<T, number>} left The left operand.
   * @param {Expression<T, number>} right The right operand.
   * @returns {Expression<T, number>} The division expression.
   * @throws {Error} Throws an error if division by zero is attempted.
   */
  static division<T>(
    left: Expression<T, number>,
    right: Expression<T, number>
  ): Expression<T, number> {
    return new BinaryOperation<T, number>(left, right, (a, b) => {
      if (b === 0) throw new Error("Division by zero");
      return a / b;
    });
  }

  /**
   * Creates a conditional expression based on the specified condition.
   *
   * @template T The input type of the expression.
   * @template R The output type of the conditional expression.
   * @param {Expression<T, number>} condition The expression that determines the condition to evaluate.
   * @param {Expression<T, R>} isTrue The expression to execute if the condition is true.
   * @param {Expression<T, R>} isFalse The expression to execute if the condition is false.
   * @returns {Expression<T, R>} The conditional expression.
   */
  static condition<T, R>(
    condition: Expression<T, number>,
    isTrue: Expression<T, R>,
    isFalse: Expression<T, R>
  ): Expression<T, R> {
    return new ConditionalExpression(condition, isTrue, isFalse);
  }

  /**
   * Creates an equality expression comparing two expressions.
   *
   * @template T The input type of the expressions.
   * @template R The output type of the expressions.
   * @param {Expression<T, R>} left The left operand.
   * @param {Expression<T, R>} right The right operand.
   * @returns {Expression<T, number>} The equality expression.
   */
  static equality<T, R>(
    left: Expression<T, R>,
    right: Expression<T, R>
  ): Expression<T, number> {
    return new BinaryOperation<T, R>(left, right, (a: R, b: R) =>
      Number(a === b)
    );
  }

  /**
   * Creates a greater-than expression comparing two expressions.
   *
   * @template T The input type of the expressions.
   * @template R The output type of the expressions.
   * @param {Expression<T, R>} left The left operand.
   * @param {Expression<T, R>} right The right operand.
   * @returns {Expression<T, number>} The greater-than expression.
   */
  static superior<T, R>(
    left: Expression<T, R>,
    right: Expression<T, R>
  ): Expression<T, number> {
    return new BinaryOperation<T, R>(left, right, (a: R, b: R) =>
      Number(a > b)
    );
  }

  /**
   * Creates a less-than expression comparing two expressions.
   *
   * @template T The input type of the expressions.
   * @template R The output type of the expressions.
   * @param {Expression<T, R>} left The left operand.
   * @param {Expression<T, R>} right The right operand.
   * @returns {Expression<T, number>} The less-than expression.
   */
  static inferior<T, R>(
    left: Expression<T, R>,
    right: Expression<T, R>
  ): Expression<T, number> {
    return new BinaryOperation<T, R>(left, right, (a: R, b: R) =>
      Number(a < b)
    );
  }

  /**
   * Creates a not-equal expression comparing two expressions.
   *
   * @template T The input type of the expressions.
   * @template R The output type of the expressions.
   * @param {Expression<T, R>} left The left operand.
   * @param {Expression<T, R>} right The right operand.
   * @returns {Expression<T, number>} The not-equal expression.
   */
  static different<T, R>(
    left: Expression<T, R>,
    right: Expression<T, R>
  ): Expression<T, number> {
    return new BinaryOperation<T, R>(left, right, (a: R, b: R) =>
      Number(a != b)
    );
  }

  /**
   * Creates a logical OR expression between two expressions.
   *
   * @template T The input type of the expressions.
   * @template R The output type of the expressions.
   * @param {Expression<T, R>} left The left operand.
   * @param {Expression<T, R>} right The right operand.
   * @returns {Expression<T, number>} The logical OR expression.
   */
  static or<T, R>(
    left: Expression<T, R>,
    right: Expression<T, R>
  ): Expression<T, number> {
    return new BinaryOperation<T, R>(left, right, (a: R, b: R) =>
      Number(a || b)
    );
  }

  /**
   * Creates a logical AND expression between two expressions.
   *
   * @template T The input type of the expressions.
   * @template R The output type of the expressions.
   * @param {Expression<T, R>} left The left operand.
   * @param {Expression<T, R>} right The right operand.
   * @returns {Expression<T, number>} The logical AND expression.
   */
  static and<T, R>(
    left: Expression<T, R>,
    right: Expression<T, R>
  ): Expression<T, number> {
    return new BinaryOperation<T, R>(left, right, (a: R, b: R) =>
      Number(a && b)
    );
  }
  /**
   * Creates a power (exponentiation) expression between two expressions.
   *
   * @template T The input type of the expressions.
   * @param {Expression<T, number>} base The base operand.
   * @param {Expression<T, number>} exponent The exponent operand.
   * @returns {Expression<T, number>} The result of raising `base` to the power of `right`.
   */
  static pow<T>(
    left: Expression<T, number>,
    right: Expression<T, number>
  ): Expression<T, number> {
    return new BinaryOperation<T, number>(left, right, (a: number, b: number) =>
      Math.pow(Number(a), Number(b))
    );
  }

  /**
   * Creates a modulo operation expression between two expressions.
   *
   * @template T The type of the input expressions.
   * @param {Expression<T, number>} left The left operand.
   * @param {Expression<T, number>} right The right operand.
   * @returns {Expression<T, number>} The modulo expression.
   */
  static modulo<T>(
    left: Expression<T, number>,
    right: Expression<T, number>
  ): Expression<T, number> {
    return new BinaryOperation<T, number>(
      left,
      right,
      (a: number, b: number) => a % b
    );
  }
}
