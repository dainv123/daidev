# 🤝 Contributing to DaiDev

Thank you for your interest in contributing to DaiDev! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Code Standards](#code-standards)
- [Git Workflow](#git-workflow)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Code Review](#code-review)

## 🚀 Getting Started

### Prerequisites

Before contributing, ensure you have:

- **Node.js** 18.0.0 or higher
- **pnpm** 8.0.0 or higher
- **Git** 2.30.0 or higher
- **MongoDB** (local or Atlas)
- **VS Code** (recommended) with extensions:
  - TypeScript
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - MongoDB for VS Code

### Initial Setup

1. **Fork the repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/daidev.git
   cd daidev
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Setup environment**
   ```bash
   # Copy environment files
   cp apps/api/env.example apps/api/.env
   cp apps/web/.env.example apps/web/.env.local
   cp apps/admin/.env.example apps/admin/.env
   
   # Configure your environment variables
   # See README.md for detailed configuration
   ```

4. **Start development servers**
   ```bash
   pnpm dev
   ```

## 🛠️ Development Setup

### Project Structure

```
daidev/
├── apps/                    # Sub-applications
│   ├── web/                # Next.js public web app
│   ├── admin/              # React admin dashboard
│   ├── api/                # NestJS backend API
│   ├── docs/               # Docusaurus documentation
│   ├── theme-detail/       # Nuxt.js micro frontend
│   └── swagger-proxy/      # Express.js API docs
├── packages/               # Shared packages
│   ├── shared/             # Shared utilities
│   └── config/             # Monorepo configuration
└── docs/                   # Project documentation
```

### Running Applications

```bash
# Run all applications
pnpm dev

# Run individual applications
cd apps/api && pnpm run start:dev
cd apps/web && pnpm dev
cd apps/admin && pnpm dev
cd apps/theme-detail && pnpm dev
cd apps/docs && pnpm start
cd apps/swagger-proxy && pnpm start
```

### Development URLs

| Application | URL | Port | Purpose |
|-------------|-----|------|---------|
| Web App | http://localhost:3003 | 3003 | Public portfolio |
| Admin Dashboard | http://localhost:3000 | 3000 | Content management |
| Backend API | http://localhost:3001 | 3001 | REST API service |
| API Docs | http://localhost:4001 | 4001 | Swagger documentation |
| Documentation | http://localhost:4002 | 4002 | Technical docs |
| Theme Detail | http://localhost:3004 | 3004 | Theme micro frontend |

## 📝 Code Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type - use proper typing
- Use strict TypeScript configuration

```typescript
// ✅ Good
interface User {
  id: string;
  email: string;
  role: 'admin' | 'viewer';
}

// ❌ Avoid
const user: any = { id: '1', email: 'test@example.com' };
```

### ESLint & Prettier

- Follow ESLint rules strictly
- Use Prettier for code formatting
- Run linting before committing

```bash
# Check linting
pnpm run lint

# Fix linting issues
pnpm run lint:fix

# Format code
pnpm run format
```

### Naming Conventions

#### Files and Folders
- Use **kebab-case** for file and folder names
- Use **PascalCase** for React components
- Use **camelCase** for functions and variables

```bash
# ✅ Good
user-profile.tsx
UserProfile.tsx
getUserData.ts
user-service.ts

# ❌ Avoid
userProfile.tsx
user_profile.tsx
get-user-data.ts
```

#### Variables and Functions
```typescript
// ✅ Good
const userProfile = getUserProfile();
const isAuthenticated = checkAuthStatus();
const handleSubmit = () => {};

// ❌ Avoid
const user_profile = getUserProfile();
const is_authenticated = checkAuthStatus();
const handle_submit = () => {};
```

### Component Structure

#### React Components
```typescript
// ✅ Good structure
import React from 'react';
import { User } from '../types';

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onEdit }) => {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <button onClick={() => onEdit(user)}>Edit</button>
    </div>
  );
};
```

#### NestJS Controllers
```typescript
// ✅ Good structure
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
```

## 🔄 Git Workflow

### Branch Strategy

We use **Git Flow** with the following branches:

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - Feature development
- `fix/*` - Bug fixes
- `hotfix/*` - Critical production fixes
- `release/*` - Release preparation

### Branch Naming Convention

```bash
# Features
feature/user-authentication
feature/admin-dashboard
feature/api-integration

# Bug fixes
fix/login-validation
fix/api-error-handling
fix/ui-responsive

# Documentation
docs/api-documentation
docs/readme-update

# Refactoring
refactor/user-service
refactor/component-structure

# Testing
test/user-authentication
test/api-endpoints

# Maintenance
chore/dependency-update
chore/build-optimization
```

### Commit Message Format

We follow **Conventional Commits** format:

```bash
# Format
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Commit Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks

#### Examples

```bash
# ✅ Good commit messages
feat(auth): add JWT authentication system
fix(api): resolve user creation validation error
docs(readme): update installation instructions
refactor(components): extract reusable UserCard component
test(api): add unit tests for user service
chore(deps): update dependencies to latest versions

# ❌ Avoid
add auth
fix bug
update docs
refactor code
```

### Git Workflow Steps

1. **Create feature branch**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

2. **Make changes and commit**
   ```bash
   # Make your changes
   git add .
   git commit -m "feat: add your feature description"
   ```

3. **Push to remote**
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Create pull request**
   - Go to GitHub and create a PR
   - Target `develop` branch
   - Fill out the PR template

## 🧪 Testing Guidelines

### Backend Testing (NestJS)

#### Unit Tests
```typescript
// users.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const userData = { email: 'test@example.com', password: 'password' };
    const result = await service.create(userData);
    expect(result.email).toBe(userData.email);
  });
});
```

#### E2E Tests
```typescript
// users.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Users (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200);
  });
});
```

### Frontend Testing

#### Component Tests
```typescript
// UserCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { UserCard } from './UserCard';

describe('UserCard', () => {
  const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
  };

  const mockOnEdit = jest.fn();

  it('renders user information', () => {
    render(<UserCard user={mockUser} onEdit={mockOnEdit} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    render(<UserCard user={mockUser} onEdit={mockOnEdit} />);
    
    fireEvent.click(screen.getByText('Edit'));
    expect(mockOnEdit).toHaveBeenCalledWith(mockUser);
  });
});
```

### Running Tests

```bash
# Backend tests
cd apps/api
pnpm run test              # Unit tests
pnpm run test:e2e          # E2E tests
pnpm run test:cov          # Coverage

# Frontend tests
cd apps/web
pnpm run test              # Component tests
pnpm run test:watch        # Watch mode
```

### Test Coverage Requirements

- **Backend**: Minimum 80% coverage
- **Frontend**: Minimum 70% coverage
- **Critical paths**: 100% coverage

## 📚 Documentation

### Code Documentation

#### JSDoc Comments
```typescript
/**
 * Creates a new user in the system
 * @param userData - User data to create
 * @param userData.email - User's email address
 * @param userData.password - User's password
 * @returns Promise<User> - Created user object
 * @throws {ValidationError} When user data is invalid
 * @example
 * const user = await createUser({
 *   email: 'user@example.com',
 *   password: 'securepassword'
 * });
 */
async createUser(userData: CreateUserDto): Promise<User> {
  // Implementation
}
```

#### API Documentation
```typescript
// users.controller.ts
@ApiTags('Users')
@Controller('users')
export class UsersController {
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }
}
```

### README Updates

When adding new features, update relevant documentation:

- **README.md** - Project overview and setup
- **API Documentation** - Swagger docs
- **Component Documentation** - Storybook (if applicable)
- **Architecture Documentation** - Technical docs

## 🔄 Pull Request Process

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] E2E tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors
- [ ] Responsive design tested
```

### PR Review Process

1. **Self-review** your changes
2. **Request review** from maintainers
3. **Address feedback** and make changes
4. **Squash commits** if needed
5. **Merge** after approval

### PR Guidelines

- **Small, focused changes** - One feature/fix per PR
- **Clear description** - Explain what and why
- **Include tests** - New features need tests
- **Update documentation** - Keep docs in sync
- **Follow naming conventions** - Consistent with project

## 🐛 Issue Reporting

### Issue Template

```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [e.g. macOS, Windows, Linux]
- Browser: [e.g. Chrome, Firefox, Safari]
- Version: [e.g. 1.0.0]

## Additional Context
Screenshots, logs, etc.
```

### Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature request
- `documentation` - Documentation improvements
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `priority: high` - Urgent issues
- `priority: low` - Non-urgent issues

## 👀 Code Review

### Review Guidelines

#### What to Look For

- **Functionality** - Does it work as expected?
- **Code quality** - Is it readable and maintainable?
- **Performance** - Any performance implications?
- **Security** - Any security concerns?
- **Testing** - Adequate test coverage?
- **Documentation** - Updated documentation?

#### Review Comments

- **Be constructive** - Focus on improvement
- **Be specific** - Point to exact lines/issues
- **Suggest solutions** - Don't just point out problems
- **Use questions** - Ask for clarification when needed

#### Example Review Comments

```markdown
✅ Good comment:
"Consider extracting this validation logic into a separate function for reusability. See line 45-60."

❌ Avoid:
"This is wrong."
```

### Review Process

1. **Read the description** - Understand the change
2. **Review the code** - Check for issues
3. **Test the changes** - Verify functionality
4. **Provide feedback** - Constructive comments
5. **Approve/Request changes** - Clear decision

## 🎯 Getting Help

### Resources

- **Documentation**: [./apps/docs/](./apps/docs/)
- **API Docs**: [http://localhost:4002/](http://localhost:4002/)
- **Issues**: [GitHub Issues](https://github.com/your-username/daidev/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/daidev/discussions)

### Communication

- **GitHub Issues** - Bug reports and feature requests
- **GitHub Discussions** - Questions and general discussion
- **Pull Requests** - Code review and feedback
- **Email** - For sensitive matters

## 🙏 Recognition

Contributors will be recognized in:

- **README.md** - Contributors section
- **Release notes** - Feature contributions
- **GitHub profile** - Contribution graph
- **Project documentation** - Author credits

---

Thank you for contributing to DaiDev! Your contributions help make this project better for everyone. 🚀 