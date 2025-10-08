// src/models/User.ts
import { prisma } from "../config/database";
import { User, UserPayload } from "../types";

export class UserModel {
  /**
   * Find user by email
   */
  static async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  /**
   * Find user by ID
   */
  static async findById(id: number): Promise<UserPayload | null> {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  /**
   * Create new user
   */
  static async create(data: {
    email: string;
    password: string;
    name?: string;
  }): Promise<User> {
    return await prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        name: data.name ?? null,
      },
    });
  }

  /**
   * Update user
   */
  static async update(
    id: number,
    data: Partial<Pick<User, "email" | "name">>
  ): Promise<User> {
    return await prisma.user.update({
      where: { id },
      data,
    });
  }

  /**
   * Delete user
   */
  static async delete(id: number): Promise<User> {
    return await prisma.user.delete({
      where: { id },
    });
  }

  /**
   * Check if email exists
   */
  static async emailExists(email: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });
    return !!user;
  }
}
