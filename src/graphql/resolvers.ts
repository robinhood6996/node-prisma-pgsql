// src/graphql/resolvers.ts
import { AuthController } from "../controllers/AuthController";
import { UserController } from "../controllers/UserController";

export const resolvers = {
  Query: {
    me: UserController.me,
  },

  Mutation: {
    signup: AuthController.signup,
    login: AuthController.login,
    updateProfile: UserController.updateProfile,
  },
};
