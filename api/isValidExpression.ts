import { FormulaParser } from "../parser/FormulaParser";
import { FormulaTokenizer } from "../tokenizer/FormulaTokenizer";

/**
 * Verifies if the given expression is a valid formula.
 * @param {string} expression - The expression to validate.
 * @returns {boolean} - True if the expression is a valid formula, otherwise false.
 * @example
 * isValidExpression("1 + 2 * 3"); // true
 * isValidExpression("1 + * 2"); // false
 */
export function isValidExpression(expression: string): boolean {
    try {
      const fTokenizer = new FormulaTokenizer();
      const fParser = new FormulaParser();
      const tokens = fTokenizer.execute(expression);
      return fParser.isValidFormula(tokens);
    } catch {
      return false;
    }
  }