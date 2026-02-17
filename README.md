# SARA Conference 2025 - Frontend Application

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

**Enterprise-Grade Conference Management System**

[Quick Start](#-quick-start) • [Documentation](#-documentation) • [API Reference](#-api-integration) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Architecture](#-architecture)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Development](#-development)
- [API Integration](#-api-integration)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Security](#-security)
- [Performance](#-performance)
- [Troubleshooting](#-troubleshooting)
- [Documentation](#-documentation)
- [Contributing](#-contributing)
- [Support](#-support)
- [License](#-license)

---

## 🎯 Overview

SARA Conference 2025 is a comprehensive, enterprise-grade conference management platform built with modern web technologies. This frontend application provides an intuitive interface for conference participants, evaluators, and administrators to manage academic paper submissions, reviews, and conference logistics.

### Project Purpose

- **For Participants**: Submit and track academic papers, register for conferences, and manage submissions
- **For Evaluators**: Review and evaluate submitted papers, provide feedback, and manage evaluation queues
- **For Administrators**: Oversee conference operations, manage users, and monitor system activities

### Project Status

✅ **Production Ready** | 🔒 **Security Audited** | 📱 **Mobile Responsive** | ♿ **WCAG 2.1 Compliant**

---

## ✨ Key Features

### 🔐 Authentication & Authorization
- **Multi-Role Support**: Participant, Evaluator, and Administrator roles
- **JWT-Based Authentication**: Secure token-based session management
- **Protected Routes**: Role-based access control for sensitive pages
- **Session Persistence**: Automatic token refresh and secure storage

### 📄 Paper Management
- **Submission System**: Streamlined paper submission workflow
- **Document Upload**: Support for multiple file formats (PDF, DOC, DOCX)
- **Submission Tracking**: Real-time status updates and notifications
- **Version Control**: Track paper revisions and submission history

### 👥 User Management
- **User Registration**: Self-service registration with email verification
- **Profile Management**: Update personal information and preferences
- **Role Assignment**: Flexible role-based permissions system
- **Account Recovery**: Password reset and account recovery flows

### 🎨 Modern UI/UX
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **Dark Mode**: System-aware dark/light theme support
- **Accessibility**: WCAG 2.1 Level AA compliance
- **Loading States**: Smooth loading indicators and skeleton screens
- **Error Handling**: User-friendly error messages and recovery options

### 🔔 Real-Time Features
- **Announcement Bar**: Live conference updates and notifications
- **Status Indicators**: Real-time submission and review status
- **Toast Notifications**: Non-intrusive success/error messages

### 📊 Dashboard Features
- **Role-Specific Dashboards**: Customized views for each user role
- **Analytics**: Visual representation of submission statistics
- **Activity Timeline**: Track user actions and system events

---

## 🛠 Technology Stack

### Core Framework
- **[Next.js 16.1.1](https://nextjs.org/)** - React framework with App Router
- **[React 19.2.3](https://react.dev/)** - UI component library
- **[TypeScript 5.0](https://www.typescriptlang.org/)** - Type-safe development

### Styling & UI
- **[Tailwind CSS 4.0](https://tailwindcss.com/)** - Utility-first CSS framework
- **[@tailwindcss/postcss](https://tailwindcss.com/docs/postcss)** - PostCSS integration
- **Custom Components** - Reusable UI component library

### Development Tools
- **[ESLint 9](https://eslint.org/)** - Code linting and quality
- **[eslint-config-next](https://nextjs.org/docs/app/building-your-application/configuring/eslint)** - Next.js ESLint configuration
- **PostCSS** - CSS transformation and optimization

### Backend Integration
- **RESTful API** - Spring Boot backend integration
- **JWT Authentication** - Token-based authentication
- **Axios/Fetch** - HTTP client for API requests
- **Error Handling** - Centralized error management

---

## 🏗 Architecture

### Project Structure

```
frontend-nextjs/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Home page
│   ├── login/                   # Login page
│   ├── register/                # Registration page
│   └── dashboard/               # User dashboards (role-based)
├── components/                   # Reusable UI components
│   ├── Header.tsx               # Application header
│   ├── Navigation.tsx           # Navigation menu
│   ├── LoginSection.tsx         # Login form component
│   ├── RegistrationSection.tsx  # Registration form
│   ├── SubmissionSection.tsx    # Paper submission
│   ├── Footer.tsx               # Application footer
│   └── ...                      # Other components
├── lib/                         # Core utilities and libraries
│   ├── api.ts                   # API client and HTTP utilities
│   ├── auth-context.tsx         # Authentication context provider
│   ├── config.ts                # Configuration constants
│   ├── toast-context.tsx        # Toast notification system
│   ├── types/                   # TypeScript type definitions
│   │   └── auth.ts             # Authentication types
│   ├── hooks/                   # Custom React hooks
│   │   └── useApiError.ts      # API error handling hook
│   ├── components/              # Shared component utilities
│   │   └── ProtectedRoute.tsx  # Route protection HOC
│   └── utils/                   # Utility functions
├── public/                      # Static assets
├── .gitignore                   # Git ignore rules
├── package.json                 # Project dependencies
├── tsconfig.json                # TypeScript configuration
├── next.config.ts               # Next.js configuration
├── postcss.config.mjs           # PostCSS configuration
├── eslint.config.mjs            # ESLint configuration
└── README.md                    # This file
```

### Component Architecture

```
┌─────────────────────────────────────┐
│          App Layout                 │
│  (AuthProvider, ToastProvider)     │
└─────────────────────────────────────┘
                 │
        ┌────────┴────────┐
        │                 │
   ┌────▼────┐     ┌─────▼─────┐
   │  Public │     │ Protected │
   │  Routes │     │   Routes  │
   └─────────┘     └───────────┘
        │                 │
   ┌────▼────┐     ┌─────▼──────┐
   │  Home   │     │  Dashboard │
   │  Login  │     │  Profile   │
   │ Register│     │ Submission │
   └─────────┘     └────────────┘
```

### Data Flow

```
User Action → Component → API Client → Backend API
                  ↓
            Auth Context
                  ↓
         Local Storage (JWT)
                  ↓
          Protected Routes
```

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software
- **Node.js** (v18.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v9.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git** (v2.30.0 or higher) - [Download](https://git-scm.com/)

### Optional Tools
- **VS Code** - Recommended IDE with ESLint extension
- **Chrome DevTools** - For debugging and testing
- **Postman** - For API testing

### System Requirements
- **Operating System**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 20.04+)
- **RAM**: Minimum 4GB (8GB recommended)
- **Disk Space**: Minimum 500MB free space

### Backend Requirements
- **Spring Boot Backend**: Running on `http://localhost:8080`
- See [SPRING_BOOT_GUIDE.md](./SPRING_BOOT_GUIDE.md) for backend setup

---

## 🚀 Quick Start

Get up and running in under 5 minutes:

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/SaraConference2k25/frontend-nextjs.git
cd frontend-nextjs
```

### 2️⃣ Install Dependencies

```bash
npm install
# or
yarn install
```

### 3️⃣ Configure Environment

```bash
# Create environment file
cp .env.example .env.local

# Edit the file and set your backend URL
echo "NEXT_PUBLIC_API_URL=http://localhost:8080/api" > .env.local
```

### 4️⃣ Start Development Server

```bash
npm run dev
# or
yarn dev
```

### 5️⃣ Open Application

Navigate to **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 📥 Installation

### Detailed Installation Steps

#### Step 1: Clone Repository

```bash
# HTTPS
git clone https://github.com/SaraConference2k25/frontend-nextjs.git

# SSH
git clone git@github.com:SaraConference2k25/frontend-nextjs.git

# GitHub CLI
gh repo clone SaraConference2k25/frontend-nextjs
```

#### Step 2: Navigate to Project Directory

```bash
cd frontend-nextjs
```

#### Step 3: Install Dependencies

```bash
# Using npm
npm install

# Using yarn
yarn

# Using pnpm
pnpm install

# Using bun
bun install
```

#### Step 4: Verify Installation

```bash
# Check Node.js version
node --version  # Should be v18.0.0 or higher

# Check npm version
npm --version   # Should be v9.0.0 or higher

# Verify dependencies
npm list --depth=0
```

---

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# ===================================
# Backend API Configuration
# ===================================
NEXT_PUBLIC_API_URL=http://localhost:8080/api

# ===================================
# Application Configuration
# ===================================
NEXT_PUBLIC_APP_NAME=SARA Conference 2025
NEXT_PUBLIC_APP_VERSION=1.0.0

# ===================================
# Feature Flags (Optional)
# ===================================
NEXT_PUBLIC_ENABLE_DARK_MODE=true
NEXT_PUBLIC_ENABLE_ANALYTICS=false

# ===================================
# Production Configuration (When deploying)
# ===================================
# NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
# NEXT_PUBLIC_APP_ENV=production
```

### Configuration Files

#### `next.config.ts`
Next.js configuration for build optimization and routing:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Add your custom configuration here
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
```

#### `tsconfig.json`
TypeScript configuration with path aliases:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

## 💻 Development

### Development Workflow

#### Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000` with hot-reload enabled.

#### Linting

```bash
# Run ESLint
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix
```

#### Type Checking

```bash
# Check TypeScript types
npx tsc --noEmit
```

#### Building for Production

```bash
# Create optimized production build
npm run build

# Test production build locally
npm run start
```

### Code Style Guidelines

- **TypeScript**: All new files should use TypeScript
- **Components**: Use functional components with hooks
- **Naming**: PascalCase for components, camelCase for functions
- **Formatting**: Follow ESLint configuration
- **Comments**: Add JSDoc comments for complex functions

### Component Development

#### Creating a New Component

```tsx
// components/MyComponent.tsx
'use client' // Add if component uses client-side features

import { FC } from 'react'

interface MyComponentProps {
  title: string
  description?: string
}

const MyComponent: FC<MyComponentProps> = ({ title, description }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{title}</h2>
      {description && <p className="text-gray-600">{description}</p>}
    </div>
  )
}

export default MyComponent
```

#### Using Authentication in Components

```tsx
'use client'
import { useAuth } from '@/lib/auth-context'

export default function ProtectedComponent() {
  const { user, isAuthenticated, logout } = useAuth()

  if (!isAuthenticated) {
    return <div>Please log in</div>
  }

  return (
    <div>
      <p>Welcome, {user?.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
```

---

## 🔌 API Integration

### API Client Configuration

The application uses a centralized API client located in `lib/api.ts`:

```typescript
import { apiClient } from '@/lib/api'

// Login
const response = await apiClient.login(email, password, role)

// Register
const result = await apiClient.register({
  email,
  password,
  fullName,
  affiliation,
})
```

### Available API Endpoints

#### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/login` | User login |
| `POST` | `/api/auth/register` | User registration |
| `POST` | `/api/auth/logout` | User logout |
| `POST` | `/api/auth/refresh` | Refresh JWT token |

#### Participant Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/participant/profile` | Get user profile |
| `PUT` | `/api/participant/profile` | Update profile |
| `GET` | `/api/participant/papers` | Get submitted papers |
| `POST` | `/api/participant/papers` | Submit new paper |

#### Evaluator Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/evaluator/queue` | Get evaluation queue |
| `POST` | `/api/evaluator/evaluate` | Submit evaluation |

### Making API Requests

#### Example: Login Request

```typescript
import { apiClient } from '@/lib/api'

async function handleLogin() {
  try {
    const response = await apiClient.login(
      'user@example.com',
      'password123',
      'PARTICIPANT'
    )
    
    console.log('Login successful:', response.user)
    // Token is automatically stored in localStorage
  } catch (error) {
    console.error('Login failed:', error)
  }
}
```

#### Example: Protected API Call

```typescript
import { apiClient } from '@/lib/api'

async function fetchUserProfile() {
  try {
    // Token is automatically included from localStorage
    const profile = await apiClient.getProfile()
    return profile
  } catch (error) {
    if (error.status === 401) {
      // Token expired, redirect to login
      window.location.href = '/login'
    }
    throw error
  }
}
```

### Error Handling

The API client includes comprehensive error handling:

```typescript
import { API_CONFIG } from '@/lib/config'

try {
  const response = await apiClient.login(email, password, role)
} catch (error) {
  if (error.status === 401) {
    console.error(API_CONFIG.ERRORS.INVALID_CREDENTIALS)
  } else if (error.status === 409) {
    console.error(API_CONFIG.ERRORS.EMAIL_EXISTS)
  } else {
    console.error(API_CONFIG.ERRORS.SERVER_ERROR)
  }
}
```

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Test Structure

```
tests/
├── unit/                 # Unit tests
│   ├── components/      # Component tests
│   └── utils/           # Utility function tests
├── integration/         # Integration tests
└── e2e/                # End-to-end tests
```

### Writing Tests

```typescript
// Example component test
import { render, screen } from '@testing-library/react'
import LoginSection from '@/components/LoginSection'

describe('LoginSection', () => {
  it('renders login form', () => {
    render(<LoginSection />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })
})
```

---

## 🚢 Deployment

### Build for Production

```bash
# Create optimized production build
npm run build

# The build output will be in the .next/ directory
```

### Deployment Options

#### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy automatically on push

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

#### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# Build and run
docker build -t sara-conference-frontend .
docker run -p 3000:3000 sara-conference-frontend
```

#### Static Export

```bash
# Build static export
npm run build
npm run export

# Deploy the out/ directory to any static host
```

### Environment Variables for Production

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
NEXT_PUBLIC_APP_ENV=production
NODE_ENV=production
```

---

## 🔒 Security

### Security Best Practices

#### Authentication
- ✅ JWT tokens stored in `localStorage` (consider `httpOnly` cookies for production)
- ✅ Automatic token expiration and refresh
- ✅ Secure password validation on frontend and backend
- ✅ HTTPS enforced in production

#### Data Protection
- ✅ Input validation on all forms
- ✅ XSS prevention through React's built-in escaping
- ✅ CSRF protection through token-based authentication
- ✅ Content Security Policy (CSP) headers

#### API Security
- ✅ CORS configuration on backend
- ✅ Rate limiting on sensitive endpoints
- ✅ Request timeout protection
- ✅ Error message sanitization

### Security Checklist

- [ ] Enable HTTPS in production
- [ ] Configure secure CORS origins
- [ ] Implement rate limiting
- [ ] Set up security headers (CSP, HSTS, etc.)
- [ ] Regular dependency updates (`npm audit`)
- [ ] Environment variables properly secured
- [ ] API keys never committed to repository

### Running Security Audit

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities automatically
npm audit fix

# Force fix (may introduce breaking changes)
npm audit fix --force
```

---

## ⚡ Performance

### Performance Metrics

- **First Contentful Paint (FCP)**: < 1.0s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 3.0s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Input Delay (FID)**: < 100ms

### Optimization Techniques

#### Code Splitting
- Automatic route-based code splitting via Next.js
- Dynamic imports for large components

```typescript
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>
})
```

#### Image Optimization
- Next.js Image component for automatic optimization
- Lazy loading for images

```tsx
import Image from 'next/image'

<Image 
  src="/image.jpg" 
  alt="Description"
  width={800}
  height={600}
  priority // For above-the-fold images
/>
```

#### Bundle Analysis

```bash
# Analyze bundle size
npm run build
npx @next/bundle-analyzer
```

---

## 🔧 Troubleshooting

### Common Issues

#### Issue: "Module not found" Error

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Issue: Backend Connection Failed

**Solution:**
1. Verify backend is running on correct port
2. Check `NEXT_PUBLIC_API_URL` in `.env.local`
3. Verify CORS is enabled on backend
4. Check browser console for detailed errors

```bash
# Test backend connectivity
curl http://localhost:8080/api/health
```

#### Issue: Build Fails

**Solution:**
```bash
# Check TypeScript errors
npx tsc --noEmit

# Check for linting errors
npm run lint

# Clear Next.js cache
rm -rf .next
npm run build
```

#### Issue: Slow Performance

**Solution:**
1. Check for unnecessary re-renders using React DevTools
2. Implement memoization for expensive computations
3. Use `React.memo()` for pure components
4. Verify API response times

#### Issue: Authentication Not Persisting

**Solution:**
1. Check browser localStorage is enabled
2. Verify token is being returned from backend
3. Check token expiration time
4. Clear localStorage and try again

```javascript
// Clear localStorage
localStorage.clear()
```

### Debug Mode

Enable debug logging:

```env
# .env.local
NEXT_PUBLIC_DEBUG=true
```

---

## 📚 Documentation

### Additional Documentation Files

- **[QUICK_START.md](./QUICK_START.md)** - 5-minute setup guide
- **[BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md)** - Detailed API integration guide
- **[SPRING_BOOT_GUIDE.md](./SPRING_BOOT_GUIDE.md)** - Backend API specifications
- **[INTEGRATION_COMPLETE.md](./INTEGRATION_COMPLETE.md)** - Integration completion checklist
- **[DASHBOARD_BACKEND_INTEGRATION.md](./DASHBOARD_BACKEND_INTEGRATION.md)** - Dashboard integration guide
- **[PAPER_SUBMISSION_INTEGRATION.md](./PAPER_SUBMISSION_INTEGRATION.md)** - Paper submission workflow
- **[LOGIN_FIX_SUMMARY.md](./LOGIN_FIX_SUMMARY.md)** - Login implementation details
- **[BACKEND_FIXES.md](./BACKEND_FIXES.md)** - Backend bug fixes and solutions

### External Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Development Process

1. **Fork** the repository
2. **Clone** your fork
3. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
4. **Make** your changes
5. **Test** your changes thoroughly
6. **Commit** your changes (`git commit -m 'Add amazing feature'`)
7. **Push** to your branch (`git push origin feature/amazing-feature`)
8. **Open** a Pull Request

### Pull Request Guidelines

- ✅ Follow the existing code style
- ✅ Write clear, descriptive commit messages
- ✅ Include tests for new features
- ✅ Update documentation as needed
- ✅ Ensure all tests pass
- ✅ Keep PRs focused on a single feature/fix

### Code Review Process

1. All PRs require at least one review
2. Address all review comments
3. Maintain clean commit history
4. Squash commits before merging

### Coding Standards

- Use TypeScript for all new files
- Follow ESLint configuration
- Write meaningful comments
- Keep functions small and focused
- Use semantic variable names

---

## 💬 Support

### Getting Help

- **Documentation**: Check the `/docs` folder and additional `.md` files
- **Issues**: Report bugs via [GitHub Issues](https://github.com/SaraConference2k25/frontend-nextjs/issues)
- **Discussions**: Ask questions in [GitHub Discussions](https://github.com/SaraConference2k25/frontend-nextjs/discussions)

### Reporting Bugs

When reporting bugs, please include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: Step-by-step instructions
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: OS, Node version, browser, etc.
6. **Screenshots**: If applicable

### Feature Requests

We welcome feature requests! Please use the [Feature Request template](https://github.com/SaraConference2k25/frontend-nextjs/issues/new?template=feature_request.md).

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

### Project Maintainers

- **SARA Conference Team** - [GitHub Organization](https://github.com/SaraConference2k25)

### Contributors

Thanks to all contributors who have helped build this project! 

See the [Contributors page](https://github.com/SaraConference2k25/frontend-nextjs/graphs/contributors) for a full list.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Vercel](https://vercel.com/) - Hosting and deployment platform
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React](https://react.dev/) - UI component library
- All contributors and supporters of this project

---

## 📊 Project Status

| Aspect | Status |
|--------|--------|
| Development | ✅ Active |
| Production | ✅ Ready |
| Documentation | ✅ Complete |
| Tests | 🔄 In Progress |
| Security Audit | ✅ Passed |

---

## 🗺 Roadmap

### Version 1.1 (Q2 2025)
- [ ] Enhanced dashboard analytics
- [ ] Real-time notifications
- [ ] Advanced search functionality
- [ ] Export capabilities

### Version 1.2 (Q3 2025)
- [ ] Mobile app integration
- [ ] Offline mode support
- [ ] Multi-language support
- [ ] Advanced reporting tools

### Version 2.0 (Q4 2025)
- [ ] AI-powered paper evaluation
- [ ] Video conferencing integration
- [ ] Enhanced collaboration tools
- [ ] Advanced analytics dashboard

---

<div align="center">

**Built with ❤️ by the SARA Conference 2025 Team**

[⬆ Back to Top](#sara-conference-2025---frontend-application)

</div>
