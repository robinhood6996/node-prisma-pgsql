// src/api/routes/auth.ts
import { AuthApiController } from "../controllers/AuthApiController";

export const authResolvers = {
  Mutation: {
    signup: AuthApiController.signup,
    login: AuthApiController.login,
    refreshToken: AuthApiController.refreshToken,
  },
};