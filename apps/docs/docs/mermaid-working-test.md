# Mermaid Working Test

Testing if Mermaid diagrams render correctly.

## Basic Flowchart

```mermaid
flowchart TD
    A[Start] --> B[Process]
    B --> C[End]
```

## Simple Sequence

```mermaid
sequenceDiagram
    participant A as User
    participant B as System
    A->>B: Request
    B-->>A: Response
```

## Class Diagram

```mermaid
classDiagram
    class User {
        +String name
        +String email
        +login()
    }
```

If you see diagrams above (not text), Mermaid is working correctly! 