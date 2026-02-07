# 📚 Library Management System - Backend API

A robust Backend API for a Library Management System built with **Node.js**, **Express.js**, and **MongoDB**. This project focuses on demonstrating advanced MongoDB operations, including explicit collection management, indexing, complex queries, and aggregation pipelines.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Architecture**: RESTful API

---

## 🚀 Features

- **Collection Management**: Explicitly create collections and capped collections.
- **Performance Optimization**: Implementation of database indexing for faster searches.
- **Advanced Querying**:
  - Range-based filtering (Year range).
  - Array-based filtering (Genres).
  - Type-based filtering (Integer check).
  - Pagination using Skip and Limit.
- **Aggregation Pipelines**:
  - Data matching and sorting.
  - Field projection.
  - Array unwinding.
  - Database joins ($lookup) between Logs and Books.
- **Audit Logging**: System for tracking actions performed on books.

---

## 📁 Project Structure

```text
src/
├── DB/
│   ├── models/           # Mongoose Schemas (Book, Author, Log)
│   └── connectingDB.js   # Database connection logic
├── modules/
│   ├── book.controller.js # Request handling logic
│   ├── book.service.js    # Database interaction logic (Queries/Aggregations)
│   └── books.routes.js    # API Route definitions
├── app.controller.js      # Express app configuration & bootstrap
└── main.js                # Entry point
```

---

## ⚙️ Installation & Setup

### 1. Prerequisites
- [Node.js](https://nodejs.org/) installed.
- [MongoDB](https://www.mongodb.com/) running locally on `mongodb://127.0.0.1:27017`.

### 2. Clone & Install
```bash
# Navigate to project directory
cd Library-Management-System-Backend

# Install dependencies
npm install
```

### 3. Run the Server
```bash
# Start the server
npm start

# Start in development mode (with watch)
npm run start:dev
```
The server will be running at `http://localhost:3000`.

---

## 📡 API Endpoints

### 🛠️ Database & Collection Setup
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/collection/books` | Create books collection explicitly |
| POST | `/collection/authors` | Add a new author |
| POST | `/collection/capped` | Create a capped collection (max 100 docs) |
| POST | `/collection/books/index` | Create an index on the `title` field |

### 📚 Book Management
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/add/books` | Add a single book |
| POST | `/books/batch` | Add multiple books in one request |
| PATCH | `/books/:title` | Update a book's year by title |
| DELETE | `/books/before-year` | Delete books published before a specific year |

### 🔎 Advanced Queries
| Method | Endpoint | Query Params | Description |
| :--- | :--- | :--- | :--- |
| GET | `/books/title` | `title` | Find a book by its exact title |
| GET | `/books/year` | `from`, `to` | Find books within a year range |
| GET | `/books/genre` | `genre` | Find books by a specific genre |
| GET | `/books/skip-limit` | - | Get books with pagination (skip 2, limit 3) |
| GET | `/books/year-integer` | - | Find books where year is an integer |
| GET | `/books/exclude-genres`| - | Find books excluding Horror/Sci-Fi |

### 📊 Aggregations
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/books/aggregate1` | Match books (year > 2000) and sort descending |
| GET | `/books/aggregate2` | Match books and project specific fields |
| GET | `/books/aggregate3` | Unwind the genres array |
| GET | `/books/aggregate4` | Join Logs with Book details using $lookup |

---

## 📝 Database Schema

### Book Model
- `title`: String (Required, Trimmed)
- `author`: String
- `year`: Number
- `genres`: Array of Strings

### Author Model
- `name`: String (Required)
- `nationality`: String (Required)

### Log Model
- `book_id`: String (Required)
- `action`: String (Required)
- `timestamps`: CreatedAt, UpdatedAt

---

## 📄 License
This project is licensed under the ISC License.
