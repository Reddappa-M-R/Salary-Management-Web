const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 8000;

// Set up the PostgreSQL connection pool
const pool = new Pool({
    user: 'your-username',
    host: 'localhost',
    database: 'your-database-name',
    password: 'your-password',
    port: 5432,
});

app.use(express.json());

// Fetch data for needs
app.get('/needs', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM needs ORDER BY date DESC LIMIT 10');
        res.json({ status_code: 200, data: result.rows });
    } catch (error) {
        console.error('Error fetching data from needs:', error);
        res.status(500).json({ status_code: 500, message: 'Error fetching data' });
    }
});

// Fetch data for desires
app.get('/desires', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM desires ORDER BY date DESC LIMIT 10');
        res.json({ status_code: 200, data: result.rows });
    } catch (error) {
        console.error('Error fetching data from desires:', error);
        res.status(500).json({ status_code: 500, message: 'Error fetching data' });
    }
});

// Fetch data for investments
app.get('/investments', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM investments ORDER BY date DESC LIMIT 10');
        res.json({ status_code: 200, data: result.rows });
    } catch (error) {
        console.error('Error fetching data from investments:', error);
        res.status(500).json({ status_code: 500, message: 'Error fetching data' });
    }
});

// Fetch data for salary
app.get('/salary', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM salary ORDER BY date DESC LIMIT 10');
        res.json({ status_code: 200, data: result.rows });
    } catch (error) {
        console.error('Error fetching data from salary:', error);
        res.status(500).json({ status_code: 500, message: 'Error fetching data' });
    }
});

// Insert data into needs
app.post('/needs', async (req, res) => {
    const { Needs, amount } = req.body;
    try {
        await pool.query('INSERT INTO needs (needs, amount) VALUES ($1, $2)', [Needs, amount]);
        res.json({ status_code: 200, message: 'Needs created successfully!' });
    } catch (error) {
        console.error('Error inserting data into needs:', error);
        res.status(500).json({ status_code: 500, message: 'Error creating needs' });
    }
});

// Insert data into desires
app.post('/desires', async (req, res) => {
    const { Desires, amount } = req.body;
    try {
        await pool.query('INSERT INTO desires (desires, amount) VALUES ($1, $2)', [Desires, amount]);
        res.json({ status_code: 200, message: 'Desires created successfully!' });
    } catch (error) {
        console.error('Error inserting data into desires:', error);
        res.status(500).json({ status_code: 500, message: 'Error creating desires' });
    }
});

// Insert data into investments
app.post('/investments', async (req, res) => {
    const { Investment, amount } = req.body;
    try {
        await pool.query('INSERT INTO investments (investment, amount) VALUES ($1, $2)', [Investment, amount]);
        res.json({ status_code: 200, message: 'Investment created successfully!' });
    } catch (error) {
        console.error('Error inserting data into investments:', error);
        res.status(500).json({ status_code: 500, message: 'Error creating investment' });
    }
});

// Insert data into salary
app.post('/salary', async (req, res) => {
    const { Salary, amount } = req.body;
    try {
        await pool.query('INSERT INTO salary (salary, amount) VALUES ($1, $2)', [Salary, amount]);
        res.json({ status_code: 200, message: 'Salary created successfully!' });
    } catch (error) {
        console.error('Error inserting data into salary:', error);
        res.status(500).json({ status_code: 500, message: 'Error creating salary' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
