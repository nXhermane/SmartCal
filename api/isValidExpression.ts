import { FormulaParser } from "../parser/FormulaParser";
import { FormulaTokenizer } from "../tokenizer/FormulaTokenizer";

/**
 * Verify if the given expression is valid formula
 * @param expression expression to evaluate
 * @returns {boolean} true if the expression is valid
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