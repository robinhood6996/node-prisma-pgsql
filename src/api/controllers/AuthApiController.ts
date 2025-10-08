// src/api/controllers/AuthApiController.ts
import { AuthService } from "../../services/AuthService";
import { UserService } from "../../services/UserService";
import {
  SignupArgs,
  LoginArgs,
  EnhancedAuthPayload,
  Context,
} from "../../types";
import { ValidationMiddleware, ErrorHandler } from "../middleware";

export class AuthApiController {
  /**
   * Handle user signup with validation
   */
  static async signup(
    _: unknown,
    args: SignupArgs,
    __: Context
  ): Promise<EnhancedAuthPayload> {
    try {
      // Validate input
      ValidationMiddleware.validateSignupInput(
        args.email,
        args.password,
        args.name
      );

      // Create user
      const result = await AuthService.signup(args);

      // Get user details
      const user = await UserService.getUserByEmail(args.email);
      if (!user) {
        throw new Error("Failed to retrieve user after signup");
      }

      return {
        accessToken: result.accessToken,
        user,
      };
    } catch (error) {
      ErrorHandler.handleError(error as Error);
    }
  }

  /**
   * Handle user login with validation
   */
  static async login(
    _: unknown,
    args: LoginArgs,
    __: Context
  ): Promise<EnhancedAuthPayload> {
    try {
      // Validate input
      ValidationMiddleware.validateLoginInput(args.email, args.password);

      // Authenticate user
      const result = await AuthService.login(args);

      // Get user details
      const user = await UserService.getUserByEmail(args.email);
      if (!user) {
        throw new Error("Failed to retrieve user after login");
      }

      return {
        accessToken: result.accessToken,
        user,
      };
    } catch (error) {
      ErrorHandler.handleError(error as Error);
    }
  }

  /**
   * Refresh access token
   */
  static async refreshToken(
    _: unknown,
    __: unknown,
    ctx: Context
  ): Promise<EnhancedAuthPayload> {
    try {
      ValidationMiddleware.requireAuth(ctx);

      // Generate new token
      const accessToken = AuthService.generateToken(ctx.user!.id);

      // Get user details
      const user = await UserService.getUserProfile(ctx.user!.id);
      if (!user) {
        ErrorHandler.handleNotFoundError("User");
      }

      return {
        accessToken,
        user: user!,
      };
    } catch (error) {
      ErrorHandler.handleError(error as Error);
    }
  }
}
