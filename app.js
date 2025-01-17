const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 8000;

// Set up the PostgreSQL connection pool
const pool = new Pool({
    user: 'avnadmin',
    host: 'pg-2c09ca32-reddymr2018-17d3.f.aivencloud.com',
    database: 'defaultdb',
    password: 'AVNS_8VkbAFhLKyGXSHldwgK',
    port: 13195,
});

app.use(express.json());  // Middleware to parse JSON data

// Function to handle database queries with pagination
const getPaginatedData = async (table, page, limit) => {
    try {
        const offset = (page - 1) * limit;
        const query = `SELECT * FROM ${table} ORDER BY date DESC LIMIT $1 OFFSET $2`;
        const result = await pool.query(query, [limit, offset]);
        return result.rows;
    } catch (error) {
        throw new Error(`Error fetching data from ${table}: ${error.message}`);
    }
};

// Fetch data for needs
app.get('/needs', async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the page number from query params
    const limit = parseInt(req.query.limit) || 10; // Get the limit from query params
    try {
        const data = await getPaginatedData('needs', page, limit);
        res.json({ status_code: 200, data });
    } catch (error) {
        console.error('Error fetching data from needs:', error);
        res.status(500).json({ status_code: 500, message: error.message });
    }
});

// Fetch data for desires
app.get('/desires', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
        const data = await getPaginatedData('desires', page, limit);
        res.json({ status_code: 200, data });
    } catch (error) {
        console.error('Error fetching data from desires:', error);
        res.status(500).json({ status_code: 500, message: error.message });
    }
});

// Fetch data for investments
app.get('/investments', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
        const data = await getPaginatedData('investments', page, limit);
        res.json({ status_code: 200, data });
    } catch (error) {
        console.error('Error fetching data from investments:', error);
        res.status(500).json({ status_code: 500, message: error.message });
    }
});

// Fetch data for salary
app.get('/salary', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
        const data = await getPaginatedData('salary', page, limit);
        res.json({ status_code: 200, data });
    } catch (error) {
        console.error('Error fetching data from salary:', error);
        res.status(500).json({ status_code: 500, message: error.message });
    }
});

// Insert data into needs
app.post('/needs', async (req, res) => {
    const { Needs, amount } = req.body;
    if (!Needs || !amount) {
        return res.status(400).json({ status_code: 400, message: 'Needs and amount are required' });
    }
    try {
        const query = 'INSERT INTO needs (needs, amount, date) VALUES ($1, $2, NOW())';
        await pool.query(query, [Needs, amount]);
        res.json({ status_code: 200, message: 'Need created successfully!' });
    } catch (error) {
        console.error('Error inserting data into needs:', error);
        res.status(500).json({ status_code: 500, message: 'Error creating need' });
    }
});

// Insert data into desires
app.post('/desires', async (req, res) => {
    const { Desires, amount } = req.body;
    if (!Desires || !amount) {
        return res.status(400).json({ status_code: 400, message: 'Desires and amount are required' });
    }
    try {
        const query = 'INSERT INTO desires (desires, amount, date) VALUES ($1, $2, NOW())';
        await pool.query(query, [Desires, amount]);
        res.json({ status_code: 200, message: 'Desire created successfully!' });
    } catch (error) {
        console.error('Error inserting data into desires:', error);
        res.status(500).json({ status_code: 500, message: 'Error creating desire' });
    }
});

// Insert data into investments
app.post('/investments', async (req, res) => {
    const { Investment, amount } = req.body;
    if (!Investment || !amount) {
        return res.status(400).json({ status_code: 400, message: 'Investment and amount are required' });
    }
    try {
        const query = 'INSERT INTO investments (investment, amount, date) VALUES ($1, $2, NOW())';
        await pool.query(query, [Investment, amount]);
        res.json({ status_code: 200, message: 'Investment created successfully!' });
    } catch (error) {
        console.error('Error inserting data into investments:', error);
        res.status(500).json({ status_code: 500, message: 'Error creating investment' });
    }
});

// Insert data into salary
app.post('/salary', async (req, res) => {
    const { Salary, amount } = req.body;
    if (!Salary || !amount) {
        return res.status(400).json({ status_code: 400, message: 'Salary and amount are required' });
    }
    try {
        const query = 'INSERT INTO salary (salary, amount, date) VALUES ($1, $2, NOW())';
        await pool.query(query, [Salary, amount]);
        res.json({ status_code: 200, message: 'Salary created successfully!' });
    } catch (error) {
        console.error('Error inserting data into salary:', error);
        res.status(500).json({ status_code: 500, message: 'Error creating salary' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
