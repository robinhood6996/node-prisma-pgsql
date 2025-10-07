// src/index.ts
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";

// Type definitions
interface Context {
  user: { id: number } | null;
}

interface SignupArgs {
  email: string;
  password: string;
  name?: string;
}

interface LoginArgs {
  email: string;
  password: string;
}

interface AuthPayload {
  accessToken: string;
}

interface UserPayload {
  id: number;
  email: string;
  name: string | null;
  createdAt: Date;
}

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "change_this_to_a_strong_secret";
const ACCESS_TOKEN_EXPIRES_IN = "15m"; // short-lived

const typeDefs = `#graphql
  type User {
    id: Int!
    email: String!
    name: String
    createdAt: String
  }

  type AuthPayload {
    accessToken: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    signup(email: String!, password: String!, name: String): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
`;

const resolvers = {
  Query: {
    me: async (
      _: unknown,
      __: unknown,
      ctx: Context
    ): Promise<UserPayload | null> => {
      if (!ctx.user) throw new Error("Not authenticated");
      return prisma.user.findUnique({ where: { id: ctx.user.id } });
    },
  },

  Mutation: {
    signup: async (
      _: unknown,
      { email, password, name }: SignupArgs
    ): Promise<AuthPayload> => {
      const hashed = await argon2.hash(password);
      const user = await prisma.user.create({
        data: { email, password: hashed, name },
      });
      const accessToken = jwt.sign({ id: user.id }, JWT_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
      });
      return { accessToken };
    },

    login: async (
      _: unknown,
      { email, password }: LoginArgs
    ): Promise<AuthPayload> => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) throw new Error("Invalid credentials");
      const valid = await argon2.verify(user.password, password);
      if (!valid) throw new Error("Invalid credentials");

      const accessToken = jwt.sign({ id: user.id }, JWT_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
      });
      return { accessToken };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

(async (): Promise<void> => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }): Promise<Context> => {
      // read token from Authorization header: "Bearer <token>"
      const auth = req.headers.authorization || "";
      const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
      if (!token) return { user: null };
      try {
        const payload = jwt.verify(token, JWT_SECRET);
        if (
          typeof payload === "object" &&
          payload !== null &&
          "id" in payload
        ) {
          const jwtPayload = payload as jwt.JwtPayload & { id: number };
          return { user: { id: jwtPayload.id } };
        }
        return { user: null };
      } catch (err) {
        return { user: null };
      }
    },
  });

  console.log(`🚀 Server ready at ${url}`);
})();
