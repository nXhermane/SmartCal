# SmartCal

<div align="center">

![SmartCal Logo](https://img.shields.io/badge/SmartCal-Formula%20Engine-blue?style=for-the-badge&logo=javascript)
[![npm version](https://img.shields.io/npm/v/smartcal.svg)](https://www.npmjs.com/package/smartcal)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Test Coverage](https://img.shields.io/badge/coverage-90.75%25-brightgreen.svg)](https://github.com/your-repo/smartcal)

**A powerful, lightweight TypeScript library for dynamic mathematical expression evaluation**

[🚀 Quick Start](#-quick-start) • [📚 Documentation](#-documentation) • [🔧 API Reference](#-api-reference) • [💡 Examples](#-examples)

</div>

---

## ✨ Features

- 🚀 **High Performance** - Optimized expression parsing and evaluation
- 🔢 **Rich Operators** - Arithmetic, comparison, logical, and ternary operations
- 📊 **Dynamic Variables** - Support for nested formulas and data binding
- 🔄 **Compiled Expressions** - Pre-compile expressions for repeated use
- 🌍 **Unicode Support** - Full Unicode character support in string literals
- ✅ **Type Safety** - Full TypeScript support with type definitions
- 🧪 **Well Tested** - 90%+ test coverage with comprehensive test suite
- 📦 **Zero Dependencies** - Lightweight with no external dependencies

## 📦 Installation

```bash
# npm
npm install smartcal

# yarn
yarn add smartcal

# pnpm
pnpm add smartcal
```

## 🚀 Quick Start

### Basic Evaluation

```typescript
import SmartCal from "smartcal";

// 🔢 Basic arithmetic operations
console.log(SmartCal("2 + 3 * 4"));     // 14 (respects operator precedence)
console.log(SmartCal("2 ^ 3"));         // 8 (exponentiation)
console.log(SmartCal("10 % 3"));        // 1 (modulo)

// 📊 With variables and data binding
const userData = { age: 25, weight: 70, height: 1.75 };
console.log(SmartCal("age + 5", userData));              // 30
console.log(SmartCal("weight / (height ^ 2)", userData)); // 22.86 (BMI calculation)

// 🎯 Conditional expressions with Unicode support
const studentData = { score: 85, name: "José María" };
console.log(SmartCal(`score >= 80 ? "A" : "B"`, studentData)); // "A"
console.log(SmartCal(`"Student: ${name}"`, studentData));       // "Student: José María"

// 🌍 Unicode string literals fully supported
console.log(SmartCal('"café"'));           // "café"
console.log(SmartCal('"北京"'));           // "北京"
console.log(SmartCal('"naïve"'));          // "naïve"
```

## 📘 Advanced Usage

### 🔍 Expression Validation

```typescript
import { isValidExpression } from "smartcal";

// ✅ Valid expressions return true
console.log(isValidExpression("2 + 2"));                    // true
console.log(isValidExpression("x > 10 ? 'high' : 'low'"));  // true
console.log(isValidExpression("(a + b) * c"));             // true
console.log(isValidExpression('"Unicode: naïve"'));        // true ✨

// ❌ Invalid expressions return false
console.log(isValidExpression("2 +"));                     // false - incomplete expression
console.log(isValidExpression("x > ? 1 : 0"));             // false - malformed ternary
console.log(isValidExpression("(a + b * c"));              // false - unmatched parentheses
```

### Compiled Expressions

```typescript
import { compile } from "smartcal";

// Create a reusable compiled expression
const priceCalculator = compile("quantity * unitPrice * (1 - discount)");

// Use it multiple times with different data
console.log(priceCalculator.evaluate({
    quantity: 5,
    unitPrice: 10,
    discount: 0.1
})); // 45

console.log(priceCalculator.evaluate({
    quantity: 3,
    unitPrice: 15,
    discount: 0.2
})); // 36

// Compile complex formulas
const taxCalculator = compile(`
    subtotal > 1000 
        ? (subtotal * (1 + taxRate) * 0.95)
        : (subtotal * (1 + taxRate))
`);

console.log(taxCalculator.evaluate({
    subtotal: 1500,
    taxRate: 0.2
})); // 1710 (includes 5% discount)

// Get the original expression
console.log(taxCalculator.toString()); // prints the original formula


// Chain multiple compilations
const discountCalculator = compile("price >= 100 ? (discount * 2) : discount");
const finalPrice = compile(`basePrice * (1 - discountCalculator)`);

console.log(finalPrice.evaluate({
    basePrice: 120,
    price: 120,
    discount: 0.1,
    discountCalculator
})); // 96 (120 * (1 - 0.2))
```

### Working with Formula Variables

```typescript
import SmartCal,{ConditionResult} from "smartcal";

const data = {
    basePrice: 100,
    quantity: 5,
    f_subtotal: "basePrice * quantity",
    f_discount: "f_subtotal >= 500 ? 0.1 : 0.05",
    f_final: "f_subtotal * (1 - f_discount)"
};

// Evaluate nested formulas
console.log(SmartCal("f_final", data)); // 450 (500 * 0.9)

// Complex conditional formulas
const orderData = {
   items: 3,
   unitPrice: 40,
   isPremium: ConditionResult.True,
   f_baseTotal: "items * unitPrice",
   f_discount: "isPremium ? 0.15 : (f_baseTotal > 100 ? 0.1 : 0)",
   f_shipping: "f_baseTotal > 200 ? 0 : 10",
   f_grandTotal: "f_baseTotal * (1 - f_discount) + f_shipping"
};

console.log(SmartCal("f_grandTotal", orderData)); // 112 (120 * 0.85 + 10)
```

## 📖 Documentation

### Supported Operators

- Arithmetic: `+`, `-`, `*`, `/`, `^`, `%`
- Comparison: `>`, `<`, `>=`, `<=`, `==`, `!=`
- Logical: `&&`, `||`
- Ternary: `?`, `:`
- Grouping: `(`, `)`

### API Reference

```typescript
// Simple evaluation
SmartCal<T>(expression: string, data?: T): number | string

// Expression validation
isValidExpression(expression: string): boolean

// Compilation for reuse
compile(expression: string): CompiledExpression

// CompiledExpression interface
interface CompiledExpression {
    evaluate<T>(data: T): number | string;
    toString(): string;
}
```

## ⚠️ Important Notes

### Ternary Operators

```typescript
// Wrong
const expression = `variable > 6 ? 0.5*anotherVariable : 0.5`
// Correct
const expression = `variable > 6 ? (0.5*anotherVariable) : 0.5`
```

### Boolean Variables

```typescript
const data = {
    bool: ConditionResult.True, // 1
    bool2: ConditionResult.False // 0
}
const expression = `bool ? "True" : bool2 ? "False" : "True"`
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the [MIT License](./LISENCE).
