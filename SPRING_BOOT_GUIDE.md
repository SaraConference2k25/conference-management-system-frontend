# Spring Boot Backend Integration Guide

## Overview
This guide helps Spring Boot developers understand the API contract expected by the Next.js frontend.

## Required API Endpoints

### 1. Authentication Endpoints

#### Register New User
**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "email": "participant@example.com",
  "password": "securePassword123",
  "fullName": "John Doe",
  "affiliation": "University Name",
  "role": "participant"
}
```

**Expected Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "participant@example.com",
  "fullName": "John Doe",
  "role": "participant",
  "message": "User registered successfully"
}
```

**Error Response (409 Conflict - Email already exists):**
```json
{
  "message": "Email already registered",
  "error": "DUPLICATE_EMAIL",
  "status": 409
}
```

**Error Response (400 Bad Request - Validation error):**
```json
{
  "message": "Invalid email format or password too short",
  "error": "VALIDATION_ERROR",
  "status": 400
}
```

#### Login User
**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "participant@example.com",
  "password": "securePassword123",
  "role": "participant"
}
```

**Expected Response (200 OK):**
```json
{
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "participant@example.com",
    "role": "participant"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Login successful"
}
```

**Error Response (401 Unauthorized):**
```json
{
  "message": "Invalid email, password, or role combination",
  "error": "INVALID_CREDENTIALS",
  "status": 401
}
```

**Error Response (400 Bad Request):**
```json
{
  "message": "Email is required",
  "error": "VALIDATION_ERROR",
  "status": 400
}
```

### 2. Current AuthController Implementation

Your provided AuthController has these endpoints:

```java
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody AuthRequest request)
    
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody AuthRequest request)
}
```

## Frontend Integration Points

### 1. Login Flow
```
User enters credentials
        ↓
Frontend validates (email, password, role)
        ↓
POST /api/auth/login
        ↓
Backend validates and returns JWT token
        ↓
Token stored in localStorage
        ↓
Redirect to role-based dashboard
```

### 2. Register Flow
```
User fills registration form
        ↓
Frontend validates form
        ↓
POST /api/auth/register
        ↓
Backend creates user and returns confirmation
        ↓
Success message shown
        ↓
Redirect to login page
```

## Important Implementation Details

### 1. CORS Configuration
Your current configuration:
```java
@CrossOrigin(origins = "*")
```

**For Production:** Change to specific domain
```java
@CrossOrigin(origins = "https://yourdomain.com")
```

### 2. JWT Token Requirements
- **Token Format:** Standard JWT format
- **Storage:** Frontend stores in localStorage
- **Usage:** Sent in Authorization header: `Bearer <token>`
- **Expiration:** Should include `expiresIn` or implement refresh tokens

### 3. Error Response Format
The frontend expects error messages in this format:

```java
{
  "message": "Human-readable error message",
  "error": "ERROR_CODE",
  "status": 400  // HTTP status code
}
```

### 4. Validation Requirements

**Email Validation:**
- Must be valid email format
- Should be unique (409 Conflict if exists)

**Password Validation:**
- Minimum 6 characters
- Should be hashed on backend

**Role Validation:**
- Accepted values: "participant", "evaluator", "admin"
- Frontend sends role in request, should validate on backend

## Expected User Properties

After login, frontend expects user object with:
```typescript
{
  id: string          // User ID
  email: string       // User email
  role: string        // User role (participant/evaluator/admin)
}
```

## Token Implementation

### JWT Token Structure
Frontend expects JWT with standard claims:
```json
{
  "sub": "550e8400-e29b-41d4-a716-446655440000",
  "email": "participant@example.com",
  "role": "participant",
  "iat": 1704207000,
  "exp": 1704293400
}
```

### Token Usage in Frontend
```javascript
// Frontend automatically adds token to requests
headers['Authorization'] = `Bearer ${token}`

// Backend should validate this in security filter
```

## Recommended Spring Boot Implementations

### 1. Basic Entity
```java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    @Column(nullable = false)
    private String password; // bcrypt hashed
    
    @Column(nullable = false)
    private String fullName;
    
    private String affiliation;
    
    @Enumerated(EnumType.STRING)
    private UserRole role;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
}
```

### 2. Exception Handling
```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ErrorResponse> handleBadRequest(BadRequestException e) {
        return ResponseEntity.status(400)
            .body(new ErrorResponse(
                e.getMessage(),
                "VALIDATION_ERROR",
                400
            ));
    }
    
    @ExceptionHandler(DuplicateKeyException.class)
    public ResponseEntity<ErrorResponse> handleDuplicate(DuplicateKeyException e) {
        return ResponseEntity.status(409)
            .body(new ErrorResponse(
                "Email already registered",
                "DUPLICATE_EMAIL",
                409
            ));
    }
}
```

### 3. Service Layer Example
```java
@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtTokenProvider tokenProvider;
    
    public AuthResponse register(AuthRequest request) {
        // Validate
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateKeyException("Email already registered");
        }
        
        // Create user
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFullName(request.getFullName());
        user.setAffiliation(request.getAffiliation());
        user.setRole(UserRole.PARTICIPANT);
        
        userRepository.save(user);
        
        return new AuthResponse(user.getId(), user.getEmail(), 
            user.getFullName(), user.getRole(), "User registered successfully");
    }
    
    public LoginResponse login(String email, String password, String role) {
        // Validate
        if (email == null || email.isBlank()) {
            throw new BadRequestException("Email is required");
        }
        
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new BadRequestException("Invalid credentials"));
        
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new BadRequestException("Invalid credentials");
        }
        
        // Verify role matches
        if (!user.getRole().toString().equals(role)) {
            throw new BadRequestException("Invalid credentials");
        }
        
        // Generate token
        String token = tokenProvider.generateToken(user);
        
        return new LoginResponse(
            new UserDTO(user.getId(), user.getEmail(), user.getRole()),
            token,
            "Login successful"
        );
    }
}
```

## Testing Integration

### 1. Manual Testing with cURL
```bash
# Register
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "fullName": "Test User",
    "affiliation": "Test University",
    "role": "participant"
  }'

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "role": "participant"
  }'
```

### 2. Testing with Frontend
1. Start Spring Boot: `mvn spring-boot:run`
2. Set Frontend API URL: `NEXT_PUBLIC_API_URL=http://localhost:8080/api`
3. Start Frontend: `npm run dev`
4. Test at `http://localhost:3000/login`

## Common Issues & Solutions

### Issue: CORS Errors
**Frontend sees:** "CORS policy: No 'Access-Control-Allow-Origin' header"
**Solution:** Ensure AuthController has `@CrossOrigin(origins = "*")`

### Issue: Token Not Included in Requests
**Frontend sees:** "401 Unauthorized"
**Solution:** Frontend includes token. Backend should verify it's present in Authorization header.

### Issue: Different Email Formats Cause Issues
**Solution:** Normalize email (lowercase) on backend before comparison

### Issue: Role Validation Failing
**Solution:** Ensure role validation is case-sensitive as "participant", "evaluator", "admin"

## Frontend Expected Behaviors

### 1. On Successful Login
- Store JWT token in localStorage
- Store user info in localStorage
- Redirect to `/dashboard` (or role-based path)
- Auto-include token in future API requests

### 2. On Failed Login
- Display error message from backend
- Keep user on login page
- Don't store token or user info

### 3. On Successful Registration
- Show success message
- Redirect to login after 2 seconds
- Clear form

### 4. On Failed Registration
- Display specific validation errors
- Keep user on registration page
- Allow form to be edited

## Next Steps

1. **Implement** your AuthService with proper validation
2. **Add** password hashing using BCrypt
3. **Implement** JWT token generation and validation
4. **Test** endpoints with the frontend
5. **Add** additional participant endpoints as needed

## Additional Frontend Features Available

Once authentication is working:

- **Protected Routes:** Wrap components with `<ProtectedRoute>`
- **User Context:** Access user info with `useAuth()`
- **API Calls:** Use `apiClient` for authenticated requests
- **Error Handling:** Built-in error handling and user feedback

See `QUICK_START.md` and `BACKEND_INTEGRATION.md` for more details.
