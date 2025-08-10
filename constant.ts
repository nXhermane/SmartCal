export const REGEX = {
  formulaOperatorG: /(<=|\^|%|>=|==|\|\||&&|!=|[+/\-*=()<>?:])/g,
  formulaOperator: /(<=|>=|\^|%|==|\|\||&&|!=|[+/\-*=()<>?!:])/,
  formulaFieldName: /f_[\w]/, // that is regex that identify the formula fieldName
};
export const ConditionResult = {
  True: 1,
  False: 0,
};
// Arithmetics operators
export const AdditionOperator = "+";
export const SubtractionOperator = "-";
export const DivisionOperator = "/";
export const MultiplicationOperator = "*";
export const ExponentialOperator = "^";
export const ModuloOperator = "%";
// Logics operators
export const LogicalAndOperator = "&&";
export const LogicalOrOperator = "||";
// Comparisons operators
export const GreaterThanOperator = ">";
export const LessThanOperator = "<";
export const GreaterThanOrEqualOperator = ">=";
export const LessThanOrEqualOperator = "<=";
export const EqualOperator = "==";
export const NotEqualOperator = "!=";
// Others operators
export const AssignmentOperator = "=";
export const ParenthesisOpenOperator = "(";
export const ParenthesisCloseOperator = ")";
export const ColonOperator = ":";
export const QuestionMarkOperator = "?";
export const BackslashOperator = "\\";

export const ComparisonOperator = [
  GreaterThanOperator,
  LessThanOperator,
  LogicalOrOperator,
  LogicalAndOperator,
  GreaterThanOrEqualOperator,
  LessThanOrEqualOperator,
  EqualOperator,
  NotEqualOperator,
];
export const ArithmeticOperator = [
  AdditionOperator,
  SubtractionOperator,
  DivisionOperator,
  MultiplicationOperator,
  ExponentialOperator,
  ModuloOperator,
];

export const Operators = [
  ...ArithmeticOperator,
  ...ComparisonOperator,
  QuestionMarkOperator,
];
export const UnaryOperator = ["u-", "u+"];
export const Priority_5_Operator = [...UnaryOperator];
export const AllOperators = [
  ...Operators,
  ColonOperator,
  ParenthesisCloseOperator,
  ParenthesisOpenOperator,
];
export const Priority_1_Operator = [AdditionOperator, SubtractionOperator];
export const Priority_2_Operator = [
  DivisionOperator,
  MultiplicationOperator,
  ModuloOperator,
];
export const Priority_3_Operator = [ExponentialOperator];
export const Priority_4_Operator = [
  ...ComparisonOperator,
  QuestionMarkOperator,
];
