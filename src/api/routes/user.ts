// src/api/routes/user.ts
import { UserApiController } from "../controllers/UserApiController";

export const userResolvers = {
  Query: {
    me: UserApiController.me,
    users: UserApiController.users,
    user: UserApiController.user,
  },
  Mutation: {
    updateProfile: UserApiController.updateProfile,
    deleteAccount: UserApiController.deleteAccount,
  },
};
