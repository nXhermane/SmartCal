import { FormulaParser } from "../parser/FormulaParser";
import { FormulaTokenizer } from "../tokenizer/FormulaTokenizer";

/**
 * Validates whether a given expression is a valid formula that can be parsed and evaluated.
 *
 * This function performs syntax checking without executing the expression, making it useful
 * for input validation before evaluation.
 *
 * @param {string} expression - The expression string to validate
 * @returns {boolean} true if the expression is syntactically valid, false otherwise
 *
 * @example
 * ```typescript
 * isValidExpression("2 + 3 * 4"); // true
 * isValidExpression("x > 10 ? 'high' : 'low'"); // true
 * isValidExpression("2 +"); // false - incomplete expression
 * isValidExpression("(a + b * c"); // false - unmatched parentheses
 * ```
 *
 * @note This function only checks syntax validity, not semantic correctness (e.g., undefined variables)
 */
export function isValidExpression(expression: string) {
    try {
      const fTokenizer = new FormulaTokenizer();
      const fParser = new FormulaParser();
      const tokens = fTokenizer.execute(expression);
      return fParser.isValidFormula(tokens);
    } catch {
      return false;
    }
  }