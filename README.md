
# 📚 Book Notes & Reviews

This project is a Full-stack book-tracking web app that allows users to log books they've read, add notes/reviews, ratings, and view book covers fetched from the [Open Library API](https://openlibrary.org/dev/docs/api/covers). It's built with **Node.js**, **Express.js**, **EJS**, and **PostgreSQL**.

---

## 🚀 Features

- Add, edit, and delete books
- Rate and review each book
- Sort books by title, rating, or recency
- Automatically fetch book covers using ISBN and [Open Library API](https://openlibrary.org/dev/docs/api/covers)

---

## 🧰 Tech Stack

- **Backend**: Node.js, Express
- **Database**: PostgreSQL (via `pg`)
- **Frontend**: HTML, CSS, EJS Templates
- **API Integration**: Open Library Covers API

---

## 🛠️ Getting Started – Run Locally

### ✅ Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [PostgreSQL](https://www.postgresql.org/)
- A code editor like [VS Code](https://code.visualstudio.com/)

---

### 🗂️ Project Setup

1. **Clone this repository**  
```bash
git clone <thisRepo>
cd book-notes-and-reviews
```

2. **Install dependencies**  
```bash
npm install
```

3. **Create PostgreSQL Database**  
Open `pgAdmin` or `psql`, then:
```sql
CREATE DATABASE book_notes;
```

4. **Create the `books` table**  
Connect to the `book_notes` DB and run:
```sql
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    rating INTEGER,
    review TEXT,
    read_date DATE,
    cover_url TEXT,
    isbn VARCHAR(20)
);
```

5. **Setup environment variables**  
Create a `.env` file in the root folder:
```
DBConnLink=postgres://<username>:<password>@localhost:5432/book_notes
```

Replace `<username>` and `<password>` with your PostgreSQL credentials.

---

### ▶️ Start the App

```bash
node index.js
```

Visit: [http://localhost:3000/books](http://localhost:3000/books)

Use the form to add a book, and it will automatically display with a cover image (if the ISBN is valid)!

---

## 🔗 API Reference

- **Open Library Covers API**  
  Format: `https://covers.openlibrary.org/b/isbn/{ISBN}-L.jpg`

---

## 🙌 Contributing

If you’d like to improve the project, feel free to fork it, make changes, and submit a pull request.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
