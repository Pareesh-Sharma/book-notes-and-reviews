// controllers/booksController.js
const pool = require('../models/db');
const axios = require('axios');

// Get all books with optional sorting via query parameter.
exports.getBooks = async (req, res) => {
  try {
    let queryStr = 'SELECT * FROM books';
    const sort = req.query.sort;

    if (sort === 'rating') {
      queryStr += ' ORDER BY rating DESC';
    } else if (sort === 'recency') {
      queryStr += ' ORDER BY read_date DESC';
    } else if (sort === 'title') {
      queryStr += ' ORDER BY title ASC';
    }

    const result = await pool.query(queryStr);
    res.render('books', { title: 'Book List', books: result.rows });
  } catch (err) {
    console.error('Error retrieving books:', err);
    res.status(500).send('Internal Server Error');
  }
};

// Render form to add a new book.
exports.showAddBookForm = (req, res) => {
  res.render('addBook', { title: 'Add New Book' });
};

// Add a new book record into the database.
exports.addBook = async (req, res) => {
  try {
    const { title, author, rating, review, read_date, isbn } = req.body;

    // If an ISBN is provided, build the cover URL using the Open Library Covers API.
    let cover_url = '';
    if (isbn) {
      cover_url = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
      // (Optional: Use axios.head() to check if the image exists.)
    }

    const queryStr = 'INSERT INTO books (title, author, rating, review, read_date, cover_url, isbn) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    await pool.query(queryStr, [title, author, rating, review, read_date, cover_url, isbn]);

    res.redirect('/books');
  } catch (err) {
    console.error('Error adding book:', err);
    res.status(500).send('Internal Server Error');
  }
};

// Render form to edit an existing book.
exports.showEditBookForm = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Book not found.');
    }
    res.render('editBook', { title: 'Edit Book', book: result.rows[0] });
  } catch (err) {
    console.error('Error fetching book:', err);
    res.status(500).send('Internal Server Error');
  }
};

// Update a book record in the database.
exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, rating, review, read_date, isbn } = req.body;
    let cover_url = '';
    if (isbn) {
      cover_url = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
    }
    const queryStr = 'UPDATE books SET title=$1, author=$2, rating=$3, review=$4, read_date=$5, cover_url=$6, isbn=$7 WHERE id=$8';
    await pool.query(queryStr, [title, author, rating, review, read_date, cover_url, isbn, id]);
    res.redirect('/books');
  } catch (err) {
    console.error('Error updating book:', err);
    res.status(500).send('Internal Server Error');
  }
};

// Delete a book record from the database.
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM books WHERE id = $1', [id]);
    res.redirect('/books');
  } catch (err) {
    console.error('Error deleting book:', err);
    res.status(500).send('Internal Server Error');
  }
};
    