require('dotenv').config();  // Load environment variables from .env file
const { Pool } = require('pg');

// Retrieve database connection details from environment variables
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// SQL Queries to create tables if they don't exist
const createTablesQuery = `
    CREATE TABLE IF NOT EXISTS needs (
        id SERIAL PRIMARY KEY,
        needs TEXT NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS desires (
        id SERIAL PRIMARY KEY,
        desires TEXT NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS investments (
        id SERIAL PRIMARY KEY,
        investment TEXT NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS salary (
        id SERIAL PRIMARY KEY,
        salary TEXT NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

// Function to validate the database connection
async function validateDbConnection() {
    try {
        // Try connecting to the database by running a simple query
        const client = await pool.connect();
        console.log('Database connection successful!');
        client.release();  // Release the connection back to the pool
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1);  // Exit the process if the connection fails
    }
}

// Function to create tables if they don't exist
async function createTables() {
    try {
        const client = await pool.connect();
        console.log('Connected to the database');

        // Run the query to create tables if they don't exist
        await client.query(createTablesQuery);
        console.log('Tables checked/created successfully.');

        // Release the connection back to the pool
        client.release();
    } catch (error) {
        console.error('Error creating tables:', error);
    } finally {
        // Close the pool after completion
        pool.end();
    }
}

// Validate the database connection before creating tables
validateDbConnection()
    .then(() => {
        // If connection is successful, create the tables
        createTables();
    })
    .catch((error) => {
        console.error('Failed to create tables:', error);
    });
