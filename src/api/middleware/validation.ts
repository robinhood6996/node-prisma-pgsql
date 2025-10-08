// src/api/middleware/validation.ts
import { Context } from "../../types";

export class ValidationMiddleware {
  /**
   * Validate email format
   */
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate password strength
   */
  static validatePassword(password: string): { valid: boolean; message?: string } {
    if (password.length < 8) {
      return { valid: false, message: "Password must be at least 8 characters long" };
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return { valid: false, message: "Password must contain at least one lowercase letter" };
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return { valid: false, message: "Password must contain at least one uppercase letter" };
    }
    if (!/(?=.*\d)/.test(password)) {
      return { valid: false, message: "Password must contain at least one number" };
    }
    return { valid: true };
  }

  /**
   * Require authentication
   */
  static requireAuth(ctx: Context): void {
    if (!ctx.user) {
      throw new Error("Authentication required");
    }
  }

  /**
   * Validate signup input
   */
  static validateSignupInput(email: string, password: string, name?: string): void {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    if (!this.validateEmail(email)) {
      throw new Error("Invalid email format");
    }

    const passwordValidation = this.validatePassword(password);
    if (!passwordValidation.valid) {
      throw new Error(passwordValidation.message || "Invalid password");
    }

    if (name !== undefined && name.trim().length === 0) {
      throw new Error("Name cannot be empty");
    }
  }

  /**
   * Validate login input
   */
  static validateLoginInput(email: string, password: string): void {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    if (!this.validateEmail(email)) {
      throw new Error("Invalid email format");
    }
  }
}