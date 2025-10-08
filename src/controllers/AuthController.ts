// src/controllers/AuthController.ts
import { AuthService } from "../services/AuthService";
import { SignupArgs, LoginArgs, AuthPayload, Context } from "../types";

export class AuthController {
  /**
   * Handle user signup
   */
  static async signup(
    _: unknown,
    args: SignupArgs,
    __: Context
  ): Promise<AuthPayload> {
    try {
      return await AuthService.signup(args);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Signup failed");
    }
  }

  /**
   * Handle user login
   */
  static async login(
    _: unknown,
    args: LoginArgs,
    __: Context
  ): Promise<AuthPayload> {
    try {
      return await AuthService.login(args);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Login failed");
    }
  }
}
