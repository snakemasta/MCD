# MCD Platform Architecture

## System Overview

The MCD Platform is built as a modern microservices-oriented application with clear separation between frontend, backend, and data layers.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    Frontend (React.js)                       │
│  ┌──────────────────┬──────────────────┬──────────────────┬─────────────┐  │
│  │ Dashboards       │ Investigations   │ Evidence         │ Analytics   │  │
│  │                  │ Management       │ Management       │             │  │
│  └──────────────────┴──────────────────┴──────────────────┴─────────────┘  │
│                         │                                                    │
│                    WebSocket / REST                                          │
│                         ▼                                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                    API Gateway (Express.js)                 │
│  ┌──────────────────────────────────────────────────────────────────────────┐│
│  │ Authentication │ Authorization │ Rate Limiting │ Logging              ││
│  └──────────────────────────────────────────────────────────────────────────┘│
│                         │                                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                    Backend Services                          │
│  ┌──────────────────┬──────────────────┬──────────────────┐  │
│  │ Investigation   │ Evidence         │ Person Database  │  │
│  │ Service         │ Service          │ Service          │  │
│  ├──────────────────┼──────────────────┼──────────────────┤  │
│  │ Warrant         │ Interview        │ Surveillance     │  │
│  │ Service         │ Service          │ Service          │  │
│  ├──────────────────┼──────────────────┼──────────────────┤  │
│  │ Gang Intel      │ BOLO             │ Relationship     │  │
│  │ Service         │ Service          │ Map Service      │  │
│  └──────────────────┴──────────────────┴──────────────────┘  │
│                         │                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                    Data Layer                                │
│  ┌──────────────────────────────────────────────────────────────────────────┐│
│  │ PostgreSQL (Primary) │ Redis (Cache) │ Elasticsearch                    ││
│  └──────────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────┘
```

## Core Services

### 1. Investigation Service
- Manages investigation lifecycle (Active, Cold, Closed)
- Case assignment and prioritization
- Investigation linking and merging
- Timeline and task management
- Checklist tracking

### 2. Evidence Service
- Evidence record management
- Chain of custody tracking
- External links (Google Drive, Docs, Bodycam, etc.)
- Evidence categorization and tagging
- Audit history and versioning

### 3. Person Database Service
- Master profile management
- Deduplication and merging
- Relationship tracking
- Criminal history
- Biometric data management

### 4. Warrant Service
- Search, arrest, and bench warrant management
- Approval workflow
- Service tracking and returns
- Expiration management

### 5. Interview Service
- Interview recording and transcription
- Interview type classification
- Follow-up tracking
- Credibility assessment

### 6. Surveillance Service
- GPS tracking integration
- Camera and drone operation logs
- Stakeout documentation
- Surveillance timeline

### 7. Gang Intelligence Service
- Gang profile management
- Member and leadership tracking
- Territory and resource mapping
- Criminal activity logging

### 8. Relationship Mapping Service
- Connection visualization
- Interactive graph rendering
- Relationship type definition
- Export capabilities

### 9. BOLO Service
- BOLO creation and distribution
- Status and expiration tracking
- Acknowledgment management
- Search and filter

### 10. Notification Service
- Real-time WebSocket updates
- Email notifications
- SMS alerts (configurable)
- Notification preferences

## Data Flow

### Investigation Creation Flow
```
User Request → API Gateway → Investigation Service
                                ↓
                        Create Investigation Record
                                ↓
                        Create Investigation Timeline Entry
                                ↓
                        Trigger Notification Service
                                ↓
                        Update Elasticsearch Index
                                ↓
                        Return to Frontend
```

### Evidence Linking Flow
```
User uploads Evidence → API Gateway → Evidence Service
                                        ↓
                                Check Chain of Custody
                                        ↓
                                Store Evidence Record
                                        ↓
                                Create Audit Entry
                                        ↓
                                Update Investigation Timeline
                                        ↓
                                Update Relationship Map
                                        ↓
                                Trigger Notifications
```

## Security Architecture

### Authentication
- JWT token-based authentication
- OAuth2 integration for SSO
- Refresh token rotation
- Session management

### Authorization
- Role-based access control (RBAC)
- Permission-based resource access
- Investigation-level permissions
- Hierarchical role model

### Data Protection
- Encryption at rest (PostgreSQL)
- Encryption in transit (HTTPS/WSS)
- Audit logging for all sensitive operations
- Data access logging

### Compliance
- Criminal Justice Information Services (CJIS) compliance
- Secure password policies
- Multi-factor authentication support
- Regular security audits

## Scalability Considerations

### Horizontal Scaling
- Load balancer for API Gateway
- Database connection pooling
- Redis caching layer
- Elasticsearch for full-text search

### Database Optimization
- Strategic indexing
- Query optimization
- Partitioning for large tables
- Archive strategy for cold cases

### Caching Strategy
- Redis for session storage
- Redis for frequently accessed data
- Browser caching for static assets
- Investigation summary caching

## Deployment Architecture

### Development
- Docker Compose for local environment
- In-memory databases for testing
- Mock services for external integrations

### Staging
- Kubernetes cluster
- Separate database instance
- Test data and scenarios

### Production
- Kubernetes cluster (multiple nodes)
- Database replication and backup
- CDN for static assets
- Monitoring and alerting
