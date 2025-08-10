import { Expression } from "./Expression";
import { REGEX } from "./../constant";
import { FormulaParser } from "../parser/FormulaParser";
import { FormulaTokenizer } from "../tokenizer/FormulaTokenizer";
import { FormulaInterpreter } from "../interpreter/FormulaInterpreter";
import { CompiledExpression } from "./CompiledExpression";
import { FormulaVariableNotFoundError } from "../errors/FormulaVariableNotFoundError";

/**
 * Represents a reference to a field in a given object, allowing
 * for the execution of expressions and the interpretation of formulas.
 *
 * @template T - The type of the object containing the fields.
 * @template R - The type of the return value of the expression.
 * @param {string} fieldName - The name of the field to reference in the object.
 */
export class FieldReference<
  T extends { [kex: string]: any },
  R
> extends Expression<T, R> {
  constructor(private fieldName: string) {
    super();
  }

  /**
   * Executes the field reference on the given object.
   *
   * @param {T} obj - The object from which to extract the field value.
   * @returns {R} The value of the referenced field.
   * @throws {Error} If the field does not exist or is undefined in the object.
   */
  execute(obj: T): R {
    if (obj != null && obj != undefined) {
      if (obj[this.fieldName] != undefined) {
        if (this.isFormulaRef() && typeof obj[this.fieldName] === "string")
          return this.executeFormulaRef(obj);
        if (this.isCompiledExpression(obj))
          return this.evaluateCompiledExpression(obj);
        return obj[this.fieldName];
      }
    }
    throw new FormulaVariableNotFoundError(
      `The fieldName ${this.fieldName} does not exist or is undefined on object ${obj}`,
      this.fieldName,
      obj
    );
  }

  /**
   * Checks if the field name corresponds to a formula reference.
   *
   * @returns {boolean} True if the field is a formula reference, otherwise false.
   */
  private isFormulaRef(): boolean {
    return REGEX.formulaFieldName.test(this.fieldName);
  }
  /**
   * Checks if the field name corresponds to a Compiled Expression
   * @param obj {T} The object from which to extract the field value.
   * @returns {boolean}  True if the field is a formula reference, otherwise false.
   */
  private isCompiledExpression(obj: T): boolean {
    return obj[this.fieldName]?.type === "CompiledExpression";
  }

  /**
   * Executes the formula reference and returns the result of the interpretation.
   *
   * @param {T} obj - The object from which to extract the formula.
   * @returns {R} The result of executing the formula.
   */
  private executeFormulaRef(obj: T): R {
    const fTokenizer = new FormulaTokenizer();
    const fParser = new FormulaParser();
    const fInterpreter = new FormulaInterpreter();
    const astTree = fParser.execute(
      fTokenizer.execute(obj[this.fieldName] as string)
    );
    return fInterpreter.execute<T>(astTree, obj) as R;
  }
  /**
   * Evaluate the compiled Expression
   * @param obj - The object from which to extract the formula.
   * @returns The result of evaluate the compiled Expression.
   */
  private evaluateCompiledExpression(obj: T): R {
    const compiledExpression = obj[this.fieldName] as CompiledExpression;
    return compiledExpression.evaluate(obj) as R;
  }
}
