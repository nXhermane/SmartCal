(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ruleinterpreter"] = factory();
	else
		root["ruleinterpreter"] = factory();
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
exports.REGEX = void 0;
exports.REGEX = {
    formularOperatorG: /(<=|>=|==|\|\||&&|!=|[+/\-*=()<>?:])/g,
    formularOperator: /(<=|>=|==|\|\||&&|!=|[+/\-*=()<>?!:])/,
    formularFieldName: /f_[\w]/,
};


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
    static substration(left, right) {
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
const FormularParser_1 = __webpack_require__(/*! ../parser/FormularParser */ "./parser/FormularParser.ts");
const FormularTokeniser_1 = __webpack_require__(/*! ../tokeniser/FormularTokeniser */ "./tokeniser/FormularTokeniser.ts");
const FormularInterpreter_1 = __webpack_require__(/*! ../interpreter/FormularInterpreter */ "./interpreter/FormularInterpreter.ts");
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
                if (this.isFormularRef())
                    return this.executeFormularRef(obj);
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
    isFormularRef() {
        return constant_1.REGEX.formularFieldName.test(this.fieldName);
    }
    /**
     * Executes the formula reference and returns the result of the interpretation.
     *
     * @param {T} obj - The object from which to extract the formula.
     * @returns {R} The result of executing the formula.
     */
    executeFormularRef(obj) {
        const fTokeniser = new FormularTokeniser_1.FormularTokeniser();
        const fParser = new FormularParser_1.FormularParser();
        const fInterpreter = new FormularInterpreter_1.FormularInterpreter();
        const astTree = fParser.execute(fTokeniser.execute(obj[this.fieldName]));
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = SmartCalc;
const FormularParser_1 = __webpack_require__(/*! ./parser/FormularParser */ "./parser/FormularParser.ts");
const FormularTokeniser_1 = __webpack_require__(/*! ./tokeniser/FormularTokeniser */ "./tokeniser/FormularTokeniser.ts");
const FormularInterpreter_1 = __webpack_require__(/*! ./interpreter/FormularInterpreter */ "./interpreter/FormularInterpreter.ts");
function SmartCalc(expression, obj) {
    const fTokeniser = new FormularTokeniser_1.FormularTokeniser();
    const fParser = new FormularParser_1.FormularParser();
    const fInterpreter = new FormularInterpreter_1.FormularInterpreter();
    return fInterpreter.execute(fParser.execute(fTokeniser.execute(expression)), obj);
}


/***/ }),

/***/ "./interpreter/FormularInterpreter.ts":
/*!********************************************!*\
  !*** ./interpreter/FormularInterpreter.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FormularInterpreter = void 0;
const ExpressionConstructor_1 = __webpack_require__(/*! ./../expression/ExpressionConstructor */ "./expression/ExpressionConstructor.ts");
/**
 * The FormularInterpreter class is responsible for interpreting an abstract syntax tree (AST)
 * representing a mathematical or logical expression. It evaluates expressions based on provided
 * variable data and constructs appropriate expression objects for processing.
 */
class FormularInterpreter {
    /**
     * Executes the interpretation of the AST tree and returns the evaluated result.
     * @param {Node} astTree The abstract syntax tree to be interpreted.
     * @param {T} data The variable data to use for evaluation.
     * @returns {number | string} The result of the expression evaluation.
     */
    execute(astTree, data) {
        const result = this.interprete(astTree, data).execute(data);
        return result;
    }
    /**
     * Interprets the AST tree recursively and constructs expression objects based on the node types.
     * @param {Node} astTree The abstract syntax tree to interpret.
     * @param {T} data The variable data to use for evaluation.
     * @returns {Expression<T, string | number>} The constructed expression object.
     */
    interprete(astTree, data) {
        if (astTree.isNode()) {
            const operator = astTree.operator;
            const right = this.interprete(astTree.right, data);
            const left = this.interprete(astTree.left, data);
            switch (operator) {
                case "+":
                    return ExpressionConstructor_1.ExpressionConstructor.addition(left, right);
                case "-":
                    return ExpressionConstructor_1.ExpressionConstructor.substration(left, right);
                case "*":
                    return ExpressionConstructor_1.ExpressionConstructor.multiplication(left, right);
                case "/":
                    return ExpressionConstructor_1.ExpressionConstructor.division(left, right);
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
        else if (astTree.isComparaison()) {
            const comparaisonOperator = astTree.operator;
            const left = this.interprete(astTree.left, data);
            const right = this.interprete(astTree.right, data);
            switch (comparaisonOperator) {
                case ">":
                    return ExpressionConstructor_1.ExpressionConstructor.superior(left, right);
                case "<":
                    return ExpressionConstructor_1.ExpressionConstructor.inferior(left, right);
                case "==":
                    return ExpressionConstructor_1.ExpressionConstructor.equality(left, right);
                case ">=":
                    return ExpressionConstructor_1.ExpressionConstructor.or(ExpressionConstructor_1.ExpressionConstructor.superior(left, right), ExpressionConstructor_1.ExpressionConstructor.equality(left, right));
                case "<=":
                    return ExpressionConstructor_1.ExpressionConstructor.or(ExpressionConstructor_1.ExpressionConstructor.inferior(left, right), ExpressionConstructor_1.ExpressionConstructor.equality(left, right));
                case "||":
                    return ExpressionConstructor_1.ExpressionConstructor.or(left, right);
                case "&&":
                    return ExpressionConstructor_1.ExpressionConstructor.and(left, right);
                case "!=":
                    return ExpressionConstructor_1.ExpressionConstructor.different(left, right);
                default:
                    throw new Error(`This comparaison ${comparaisonOperator} method is not supported`);
            }
        }
        else if (astTree.isConditional()) {
            const condition = this.interprete(astTree.condition, data);
            const isTrue = this.interprete(astTree.isTrue, data);
            const isFalse = this.interprete(astTree.isFalse, data);
            return ExpressionConstructor_1.ExpressionConstructor.condition(condition, isTrue, isFalse);
        }
        else {
            throw new Error(`This Expression is not Correct. Please verify Your expression [Interpreter]:${astTree}`);
        }
    }
}
exports.FormularInterpreter = FormularInterpreter;


/***/ }),

/***/ "./main.ts":
/*!*****************!*\
  !*** ./main.ts ***!
  \*****************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FormularTokeniser = exports.AstNode = exports.FormularParser = exports.FormularInterpreter = exports.LiteralValue = exports.FieldReference = exports.ExpressionConstructor = exports.Expression = exports.ConditionalExpression = exports.BinaryOperation = void 0;
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
const FormularInterpreter_1 = __webpack_require__(/*! ./interpreter/FormularInterpreter */ "./interpreter/FormularInterpreter.ts");
Object.defineProperty(exports, "FormularInterpreter", ({ enumerable: true, get: function () { return FormularInterpreter_1.FormularInterpreter; } }));
const FormularParser_1 = __webpack_require__(/*! ./parser/FormularParser */ "./parser/FormularParser.ts");
Object.defineProperty(exports, "FormularParser", ({ enumerable: true, get: function () { return FormularParser_1.FormularParser; } }));
Object.defineProperty(exports, "AstNode", ({ enumerable: true, get: function () { return FormularParser_1.AstNode; } }));
const FormularTokeniser_1 = __webpack_require__(/*! ./tokeniser/FormularTokeniser */ "./tokeniser/FormularTokeniser.ts");
Object.defineProperty(exports, "FormularTokeniser", ({ enumerable: true, get: function () { return FormularTokeniser_1.FormularTokeniser; } }));
const index_1 = __importDefault(__webpack_require__(/*! ./index */ "./index.ts"));
exports["default"] = index_1.default;


/***/ }),

/***/ "./parser/FormularParser.ts":
/*!**********************************!*\
  !*** ./parser/FormularParser.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FormularParser = exports.AstNode = void 0;
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
        return !!this.value;
    }
    /**
     * Determines if this node is a comparison operator.
     * @returns {boolean} True if the node is a comparison; otherwise, false.
     */
    isComparaison() {
        return !!this.isComparaisonOperator();
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
        return !this.isValue() && !this.isField() && !this.isComparaison() && !this.isConditional();
    }
    /**
     * Checks if the operator is a comparison operator.
     * @returns {boolean} True if the operator is a comparison operator; otherwise, false.
     */
    isComparaisonOperator() {
        if ([">", "||", "<", "&&", ">=", "<=", "==", "!="].includes(this.operator))
            return true;
        return false;
    }
}
exports.AstNode = AstNode;
/**
 * Parses formulas and generates an Abstract Syntax Tree (AST).
 */
class FormularParser {
    /**
     * Checks if the provided tokens represent a valid formula.
     * @param tokens - An array of tokens representing the formula.
     * @returns {boolean} True if the tokens form a valid formula; otherwise, false.
     */
    isFormular(tokens) {
        let notOperatorLastIndex = 1;
        let operatorLastIndex = 1;
        const operatorRegex = constant_1.REGEX.formularOperator;
        for (let index = 0; index < tokens.length; index++) {
            const token = tokens[index];
            const isOperator = operatorRegex.test(String(token));
            const lastIndex = index - 1;
            if (isOperator) {
                operatorLastIndex = index;
            }
            else {
                if (notOperatorLastIndex == lastIndex && operatorLastIndex != lastIndex) {
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
    checkSynthax(tokens) {
        this.checkParenthesixSynthax(tokens);
        this.checkOperatorSynthax(tokens);
        this.checkTernaryConditionSynthax(tokens);
    }
    /**
     * Checks the parenthesis syntax of the provided tokens.
     * @param tokens - An array of tokens to check.
     * @throws {Error} Throws an error if there is a parenthesis mismatch.
     */
    checkParenthesixSynthax(tokens) {
        const stack = [];
        tokens.forEach((token) => {
            if (token === "(")
                stack.push("(");
            if (token === ")") {
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
    checkOperatorSynthax(tokens) {
        const regex = /[+-\/*]{2,}/;
        const expression = tokens.join("");
        if (regex.test(expression)) {
            throw new Error("Incorrect Operator error");
        }
        const validOperationCheckerRegex = />=|<=|==|!=|&&|\|\||[+-\/*<>][\w\(]/;
        if (!validOperationCheckerRegex.test(expression)) {
            throw new Error("Incorrect Operator position for Operande");
        }
    }
    /**
     * Checks the ternary condition syntax of the provided tokens.
     * @param tokens - An array of tokens to check.
     * @throws {Error} Throws an error if there is a ternary syntax error.
     */
    checkTernaryConditionSynthax(tokens) {
        let ternaryQuestionMarkCount = 0;
        let ternaryColonCount = 0;
        tokens.forEach((token) => {
            if (token === "?")
                ternaryQuestionMarkCount++;
            if (token === ":")
                ternaryColonCount++;
        });
        if (ternaryQuestionMarkCount !== ternaryColonCount) {
            throw new Error("Incorrect Ternary syntax: unmatched ? and :");
        }
        const ternaryRegex = /[?:]/;
        let expectingCondition = true;
        tokens.forEach((token) => {
            if (ternaryRegex.test(String(token))) {
                if (expectingCondition && token === ":") {
                    throw new Error("Ternary syntax error: found ':' before '?'");
                }
                expectingCondition = !expectingCondition;
            }
        });
    }
    /**
     * Executes the parsing of the provided tokens and generates an AST.
     * @param tokens - An array of tokens to parse.
     * @returns {Node} The root node of the generated AST.
     * @throws {Error} Throws an error if the tokens are not a valid formula.
     */
    execute(tokens) {
        if (this.isFormular(tokens)) {
            this.checkSynthax(tokens);
            return this.parser(tokens);
        }
        else {
            throw new Error("is not formular");
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
        if (!token)
            return stack[0];
        if (this.isOperatorFirstAndParenthesix(token)) {
            const node = new AstNode();
            node.operator = token;
            if (this.isArithmeticOperator(token)) {
                node.right = stack.pop();
                node.left = stack.pop();
            }
            else if (this.isComparaisonOperator(token)) {
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
            if (!this.isOperatorFirstAndParenthesix(token)) {
                output.push(token);
            }
            else {
                const operatorAndParentesix = String(token);
                const priority = this.priority(operatorAndParentesix);
                if (operatorAndParentesix === "(") {
                    operators.push(operatorAndParentesix);
                }
                else if (operatorAndParentesix === ")") {
                    while (operators.length > 0 && operators[operators.length - 1] !== "(") {
                        const operator = operators.pop();
                        if (!(operator.trim() === "(")) {
                            output.push(operator);
                        }
                    }
                    operators.pop();
                }
                else if (operatorAndParentesix === ":") {
                    while (operators.length > 0 && operators[operators.length - 1] !== "?") {
                        output.push(operators.pop());
                    }
                }
                else if (["+", "-", "/", "*", ">", "||", "<", "&&", ">=", "<=", "==", "!=", "?"].includes(operatorAndParentesix)) {
                    while (operators.length > 0 && this.priority(operators[operators.length - 1]) >= priority) {
                        output.push(operators.pop());
                    }
                    operators.push(operatorAndParentesix);
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
        if (["+", "-"].includes(operator))
            return 1;
        if (["/", "*"].includes(operator))
            return 2;
        if ([">", "||", "<", "&&", ">=", "<=", "==", "!=", "?"].includes(operator))
            return 3;
        return 0;
    }
    /**
     * Checks if the provided token is an operator or parenthesis.
     *
     * This method considers the following tokens as valid operators:
     * Arithmetic operators: +, -, *, /
     * Comparison operators: >, <, >=, <=, ==, !=
     * Logical operators: ||, &&
     * Ternary operator: ?
     * Parentheses: (, )
     *
     * @param token - The token to evaluate.
     * @returns  {boolean} -True if the token is an operator or parenthesis; otherwise, false.
     */
    isOperatorFirstAndParenthesix(token) {
        if (["+", "-", "/", "*", ">", "||", "<", "&&", ">=", "<=", "==", "!=", "?", ":", "(", ")"].includes(String(token).trim()))
            return true;
        return false;
    }
    /**
     * Checks if the provided token is an arithmetic operator.
     *
     * The valid arithmetic operators are: +, -, *, /
     *
     * @param token - The token to evaluate.
     * @returns {boolean} -True if the token is an arithmetic operator; otherwise, false.
     */
    isArithmeticOperator(token) {
        if (["+", "-", "/", "*"].includes(token))
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
    isComparaisonOperator(token) {
        if ([">", "||", "<", "&&", ">=", "<=", "==", "!="].includes(token))
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
        if (["?"].includes(token))
            return true;
        return false;
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
exports.FormularParser = FormularParser;


/***/ }),

/***/ "./tokeniser/FormularTokeniser.ts":
/*!****************************************!*\
  !*** ./tokeniser/FormularTokeniser.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FormularTokeniser = void 0;
const constant_1 = __webpack_require__(/*! ../constant */ "./constant.ts");
/**
 * The FormularTokeniser class is responsible for tokenizing and formatting
 * mathematical expressions for further evaluation. It handles the input
 * string by formatting it, filtering tokens, and preparing them for processing.
 */
class FormularTokeniser {
    /**
     * Formats the input string by replacing operators and trimming whitespace.
     * @param {string} input The input string to be formatted.
     * @returns {string} The formatted expression.
     */
    formatInput(input) {
        const formatedExpression = input
            .replace(constant_1.REGEX.formularOperatorG, " $1 ")
            .replace(/\s+/g, " ")
            .trim();
        return formatedExpression;
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
        let expectedClosedParenthesix = false;
        tokens.forEach((token) => {
            const regex = /^\d+(\.\d+)?$/;
            const negativeNumberRegex = /-\d+/;
            const lastFilteredToken = filteredTokens[filteredTokens.length - 1];
            if (regex.test(token)) {
                const firstPop = filteredTokens.pop();
                const secondPop = filteredTokens.pop();
                if (firstPop && secondPop) {
                    if (["+", "-"].includes(firstPop) && secondPop === "(") {
                        filteredTokens.push(Number(firstPop + token));
                        expectedClosedParenthesix = true;
                    }
                    else {
                        filteredTokens.push(secondPop, firstPop, Number(token));
                    }
                }
                else {
                    if (!secondPop) {
                        if (firstPop) {
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
                token === ")" &&
                expectedClosedParenthesix) {
                expectedClosedParenthesix = false;
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
        const formatedInput = this.formatInput(input);
        const tokens = formatedInput.split(" ");
        const filteredTokens = this.filterTokens(tokens);
        return filteredTokens;
    }
}
exports.FormularTokeniser = FormularTokeniser;


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
/******/ 	var __webpack_exports__ = __webpack_require__("./main.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.js.map