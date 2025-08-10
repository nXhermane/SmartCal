import { ExpressionBuilder } from '../../builder/ExpressionBuilder';

describe('ExpressionBuilder', () => {
  it('should create an expression with a single addition', () => {
    const expression = ExpressionBuilder.create().add(5, 10).str();
    expect(expression).toBe('(5 + 10)');
  });

  it('should chain multiple additions', () => {
    const expression = ExpressionBuilder.create().add(5, 10).add('x', 2).str();
    expect(expression).toBe('(5 + 10)(x + 2)');
  });

  it('should handle string variables', () => {
    const expression = ExpressionBuilder.create().add('price', 'tax').str();
    expect(expression).toBe('(price + tax)');
  });

  it('should return an empty string if no operations are added', () => {
    const expression = ExpressionBuilder.create().str();
    expect(expression).toBe('');
  });
});
