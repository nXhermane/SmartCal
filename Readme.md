# SmartCalc

**SmartCalc** is a lightweight JavaScript library designed to evaluate complex mathematical expressions and ternary conditions using dynamic variables. Whether you need to calculate formulas based on user input or make decisions using ternary operators, SmartCalc allows you to easily parse and execute these expressions in your project.

## Features

- Supports arithmetic operations like addition, subtraction, multiplication, and division.
- Handles ternary conditions (i.e., `condition ? true : false`).
- Allows the use of custom variables within formulas.
- Lightweight and fast.
- Perfect for evaluating dynamic expressions and conditions.

## Installation

Install the package using npm:

```bash
npm install smartcalc
```

## Usage

To use SmartCalc, simply import the library into your project, define your data, and use formulas with variables. You can also use ternary operators for conditional evaluations inside the expressions.

### Example

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
const formular = `(10 * poids) + (6.25 * taille) - (5 * age) + ((sexe == "H" ? 5 : (-161)) * niveauActivite) * f_IMC`;

// Define a conditional expression with a ternary operator
const condition = `(10 + ((10 > 5) ? ((11 + 5) - 5) : "false"))`;

// Evaluate the formula with the provided data
console.log(SmartCalc<Data>(formular, data));

// Evaluate the condition
console.log(SmartCalc<{ [key: string]: string | number }>(condition, {}));
```

## How it Works

### Formulas with Variables
SmartCalc allows you to define a formula using placeholders (i.e., variables like age, poids, etc.) that are replaced with values from your data object. The formula is parsed, and the result is calculated.

Example: In the formula `(10 * poids) + (6.25 * taille) - (5 * age)`, the variables `poids`, `taille`, and `age` are replaced with the values from the data object (`poids = 60`, `taille = 1.64`, `age = 20`), and the result is computed.

### Ternary Conditions
The library also supports ternary conditions, where the expression returns one of two values based on a condition. For example, `((sexe == "H" ? 5 : (-161)) * niveauActivite)` returns 5 if `sexe == "H"`, otherwise it returns -161.

### Arithmetic and Logical Operations
You can mix arithmetic and logical operations in a single formula. The library interprets and computes the result dynamically, ensuring that the expressions are evaluated in real-time based on the provided data.

## API

`SmartCalc(expression: string, data: object)`: Evaluates the given mathematical or logical expression with the provided data.
- `expression`: A string that represents the formula or condition.
- `data`: An object containing key-value pairs for the variables used in the expression.

## License

This project is licensed under the MIT License.