# Quick Start Guide - Backend Frontend Integration

## 5 Minute Setup

### Step 1: Copy Environment File
```bash
cp .env.example .env.local
```

### Step 2: Configure Backend URL
Edit `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### Step 3: Start Frontend
```bash
npm install
npm run dev
```

Visit: `http://localhost:3000`

### Step 4: Test Login
The frontend is now connected to your Spring Boot backend.

**Login form will:**
- ✅ Send credentials to `POST /api/auth/login`
- ✅ Store JWT token in localStorage
- ✅ Redirect based on user role
- ✅ Display loading states during requests
- ✅ Show error messages from backend

## Key Files

| File | Purpose |
|------|---------|
| `lib/api.ts` | API client & HTTP requests |
| `lib/auth-context.tsx` | Authentication state management |
| `components/LoginSection.tsx` | Login UI component |
| `app/register/page.tsx` | Registration page |
| `lib/config.ts` | Configuration & constants |
| `lib/types/auth.ts` | TypeScript type definitions |

## Common Tasks

### Use Authentication in a Component
```tsx
'use client'
import { useAuth } from '@/lib/auth-context'

export default function MyComponent() {
  const { user, logout } = useAuth()
  
  return (
    <div>
      <p>Welcome, {user?.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
```

### Protect a Route
```tsx
import { ProtectedRoute } from '@/lib/components/ProtectedRoute'

export default function AdminPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <h1>Admin Dashboard</h1>
    </ProtectedRoute>
  )
}
```

### Make API Calls
```tsx
import { apiClient } from '@/lib/api'

// After login, token is automatically included
const response = await apiClient.login(email, password, role)
```

## Troubleshooting

### Backend Connection Issues
1. Check backend is running: `http://localhost:8080`
2. Check API URL in `.env.local`
3. Open browser console for error details

### Login Not Working
1. Verify credentials are correct
2. Check backend logs for errors
3. Ensure role matches backend requirements

### CORS Errors
1. Verify `@CrossOrigin(origins = "*")` in AuthController
2. In production, set specific origin instead of "*"

## Next Steps

1. **Implement Dashboard** - Create role-specific dashboards
2. **Add Protected Routes** - Wrap pages with ProtectedRoute
3. **Implement Features** - Paper submission, evaluations, etc.
4. **Production Deploy** - Set real API URL for production

See `BACKEND_INTEGRATION.md` for detailed documentation.
