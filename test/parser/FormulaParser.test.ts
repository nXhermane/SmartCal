import { FormulaParser } from "../../parser/FormulaParser";
import { FormulaTokenizer } from "../../tokenizer/FormulaTokenizer";

describe("FormulaParser", () => {
  let parser: FormulaParser;
  let tokenizer: FormulaTokenizer;

  beforeEach(() => {
    parser = new FormulaParser();
    tokenizer = new FormulaTokenizer();
  });

  describe("isValidFormula", () => {
    test("should return true for a valid simple formula", () => {
      const tokens = tokenizer.execute("1 + 2");
      expect(parser.isValidFormula(tokens)).toBe(true);
    });

    test("should return true for a valid formula with parentheses", () => {
      const tokens = tokenizer.execute("(1 + 2) * 3");
      expect(parser.isValidFormula(tokens)).toBe(true);
    });

    test("should return true for a valid ternary formula", () => {
      const tokens = tokenizer.execute("1 > 0 ? 10 : 20");
      expect(parser.isValidFormula(tokens)).toBe(true);
    });

    test("should return false for mismatched parentheses", () => {
      const tokens = tokenizer.execute("(1 + 2");
      expect(parser.isValidFormula(tokens)).toBe(false);
    });

    test("should return false for incorrect operator placement", () => {
      const tokens = tokenizer.execute("1 + * 2");
      expect(parser.isValidFormula(tokens)).toBe(false);
    });

    test("should return false for invalid ternary expression", () => {
      const tokens = tokenizer.execute("1 > 0 ? 10");
      expect(parser.isValidFormula(tokens)).toBe(false);
    });
  });
  describe("execute", () => {
    test("should create a simple AST for '1 + 2'", () => {
      const tokens = tokenizer.execute("1 + 2");
      const ast = parser.execute(tokens);

      expect(ast.operator).toBe("+");
      expect(ast.left?.isValue()).toBe(true);
      expect(ast.left?.value).toBe(1);
      expect(ast.right?.isValue()).toBe(true);
      expect(ast.right?.value).toBe(2);
    });

    test("should respect operator precedence for '1 + 2 * 3'", () => {
      const tokens = tokenizer.execute("1 + 2 * 3");
      const ast = parser.execute(tokens);

      expect(ast.operator).toBe("+");
      expect(ast.left?.value).toBe(1);
      expect(ast.right?.operator).toBe("*");
      expect(ast.right?.left?.value).toBe(2);
      expect(ast.right?.right?.value).toBe(3);
    });

    test("should handle parentheses for '(1 + 2) * 3'", () => {
      const tokens = tokenizer.execute("(1 + 2) * 3");
      const ast = parser.execute(tokens);

      expect(ast.operator).toBe("*");
      expect(ast.left?.operator).toBe("+");
      expect(ast.left?.left?.value).toBe(1);
      expect(ast.left?.right?.value).toBe(2);
      expect(ast.right?.value).toBe(3);
    });

    test("should create a ternary AST for '1 > 0 ? 10 : 20'", () => {
      const tokens = tokenizer.execute("1 > 0 ? 10 : 20");
      const ast = parser.execute(tokens);

      expect(ast.isConditional()).toBe(true);
      expect(ast.condition?.operator).toBe(">");
      expect(ast.condition?.left?.value).toBe(1);
      expect(ast.condition?.right?.value).toBe(0);
      expect(ast.isTrue?.value).toBe(10);
      expect(ast.isFalse?.value).toBe(20);
    });

    test("should throw an error for an invalid formula", () => {
      const tokens = tokenizer.execute("1 + * 2");
      expect(() => parser.execute(tokens)).toThrow();
    });

    test("should handle nested ternary expressions", () => {
      const tokens = tokenizer.execute("1 > 0 ? (2 > 1 ? 10 : 20) : 30");
      const ast = parser.execute(tokens);

      expect(ast.isConditional()).toBe(true);
      expect(ast.condition?.operator).toBe(">");
      expect(ast.isTrue?.isConditional()).toBe(true);
      expect(ast.isTrue?.condition?.operator).toBe(">");
      expect(ast.isTrue?.isTrue?.value).toBe(10);
      expect(ast.isTrue?.isFalse?.value).toBe(20);
      expect(ast.isFalse?.value).toBe(30);
    });

    test("should handle multiple levels of parentheses", () => {
      const tokens = tokenizer.execute("((1 + 2) * 3) - 4");
      const ast = parser.execute(tokens);

      expect(ast.operator).toBe("-");
      expect(ast.left?.operator).toBe("*");
      expect(ast.left?.left?.operator).toBe("+");
      expect(ast.left?.left?.left?.value).toBe(1);
      expect(ast.left?.left?.right?.value).toBe(2);
      expect(ast.left?.right?.value).toBe(3);
      expect(ast.right?.value).toBe(4);
    });
  });
});
