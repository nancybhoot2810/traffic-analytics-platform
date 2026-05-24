# Traffic Analytics Platform

A full-stack traffic analytics dashboard that visualizes country-wise and vehicle-wise traffic data using interactive charts and modern UI components.

---

# Features

- Interactive traffic analytics dashboard
- Country-wise traffic visualization
- Vehicle type distribution visualization
- Responsive modern UI
- Dark / Light mode support
- Redis caching for optimized API performance
- PostgreSQL database integration
- Dockerized full-stack setup
- Automatic database migration and seed data generation

---

# Tech Stack

## Frontend
- React + Vite
- Recharts
- React Icons
- Framer Motion
- CSS3

## Backend
- NestJS
- Prisma ORM
- Redis
- PostgreSQL

## DevOps
- Docker
- Docker Compose
- Nginx

---

# System Architecture

```text
React Frontend
       ↓
NestJS Backend API
       ↓
Redis Cache
       ↓
PostgreSQL Database
```

---

# Interactive Graphs

## Country-wise Traffic
- Bar chart visualization
- Dynamic country highlighting
- Interactive tooltips

## Vehicle Type Distribution
- Interactive donut chart
- Dynamic percentages
- Responsive chart rendering

---

# Scalability Approach

## 5 RPS
- Single backend instance
- Local PostgreSQL
- In-memory caching

## 50 RPS
- Redis caching layer
- Optimized database queries
- Docker containerization
- Nginx static frontend serving

## 500 RPS
- Horizontal backend scaling
- Load balancer integration
- PostgreSQL read replicas
- Kubernetes deployment
- CDN for frontend assets
- Dedicated Redis cluster

---

# API Endpoints

## Country-wise Traffic

```http
GET /traffic/country
```

## Vehicle-wise Traffic

```http
GET /traffic/vehicle
```

---

# Run Locally

## Backend

```bash
cd backend
npm install
npm run start:dev
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# Run with Docker

```bash
docker compose up --build
```

Frontend:
```text
http://localhost:5173
```

Backend:
```text
http://localhost:4000
```

---

# Database

- PostgreSQL database
- Prisma ORM
- Automatic schema sync
- Seeded sample traffic data

---

# Redis Caching

Redis is used to:
- Cache traffic analytics responses
- Reduce database load
- Improve API response time

---

# Docker Setup

The project includes:
- Frontend container
- Backend container
- PostgreSQL container
- Redis container
- Nginx production serving

---

# Future Improvements

- Real-time traffic streaming
- WebSocket integration
- Advanced filtering
- Kubernetes deployment
- Authentication & authorization
- CI/CD pipeline
- Unit and integration testing

---

# Author

Nancy Bhoot
