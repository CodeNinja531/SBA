const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'event_management'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to the database.');
});

// API endpoint for login
app.post('/login', (req, res) => {
    const { email } = req.body;
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            res.status(500).send('Database error');
        } else if (results.length > 0) {
            res.status(200).json({ user: results[0] });
        } else {
            res.status(404).send('User not found');
        }
    });
});

// API endpoint for logout
app.post('/logout', (req, res) => {
    // Handle logout logic if needed
    res.status(200).send('Logged out successfully');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
