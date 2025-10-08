// src/middleware/auth.ts
import { AuthService } from "../services/AuthService";
import { Context } from "../types";

export const createContext = async ({
  req,
}: {
  req: any;
}): Promise<Context> => {
  // Extract token from Authorization header: "Bearer <token>"
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;

  if (!token) {
    return { user: null };
  }

  // Verify token and get user info
  const user = AuthService.verifyToken(token);
  return { user };
};
