const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = 8000;

// Setup the PostgreSQL connection pool using dynamic connection details
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Endpoint to fetch data from the "needs" table
app.get('/needs', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM needs ORDER BY date DESC LIMIT 10');
        res.json({ status_code: 200, data: result.rows });
    } catch (error) {
        console.error('Error fetching data from needs:', error);
        res.status(500).json({ status_code: 500, message: 'Error fetching data' });
    }
});

// Example endpoint for other data
// Add similar endpoints for 'desires', 'investments', and 'salary' here

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
