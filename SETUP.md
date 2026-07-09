# Setup and Installation

## Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Docker & Docker Compose
- Git

## Development Environment Setup

### 1. Clone the Repository

```bash
git clone https://github.com/snakemasta/MCD.git
cd MCD
```

### 2. Install Dependencies

```bash
# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```

### 3. Database Setup

```bash
# Start PostgreSQL via Docker
docker-compose up -d postgres

# Run migrations
cd backend
npm run db:migrate

# Seed initial data
npm run db:seed
```

### 4. Environment Configuration

Create `.env` files in backend and frontend directories:

**backend/.env**
```
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/mcd
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRY=7d
```

**frontend/.env**
```
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_WS_URL=ws://localhost:3001
```

### 5. Run Development Servers

```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm start
```

Backend will be available at `http://localhost:3001`
Frontend will be available at `http://localhost:3000`

## Docker Compose

For complete environment setup:

```bash
docker-compose up -d
```

This starts:
- PostgreSQL database
- Backend API
- Frontend application
- Elasticsearch (for search)

## Running Tests

```bash
# Backend tests
cd backend
npm run test

# Frontend tests
cd frontend
npm run test

# Integration tests
cd backend
npm run test:integration
```

## Building for Production

```bash
# Backend build
cd backend
npm run build

# Frontend build
cd frontend
npm run build
```
