import { Expression } from "./Expression";

export class AndExpression<T, R> extends Expression<T, number> {
  constructor(
    private left: Expression<T, R>,
    private right: Expression<T, R>
  ) {
    super();
  }

  execute(obj: T): number {
    const leftResult = this.left.execute(obj);
    if (!leftResult) {
      return 0;
    }
    return Number(!!this.right.execute(obj));
  }
}
