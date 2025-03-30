import { FormulaParser } from "./parser/FormulaParser";
import { FormulaTokenizer } from "./tokenizer/FormulaTokenizer";
import { FormulaInterpreter } from "./interpreter/FormulaInterpreter";
import SmartCal, {isValidExpression} from "./main"
import {ExpressionBuilder} from "./builder/ExpressionBuilder"
const data: Data = {
   age: 20,
   sexe: "H",
   poids: 60,
   taille: 1.64,
   niveauActivite: 1.56,
   f_IMC: "10+5",
};

type Data = {
   age: number;
   sexe: string;
   poids: number;
   taille: number;
   niveauActivite: number;
   f_IMC: string;
};
const formular = `(10 * poids) + (6.25 * taille) - (5 * age ) + ((sexe == "H" ? 5 : (-161)) * niveauActivite) * f_IMC`;
const condition = `(10 + ((10 > 5) ? ((11+5)-5) : "false"))`;

console.log(isValidExpression(``))
const fTokenizer = new FormulaTokenizer()
const fParser = new FormulaParser()
const fInterpreter = new FormulaInterpreter()
const tokens = fTokenizer.execute(`3==5`)
const ast = fParser.execute(tokens)
const result = fInterpreter.execute(ast, {})
console.log(result)
console.log(SmartCal("10",{yello:2}))
// Failure : "4 ^ 2 ^ 6"

console.log(ExpressionBuilder.create().add(2,2).str())