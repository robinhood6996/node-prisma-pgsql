// src/config/constants.ts
export const JWT_SECRET =
  process.env.JWT_SECRET || "change_this_to_a_strong_secret";
export const ACCESS_TOKEN_EXPIRES_IN = "15m";
export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 4000;
