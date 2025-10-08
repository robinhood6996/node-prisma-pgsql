// src/controllers/UserController.ts
import { UserService } from "../services/UserService";
import { UserPayload, Context } from "../types";

export class UserController {
  /**
   * Get current user profile
   */
  static async me(
    _: unknown,
    __: unknown,
    ctx: Context
  ): Promise<UserPayload | null> {
    if (!ctx.user) {
      throw new Error("Not authenticated");
    }

    try {
      return await UserService.getUserProfile(ctx.user.id);
    } catch (error) {
      throw new Error("Failed to fetch user profile");
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
    if (!ctx.user) {
      throw new Error("Not authenticated");
    }

    try {
      return await UserService.updateProfile(ctx.user.id, args);
    } catch (error) {
      throw new Error("Failed to update profile");
    }
  }
}
