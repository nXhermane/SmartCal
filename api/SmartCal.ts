import { FormulaInterpreter } from "../interpreter/FormulaInterpreter";
import { FormulaParser } from "../parser/FormulaParser";
import { FormulaTokenizer } from "../tokenizer/FormulaTokenizer";
import { DataType } from "../types";

/**
 * Evaluates a mathematical expression and returns the result.
 *
 * This function parses and interprets a mathematical formula represented as a string,
 * applying dynamic values from a given object to resolve variables or conditions within the expression.
 *
 * @template T - A generic type representing the structure of the input object. Keys are variable names, and values can be numbers, strings, or arrays.
 * @param {string} expression - The mathematical expression to be evaluated.
 *        Variables in the expression should correspond to keys in the `obj` parameter.
 *        Supports arithmetic (+, -, *, /, ^, %), comparison (>, <, >=, <=, ==, !=),
 *        logical (&&, ||), and ternary (? :) operators.
 * @param {T} obj - An object containing the values of the variables referenced in the expression.
 *        Can include nested formula variables prefixed with 'f_' and regular data variables.
 * @returns {number | string} - The result of the evaluated expression, which can be a number or string.
 *
 * @example
 * ```typescript
 * // Basic arithmetic
 * SmartCal("2 + 3 * 4"); // 14
 *
 * // With variables
 * SmartCal("age + 5", { age: 25 }); // 30
 *
 * // With formula variables
 * SmartCal("f_total", {
 *   f_subtotal: "price * quantity",
 *   f_total: "f_subtotal * 1.2",
 *   price: 10,
 *   quantity: 5
 * }); // 60
 * ```
 *
 * @throws {FormulaInterpreterError} When expression syntax is invalid or variables are undefined
 * @throws {IncorrectSyntax} When expression has incorrect syntax
 * @throws {InvalidFormulaError} When formula is malformed
 */
export default function SmartCal<T extends DataType>(
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
