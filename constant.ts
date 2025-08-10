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
  GreaterThanOrEqualOperator,
  LessThanOrEqualOperator,
  EqualOperator,
  NotEqualOperator,
];

export const LogicalOperator = [LogicalAndOperator, LogicalOrOperator];

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
  ...LogicalOperator,
  QuestionMarkOperator,
];
export const AllOperators = [
  ...Operators,
  ColonOperator,
  ParenthesisCloseOperator,
  ParenthesisOpenOperator,
];

export const Priority_1_Operator = [LogicalOrOperator, QuestionMarkOperator];
export const Priority_2_Operator = [LogicalAndOperator];
export const Priority_3_Operator = [EqualOperator, NotEqualOperator];
export const Priority_4_Operator = [
  GreaterThanOperator,
  LessThanOperator,
  GreaterThanOrEqualOperator,
  LessThanOrEqualOperator,
];
export const Priority_5_Operator = [AdditionOperator, SubtractionOperator];
export const Priority_6_Operator = [
  DivisionOperator,
  MultiplicationOperator,
  ModuloOperator,
];
export const Priority_7_Operator = [ExponentialOperator];
