// src/types/index.ts
export interface Context {
  user: { id: number } | null;
}

export interface SignupArgs {
  email: string;
  password: string;
  name?: string;
}

export interface LoginArgs {
  email: string;
  password: string;
}

export interface AuthPayload {
  accessToken: string;
  user?: UserPayload;
}

export interface UserPayload {
  id: number;
  email: string;
  name: string | null;
  createdAt: Date;
}

export interface User {
  id: number;
  email: string;
  password: string;
  name: string | null;
  createdAt: Date;
}

export interface EnhancedAuthPayload {
  accessToken: string;
  user: UserPayload;
}
