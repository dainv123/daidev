# 🚀 Implementation Plan - Authentication & Authorization

## 📋 Phase 1: API Authentication Setup

### 1.1 JWT Strategy Implementation
```typescript
// apps/api/src/auth/strategies/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return {
      userId: user._id,
      email: user.email,
      role: user.role,
      tenantId: user.tenantId,
    };
  }
}
```

### 1.2 JWT Guard
```typescript
// apps/api/src/auth/guards/jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

### 1.3 Role Guard
```typescript
// apps/api/src/auth/guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredRoles) {
      return true;
    }
    
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.role === role);
  }
}
```

### 1.4 Role Decorator
```typescript
// apps/api/src/auth/decorators/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
```

## 📋 Phase 2: Controller Updates

### 2.1 Protected Controllers
```typescript
// Example: Users Controller
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  
  @Get()
  @Roles('admin')
  async findAll(@Request() req: any) {
    return this.usersService.findAll(req.user.tenantId);
  }

  @Post()
  @Roles('admin')
  async create(@Body() createUserDto: any, @Request() req: any) {
    return this.usersService.create({
      ...createUserDto,
      tenantId: req.user.tenantId
    });
  }
}
```

### 2.2 Public Controllers
```typescript
// Example: Themes Controller
@Controller('themes')
export class ThemesController {
  
  @Get()
  async findAll() {
    return this.themesService.findPublished();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.themesService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async create(@Body() createThemeDto: any, @Request() req: any) {
    return this.themesService.create({
      ...createThemeDto,
      tenantId: req.user.tenantId
    });
  }
}
```

## 📋 Phase 3: Frontend Authentication

### 3.1 Auth Context (React)
```typescript
// apps/web/src/contexts/AuthContext.tsx
import React, { createContext, useContext, useReducer } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
}

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (email: string, password: string) => {
    try {
      dispatch({ type: 'AUTH_START' });
      
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      
      localStorage.setItem('token', data.access_token);
      
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { user: data.user, token: data.access_token }
      });
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: error.message });
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'AUTH_LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### 3.2 Protected Route Component
```typescript
// apps/web/src/components/ProtectedRoute.tsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { state } = useAuth();

  if (!state.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && state.user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
```

### 3.3 Login Form Component
```typescript
// apps/web/src/components/LoginForm.tsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};
```

## 📋 Phase 4: Admin Panel Integration

### 4.1 Admin Layout with Auth
```typescript
// apps/admin/src/layouts/AdminLayout.tsx
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';

export const AdminLayout: React.FC = ({ children }) => {
  const { state } = useAuth();

  if (!state.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (state.user?.role !== 'admin') {
    return <Navigate to="/unauthorized" />;
  }

  return (
    <div className="admin-layout">
      <Header user={state.user} />
      <div className="admin-content">
        <Sidebar />
        <main>{children}</main>
      </div>
    </div>
  );
};
```

### 4.2 API Client with Auth
```typescript
// apps/admin/src/services/api.ts
class ApiClient {
  private baseURL = 'http://localhost:3001/api/v1';
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  // Protected endpoints
  async getUsers() {
    return this.request('/users');
  }

  async createUser(userData: any) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getThemes() {
    return this.request('/themes');
  }

  async createTheme(themeData: any) {
    return this.request('/themes', {
      method: 'POST',
      body: JSON.stringify(themeData),
    });
  }
}

export const apiClient = new ApiClient();
```

## 📋 Phase 5: Testing Strategy

### 5.1 Unit Tests
```typescript
// apps/api/src/auth/guards/jwt-auth.guard.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthGuard } from './jwt-auth.guard';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtAuthGuard],
    }).compile();

    guard = module.get<JwtAuthGuard>(JwtAuthGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should allow access with valid token', async () => {
    // Test implementation
  });

  it('should deny access with invalid token', async () => {
    // Test implementation
  });
});
```

### 5.2 Integration Tests
```typescript
// apps/api/test/auth.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Authentication (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({ email: 'test@example.com', password: 'password123' })
      .expect(200)
      .expect((res) => {
        expect(res.body.access_token).toBeDefined();
        expect(res.body.user).toBeDefined();
      });
  });

  it('/users (GET) - should require authentication', () => {
    return request(app.getHttpServer())
      .get('/api/v1/users')
      .expect(401);
  });
});
```

## 📋 Phase 6: Deployment & Security

### 6.1 Environment Variables
```bash
# .env
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
ADMIN_URL=http://localhost:3002
```

### 6.2 Security Headers
```typescript
// apps/api/src/main.ts
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Security middleware
  app.use(helmet());
  
  // CORS configuration
  app.enableCors({
    origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL],
    credentials: true,
  });
  
  // Rate limiting
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
}
```

## 📋 Implementation Timeline

### Week 1: API Authentication
- [ ] Day 1-2: JWT Strategy & Guards
- [ ] Day 3-4: Controller Updates
- [ ] Day 5: Testing & Debugging

### Week 2: Frontend Integration
- [ ] Day 1-2: Auth Context & Hooks
- [ ] Day 3-4: Protected Routes & Forms
- [ ] Day 5: Admin Panel Integration

### Week 3: Testing & Security
- [ ] Day 1-2: Unit & Integration Tests
- [ ] Day 3-4: Security Hardening
- [ ] Day 5: Documentation & Deployment

---

**Estimated Total Time**: 3 weeks
**Priority**: High
**Dependencies**: Database seeding completed 