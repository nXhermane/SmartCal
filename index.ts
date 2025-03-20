import { FormularParser } from "./parser/FormularParser";
import { FormularTokenizer } from "./tokenizer/FormularTokenizer";
import { FormularInterpreter } from "./interpreter/FormularInterpreter";

export default function SmartCal<T extends { [key: string]: number | string }>(expression: string, obj: T): number | string {
   const fTokenizer = new FormularTokenizer();
   const fParser = new FormularParser();
   const fInterpreter = new FormularInterpreter();
   return fInterpreter.execute<T>(fParser.execute(fTokenizer.execute(expression)), obj);
}
