export const REGEX = {
  formularOperatorG: /(<=|\^|%|>=|==|\|\||&&|!=|[+/\-*=()<>?:])/g,
  formularOperator: /(<=|>=|\^|%|==|\|\||&&|!=|[+/\-*=()<>?!:])/,
  formularFieldName: /f_[\w]/, // that is regex that identify the formular fieldName
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
  ModuloOperator
];

export const Operators = [
  ...ArithmeticOperator,
  ...ComparisonOperator,
  QuestionMarkOperator,
];
export const AllOperators = [
  ...Operators,
  ColonOperator,
  ParenthesisCloseOperator,
  ParenthesisOpenOperator,
];
export const Priority_1_Operator = [AdditionOperator, SubtractionOperator];
export const Priority_2_Operator = [DivisionOperator, MultiplicationOperator,ModuloOperator];
export const Priority_3_Operator = [ExponentialOperator];
export const Priority_4_Operator = [
  ...ComparisonOperator,
  QuestionMarkOperator,
];
