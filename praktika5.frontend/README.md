# Book Management React Frontend

This is the React frontend for the Book Management App. All user and admin functionality is handled here.

## Setup & Running

1. **Install dependencies:**
   ```powershell
   npm install
   ```
2. **Start the development server:**
   ```powershell
   npm start
   ```
   The app will be available at [http://localhost:3001](http://localhost:3001) (or the port set in `.env`).

## Environment Variables
- The frontend uses a proxy to the backend (`http://localhost:3000` by default, see `package.json`).
- The project already includes a `.env` file that sets the frontend to use port 3001 by default (`PORT=3001`).
- You can change this value in `.env` if you want to use a different port.

## Usage Instructions

### For Users
- Log in with your email and password.
- Browse the book list, search, and filter.
- Click a book to see details and comments.
- Add comments to books.

### For Admins
- Log in with an admin account.
- Add new books using the "+ Lisa raamat" button.
- Edit or delete books from the detail view.
- Edit authors and genres when editing a book.

## Features
- Login/logout for users and admins
- View, add, edit, and delete books (admin only for add/edit/delete)
- Comment on books
- Responsive, user-friendly UI

## API Documentation
See the backend Swagger docs at [http://localhost:3000/api-docs](http://localhost:3000/api-docs) for all available endpoints and request/response formats.

