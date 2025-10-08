// src/api/schema/types/user.ts
export const userTypeDefs = `#graphql
  type User {
    id: Int!
    email: String!
    name: String
    createdAt: String!
    updatedAt: String!
  }

  extend type Query {
    me: User
    users: [User!]!
    user(id: Int!): User
  }

  extend type Mutation {
    updateProfile(name: String, email: String): User!
    deleteAccount: Boolean!
  }
`;