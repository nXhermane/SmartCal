import SmartCal from "../../api/SmartCal";
import {
  FormulaVariableNotFoundError,
  IncorrectSyntaxError,
  InvalidFormulaError,
} from "../../errors";

describe("Error Handling", () => {
  describe("FormulaVariableNotFoundError", () => {
    it("should throw FormulaVariableNotFoundError for undefined variables", () => {
      try {
        SmartCal("f_x + f_z");
        fail("Expected FormulaVariableNotFoundError to be thrown");
      } catch (e) {
        expect(e).toBeInstanceOf(FormulaVariableNotFoundError);
        const err = e as FormulaVariableNotFoundError;
        expect(err.message).toContain("f_x does not exist or is undefined");
        expect(err.data.variableName).toBe("f_x");
        expect(err.data.container).toEqual({});
      }
    });
  });

  describe("IncorrectSyntaxError", () => {
    it("should throw IncorrectSyntaxError for mismatched parentheses", () => {
      try {
        SmartCal("(1 + 2");
        fail("Expected IncorrectSyntaxError to be thrown");
      } catch (e) {
        expect(e).toBeInstanceOf(IncorrectSyntaxError);
        const err = e as IncorrectSyntaxError;
        expect(err.message).toBe("Incorrect parenthesis disposition.");
        expect(err.getData().exp).toBe("(1+2");
      }
    });

    it("should throw IncorrectSyntaxError for incorrect operator placement", () => {
      try {
        SmartCal("1 + * 2");
        fail("Expected IncorrectSyntaxError to be thrown");
      } catch (e) {
        expect(e).toBeInstanceOf(IncorrectSyntaxError);
        const err = e as IncorrectSyntaxError;
        expect(err.message).toBe("Incorrect Operator error");
        expect(err.getData().exp).toBe("1+*2");
      }
    });
  });

  describe("InvalidFormulaError", () => {
    it("should throw IncorrectSyntaxError for an invalid formula with multiple operators", () => {
      try {
        SmartCal("1 +++ 2");
        fail("Expected IncorrectSyntaxError to be thrown");
      } catch (e) {
        expect(e).toBeInstanceOf(IncorrectSyntaxError);
        const err = e as IncorrectSyntaxError;
        expect(err.message).toBe("Incorrect Operator error");
        expect(err.getData().exp).toBe("1+++2");
      }
    });
  });
});
