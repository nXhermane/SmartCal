import { FormularParser } from "./parser/FormularParser";
import { FormularTokenizer } from "./tokenizer/FormularTokenizer";
import { FormularInterpreter } from "./interpreter/FormularInterpreter";
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


const fTokenizer = new FormularTokenizer()
const fParser = new FormularParser()
const fInterpreter = new FormularInterpreter()
const tokens = fTokenizer.execute(`10+3%2*4`)
const ast = fParser.execute(tokens)
const result = fInterpreter.execute(ast, {})
console.log(result)
// Failure : "4 ^ 2 ^ 6"