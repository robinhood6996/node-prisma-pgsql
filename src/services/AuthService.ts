// src/services/AuthService.ts
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import { UserModel } from "../models/User";
import { JWT_SECRET, ACCESS_TOKEN_EXPIRES_IN } from "../config/constants";
import { AuthPayload, SignupArgs, LoginArgs } from "../types";

export class AuthService {
  /**
   * Hash password using Argon2
   */
  static async hashPassword(password: string): Promise<string> {
    return await argon2.hash(password);
  }

  /**
   * Verify password using Argon2
   */
  static async verifyPassword(
    hashedPassword: string,
    password: string
  ): Promise<boolean> {
    return await argon2.verify(hashedPassword, password);
  }

  /**
   * Generate JWT token
   */
  static generateToken(userId: number): string {
    return jwt.sign({ id: userId }, JWT_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });
  }

  /**
   * Verify JWT token
   */
  static verifyToken(token: string): { id: number } | null {
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      if (typeof payload === "object" && payload !== null && "id" in payload) {
        const jwtPayload = payload as jwt.JwtPayload & { id: number };
        return { id: jwtPayload.id };
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Register new user
   */
  static async signup(args: SignupArgs): Promise<AuthPayload> {
    const { email, password, name } = args;

    // Check if user already exists
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // Hash password
    const hashedPassword = await this.hashPassword(password);

    // Create user
    const userData: {
      email: string;
      password: string;
      name?: string;
    } = {
      email,
      password: hashedPassword,
    };

    if (name !== undefined) {
      userData.name = name;
    }

    const user = await UserModel.create(userData);

    // Generate token
    const accessToken = this.generateToken(user.id);

    return { accessToken };
  }

  /**
   * Login user
   */
  static async login(args: LoginArgs): Promise<AuthPayload> {
    const { email, password } = args;

    // Find user
    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Verify password
    const isValidPassword = await this.verifyPassword(user.password, password);
    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }

    // Generate token
    const accessToken = this.generateToken(user.id);

    return { accessToken };
  }
}
