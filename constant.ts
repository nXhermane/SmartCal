/**
 * Regular expressions used for parsing formula expressions.
 */
export const REGEX = {
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
export const ConditionResult = {
  /** Represents true (evaluates to 1 in numeric context) */
  True: 1,
  /** Represents false (evaluates to 0 in numeric context) */
  False: 0,
} as const;
// Arithmetic operators
/** Addition operator (+) */
export const AdditionOperator = "+";
/** Subtraction operator (-) */
export const SubtractionOperator = "-";
/** Division operator (/) */
export const DivisionOperator = "/";
/** Multiplication operator (*) */
export const MultiplicationOperator = "*";
/** Exponential operator (^) */
export const ExponentialOperator = "^";
/** Modulo operator (%) */
export const ModuloOperator = "%";

// Logical operators
/** Logical AND operator (&&) */
export const LogicalAndOperator = "&&";
/** Logical OR operator (||) */
export const LogicalOrOperator = "||";

// Comparison operators
/** Greater than operator (>) */
export const GreaterThanOperator = ">";
/** Less than operator (<) */
export const LessThanOperator = "<";
/** Greater than or equal operator (>=) */
export const GreaterThanOrEqualOperator = ">=";
/** Less than or equal operator (<=) */
export const LessThanOrEqualOperator = "<=";
/** Equality operator (==) */
export const EqualOperator = "==";
/** Inequality operator (!=) */
export const NotEqualOperator = "!=";

// Other operators
/** Assignment operator (=) */
export const AssignmentOperator = "=";
/** Opening parenthesis (() */
export const ParenthesisOpenOperator = "(";
/** Closing parenthesis ()) */
export const ParenthesisCloseOperator = ")";
/** Colon operator (:) - used in ternary operations */
export const ColonOperator = ":";
/** Question mark operator (?) - used in ternary operations */
export const QuestionMarkOperator = "?";
/** Backslash operator (\) */
export const BackslashOperator = "\\";

/** Array of all comparison operators */
export const ComparisonOperator = [
  GreaterThanOperator,
  LessThanOperator,
  LogicalOrOperator,
  LogicalAndOperator,
  GreaterThanOrEqualOperator,
  LessThanOrEqualOperator,
  EqualOperator,
  NotEqualOperator,
] as const;

/** Array of all arithmetic operators */
export const ArithmeticOperator = [
  AdditionOperator,
  SubtractionOperator,
  DivisionOperator,
  MultiplicationOperator,
  ExponentialOperator,
  ModuloOperator,
] as const;

/** Combined array of arithmetic and comparison operators plus ternary operator */
export const Operators = [
  ...ArithmeticOperator,
  ...ComparisonOperator,
  QuestionMarkOperator,
] as const;

/** Array of all operators including parentheses and colon */
export const AllOperators = [
  ...Operators,
  ColonOperator,
  ParenthesisCloseOperator,
  ParenthesisOpenOperator,
] as const;

/** Priority 1 operators (lowest precedence): addition and subtraction */
export const Priority_1_Operator = [AdditionOperator, SubtractionOperator] as const;

/** Priority 2 operators: multiplication, division, modulo */
export const Priority_2_Operator = [
  DivisionOperator,
  MultiplicationOperator,
  ModuloOperator,
] as const;

/** Priority 3 operators (highest precedence): exponentiation */
export const Priority_3_Operator = [ExponentialOperator] as const;

/** Priority 4 operators: comparisons and ternary */
export const Priority_4_Operator = [
  ...ComparisonOperator,
  QuestionMarkOperator,
] as const;
