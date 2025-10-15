import {
  Operators,
  ParenthesisOpenOperator,
  Priority_1_Operator as SignOperators,
  REGEX,
  ParenthesisCloseOperator,
} from "../constant";

/**
 * The FormulaTokenizer class is responsible for tokenizing and formatting
 * mathematical expressions for further evaluation. It handles the input
 * string by formatting it, filtering tokens, and preparing them for processing.
 */
export class FormulaTokenizer {
  /**
   * Formats the input string by replacing operators and trimming whitespace.
   * @param {string} input The input string to be formatted.
   * @returns {string} The formatted expression.
   */
  private formatInput(input: string): string {
    return input
      .replace(REGEX.formulaOperatorG, " $1 ")
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
  private filterTokens(tokens: string[]): (string | number)[] {
    const filteredTokens: (string | number)[] = [];
    let expectedClosedParenthesis = false;
    tokens.forEach((token: string) => {
      const regex = /^\d+(\.\d+)?$/;
      const negativeNumberRegex = /-\d+/;
      const lastFilteredToken = filteredTokens[filteredTokens.length - 1];
      if (regex.test(token)) {
        const firstPop = filteredTokens.pop();
        const secondPop = filteredTokens.pop();

        if (firstPop !== undefined) {
          const isSign = SignOperators.includes(firstPop as any);
          const isPrecededByOperator =
            secondPop !== undefined &&
            typeof secondPop === "string" &&
            Operators.includes(secondPop as any);
          const isPrecededByParen = secondPop === ParenthesisOpenOperator;
          const isAtStart = secondPop === undefined;

          if (isSign && isPrecededByParen) {
            // Special case for `(-2)`
            filteredTokens.push(Number(firstPop + token));
            expectedClosedParenthesis = true;
          } else if (isSign && (isPrecededByOperator || isAtStart)) {
            // It's a signed number
            if (secondPop !== undefined) {
              filteredTokens.push(secondPop);
            }
            filteredTokens.push(Number(firstPop + token));
          } else {
            // Not a signed number, push everything back
            if (secondPop !== undefined) {
              filteredTokens.push(secondPop);
            }
            filteredTokens.push(firstPop, Number(token));
          }
        } else {
          // No token before, just a number
          filteredTokens.push(Number(token));
        }
      } else if (
        negativeNumberRegex.test(lastFilteredToken as string) &&
        token === ParenthesisCloseOperator &&
        expectedClosedParenthesis
      ) {
        expectedClosedParenthesis = false;
      } else {
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
  execute(input: string): any[] {
    const formattedInput = this.formatInput(input);
    if (formattedInput.trim() === "") return [];
    const tokens = formattedInput.split(" ");
    const filteredTokens = this.filterTokens(tokens);
    return filteredTokens;
  }
}
