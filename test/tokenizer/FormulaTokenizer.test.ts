import { FormulaTokenizer } from "../../tokenizer/FormulaTokenizer";

describe("Formula Tokenizer testing", () => {
  let tokenizer: FormulaTokenizer;
  beforeEach(() => {
    tokenizer = new FormulaTokenizer();
  });

  test("Check is return empty array when i give empty expression", () => {
    expect(tokenizer.execute("").length).toBe(0);
  });
  test("Check if tokenizer return [1,'+',2] after give this expression in argument '1+2'", () => {
    const result = tokenizer.execute("1+2");
    expect(result).toEqual([1, "+", 2]);
  });

  test("should tokenize a simple expression with subtraction", () => {
    const result = tokenizer.execute("5-3");
    expect(result).toEqual([5, "-", 3]);
  });

  test("should tokenize a simple expression with multiplication", () => {
    const result = tokenizer.execute("4*2");
    expect(result).toEqual([4, "*", 2]);
  });

  test("should tokenize a simple expression with division", () => {
    const result = tokenizer.execute("10/2");
    expect(result).toEqual([10, "/", 2]);
  });

  test("should tokenize an expression with parentheses", () => {
    const result = tokenizer.execute("(1+2)*3");
    expect(result).toEqual(["(", 1, "+", 2, ")", "*", 3]);
  });

  test("should handle negative numbers", () => {
    const result = tokenizer.execute("5+-2");
    expect(result).toEqual([5, "+", "-", 2]);
  });

  test("should handle negative numbers in parentheses", () => {
    const result = tokenizer.execute("(-2)");
    expect(result).toEqual(["(", "-", 2, ")"]);
  });

  test("should tokenize a complex expression", () => {
    const result = tokenizer.execute(" (1 + 2) * 3 - 4 / 2");
    expect(result).toEqual(["(", 1, "+", 2, ")", "*", 3, "-", 4, "/", 2]);
  });

  test("should tokenize logical AND operator", () => {
    const result = tokenizer.execute("1&&0");
    expect(result).toEqual([1, "&&", 0]);
  });

  test("should tokenize logical OR operator", () => {
    const result = tokenizer.execute("1||0");
    expect(result).toEqual([1, "||", 0]);
  });

  test("should tokenize comparison operators", () => {
    expect(tokenizer.execute("1>0")).toEqual([1, ">", 0]);
    expect(tokenizer.execute("1<0")).toEqual([1, "<", 0]);
    expect(tokenizer.execute("1>=0")).toEqual([1, ">=", 0]);
    expect(tokenizer.execute("1<=0")).toEqual([1, "<=", 0]);
    expect(tokenizer.execute("1==0")).toEqual([1, "==", 0]);
    expect(tokenizer.execute("1!=0")).toEqual([1, "!=", 0]);
  });
});
