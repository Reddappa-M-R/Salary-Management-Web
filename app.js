const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = 8000;

app.use(express.json());

// Setup PostgreSQL connection pool
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Helper function to handle database errors
const handleError = (res, message, error) => {
    console.error(message, error);
    res.status(500).json({ status_code: 500, message });
};

// Fetch data from the database for a given table type
const fetchData = (tableName) => {
    return pool.query(`SELECT * FROM ${tableName} ORDER BY date DESC LIMIT 10`);
};

// Endpoint to fetch needs data
app.get('/needs', async (req, res) => {
    try {
        const result = await fetchData('needs');
        res.json({ status_code: 200, data: result.rows });
    } catch (error) {
        handleError(res, 'Error fetching data from needs:', error);
    }
});

// Endpoint to fetch desires data
app.get('/desires', async (req, res) => {
    try {
        const result = await fetchData('desires');
        res.json({ status_code: 200, data: result.rows });
    } catch (error) {
        handleError(res, 'Error fetching data from desires:', error);
    }
});

// Endpoint to fetch investments data
app.get('/investments', async (req, res) => {
    try {
        const result = await fetchData('investments');
        res.json({ status_code: 200, data: result.rows });
    } catch (error) {
        handleError(res, 'Error fetching data from investments:', error);
    }
});

// Endpoint to fetch salary data
app.get('/salary', async (req, res) => {
    try {
        const result = await fetchData('salary');
        res.json({ status_code: 200, data: result.rows });
    } catch (error) {
        handleError(res, 'Error fetching data from salary:', error);
    }
});

// POST endpoints to insert new data
const insertData = (tableName, columnName, data) => {
    return pool.query(`INSERT INTO ${tableName} (${columnName}, amount) VALUES ($1, $2)`, [data[columnName], data.amount]);
};

app.post('/needs', async (req, res) => {
    const { Needs, amount } = req.body;
    try {
        await insertData('needs', 'needs', { Needs, amount });
        res.json({ status_code: 200, message: 'Needs created successfully!' });
    } catch (error) {
        handleError(res, 'Error creating needs:', error);
    }
});

// Similar POST endpoints for desires, investments, and salary
app.post('/desires', async (req, res) => {
    const { Desires, amount } = req.body;
    try {
        await insertData('desires', 'desires', { Desires, amount });
        res.json({ status_code: 200, message: 'Desires created successfully!' });
    } catch (error) {
        handleError(res, 'Error creating desires:', error);
    }
});

app.post('/investments', async (req, res) => {
    const { Investment, amount } = req.body;
    try {
        await insertData('investments', 'investment', { Investment, amount });
        res.json({ status_code: 200, message: 'Investment created successfully!' });
    } catch (error) {
        handleError(res, 'Error creating investment:', error);
    }
});

app.post('/salary', async (req, res) => {
    const { Salary, amount } = req.body;
    try {
        await insertData('salary', 'salary', { Salary, amount });
        res.json({ status_code: 200, message: 'Salary created successfully!' });
    } catch (error) {
        handleError(res, 'Error creating salary:', error);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
