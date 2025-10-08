// src/graphql/typeDefs.ts
export const typeDefs = `#graphql
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
    updateProfile(name: String, email: String): User!
  }
`;
