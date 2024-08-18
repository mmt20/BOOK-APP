# Book Management System

## Description

This project is a simple Book Management System (BMS) built using Node.js, Express, and PostgreSQL. It provides APIs to manage books and stores, including functionalities to get, save, update, and delete books, as well as to get and save stores.

## Features

- Get a list of books
- Get details of a specific book
- Save a new book
- Update an existing book
- Delete a book
- Get a list of stores
- Save a new store

## Prerequisites

- Node.js
- PostgreSQL
- npm (Node Package Manager)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/book-management-system.git
cd book-management-system
```

2. Install the dependencies:

```bash
npm install
```

3. Set up the environment variables:
   Create a .env file in the root directory and add your PostgreSQL connection string:

```bash
DATABASE_URL=your_database_url
```

4.Set up the database:
Run the SQL script provided in the `db` directory to create the necessary tables and schema.

## Running the Server

1. Start the server:

```bash
npm start
```

2. The server will be running on `http:/localhost:3000`.

## API Endpoints

### Books

- `GET /api/v1/books`: Get a list of books
- `GET /api/v1/books/details/:bookId`: Get details of a specific book
- `POST /api/v1/books/save`: Save a new book
- `PUT /api/v1/books/update`: Update an existing book
- `DELETE /api/v1/books/delete/:bookId`: Delete a book

### Stores

- `GET /api/v1/stores`: Get a list of stores
- `POST /api/v1/stores/save`: Save a new store

## Project Structure

- `controllers`: Contains the logic for handling API requests
- `db`: Contains the database connection and query files
- `router`: Contains the route definitions for the API endpoints
- `util`: Contains utility functions
- `server.js`: The main server file

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
