// src/api/middleware/errorHandler.ts
import { GraphQLError } from "graphql";

export class ErrorHandler {
  /**
   * Handle authentication errors
   */
  static handleAuthError(error: Error): never {
    throw new GraphQLError(error.message, {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
  }

  /**
   * Handle validation errors
   */
  static handleValidationError(error: Error): never {
    throw new GraphQLError(error.message, {
      extensions: {
        code: "BAD_USER_INPUT",
        http: { status: 400 },
      },
    });
  }

  /**
   * Handle not found errors
   */
  static handleNotFoundError(resource: string): never {
    throw new GraphQLError(`${resource} not found`, {
      extensions: {
        code: "NOT_FOUND",
        http: { status: 404 },
      },
    });
  }

  /**
   * Handle internal server errors
   */
  static handleInternalError(error: Error): never {
    console.error("Internal server error:", error);
    throw new GraphQLError("Internal server error", {
      extensions: {
        code: "INTERNAL_SERVER_ERROR",
        http: { status: 500 },
      },
    });
  }

  /**
   * Handle and classify errors
   */
  static handleError(error: Error): never {
    const message = error.message.toLowerCase();

    if (message.includes("not authenticated") || message.includes("unauthorized")) {
      this.handleAuthError(error);
    }

    if (message.includes("validation") || message.includes("invalid") || message.includes("required")) {
      this.handleValidationError(error);
    }

    if (message.includes("not found")) {
      this.handleNotFoundError(error.message);
    }

    // Default to internal server error
    this.handleInternalError(error);
  }
}