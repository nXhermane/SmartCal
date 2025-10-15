import { ExpressionConstructor } from "../../expression/ExpressionConstructor";
import { LiteralValue } from "../../expression/LiteralValue";
import { FieldReference } from "../../expression/FieldReference";
import { BinaryOperation } from "../../expression/BinaryOperation";
import { ConditionalExpression } from "../../expression/ConditionalExpression";

describe("Expression Classes", () => {
  describe("LiteralValue", () => {
    test("should create and execute literal values", () => {
      const literal = new LiteralValue<{}, number>(42);
      expect(literal.execute({})).toBe(42);

      const stringLiteral = new LiteralValue<{}, string>("hello");
      expect(stringLiteral.execute({})).toBe("hello");
    });
  });

  describe("FieldReference", () => {
    test("should reference object fields", () => {
      const fieldRef = new FieldReference<{ age: number }, number>("age");
      expect(fieldRef.execute({ age: 25 })).toBe(25);
    });

    test("should handle string field references", () => {
      const fieldRef = new FieldReference<{ name: string }, string>("name");
      expect(fieldRef.execute({ name: "John" })).toBe("John");
    });
  });

  describe("BinaryOperation", () => {
    test("should perform addition", () => {
      const left = new LiteralValue<{}, number>(5);
      const right = new LiteralValue<{}, number>(3);
      const addOp = new BinaryOperation<{}, number>(left, right, (a, b) => a + b);
      expect(addOp.execute({})).toBe(8);
    });

    test("should perform multiplication", () => {
      const left = new LiteralValue<{}, number>(4);
      const right = new LiteralValue<{}, number>(7);
      const mulOp = new BinaryOperation<{}, number>(left, right, (a, b) => a * b);
      expect(mulOp.execute({})).toBe(28);
    });
  });

  describe("ConditionalExpression", () => {
    test("should evaluate true condition", () => {
      const condition = new LiteralValue<{}, number>(1);
      const trueExpr = new LiteralValue<{}, string>("yes");
      const falseExpr = new LiteralValue<{}, string>("no");
      const conditional = new ConditionalExpression(condition, trueExpr, falseExpr);
      expect(conditional.execute({})).toBe("yes");
    });

    test("should evaluate false condition", () => {
      const condition = new LiteralValue<{}, number>(0);
      const trueExpr = new LiteralValue<{}, string>("yes");
      const falseExpr = new LiteralValue<{}, string>("no");
      const conditional = new ConditionalExpression(condition, trueExpr, falseExpr);
      expect(conditional.execute({})).toBe("no");
    });
  });
});

describe("ExpressionConstructor", () => {
  test("should create literal values", () => {
    const literal = ExpressionConstructor.literalValue<{}, number>(42);
    expect(literal.execute({})).toBe(42);
  });

  test("should create field references", () => {
    const fieldRef = ExpressionConstructor.fieldReference<{ score: number }, number>("score");
    expect(fieldRef.execute({ score: 95 })).toBe(95);
  });

  test("should create arithmetic operations", () => {
    const left = ExpressionConstructor.literalValue<{}, number>(10);
    const right = ExpressionConstructor.literalValue<{}, number>(5);
    const add = ExpressionConstructor.addition<{}>(left, right);
    const subtract = ExpressionConstructor.subtraction<{}>(left, right);
    const multiply = ExpressionConstructor.multiplication<{}>(left, right);
    const divide = ExpressionConstructor.division<{}>(left, right);

    expect(add.execute({})).toBe(15);
    expect(subtract.execute({})).toBe(5);
    expect(multiply.execute({})).toBe(50);
    expect(divide.execute({})).toBe(2);
  });

  test("should create comparison operations", () => {
    const left = ExpressionConstructor.literalValue<{}, number>(10);
    const right = ExpressionConstructor.literalValue<{}, number>(5);
    const equal = ExpressionConstructor.equality<{}, number>(left, right);
    const greater = ExpressionConstructor.superior<{}, number>(left, right);
    const less = ExpressionConstructor.inferior<{}, number>(left, right);

    expect(equal.execute({})).toBe(0); // 10 != 5
    expect(greater.execute({})).toBe(1); // 10 > 5
    expect(less.execute({})).toBe(0); // 10 < 5 is false
  });

  test("should create logical operations", () => {
    const trueExpr = ExpressionConstructor.literalValue<{}, number>(1);
    const falseExpr = ExpressionConstructor.literalValue<{}, number>(0);
    const andOp = ExpressionConstructor.and<{}, number>(trueExpr, trueExpr);
    const orOp = ExpressionConstructor.or<{}, number>(trueExpr, falseExpr);

    expect(andOp.execute({})).toBe(1); // 1 && 1
    expect(orOp.execute({})).toBe(1); // 1 || 0
  });

  test("should create conditional expressions", () => {
    const condition = ExpressionConstructor.literalValue<{}, number>(1);
    const trueBranch = ExpressionConstructor.literalValue<{}, string>("success");
    const falseBranch = ExpressionConstructor.literalValue<{}, string>("failure");
    const conditional = ExpressionConstructor.condition<{}, string>(condition, trueBranch, falseBranch);

    expect(conditional.execute({})).toBe("success");
  });

  test("should create power and modulo operations", () => {
    const base = ExpressionConstructor.literalValue<{}, number>(2);
    const exp = ExpressionConstructor.literalValue<{}, number>(3);
    const pow = ExpressionConstructor.pow<{}>(base, exp);

    const dividend = ExpressionConstructor.literalValue<{}, number>(10);
    const divisor = ExpressionConstructor.literalValue<{}, number>(3);
    const mod = ExpressionConstructor.modulo<{}>(dividend, divisor);

    expect(pow.execute({})).toBe(8); // 2^3
    expect(mod.execute({})).toBe(1); // 10 % 3
  });

  test("should throw error on division by zero", () => {
    const dividend = ExpressionConstructor.literalValue<{}, number>(10);
    const divisor = ExpressionConstructor.literalValue<{}, number>(0);
    const divide = ExpressionConstructor.division<{}>(dividend, divisor);

    expect(() => divide.execute({})).toThrow("Division by zero");
  });
});