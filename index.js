// index.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/books');

const app = express();
const PORT = 3000;

// Set EJS as templating engine and specify views folder.
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware for data and JSON.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Use the books router for handling routes.
app.use('/', bookRoutes);

// 404 Error Handler
app.use((req, res) => {
  res.status(404).render('404', { title: '404 Not Found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
