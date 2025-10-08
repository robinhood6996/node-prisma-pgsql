// src/services/UserService.ts
import { UserModel } from "../models/User";
import { UserPayload } from "../types";

export class UserService {
  /**
   * Get user profile by ID
   */
  static async getUserProfile(userId: number): Promise<UserPayload | null> {
    return await UserModel.findById(userId);
  }

  /**
   * Get user by email
   */
  static async getUserByEmail(email: string): Promise<UserPayload | null> {
    const user = await UserModel.findByEmail(email);
    if (!user) return null;

    // Convert User to UserPayload (exclude password)
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };
  }

  /**
   * Update user profile
   */
  static async updateProfile(
    userId: number,
    data: { name?: string; email?: string }
  ): Promise<UserPayload> {
    return await UserModel.update(userId, data);
  }

  /**
   * Delete user account
   */
  static async deleteAccount(userId: number): Promise<boolean> {
    try {
      await UserModel.delete(userId);
      return true;
    } catch (error) {
      return false;
    }
  }
}
