# Traffic Analytics Platform

A full-stack traffic analytics platform that visualizes country-wise and vehicle-wise traffic data through an interactive, responsive dashboard.

The application is built with React on the frontend and NestJS on the backend. Traffic data is stored in PostgreSQL using Prisma ORM, while Redis is used as a caching layer to improve API performance. The complete application is Dockerized, including frontend, backend, PostgreSQL, and Redis services, so it can be started with a single Docker Compose command.

---

## Features

- Interactive traffic analytics dashboard
- Country-wise traffic visualization using animated bar charts
- Vehicle type distribution visualization using responsive donut charts
- Dynamic Top Countries world map visualization
- Country report generation from the Top Countries widget
- Recent Traffic Summary table with API-backed pagination
- Responsive mobile-first dashboard layout
- Dark and light mode support
- Interactive date range filtering
- Real-time dashboard refresh functionality
- Redis caching for optimized analytics API performance
- PostgreSQL database integration
- Prisma ORM for database schema management and querying
- Dockerized frontend, backend, PostgreSQL, and Redis setup
- Automatic database schema synchronization and seed data generation
- GitHub Actions CI/CD pipeline setup
- Frontend and backend unit test configuration
- Modern animated dashboard UI with reusable components

---

## Dashboard Navigation & Functionalities

The application sidebar is designed to simulate a scalable enterprise traffic analytics administration platform.

### Dashboard
The Dashboard section includes:
- Traffic overview statistic cards
- Country-wise traffic bar chart
- Vehicle distribution donut chart
- Recent traffic summary table
- API-based pagination support
- Top countries interactive world map
- Country report generation functionality
- Date range filtering support
- Real-time refresh action

### Settings
The Settings section includes complete traffic data management functionality:
- Add traffic records
- Update existing traffic records
- Delete traffic records
- Automatically refresh analytics after data modifications
- Dynamic dashboard updates based on latest database records

### Static Demonstration Modules
The following modules are currently included as UI demonstration sections to represent future enterprise scalability and extensibility:

- Countries
- Vehicles
- Reports
- Alerts
- Admin Profile Section

These sections are intentionally provided as view-only modules to demonstrate how the platform architecture can be extended into a larger traffic monitoring and reporting ecosystem.

### How to Test Dashboard Functionality

- Use the **date range selector** at the top to filter dashboard analytics data.
- Click the **refresh icon** to reload dashboard data and charts.
- Navigate to **Settings** to add, update, or delete traffic records.
- After modifying data in Settings, return to the Dashboard to see charts and analytics update dynamically.
- Use the **Recent Traffic Summary** pagination controls to browse traffic records.
- Use the **Top Countries** section to generate downloadable country traffic reports.



---

# Tech Stack

## Frontend

### React + Vite
Used for building a fast, component-based frontend application with optimized development and production builds.

- React was used to create reusable dashboard components.
- Vite was used for faster local development, hot module replacement (HMR), and optimized production bundling.

### Recharts
Used for building interactive analytics charts.

Implemented for:
- Country-wise traffic bar chart
- Vehicle distribution donut chart
- Interactive tooltips
- Responsive chart rendering

### React Simple Maps
Used to render the interactive Top Countries world map visualization.

Implemented for:
- Dynamic country highlighting
- Country-based traffic visualization
- Interactive map rendering

### React Datepicker
Used for implementing the dashboard date range filtering functionality.

Implemented for:
- Start and end date selection
- Dashboard analytics filtering
- Controlled date validation

### React Icons
Used for dashboard icons and sidebar navigation visuals.

Implemented for:
- Dashboard statistic cards
- Sidebar menu items
- Action buttons
- Navigation interactions

### Framer Motion
Used for lightweight dashboard animations and smoother UI interactions.

Implemented for:
- Card transitions
- Hover animations
- Dashboard interaction effects

### CSS3
Custom CSS was used instead of UI frameworks to create a fully customized dashboard design.

Implemented for:
- Responsive layout
- Mobile responsiveness
- Dark/light theme support
- Sidebar animations
- Chart styling
- Dashboard grid layouts

---

## Backend

### NestJS
Used as the backend framework for creating scalable REST APIs.

Implemented for:
- Traffic analytics APIs
- Data management APIs
- Modular backend architecture
- Clean service-controller structure

### Prisma ORM
Used for database schema management and PostgreSQL querying.

Implemented for:
- Database models
- Schema synchronization
- Grouped traffic aggregation queries
- Database CRUD operations

### PostgreSQL
Used as the primary relational database.

Implemented for:
- Traffic data storage
- Country and vehicle traffic aggregation
- Persistent analytics records

### Redis
Used as an in-memory caching layer to improve dashboard performance.

Implemented for:
- API response caching
- Faster analytics retrieval
- Reduced database load
- Optimized repeated dashboard requests

---

## DevOps & Infrastructure

### Docker
Used to containerize the complete application stack.

Implemented for:
- Frontend containerization
- Backend containerization
- PostgreSQL container
- Redis container

### Docker Compose
Used to orchestrate all containers with a single startup command.

Implemented for:
- Multi-container local environment
- Service networking
- Environment management
- Simplified project execution

### Nginx
Used as the frontend production web server.

Implemented for:
- Serving optimized frontend build files
- Static asset delivery
- Frontend routing support

### GitHub Actions (CI/CD)
Used for automated build validation and continuous integration.

Implemented for:
- Frontend build verification
- Backend build verification
- Automated GitHub workflow execution on push/pull request

### Jest + Vitest
Used for backend and frontend unit test setup.

Implemented for:
- Backend service testing
- Frontend test configuration
- Basic automated test validation

---

# System Architecture

The application follows a modular full-stack architecture designed for scalability, maintainability, and performance optimization.

```text
┌─────────────────────────────┐
│        React Frontend       │
│  Dashboard UI + Charts UI  │
└──────────────┬──────────────┘
               │ HTTP Requests
               ▼
┌─────────────────────────────┐
│       NestJS Backend API    │
│  REST APIs + Business Logic │
└──────────────┬──────────────┘
               │
        ┌──────┴──────┐
        ▼             ▼
┌──────────────┐ ┌────────────────┐
│ Redis Cache  │ │ PostgreSQL DB  │
│ Fast Retrieval│ │ Persistent Data│
└──────────────┘ └────────────────┘

Architecture Flow
1. React Frontend Layer

The frontend is built using React and Vite and acts as the presentation layer of the application.

Responsibilities:

Rendering dashboard analytics
Displaying charts and map visualizations
Managing UI state and interactions
Handling date filtering
Calling backend APIs
Managing responsive layouts
Supporting dark/light themes

The frontend communicates with the backend using REST APIs.

2. NestJS Backend API Layer

NestJS acts as the centralized backend service layer.

Responsibilities:

Exposing traffic analytics APIs
Handling CRUD operations
Managing business logic
Aggregating country-wise and vehicle-wise traffic data
Integrating Redis caching
Interacting with PostgreSQL through Prisma ORM

The backend follows a modular architecture:

Controllers → API endpoints
Services → Business logic
Prisma Layer → Database communication
3. Redis Caching Layer

Redis is used as an in-memory caching layer between the backend and database.

Responsibilities:

Caching analytics responses
Reducing repeated database queries
Improving dashboard response times
Handling frequently requested aggregated traffic data

Caching was implemented mainly for:

Country-wise traffic analytics
Vehicle distribution analytics

This reduces unnecessary database load and improves scalability.

4. PostgreSQL Database Layer

PostgreSQL is used as the primary relational database.

Responsibilities:

Persisting traffic records
Managing country and vehicle traffic data
Supporting aggregation queries
Maintaining structured relational data

The database schema is managed using Prisma ORM.

Data Flow Example
Dashboard Analytics Request Flow
User opens dashboard or changes date range.
React frontend sends API request to NestJS backend.
Backend checks Redis cache:
If cached data exists → return cached response.
Otherwise → query PostgreSQL.
Prisma ORM fetches aggregated traffic data.
Backend stores response in Redis cache.
API response is returned to frontend.
React updates charts, tables, and dashboard widgets dynamically.
Scalability Considerations

The architecture was designed so that each layer can scale independently.

Frontend Scaling
Can be hosted behind CDN or Nginx
Static assets can be cached globally
Backend Scaling
Multiple NestJS instances can run behind a load balancer
Stateless backend architecture supports horizontal scaling
Redis Scaling
Redis reduces direct database pressure
Can be migrated to dedicated Redis cluster for high traffic
Database Scaling
PostgreSQL supports indexing and query optimization
Read replicas can be introduced for analytics-heavy workloads
Containerized Deployment Architecture

The application is fully containerized using Docker Compose.

Containers included:

Frontend container
Backend container
PostgreSQL container
Redis container

Benefits:

Simplified setup
Environment consistency
Easy deployment
Reduced local dependency conflicts
Faster onboarding for reviewers and developers

---

# Scalability Approach

The platform architecture was designed to scale progressively based on traffic load and usage requirements.

## 5 Requests Per Second (RPS)

Suitable for:
- Local development
- Small internal dashboards
- Initial deployment environments

Architecture:
- Single NestJS backend instance
- Single PostgreSQL database instance
- Local Redis cache
- Docker Compose-based deployment

Optimizations:
- Lightweight REST APIs
- Basic Redis response caching
- Efficient grouped database queries using Prisma ORM

At this stage, the application can comfortably handle small traffic loads with minimal infrastructure requirements.

---

## 50 Requests Per Second (RPS)

Suitable for:
- Medium-scale internal analytics platforms
- Team-level usage
- Moderate concurrent dashboard traffic

Enhancements:
- Redis caching layer reduces repeated database queries
- Optimized aggregation queries improve analytics performance
- Nginx serves frontend static assets efficiently
- Dockerized services simplify scaling and deployment
- Reduced API response times through cached analytics responses

Benefits:
- Lower database pressure
- Faster dashboard rendering
- Improved backend throughput
- Better concurrent request handling

At this scale, caching becomes critical to maintain consistent dashboard performance.

---

## 500 Requests Per Second (RPS)

Suitable for:
- Enterprise-level analytics platforms
- High concurrent user traffic
- Production-scale deployments

Scaling Strategy:

### Horizontal Backend Scaling
Multiple NestJS backend instances can run behind a load balancer to distribute incoming traffic.

### Load Balancer Integration
A load balancer can:
- Distribute traffic evenly
- Prevent backend overload
- Improve system availability

### PostgreSQL Read Replicas
Read replicas can handle analytics-heavy read operations separately from write operations.

Benefits:
- Improved database scalability
- Reduced query bottlenecks
- Better reporting performance

### Dedicated Redis Cluster
Redis can be scaled into a dedicated distributed caching cluster for high-volume analytics requests.

### Kubernetes Deployment
Kubernetes can be introduced for:
- Container orchestration
- Auto-scaling
- Self-healing deployments
- Rolling updates
- Production-grade infrastructure management

### CDN for Frontend Assets
Frontend static assets can be served through a CDN for:
- Faster global content delivery
- Reduced backend load
- Improved frontend performance

---

## Overall Scalability Design Principles

The application was intentionally designed with:
- Stateless backend services
- Modular frontend architecture
- Externalized caching
- Containerized deployment
- Layered infrastructure separation

This enables each layer of the application to scale independently based on traffic demands.

---

# API Endpoints

Base URL:

```http
http://localhost:4000
```

---

## Analytics APIs

### Get Country-wise Traffic

```http
GET /traffic/country
```

### Get Vehicle-wise Traffic

```http
GET /traffic/vehicle
```

---

## Traffic Management APIs

### Get All Traffic Records

```http
GET /traffic
```

### Create Traffic Record

```http
POST /traffic
```

Request Body:

```json
{
  "country": "Canada",
  "vehicleType": "Truck",
  "count": 1200
}
```

### Update Traffic Record

```http
PUT /traffic/:id
```

Example:

```http
PUT /traffic/1
```

Request Body:

```json
{
  "country": "USA",
  "vehicleType": "Bus",
  "count": 1800
}
```

### Delete Traffic Record

```http
DELETE /traffic/:id
```

Example:

```http
DELETE /traffic/1
```

---

## Pagination API

### Get Paginated Country Traffic Summary

```http
GET /traffic/countries/paginated?page=1&limit=3
```

---

# Execution Steps

## Recommended: Run with Docker

The easiest way to run the complete application is through Docker Compose. This starts the frontend, backend, PostgreSQL, and Redis together.

```bash
docker compose up --build
```

After startup, open:

```text
Frontend: http://localhost:5173
Backend:  http://localhost:4000
```

Docker automatically handles:
- PostgreSQL container startup
- Redis container startup
- Backend container startup
- Frontend Nginx container startup
- Prisma schema synchronization
- Sample traffic data seeding

To stop all containers:

```bash
docker compose down
```

To reset database volume and reseed data:

```bash
docker compose down -v
docker compose up --build
```

---

# Run Locally Without Docker

## Prerequisites

Make sure the following are installed and running locally:

- Node.js
- PostgreSQL
- Redis

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/trafficdb"
REDIS_HOST=localhost
REDIS_PORT=6379
PORT=4000
```

Sync Prisma schema:

```bash
npx prisma db push
```

Seed sample data:

```bash
npx prisma db seed
```

Start backend:

```bash
npm run start:dev
```

Backend runs at:

```text
http://localhost:4000
```

---

## Frontend Setup

```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

# Testing

## Backend Tests

```bash
cd backend
npm run test
```

## Frontend Tests

```bash
cd frontend
npm run test -- --run
```

---

# Database

The application uses PostgreSQL as the primary database.

Database responsibilities:
- Store traffic records
- Support traffic aggregation by country
- Support traffic aggregation by vehicle type
- Support CRUD operations from the Settings page

Prisma ORM is used for:
- Database schema management
- Query generation
- Data aggregation
- Database synchronization

Docker setup automatically creates the required schema and inserts sample seed data.

---

# Redis Caching

Redis is used as a caching layer for analytics APIs.

Redis helps to:
- Cache country-wise traffic analytics
- Cache vehicle distribution analytics
- Reduce repeated PostgreSQL queries
- Improve dashboard response time

Cache is cleared automatically when traffic records are added, updated, or deleted through the application.

---

# Docker Setup

The project includes a complete Docker Compose setup with:

- React frontend served through Nginx
- NestJS backend API
- PostgreSQL database
- Redis cache
- Automatic Prisma schema sync
- Automatic seed data insertion

This allows reviewers or developers to run the complete project with one command:

```bash
docker compose up --build
```

---

# CI/CD Pipeline

GitHub Actions is configured for continuous integration.

The pipeline validates:
- Backend dependency installation
- Prisma client generation
- Backend build
- Frontend dependency installation
- Frontend production build

The workflow runs automatically on push and pull request events.

---

# Future Improvements

- Real-time traffic streaming using WebSockets
- Advanced dashboard filters
- User authentication and authorization
- Role-based admin access
- Kubernetes deployment
- Cloud deployment with managed PostgreSQL and Redis
- More detailed unit and integration test coverage

---

# Author

Nancy Bhoot
