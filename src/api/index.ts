// src/api/index.ts
import { typeDefs } from "./schema";
import { apiResolvers } from "./routes";

export { typeDefs, apiResolvers as resolvers };

// Export controllers for direct use if needed
export * from "./controllers";
export * from "./middleware";
