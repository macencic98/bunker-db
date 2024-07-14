export class InvalidBudgetError extends Error{
    constructor(message: string) {
        super(message);
        this.name = "InvalidBudgetError";
      }
}

export class RepositoryException extends Error{
  constructor(message: string) {
      super(message);
      this.name = "RepositoryException";
    }
}

export class MappingException extends Error{
  constructor(message: string) {
      super(message);
      this.name = "MappingException";
    }
}