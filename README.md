# Reactivities

A full-stack activity management application built with ASP.NET Core and React.

## Tech Stack

**Backend**
- .NET 10 / ASP.NET Core Web API
- PostgreSQL 17 + Entity Framework Core (Npgsql)
- MediatR 14 — CQRS pattern
- Swagger / OpenAPI

**Frontend**
- React 19 + TypeScript
- Vite
- Material UI v9
- Axios

## Architecture

Follows **Clean Architecture** with **CQRS + MediatR**.

```
Domain          → Core entities, no dependencies
Persistence     → EF Core DbContext, migrations, seeding
Application     → CQRS handlers (Queries & Commands)
API             → Controllers, middleware, startup
Client          → React SPA (communicates via REST)
```

**Request flow:**
```
React (Axios) → Controller → Mediator.Send() → Handler → DbContext → PostgreSQL
```

**CQRS separation:**
- `Queries/` — read-only handlers, return data
- `Commands/` — write handlers, mutate data

## Project Structure

```
Reactivities/
├── Domain/                         # Activity entity
├── Persistence/                    # AppDbContext, migrations, seed data
├── Application/
│   └── Activities/
│       ├── Queries/                # GetActivityList, GetActivityDetails
│       └── Commands/               # CreateActivity
├── API/
│   ├── Controllers/                # BaseApiController, ActivitiesController
│   └── Program.cs                  # DI, middleware, startup
└── Client/
    └── src/                        # React components, types
```

## Setup

### Prerequisites
- [.NET 10 SDK](https://dotnet.microsoft.com)
- [Node.js 20+](https://nodejs.org)
- [Docker](https://docker.com)

### 1. Start the database
```bash
docker-compose up -d
```

### 2. Run the API
```bash
cd API
dotnet run
```
The API runs on `https://localhost:5001`. Swagger UI is available at `https://localhost:5001/swagger`.

> Database migrations and seed data are applied automatically on startup.

### 3. Run the frontend
```bash
cd Client
npm install
npm run dev
```
The app runs on `https://localhost:3000`.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/activities` | Get all activities |
| GET | `/api/activities/{id}` | Get activity by ID |
| POST | `/api/activities` | Create a new activity |
