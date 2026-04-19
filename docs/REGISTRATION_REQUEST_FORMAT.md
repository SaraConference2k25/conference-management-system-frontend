# Registration Request Format

## What Gets Sent to Backend During Registration

When a user registers through the frontend, the following JSON is sent to `POST /api/auth/register`:

```json
{
  "email": "participant@example.com",
  "password": "securePassword123",
  "fullName": "John Doe",
  "affiliation": "University Name",
  "role": "PARTICIPANT"
}
```

## Key Points

✅ **Role is always "PARTICIPANT"** (uppercase)
- Automatically set by the auth-context
- User cannot change this during registration
- Default role for all new registrations

✅ **Email** - User provides
- Must be unique
- Valid email format

✅ **Password** - User provides
- Minimum 6 characters (validated on frontend)
- Should be hashed on backend with BCrypt

✅ **Full Name** - User provides
- Required field

✅ **Affiliation** - User provides (optional)
- User's organization/institution name

## Backend Endpoint

```java
@PostMapping("/register")
public ResponseEntity<AuthResponse> register(@RequestBody AuthRequest request) {
    // request.getRole() will be "PARTICIPANT"
}
```

## Expected Backend Response (200 OK)

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "participant@example.com",
  "fullName": "John Doe",
  "role": "PARTICIPANT",
  "message": "User registered successfully"
}
```

## Error Response (409 Conflict - Email Already Exists)

```json
{
  "message": "Email already registered",
  "error": "DUPLICATE_EMAIL",
  "status": 409
}
```

## Testing the Registration

### cURL Example
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "password123",
    "fullName": "New User",
    "affiliation": "Test University",
    "role": "PARTICIPANT"
  }'
```

### Frontend URL
`http://localhost:3000/register`

## Code Reference

**File:** `lib/auth-context.tsx` (Line 62)
```typescript
const register = async (email: string, password: string, fullName: string, affiliation?: string) => {
  // ...
  const response = await apiClient.register({
    email,
    password,
    fullName,
    affiliation,
    role: 'PARTICIPANT', // ← Always set to PARTICIPANT
  })
}
```

**File:** `lib/config.ts`
```typescript
export const USER_ROLES = {
  PARTICIPANT: 'PARTICIPANT',
  EVALUATOR: 'EVALUATOR',
  ADMIN: 'ADMIN',
} as const
```

## How to Use the Constants

```typescript
import { USER_ROLES } from '@/lib/config'

// In your code
const role = USER_ROLES.PARTICIPANT  // "PARTICIPANT"
```

## Summary

- ✅ Role is **always "PARTICIPANT"** when registering
- ✅ User cannot select different roles during registration
- ✅ Role selection is only available during login
- ✅ Uppercase format matches backend expectations
