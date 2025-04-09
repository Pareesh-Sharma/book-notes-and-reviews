// routes/books.js
const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');

// Home page redirects to the book listing.
router.get('/', (req, res) => res.redirect('/books'));

// List books with optional sorting (by title, rating, or recency).
router.get('/books', booksController.getBooks);

// Render add new book form.
router.get('/books/add', booksController.showAddBookForm);

// Process new book data.
router.post('/books/add', booksController.addBook);

// Render edit book form.
router.get('/books/edit/:id', booksController.showEditBookForm);

// Process edit book data.
router.post('/books/edit/:id', booksController.updateBook);

// Delete a book.
router.get('/books/delete/:id', booksController.deleteBook);

module.exports = router;
