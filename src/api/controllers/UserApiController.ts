// src/api/controllers/UserApiController.ts
import { UserService } from "../../services/UserService";
import { UserPayload, Context } from "../../types";
import { ValidationMiddleware, ErrorHandler } from "../middleware";

export class UserApiController {
  /**
   * Get current user profile
   */
  static async me(
    _: unknown,
    __: unknown,
    ctx: Context
  ): Promise<UserPayload | null> {
    try {
      ValidationMiddleware.requireAuth(ctx);
      return await UserService.getUserProfile(ctx.user!.id);
    } catch (error) {
      ErrorHandler.handleError(error as Error);
    }
  }

  /**
   * Get all users (admin only)
   */
  static async users(
    _: unknown,
    __: unknown,
    ctx: Context
  ): Promise<UserPayload[]> {
    try {
      ValidationMiddleware.requireAuth(ctx);
      // TODO: Add admin role check
      // For now, return empty array as placeholder
      return [];
    } catch (error) {
      ErrorHandler.handleError(error as Error);
    }
  }

  /**
   * Get user by ID
   */
  static async user(
    _: unknown,
    args: { id: number },
    ctx: Context
  ): Promise<UserPayload | null> {
    try {
      ValidationMiddleware.requireAuth(ctx);
      return await UserService.getUserProfile(args.id);
    } catch (error) {
      ErrorHandler.handleError(error as Error);
    }
  }

  /**
   * Update user profile
   */
  static async updateProfile(
    _: unknown,
    args: { name?: string; email?: string },
    ctx: Context
  ): Promise<UserPayload> {
    try {
      ValidationMiddleware.requireAuth(ctx);

      // Validate email if provided
      if (args.email && !ValidationMiddleware.validateEmail(args.email)) {
        throw new Error("Invalid email format");
      }

      // Validate name if provided
      if (args.name !== undefined && args.name.trim().length === 0) {
        throw new Error("Name cannot be empty");
      }

      return await UserService.updateProfile(ctx.user!.id, args);
    } catch (error) {
      ErrorHandler.handleError(error as Error);
    }
  }

  /**
   * Delete user account
   */
  static async deleteAccount(
    _: unknown,
    __: unknown,
    ctx: Context
  ): Promise<boolean> {
    try {
      ValidationMiddleware.requireAuth(ctx);
      return await UserService.deleteAccount(ctx.user!.id);
    } catch (error) {
      ErrorHandler.handleError(error as Error);
    }
  }
}
