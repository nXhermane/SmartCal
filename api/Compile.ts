import { CompiledExpression, CompiledFormulaExpression } from "../expression/CompiledExpression";

/**
 * Compiles a formula expression string into a reusable CompiledExpression object.
 * This can be used to evaluate the same expression multiple times with different data, which is more efficient than parsing the expression each time.
 * @param {string} expression - The formula expression to compile.
 * @returns {CompiledExpression} A compiled expression that can be evaluated with different data.
 * @example
 * const expr = compile("age + 3");
 * const result1 = expr.evaluate({ age: 18 }); // 21
 * const result2 = expr.evaluate({ age: 30 }); // 33
 */
export function compile(expression: string): CompiledExpression {
  return new CompiledFormulaExpression(expression);
}
