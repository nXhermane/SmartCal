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
    expect(() => evaluate("f_x + f_z", {f_x: 1})).toThrow("The variable f_z not defined.");
  });

  test("should handle nested formula variables", () => {
    const data = {
      basePrice: 100,
      quantity: 5,
      f_subtotal: "basePrice * quantity",
      f_discountRate: "f_subtotal > 400 ? 0.1 : 0.05",
      f_finalPrice: "f_subtotal * (1 - f_discountRate)"
    };
    expect(evaluate("f_finalPrice", data)).toBe(450); // 500 * (1 - 0.1)
  });

  test("should handle complex nested ternary expressions", () => {
    const data = { score: 75 };
    const expression = "score >= 90 ? 'A' : (score >= 80 ? 'B' : (score >= 70 ? 'C' : 'D'))";
    expect(evaluate(expression, data)).toBe('C');
  });

  test("should handle logical AND and OR operators", () => {
    expect(evaluate("1 && 1")).toBe(1);
    expect(evaluate("1 && 0")).toBe(0);
    expect(evaluate("0 || 1")).toBe(1);
    expect(evaluate("0 || 0")).toBe(0);
    expect(evaluate("(5 > 3) && (2 < 4)")).toBe(1);
    expect(evaluate("(5 > 3) || (2 > 4)")).toBe(1);
  });

  test("should handle equality and inequality operators", () => {
    expect(evaluate("5 == 5")).toBe(1);
    expect(evaluate("5 == 4")).toBe(0);
    expect(evaluate("'hello' == 'hello'")).toBe(1);
    expect(evaluate("'hello' == 'world'")).toBe(0);
    expect(evaluate("5 != 4")).toBe(1);
    expect(evaluate("5 != 5")).toBe(0);
  });

  test("should handle >= and <= operators", () => {
    expect(evaluate("5 >= 5")).toBe(1);
    expect(evaluate("5 >= 4")).toBe(1);
    expect(evaluate("4 >= 5")).toBe(0);
    expect(evaluate("5 <= 5")).toBe(1);
    expect(evaluate("4 <= 5")).toBe(1);
    expect(evaluate("5 <= 4")).toBe(0);
  });

  test("should throw an error for division by zero", () => {
    expect(() => evaluate("10 / 0")).toThrow("Division by zero is not allowed.");
  });

  test("should handle modulo operator", () => {
    expect(evaluate("10 % 3")).toBe(1);
    expect(evaluate("10 % 2")).toBe(0);
  });

  test("should handle exponential operator", () => {
    expect(evaluate("2 ^ 3")).toBe(8);
    expect(evaluate("5 ^ 0")).toBe(1);
  });
});
