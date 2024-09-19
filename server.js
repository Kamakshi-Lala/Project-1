const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');  // Added for path handling

const app = express();
const PORT = 3002;

// Create a MySQL pool (replace the connection details with your actual MySQL credentials)
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Minder',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Check if the database connection is successful
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connection successful!');
    connection.release(); // Release the connection back to the pool
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// ... (rest of your code)

// Create a users table if it doesn't exist
pool.execute(`
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
  )
`, (err) => {
  if (err) {
    console.error(err);
  }
});

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  pool.execute(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, password],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        res.redirect('/copy.html'); // Redirect to copy page after successful registration
      }
    }
  );
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  pool.execute(
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else if (results.length > 0) {
        res.redirect('/copy.html'); // Redirect to copy page after successful login
      } else {
        res.redirect('/index.html'); // Redirect to index page if login fails
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
