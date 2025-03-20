import { Expression } from "./Expression";
import { REGEX } from "./../constant";
import { FormularParser } from "../parser/FormularParser";
import { FormularTokenizer } from "../tokenizer/FormularTokenizer";
import { FormularInterpreter } from "../interpreter/FormularInterpreter";

/**
 * Represents a reference to a field in a given object, allowing 
 * for the execution of expressions and the interpretation of formulas.
 * 
 * @template T - The type of the object containing the fields.
 * @template R - The type of the return value of the expression.
 * @param {string} fieldName - The name of the field to reference in the object.
 */
export class FieldReference<T extends { [kex: string]: any }, R> extends Expression<T, R> {
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
            if (this.isFormularRef()) return this.executeFormularRef(obj);
            return obj[this.fieldName];
         }
      }
      throw new Error(`The fieldName ${this.fieldName} does not exist or is undefined on object ${obj}`);
   }

   /**
    * Checks if the field name corresponds to a formula reference.
    *
    * @returns {boolean} True if the field is a formula reference, otherwise false.
    */
   private isFormularRef(): boolean {
      return REGEX.formularFieldName.test(this.fieldName);
   }

   /**
    * Executes the formula reference and returns the result of the interpretation.
    *
    * @param {T} obj - The object from which to extract the formula.
    * @returns {R} The result of executing the formula.
    */
   private executeFormularRef(obj: T): R {
      const fTokenizer = new FormularTokenizer();
      const fParser = new FormularParser();
      const fInterpreter = new FormularInterpreter();
      const astTree = fParser.execute(fTokenizer.execute(obj[this.fieldName] as string));
      return fInterpreter.execute<T>(astTree, obj) as R;
   }
}
