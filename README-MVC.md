# Node.js GraphQL API with MVC Architecture

A scalable GraphQL API server built with Apollo Server, Prisma, TypeScript, and following the MVC (Model-View-Controller) architectural pattern.

## 🏗️ **Architecture Overview**

This project follows the **MVC Pattern** with a clear separation of concerns:

```
src/
├── config/           # Configuration files
│   ├── database.ts   # Database connection and setup
│   └── constants.ts  # Environment variables and constants
├── controllers/      # Controllers (Handle request/response logic)
│   ├── AuthController.ts
│   └── UserController.ts
├── models/          # Models (Data access layer)
│   └── User.ts
├── services/        # Services (Business logic)
│   ├── AuthService.ts
│   └── UserService.ts
├── graphql/         # GraphQL schema and resolvers
│   ├── typeDefs.ts
│   └── resolvers.ts
├── middleware/      # Middleware functions
│   └── auth.ts
├── types/          # TypeScript type definitions
│   ├── index.ts
│   └── environment.d.ts
└── index.ts        # Application entry point
```

## 🎯 **MVC Components**

### **Models** (`src/models/`)

- **Purpose**: Data access layer, database operations
- **Responsibilities**: CRUD operations, data validation, database queries
- **Example**: `UserModel.findByEmail()`, `UserModel.create()`

### **Services** (`src/services/`)

- **Purpose**: Business logic layer
- **Responsibilities**: Complex business rules, data processing, external API calls
- **Example**: `AuthService.signup()`, `AuthService.hashPassword()`

### **Controllers** (`src/controllers/`)

- **Purpose**: Handle requests and coordinate between services
- **Responsibilities**: Input validation, calling services, formatting responses
- **Example**: `AuthController.signup()`, `UserController.me()`

### **Views** (`src/graphql/`)

- **Purpose**: GraphQL schema and resolvers (API interface)
- **Responsibilities**: Define API structure, map controllers to GraphQL operations

## 🚀 **Features**

- ✅ **MVC Architecture** - Clean separation of concerns
- ✅ **JWT Authentication** with secure token handling
- ✅ **Password Hashing** with Argon2
- ✅ **PostgreSQL Database** with Prisma ORM
- ✅ **TypeScript** for full type safety
- ✅ **GraphQL API** with Apollo Server
- ✅ **Error Handling** with proper error propagation
- ✅ **Database Connection Management** with graceful shutdown
- ✅ **Environment Configuration** management

## 📋 **API Endpoints**

### **Mutations**

#### 1. **User Signup**

```graphql
mutation Signup {
  signup(
    email: "user@example.com"
    password: "securepassword"
    name: "John Doe"
  ) {
    accessToken
  }
}
```

#### 2. **User Login**

```graphql
mutation Login {
  login(email: "user@example.com", password: "securepassword") {
    accessToken
  }
}
```

#### 3. **Update Profile** (Requires Authentication)

```graphql
mutation UpdateProfile {
  updateProfile(name: "New Name", email: "newemail@example.com") {
    id
    email
    name
    createdAt
  }
}
```

### **Queries**

#### 1. **Get Current User** (Requires Authentication)

```graphql
query Me {
  me {
    id
    email
    name
    createdAt
  }
}
```

## 🛠️ **Setup & Installation**

### **Prerequisites**

- Node.js 18+
- PostgreSQL database
- npm or yarn

### **Installation Steps**

1. **Clone and install dependencies:**

```bash
git clone <repository-url>
cd node-pg-gql
npm install
```

2. **Environment Setup:**
   Create `.env` file:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/dbname"
JWT_SECRET="your-super-secure-secret-key"
PORT=4000
```

3. **Database Setup:**

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Seed database
npx prisma db seed
```

4. **Start Development Server:**

```bash
npm run dev
```

## 🎮 **Development Scripts**

```bash
# Development
npm run dev              # Start development server with hot reload
npm run dev:watch        # Start with file watching

# Production
npm run build           # Compile TypeScript to JavaScript
npm run start           # Start production server

# Utilities
npm run type-check      # Type checking without build
npm run clean           # Remove build artifacts

# Database
npx prisma generate     # Generate Prisma client
npx prisma migrate dev  # Run database migrations
npx prisma studio       # Open Prisma Studio (Database GUI)
```

## 🧪 **Testing the API**

### **1. Access GraphQL Playground**

Visit: `http://localhost:4000`

### **2. Test User Registration**

```graphql
mutation {
  signup(
    email: "test@example.com"
    password: "password123"
    name: "Test User"
  ) {
    accessToken
  }
}
```

### **3. Test User Login**

```graphql
mutation {
  login(email: "test@example.com", password: "password123") {
    accessToken
  }
}
```

### **4. Test Authenticated Requests**

1. Copy the `accessToken` from signup/login response
2. Add to HTTP Headers in GraphQL Playground:

```json
{
  "Authorization": "Bearer YOUR_ACCESS_TOKEN_HERE"
}
```

3. Run authenticated queries:

```graphql
query {
  me {
    id
    email
    name
    createdAt
  }
}
```

## 🏢 **MVC Benefits in This Project**

### **1. Separation of Concerns**

- **Models**: Handle all database operations
- **Services**: Contain business logic and complex operations
- **Controllers**: Coordinate between layers and handle GraphQL context
- **Views**: GraphQL schema defines the API interface

### **2. Maintainability**

- Easy to locate and modify specific functionality
- Clear responsibility boundaries
- Easier testing and debugging

### **3. Scalability**

- New features can be added following the same pattern
- Easy to extend with new models, services, and controllers
- Database changes isolated in models

### **4. Testability**

- Each layer can be tested independently
- Mock dependencies easily
- Business logic separated from API logic

## 🔒 **Security Features**

- **Password Hashing**: Argon2 for secure password storage
- **JWT Tokens**: Stateless authentication with configurable expiry
- **Input Validation**: GraphQL schema validation
- **Error Handling**: Sanitized error messages
- **Database Security**: Parameterized queries via Prisma

## 📖 **Project Structure Explanation**

### **Entry Point** (`src/index.ts`)

- Initializes the server
- Sets up database connection
- Configures Apollo Server
- Handles graceful shutdown

### **Configuration** (`src/config/`)

- Centralizes all configuration
- Environment variable management
- Database connection setup

### **Data Layer** (`src/models/`)

- Direct database interactions
- CRUD operations
- Data validation at database level

### **Business Layer** (`src/services/`)

- Authentication logic
- Password hashing/verification
- JWT token management
- Complex business rules

### **API Layer** (`src/controllers/` + `src/graphql/`)

- Request handling
- Response formatting
- GraphQL resolver coordination

This MVC architecture makes the codebase more organized, maintainable, and scalable for future development! 🎉
