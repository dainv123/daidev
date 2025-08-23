# 📚 Glossary

This glossary explains technical terms and concepts used throughout the DaiDev project documentation.

## 📋 Table of Contents

- [Development Terms](#development-terms)
- [Architecture Terms](#architecture-terms)
- [Frontend Terms](#frontend-terms)
- [Backend Terms](#backend-terms)
- [Database Terms](#database-terms)
- [Security Terms](#security-terms)
- [External Services](#external-services)
- [Deployment Terms](#deployment-terms)
- [Performance Terms](#performance-terms)
- [Testing Terms](#testing-terms)
- [Documentation Terms](#documentation-terms)
- [Development Workflow](#development-workflow)
- [Internationalization](#internationalization)
- [Mobile Terms](#mobile-terms)
- [Monitoring Terms](#monitoring-terms)

## 🛠️ Development Terms

### **API (Application Programming Interface)**
A set of rules and protocols that allows different software applications to communicate with each other. In DaiDev, the backend API provides endpoints for the frontend applications to fetch and manipulate data.

### **Monorepo**
A software development strategy where multiple related projects are stored in the same repository. In DaiDev, all 6 sub-applications are managed in a single repository using Turborepo.

### **Package Manager**
A tool that automates the process of installing, updating, configuring, and removing software packages. DaiDev uses **pnpm** as the primary package manager.

### **Dependencies**
External libraries and packages that your project relies on to function. These are listed in `package.json` files and managed by the package manager.

### **DevOps**
A set of practices that combines software development (Dev) and IT operations (Ops) to shorten the development lifecycle and provide continuous delivery.

### **CI/CD (Continuous Integration/Continuous Deployment)**
A method to frequently deliver apps to customers by introducing automation into the stages of app development. CI/CD includes automated testing and deployment.

### **TypeScript**
A superset of JavaScript that adds static typing to the language. All DaiDev applications use TypeScript for better code quality and developer experience.

### **ESLint**
A static code analysis tool for identifying and fixing problems in JavaScript/TypeScript code. Ensures code quality and consistency.

### **Prettier**
An opinionated code formatter that automatically formats code according to predefined rules, ensuring consistent code style across the project.

## 🏗️ Architecture Terms

### **Microservices**
An architectural style where an application is built as a collection of small, independent services. Each service runs in its own process and communicates through well-defined APIs.

### **Micro Frontend**
An architectural pattern where a frontend application is decomposed into smaller, semi-independent applications that can be developed, tested, and deployed separately.

### **Monorepo Architecture**
A software development strategy where multiple projects or applications are stored in a single repository, allowing for shared code, dependencies, and tooling.

### **REST API**
Representational State Transfer API - a set of architectural principles for designing networked applications. Uses HTTP methods (GET, POST, PUT, DELETE) to perform operations.

### **GraphQL**
A query language for APIs that provides a complete description of the data in your API, giving clients the power to ask for exactly what they need.

### **Multi-tenant Architecture**
A software architecture where a single instance of an application serves multiple customers (tenants), with data isolation between tenants.

### **Service-Oriented Architecture (SOA)**
An architectural pattern where services are provided to other components by application components, through a communication protocol over a network.

## 🎨 Frontend Terms

### **React**
A JavaScript library for building user interfaces, particularly single-page applications. Used in the DaiDev admin dashboard.

### **Next.js**
A React framework that provides features like server-side rendering, static site generation, and API routes. Used for the main web application.

### **Nuxt.js**
A Vue.js framework that provides features similar to Next.js but for Vue applications. Used for the theme detail micro frontend.

### **Vue.js**
A progressive JavaScript framework for building user interfaces. Used in the theme detail application.

### **Component**
A reusable piece of UI that encapsulates its own logic and styling. Components can be nested and combined to build complex user interfaces.

### **State Management**
The management of application state (data) across components. Tools like React Query and Zustand help manage state in DaiDev applications.

### **Routing**
The process of determining which component to render based on the current URL. Next.js and Nuxt.js provide built-in routing systems.

### **Server-Side Rendering (SSR)**
A technique where the initial HTML is generated on the server, improving performance and SEO.

### **Static Site Generation (SSG)**
A technique where HTML is generated at build time, creating fast-loading static pages.

### **Client-Side Rendering (CSR)**
A technique where the browser downloads and executes JavaScript to render the page content.

### **Tailwind CSS**
A utility-first CSS framework that provides low-level utility classes to build custom designs. Used throughout DaiDev applications.

### **Responsive Design**
A design approach that ensures web applications work well on various screen sizes and devices.

## 🔧 Backend Terms

### **NestJS**
A progressive Node.js framework for building efficient, scalable, and maintainable server-side applications. Used for the DaiDev backend API.

### **Node.js**
A JavaScript runtime built on Chrome's V8 JavaScript engine, allowing JavaScript to run on the server side.

### **Express.js**
A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

### **Middleware**
Functions that have access to the request object, response object, and the next middleware function in the application's request-response cycle.

### **Controller**
A class that handles incoming requests and returns responses to the client. In NestJS, controllers are decorated with routing metadata.

### **Service**
A class that contains business logic and is responsible for data manipulation. Services are injected into controllers.

### **DTO (Data Transfer Object)**
An object that defines how data will be sent over the network. Used for validation and documentation.

### **Validation**
The process of ensuring that data meets certain criteria before processing. In DaiDev, validation is handled by class-validator.

### **Authentication**
The process of verifying the identity of a user or system. DaiDev uses JWT for authentication.

### **Authorization**
The process of determining what resources a user can access. DaiDev implements role-based access control.

### **Rate Limiting**
A technique used to control the rate of requests a client can make to an API within a specified time period.

## 🗄️ Database Terms

### **MongoDB**
A NoSQL document database that stores data in flexible, JSON-like documents. Used as the primary database for DaiDev.

### **Mongoose**
An Object Data Modeling (ODM) library for MongoDB and Node.js. Provides a straightforward, schema-based solution for modeling application data.

### **Schema**
A blueprint that defines the structure of documents in a MongoDB collection, including field types, validation rules, and indexes.

### **Index**
A data structure that improves the speed of data retrieval operations on database tables. Indexes are used to quickly locate data without having to search every row.

### **Query**
A request for data from a database. Queries can be simple (find all users) or complex (find users with specific criteria).

### **Aggregation**
A framework for data analysis and processing that allows you to group, filter, and transform data.

### **Connection Pooling**
A technique where a pool of database connections is maintained and reused, improving performance and resource utilization.

### **Migration**
The process of updating a database schema from one version to another, typically when deploying new application versions.

### **Seed Data**
Initial data that is inserted into a database to provide a starting point for the application.

## 🔒 Security Terms

### **JWT (JSON Web Token)**
A compact, URL-safe means of representing claims to be transferred between two parties. Used for authentication in DaiDev.

### **CORS (Cross-Origin Resource Sharing)**
A security feature that controls which domains can access your API. Prevents unauthorized cross-origin requests.

### **HTTPS**
A secure version of HTTP that uses encryption to protect data transmitted between the client and server.

### **Environment Variables**
Configuration values that are stored outside of the application code, typically in files or cloud platforms. Used for sensitive data like API keys.

### **Input Validation**
The process of ensuring that user input meets expected criteria before processing, preventing security vulnerabilities.

### **SQL Injection**
A code injection technique used to attack data-driven applications by inserting malicious SQL statements.

### **XSS (Cross-Site Scripting)**
A security vulnerability that allows attackers to inject malicious scripts into web pages viewed by other users.

### **CSRF (Cross-Site Request Forgery)**
An attack that forces authenticated users to perform unwanted actions on a website.

### **Helmet**
A security middleware for Express.js that sets various HTTP headers to help protect your app from well-known web vulnerabilities.

## 🔌 External Services

### **Cloudinary**
A cloud-based service for managing images and videos. Used in DaiDev for image storage and optimization.

### **Resend**
An email delivery service that provides reliable email sending capabilities. Used for sending contact form emails.

### **Google reCAPTCHA**
A security service that protects websites from spam and abuse by distinguishing between human users and automated bots.

### **Google Maps**
A mapping service that provides interactive maps and location-based services.

### **MongoDB Atlas**
A cloud-based MongoDB service that provides database hosting, backup, and scaling capabilities.

### **Vercel**
A cloud platform for static sites and serverless functions, used for hosting DaiDev frontend applications.

### **Railway/Render**
Cloud platforms for deploying and hosting backend applications and services.

## 🚀 Deployment Terms

### **Production Environment**
The live environment where the application is accessible to end users. Different from development and staging environments.

### **Staging Environment**
A testing environment that closely resembles the production environment, used for final testing before deployment.

### **Environment Variables**
Configuration values that change between different environments (development, staging, production).

### **Docker**
A platform for developing, shipping, and running applications in containers. Provides consistency across different environments.

### **Container**
A lightweight, standalone package that includes everything needed to run an application.

### **Docker Compose**
A tool for defining and running multi-container Docker applications.

### **Load Balancer**
A device that distributes network traffic across multiple servers to ensure no single server becomes overwhelmed.

### **CDN (Content Delivery Network)**
A distributed network of servers that deliver web content to users based on their geographic location.

### **SSL/TLS Certificate**
A digital certificate that provides authentication for a website and enables encrypted communication.

### **Domain**
A human-readable address for a website (e.g., daidev.com).

### **DNS (Domain Name System)**
A system that translates domain names into IP addresses.

## ⚡ Performance Terms

### **Caching**
A technique for storing frequently accessed data in memory to improve response times.

### **Lazy Loading**
A technique for deferring the loading of non-critical resources until they are needed.

### **Code Splitting**
A technique for splitting code into smaller chunks that can be loaded on demand.

### **Bundle Size**
The total size of JavaScript files that need to be downloaded by the browser.

### **First Contentful Paint (FCP)**
A performance metric that measures the time from when the page starts loading to when any part of the page's content is rendered.

### **Largest Contentful Paint (LCP)**
A performance metric that measures the time from when the page starts loading to when the largest content element is rendered.

### **Time to Interactive (TTI)**
A performance metric that measures the time from when the page starts loading to when it becomes interactive.

### **Core Web Vitals**
A set of performance metrics that Google uses to evaluate user experience on web pages.

## 🧪 Testing Terms

### **Unit Testing**
A testing method where individual components or functions are tested in isolation.

### **Integration Testing**
A testing method where multiple components are tested together to ensure they work correctly as a group.

### **End-to-End (E2E) Testing**
A testing method that tests the entire application from start to finish, simulating real user interactions.

### **Test Coverage**
A metric that measures the percentage of code that is executed during testing.

### **Mock**
A simulated object that mimics the behavior of a real object in controlled ways.

### **Stub**
A simplified implementation of a component that provides predefined responses.

### **Test Runner**
A tool that executes tests and reports results (e.g., Jest, Vitest).

### **Assertion**
A statement that checks if a condition is true, used in tests to verify expected behavior.

## 📚 Documentation Terms

### **JSDoc**
A markup language used to annotate JavaScript code with documentation comments.

### **Swagger/OpenAPI**
A specification for documenting REST APIs, providing interactive documentation and code generation.

### **README**
A file that provides an overview of a project, including setup instructions and usage information.

### **API Documentation**
Documentation that describes the endpoints, parameters, and responses of an API.

### **Architecture Diagram**
A visual representation of the system's structure and how components interact with each other.

### **Mermaid**
A JavaScript-based diagramming and charting tool that renders text-based descriptions to create diagrams.

### **Markdown**
A lightweight markup language used for creating formatted text documents.

## 🔄 Development Workflow

### **Git**
A distributed version control system used for tracking changes in source code.

### **Branch**
A separate line of development that allows you to work on features without affecting the main codebase.

### **Merge**
The process of combining changes from one branch into another.

### **Pull Request**
A request to merge changes from one branch into another, typically used for code review.

### **Code Review**
The process of examining code changes to ensure quality, correctness, and adherence to standards.

### **Continuous Integration**
A development practice where code changes are automatically tested and integrated into the main codebase.

### **Continuous Deployment**
A development practice where code changes are automatically deployed to production after passing tests.

### **Feature Branch**
A branch created for developing a specific feature, separate from the main development branch.

### **Hotfix**
A quick fix for a critical bug that needs to be deployed immediately.

## 🌍 Internationalization

### **i18n (Internationalization)**
The process of designing software to be easily adapted for different languages and regions.

### **Localization (l10n)**
The process of adapting software for a specific locale or region.

### **Locale**
A set of parameters that defines the user's language, region, and cultural preferences.

### **Translation**
The process of converting text from one language to another.

### **RTL (Right-to-Left)**
Text direction used in languages like Arabic and Hebrew.

### **LTR (Left-to-Right)**
Text direction used in most languages.

## 📱 Mobile Terms

### **Responsive Design**
A design approach that ensures web applications work well on mobile devices.

### **Progressive Web App (PWA)**
A web application that provides a native app-like experience on mobile devices.

### **Service Worker**
A script that runs in the background and provides features like offline functionality and push notifications.

### **Mobile-First Design**
A design approach that prioritizes mobile devices in the design process.

### **Touch Target**
The area of a button or link that responds to touch input on mobile devices.

## 📊 Monitoring Terms

### **Logging**
The process of recording events and information about an application's execution.

### **Error Tracking**
The process of monitoring and collecting information about errors that occur in an application.

### **Performance Monitoring**
The process of tracking and analyzing application performance metrics.

### **Uptime**
The amount of time an application is available and functioning correctly.

### **Health Check**
A mechanism for determining if an application is functioning correctly.

### **Alert**
A notification sent when certain conditions are met (e.g., high error rate, downtime).

### **Dashboard**
A visual interface that displays key metrics and information about an application.

### **Metrics**
Quantifiable measures used to track and assess the performance of an application.

---

**Note**: This glossary is a living document and will be updated as new terms and concepts are introduced to the project. If you encounter a term that's not defined here, please suggest it for inclusion. 📝 