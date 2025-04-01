import { FormulaParser } from "./parser/FormulaParser";
import { FormulaTokenizer } from "./tokenizer/FormulaTokenizer";
import { FormulaInterpreter } from "./interpreter/FormulaInterpreter";
import SmartCal,{isValidExpression,compile} from "./api"
import {ExpressionBuilder} from "./builder/ExpressionBuilder"
import { ConditionResult } from "./constant";
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
console.log(fTokenizer.execute('1+2'))
const data1 = { score: 85 };

// Simple ternary
console.log(SmartCal(`score >= 80 ? "A" : "B"`, data1)); // 'A'

// Nested conditions
const grade = SmartCal(`score >= 90 ? "A" : ((score >= 80) ? "B" : (score >= 70 ? "C" : "D"))
`, data1); // 'B
console.log(grade)
const taxCalculator = compile(`
   subtotal > 1000 
       ? (subtotal * (1 + taxRate) * 0.95 )
       :( subtotal * (1 + taxRate))
`);

console.log(taxCalculator.evaluate({
   subtotal: 1500,
   taxRate: 0.2
})); // 1710 (includes 5% discount)
const data2 = {
   basePrice: 100,
   quantity: 5,
   f_subtotal: "basePrice * quantity",
   f_discount: "f_subtotal >= 500 ? 0.1 : 0.05",
   f_final: "f_subtotal * (1 - f_discount)"
};

// Evaluate nested formulas
console.log(SmartCal("f_final", data2)); // 450 (500 * 0.9)
console.log(SmartCal("'A'"))