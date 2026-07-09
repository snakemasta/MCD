# MCD Platform API Documentation

## Base URL

```
http://localhost:3001/api
```

## Authentication

All API endpoints require authentication via JWT token in the Authorization header:

```
Authorization: Bearer <JWT_TOKEN>
```

## Endpoints

### Investigations

#### List Investigations
```
GET /investigations
Query Parameters:
  - status: 'active' | 'cold' | 'closed'
  - priority: 'low' | 'medium' | 'high' | 'critical'
  - assigned_to: user_id
  - page: number
  - limit: number

Response:
  {
    "success": true,
    "data": [
      {
        "id": "inv_xxx",
        "case_number": "2024-001",
        "title": "Investigation Title",
        "status": "active",
        "priority": "high",
        "created_at": "2024-01-01T00:00:00Z",
        "assigned_to": "user_id",
        "supervisor_id": "supervisor_id"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100
    }
  }
```

#### Create Investigation
```
POST /investigations
Body:
  {
    "title": "Investigation Title",
    "case_type": "homicide",
    "priority": "high",
    "initial_report": "Description of incident",
    "assigned_to": "user_id",
    "location": "123 Main St"
  }

Response:
  {
    "success": true,
    "data": {
      "id": "inv_xxx",
      "case_number": "2024-001",
      "status": "active"
    }
  }
```

#### Get Investigation Details
```
GET /investigations/:id

Response:
  {
    "success": true,
    "data": {
      "id": "inv_xxx",
      "case_number": "2024-001",
      "title": "Investigation Title",
      "status": "active",
      "priority": "high",
      "description": "Full description",
      "assigned_to": "user_id",
      "supervisor_id": "supervisor_id",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-15T10:30:00Z",
      "timeline": [],
      "evidence_count": 12,
      "related_persons": [],
      "linked_investigations": []
    }
  }
```

### Evidence

#### Add Evidence to Investigation
```
POST /investigations/:id/evidence
Body:
  {
    "title": "Evidence Title",
    "category": "physical" | "digital" | "document" | "media",
    "description": "Evidence description",
    "chain_of_custody": [
      {
        "received_by": "officer_id",
        "received_date": "2024-01-01T00:00:00Z",
        "from": "previous_person"
      }
    ],
    "external_links": [
      {
        "type": "google_drive" | "bodycam" | "photo",
        "url": "https://..."
      }
    ]
  }

Response:
  {
    "success": true,
    "data": {
      "id": "evidence_xxx",
      "investigation_id": "inv_xxx",
      "status": "logged"
    }
  }
```

#### List Evidence
```
GET /investigations/:id/evidence
Query Parameters:
  - category: filter by category
  - status: filter by status
  - page: number
  - limit: number

Response:
  {
    "success": true,
    "data": [...],
    "pagination": {...}
  }
```

### Persons

#### Search Persons
```
GET /persons
Query Parameters:
  - q: search query (name, alias, DOB, etc)
  - type: 'suspect' | 'victim' | 'witness'
  - page: number
  - limit: number

Response:
  {
    "success": true,
    "data": [
      {
        "id": "person_xxx",
        "name": "John Doe",
        "aliases": ["Johnny D"],
        "dob": "1980-01-01",
        "addresses": [],
        "phone_numbers": [],
        "gang_affiliations": []
      }
    ],
    "pagination": {...}
  }
```

#### Create/Update Person
```
POST /persons
PUT /persons/:id
Body:
  {
    "name": "John Doe",
    "aliases": ["Johnny D"],
    "dob": "1980-01-01",
    "addresses": [{"address": "123 Main St", "type": "known"}],
    "phone_numbers": [{"number": "555-1234", "type": "mobile"}],
    "email_addresses": [],
    "distinguishing_marks": "Tattoo on left arm",
    "gang_affiliations": [],
    "notes": "Officer notes"
  }

Response:
  {
    "success": true,
    "data": {
      "id": "person_xxx"
    }
  }
```

### Warrants

#### Create Warrant
```
POST /warrants
Body:
  {
    "type": "search" | "arrest" | "bench",
    "target_person_id": "person_xxx",
    "investigation_id": "inv_xxx",
    "description": "Warrant details",
    "supporting_documents": ["doc_id_1"],
    "judge_id": "judge_id",
    "requested_date": "2024-01-01T00:00:00Z"
  }

Response:
  {
    "success": true,
    "data": {
      "id": "warrant_xxx",
      "status": "pending_review"
    }
  }
```

#### List Warrants
```
GET /warrants
Query Parameters:
  - type: filter by warrant type
  - status: 'pending' | 'approved' | 'served' | 'returned' | 'expired'
  - investigation_id: filter by investigation
  - page: number
  - limit: number

Response:
  {
    "success": true,
    "data": [...],
    "pagination": {...}
  }
```

### BOLOs

#### Create BOLO
```
POST /bolos
Body:
  {
    "type": "person" | "vehicle" | "weapon",
    "subject_id": "person_xxx or vehicle_xxx",
    "description": "BOLO description",
    "investigation_id": "inv_xxx",
    "expiration_date": "2024-02-01T00:00:00Z",
    "status": "active" | "inactive"
  }

Response:
  {
    "success": true,
    "data": {
      "id": "bolo_xxx",
      "status": "active"
    }
  }
```

### Interviews

#### Create Interview
```
POST /interviews
Body:
  {
    "investigation_id": "inv_xxx",
    "subject_id": "person_xxx",
    "type": "witness" | "suspect" | "victim" | "confidential_informant",
    "date": "2024-01-01T14:00:00Z",
    "location": "Interview room",
    "officers": ["officer_id_1"],
    "summary": "Interview summary",
    "recording_url": "https://...",
    "follow_up_questions": ["Question 1"],
    "credibility_notes": "Assessment notes"
  }

Response:
  {
    "success": true,
    "data": {
      "id": "interview_xxx"
    }
  }
```

### Global Search

#### Universal Search
```
GET /search
Query Parameters:
  - q: search query
  - type: 'investigation' | 'person' | 'evidence' | 'warrant' | 'bolo' | 'vehicle' | 'phone'
  - page: number
  - limit: number

Response:
  {
    "success": true,
    "data": {
      "investigations": [...],
      "persons": [...],
      "evidence": [...],
      "warrants": [...],
      "bolos": [...],
      "vehicles": [...]
    },
    "pagination": {...}
  }
```

## Error Responses

```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required",
    "details": ""
  }
}
```

## Status Codes

- 200: OK
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict
- 422: Unprocessable Entity
- 500: Internal Server Error
