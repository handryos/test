# Handryos Coffee Code Challenge

## Overview

This project is a complete solution for coffee management and showcase, with a backend built in NestJS (Node.js) and a frontend in Next.js (React). The system was developed with a focus on scalability, organization, and best practices, using DDD in the backend and feature-based architecture in the frontend.

**Database:** PostgreSQL.

**Reverse Proxy:** Nginx is configured as a reverse proxy, protecting and routing requests to the API.

**Default Ports:**

- Frontend runs at `http://localhost:3000`
- Backend API is available at `http://localhost:5500/api`

---

## Backend

### Features

- **Coffee CRUD:** Create, read, update, and delete coffees, with pagination, type filtering, and name search.
- **JWT Authentication:** Secure login, route protection, token blacklist.
- **Logout:** Token invalidation, ensuring the user cannot reuse the same token after logout. (Available via API, easily testable with Postman or Insomnia. Not implemented in the frontend to preserve UI aesthetics.)
- **Users:** Registration and authentication.
- **Seeders & Migrations:** Initial database population with coffees.
- **DDD Architecture:** Clear separation between entities, repositories, domain services, use-cases, and interfaces.
- **Swagger:** API documentation available at `http://localhost:5500/docs`.
- **Unit Tests:** Coverage of use-cases, controllers, and services with Jest.
- **Sentry:** Error and performance monitoring. Log in at [Sentry](https://sentry.io/auth/login) with:
  - Email: `handryos12@gmail.com`
  - Password: `yourpassword@`

### Folder Structure

- `src/domain`: Entities, repository interfaces, models, and domain services.
- `src/application/use-cases`: Business logic (e.g., GetAllCoffeesUseCase, AuthUseCase).
- `src/infra`: Configurations, database, controllers, guards, services, repositories.
- `src/modules`: NestJS modules for each feature.
- `src/test`: Unit Jest tests.

### Swagger Documentation

- Endpoints cover authentication, coffees, users, pagination, and filters.

### About tests

- To run the tests, you need the containers running.

### Jest Tests

- Run `yarn test` in the backend path to execute all unit tests.

### Cypress Tests

- Run `yarn test` in the frontend path to execute all e2e tests.
- **Pay attention:** If you are running on WSL (Windows Subsystem for Linux), you must install Cypress dependencies inside your WSL environment. Run all Cypress commands from your WSL terminal, and make sure you have the required libraries (like `libgtk2.0-0`, `libgtk-3-0`, `libxss1`, `libasound2`, etc.) installed. See the official Cypress docs for [Linux dependencies](https://docs.cypress.io/guides/getting-started/installing-cypress#Linux-Prerequisites).

### Sentry

- All errors and exceptions are automatically reported to Sentry.
- Just log in to view dashboards, alerts, and problem tracking.

---

## Frontend

### Features

- **Login:** Form with validation and error feedback.
- **Coffee Showcase:** Paginated listing, type filters, detailed view.
- **Create/Edit Coffee:** Responsive modal, field validation, visual feedback.
- **Delete Coffee:** Possibility to delete coffees.
- **Feature-Based Architecture:** Each feature has its own folder, making maintenance and scalability easier.
- **Animations with Framer Motion:** UI transitions using the [Framer Motion](https://www.framer.com/motion/) library.
- **Redux Thunks:** Asynchronous state management with Redux Toolkit and thunks for API calls.
- **E2E Tests with Cypress:** Automated tests for main frontend flows.

### Folder Structure

- `src/features`: Each feature (auth, coffee, etc.) has its own components, hooks, services, and tests.
- `src/shared`: Reusable components, middlewares, utility services.
- `src/store`: Slices, hooks, and Redux configuration.
- `public`: Static images and assets.

### Cypress Tests

- Tests for login and coffee creation forms.
- To run: `npx cypress open` (with the Next.js server running).

---

## How to Run

### Quick Start

1. **Just rename `.env.example` to `.env` at the project root**

2. **Start everything with Docker Compose**
   - Run the command:
     ```bash
     docker compose up --build
     ```
   - This will build and start all services (backend, frontend, database, nginx) automatically.

Done! The frontend will be available at `http://localhost:3000` and the API at `http://localhost:5500/api`.

---
