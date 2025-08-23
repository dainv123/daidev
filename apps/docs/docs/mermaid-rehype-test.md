# Rehype Mermaid Test

Testing rehype-mermaid plugin with img-svg strategy.

## 1. Basic Flowchart

```mermaid
flowchart TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    C --> E[End]
    D --> A
```

## 2. Sequence Diagram

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API
    participant Database
    
    User->>Frontend: Login Request
    Frontend->>API: POST /auth/login
    API->>Database: Validate User
    Database-->>API: User Data
    API-->>Frontend: JWT Token
    Frontend-->>User: Login Success
```

## 3. Class Diagram

```mermaid
classDiagram
    class User {
        +String id
        +String name
        +String email
        +login()
        +logout()
    }
    
    class Theme {
        +String id
        +String title
        +String description
    }
    
    User ||--o{ Theme : creates
```

## 4. ER Diagram

```mermaid
erDiagram
    USER ||--o{ THEME : creates
    USER {
        string id
        string name
        string email
    }
    THEME {
        string id
        string title
        string description
    }
```

## 5. Gantt Chart

```mermaid
gantt
    title Development Timeline
    dateFormat  YYYY-MM-DD
    section Phase 1
    Planning    :done, plan, 2024-01-01, 2024-01-15
    section Phase 2
    Development :active, dev, 2024-01-16, 2024-02-15
    section Phase 3
    Testing     :test, 2024-02-16, 2024-02-28
```

If you see actual chart images above (not text), then rehype-mermaid is working! 🎉