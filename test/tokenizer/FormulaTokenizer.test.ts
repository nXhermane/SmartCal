import { FormulaTokenizer } from "../../tokenizer/FormulaTokenizer";

describe("Formula Tokenizer testing", () => {
  let tokenizer: FormulaTokenizer;
  beforeEach(() => {
    tokenizer = new FormulaTokenizer();
  });

  test("Check is return empty array when i give empty expression", () => {
    expect(tokenizer.execute("").length).toBe(0);
  });
  test("Check if tokenizer return [1,'+',2] after give this expression in argument '1+2'",()=> {
    expect(tokenizer.execute('1+2').length).toBe(2)
  })
});
