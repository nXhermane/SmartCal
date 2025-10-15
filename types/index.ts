import { ArithmeticOperator, ComparisonOperator, LogicalAndOperator, LogicalOrOperator, QuestionMarkOperator } from "../constant";
import { CompiledExpression } from "../expression/CompiledExpression";

/**
 * Represents the data type that can be passed to expression evaluation functions.
 * Keys are variable names, and values can be numbers, strings, or compiled expressions.
 */
export type DataType = { [key: string]: number | string | CompiledExpression };

/**
 * Array of all supported operators in expressions.
 */
const OperatorValue = [
  ...ArithmeticOperator,
  ...ComparisonOperator,
  LogicalAndOperator,
  LogicalOrOperator,
  QuestionMarkOperator
];

/**
 * Represents the supported operators in the expression.
 * Includes arithmetic, comparison, logical, and ternary operators.
 */
export type Operator = (typeof OperatorValue)[number];
