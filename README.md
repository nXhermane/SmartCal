# SmartCal

**SmartCal** is a lightweight JavaScript library designed to evaluate complex mathematical expressions and ternary conditions using dynamic variables. It allows you to calculate formulas based on user input, make decisions using ternary operators, and even use variables that point to other formulas.

## Features

- Supports arithmetic operations like addition, subtraction, multiplication, division and exponent.
- Handles ternary conditions (i.e., `condition ? true : false`).
- Allows the use of custom variables within formulas.
- Supports formula variables that point to other formulas.
- Lightweight and fast.
- Perfect for evaluating dynamic expressions and conditions.

## Installation

You can install SmartCal using npm:

```bash
npm install smartcal
```

## Getting Started

To get started with SmartCal, follow these steps:

1. Install the library using npm.
2. Import the library into your project.
3. Define your data, including any formula variables.
4. Use formulas with variables and evaluate them using SmartCal.

## Usage

To use SmartCal, import the library into your project, define your data (including any formula variables), and use formulas with variables. You can also use ternary operators for conditional evaluations inside the expressions.

### Example 1: Basic Usage

```typescript
import SmartCal, { isValidExpression } from "smartcal";

// Define the data with custom variables
const data: Data = {
   age: 20,
   gender: "M",
   weight: 60,
   height: 1.64,
   activityLevel: 1.56,
   f_BMI: "10+5",
};

type Data = {
   age: number;
   gender: string;
   weight: number;
   height: number;
   activityLevel: number;
   f_BMI: string;
};

// Define a formula with custom variables
const formula1 = `(10 * weight) + (6.25 * height) - (5 * age) + ((gender == "M" ? 5 : (-161)) * activityLevel) * f_BMI`;

// Define a conditional expression with a ternary operator
const condition = `(10 + ((10 > 5) ? ((11 + 5) - 5) : "false"))`;

// Verify if the expression is valid
console.log(isValidExpression(formula1)); // true
console.log(isValidExpression(condition)); // true

// Evaluate the formula with the provided data
console.log(SmartCal<Data>(formula1, data));

// Evaluate the condition
console.log(SmartCal<{ [key: string]: string | number }>(condition, {}));
```

### Example 2: Usage with Formula Variables

```typescript
import SmartCal from "smartcal";

// Define the data with custom variables, including formula variables
const data: Data = {
   age: 20,
   gender: "M",
   weight: 60,
   height: 1.64,
   activityLevel: 1.56,
   f_BMI: "weight / (height * height)", // Formula variable for BMI
   f_basalMetabolism: "(10 * weight) + (6.25 * height * 100) - (5 * age) + ((gender == 'M' ? 5 : -161))" // Formula variable for basal metabolic rate
};

type Data = {
   age: number;
   gender: string;
   weight: number;
   height: number;
   activityLevel: number;
   f_BMI: string;
   f_basalMetabolism: string;
};

// Define a formula that uses both regular and formula variables
const formula2 = `f_basalMetabolism * activityLevel * (f_BMI > 25 ? 1.1 : 1)`;

// Evaluate the formula with the provided data
console.log(SmartCal<Data>(formula2, data));

const exponentFormula = `2 ^ 3 + 1 ^ (-3)`;
console.log(SmartCal<{}>(exponentFormula,{}));// 9
```


## How it Works

### Regular Variables
Regular variables are defined with their actual values in the data object. For example, `age: 20` or `weight: 60`.

### Formula Variables
Formula variables are defined with a string representation of a formula, prefixed with `f_`. For example:
```typescript
f_BMI: "weight / (height * height)"
```
These variables can use other variables in their formula definition.

### Formulas with Variables
SmartCal allows you to define a formula using placeholders (i.e., variables like age, weight, f_BMI, etc.) that are replaced with values or evaluated formulas from your data object. The formula is parsed, and the result is calculated.

Example: In the formula `f_basalMetabolism * activityLevel * (f_BMI > 25 ? 1.1 : 1)`, the variables `f_basalMetabolism`, `activityLevel`, and `f_BMI` are replaced with their respective values or evaluated formulas from the data object, and the result is computed.

### Ternary Conditions
The library supports ternary conditions, where the expression returns one of two values based on a condition. For example, `(f_BMI > 25 ? 1.1 : 1)` returns 1.1 if the BMI is greater than 25, otherwise it returns 1.

### Arithmetic and Logical Operations
You can mix arithmetic and logical operations in a single formula. The library interprets and computes the result dynamically, ensuring that the expressions are evaluated in real-time based on the provided data.

## API

`SmartCal(expression: string, data: object)`: Evaluates the given mathematical or logical expression with the provided data.
- `expression`: A string that represents the formula or condition.
- `data`: An object containing key-value pairs for the variables used in the expression, including formula variables prefixed with `f_`.

`isValidExpression(expression: string)`: Check if the given expression is valid and can be evaluated.
- `expression`: A string that represents the formula or condition.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.