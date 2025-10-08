// src/server.ts
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { connectDatabase, disconnectDatabase } from "./config/database";
import { createContext } from "./middleware/auth";
import { PORT } from "./config/constants";

// Choose which API to use
import { typeDefs, resolvers } from "./api"; // New API structure
// import { typeDefs } from "./graphql/typeDefs"; // Original structure
// import { resolvers } from "./graphql/resolvers"; // Original structure

/**
 * Initialize and start the GraphQL server with new API structure
 */
async function startServer(): Promise<void> {
  try {
    // Connect to database
    await connectDatabase();

    // Create Apollo Server
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      formatError: (formattedError, error) => {
        console.error("GraphQL Error:", error);
        return {
          message: formattedError.message,
          code: formattedError.extensions?.code,
          path: formattedError.path || [],
        };
      },
    });

    // Start server
    const { url } = await startStandaloneServer(server, {
      listen: { port: PORT },
      context: createContext,
    });

    console.log(`🚀 Server ready at ${url}`);
    console.log(`📁 Using new API structure from /src/api/`);

    // Handle graceful shutdown
    process.on("SIGINT", async () => {
      console.log("\n🛑 Shutting down server gracefully...");
      await disconnectDatabase();
      process.exit(0);
    });

    process.on("SIGTERM", async () => {
      console.log("\n🛑 Shutting down server gracefully...");
      await disconnectDatabase();
      process.exit(0);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    await disconnectDatabase();
    process.exit(1);
  }
}

// Start the server
startServer();
