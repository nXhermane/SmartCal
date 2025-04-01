# SmartCal

**SmartCal** is a lightweight JavaScript library designed to evaluate mathematical expressions, formulas, and conditional expressions dynamically. It supports variables, nested formulas, and complex mathematical operations.

## ⭐ Features

- Arithmetic operations (+, -, *, /, ^, %)
- Comparison operators (>, <, >=, <=, ==, !=)
- Logical operators (&&, ||)
- Ternary conditions (condition ? true : false)
- Formula variables and nested formulas
- Compile expressions for reuse

## 📦 Installation

```bash
npm install smartcal
```

## 🚀 Quick Start

### Basic Evaluation

```typescript
import SmartCal from "smartcal";

// Basic arithmetic
console.log(SmartCal("2 + 3 * 4")); // 14
console.log(SmartCal("2 ^ 3")); // 8
console.log(SmartCal("10 % 3")); // 1

// With variables
const data = { x: 10, y: 5 };
console.log(SmartCal("x + y * 2", data)); // 20
const conditionalData= { score: 85 };

// Simple ternary
console.log(SmartCal(`score >= 80 ? 'A' : 'B'`, conditionalData)); // 'A'

// Nested conditions
const grade = SmartCal(`score >= 90 ? "A" :
   ((score >= 80) ? "B" : (score >= 70 ? "C" : "D"))
`, conditionalData); // 'B
```

## 📘 Advanced Usage

### Expression Validation

```typescript
import { isValidExpression } from "smartcal";

// Valid expressions
console.log(isValidExpression("2 + 2")); // true
console.log(isValidExpression("x > 10 ? 'high' : 'low'")); // true
console.log(isValidExpression("(a + b) * c")); // true

// Invalid expressions
console.log(isValidExpression("2 +")); // false
console.log(isValidExpression("x > ? 1 : 0")); // false
console.log(isValidExpression("(a + b * c")); // false
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
