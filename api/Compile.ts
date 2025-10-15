import { CompiledExpression, CompiledFormulaExpression } from "../expression/CompiledExpression";

/**
 * Compiles a formula expression string into a reusable CompiledExpression object.
 *
 * Compilation pre-parses the expression into an AST (Abstract Syntax Tree) for improved
 * performance when evaluating the same expression multiple times with different data.
 *
 * @param {string} expression - The formula expression to compile. Must be a valid expression
 *        that can be parsed by the formula engine.
 * @returns {CompiledExpression} A compiled expression object that can be evaluated multiple times
 *
 * @example
 * ```typescript
 * // Compile once, evaluate multiple times
 * const priceCalculator = compile("quantity * unitPrice * (1 - discount)");
 *
 * // Use with different data
 * priceCalculator.evaluate({ quantity: 5, unitPrice: 10, discount: 0.1 }); // 45
 * priceCalculator.evaluate({ quantity: 3, unitPrice: 15, discount: 0.2 }); // 36
 *
 * // Get original expression
 * console.log(priceCalculator.toString()); // "quantity * unitPrice * (1 - discount)"
 * ```
 *
 * @throws {FormulaInterpreterError} When expression syntax is invalid
 * @throws {IncorrectSyntax} When expression has incorrect syntax
 */
export function compile(expression: string): CompiledExpression {
  return new CompiledFormulaExpression(expression);
}
