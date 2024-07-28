# book-store-API
The Book Store API is a RESTful service built with Node.js and Express, designed to manage a collection of books, authors, and users. It includes features for user authentication, book and author management, and file uploads. This API is secured with various middlewares, ensuring a robust and reliable system for handling bookstore data.

Features
Books Management
Endpoint: /api/books
Description: Manage book records with full CRUD (Create, Read, Update, Delete) operations.
Authors Management
Endpoint: /api/authors
Description: Handle author information with CRUD operations.
User Authentication
Endpoint: /api/auth
Description: Provides user login and registration functionalities.
User Management
Endpoint: /api/users
Description: Manage user profiles and data.
Password Management
Endpoint: /password
Description: Handle password reset and related operations.
File Upload
Endpoint: /api/upload
Description: Upload and manage files (e.g., book cover images).
Middleware
Security and Headers
Helmet: Adds security headers to API responses.
CORS: Configures Cross-Origin Resource Sharing to control access from different origins.
Data Parsing
express.json(): Parses incoming JSON requests.
express.urlencoded(): Parses URL-encoded data.
Static Files
express.static(): Serves static files from the "images" directory.
Logging
Logger: Custom logging middleware for tracking requests and responses.
Error Handling
notFound: Middleware to handle 404 errors.
errorHandler: Centralized error handling middleware.
Getting Started
Prerequisites
Node.js
npm
MongoDB

Installation
Clone the repository: git clone https://github.com/your-username/book-store-api.git

Navigate to the project directory: cd book-store-api

Install dependencies: npm install

Create a .env file in the root directory and add the following:
NODE_ENV=development
PORT=8000
MONGO_URI=your_mongo_db_uri

Start the server: npm start

Usage
Access the API at http://localhost:8000 and use the available endpoints to manage your bookstore data.
