# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with the Express API backend in this directory.

## Project Overview

"Daily Tasks API" is the Express.js backend for the Daily Tasks PWA, providing RESTful endpoints for todo management with:
- **Mission**: Reliable, secure API backend for the Daily Tasks Angular PWA
- **Architecture**: Express.js with modular structure (MVC pattern)
- **Technology**: Node.js + Express with ES6 modules and in-memory storage

## Project Structure

```
API/
├── server.js              # Main Express application entry point
├── package.json           # Project dependencies and scripts
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore patterns
├── routes/               # API route definitions
│   └── todos.js         # Todo routes (/api/todos)
├── controllers/          # Business logic handlers
│   └── todoController.js # Todo CRUD operations
└── models/              # Data models and repository
    └── Todo.js          # Todo model and in-memory repository
```

## Common Commands

All commands should be run from the `API/` directory:

### Development
- `npm run dev` - Start development server with nodemon on port 3000
- `npm start` - Start production server
- `node server.js` - Direct server start

### Package Management
- `npm install` - Install dependencies
- `npm install <package>` - Add new dependency
- `npm install -D <package>` - Add development dependency

## API Endpoints

### Base URL: `http://localhost:3000/api`

### Todos (`/api/todos`)
- `GET /todos` - Get all todos (sorted by creation date, newest first)
- `GET /todos/:id` - Get specific todo by ID
- `GET /todos/stats` - Get todo statistics (total, completed, pending)
- `POST /todos` - Create new todo (requires: `{ "text": "string" }`)
- `PUT /todos/:id` - Update todo (optional: `{ "text": "string", "completed": boolean }`)
- `DELETE /todos/:id` - Delete specific todo
- `DELETE /todos/completed/all` - Delete all completed todos

### Health Check
- `GET /api/health` - API health status, uptime, and timestamp

## Response Format

All API responses follow this consistent format:

```json
{
  "success": true|false,
  "data": {}, // Response data (when applicable)
  "message": "string", // Success or error message
  "error": "string" // Error type (on failure only)
}
```

### Todo Object Structure
```json
{
  "id": "uuid-string",
  "text": "Todo item text",
  "completed": false,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## Configuration

### Environment Variables
Copy `.env.example` to `.env` and configure:
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment mode (development/production)
- `FRONTEND_URL` - Angular app URL for CORS (default: http://localhost:4200)

### CORS Configuration
- Pre-configured for Angular development server (http://localhost:4200)
- Supports credentials for future authentication
- Configurable via `FRONTEND_URL` environment variable

## Architecture Details

### Technology Stack
- **Runtime**: Node.js with ES6 modules (`"type": "module"`)
- **Framework**: Express.js 5.x
- **Security**: Helmet for security headers, CORS for cross-origin requests
- **Logging**: Morgan for HTTP request logging
- **Development**: Nodemon for auto-restart during development
- **UUID**: UUID v4 for unique todo identifiers

### Data Storage
- **Current**: In-memory storage using Map for demonstration
- **Future**: Ready for database integration (MongoDB, PostgreSQL, etc.)
- **Repository Pattern**: Abstracted data access layer for easy database migration

### Error Handling
- Global error handler with environment-specific error messages
- Consistent error response format across all endpoints
- Input validation with meaningful error messages
- 404 handler for undefined routes

### Security Features
- Helmet middleware for security headers
- CORS configuration for frontend integration
- Input sanitization (text trimming)
- Environment-based error message exposure

## Development Notes

### Code Style
- ES6 modules with import/export syntax
- Async/await pattern (ready for database operations)
- RESTful API design principles
- MVC pattern with clear separation of concerns

### Future Enhancements
- Database integration (MongoDB/PostgreSQL)
- User authentication and authorization
- Data persistence and backup
- API rate limiting
- Request validation middleware
- Unit and integration tests
- API documentation (Swagger/OpenAPI)

### Integration with Angular PWA
- CORS configured for Angular development server
- JSON API responses compatible with Angular HttpClient
- RESTful endpoints matching Angular service expectations
- Error format suitable for Angular error handling

## Testing

Currently no testing framework is configured. Recommended setup:
- Jest for unit testing
- Supertest for API endpoint testing
- Test database for integration tests

## Production Considerations

- Replace in-memory storage with persistent database
- Add authentication and authorization
- Implement rate limiting
- Add request logging and monitoring
- Set up proper error tracking
- Configure production CORS origins
- Add API documentation
- Implement data validation middleware