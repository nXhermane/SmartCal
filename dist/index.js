!function(r,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.smartcal=e():r.smartcal=e()}(this,(()=>(()=>{"use strict";var r={641:(r,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Priority_4_Operator=e.Priority_3_Operator=e.Priority_2_Operator=e.Priority_1_Operator=e.AllOperators=e.Operators=e.ArithmeticOperator=e.ComparisonOperator=e.BackslashOperator=e.QuestionMarkOperator=e.ColonOperator=e.ParenthesisCloseOperator=e.ParenthesisOpenOperator=e.AssignmentOperator=e.NotEqualOperator=e.EqualOperator=e.LessThanOrEqualOperator=e.GreaterThanOrEqualOperator=e.LessThanOperator=e.GreaterThanOperator=e.LogicalOrOperator=e.LogicalAndOperator=e.ModuloOperator=e.ExponentialOperator=e.MultiplicationOperator=e.DivisionOperator=e.SubtractionOperator=e.AdditionOperator=e.ConditionResult=e.REGEX=void 0,e.REGEX={formulaOperatorG:/(<=|\^|%|>=|==|\|\||&&|!=|[+/\-*=()<>?:])/g,formulaOperator:/(<=|>=|\^|%|==|\|\||&&|!=|[+/\-*=()<>?!:])/,formulaFieldName:/f_[\w]/},e.ConditionResult={True:1,False:0},e.AdditionOperator="+",e.SubtractionOperator="-",e.DivisionOperator="/",e.MultiplicationOperator="*",e.ExponentialOperator="^",e.ModuloOperator="%",e.LogicalAndOperator="&&",e.LogicalOrOperator="||",e.GreaterThanOperator=">",e.LessThanOperator="<",e.GreaterThanOrEqualOperator=">=",e.LessThanOrEqualOperator="<=",e.EqualOperator="==",e.NotEqualOperator="!=",e.AssignmentOperator="=",e.ParenthesisOpenOperator="(",e.ParenthesisCloseOperator=")",e.ColonOperator=":",e.QuestionMarkOperator="?",e.BackslashOperator="\\",e.ComparisonOperator=[e.GreaterThanOperator,e.LessThanOperator,e.LogicalOrOperator,e.LogicalAndOperator,e.GreaterThanOrEqualOperator,e.LessThanOrEqualOperator,e.EqualOperator,e.NotEqualOperator],e.ArithmeticOperator=[e.AdditionOperator,e.SubtractionOperator,e.DivisionOperator,e.MultiplicationOperator,e.ExponentialOperator,e.ModuloOperator],e.Operators=[...e.ArithmeticOperator,...e.ComparisonOperator,e.QuestionMarkOperator],e.AllOperators=[...e.Operators,e.ColonOperator,e.ParenthesisCloseOperator,e.ParenthesisOpenOperator],e.Priority_1_Operator=[e.AdditionOperator,e.SubtractionOperator],e.Priority_2_Operator=[e.DivisionOperator,e.MultiplicationOperator,e.ModuloOperator],e.Priority_3_Operator=[e.ExponentialOperator],e.Priority_4_Operator=[...e.ComparisonOperator,e.QuestionMarkOperator]},114:(r,e,t)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.BinaryOperation=void 0;const o=t(780);class n extends o.Expression{constructor(r,e,t){super(),this.left=r,this.right=e,this.operator=t}execute(r){return this.operator(this.left.execute(r),this.right.execute(r))}}e.BinaryOperation=n},790:(r,e,t)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.ConditionalExpression=void 0;const o=t(780);class n extends o.Expression{constructor(r,e,t){super(),this.condition=r,this.isTrue=e,this.isFalse=t}execute(r){return 0!=this.condition.execute(r)?this.isTrue.execute(r):this.isFalse.execute(r)}}e.ConditionalExpression=n},780:(r,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Expression=void 0;e.Expression=class{}},70:(r,e,t)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.ExpressionConstructor=void 0;const o=t(538),n=t(803),i=t(114),s=t(790);e.ExpressionConstructor=class{static literalValue(r){return new o.LiteralValue(r)}static fieldReference(r){return new n.FieldReference(r)}static addition(r,e){return new i.BinaryOperation(r,e,((r,e)=>r+e))}static subtraction(r,e){return new i.BinaryOperation(r,e,((r,e)=>r-e))}static multiplication(r,e){return new i.BinaryOperation(r,e,((r,e)=>r*e))}static division(r,e){return new i.BinaryOperation(r,e,((r,e)=>{if(0===e)throw new Error("Division by zero");return r/e}))}static condition(r,e,t){return new s.ConditionalExpression(r,e,t)}static equality(r,e){return new i.BinaryOperation(r,e,((r,e)=>Number(r===e)))}static superior(r,e){return new i.BinaryOperation(r,e,((r,e)=>Number(r>e)))}static inferior(r,e){return new i.BinaryOperation(r,e,((r,e)=>Number(r<e)))}static different(r,e){return new i.BinaryOperation(r,e,((r,e)=>Number(r!=e)))}static or(r,e){return new i.BinaryOperation(r,e,((r,e)=>Number(r||e)))}static and(r,e){return new i.BinaryOperation(r,e,((r,e)=>Number(r&&e)))}static pow(r,e){return new i.BinaryOperation(r,e,((r,e)=>Math.pow(Number(r),Number(e))))}static modulo(r,e){return new i.BinaryOperation(r,e,((r,e)=>r%e))}}},803:(r,e,t)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.FieldReference=void 0;const o=t(780),n=t(641),i=t(400),s=t(464),a=t(258);class u extends o.Expression{constructor(r){super(),this.fieldName=r}execute(r){if(null!=r&&null!=r&&null!=r[this.fieldName])return this.isFormulaRef()?this.executeFormulaRef(r):r[this.fieldName];throw new Error(`The fieldName ${this.fieldName} does not exist or is undefined on object ${r}`)}isFormulaRef(){return n.REGEX.formulaFieldName.test(this.fieldName)}executeFormulaRef(r){const e=new s.FormulaTokenizer,t=new i.FormulaParser,o=new a.FormulaInterpreter,n=t.execute(e.execute(r[this.fieldName]));return o.execute(n,r)}}e.FieldReference=u},538:(r,e,t)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.LiteralValue=void 0;const o=t(780);class n extends o.Expression{constructor(r){super(),this._value=r}execute(r){return this._value}}e.LiteralValue=n},73:function(r,e,t){var o,n=this&&this.__createBinding||(Object.create?function(r,e,t,o){void 0===o&&(o=t);var n=Object.getOwnPropertyDescriptor(e,t);n&&!("get"in n?!e.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return e[t]}}),Object.defineProperty(r,o,n)}:function(r,e,t,o){void 0===o&&(o=t),r[o]=e[t]}),i=this&&this.__setModuleDefault||(Object.create?function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}:function(r,e){r.default=e}),s=this&&this.__importStar||(o=function(r){return o=Object.getOwnPropertyNames||function(r){var e=[];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[e.length]=t);return e},o(r)},function(r){if(r&&r.__esModule)return r;var e={};if(null!=r)for(var t=o(r),s=0;s<t.length;s++)"default"!==t[s]&&n(e,r,t[s]);return i(e,r),e});Object.defineProperty(e,"__esModule",{value:!0}),e.ConditionResult=e.isValidExpression=e.FormulaTokenizer=e.AstNode=e.FormulaParser=e.FormulaInterpreter=e.LiteralValue=e.FieldReference=e.ExpressionConstructor=e.Expression=e.ConditionalExpression=e.BinaryOperation=void 0;const a=t(114);Object.defineProperty(e,"BinaryOperation",{enumerable:!0,get:function(){return a.BinaryOperation}});const u=t(790);Object.defineProperty(e,"ConditionalExpression",{enumerable:!0,get:function(){return u.ConditionalExpression}});const p=t(780);Object.defineProperty(e,"Expression",{enumerable:!0,get:function(){return p.Expression}});const l=t(70);Object.defineProperty(e,"ExpressionConstructor",{enumerable:!0,get:function(){return l.ExpressionConstructor}});const c=t(803);Object.defineProperty(e,"FieldReference",{enumerable:!0,get:function(){return c.FieldReference}});const O=t(538);Object.defineProperty(e,"LiteralValue",{enumerable:!0,get:function(){return O.LiteralValue}});const d=t(258);Object.defineProperty(e,"FormulaInterpreter",{enumerable:!0,get:function(){return d.FormulaInterpreter}});const h=t(400);Object.defineProperty(e,"FormulaParser",{enumerable:!0,get:function(){return h.FormulaParser}}),Object.defineProperty(e,"AstNode",{enumerable:!0,get:function(){return h.AstNode}});const f=t(464);Object.defineProperty(e,"FormulaTokenizer",{enumerable:!0,get:function(){return f.FormulaTokenizer}});const m=s(t(88));Object.defineProperty(e,"isValidExpression",{enumerable:!0,get:function(){return m.isValidExpression}});const x=t(641);Object.defineProperty(e,"ConditionResult",{enumerable:!0,get:function(){return x.ConditionResult}}),e.default=m.default},258:(r,e,t)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.FormulaInterpreter=void 0;const o=t(70),n=t(641);e.FormulaInterpreter=class{execute(r,e){return this.interpret(r,e).execute(e)}interpret(r,e){if(r.isNode()){const t=r.operator,i=this.interpret(r.right,e),s=this.interpret(r.left,e);switch(t){case n.AdditionOperator:return o.ExpressionConstructor.addition(s,i);case n.SubtractionOperator:return o.ExpressionConstructor.subtraction(s,i);case n.MultiplicationOperator:return o.ExpressionConstructor.multiplication(s,i);case n.DivisionOperator:return o.ExpressionConstructor.division(s,i);case n.ModuloOperator:return o.ExpressionConstructor.modulo(s,i);case n.ExponentialOperator:return o.ExpressionConstructor.pow(s,i);default:throw new Error(`This operator ${t} is not supported.`)}}else{if(r.isValue()){const e=r.value;if("number"==typeof e)return o.ExpressionConstructor.literalValue(Number(r.value));{const r=/"([\w]+)"/,t=e.match(r)[1];return o.ExpressionConstructor.literalValue(t)}}if(r.isField()){const t=e[String(r.fieldName)];if(void 0===t)throw new Error(`The variable ${r.fieldName} not defined.`);return o.ExpressionConstructor.fieldReference(r.fieldName)}if(!r.isComparison()){if(r.isConditional()){const t=this.interpret(r.condition,e),n=this.interpret(r.isTrue,e),i=this.interpret(r.isFalse,e);return o.ExpressionConstructor.condition(t,n,i)}throw new Error(`This Expression is not Correct. Please verify Your expression [Interpreter]:${r}`)}{const t=r.operator,i=this.interpret(r.left,e),s=this.interpret(r.right,e);switch(t){case n.GreaterThanOperator:return o.ExpressionConstructor.superior(i,s);case n.LessThanOperator:return o.ExpressionConstructor.inferior(i,s);case n.EqualOperator:return o.ExpressionConstructor.equality(i,s);case n.GreaterThanOrEqualOperator:return o.ExpressionConstructor.or(o.ExpressionConstructor.superior(i,s),o.ExpressionConstructor.equality(i,s));case n.LessThanOrEqualOperator:return o.ExpressionConstructor.or(o.ExpressionConstructor.inferior(i,s),o.ExpressionConstructor.equality(i,s));case n.LogicalOrOperator:return o.ExpressionConstructor.or(i,s);case n.LogicalAndOperator:return o.ExpressionConstructor.and(i,s);case n.NotEqualOperator:return o.ExpressionConstructor.different(i,s);default:throw new Error(`This comparison ${t} method is not supported`)}}}}}},88:(r,e,t)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(r,e){const t=new n.FormulaTokenizer,s=new o.FormulaParser;return(new i.FormulaInterpreter).execute(s.execute(t.execute(r)),e||{})},e.isValidExpression=function(r){try{const e=new n.FormulaTokenizer,t=new o.FormulaParser,i=e.execute(r);return t.isValidFormula(i)}catch(r){return!1}};const o=t(400),n=t(464),i=t(258)},400:(r,e,t)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.FormulaParser=e.AstNode=void 0;const o=t(641);o.ArithmeticOperator,o.ComparisonOperator;class n{isConditional(){return!!this.condition&&!!this.isFalse&&!!this.isTrue}isValue(){return null!=this.value}isComparison(){return!!this.isComparisonOperator()}isField(){return!!this.fieldName}isNode(){return!(this.isValue()||this.isField()||this.isComparison()||this.isConditional())}isComparisonOperator(){return!!o.ComparisonOperator.includes(this.operator)}}e.AstNode=n;e.FormulaParser=class{isFormula(r){let e=1,t=1;const n=o.REGEX.formulaOperator;for(let o=0;o<r.length;o++){const i=r[o],s=o-1;if(n.test(String(i)))t=o;else{if(e==s&&t!=s)return!1;e=o}}return!0}checkSyntax(r){this.checkParenthesisSyntax(r),this.checkOperatorSyntax(r),this.checkTernaryConditionSyntax(r)}checkParenthesisSyntax(r){const e=[];if(r.forEach((r=>{if(r===o.ParenthesisOpenOperator&&e.push(o.ParenthesisOpenOperator),r===o.ParenthesisCloseOperator){if(0===e.length)throw new Error("Parenthesis mismatch");e.pop()}})),0!==e.length)throw new Error("Incorrect parenthesis disposition.")}checkOperatorSyntax(r){const e=r.join("");if(/[+-\/*]{2,}/.test(e))throw new Error("Incorrect Operator error");if(1==r.length&&/\w/.test(e))return;if(!/>=|<=|==|!=|&&|\|\||[+-\/*<>%\^][\w\(]/.test(e))throw new Error("Incorrect Operator position for Operand")}checkTernaryConditionSyntax(r){let e=0,t=0;if(r.forEach((r=>{r===o.QuestionMarkOperator&&e++,r===o.ColonOperator&&t++})),e!==t)throw new Error("Incorrect Ternary syntax: unmatched ? and :");const n=/[?:]/;let i=!0;r.forEach((r=>{if(n.test(String(r))){if(i&&r===o.ColonOperator)throw new Error("Ternary syntax error: found ':' before '?'");i=!i}}))}isValidFormula(r){try{return!!this.isFormula(r)&&(this.checkSyntax(r),!0)}catch(r){return!1}}execute(r){if(this.isFormula(r))return this.checkSyntax(r),this.parser(r);throw new Error("[Error]: Not formula")}parser(r){const e=this.infixToPostFix(r);return this.generateAST(e)}generateAST(r){return this._generateAST(r,0,[])}_generateAST(r,e,t=[]){const o=r[e];if(null==o)return t[0];if(this.isOperatorFirstAndParenthesis(o)){const r=new n;r.operator=o,this.isArithmeticOperator(o)||this.isComparisonOperator(o)?(r.right=t.pop(),r.left=t.pop()):this.isTernaryOperator(o)&&(r.isFalse=t.pop(),r.isTrue=t.pop(),r.condition=t.pop()),t.push(r)}else{const r=new n;this.isValue(o)?r.value=o:r.fieldName=o,t.push(r)}return this._generateAST(r,e+1,t)}infixToPostFix(r){const e=[],t=[];for(r.forEach((r=>{if(this.isOperatorFirstAndParenthesis(r)){const n=String(r),i=this.priority(n);if(n===o.ParenthesisOpenOperator)t.push(n);else if(n===o.ParenthesisCloseOperator){for(;t.length>0&&t[t.length-1]!==o.ParenthesisOpenOperator;){const r=t.pop();r.trim()!==o.ParenthesisOpenOperator&&e.push(r)}t.pop()}else if(n===o.ColonOperator)for(;t.length>0&&t[t.length-1]!==o.QuestionMarkOperator;)e.push(t.pop());else if(o.Operators.includes(n)){for(;t.length>0&&this.priority(t[t.length-1])>=i;)e.push(t.pop());t.push(n)}}else e.push(r)}));t.length>0;)e.push(t.pop());return e}priority(r){return o.Priority_1_Operator.includes(r)?1:o.Priority_2_Operator.includes(r)?2:o.Priority_3_Operator.includes(r)?3:o.Priority_4_Operator.includes(r)?4:0}isOperatorFirstAndParenthesis(r){return!!o.AllOperators.includes(String(r).trim())}isArithmeticOperator(r){return!!o.ArithmeticOperator.includes(r)}isComparisonOperator(r){return!!o.ComparisonOperator.includes(r)}isTernaryOperator(r){return o.QuestionMarkOperator===r}isValue(r){return!("number"!=typeof r&&!/"[\w]+"/.test(r))}}},464:(r,e,t)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.FormulaTokenizer=void 0;const o=t(641);e.FormulaTokenizer=class{formatInput(r){return r.replace(o.REGEX.formulaOperatorG," $1 ").replace(/\s+/g," ").trim()}filterTokens(r){const e=[];let t=!1;return r.forEach((r=>{const n=e[e.length-1];if(/^\d+(\.\d+)?$/.test(r)){const n=e.pop(),i=e.pop();null!=n&&null!=i?o.Priority_1_Operator.includes(n)&&i===o.ParenthesisOpenOperator?(e.push(Number(n+r)),t=!0):e.push(i,n,Number(r)):null==i&&null!=n?e.push(n,Number(r)):e.push(Number(r))}else/-\d+/.test(n)&&r===o.ParenthesisCloseOperator&&t?t=!1:e.push(r)})),e}execute(r){const e=this.formatInput(r).split(" ");return this.filterTokens(e)}}}},e={};var t=function t(o){var n=e[o];if(void 0!==n)return n.exports;var i=e[o]={exports:{}};return r[o].call(i.exports,i,i.exports,t),i.exports}(73);return t})()));
//# sourceMappingURL=index.js.map