import { Node } from "../parser/FormulaParser";
import { Expression } from "./../expression/Expression";
import { ExpressionConstructor } from "./../expression/ExpressionConstructor";
import {
  AdditionOperator,
  DivisionOperator,
  EqualOperator,
  ExponentialOperator,
  GreaterThanOperator,
  GreaterThanOrEqualOperator,
  LessThanOperator,
  LessThanOrEqualOperator,
  LogicalAndOperator,
  LogicalOrOperator,
  ModuloOperator,
  MultiplicationOperator,
  NotEqualOperator,
  SubtractionOperator,
} from "../constant";

type VariableContainer = { [key: string]: string | number };

/**
 * The FormulaInterpreter class is responsible for interpreting an abstract syntax tree (AST)
 * representing a mathematical or logical expression. It evaluates expressions based on provided
 * variable data and constructs appropriate expression objects for processing.
 */
export class FormulaInterpreter {
  /**
   * Executes the interpretation of the AST tree and returns the evaluated result.
   * @param {Node} astTree The abstract syntax tree to be interpreted.
   * @param {T} data The variable data to use for evaluation.
   * @returns {number | string} The result of the expression evaluation.
   */
  execute<T extends VariableContainer>(
    astTree: Node,
    data: T
  ): number | string {
    const result = this.interpret<T>(astTree, data).execute(data);
    return result;
  }

  /**
   * Interprets the AST tree recursively and constructs expression objects based on the node types.
   * @param {Node} astTree The abstract syntax tree to interpret.
   * @param {T} data The variable data to use for evaluation.
   * @returns {Expression<T, string | number>} The constructed expression object.
   */
  interpret<T extends VariableContainer>(
    astTree: Node,
    data: T
  ): Expression<T, string | number> {
    if (astTree.isNode()) {
      const operator = astTree.operator;
      const right = this.interpret<T>(astTree.right!, data);
      const left = this.interpret<T>(astTree.left!, data);
      switch (operator) {
        case AdditionOperator:
          return ExpressionConstructor.addition<T>(
            left as Expression<T, number>,
            right as Expression<T, number>
          );
        case SubtractionOperator:
          return ExpressionConstructor.subtraction<T>(
            left as Expression<T, number>,
            right as Expression<T, number>
          );
        case MultiplicationOperator:
          return ExpressionConstructor.multiplication<T>(
            left as Expression<T, number>,
            right as Expression<T, number>
          );
        case DivisionOperator:
          return ExpressionConstructor.division<T>(
            left as Expression<T, number>,
            right as Expression<T, number>
          );
        case ModuloOperator:
          return ExpressionConstructor.modulo<T>(
            left as Expression<T, number>,
            right as Expression<T, number>
          );
        case ExponentialOperator:
          return ExpressionConstructor.pow<T>(
            left as Expression<T, number>,
            right as Expression<T, number>
          );
        default:
          throw new Error(`This operator ${operator} is not supported.`);
      }
    } else if (astTree.isValue()) {
      const value = astTree.value!;
      if (typeof value === "number") {
        return ExpressionConstructor.literalValue<T>(Number(astTree.value));
      } else {
        const regex = /"([\w]+)"/;
        const stringValue = value.match(regex)![1];
        return ExpressionConstructor.literalValue<T, string>(
          stringValue as string
        );
      }
    } else if (astTree.isField()) {
      const fieldValue = data[String(astTree.fieldName!)];
      if (fieldValue === undefined)
        throw new Error(`The variable ${astTree.fieldName} not defined.`);
      if (typeof fieldValue === "number") {
        return ExpressionConstructor.fieldReference<T, number>(
          astTree.fieldName!
        );
      } else {
        return ExpressionConstructor.fieldReference<T, string>(
          astTree.fieldName!
        );
      }
    } else if (astTree.isComparison()) {
      const comparisonOperator = astTree.operator;
      const left = this.interpret<T>(astTree.left!, data);
      const right = this.interpret<T>(astTree.right!, data);
      switch (comparisonOperator) {
        case GreaterThanOperator:
          return ExpressionConstructor.superior<T, string | number>(
            left,
            right
          );
        case LessThanOperator:
          return ExpressionConstructor.inferior<T, string | number>(
            left,
            right
          );
        case EqualOperator:
          return ExpressionConstructor.equality<T, string | number>(
            left,
            right
          );
        case GreaterThanOrEqualOperator:
          return ExpressionConstructor.or<T, string | number>(
            ExpressionConstructor.superior<T, string | number>(left, right),
            ExpressionConstructor.equality<T, string | number>(left, right)
          );
        case LessThanOrEqualOperator:
          return ExpressionConstructor.or<T, string | number>(
            ExpressionConstructor.inferior<T, string | number>(left, right),
            ExpressionConstructor.equality<T, string | number>(left, right)
          );
        case LogicalOrOperator:
          return ExpressionConstructor.or<T, string | number>(left, right);
        case LogicalAndOperator:
          return ExpressionConstructor.and<T, string | number>(left, right);
        case NotEqualOperator:
          return ExpressionConstructor.different<T, string | number>(
            left,
            right
          );
        default:
          throw new Error(
            `This comparison ${comparisonOperator} method is not supported`
          );
      }
    } else if (astTree.isConditional()) {
      const condition = this.interpret<T>(astTree.condition!, data);
      const isTrue = this.interpret<T>(astTree.isTrue!, data);
      const isFalse = this.interpret<T>(astTree.isFalse!, data);
      return ExpressionConstructor.condition<T, string | number>(
        condition as Expression<T, number>,
        isTrue,
        isFalse
      );
    } else {
      throw new Error(
        `This Expression is not Correct. Please verify Your expression [Interpreter]:${astTree}`
      );
    }
  }
}
