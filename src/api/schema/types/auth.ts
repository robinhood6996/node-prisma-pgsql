// src/api/schema/types/auth.ts
export const authTypeDefs = `#graphql
  type AuthPayload {
    accessToken: String!
    user: User!
  }

  extend type Mutation {
    signup(email: String!, password: String!, name: String): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    refreshToken: AuthPayload!
  }
`;