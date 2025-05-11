# Praktika3.Backend

This project is a backend application for managing books, authors, categories, users, and activity logs. It includes features such as user authentication, role-based access control, and API documentation using Swagger.

## Project Structure

```
Praktika3.Backend/
├── Config/
│   ├── create_tables.js     # Script for creating and deleting tables
│   ├── database.js          # Centralized database connection setup
│   ├── swagger.js           # Swagger configuration and autogen setup
├── controllers/
│   ├── activitylogcontroller.js  # Handles activity log-related logic
│   ├── authenticationcontroller.js # Handles user login and authentication
│   ├── authorcontroller.js        # Handles author-related logic
│   ├── bookcontroller.js          # Handles book-related logic
│   ├── categorycontroller.js      # Handles category-related logic
│   ├── usercontroller.js          # Handles user-related logic
├── middleware/
│   ├── auth.js              # Middleware for JWT authentication
│   ├── errorhandler.js      # Middleware for handling errors
│   ├── rolehandler.js       # Middleware for role-based access control
├── migrations/
│   ├── 20250323093931-create-category.js  # Migration for creating categories table
│   ├── 20250329111258-create-book.js      # Migration for creating books table
│   ├── 20250329111956-create_books_categories_authors.js # Migration for creating books, categories, and authors
│   ├── 20250329114141-create-author.js    # Migration for creating authors table
│   ├── 20250407175314-create-users.js     # Migration for creating users table
│   ├── 20250408171955-create-activity-log.js # Migration for creating activity logs table
│   ├── 20250408173623-create-comments.js  # Migration for creating comments table
├── models/
│   ├── activitylog.js       # Sequelize model for activity logs
│   ├── author.js            # Sequelize model for authors
│   ├── book.js              # Sequelize model for books
│   ├── category.js          # Sequelize model for categories
│   ├── comment.js           # Sequelize model for comments
│   ├── index.js             # Model loader and associations
│   ├── user.js              # Sequelize model for users
├── routes/
│   ├── activitylogs.js      # Routes for activity logs
│   ├── books.js             # Routes for books
│   ├── users.js             # Routes for users
├── seeders/
│   ├── 20250329-seed_books.js # Seeder for populating books
│   ├── 20250407175107-add-test-user.js # Seeder for adding test users
├── .env                     # Environment variables
├── index.js                 # Main entry point of the application with centralized database setup
├── nodemon.json             # Nodemon configuration
├── package.json             # Node.js dependencies and scripts
├── Praktika3backup.sql      # Database backup file
├── README.md                # Project documentation
├── swagger-output.json      # Generated Swagger documentation
```

## Features

- **User Authentication:**
  - Login functionality with JWT-based authentication.
  - Role-based access control (Admin and User roles).

- **Book Management:**
  - CRUD operations for books, authors, and categories.
  - Add comments to books.

- **Activity Logs:**
  - Logs user actions such as viewing books, adding comments, and updating books.

- **Swagger Documentation:**
  - Automatically generated API documentation available at `/api-docs`.

## Setup Instructions

### Prerequisites
- Node.js (v20.18.0 or higher)
- PostgreSQL

## How to Run This Project

Follow these steps to set up and run the project locally:

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd Praktika3.Backend
   ```

2. **Install Dependencies**
   Make sure you have Node.js and npm installed. Then, run:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   - Copy the `.env.example` file to a new file named `.env`:
     ```bash
     cp .env.example .env
     ```
     *(On Windows, you can manually copy and rename the file if `cp` is not available.)*
   - Open the `.env` file and fill in your database credentials and other required values.

4. **Set Up the Database**
   - Ensure you have PostgreSQL installed and running.
   - Create a new database matching the name in your `.env` file.
   - Run the migrations to set up the database schema:
     ```bash
     npx sequelize-cli db:migrate
     ```
   - (Optional) Seed the database with initial data:
     ```bash
     npx sequelize-cli db:seed:all
     ```

5. **Run the Project**
   Start the development server:
   ```bash
   npm start
   ```

6. **Access the Application**
   - Open your browser and navigate to `http://localhost:<port>` (replace `<port>` with the port specified in your `.env` file or `3000` by default).

### Restore the Database from Backup (optional)

If you want to use the provided database backup file (`Praktika3backup.sql`), follow these steps:

1. **Ensure PostgreSQL is Installed**
   Make sure PostgreSQL is installed on your system and the `psql` command is available in your terminal.

2. **Create a New Database**
   Open your terminal and create a new database to restore the backup into:
   ```bash
   psql -U postgres -h localhost -p 5432 -c "CREATE DATABASE Praktika3;"
   ```
   Replace `Praktika3` with the desired database name if needed.

3. **Restore the Backup**
   Use the `psql` command to restore the backup file into the newly created database:
   ```bash
   psql -U postgres -h localhost -p 5432 -d Praktika3 -f Praktika3backup.sql
   ```
   Replace:
   - `Praktika3` with the name of the database you created.
   - Ensure the `Praktika3backup.sql` file is in the root directory of the project.

4. **Verify the Restoration**
   After the restoration is complete, you can verify it by connecting to the database and checking the tables:
   ```bash
   psql -U postgres -h localhost -p 5432 -d Praktika3
   \dt
   ```

   This will list all the tables in the database. You should see the tables restored from the backup file.

### Accessing the Application
- **Login Page:** `http://localhost:3001` (React frontend)
- **API Documentation:** `http://localhost:3000/api-docs`


## API Endpoints

### Auth
- `POST /users/login`: Log in a user
- `POST /users/register`: Register a new user

### Users (Admin only except where noted)
- `GET /users`: Get all users
- `GET /users/:id`: Get user by ID
- `PUT /users/:id`: Update user by ID
- `DELETE /users/:id`: Delete user by ID

### Books
- `GET /books`: Retrieve all books (auth required)
- `GET /books/:id`: Retrieve a specific book by ID (auth required)
- `POST /books`: Add a new book (Admin only)
- `PUT /books/:id`: Update a book (Admin only)
- `DELETE /books/:id`: Delete a book (Admin only)
- `POST /books/:id/comments`: Add a comment to a book (auth required)

### Comments
- `PUT /comments/:id`: Update a comment by ID (author or admin)
- `DELETE /comments/:id`: Delete a comment by ID (author or admin)

### Authors (Admin only)
- `GET /authors`: Get all authors
- `PUT /authors/:id`: Update an author by ID
- `DELETE /authors/:id`: Delete an author by ID

### Categories (Admin only)
- `GET /categories`: Get all categories
- `PUT /categories/:id`: Update a category by ID
- `DELETE /categories/:id`: Delete a category by ID

### Activity Logs
- `GET /activity-logs`: Retrieve all activity logs (Admin only)

## Development

### Running in Development Mode
Use `nodemon` for automatic server restarts during development:
```bash
npx nodemon
```

### Running Tests
Set the environment to `test` and run your tests:
```bash
set NODE_ENV=test
npm test
```
