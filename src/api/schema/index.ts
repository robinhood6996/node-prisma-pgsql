// src/api/schema/index.ts
import { baseTypeDefs } from "./types/base";
import { authTypeDefs } from "./types/auth";
import { userTypeDefs } from "./types/user";

// Combine all type definitions
export const typeDefs = [
  baseTypeDefs,
  authTypeDefs,
  userTypeDefs,
];