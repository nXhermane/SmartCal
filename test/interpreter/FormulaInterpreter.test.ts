import { FormulaInterpreter } from "../../interpreter/FormulaInterpreter";
import { FormulaParser } from "../../parser/FormulaParser";
import { FormulaTokenizer } from "../../tokenizer/FormulaTokenizer";

describe("FormulaInterpreter", () => {
  let tokenizer: FormulaTokenizer;
  let parser: FormulaParser;
  let interpreter: FormulaInterpreter;

  beforeEach(() => {
    tokenizer = new FormulaTokenizer();
    parser = new FormulaParser();
    interpreter = new FormulaInterpreter();
  });

  const evaluate = (formula: string, data = {}) => {
    const tokens = tokenizer.execute(formula);
    const ast = parser.execute(tokens);
    return interpreter.execute(ast, data);
  };

  test("should evaluate a simple addition", () => {
    expect(evaluate("1 + 2")).toBe(3);
  });

  test("should evaluate an expression with operator precedence", () => {
    expect(evaluate("1 + 2 * 3")).toBe(7);
  });

  test("should evaluate an expression with parentheses", () => {
    expect(evaluate("(1 + 2) * 3")).toBe(9);
  });

  test("should evaluate a comparison expression (true)", () => {
    expect(evaluate("5 > 3")).toBe(1); // Assuming 1 for true
  });

  test("should evaluate a comparison expression (false)", () => {
    expect(evaluate("3 > 5")).toBe(0); // Assuming 0 for false
  });

  test("should evaluate a ternary expression (true case)", () => {
    expect(evaluate("1 > 0 ? 100 : 200")).toBe(100);
  });

  test("should evaluate a ternary expression (false case)", () => {
    expect(evaluate("0 > 1 ? 100 : 200")).toBe(200);
  });

  test("should evaluate an expression with variables", () => {
    const data = { f_x: 10, f_y: 5 };
    expect(evaluate("f_x * f_y", data)).toBe(50);
  });

  test("should throw an error for undefined variables", () => {
    expect(() => evaluate("f_x + f_z")).toThrow("The variable f_z not defined.");
  });
});
