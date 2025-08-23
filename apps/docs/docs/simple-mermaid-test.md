# Simple Mermaid Test

This is a simple test to check if Mermaid is working.

## Basic Flowchart

```mermaid
graph TD
    A[Start] --> B[End]
```

## Your Login Process

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

## Simple Class Diagram

```mermaid
classDiagram
    class User {
        +String id
        +String name
        +login()
    }
```

If you can see these as charts (not text), then Mermaid is working! 