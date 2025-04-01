import { ComparisonOperator } from "../constant";
import { Operator } from "./../types";
/**
 * Defines the structure of a Node in the Abstract Syntax Tree (AST).
 */
export interface INode {
  operator?: Operator; // The operator associated with the node.
  left?: INode; // The left child node.
  right?: INode; // The right child node.
  condition?: INode; // The condition for conditional nodes.
  isTrue?: INode; // The node representing the true branch of a conditional.
  isFalse?: INode; // The node representing the false branch of a conditional.
  value?: number | string; // The value of the node, can be a number or a string.
  fieldName?: string; // The name of the field for field nodes.

  /**
   * Checks if the node is conditional.
   * @returns {boolean} True if the node is conditional; otherwise, false.
   */
  isConditional(): boolean;

  /**
   * Checks if the node represents a value.
   * @returns {boolean} True if the node is a value; otherwise, false.
   */
  isValue(): boolean;

  /**
   * Checks if the node is a comparison operator.
   * @returns {boolean} True if the node is a comparison; otherwise, false.
   */
  isComparison(): boolean;

  /**
   * Checks if the node is a field.
   * @returns {boolean} True if the node is a field; otherwise, false.
   */
  isField(): boolean;

  /**
   * Checks if the node is a generic node.
   * @returns {boolean} True if the node is a node; otherwise, false.
   */
  isNode(): boolean;
}

/**
 * Represents a node in the Abstract Syntax Tree (AST).
 */
export class AstNode implements INode {
  operator?: Operator; // The operator associated with this node.
  left?: INode; // The left child node.
  right?: INode; // The right child node.
  condition?: INode; // The condition for conditional nodes.
  isTrue?: INode; // The node representing the true branch of a conditional.
  isFalse?: INode; // The node representing the false branch of a conditional.
  value?: number | string; // The value of the node, can be a number or a string.
  fieldName?: string; // The name of the field for field nodes.

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
  isValue(): boolean {
    return this.value != undefined;
  }

  /**
   * Determines if this node is a comparison operator.
   * @returns {boolean} True if the node is a comparison; otherwise, false.
   */
  isComparison(): boolean {
    return !!this.isComparisonOperator();
  }

  /**
   * Determines if this node is a field.
   * @returns {boolean} True if the node is a field; otherwise, false.
   */
  isField(): boolean {
    return !!this.fieldName;
  }

  /**
   * Determines if this node is a generic node.
   * @returns {boolean} True if the node is a node; otherwise, false.
   */
  isNode() {
    return (
      !this.isValue() &&
      !this.isField() &&
      !this.isComparison() &&
      !this.isConditional()
    );
  }

  /**
   * Checks if the operator is a comparison operator.
   * @returns {boolean} True if the operator is a comparison operator; otherwise, false.
   */
  private isComparisonOperator() {
    if (ComparisonOperator.includes(this.operator as string)) return true;
    return false;
  }
}
