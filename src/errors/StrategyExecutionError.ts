export class StrategyExecutionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "StrategyExecutionError";
  }
}
