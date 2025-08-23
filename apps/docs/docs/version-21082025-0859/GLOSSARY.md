# 📚 Glossary

This glossary explains technical terms and concepts used throughout the DaiDev project documentation.

## 🔧 Development Terms

### **Monorepo**
A software development strategy where multiple related projects are stored in the same repository. In DaiDev, all 6 sub-applications are managed in a single repository using Turborepo.

### **Sub-applications (Sub-apps)**
Individual applications within the monorepo:
- **Web App** - Public portfolio website
- **Admin Dashboard** - Content management interface
- **Backend API** - Server-side API service
- **Documentation** - Technical documentation site
- **Theme Detail** - Micro frontend for themes
- **Swagger Proxy** - API documentation interface

### **Micro Frontend**
An architectural pattern where a frontend application is decomposed into smaller, semi-independent applications. In DaiDev, the Theme Detail app is a micro frontend that can be embedded into the main Web App.

### **API (Application Programming Interface)**
A set of rules and protocols that allows different software applications to communicate with each other. DaiDev's Backend API provides REST endpoints for frontend applications.

## 🏗️ Architecture Terms

### **Multi-tenant Architecture**
A software architecture where a single instance of an application serves multiple customers (tenants). Each tenant's data is isolated using a `tenantId` field.

### **REST (Representational State Transfer)**
An architectural style for designing networked applications. DaiDev's API follows REST principles with standard HTTP methods (GET, POST, PUT, DELETE).

### **JWT (JSON Web Token)**
A compact, URL-safe means of representing claims to be transferred between two parties. Used in DaiDev for user authentication and authorization.

### **CORS (Cross-Origin Resource Sharing)**
A security feature that controls which domains can access your API. Configured in DaiDev to allow frontend applications to communicate with the backend.

## 🎨 Frontend Terms

### **Next.js**
A React framework that provides features like server-side rendering, static site generation, and API routes. Used for DaiDev's main Web App.

### **React**
A JavaScript library for building user interfaces. Used for DaiDev's Admin Dashboard.

### **Nuxt.js**
A Vue.js framework that provides similar features to Next.js. Used for DaiDev's Theme Detail micro frontend.

### **TypeScript**
A superset of JavaScript that adds static typing. Used throughout DaiDev for better code quality and developer experience.

### **Tailwind CSS**
A utility-first CSS framework for rapidly building custom user interfaces. Used for styling in DaiDev's Admin Dashboard.

### **Vite**
A build tool that provides a faster and leaner development experience. Used for DaiDev's Admin Dashboard.

## 🔧 Backend Terms

### **NestJS**
A progressive Node.js framework for building efficient, scalable server-side applications. Used for DaiDev's Backend API.

### **MongoDB**
A NoSQL document database that stores data in flexible, JSON-like documents. Used as DaiDev's primary database.

### **Mongoose**
An Object Data Modeling (ODM) library for MongoDB and Node.js. Used in DaiDev to define schemas and interact with the database.

### **DTO (Data Transfer Object)**
Objects that define how data will be sent over the network. Used in DaiDev for API request/response validation.

### **Guard**
A class that determines whether a request will be handled by the route handler. Used in DaiDev for authentication and authorization.

### **Interceptor**
A class that can transform the result returned from a function. Used in DaiDev for logging, error handling, and response transformation.

## 🗄️ Database Terms

### **Collection**
A group of documents in MongoDB (similar to a table in SQL). DaiDev has collections for Users, Themes, Blogs, etc.

### **Document**
A record in a MongoDB collection (similar to a row in SQL). Each document contains data in JSON format.

### **Schema**
A blueprint that defines the structure of documents in a collection. Used in DaiDev to validate data and define relationships.

### **Index**
A data structure that improves the speed of data retrieval operations. Used in DaiDev to optimize database queries.

### **Aggregation**
A framework for data processing in MongoDB. Used in DaiDev for complex queries and data analysis.

## 🔐 Security Terms

### **Authentication**
The process of verifying who a user is. In DaiDev, users authenticate using email/password and receive a JWT token.

### **Authorization**
The process of determining what a user can access. In DaiDev, users have roles (admin/viewer) that determine their permissions.

### **bcrypt**
A password hashing function used to securely hash user passwords in DaiDev.

### **Rate Limiting**
A technique to limit the number of requests a user can make to an API. Used in DaiDev to prevent abuse.

### **Input Validation**
The process of ensuring that user input meets expected criteria. Used in DaiDev to prevent malicious data.

## 🌐 External Services

### **Cloudinary**
A cloud-based service for managing images and videos. Used in DaiDev for image upload and optimization.

### **Resend**
An email delivery service. Used in DaiDev for sending contact form emails.

### **Google reCAPTCHA**
A service that protects websites from spam and abuse. Used in DaiDev's contact form.

### **MongoDB Atlas**
A cloud database service for MongoDB. Used to host DaiDev's database.

## 🚀 Deployment Terms

### **Vercel**
A cloud platform for deploying frontend applications. Used to host DaiDev's frontend apps.

### **Railway**
A cloud platform for deploying backend applications. Used to host DaiDev's backend API.

### **Environment Variables**
Configuration values that are set outside of the application code. Used in DaiDev for database connections, API keys, etc.

### **Build Process**
The process of converting source code into a production-ready application. In DaiDev, each sub-app has its own build process.

### **CI/CD (Continuous Integration/Continuous Deployment)**
A method to frequently deliver apps to customers by introducing automation into the stages of app development.

## 📊 Performance Terms

### **Caching**
A technique to store frequently accessed data in memory for faster retrieval. Used in DaiDev to improve performance.

### **CDN (Content Delivery Network)**
A network of servers that deliver content to users based on their geographic location. Used in DaiDev for static assets.

### **Bundle Size**
The total size of JavaScript files that need to be downloaded by the browser. Optimized in DaiDev for faster loading.

### **Lazy Loading**
A technique to defer loading of non-critical resources. Used in DaiDev to improve initial page load times.

## 🧪 Testing Terms

### **Unit Test**
A test that verifies the behavior of a single function or component in isolation.

### **Integration Test**
A test that verifies how different parts of the application work together.

### **E2E Test (End-to-End Test)**
A test that verifies the entire application flow from start to finish.

### **Test Coverage**
A metric that measures the percentage of code that is tested. DaiDev aims for high test coverage.

## 📚 Documentation Terms

### **Docusaurus**
A static site generator for creating documentation websites. Used for DaiDev's technical documentation.

### **Swagger**
A tool for documenting REST APIs. Used in DaiDev to generate interactive API documentation.

### **MDX**
A format that allows you to use JSX in Markdown documents. Used in DaiDev's documentation for interactive examples.

### **Mermaid**
A tool for creating diagrams and flowcharts from text descriptions. Used in DaiDev's documentation for architecture diagrams.

## 🔄 Development Workflow Terms

### **Git Flow**
A branching model for Git that provides a robust framework for managing larger projects.

### **Conventional Commits**
A specification for commit messages that provides an easy set of rules for creating an explicit commit history.

### **Pull Request (PR)**
A method of submitting contributions to a project. Used in DaiDev for code review and collaboration.

### **Code Review**
The process of examining code changes before they are merged into the main codebase.

## 🌍 Internationalization (i18n)

### **i18n**
Short for "internationalization" (i with 18 letters between i and n). The process of making software support multiple languages.

### **Locale**
A set of parameters that defines the user's language, region, and any special variant preferences.

### **Translation Key**
A unique identifier used to reference a specific piece of text that needs to be translated.

## 📱 Mobile Terms

### **Responsive Design**
A design approach that makes web pages render well on a variety of devices and window or screen sizes.

### **Mobile-First**
A design strategy that starts with mobile devices and then scales up to larger screens.

### **Progressive Web App (PWA)**
A type of application software delivered through the web, built using common web technologies.

## 🔍 Monitoring Terms

### **Health Check**
An endpoint that returns the status of an application. Used in DaiDev to monitor if services are running properly.

### **Logging**
The process of recording events that occur during the execution of a program. Used in DaiDev for debugging and monitoring.

### **Metrics**
Quantitative measurements used to track the performance and health of an application.

### **Alerting**
The process of notifying developers when something goes wrong with the application.

---

## 📖 Additional Resources

- **MDN Web Docs**: [https://developer.mozilla.org/](https://developer.mozilla.org/)
- **TypeScript Handbook**: [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)
- **Next.js Documentation**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **NestJS Documentation**: [https://docs.nestjs.com/](https://docs.nestjs.com/)
- **MongoDB Documentation**: [https://docs.mongodb.com/](https://docs.mongodb.com/)

---

*This glossary is a living document. If you encounter terms that aren't explained here, please contribute by adding them!* 