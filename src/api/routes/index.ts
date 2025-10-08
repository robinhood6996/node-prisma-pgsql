// src/api/routes/index.ts
import { authResolvers } from "./auth";
import { userResolvers } from "./user";

// Combine all route resolvers
export const apiResolvers = {
  Query: {
    ...userResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...userResolvers.Mutation,
  },
};
