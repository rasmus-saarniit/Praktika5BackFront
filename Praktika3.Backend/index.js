
const express = require('express');
const cors = require('cors');
const path = require('path');
const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');
const swaggerSetup = require('./Config/swagger');
const errorHandler = require('./middleware/errorhandler');
const authMiddleware = require('./middleware/auth');
const activityLogsRouter = require('./routes/activitylogs');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json'); // Generated Swagger file
require('dotenv').config();

const commentsRouter = require('./routes/comments');
const categoriesRouter = require('./routes/categories');
const authorsRouter = require('./routes/authors');


const app = express();
// CORS configuration
const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map(origin => origin.trim())
  : ['http://localhost:3001']; // Default: React dev server

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);
app.use(express.json());

// Comments endpoints
app.use('/comments', authMiddleware, commentsRouter);
app.use('/categories', authMiddleware, categoriesRouter);
app.use('/authors', authMiddleware, authorsRouter);

// Root endpoint for health check or API info
app.get('/', (req, res) => {
  res.json({ message: 'Backend API is running.' });
});

// Public route for login (no authMiddleware)
app.post('/users/login', (req, res, next) => {
  require('./controllers/authenticationcontroller').login(req, res, next);
});

// Apply auth middleware only to protected routes
app.use('/books', authMiddleware, booksRouter);
app.use('/users', authMiddleware, usersRouter);

// Register the activity logs route
app.use('/activity-logs', activityLogsRouter);

// Example protected route
app.get('/protected-route', authMiddleware, (req, res) => {
  res.json({ message: 'You have accessed a protected route!', user: req.user });
});

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Swagger documentation
swaggerSetup(app);

// Error-handling middleware (must be registered after all routes)
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});