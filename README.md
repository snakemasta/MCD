# Major Crimes Division (MCD) Case Management Platform

A comprehensive case management system for law enforcement that enables detectives, investigators, supervisors, and command staff to manage complex criminal investigations from initial report through prosecution while keeping all information linked together.

## Features

### Core Modules
- **Investigation Repository** - Centralized case management with status tracking
- **Evidence Locker** - Chain of custody and comprehensive evidence tracking
- **Master Person Database** - Unified profiles for all persons of interest
- **Gang Intelligence** - Gang organization and member tracking
- **Organization Intelligence** - Criminal organization database
- **Investigation Timeline** - Automatic chronological case events
- **Relationship Mapping** - Interactive visualization of connections
- **Warrant Management** - Complete warrant lifecycle management
- **Surveillance Module** - Operation and GPS tracking
- **Interview Management** - Multi-type interview system
- **BOLO Center** - Person/vehicle/weapon alerts
- **Detective Dashboard** - Role-based investigation overview
- **Admin Panel** - System configuration and management

## Project Structure

```
mcd-platform/
├── backend/
│   ├── api/
│   ├── models/
│   ├── services/
│   ├── middleware/
│   └── config/
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   └── hooks/
├── database/
│   ├── migrations/
│   └── seeds/
├── docs/
│   ├── architecture/
│   ├── api/
│   └── user-guides/
└── tests/
```

## Tech Stack

- **Backend**: Node.js + Express.js / Python + FastAPI
- **Frontend**: React.js + TypeScript
- **Database**: PostgreSQL
- **Real-time**: WebSocket
- **Authentication**: JWT + OAuth2
- **Search**: Elasticsearch

## Getting Started

See [SETUP.md](./SETUP.md) for detailed installation and development instructions.

## Architecture

Refer to [ARCHITECTURE.md](./docs/architecture/ARCHITECTURE.md) for system design and data flow.

## API Documentation

Refer to [API.md](./docs/api/API.md) for complete API endpoint documentation.

## License

Internal Use Only
