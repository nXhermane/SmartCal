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

/***/ "./constant.ts":
/*!*********************!*\
  !*** ./constant.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Priority_4_Operator = exports.Priority_3_Operator = exports.Priority_2_Operator = exports.Priority_1_Operator = exports.AllOperators = exports.Operators = exports.ArithmeticOperator = exports.ComparisonOperator = exports.BackslashOperator = exports.QuestionMarkOperator = exports.ColonOperator = exports.ParenthesisCloseOperator = exports.ParenthesisOpenOperator = exports.AssignmentOperator = exports.NotEqualOperator = exports.EqualOperator = exports.LessThanOrEqualOperator = exports.GreaterThanOrEqualOperator = exports.LessThanOperator = exports.GreaterThanOperator = exports.LogicalOrOperator = exports.LogicalAndOperator = exports.ModuloOperator = exports.ExponentialOperator = exports.MultiplicationOperator = exports.DivisionOperator = exports.SubtractionOperator = exports.AdditionOperator = exports.ConditionResult = exports.REGEX = void 0;
exports.REGEX = {
    formulaOperatorG: /(<=|\^|%|>=|==|\|\||&&|!=|[+/\-*=()<>?:])/g,
    formulaOperator: /(<=|>=|\^|%|==|\|\||&&|!=|[+/\-*=()<>?!:])/,
    formulaFieldName: /f_[\w]/, // that is regex that identify the formula fieldName
};
exports.ConditionResult = {
    True: 1,
    False: 0,
};
// Arithmetics operators
exports.AdditionOperator = "+";
exports.SubtractionOperator = "-";
exports.DivisionOperator = "/";
exports.MultiplicationOperator = "*";
exports.ExponentialOperator = "^";
exports.ModuloOperator = "%";
// Logics operators
exports.LogicalAndOperator = "&&";
exports.LogicalOrOperator = "||";
// Comparisons operators
exports.GreaterThanOperator = ">";
exports.LessThanOperator = "<";
exports.GreaterThanOrEqualOperator = ">=";
exports.LessThanOrEqualOperator = "<=";
exports.EqualOperator = "==";
exports.NotEqualOperator = "!=";
// Others operators
exports.AssignmentOperator = "=";
exports.ParenthesisOpenOperator = "(";
exports.ParenthesisCloseOperator = ")";
exports.ColonOperator = ":";
exports.QuestionMarkOperator = "?";
exports.BackslashOperator = "\\";
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
exports.ArithmeticOperator = [
    exports.AdditionOperator,
    exports.SubtractionOperator,
    exports.DivisionOperator,
    exports.MultiplicationOperator,
    exports.ExponentialOperator,
    exports.ModuloOperator,
];
exports.Operators = [
    ...exports.ArithmeticOperator,
    ...exports.ComparisonOperator,
    exports.QuestionMarkOperator,
];
exports.AllOperators = [
    ...exports.Operators,
    exports.ColonOperator,
    exports.ParenthesisCloseOperator,
    exports.ParenthesisOpenOperator,
];
exports.Priority_1_Operator = [exports.AdditionOperator, exports.SubtractionOperator];
exports.Priority_2_Operator = [
    exports.DivisionOperator,
    exports.MultiplicationOperator,
    exports.ModuloOperator,
];
exports.Priority_3_Operator = [exports.ExponentialOperator];
exports.Priority_4_Operator = [
    ...exports.ComparisonOperator,
    exports.QuestionMarkOperator,
];


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
                if (this.isFormulaRef())
                    return this.executeFormulaRef(obj);
                return obj[this.fieldName];
            }
        }
        throw new Error(`The fieldName ${this.fieldName} does not exist or is undefined on object ${obj}`);
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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConditionResult = exports.isValidExpression = exports.FormulaTokenizer = exports.AstNode = exports.FormulaParser = exports.FormulaInterpreter = exports.LiteralValue = exports.FieldReference = exports.ExpressionConstructor = exports.Expression = exports.ConditionalExpression = exports.BinaryOperation = void 0;
const BinaryOperation_1 = __webpack_require__(/*! ./expression/BinaryOperation */ "./expression/BinaryOperation.ts");
Object.defineProperty(exports, "BinaryOperation", ({ enumerable: true, get: function () { return BinaryOperation_1.BinaryOperation; } }));
const ConditionalExpression_1 = __webpack_require__(/*! ./expression/ConditionalExpression */ "./expression/ConditionalExpression.ts");
Object.defineProperty(exports, "ConditionalExpression", ({ enumerable: true, get: function () { return ConditionalExpression_1.ConditionalExpression; } }));
const Expression_1 = __webpack_require__(/*! ./expression/Expression */ "./expression/Expression.ts");
Object.defineProperty(exports, "Expression", ({ enumerable: true, get: function () { return Expression_1.Expression; } }));
const ExpressionConstructor_1 = __webpack_require__(/*! ./expression/ExpressionConstructor */ "./expression/ExpressionConstructor.ts");
Object.defineProperty(exports, "ExpressionConstructor", ({ enumerable: true, get: function () { return ExpressionConstructor_1.ExpressionConstructor; } }));
const FieldReference_1 = __webpack_require__(/*! ./expression/FieldReference */ "./expression/FieldReference.ts");
Object.defineProperty(exports, "FieldReference", ({ enumerable: true, get: function () { return FieldReference_1.FieldReference; } }));
const LiteralValue_1 = __webpack_require__(/*! ./expression/LiteralValue */ "./expression/LiteralValue.ts");
Object.defineProperty(exports, "LiteralValue", ({ enumerable: true, get: function () { return LiteralValue_1.LiteralValue; } }));
const FormulaInterpreter_1 = __webpack_require__(/*! ./interpreter/FormulaInterpreter */ "./interpreter/FormulaInterpreter.ts");
Object.defineProperty(exports, "FormulaInterpreter", ({ enumerable: true, get: function () { return FormulaInterpreter_1.FormulaInterpreter; } }));
const FormulaParser_1 = __webpack_require__(/*! ./parser/FormulaParser */ "./parser/FormulaParser.ts");
Object.defineProperty(exports, "FormulaParser", ({ enumerable: true, get: function () { return FormulaParser_1.FormulaParser; } }));
Object.defineProperty(exports, "AstNode", ({ enumerable: true, get: function () { return FormulaParser_1.AstNode; } }));
const FormulaTokenizer_1 = __webpack_require__(/*! ./tokenizer/FormulaTokenizer */ "./tokenizer/FormulaTokenizer.ts");
Object.defineProperty(exports, "FormulaTokenizer", ({ enumerable: true, get: function () { return FormulaTokenizer_1.FormulaTokenizer; } }));
const main_1 = __importStar(__webpack_require__(/*! ./main */ "./main.ts"));
Object.defineProperty(exports, "isValidExpression", ({ enumerable: true, get: function () { return main_1.isValidExpression; } }));
const constant_1 = __webpack_require__(/*! ./constant */ "./constant.ts");
Object.defineProperty(exports, "ConditionResult", ({ enumerable: true, get: function () { return constant_1.ConditionResult; } }));
exports["default"] = main_1.default;


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
/**
 * The FormulaInterpreter class is responsible for interpreting an abstract syntax tree (AST)
 * representing a mathematical or logical expression. It evaluates expressions based on provided
 * variable data and constructs appropriate expression objects for processing.
 */
class FormulaInterpreter {
    /**
     * Executes the interpretation of the AST tree and returns the evaluated result.
     * @param {Node} astTree The abstract syntax tree to be interpreted.
     * @param {T} data The variable data to use for evaluation.
     * @returns {number | string} The result of the expression evaluation.
     */
    execute(astTree, data) {
        const result = this.interpret(astTree, data).execute(data);
        return result;
    }
    /**
     * Interprets the AST tree recursively and constructs expression objects based on the node types.
     * @param {Node} astTree The abstract syntax tree to interpret.
     * @param {T} data The variable data to use for evaluation.
     * @returns {Expression<T, string | number>} The constructed expression object.
     */
    interpret(astTree, data) {
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
                const regex = /"([\w]+)"/;
                const stringValue = value.match(regex)[1];
                return ExpressionConstructor_1.ExpressionConstructor.literalValue(stringValue);
            }
        }
        else if (astTree.isField()) {
            const fieldValue = data[String(astTree.fieldName)];
            if (fieldValue === undefined)
                throw new Error(`The variable ${astTree.fieldName} not defined.`);
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
                    throw new Error(`This comparison ${comparisonOperator} method is not supported`);
            }
        }
        else if (astTree.isConditional()) {
            const condition = this.interpret(astTree.condition, data);
            const isTrue = this.interpret(astTree.isTrue, data);
            const isFalse = this.interpret(astTree.isFalse, data);
            return ExpressionConstructor_1.ExpressionConstructor.condition(condition, isTrue, isFalse);
        }
        else {
            throw new Error(`This Expression is not Correct. Please verify Your expression [Interpreter]:${astTree}`);
        }
    }
}
exports.FormulaInterpreter = FormulaInterpreter;


/***/ }),

/***/ "./main.ts":
/*!*****************!*\
  !*** ./main.ts ***!
  \*****************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = SmartCal;
exports.isValidExpression = isValidExpression;
const FormulaParser_1 = __webpack_require__(/*! ./parser/FormulaParser */ "./parser/FormulaParser.ts");
const FormulaTokenizer_1 = __webpack_require__(/*! ./tokenizer/FormulaTokenizer */ "./tokenizer/FormulaTokenizer.ts");
const FormulaInterpreter_1 = __webpack_require__(/*! ./interpreter/FormulaInterpreter */ "./interpreter/FormulaInterpreter.ts");
/**
 * Evaluates a mathematical expression and returns the result.
 *
 * This function parses and interprets a mathematical formula represented as a string,
 * applying dynamic values from a given object to resolve variables or conditions within the expression.
 *
 * @template T - A generic type representing the structure of the input object. Keys are variable names, and values can be numbers, strings, or arrays.
 * @param {string} expression - The mathematical expression to be evaluated.
 *        Variables in the expression should correspond to keys in the `obj` parameter.
 * @param {T} obj - An object containing the values of the variables referenced in the expression.
 * @returns {number | string | any[]} - The result of the evaluated expression, which can be a number, a string, or an array depending on the expression's logic.
 */
function SmartCal(expression, obj) {
    const fTokenizer = new FormulaTokenizer_1.FormulaTokenizer();
    const fParser = new FormulaParser_1.FormulaParser();
    const fInterpreter = new FormulaInterpreter_1.FormulaInterpreter();
    return fInterpreter.execute(fParser.execute(fTokenizer.execute(expression)), obj);
}
/**
 * Verify if the given expression is valid formula
 * @param expression expression to evaluate
 * @returns {boolean} true if the expression is valid
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

/***/ "./parser/FormulaParser.ts":
/*!*********************************!*\
  !*** ./parser/FormulaParser.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FormulaParser = exports.AstNode = void 0;
const constant_1 = __webpack_require__(/*! ../constant */ "./constant.ts");
const OperatorValue = [...constant_1.ArithmeticOperator, ...constant_1.ComparisonOperator];
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
     */
    checkSyntax(tokens) {
        this.checkParenthesisSyntax(tokens);
        this.checkOperatorSyntax(tokens);
        this.checkTernaryConditionSyntax(tokens);
    }
    /**
     * Checks the parenthesis syntax of the provided tokens.
     * @param tokens - An array of tokens to check.
     * @throws {Error} Throws an error if there is a parenthesis mismatch.
     */
    checkParenthesisSyntax(tokens) {
        const stack = [];
        tokens.forEach((token) => {
            if (token === constant_1.ParenthesisOpenOperator)
                stack.push(constant_1.ParenthesisOpenOperator);
            if (token === constant_1.ParenthesisCloseOperator) {
                if (stack.length === 0) {
                    throw new Error("Parenthesis mismatch");
                }
                stack.pop();
            }
        });
        if (stack.length !== 0) {
            throw new Error("Incorrect parenthesis disposition.");
        }
    }
    /**
     * Checks the operator syntax of the provided tokens.
     * @param tokens - An array of tokens to check.
     * @throws {Error} Throws an error if there is an operator syntax error.
     */
    checkOperatorSyntax(tokens) {
        const regex = /[+-\/*]{2,}/;
        const expression = tokens.join("");
        if (regex.test(expression)) {
            throw new Error("Incorrect Operator error");
        }
        const validOperationCheckerRegex = />=|<=|==|!=|&&|\|\||[+-\/*<>%\^][\w\(]/;
        if (!validOperationCheckerRegex.test(expression)) {
            throw new Error("Incorrect Operator position for Operand");
        }
    }
    /**
     * Checks the ternary condition syntax of the provided tokens.
     * @param tokens - An array of tokens to check.
     * @throws {Error} Throws an error if there is a ternary syntax error.
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
            throw new Error("Incorrect Ternary syntax: unmatched ? and :");
        }
        const ternaryRegex = /[?:]/;
        let expectingCondition = true;
        tokens.forEach((token) => {
            if (ternaryRegex.test(String(token))) {
                if (expectingCondition && token === constant_1.ColonOperator) {
                    throw new Error("Ternary syntax error: found ':' before '?'");
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
     * @returns {Node} The root node of the generated AST.
     * @throws {Error} Throws an error if the tokens are not a valid formula.
     */
    execute(tokens) {
        if (this.isFormula(tokens)) {
            this.checkSyntax(tokens);
            return this.parser(tokens);
        }
        else {
            throw new Error("[Error]: Not formula");
        }
    }
    /**
     * Parses the provided tokens and generates an AST.
     * @param tokens - An array of tokens to parse.
     * @returns {AstNode} The root node of the generated AST.
     */
    parser(tokens) {
        const postFixExpression = this.infixToPostFix(tokens);
        const result = this.generateAST(postFixExpression);
        return result;
    }
    /**
     * Generates an Abstract Syntax Tree (AST) from the given tokens.
     * @param tokens - An array of tokens to generate the AST from.
     * @returns {AstNode} The root node of the generated AST.
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
     * @returns {AstNode} The root node of the generated AST.
     */
    _generateAST(tokens, index, stack = []) {
        const token = tokens[index];
        if (token == undefined)
            return stack[0];
        if (this.isOperatorFirstAndParenthesis(token)) {
            const node = new AstNode();
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
            const node = new AstNode();
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
        const valueRegex = /"[\w]+"/;
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
                if (firstPop != undefined && secondPop != undefined) {
                    if (constant_1.Priority_1_Operator.includes(firstPop) &&
                        secondPop === constant_1.ParenthesisOpenOperator) {
                        filteredTokens.push(Number(firstPop + token));
                        expectedClosedParenthesis = true;
                    }
                    else {
                        filteredTokens.push(secondPop, firstPop, Number(token));
                    }
                }
                else {
                    if (secondPop == undefined) {
                        if (firstPop != undefined) {
                            filteredTokens.push(firstPop, Number(token));
                        }
                        else {
                            filteredTokens.push(Number(token));
                        }
                    }
                    else {
                        filteredTokens.push(Number(token));
                    }
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
        const tokens = formattedInput.split(" ");
        const filteredTokens = this.filterTokens(tokens);
        return filteredTokens;
    }
}
exports.FormulaTokenizer = FormulaTokenizer;


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