# Node.js GraphQL with TypeScript

A GraphQL API server built with Apollo Server, Prisma, and TypeScript.

## Features

- 🔒 JWT Authentication
- 🗄️ PostgreSQL database with Prisma ORM
- 🚀 Apollo Server GraphQL API
- 📝 Full TypeScript support
- 🔐 Password hashing with Argon2

## Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

## Setup

1. Install dependencies:

```bash
npm install
```

2. Set up your environment variables in `.env`:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/dbname"
JWT_SECRET="your-strong-secret-key"
```

3. Generate Prisma client:

```bash
npx prisma generate
```

4. Run database migrations:

```bash
npx prisma migrate dev
```

## Development

### Available Scripts

- `npm run dev` - Start development server with ts-node
- `npm run dev:watch` - Start development server with file watching
- `npm run build` - Build TypeScript to JavaScript
- `npm run start` - Start production server (requires build first)
- `npm run type-check` - Run TypeScript type checking
- `npm run clean` - Remove build artifacts

### Development Workflow

1. Start the development server:

```bash
npm run dev
```

2. The GraphQL playground will be available at `http://localhost:4000`

### Production Build

1. Build the project:

```bash
npm run build
```

2. Start the production server:

```bash
npm run start
```

## GraphQL API

### Mutations

- `signup(email: String!, password: String!, name: String)` - Create a new user account
- `login(email: String!, password: String!)` - Login with email and password

### Queries

- `me` - Get current authenticated user (requires Bearer token)

### Authentication

Include the JWT token in the Authorization header:

```
Authorization: Bearer your-jwt-token
```

## Project Structure

```
src/
  index.ts              # Main server file with GraphQL resolvers
  types/
    environment.d.ts    # Environment variable type definitions
prisma/
  schema.prisma         # Database schema
  migrations/           # Database migration files
dist/                   # Compiled JavaScript output
generated/prisma/       # Generated Prisma client
```

## TypeScript Configuration

The project uses strict TypeScript configuration with:

- Strong type checking enabled
- Source maps for debugging
- Declaration files generation
- Modern ES2020 target
