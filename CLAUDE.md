# Reactivities

Fullstack activity-management app. Clean Architecture + CQRS (MediatR) on the backend, React SPA on the frontend.

## Tech Stack

**Backend:** .NET 10, ASP.NET Core 10, EF Core 10.0.8, PostgreSQL 17, MediatR 14.1.0, AutoMapper 16.1.1, Swagger 10.1.7

**Frontend:** React 19, TypeScript 6, Vite 8, MUI v9, Axios 1.16

## Project Structure

```
API/          → Controllers, DI setup, middleware
Application/  → CQRS handlers (Queries + Commands), AutoMapper profiles
Domain/       → Activity entity (no dependencies)
Persistence/  → EF Core DbContext, migrations, seed data
Client/       → React SPA (src/app/layout/, src/features/, src/lib/)
```

## Run

```bash
docker-compose up -d        # PostgreSQL on :5432
dotnet run --project API    # API on https://localhost:5001
cd Client && npm run dev    # Frontend on https://localhost:3000
```
