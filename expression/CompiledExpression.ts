import { FormulaInterpreter } from "../interpreter/FormulaInterpreter";
import { FormulaParser } from "../parser/FormulaParser";
import { FormulaTokenizer } from "../tokenizer/FormulaTokenizer";
import { DataType } from "../types";
import { INode } from "../parser/AstNode";
/**
 * Represents a compiled formula expression that can be evaluated with data.
 * @interface
 */
export interface CompiledExpression {
  type: "CompiledExpression";
  /**
   * Evaluates the expression with the provided data.
   * @template T
   * @param {T} data - The data object to evaluate the expression against
   * @returns {string | number} The result of the evaluation
   */
  evaluate<T extends DataType>(data: T): string | number;

  /**
   * Returns the string representation of the expression.
   * @returns {string} The original expression string
   */
  toString(): string;
}

/**
 * Implementation of the CompiledExpression interface for formula expressions.
 * @class
 * @implements {CompiledExpression}
 */
export class CompiledFormulaExpression implements CompiledExpression {
  type: "CompiledExpression" = "CompiledExpression";
  private _ast: INode;

  /**
   * Creates a new instance of CompiledFormulaExpression.
   * @param {string} expression - The formula expression to compile
   */
  constructor(private expression: string) {
    this._ast = new FormulaParser().execute(
      new FormulaTokenizer().execute(expression)
    );
  }

  /**
   * Evaluates the expression with the provided data.
   * @template T
   * @param {T} data - The data object to evaluate the expression against
   * @returns {string | number} The result of the evaluation
   */
  evaluate<T extends DataType>(data: T): string | number {
    return new FormulaInterpreter().execute(this._ast, data);
  }

  /**
   * Returns the string representation of the expression.
   * @returns {string} The original expression string
   */
  toString(): string {
    return this.expression;
  }
}
