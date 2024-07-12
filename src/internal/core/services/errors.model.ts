export class InvalidBudgetError extends Error{
    constructor(message: string) {
        super(message);
        this.name = "InvalidBudgetError";
      }
}