  # 🤝 Contributing to DaiDev

  Thank you for your interest in contributing to DaiDev! This document provides guidelines for contributors.

  ## 🚀 Getting Started

  ### Prerequisites
  - Node.js 18.0.0+
  - pnpm 8.0.0+
  - Git 2.30.0+
  - MongoDB (local or Atlas)

  ### Setup
  ```bash
  # Fork and clone
  git clone https://github.com/YOUR_USERNAME/daidev.git
  cd daidev

  # Install dependencies
  pnpm install

  # Setup environment
  cp apps/api/env.example apps/api/.env
  cp apps/web/.env.example apps/web/.env.local
  cp apps/admin/.env.example apps/admin/.env

  # Start development
  pnpm dev
  ```

  ## 📝 Code Standards

  ### TypeScript
  - Use TypeScript for all new code
  - Define proper types and interfaces
  - Avoid `any` type

  ### Naming Conventions
  - **Files**: kebab-case (`user-profile.tsx`)
  - **Components**: PascalCase (`UserProfile`)
  - **Functions/Variables**: camelCase (`getUserData`)

  ### Commit Messages
  Follow Conventional Commits:
  ```bash
  feat(auth): add JWT authentication
  fix(api): resolve user creation error
  docs(readme): update installation guide
  ```

  ## 🔄 Git Workflow

  ### Branch Naming
  ```bash
  feature/user-authentication
  fix/login-validation
  docs/api-documentation
  refactor/user-service
  test/user-authentication
  chore/dependency-update
  ```

  ### Workflow Steps
  1. Create feature branch from `develop`
  2. Make changes and commit
  3. Push to remote
  4. Create pull request
  5. Address review feedback
  6. Merge after approval

  ## 🧪 Testing

  ### Backend Tests
  ```bash
  cd apps/api
  pnpm run test        # Unit tests
  pnpm run test:e2e    # E2E tests
  pnpm run test:cov    # Coverage
  ```

  ### Frontend Tests
  ```bash
  cd apps/web
  pnpm run test        # Component tests
  pnpm run test:watch  # Watch mode
  ```

  ### Coverage Requirements
  - Backend: 80% minimum
  - Frontend: 70% minimum
  - Critical paths: 100%

  ## 📚 Documentation

  ### Code Documentation
  ```typescript
  /**
   * Creates a new user
   * @param userData - User data
   * @returns Promise<User>
   */
  async createUser(userData: CreateUserDto): Promise<User> {
    // Implementation
  }
  ```

  ### API Documentation
  ```typescript
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users' })
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }
  ```

  ## 🔄 Pull Request Process

  ### PR Template
  ```markdown
  ## Description
  Brief description of changes

  ## Type of Change
  - [ ] Bug fix
  - [ ] New feature
  - [ ] Documentation update

  ## Testing
  - [ ] Unit tests pass
  - [ ] Manual testing completed

  ## Checklist
  - [ ] Code follows style guidelines
  - [ ] Documentation updated
  - [ ] No console errors
  ```

  ### Review Guidelines
  - Small, focused changes
  - Clear description
  - Include tests
  - Update documentation
  - Follow naming conventions

  ## 🐛 Issue Reporting

  ### Bug Report Template
  ```markdown
  ## Description
  Clear description of the bug

  ## Steps to Reproduce
  1. Go to '...'
  2. Click on '...'
  3. See error

  ## Expected vs Actual
  What should happen vs what happens

  ## Environment
  - OS: [e.g. macOS]
  - Browser: [e.g. Chrome]
  - Version: [e.g. 1.0.0]
  ```

  ## 🎯 Getting Help

  - **Documentation**: [./apps/docs/](./apps/docs/)
  - **API Docs**: [http://localhost:4002/](http://localhost:4002/)
  - **Issues**: GitHub Issues
  - **Discussions**: GitHub Discussions

  ---

  Thank you for contributing to DaiDev! 🚀 