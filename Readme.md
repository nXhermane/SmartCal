# SmartCalc

**SmartCalc** is a lightweight JavaScript library designed to evaluate complex mathematical expressions and ternary conditions using dynamic variables. It allows you to calculate formulas based on user input, make decisions using ternary operators, and even use variables that point to other formulas.

## Features

- Supports arithmetic operations like addition, subtraction, multiplication, and division.
- Handles ternary conditions (i.e., `condition ? true : false`).
- Allows the use of custom variables within formulas.
- Supports formula variables that point to other formulas.
- Lightweight and fast.
- Perfect for evaluating dynamic expressions and conditions.

## Installation

You can install SmartCalc directly from GitHub using npm:

```bash
npm install git+https://github.com/nXhermane/SmartCal.git
```

## Usage

To use SmartCalc, import the library into your project, define your data (including any formula variables), and use formulas with variables. You can also use ternary operators for conditional evaluations inside the expressions.

### Example 1: Basic Usage

```typescript
import SmartCalc from "smartcalc";

// Define the data with custom variables
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

// Define a formula with custom variables
const formula1 = `(10 * poids) + (6.25 * taille) - (5 * age) + ((sexe == "H" ? 5 : (-161)) * niveauActivite) * f_IMC`;

// Define a conditional expression with a ternary operator
const condition = `(10 + ((10 > 5) ? ((11 + 5) - 5) : "false"))`;

// Evaluate the formula with the provided data
console.log(SmartCalc<Data>(formula1, data));

// Evaluate the condition
console.log(SmartCalc<{ [key: string]: string | number }>(condition, {}));
```

### Example 2: Advanced Usage with Formula Variables

```typescript
import SmartCalc from "smartcalc";

// Define the data with custom variables, including formula variables
const data: AdvancedData = {
   age: 20,
   sexe: "H",
   poids: 60,
   taille: 1.64,
   niveauActivite: 1.56,
   f_IMC: "poids / (taille * taille)", // Formula variable for BMI
   f_metabolismeBasal: "(10 * poids) + (6.25 * taille * 100) - (5 * age) + ((sexe == 'H' ? 5 : -161))" // Formula variable for basal metabolic rate
};

type AdvancedData = {
   age: number;
   sexe: string;
   poids: number;
   taille: number;
   niveauActivite: number;
   f_IMC: string;
   f_metabolismeBasal: string;
};

// Define a formula that uses both regular and formula variables
const formula2 = `f_metabolismeBasal * niveauActivite * (f_IMC > 25 ? 1.1 : 1)`;

// Evaluate the formula with the provided data
console.log(SmartCalc<AdvancedData>(formula2, data));
```

## How it Works

### Regular Variables
Regular variables are defined with their actual values in the data object. For example, `age: 20` or `poids: 60`.

### Formula Variables
Formula variables are defined with a string representation of a formula, prefixed with `f_`. For example:
```typescript
f_IMC: "poids / (taille * taille)"
```
These variables can use other variables in their formula definition.

### Formulas with Variables
SmartCalc allows you to define a formula using placeholders (i.e., variables like age, poids, f_IMC, etc.) that are replaced with values or evaluated formulas from your data object. The formula is parsed, and the result is calculated.

Example: In the formula `f_metabolismeBasal * niveauActivite * (f_IMC > 25 ? 1.1 : 1)`, the variables `f_metabolismeBasal`, `niveauActivite`, and `f_IMC` are replaced with their respective values or evaluated formulas from the data object, and the result is computed.

### Ternary Conditions
The library supports ternary conditions, where the expression returns one of two values based on a condition. For example, `(f_IMC > 25 ? 1.1 : 1)` returns 1.1 if the BMI is greater than 25, otherwise it returns 1.

### Arithmetic and Logical Operations
You can mix arithmetic and logical operations in a single formula. The library interprets and computes the result dynamically, ensuring that the expressions are evaluated in real-time based on the provided data.

## API

`SmartCalc(expression: string, data: object)`: Evaluates the given mathematical or logical expression with the provided data.
- `expression`: A string that represents the formula or condition.
- `data`: An object containing key-value pairs for the variables used in the expression, including formula variables prefixed with `f_`.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.