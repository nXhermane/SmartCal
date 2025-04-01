import { ArithmeticOperator, ComparisonOperator } from "../constant";
import { CompiledExpression } from "../expression/CompiledExpression";

export type DataType = { [key: string]: number | string | CompiledExpression };
const OperatorValue = [...ArithmeticOperator, ...ComparisonOperator];

/**
 * Represents the supported operators in the expression.
 */
export type Operator = (typeof OperatorValue)[number];
