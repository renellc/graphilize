export class InvalidVertexError extends Error {
  constructor(message: string, errorOptions?: ErrorOptions) {
    super(message, errorOptions);
    this.name = "InvalidVertexError";
    this.message = message;
  }
}

export class InvalidEdgeError extends Error {
  constructor(message: string, errorOptions?: ErrorOptions) {
    super(message, errorOptions);
    this.name = "InvalidEdgeError";
    this.message = message;
  }
}
