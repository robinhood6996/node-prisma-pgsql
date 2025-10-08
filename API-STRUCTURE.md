# API Directory Structure

This document explains the new API-focused directory structure that separates all API-related functionality into a dedicated `/src/api/` directory.

## 📁 **New Directory Structure**

```
src/
├── api/                          # 🎯 Dedicated API Directory
│   ├── controllers/              # API-specific controllers
│   │   ├── AuthApiController.ts  # Enhanced auth with validation
│   │   ├── UserApiController.ts  # Enhanced user operations
│   │   └── index.ts             # Controller exports
│   ├── middleware/              # API middleware
│   │   ├── validation.ts        # Input validation
│   │   ├── errorHandler.ts      # Error handling
│   │   └── index.ts            # Middleware exports
│   ├── routes/                  # GraphQL route organization
│   │   ├── auth.ts             # Authentication routes
│   │   ├── user.ts             # User routes
│   │   └── index.ts            # Combined resolvers
│   ├── schema/                  # GraphQL schema organization
│   │   ├── types/              # Schema type definitions
│   │   │   ├── base.ts         # Base types & scalars
│   │   │   ├── auth.ts         # Auth-related types
│   │   │   └── user.ts         # User-related types
│   │   └── index.ts            # Combined schema
│   └── index.ts                # Main API exports
├── config/                      # Configuration
├── controllers/                 # Original controllers (legacy)
├── models/                      # Data models
├── services/                    # Business logic
├── middleware/                  # Original middleware
├── graphql/                     # Original GraphQL (legacy)
├── types/                       # TypeScript types
├── index.ts                     # Original server (legacy)
└── server.ts                    # 🆕 New API server
```

## 🚀 **How to Use**

### **Start the New API Server**
```bash
# Development with new API structure
npm run dev:api

# Development with file watching
npm run dev:api:watch

# Original server (for comparison)
npm run dev
```

### **Access the APIs**
- **New API Server**: `http://localhost:4000` (using `/src/api/` structure)
- **Original Server**: `http://localhost:4000` (using original structure)

## 🎯 **API Features & Enhancements**

### **Enhanced Authentication**
- ✅ **Input Validation** - Email format, password strength
- ✅ **Better Error Handling** - Structured error responses
- ✅ **Enhanced Response** - Returns both token and user data
- ✅ **Refresh Token** - New endpoint for token refresh

### **Enhanced User Management**
- ✅ **Profile Operations** - Get, update, delete profile
- ✅ **User Queries** - Get user by ID, list users
- ✅ **Input Validation** - Email and name validation
- ✅ **Authentication Required** - All operations protected

### **Improved Error Handling**
- ✅ **Structured Errors** - Proper GraphQL error codes
- ✅ **Validation Errors** - Clear validation messages
- ✅ **Authentication Errors** - Proper 401 responses
- ✅ **Not Found Errors** - 404 responses for missing resources

## 📋 **API Endpoints**

### **Authentication APIs** (`/src/api/routes/auth.ts`)

#### **1. Enhanced Signup**
```graphql
mutation Signup {
  signup(email: "user@example.com", password: "SecurePass123", name: "John Doe") {
    accessToken
    user {
      id
      email
      name
      createdAt
    }
  }
}
```

**Features:**
- Email format validation
- Password strength validation (8+ chars, uppercase, lowercase, number)
- Returns both token and user data

#### **2. Enhanced Login**
```graphql
mutation Login {
  login(email: "user@example.com", password: "SecurePass123") {
    accessToken
    user {
      id
      email
      name
      createdAt
    }
  }
}
```

**Features:**
- Input validation
- Returns both token and user data

#### **3. New: Refresh Token**
```graphql
mutation RefreshToken {
  refreshToken {
    accessToken
    user {
      id
      email
      name
      createdAt
    }
  }
}
```

**Requirements:** Valid Authorization header

### **User APIs** (`/src/api/routes/user.ts`)

#### **1. Get Current User**
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

#### **2. New: Get All Users**
```graphql
query Users {
  users {
    id
    email
    name
    createdAt
  }
}
```

#### **3. New: Get User by ID**
```graphql
query GetUser {
  user(id: 1) {
    id
    email
    name
    createdAt
  }
}
```

#### **4. Enhanced Update Profile**
```graphql
mutation UpdateProfile {
  updateProfile(name: "New Name", email: "new@example.com") {
    id
    email
    name
    createdAt
  }
}
```

**Features:**
- Email format validation
- Name validation (non-empty)

#### **5. New: Delete Account**
```graphql
mutation DeleteAccount {
  deleteAccount
}
```

## 🛡️ **Security & Validation**

### **Input Validation** (`/src/api/middleware/validation.ts`)
- **Email Validation**: Proper email format
- **Password Validation**: 8+ chars, uppercase, lowercase, number
- **Name Validation**: Non-empty strings
- **Authentication Checks**: Ensure user is logged in

### **Error Handling** (`/src/api/middleware/errorHandler.ts`)
- **Structured Responses**: Proper GraphQL error codes
- **Security**: No sensitive data in error messages
- **Logging**: Server-side error logging

## 🏗️ **Architecture Benefits**

### **1. Separation of Concerns**
- **API Layer**: All API logic in `/src/api/`
- **Business Layer**: Core logic in `/src/services/`
- **Data Layer**: Database operations in `/src/models/`

### **2. Modular Organization**
- **Route-based**: Separate files for auth and user routes
- **Type-based**: Separate schema files by feature
- **Controller-based**: API-specific controllers with validation

### **3. Enhanced Maintainability**
- **Feature Organization**: Easy to find and modify API features
- **Clear Dependencies**: API layer depends on business layer
- **Testable**: Each layer can be tested independently

### **4. Scalability**
- **Easy Extensions**: Add new API features following same pattern
- **Version Control**: Can maintain multiple API versions
- **Performance**: Organized imports and lazy loading

## 🔄 **Migration Path**

### **Current Options**
1. **Use New API**: `npm run dev:api` (recommended)
2. **Use Original**: `npm run dev` (legacy support)
3. **Side-by-side**: Both structures exist for comparison

### **Recommended Approach**
1. Test new API endpoints using `npm run dev:api`
2. Verify all functionality works as expected
3. Switch to new API for development
4. Eventually remove legacy structure

## 📚 **Development Guidelines**

### **Adding New API Features**
1. **Schema**: Add types in `/src/api/schema/types/`
2. **Routes**: Add resolvers in `/src/api/routes/`
3. **Controllers**: Add API controllers in `/src/api/controllers/`
4. **Validation**: Add validation rules in `/src/api/middleware/`

### **File Naming Conventions**
- **Controllers**: `FeatureApiController.ts`
- **Routes**: `feature.ts`
- **Schema Types**: `feature.ts`
- **Middleware**: `featureName.ts`

### **Code Organization**
- **API Layer**: Input validation, error handling, response formatting
- **Service Layer**: Business logic, complex operations
- **Model Layer**: Database operations, data validation

This new API structure provides a clean, scalable, and maintainable foundation for your GraphQL API! 🎉