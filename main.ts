import { FormulaParser } from "./parser/FormulaParser";
import { FormulaTokenizer } from "./tokenizer/FormulaTokenizer";
import { FormulaInterpreter } from "./interpreter/FormulaInterpreter";

/**
 * Evaluates a mathematical expression and returns the result.
 *
 * This function parses and interprets a mathematical formula represented as a string,
 * applying dynamic values from a given object to resolve variables or conditions within the expression.
 *
 * @template T - A generic type representing the structure of the input object. Keys are variable names, and values can be numbers, strings, or arrays.
 * @param {string} expression - The mathematical expression to be evaluated.
 *        Variables in the expression should correspond to keys in the `obj` parameter.
 * @param {T} obj - An object containing the values of the variables referenced in the expression.
 * @returns {number | string | any[]} - The result of the evaluated expression, which can be a number, a string, or an array depending on the expression's logic.
 */
export default function SmartCal<T extends { [key: string]: number | string }>(
  expression: string,
  obj?: T
): number | string {
  const fTokenizer = new FormulaTokenizer();
  const fParser = new FormulaParser();
  const fInterpreter = new FormulaInterpreter();
  return fInterpreter.execute<T>(
    fParser.execute(fTokenizer.execute(expression)),
    obj || ({} as T)
  );
}

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
