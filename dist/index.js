(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["smartcal"] = factory();
	else
		root["smartcal"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./api/Compile.ts":
/*!************************!*\
  !*** ./api/Compile.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.compile = compile;
const CompiledExpression_1 = __webpack_require__(/*! ../expression/CompiledExpression */ "./expression/CompiledExpression.ts");
/**
 * Compiles a formula expression string into a reusable CompiledExpression object.
 *
 * Compilation pre-parses the expression into an AST (Abstract Syntax Tree) for improved
 * performance when evaluating the same expression multiple times with different data.
 *
 * @param {string} expression - The formula expression to compile. Must be a valid expression
 *        that can be parsed by the formula engine.
 * @returns {CompiledExpression} A compiled expression object that can be evaluated multiple times
 *
 * @example
 * ```typescript
 * // Compile once, evaluate multiple times
 * const priceCalculator = compile("quantity * unitPrice * (1 - discount)");
 *
 * // Use with different data
 * priceCalculator.evaluate({ quantity: 5, unitPrice: 10, discount: 0.1 }); // 45
 * priceCalculator.evaluate({ quantity: 3, unitPrice: 15, discount: 0.2 }); // 36
 *
 * // Get original expression
 * console.log(priceCalculator.toString()); // "quantity * unitPrice * (1 - discount)"
 * ```
 *
 * @throws {FormulaInterpreterError} When expression syntax is invalid
 * @throws {IncorrectSyntax} When expression has incorrect syntax
 */
function compile(expression) {
    return new CompiledExpression_1.CompiledFormulaExpression(expression);
}


/***/ }),

/***/ "./api/SmartCal.ts":
/*!*************************!*\
  !*** ./api/SmartCal.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = SmartCal;
const FormulaInterpreter_1 = __webpack_require__(/*! ../interpreter/FormulaInterpreter */ "./interpreter/FormulaInterpreter.ts");
const FormulaParser_1 = __webpack_require__(/*! ../parser/FormulaParser */ "./parser/FormulaParser.ts");
const FormulaTokenizer_1 = __webpack_require__(/*! ../tokenizer/FormulaTokenizer */ "./tokenizer/FormulaTokenizer.ts");
/**
 * Evaluates a mathematical expression and returns the result.
 *
 * This function parses and interprets a mathematical formula represented as a string,
 * applying dynamic values from a given object to resolve variables or conditions within the expression.
 *
 * @template T - A generic type representing the structure of the input object. Keys are variable names, and values can be numbers, strings, or arrays.
 * @param {string} expression - The mathematical expression to be evaluated.
 *        Variables in the expression should correspond to keys in the `obj` parameter.
 *        Supports arithmetic (+, -, *, /, ^, %), comparison (>, <, >=, <=, ==, !=),
 *        logical (&&, ||), and ternary (? :) operators.
 * @param {T} obj - An object containing the values of the variables referenced in the expression.
 *        Can include nested formula variables prefixed with 'f_' and regular data variables.
 * @returns {number | string} - The result of the evaluated expression, which can be a number or string.
 *
 * @example
 * ```typescript
 * // Basic arithmetic
 * SmartCal("2 + 3 * 4"); // 14
 *
 * // With variables
 * SmartCal("age + 5", { age: 25 }); // 30
 *
 * // With formula variables
 * SmartCal("f_total", {
 *   f_subtotal: "price * quantity",
 *   f_total: "f_subtotal * 1.2",
 *   price: 10,
 *   quantity: 5
 * }); // 60
 * ```
 *
 * @throws {FormulaInterpreterError} When expression syntax is invalid or variables are undefined
 * @throws {IncorrectSyntax} When expression has incorrect syntax
 * @throws {InvalidFormulaError} When formula is malformed
 */
function SmartCal(expression, obj) {
    const fTokenizer = new FormulaTokenizer_1.FormulaTokenizer();
    const fParser = new FormulaParser_1.FormulaParser();
    const fInterpreter = new FormulaInterpreter_1.FormulaInterpreter();
    return fInterpreter.execute(fParser.execute(fTokenizer.execute(expression)), obj || {});
}


/***/ }),

/***/ "./api/index.ts":
/*!**********************!*\
  !*** ./api/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = void 0;
var SmartCal_1 = __webpack_require__(/*! ./SmartCal */ "./api/SmartCal.ts");
Object.defineProperty(exports, "default", ({ enumerable: true, get: function () { return __importDefault(SmartCal_1).default; } }));
__exportStar(__webpack_require__(/*! ./isValidExpression */ "./api/isValidExpression.ts"), exports);
__exportStar(__webpack_require__(/*! ./Compile */ "./api/Compile.ts"), exports);


/***/ }),

/***/ "./api/isValidExpression.ts":
/*!**********************************!*\
  !*** ./api/isValidExpression.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isValidExpression = isValidExpression;
const FormulaParser_1 = __webpack_require__(/*! ../parser/FormulaParser */ "./parser/FormulaParser.ts");
const FormulaTokenizer_1 = __webpack_require__(/*! ../tokenizer/FormulaTokenizer */ "./tokenizer/FormulaTokenizer.ts");
/**
 * Validates whether a given expression is a valid formula that can be parsed and evaluated.
 *
 * This function performs syntax checking without executing the expression, making it useful
 * for input validation before evaluation.
 *
 * @param {string} expression - The expression string to validate
 * @returns {boolean} true if the expression is syntactically valid, false otherwise
 *
 * @example
 * ```typescript
 * isValidExpression("2 + 3 * 4"); // true
 * isValidExpression("x > 10 ? 'high' : 'low'"); // true
 * isValidExpression("2 +"); // false - incomplete expression
 * isValidExpression("(a + b * c"); // false - unmatched parentheses
 * ```
 *
 * @note This function only checks syntax validity, not semantic correctness (e.g., undefined variables)
 */
function isValidExpression(expression) {
    try {
        const fTokenizer = new FormulaTokenizer_1.FormulaTokenizer();
        const fParser = new FormulaParser_1.FormulaParser();
        const tokens = fTokenizer.execute(expression);
        return fParser.isValidFormula(tokens);
    }
    catch (_a) {
        return false;
    }
}


/***/ }),

/***/ "./constant.ts":
/*!*********************!*\
  !*** ./constant.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Priority_4_Operator = exports.Priority_3_Operator = exports.Priority_2_Operator = exports.Priority_1_Operator = exports.AllOperators = exports.Operators = exports.ArithmeticOperator = exports.ComparisonOperator = exports.BackslashOperator = exports.QuestionMarkOperator = exports.ColonOperator = exports.ParenthesisCloseOperator = exports.ParenthesisOpenOperator = exports.AssignmentOperator = exports.NotEqualOperator = exports.EqualOperator = exports.LessThanOrEqualOperator = exports.GreaterThanOrEqualOperator = exports.LessThanOperator = exports.GreaterThanOperator = exports.LogicalOrOperator = exports.LogicalAndOperator = exports.ModuloOperator = exports.ExponentialOperator = exports.MultiplicationOperator = exports.DivisionOperator = exports.SubtractionOperator = exports.AdditionOperator = exports.ConditionResult = exports.REGEX = void 0;
/**
 * Regular expressions used for parsing formula expressions.
 */
exports.REGEX = {
    /** Global regex for matching operators in formulas */
    formulaOperatorG: /(<=|\^|%|>=|==|\|\||&&|!=|[+/\-*=()<>?:])/g,
    /** Single match regex for operators */
    formulaOperator: /(<=|>=|\^|%|==|\|\||&&|!=|[+/\-*=()<>?!:])/,
    /** Regex to identify formula field names (prefixed with 'f_') */
    formulaFieldName: /f_[\w]/, // that is regex that identify the formula fieldName
};
/**
 * Enumeration for boolean condition results in expressions.
 * Used for ternary operations and logical evaluations.
 */
exports.ConditionResult = {
    /** Represents true (evaluates to 1 in numeric context) */
    True: 1,
    /** Represents false (evaluates to 0 in numeric context) */
    False: 0,
};
// Arithmetic operators
/** Addition operator (+) */
exports.AdditionOperator = "+";
/** Subtraction operator (-) */
exports.SubtractionOperator = "-";
/** Division operator (/) */
exports.DivisionOperator = "/";
/** Multiplication operator (*) */
exports.MultiplicationOperator = "*";
/** Exponential operator (^) */
exports.ExponentialOperator = "^";
/** Modulo operator (%) */
exports.ModuloOperator = "%";
// Logical operators
/** Logical AND operator (&&) */
exports.LogicalAndOperator = "&&";
/** Logical OR operator (||) */
exports.LogicalOrOperator = "||";
// Comparison operators
/** Greater than operator (>) */
exports.GreaterThanOperator = ">";
/** Less than operator (<) */
exports.LessThanOperator = "<";
/** Greater than or equal operator (>=) */
exports.GreaterThanOrEqualOperator = ">=";
/** Less than or equal operator (<=) */
exports.LessThanOrEqualOperator = "<=";
/** Equality operator (==) */
exports.EqualOperator = "==";
/** Inequality operator (!=) */
exports.NotEqualOperator = "!=";
// Other operators
/** Assignment operator (=) */
exports.AssignmentOperator = "=";
/** Opening parenthesis (() */
exports.ParenthesisOpenOperator = "(";
/** Closing parenthesis ()) */
exports.ParenthesisCloseOperator = ")";
/** Colon operator (:) - used in ternary operations */
exports.ColonOperator = ":";
/** Question mark operator (?) - used in ternary operations */
exports.QuestionMarkOperator = "?";
/** Backslash operator (\) */
exports.BackslashOperator = "\\";
/** Array of all comparison operators */
exports.ComparisonOperator = [
    exports.GreaterThanOperator,
    exports.LessThanOperator,
    exports.LogicalOrOperator,
    exports.LogicalAndOperator,
    exports.GreaterThanOrEqualOperator,
    exports.LessThanOrEqualOperator,
    exports.EqualOperator,
    exports.NotEqualOperator,
];
/** Array of all arithmetic operators */
exports.ArithmeticOperator = [
    exports.AdditionOperator,
    exports.SubtractionOperator,
    exports.DivisionOperator,
    exports.MultiplicationOperator,
    exports.ExponentialOperator,
    exports.ModuloOperator,
];
/** Combined array of arithmetic and comparison operators plus ternary operator */
exports.Operators = [
    ...exports.ArithmeticOperator,
    ...exports.ComparisonOperator,
    exports.QuestionMarkOperator,
];
/** Array of all operators including parentheses and colon */
exports.AllOperators = [
    ...exports.Operators,
    exports.ColonOperator,
    exports.ParenthesisCloseOperator,
    exports.ParenthesisOpenOperator,
];
/** Priority 1 operators (lowest precedence): addition and subtraction */
exports.Priority_1_Operator = [exports.AdditionOperator, exports.SubtractionOperator];
/** Priority 2 operators: multiplication, division, modulo */
exports.Priority_2_Operator = [
    exports.DivisionOperator,
    exports.MultiplicationOperator,
    exports.ModuloOperator,
];
/** Priority 3 operators (highest precedence): exponentiation */
exports.Priority_3_Operator = [exports.ExponentialOperator];
/** Priority 4 operators: comparisons and ternary */
exports.Priority_4_Operator = [
    ...exports.ComparisonOperator,
    exports.QuestionMarkOperator,
];


/***/ }),

/***/ "./errors/FormulaInterpreterError.ts":
/*!*******************************************!*\
  !*** ./errors/FormulaInterpreterError.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FormulaInterpreterError = void 0;
class FormulaInterpreterError {
    constructor(message, error) {
        this.message = message;
        this.name = "FormulaInterpreterError";
        this.stack = error;
    }
}
exports.FormulaInterpreterError = FormulaInterpreterError;


/***/ }),

/***/ "./errors/FormulaVariableNotFoundError.ts":
/*!************************************************!*\
  !*** ./errors/FormulaVariableNotFoundError.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FormulaVariableNotFoundError = void 0;
class FormulaVariableNotFoundError extends Error {
    constructor(message, variableName, variableContainer) {
        super(message);
        this.name = "FormulaVariableNotFound";
        this.data = { variableName, container: variableContainer };
    }
    getData() {
        return this.data;
    }
}
exports.FormulaVariableNotFoundError = FormulaVariableNotFoundError;


/***/ }),

/***/ "./errors/IncorrectSyntax.ts":
/*!***********************************!*\
  !*** ./errors/IncorrectSyntax.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IncorrectSyntaxError = void 0;
class IncorrectSyntaxError extends Error {
    constructor(message, exp) {
        super(message);
        this.name = "IncorrectSyntaxError";
        this.data = { exp };
    }
    getData() {
        return this.data;
    }
}
exports.IncorrectSyntaxError = IncorrectSyntaxError;


/***/ }),

/***/ "./errors/InvalidFormulaError.ts":
/*!***************************************!*\
  !*** ./errors/InvalidFormulaError.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvalidFormulaError = void 0;
class InvalidFormulaError extends Error {
    constructor(message, exp) {
        super(message);
        this.name = "Invalid formula";
        this.data = { exp };
    }
    getData() {
        return this.data;
    }
}
exports.InvalidFormulaError = InvalidFormulaError;


/***/ }),

/***/ "./errors/index.ts":
/*!*************************!*\
  !*** ./errors/index.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./FormulaInterpreterError */ "./errors/FormulaInterpreterError.ts"), exports);
__exportStar(__webpack_require__(/*! ./FormulaVariableNotFoundError */ "./errors/FormulaVariableNotFoundError.ts"), exports);
__exportStar(__webpack_require__(/*! ./IncorrectSyntax */ "./errors/IncorrectSyntax.ts"), exports);
__exportStar(__webpack_require__(/*! ./InvalidFormulaError */ "./errors/InvalidFormulaError.ts"), exports);


/***/ }),

/***/ "./expression/BinaryOperation.ts":
/*!***************************************!*\
  !*** ./expression/BinaryOperation.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BinaryOperation = void 0;
const Expression_1 = __webpack_require__(/*! ./Expression */ "./expression/Expression.ts");
/**
 * Represents a binary operation on two expressions.
 *
 * @template T The input type of the expression.
 * @template R The output type of the expressions.
 * @param {Expression<T, R>} left The left expression.
 * @param {Expression<T, R>} right The right expression.
 * @param {(a: R, b: R) => number} operator The operator function that takes two values of type R and returns a number.
 */
class BinaryOperation extends Expression_1.Expression {
    constructor(left, right, operator) {
        super();
        this.left = left;
        this.right = right;
        this.operator = operator;
    }
    /**
     * Executes the binary operation on the given object.
     *
     * @param {T} obj The object on which the operation will be executed.
     * @returns {number} The result of the binary operation.
     */
    execute(obj) {
        return this.operator(this.left.execute(obj), this.right.execute(obj));
    }
}
exports.BinaryOperation = BinaryOperation;


/***/ }),

/***/ "./expression/CompiledExpression.ts":
/*!******************************************!*\
  !*** ./expression/CompiledExpression.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompiledFormulaExpression = void 0;
const FormulaInterpreter_1 = __webpack_require__(/*! ../interpreter/FormulaInterpreter */ "./interpreter/FormulaInterpreter.ts");
const FormulaParser_1 = __webpack_require__(/*! ../parser/FormulaParser */ "./parser/FormulaParser.ts");
const FormulaTokenizer_1 = __webpack_require__(/*! ../tokenizer/FormulaTokenizer */ "./tokenizer/FormulaTokenizer.ts");
/**
 * Implementation of the CompiledExpression interface for formula expressions.
 *
 * This class provides a concrete implementation that compiles a formula expression
 * once and allows efficient repeated evaluation with different data sets.
 *
 * @class
 * @implements {CompiledExpression}
 */
class CompiledFormulaExpression {
    /**
     * Creates a new instance of CompiledFormulaExpression.
     *
     * @param {string} expression - The formula expression to compile.
     *        Must be a valid expression that can be parsed by the formula engine.
     *
     * @throws {FormulaInterpreterError} When expression syntax is invalid during compilation
     * @throws {IncorrectSyntax} When expression has incorrect syntax during compilation
     */
    constructor(expression) {
        this.expression = expression;
        /** Type identifier for the compiled expression */
        this.type = "CompiledExpression";
        this._ast = new FormulaParser_1.FormulaParser().execute(new FormulaTokenizer_1.FormulaTokenizer().execute(expression));
    }
    /**
     * Evaluates the compiled expression with the provided data.
     *
     * @template T - The type of the data object containing variables
     * @param {T} data - The data object to evaluate the expression against.
     *        Should contain all variables referenced in the expression.
     * @returns {string | number} The result of the evaluation
     *
     * @example
     * ```typescript
     * const expr = new CompiledFormulaExpression("price * quantity");
     * expr.evaluate({ price: 10, quantity: 5 }); // 50
     * ```
     *
     * @throws {FormulaVariableNotFoundError} When required variables are missing from data
     */
    evaluate(data) {
        return new FormulaInterpreter_1.FormulaInterpreter().execute(this._ast, data);
    }
    /**
     * Returns the string representation of the original expression.
     *
     * @returns {string} The original expression string that was compiled
     */
    toString() {
        return this.expression;
    }
}
exports.CompiledFormulaExpression = CompiledFormulaExpression;


/***/ }),

/***/ "./expression/ConditionalExpression.ts":
/*!*********************************************!*\
  !*** ./expression/ConditionalExpression.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConditionalExpression = void 0;
const Expression_1 = __webpack_require__(/*! ./Expression */ "./expression/Expression.ts");
/**
 * Represents a conditional expression that returns values based on a condition.
 *
 * @template T The input type of the expression.
 * @template R The output type of the conditional expression.
 * @param {Expression<T, number>} condition The expression that determines the condition to evaluate.
 * @param {Expression<T, R>} isTrue The expression to execute if the condition is true.
 * @param {Expression<T, R>} isFalse The expression to execute if the condition is false.
 */
class ConditionalExpression extends Expression_1.Expression {
    constructor(condition, isTrue, isFalse) {
        super();
        this.condition = condition;
        this.isTrue = isTrue;
        this.isFalse = isFalse;
    }
    /**
     * Executes the conditional expression on the given object.
     *
     * @param {T} obj The object on which the expression will be evaluated.
     * @returns {R} The value returned by the conditional expression, based on the evaluation of the condition.
     */
    execute(obj) {
        return this.condition.execute(obj) != 0 ? this.isTrue.execute(obj) : this.isFalse.execute(obj);
    }
}
exports.ConditionalExpression = ConditionalExpression;


/***/ }),

/***/ "./expression/Expression.ts":
/*!**********************************!*\
  !*** ./expression/Expression.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Expression = void 0;
/**
 * Represents an abstract expression that defines an interface for evaluating expressions.
 * @template T The input type for the expression.
 * @template R The type of result produced by the expression.
 */
class Expression {
}
exports.Expression = Expression;


/***/ }),

/***/ "./expression/ExpressionConstructor.ts":
/*!*********************************************!*\
  !*** ./expression/ExpressionConstructor.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExpressionConstructor = void 0;
const LiteralValue_1 = __webpack_require__(/*! ./LiteralValue */ "./expression/LiteralValue.ts");
const FieldReference_1 = __webpack_require__(/*! ./FieldReference */ "./expression/FieldReference.ts");
const BinaryOperation_1 = __webpack_require__(/*! ./BinaryOperation */ "./expression/BinaryOperation.ts");
const ConditionalExpression_1 = __webpack_require__(/*! ./ConditionalExpression */ "./expression/ConditionalExpression.ts");
class ExpressionConstructor {
    /**
     * Creates a literal value expression.
     *
     * @template T The input type of the expression.
     * @template R The output type of the literal value.
     * @param {R} value The value to be represented as a literal.
     * @returns {Expression<T, R>} The literal value expression.
     */
    static literalValue(value) {
        return new LiteralValue_1.LiteralValue(value);
    }
    /**
     * Creates a field reference expression based on the provided field name.
     *
     * @template T The type of the input object.
     * @template R The type of the output value from the field.
     * @param {string} fieldName The name of the field to reference.
     * @returns {Expression<T, R>} The field reference expression.
     */
    static fieldReference(fieldName) {
        return new FieldReference_1.FieldReference(fieldName);
    }
    /**
     * Creates an addition operation expression between two expressions.
     *
     * @template T The type of the input expressions.
     * @param {Expression<T, number>} left The left operand.
     * @param {Expression<T, number>} right The right operand.
     * @returns {Expression<T, number>} The addition expression.
     */
    static addition(left, right) {
        return new BinaryOperation_1.BinaryOperation(left, right, (a, b) => a + b);
    }
    /**
     * Creates a subtraction operation expression between two expressions.
     *
     * @template T The type of the input expressions.
     * @param {Expression<T, number>} left The left operand.
     * @param {Expression<T, number>} right The right operand.
     * @returns {Expression<T, number>} The subtraction expression.
     */
    static subtraction(left, right) {
        return new BinaryOperation_1.BinaryOperation(left, right, (a, b) => a - b);
    }
    /**
     * Creates a multiplication operation expression between two expressions.
     *
     * @template T The type of the input expressions.
     * @param {Expression<T, number>} left The left operand.
     * @param {Expression<T, number>} right The right operand.
     * @returns {Expression<T, number>} The multiplication expression.
     */
    static multiplication(left, right) {
        return new BinaryOperation_1.BinaryOperation(left, right, (a, b) => a * b);
    }
    /**
     * Creates a division operation expression between two expressions.
     *
     * @template T The type of the input expressions.
     * @param {Expression<T, number>} left The left operand.
     * @param {Expression<T, number>} right The right operand.
     * @returns {Expression<T, number>} The division expression.
     * @throws {Error} Throws an error if division by zero is attempted.
     */
    static division(left, right) {
        return new BinaryOperation_1.BinaryOperation(left, right, (a, b) => {
            if (b === 0)
                throw new Error("Division by zero");
            return a / b;
        });
    }
    /**
     * Creates a conditional expression based on the specified condition.
     *
     * @template T The input type of the expression.
     * @template R The output type of the conditional expression.
     * @param {Expression<T, number>} condition The expression that determines the condition to evaluate.
     * @param {Expression<T, R>} isTrue The expression to execute if the condition is true.
     * @param {Expression<T, R>} isFalse The expression to execute if the condition is false.
     * @returns {Expression<T, R>} The conditional expression.
     */
    static condition(condition, isTrue, isFalse) {
        return new ConditionalExpression_1.ConditionalExpression(condition, isTrue, isFalse);
    }
    /**
     * Creates an equality expression comparing two expressions.
     *
     * @template T The input type of the expressions.
     * @template R The output type of the expressions.
     * @param {Expression<T, R>} left The left operand.
     * @param {Expression<T, R>} right The right operand.
     * @returns {Expression<T, number>} The equality expression.
     */
    static equality(left, right) {
        return new BinaryOperation_1.BinaryOperation(left, right, (a, b) => Number(a === b));
    }
    /**
     * Creates a greater-than expression comparing two expressions.
     *
     * @template T The input type of the expressions.
     * @template R The output type of the expressions.
     * @param {Expression<T, R>} left The left operand.
     * @param {Expression<T, R>} right The right operand.
     * @returns {Expression<T, number>} The greater-than expression.
     */
    static superior(left, right) {
        return new BinaryOperation_1.BinaryOperation(left, right, (a, b) => Number(a > b));
    }
    /**
     * Creates a less-than expression comparing two expressions.
     *
     * @template T The input type of the expressions.
     * @template R The output type of the expressions.
     * @param {Expression<T, R>} left The left operand.
     * @param {Expression<T, R>} right The right operand.
     * @returns {Expression<T, number>} The less-than expression.
     */
    static inferior(left, right) {
        return new BinaryOperation_1.BinaryOperation(left, right, (a, b) => Number(a < b));
    }
    /**
     * Creates a not-equal expression comparing two expressions.
     *
     * @template T The input type of the expressions.
     * @template R The output type of the expressions.
     * @param {Expression<T, R>} left The left operand.
     * @param {Expression<T, R>} right The right operand.
     * @returns {Expression<T, number>} The not-equal expression.
     */
    static different(left, right) {
        return new BinaryOperation_1.BinaryOperation(left, right, (a, b) => Number(a != b));
    }
    /**
     * Creates a logical OR expression between two expressions.
     *
     * @template T The input type of the expressions.
     * @template R The output type of the expressions.
     * @param {Expression<T, R>} left The left operand.
     * @param {Expression<T, R>} right The right operand.
     * @returns {Expression<T, number>} The logical OR expression.
     */
    static or(left, right) {
        return new BinaryOperation_1.BinaryOperation(left, right, (a, b) => Number(a || b));
    }
    /**
     * Creates a logical AND expression between two expressions.
     *
     * @template T The input type of the expressions.
     * @template R The output type of the expressions.
     * @param {Expression<T, R>} left The left operand.
     * @param {Expression<T, R>} right The right operand.
     * @returns {Expression<T, number>} The logical AND expression.
     */
    static and(left, right) {
        return new BinaryOperation_1.BinaryOperation(left, right, (a, b) => Number(a && b));
    }
    /**
     * Creates a power (exponentiation) expression between two expressions.
     *
     * @template T The input type of the expressions.
     * @param {Expression<T, number>} base The base operand.
     * @param {Expression<T, number>} exponent The exponent operand.
     * @returns {Expression<T, number>} The result of raising `base` to the power of `right`.
     */
    static pow(left, right) {
        return new BinaryOperation_1.BinaryOperation(left, right, (a, b) => Math.pow(Number(a), Number(b)));
    }
    /**
     * Creates a modulo operation expression between two expressions.
     *
     * @template T The type of the input expressions.
     * @param {Expression<T, number>} left The left operand.
     * @param {Expression<T, number>} right The right operand.
     * @returns {Expression<T, number>} The modulo expression.
     */
    static modulo(left, right) {
        return new BinaryOperation_1.BinaryOperation(left, right, (a, b) => a % b);
    }
}
exports.ExpressionConstructor = ExpressionConstructor;


/***/ }),

/***/ "./expression/FieldReference.ts":
/*!**************************************!*\
  !*** ./expression/FieldReference.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FieldReference = void 0;
const Expression_1 = __webpack_require__(/*! ./Expression */ "./expression/Expression.ts");
const constant_1 = __webpack_require__(/*! ./../constant */ "./constant.ts");
const FormulaParser_1 = __webpack_require__(/*! ../parser/FormulaParser */ "./parser/FormulaParser.ts");
const FormulaTokenizer_1 = __webpack_require__(/*! ../tokenizer/FormulaTokenizer */ "./tokenizer/FormulaTokenizer.ts");
const FormulaInterpreter_1 = __webpack_require__(/*! ../interpreter/FormulaInterpreter */ "./interpreter/FormulaInterpreter.ts");
const FormulaVariableNotFoundError_1 = __webpack_require__(/*! ../errors/FormulaVariableNotFoundError */ "./errors/FormulaVariableNotFoundError.ts");
/**
 * Represents a reference to a field in a given object, allowing
 * for the execution of expressions and the interpretation of formulas.
 *
 * @template T - The type of the object containing the fields.
 * @template R - The type of the return value of the expression.
 * @param {string} fieldName - The name of the field to reference in the object.
 */
class FieldReference extends Expression_1.Expression {
    constructor(fieldName) {
        super();
        this.fieldName = fieldName;
    }
    /**
     * Executes the field reference on the given object.
     *
     * @param {T} obj - The object from which to extract the field value.
     * @returns {R} The value of the referenced field.
     * @throws {Error} If the field does not exist or is undefined in the object.
     */
    execute(obj) {
        if (obj != null && obj != undefined) {
            if (obj[this.fieldName] != undefined) {
                if (this.isFormulaRef() && typeof obj[this.fieldName] === "string")
                    return this.executeFormulaRef(obj);
                if (this.isCompiledExpression(obj))
                    return this.evaluateCompiledExpression(obj);
                return obj[this.fieldName];
            }
        }
        throw new FormulaVariableNotFoundError_1.FormulaVariableNotFoundError(`The fieldName ${this.fieldName} does not exist or is undefined on object ${obj}`, this.fieldName, obj);
    }
    /**
     * Checks if the field name corresponds to a formula reference.
     *
     * @returns {boolean} True if the field is a formula reference, otherwise false.
     */
    isFormulaRef() {
        return constant_1.REGEX.formulaFieldName.test(this.fieldName);
    }
    /**
     * Checks if the field name corresponds to a Compiled Expression
     * @param obj {T} The object from which to extract the field value.
     * @returns {boolean}  True if the field is a formula reference, otherwise false.
     */
    isCompiledExpression(obj) {
        var _a;
        return ((_a = obj[this.fieldName]) === null || _a === void 0 ? void 0 : _a.type) === "CompiledExpression";
    }
    /**
     * Executes the formula reference and returns the result of the interpretation.
     *
     * @param {T} obj - The object from which to extract the formula.
     * @returns {R} The result of executing the formula.
     */
    executeFormulaRef(obj) {
        const fTokenizer = new FormulaTokenizer_1.FormulaTokenizer();
        const fParser = new FormulaParser_1.FormulaParser();
        const fInterpreter = new FormulaInterpreter_1.FormulaInterpreter();
        const astTree = fParser.execute(fTokenizer.execute(obj[this.fieldName]));
        return fInterpreter.execute(astTree, obj);
    }
    /**
     * Evaluate the compiled Expression
     * @param obj - The object from which to extract the formula.
     * @returns The result of evaluate the compiled Expression.
     */
    evaluateCompiledExpression(obj) {
        const compiledExpression = obj[this.fieldName];
        return compiledExpression.evaluate(obj);
    }
}
exports.FieldReference = FieldReference;


/***/ }),

/***/ "./expression/LiteralValue.ts":
/*!************************************!*\
  !*** ./expression/LiteralValue.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LiteralValue = void 0;
const Expression_1 = __webpack_require__(/*! ./Expression */ "./expression/Expression.ts");
/**
 * Represents a literal value expression.
 *
 * @template T The input type of the expression.
 * @template R The output type of the expression, defaulting to number.
 * @param {R} _value The literal value to be returned when executed.
 */
class LiteralValue extends Expression_1.Expression {
    constructor(_value) {
        super();
        this._value = _value;
    }
    /**
     * Executes the literal value expression and returns the value.
     *
     * @param {T} obj The object on which the expression is executed (not used in this case).
     * @returns {R} The literal value.
     */
    execute(obj) {
        return this._value;
    }
}
exports.LiteralValue = LiteralValue;


/***/ }),

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConditionResult = exports.isValidExpression = exports.compile = exports["default"] = void 0;
const constant_1 = __webpack_require__(/*! ./constant */ "./constant.ts");
Object.defineProperty(exports, "ConditionResult", ({ enumerable: true, get: function () { return constant_1.ConditionResult; } }));
var api_1 = __webpack_require__(/*! ./api */ "./api/index.ts");
Object.defineProperty(exports, "default", ({ enumerable: true, get: function () { return __importDefault(api_1).default; } }));
Object.defineProperty(exports, "compile", ({ enumerable: true, get: function () { return api_1.compile; } }));
Object.defineProperty(exports, "isValidExpression", ({ enumerable: true, get: function () { return api_1.isValidExpression; } }));
__exportStar(__webpack_require__(/*! ./types */ "./types/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./errors */ "./errors/index.ts"), exports);


/***/ }),

/***/ "./interpreter/FormulaInterpreter.ts":
/*!*******************************************!*\
  !*** ./interpreter/FormulaInterpreter.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FormulaInterpreter = void 0;
const ExpressionConstructor_1 = __webpack_require__(/*! ./../expression/ExpressionConstructor */ "./expression/ExpressionConstructor.ts");
const constant_1 = __webpack_require__(/*! ../constant */ "./constant.ts");
const FormulaInterpreterError_1 = __webpack_require__(/*! ../errors/FormulaInterpreterError */ "./errors/FormulaInterpreterError.ts");
/**
 * The FormulaInterpreter class is responsible for interpreting an abstract syntax tree (AST)
 * representing a mathematical or logical expression. It evaluates expressions based on provided
 * variable data and constructs appropriate expression objects for processing.
 */
class FormulaInterpreter {
    /**
     * Executes the interpretation of the AST tree and returns the evaluated result.
     * @param {INode} astTree The abstract syntax tree to be interpreted.
     * @param {T} data The variable data to use for evaluation.
     * @returns {number | string} The result of the expression evaluation.
     */
    execute(astTree, data) {
        const result = this.interpret(astTree, data).execute(data);
        return result;
    }
    /**
     * Interprets the AST tree recursively and constructs expression objects based on the node types.
     * @param {INode} astTree The abstract syntax tree to interpret.
     * @param {T} data The variable data to use for evaluation.
     * @returns {Expression<T, string | number>} The constructed expression object.
     */
    interpret(astTree, data) {
        try {
            if (astTree.isNode()) {
                const operator = astTree.operator;
                const right = this.interpret(astTree.right, data);
                const left = this.interpret(astTree.left, data);
                switch (operator) {
                    case constant_1.AdditionOperator:
                        return ExpressionConstructor_1.ExpressionConstructor.addition(left, right);
                    case constant_1.SubtractionOperator:
                        return ExpressionConstructor_1.ExpressionConstructor.subtraction(left, right);
                    case constant_1.MultiplicationOperator:
                        return ExpressionConstructor_1.ExpressionConstructor.multiplication(left, right);
                    case constant_1.DivisionOperator:
                        return ExpressionConstructor_1.ExpressionConstructor.division(left, right);
                    case constant_1.ModuloOperator:
                        return ExpressionConstructor_1.ExpressionConstructor.modulo(left, right);
                    case constant_1.ExponentialOperator:
                        return ExpressionConstructor_1.ExpressionConstructor.pow(left, right);
                    default:
                        throw new Error(`This operator ${operator} is not supported.`);
                }
            }
            else if (astTree.isValue()) {
                const value = astTree.value;
                if (typeof value === "number") {
                    return ExpressionConstructor_1.ExpressionConstructor.literalValue(Number(astTree.value));
                }
                else {
                    const regex = /["']([^"']+)["']/;
                    const stringValue = value.match(regex)[1];
                    return ExpressionConstructor_1.ExpressionConstructor.literalValue(stringValue);
                }
            }
            else if (astTree.isField()) {
                const fieldValue = data[String(astTree.fieldName)];
                if (fieldValue === undefined)
                    throw new FormulaInterpreterError_1.FormulaInterpreterError(`The variable ${astTree.fieldName} not defined.`);
                if (typeof fieldValue === "number") {
                    return ExpressionConstructor_1.ExpressionConstructor.fieldReference(astTree.fieldName);
                }
                else {
                    return ExpressionConstructor_1.ExpressionConstructor.fieldReference(astTree.fieldName);
                }
            }
            else if (astTree.isComparison()) {
                const comparisonOperator = astTree.operator;
                const left = this.interpret(astTree.left, data);
                const right = this.interpret(astTree.right, data);
                switch (comparisonOperator) {
                    case constant_1.GreaterThanOperator:
                        return ExpressionConstructor_1.ExpressionConstructor.superior(left, right);
                    case constant_1.LessThanOperator:
                        return ExpressionConstructor_1.ExpressionConstructor.inferior(left, right);
                    case constant_1.EqualOperator:
                        return ExpressionConstructor_1.ExpressionConstructor.equality(left, right);
                    case constant_1.GreaterThanOrEqualOperator:
                        return ExpressionConstructor_1.ExpressionConstructor.or(ExpressionConstructor_1.ExpressionConstructor.superior(left, right), ExpressionConstructor_1.ExpressionConstructor.equality(left, right));
                    case constant_1.LessThanOrEqualOperator:
                        return ExpressionConstructor_1.ExpressionConstructor.or(ExpressionConstructor_1.ExpressionConstructor.inferior(left, right), ExpressionConstructor_1.ExpressionConstructor.equality(left, right));
                    case constant_1.LogicalOrOperator:
                        return ExpressionConstructor_1.ExpressionConstructor.or(left, right);
                    case constant_1.LogicalAndOperator:
                        return ExpressionConstructor_1.ExpressionConstructor.and(left, right);
                    case constant_1.NotEqualOperator:
                        return ExpressionConstructor_1.ExpressionConstructor.different(left, right);
                    default:
                        throw new FormulaInterpreterError_1.FormulaInterpreterError(`This comparison ${comparisonOperator} method is not supported`);
                }
            }
            else if (astTree.isConditional()) {
                const condition = this.interpret(astTree.condition, data);
                const isTrue = this.interpret(astTree.isTrue, data);
                const isFalse = this.interpret(astTree.isFalse, data);
                return ExpressionConstructor_1.ExpressionConstructor.condition(condition, isTrue, isFalse);
            }
            else {
                throw new FormulaInterpreterError_1.FormulaInterpreterError(`This Expression is not Correct. Please verify Your expression [Interpreter]:${astTree}`);
            }
        }
        catch (e) {
            throw e;
        }
    }
}
exports.FormulaInterpreter = FormulaInterpreter;


/***/ }),

/***/ "./parser/AstNode.ts":
/*!***************************!*\
  !*** ./parser/AstNode.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AstNode = void 0;
const constant_1 = __webpack_require__(/*! ../constant */ "./constant.ts");
/**
 * Represents a node in the Abstract Syntax Tree (AST).
 */
class AstNode {
    /**
     * Determines if this node is conditional.
     * @returns {boolean} True if the node is conditional; otherwise, false.
     */
    isConditional() {
        return !!this.condition && !!this.isFalse && !!this.isTrue;
    }
    /**
     * Determines if this node represents a value.
     * @returns {boolean} True if the node is a value; otherwise, false.
     */
    isValue() {
        return this.value != undefined;
    }
    /**
     * Determines if this node is a comparison operator.
     * @returns {boolean} True if the node is a comparison; otherwise, false.
     */
    isComparison() {
        return !!this.isComparisonOperator();
    }
    /**
     * Determines if this node is a field.
     * @returns {boolean} True if the node is a field; otherwise, false.
     */
    isField() {
        return !!this.fieldName;
    }
    /**
     * Determines if this node is a generic node.
     * @returns {boolean} True if the node is a node; otherwise, false.
     */
    isNode() {
        return (!this.isValue() &&
            !this.isField() &&
            !this.isComparison() &&
            !this.isConditional());
    }
    /**
     * Checks if the operator is a comparison operator.
     * @returns {boolean} True if the operator is a comparison operator; otherwise, false.
     */
    isComparisonOperator() {
        if (constant_1.ComparisonOperator.includes(this.operator))
            return true;
        return false;
    }
}
exports.AstNode = AstNode;


/***/ }),

/***/ "./parser/FormulaParser.ts":
/*!*********************************!*\
  !*** ./parser/FormulaParser.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FormulaParser = void 0;
const constant_1 = __webpack_require__(/*! ../constant */ "./constant.ts");
const errors_1 = __webpack_require__(/*! ../errors */ "./errors/index.ts");
const AstNode_1 = __webpack_require__(/*! ./AstNode */ "./parser/AstNode.ts");
/**
 * Parses formulas and generates an Abstract Syntax Tree (AST).
 */
class FormulaParser {
    /**
     * Checks if the provided tokens represent a valid formula.
     * @param tokens - An array of tokens representing the formula.
     * @returns {boolean} True if the tokens form a valid formula; otherwise, false.
     */
    isFormula(tokens) {
        let notOperatorLastIndex = 1;
        let operatorLastIndex = 1;
        const operatorRegex = constant_1.REGEX.formulaOperator;
        for (let index = 0; index < tokens.length; index++) {
            const token = tokens[index];
            const isOperator = operatorRegex.test(String(token));
            const lastIndex = index - 1;
            if (isOperator) {
                operatorLastIndex = index;
            }
            else {
                if (notOperatorLastIndex == lastIndex &&
                    operatorLastIndex != lastIndex) {
                    return false;
                }
                notOperatorLastIndex = index;
            }
        }
        return true;
    }
    /**
     * Checks the syntax of the provided tokens.
     * @param tokens - An array of tokens to check.
     * @throws {IncorrectSyntaxError} Throws an error if the syntax is not correct
     */
    checkSyntax(tokens) {
        this.checkParenthesisSyntax(tokens);
        this.checkOperatorSyntax(tokens);
        this.checkTernaryConditionSyntax(tokens);
    }
    /**
     * Checks the parenthesis syntax of the provided tokens.
     * @param tokens - An array of tokens to check.
     * @throws {IncorrectSyntaxError} Throws an error if there is a parenthesis mismatch.
     */
    checkParenthesisSyntax(tokens) {
        const stack = [];
        tokens.forEach((token) => {
            if (token === constant_1.ParenthesisOpenOperator)
                stack.push(constant_1.ParenthesisOpenOperator);
            if (token === constant_1.ParenthesisCloseOperator) {
                if (stack.length === 0) {
                    throw new errors_1.IncorrectSyntaxError("Parenthesis mismatch", tokens.join(""));
                }
                stack.pop();
            }
        });
        if (stack.length !== 0) {
            throw new errors_1.IncorrectSyntaxError("Incorrect parenthesis disposition.", tokens.join(""));
        }
    }
    /**
     * Checks the operator syntax of the provided tokens.
     * @param tokens - An array of tokens to check.
     * @throws {IncorrectSyntaxError} Throws an error if there is an operator syntax error.
     */
    checkOperatorSyntax(tokens) {
        const regex = /[+-\/*]{2,}/;
        /**
         * @version 1.0.9
         * @note  Fix issus : Introduction de la copy des tokens avant de faire le join pour le cas ou on aura les valeurs négative
         */
        const tokensCopy = tokens.map((token) => typeof token === "string" ? token : Math.abs(token));
        const expression = tokensCopy.join("");
        if (regex.test(expression)) {
            throw new errors_1.IncorrectSyntaxError("Incorrect Operator error", expression);
        }
        // When tokens length is equal to one and the token is an string or number without operator , just return because is just an operand
        if (tokens.length == 1 && (/\w/.test(expression) || /["'][^"']+["']/.test(expression)))
            return;
        const validOperationCheckerRegex = />=|<=|==|!=|&&|\|\||[+-\/*<>%\^][\w\(\u0080-\uFFFF]/;
        if (!validOperationCheckerRegex.test(expression)) {
            throw new errors_1.IncorrectSyntaxError("Incorrect Operator position for Operand", expression);
        }
    }
    /**
     * Checks the ternary condition syntax of the provided tokens.
     * @param tokens - An array of tokens to check.
     * @throws {IncorrectSyntaxError} Throws an error if there is a ternary syntax error.
     */
    checkTernaryConditionSyntax(tokens) {
        let ternaryQuestionMarkCount = 0;
        let ternaryColonCount = 0;
        tokens.forEach((token) => {
            if (token === constant_1.QuestionMarkOperator)
                ternaryQuestionMarkCount++;
            if (token === constant_1.ColonOperator)
                ternaryColonCount++;
        });
        if (ternaryQuestionMarkCount !== ternaryColonCount) {
            throw new errors_1.IncorrectSyntaxError("Incorrect Ternary syntax: unmatched ? and :", tokens.join(""));
        }
        const ternaryRegex = /[?:]/;
        let expectingCondition = true;
        tokens.forEach((token) => {
            if (ternaryRegex.test(String(token))) {
                if (expectingCondition && token === constant_1.ColonOperator) {
                    throw new errors_1.IncorrectSyntaxError("Ternary syntax error: found ':' before '?'", tokens.join(""));
                }
                expectingCondition = !expectingCondition;
            }
        });
    }
    /**
     * Check if the provided tokens is valid formula
     * @param tokens - An array of tokens to verify if is valid formula
     * @returns {boolean} return true when is valid formula and false if not
     */
    isValidFormula(tokens) {
        try {
            if (!this.isFormula(tokens))
                return false;
            this.checkSyntax(tokens);
            return true;
        }
        catch (_a) {
            return false;
        }
    }
    /**
     * Executes the parsing of the provided tokens and generates an AST.
     * @param tokens - An array of tokens to parse.
     * @returns {INode} The root node of the generated AST.
     * @throws {IncorrectSyntaxError | InvalidFormulaError}  Throws an error if the tokens are not a valid formula.
     */
    execute(tokens) {
        if (tokens.length != 0 && this.isFormula(tokens)) {
            this.checkSyntax(tokens);
            return this.parser(tokens);
        }
        else {
            throw new errors_1.InvalidFormulaError("Invalid formula error. Please check is formula. ", tokens.join(""));
        }
    }
    /**
     * Parses the provided tokens and generates an AST.
     * @param tokens - An array of tokens to parse.
     * @returns {INode} The root node of the generated AST.
     */
    parser(tokens) {
        const postFixExpression = this.infixToPostFix(tokens);
        const result = this.generateAST(postFixExpression);
        return result;
    }
    /**
     * Generates an Abstract Syntax Tree (AST) from the given tokens.
     * @param tokens - An array of tokens to generate the AST from.
     * @returns {INode} The root node of the generated AST.
     */
    generateAST(tokens) {
        const stack = [];
        let counter = 0;
        return this._generateAST(tokens, counter, stack);
    }
    /**
     * Recursively generates the AST based on the provided tokens and the current index.
     * @param tokens - An array of tokens to generate the AST from.
     * @param index - The current index in the tokens array.
     * @param stack - The stack of nodes being built for the AST.
     * @returns {INode} The root node of the generated AST.
     */
    _generateAST(tokens, index, stack = []) {
        const token = tokens[index];
        if (token == undefined)
            return stack[0];
        if (this.isOperatorFirstAndParenthesis(token)) {
            const node = new AstNode_1.AstNode();
            node.operator = token;
            if (this.isArithmeticOperator(token)) {
                node.right = stack.pop();
                node.left = stack.pop();
            }
            else if (this.isComparisonOperator(token)) {
                node.right = stack.pop();
                node.left = stack.pop();
            }
            else if (this.isTernaryOperator(token)) {
                node.isFalse = stack.pop();
                node.isTrue = stack.pop();
                node.condition = stack.pop();
            }
            stack.push(node);
        }
        else {
            const node = new AstNode_1.AstNode();
            if (this.isValue(token)) {
                node.value = token;
            }
            else {
                node.fieldName = token;
            }
            stack.push(node);
        }
        return this._generateAST(tokens, index + 1, stack);
    }
    /**
     * Converts infix tokens to postfix notation.
     * @param tokens - An array of tokens in infix notation.
     * @returns {(string | number)[]} An array of tokens in postfix notation.
     */
    infixToPostFix(tokens) {
        const output = [];
        const operators = [];
        tokens.forEach((token) => {
            if (!this.isOperatorFirstAndParenthesis(token)) {
                output.push(token);
            }
            else {
                const operatorAndParenthesis = String(token);
                const priority = this.priority(operatorAndParenthesis);
                if (operatorAndParenthesis === constant_1.ParenthesisOpenOperator) {
                    operators.push(operatorAndParenthesis);
                }
                else if (operatorAndParenthesis === constant_1.ParenthesisCloseOperator) {
                    while (operators.length > 0 &&
                        operators[operators.length - 1] !== constant_1.ParenthesisOpenOperator) {
                        const operator = operators.pop();
                        if (!(operator.trim() === constant_1.ParenthesisOpenOperator)) {
                            output.push(operator);
                        }
                    }
                    operators.pop();
                }
                else if (operatorAndParenthesis === constant_1.ColonOperator) {
                    while (operators.length > 0 &&
                        operators[operators.length - 1] !== constant_1.QuestionMarkOperator) {
                        output.push(operators.pop());
                    }
                }
                else if (constant_1.Operators.includes(operatorAndParenthesis)) {
                    while (operators.length > 0 &&
                        this.priority(operators[operators.length - 1]) >= priority) {
                        output.push(operators.pop());
                    }
                    operators.push(operatorAndParenthesis);
                }
                else {
                }
            }
        });
        while (operators.length > 0) {
            output.push(operators.pop());
        }
        return output;
    }
    /**
     * Determines the priority level of the given operator.
     *
     * Operators are assigned the following priority levels:
     * 1 - Addition and Subtraction
     * 2 - Multiplication and Division
     * 3 - Comparison and Logical operators
     *
     * @param operator - The operator to evaluate.
     * @returns {number} The priority level of the operator, where higher numbers indicate higher priority.
     */
    priority(operator) {
        if (constant_1.Priority_1_Operator.includes(operator))
            return 1;
        if (constant_1.Priority_2_Operator.includes(operator))
            return 2;
        if (constant_1.Priority_3_Operator.includes(operator))
            return 3;
        if (constant_1.Priority_4_Operator.includes(operator))
            return 4;
        return 0;
    }
    /**
     * Checks if the provided token is an operator or parenthesis.
     *
     * This method considers the following tokens as valid operators:
     * Arithmetic operators: +, -, *, /,^,%
     * Comparison operators: >, <, >=, <=, ==, !=
     * Logical operators: ||, &&
     * Ternary operator: ?
     * Parentheses: (, )
     *
     * @param token - The token to evaluate.
     * @returns  {boolean} -True if the token is an operator or parenthesis; otherwise, false.
     */
    isOperatorFirstAndParenthesis(token) {
        if (constant_1.AllOperators.includes(String(token).trim()))
            return true;
        return false;
    }
    /**
     * Checks if the provided token is an arithmetic operator.
     *
     * The valid arithmetic operators are: +, -, *, /,^,%
     *
     * @param token - The token to evaluate.
     * @returns {boolean} -True if the token is an arithmetic operator; otherwise, false.
     */
    isArithmeticOperator(token) {
        if (constant_1.ArithmeticOperator.includes(token))
            return true;
        return false;
    }
    /**
     * Checks if the provided token is a comparison operator.
     *
     * The valid comparison operators are: >, <, >=, <=, ==, !=, ||, &&
     *
     * @param token - The token to evaluate.
     * @returns {boolean} -  True if the token is a comparison operator; otherwise, false.
     */
    isComparisonOperator(token) {
        if (constant_1.ComparisonOperator.includes(token))
            return true;
        return false;
    }
    /**
     * Checks if the provided token is a ternary operator.
     *
     * The valid ternary operator is: ?
     *
     * @param token - The token to evaluate.
     * @returns {boolean} - True if the token is a ternary operator; otherwise, false.
     */
    isTernaryOperator(token) {
        return constant_1.QuestionMarkOperator === token;
    }
    /**
     * Checks if the provided token is a valid value.
     *
     * A valid value can be a number or a string matching the regex pattern for quoted words.
     *
     * @param token - The token to evaluate.
     * @returns {boolean} - True if the token is a valid value; otherwise, false.
     */
    isValue(token) {
        const valueRegex = /["'][^"']+["']/;
        return typeof token === "number" || valueRegex.test(token) ? true : false;
    }
}
exports.FormulaParser = FormulaParser;


/***/ }),

/***/ "./tokenizer/FormulaTokenizer.ts":
/*!***************************************!*\
  !*** ./tokenizer/FormulaTokenizer.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FormulaTokenizer = void 0;
const constant_1 = __webpack_require__(/*! ../constant */ "./constant.ts");
/**
 * The FormulaTokenizer class is responsible for tokenizing and formatting
 * mathematical expressions for further evaluation. It handles the input
 * string by formatting it, filtering tokens, and preparing them for processing.
 */
class FormulaTokenizer {
    /**
     * Formats the input string by replacing operators and trimming whitespace.
     * @param {string} input The input string to be formatted.
     * @returns {string} The formatted expression.
     */
    formatInput(input) {
        return input
            .replace(constant_1.REGEX.formulaOperatorG, " $1 ")
            .replace(/\s+/g, " ")
            .trim();
    }
    /**
     * Filters the tokens to handle numbers and operators appropriately.
     * This method processes the tokens to ensure that numbers and operators
     * are in the correct format for evaluation.
     * @param {string[]} tokens The array of tokens to be filtered.
     * @returns {(string | number)[]} The filtered tokens as an array of strings and numbers.
     */
    filterTokens(tokens) {
        const filteredTokens = [];
        let expectedClosedParenthesis = false;
        tokens.forEach((token) => {
            const regex = /^\d+(\.\d+)?$/;
            const negativeNumberRegex = /-\d+/;
            const lastFilteredToken = filteredTokens[filteredTokens.length - 1];
            if (regex.test(token)) {
                const firstPop = filteredTokens.pop();
                const secondPop = filteredTokens.pop();
                if (firstPop !== undefined) {
                    const isSign = constant_1.Priority_1_Operator.includes(firstPop);
                    const isPrecededByOperator = secondPop !== undefined &&
                        typeof secondPop === "string" &&
                        constant_1.Operators.includes(secondPop);
                    const isPrecededByParen = secondPop === constant_1.ParenthesisOpenOperator;
                    const isAtStart = secondPop === undefined;
                    if (isSign && isPrecededByParen) {
                        // Special case for `(-2)`
                        filteredTokens.push(Number(firstPop + token));
                        expectedClosedParenthesis = true;
                    }
                    else if (isSign && (isPrecededByOperator || isAtStart)) {
                        // It's a signed number
                        if (secondPop !== undefined) {
                            filteredTokens.push(secondPop);
                        }
                        filteredTokens.push(Number(firstPop + token));
                    }
                    else {
                        // Not a signed number, push everything back
                        if (secondPop !== undefined) {
                            filteredTokens.push(secondPop);
                        }
                        filteredTokens.push(firstPop, Number(token));
                    }
                }
                else {
                    // No token before, just a number
                    filteredTokens.push(Number(token));
                }
            }
            else if (negativeNumberRegex.test(lastFilteredToken) &&
                token === constant_1.ParenthesisCloseOperator &&
                expectedClosedParenthesis) {
                expectedClosedParenthesis = false;
            }
            else {
                filteredTokens.push(token);
            }
        });
        return filteredTokens;
    }
    /**
     * Executes the tokenization process for the given input string.
     * This method formats the input, splits it into tokens,
     * and filters the tokens to produce a final result.
     * @param {string} input The input string to be tokenized.
     * @returns {any[]} The array of filtered tokens resulting from the tokenization process.
     */
    execute(input) {
        const formattedInput = this.formatInput(input);
        if (formattedInput.trim() === "")
            return [];
        const tokens = formattedInput.split(" ");
        const filteredTokens = this.filterTokens(tokens);
        return filteredTokens;
    }
}
exports.FormulaTokenizer = FormulaTokenizer;


/***/ }),

/***/ "./types/index.ts":
/*!************************!*\
  !*** ./types/index.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const constant_1 = __webpack_require__(/*! ../constant */ "./constant.ts");
/**
 * Array of all supported operators in expressions.
 */
const OperatorValue = [
    ...constant_1.ArithmeticOperator,
    ...constant_1.ComparisonOperator,
    constant_1.LogicalAndOperator,
    constant_1.LogicalOrOperator,
    constant_1.QuestionMarkOperator
];


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./index.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.js.map