# SARA 2025 Backend-Frontend Integration Guide

## Overview
This guide provides setup and integration instructions for connecting your Next.js frontend with the Spring Boot backend for participant role management in the SARA 2025 conference platform.

## Project Structure

### Frontend Structure
```
frontend-nextjs/
├── lib/
│   ├── api.ts           # API client for backend communication
│   └── auth-context.tsx # Authentication context provider
├── components/
│   ├── LoginSection.tsx      # Login component with real API integration
│   └── RegistrationSection.tsx
├── app/
│   ├── login/page.tsx    # Login page
│   ├── register/page.tsx # Registration page
│   └── layout.tsx        # Root layout with AuthProvider
└── .env.example          # Environment variables template
```

### Backend Structure (Spring Boot)
```
src/main/java/com/saraconference/backend/
├── controller/
│   └── AuthController.java   # Authentication endpoints
├── service/
│   └── AuthService.java
├── dto/
│   ├── AuthRequest.java
│   ├── AuthResponse.java
│   ├── LoginRequest.java
│   └── LoginResponse.java
└── Exception/
    └── BadRequestException.java
```

## Setup Instructions

### 1. Backend Setup (Spring Boot)

Ensure your Spring Boot backend is running with the following endpoints:

#### POST `/api/auth/register`
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "fullName": "John Doe",
  "affiliation": "Your Institution",
  "role": "participant"
}
```

**Response:**
```json
{
  "id": "user-uuid",
  "email": "user@example.com",
  "fullName": "John Doe",
  "role": "participant",
  "message": "User registered successfully"
}
```

#### POST `/api/auth/login`
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "role": "participant"
}
```

**Response:**
```json
{
  "user": {
    "id": "user-uuid",
    "email": "user@example.com",
    "role": "participant"
  },
  "token": "jwt-token-here",
  "message": "Login successful"
}
```

### 2. Frontend Setup

#### Step 1: Environment Configuration
```bash
# Copy the environment template
cp .env.example .env.local

# Edit .env.local with your backend URL
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

#### Step 2: Install Dependencies
```bash
npm install
```

#### Step 3: Run Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## API Integration Details

### API Client (`lib/api.ts`)
The centralized API client handles:
- **Base URL Configuration**: Set via `NEXT_PUBLIC_API_URL` environment variable
- **Authentication**: JWT token management in localStorage
- **Error Handling**: Comprehensive error messages from backend
- **Request/Response**: Type-safe interfaces for all API calls

**Key Methods:**
```typescript
// Register a new user
apiClient.register(data: RegisterRequest): Promise<AuthResponse>

// Login user
apiClient.login(email: string, password: string, role: string): Promise<LoginResponse>

// Logout
apiClient.logout(): Promise<void>

// Token Management
apiClient.getAuthToken(): string | null
apiClient.setAuthToken(token: string): void
apiClient.isAuthenticated(): boolean
```

### Authentication Context (`lib/auth-context.tsx`)
Provides global auth state management:
```typescript
const { user, isLoading, isAuthenticated, login, register, logout } = useAuth()
```

**Features:**
- Persistent authentication state
- Loading states during API calls
- User information storage
- Automatic token management
- Role-based redirects

## Component Integration

### LoginSection Component
**Features:**
- Real backend API integration
- Email and password validation
- Role selection (Participant, Evaluator, Admin)
- Consistent loading states with spinner
- Error message display
- Role-based redirect after successful login
- Remember me functionality

**Usage:**
```tsx
import LoginSection from '@/components/LoginSection'

export default function LoginPage() {
  return <LoginSection />
}
```

### Register Page
**Features:**
- Real backend registration
- Form validation
- Password confirmation matching
- Terms and conditions acceptance
- Consistent loading states
- Success notification with redirect

## Loading States

All components use consistent loading indicators:
- **Button State**: Disabled with spinner during API calls
- **Text**: Changes from "Sign In" to "Signing In..." 
- **Visual Feedback**: Animated spinner icon

```tsx
{isLoading || authLoading ? (
  <span className="flex items-center justify-center gap-2">
    <svg className="animate-spin h-5 w-5">...</svg>
    Signing In...
  </span>
) : (
  'Sign In to Portal'
)}
```

## Error Handling

The application handles various error scenarios:

1. **Network Errors**: "Network error - please check your connection"
2. **Validation Errors**: Server-provided error messages displayed
3. **Authentication Errors**: "Invalid credentials"
4. **Server Errors**: Backend error messages propagated to user

Example error handling in components:
```tsx
try {
  await login(email, password, role)
} catch (err: any) {
  const errorMessage = err?.data?.message || err?.message || 'Login failed'
  setError(errorMessage)
}
```

## CORS Configuration

Backend CORS is configured in AuthController:
```java
@CrossOrigin(origins = "*")
```

For production, update to specific frontend URL:
```java
@CrossOrigin(origins = "https://yourdomain.com")
```

## Token Management

Tokens are stored in localStorage:
```typescript
// Token is automatically stored after login
localStorage.setItem('auth_token', response.token)

// Token is retrieved for authenticated requests
const token = localStorage.getItem('auth_token')

// Token is cleared on logout
localStorage.removeItem('auth_token')
```

Add token to API requests in the Authorization header:
```typescript
headers['Authorization'] = `Bearer ${token}`
```

## Redirect Logic After Authentication

### Login Redirect
```typescript
const redirectPath = {
  participant: '/dashboard',
  evaluator: '/evaluator-dashboard',
  admin: '/admin-dashboard',
}[role] || '/'

router.push(redirectPath)
```

### Register Redirect
After successful registration, user is redirected to login page:
```typescript
router.push('/login?registered=true')
```

## Security Best Practices

1. **Never expose sensitive data** in environment variables sent to frontend
2. **Use HTTPS in production** for all API communication
3. **Validate all inputs** on both frontend and backend
4. **Use secure JWT tokens** with appropriate expiration
5. **Implement CSRF protection** for state-changing operations
6. **Sanitize error messages** to avoid information leakage

## Troubleshooting

### Issue: "API connection failed"
**Solution:**
1. Check backend is running on the correct port
2. Verify `NEXT_PUBLIC_API_URL` is correct
3. Check browser console for detailed error
4. Verify CORS is enabled on backend

### Issue: "Token not persisting"
**Solution:**
1. Ensure localStorage is enabled
2. Check browser console for storage errors
3. Verify token is returned from backend

### Issue: "Login successful but not redirecting"
**Solution:**
1. Verify role is correctly returned from backend
2. Check that dashboard pages exist
3. Verify router configuration

## Production Deployment

### Environment Variables
Set in your hosting platform:
```
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
```

### Build
```bash
npm run build
```

### Start
```bash
npm start
```

## Additional Features to Implement

1. **Password Reset**: Add `/api/auth/forgot-password` endpoint
2. **Email Verification**: Verify email before account activation
3. **Token Refresh**: Implement token refresh mechanism
4. **MFA**: Multi-factor authentication
5. **OAuth**: Social login integration
6. **Profile Management**: User profile update endpoints

## Support & Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8949)
