# Mermaid Diagrams Test

This page demonstrates various Mermaid diagrams that should render as charts instead of text.

## Flowchart Example

```mermaid
flowchart TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> B
    C --> E[End]
```

## Sequence Diagram Example

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database
    
    User->>Frontend: Login Request
    Frontend->>Backend: POST /auth/login
    Backend->>Database: Validate Credentials
    Database-->>Backend: User Data
    Backend-->>Frontend: JWT Token
    Frontend-->>User: Redirect to Dashboard
```

## Class Diagram Example

```mermaid
classDiagram
    class User {
        +String id
        +String name
        +String email
        +String role
        +login()
        +logout()
    }
    
    class Theme {
        +String id
        +String title
        +String description
        +String[] tags
        +create()
        +update()
        +delete()
    }
    
    User ||--o{ Theme : manages
```
```

## ER Diagram Example

```mermaid
erDiagram
    USER {
        string id PK
        string name
        string email
        string role
        string tenantId
    }
    
    THEME {
        string id PK
        string title
        string description
        string tenantId FK
        boolean isActive
    }
    
    TAG {
        string id PK
        string name
        string description
        string tenantId FK
    }
    
    THEME_TAG {
        string themeId FK
        string tagId FK
    }
    
    USER ||--o{ THEME : manages
    THEME }o--o{ TAG : has
```
```

## Gantt Chart Example

```mermaid
gantt
    title Project Timeline
    dateFormat  YYYY-MM-DD
    section Planning
    Requirements Analysis    :done, req1, 2024-01-01, 2024-01-15
    System Design          :done, design1, 2024-01-16, 2024-02-01
    section Development
    Frontend Development   :active, frontend1, 2024-02-01, 2024-03-15
    Backend Development    :active, backend1, 2024-02-01, 2024-03-15
    section Testing
    Unit Testing          :test1, 2024-03-16, 2024-03-30
    Integration Testing   :test2, 2024-04-01, 2024-04-15
```

## Pie Chart Example

```mermaid
pie title Technology Stack Distribution
    "Frontend" : 35
    "Backend" : 30
    "Database" : 15
    "DevOps" : 10
    "Testing" : 10
```

## State Diagram Example

```mermaid
stateDiagram-v2
    [*] --> Idle
    Idle --> Processing : Start Task
    Processing --> Success : Task Complete
    Processing --> Error : Task Failed
    Success --> Idle : Reset
    Error --> Idle : Reset
    Error --> Processing : Retry
```

## Git Graph Example

```mermaid
gitgraph
    commit
    branch develop
    checkout develop
    commit
    commit
    checkout main
    merge develop
    commit
    commit
```

## C4 Context Diagram

```mermaid
C4Context
    title System Context diagram for daidev Portfolio Platform
    
    Person(user, "User", "A user browsing the portfolio")
    Person(admin, "Admin", "An administrator managing content")
    
    System(webApp, "Web App", "Next.js public portfolio application")
    System(adminApp, "Admin Dashboard", "React admin interface")
    System(api, "Backend API", "Nest.js REST API")
    System(db, "Database", "MongoDB database")
    System(cloudinary, "Cloudinary", "Image management service")
    System(resend, "Resend", "Email service")
    
    Rel(user, webApp, "Browses", "HTTPS")
    Rel(admin, adminApp, "Manages content", "HTTPS")
    Rel(webApp, api, "API calls", "JSON/HTTPS")
    Rel(adminApp, api, "API calls", "JSON/HTTPS")
    Rel(api, db, "Reads/Writes", "MongoDB")
    Rel(api, cloudinary, "Uploads images", "HTTPS")
    Rel(api, resend, "Sends emails", "HTTPS")
```

## Mindmap Example

```mermaid
mindmap
  root((daidev))
    Frontend
      Next.js
        Pages
        Components
        Styling
      Nuxt.js
        Theme Detail
        Micro Frontend
    Backend
      Nest.js
        Controllers
        Services
        Guards
      MongoDB
        Collections
        Indexes
    DevOps
      Vercel
      Railway
      GitHub Actions
```

## Timeline Example

```mermaid
timeline
    title daidev Development Timeline
    section Phase 1
        Project Setup : 2024-01-01
        Basic Architecture : 2024-01-15
    section Phase 2
        Frontend Development : 2024-02-01
        Backend Development : 2024-02-01
    section Phase 3
        Integration : 2024-03-01
        Testing : 2024-03-15
    section Phase 4
        Deployment : 2024-04-01
        Launch : 2024-04-15
```

## Journey Example

```mermaid
journey
    title User Journey
    section Discovery
      Visit Homepage: 5: User
      Browse Themes: 4: User
      Read Blog: 3: User
    section Engagement
      Contact Form: 4: User
      Download Theme: 5: User
    section Admin
      Login: 5: Admin
      Manage Content: 4: Admin
      Upload Images: 3: Admin
```

---

## How to Use Mermaid in Docusaurus

To create Mermaid diagrams in your documentation:

1. **Use the mermaid code block syntax:**
   ```markdown
   ```mermaid
   flowchart TD
       A[Start] --> B[End]
   ```
   ```

2. **Supported diagram types:**
   - Flowcharts
   - Sequence diagrams
   - Class diagrams
   - Entity Relationship diagrams
   - Gantt charts
   - Pie charts
   - State diagrams
   - Git graphs
   - C4 diagrams
   - Mindmaps
   - Timelines
   - Journey maps

3. **Themes:**
   - Light mode: Neutral theme
   - Dark mode: Forest theme

The diagrams will automatically render as interactive charts instead of text! 