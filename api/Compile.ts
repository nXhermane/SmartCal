import { CompiledExpression, CompiledFormulaExpression } from "../expression/CompiledExpression";

/**
 * Compiles a formula expression string into a CompiledExpression object.
 * @param {string} expression - The formula expression to compile
 * @returns {CompiledExpression} A compiled expression that can be evaluated
 * @example
 * const expr = compile("age+3");
 * const result = expr.evaluate({age:18});
 */
export function compile(expression: string): CompiledExpression {
  return new CompiledFormulaExpression(expression);
}
