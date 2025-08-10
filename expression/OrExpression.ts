import { Expression } from "./Expression";

export class OrExpression<T, R> extends Expression<T, number> {
  constructor(
    private left: Expression<T, R>,
    private right: Expression<T, R>
  ) {
    super();
  }

  execute(obj: T): number {
    const leftResult = this.left.execute(obj);
    if (leftResult) {
      return 1;
    }
    return Number(!!this.right.execute(obj));
  }
}
