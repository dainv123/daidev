# Fixed Mermaid Test

Testing with correct Mermaid syntax.

## 1. Basic Flowchart

```mermaid
flowchart TD
    A[Start] --> B[End]
```

## 2. Your Login Process

```mermaid
sequenceDiagram
    participant F as Frontend
    participant A as API (Auth)
    participant D as Database
    participant J as JWT Service
    
    F->>A: Login Request
    A->>D: Validate Credentials
    D-->>A: User Data
    A->>J: Generate JWT
    J-->>A: JWT Token
    A-->>F: Login Response
```

## 3. Simple Class Diagram

```mermaid
classDiagram
    class User {
        +String id
        +String name
        +String email
        +login()
    }
    
    class Theme {
        +String id
        +String title
        +String description
    }
    
    User --> Theme
```

## 4. Simple ER Diagram

```mermaid
erDiagram
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
    
    USER ||--o{ THEME : creates
```

## 5. Simple Gantt

```mermaid
gantt
    title Project Timeline
    dateFormat  YYYY-MM-DD
    section Phase 1
    Planning    :done, plan1, 2024-01-01, 2024-01-15
    section Phase 2
    Development :active, dev1, 2024-01-16, 2024-02-01
```

If you see charts above, Mermaid is working correctly! 