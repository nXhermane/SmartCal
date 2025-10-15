import { FormulaInterpreter } from "../interpreter/FormulaInterpreter";
import { FormulaParser } from "../parser/FormulaParser";
import { FormulaTokenizer } from "../tokenizer/FormulaTokenizer";
import { DataType } from "../types";
import { INode } from "../parser/AstNode";
/**
 * Represents a compiled formula expression that can be evaluated with data.
 *
 * This interface defines the contract for compiled expressions that have been pre-parsed
 * into an AST for efficient repeated evaluation.
 *
 * @interface
 */
export interface CompiledExpression {
  /** Type identifier for the compiled expression */
  type: "CompiledExpression";

  /**
   * Evaluates the compiled expression with the provided data.
   *
   * @template T - The type of the data object containing variables
   * @param {T} data - The data object to evaluate the expression against.
   *        Should contain all variables referenced in the original expression.
   * @returns {string | number} The result of the evaluation, either a number or string
   *
   * @example
   * ```typescript
   * const expr = compile("price * quantity");
   * expr.evaluate({ price: 10, quantity: 5 }); // 50
   * ```
   *
   * @throws {FormulaVariableNotFoundError} When required variables are missing from data
   */
  evaluate<T extends DataType>(data: T): string | number;

  /**
   * Returns the string representation of the original expression.
   *
   * @returns {string} The original expression string that was compiled
   *
   * @example
   * ```typescript
   * const expr = compile("x + y * 2");
   * console.log(expr.toString()); // "x + y * 2"
   * ```
   */
  toString(): string;
}

/**
 * Implementation of the CompiledExpression interface for formula expressions.
 *
 * This class provides a concrete implementation that compiles a formula expression
 * once and allows efficient repeated evaluation with different data sets.
 *
 * @class
 * @implements {CompiledExpression}
 */
export class CompiledFormulaExpression implements CompiledExpression {
  /** Type identifier for the compiled expression */
  type: "CompiledExpression" = "CompiledExpression";

  /** Internal AST representation of the compiled expression */
  private _ast: INode;

  /**
   * Creates a new instance of CompiledFormulaExpression.
   *
   * @param {string} expression - The formula expression to compile.
   *        Must be a valid expression that can be parsed by the formula engine.
   *
   * @throws {FormulaInterpreterError} When expression syntax is invalid during compilation
   * @throws {IncorrectSyntax} When expression has incorrect syntax during compilation
   */
  constructor(private expression: string) {
    this._ast = new FormulaParser().execute(
      new FormulaTokenizer().execute(expression)
    );
  }

  /**
   * Evaluates the compiled expression with the provided data.
   *
   * @template T - The type of the data object containing variables
   * @param {T} data - The data object to evaluate the expression against.
   *        Should contain all variables referenced in the expression.
   * @returns {string | number} The result of the evaluation
   *
   * @example
   * ```typescript
   * const expr = new CompiledFormulaExpression("price * quantity");
   * expr.evaluate({ price: 10, quantity: 5 }); // 50
   * ```
   *
   * @throws {FormulaVariableNotFoundError} When required variables are missing from data
   */
  evaluate<T extends DataType>(data: T): string | number {
    return new FormulaInterpreter().execute(this._ast, data);
  }

  /**
   * Returns the string representation of the original expression.
   *
   * @returns {string} The original expression string that was compiled
   */
  toString(): string {
    return this.expression;
  }
}
