const mysql = require("mysql2/promise"); // make sure mysql2 is installed
require("dotenv").config();

// 1️⃣ Create the pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "javo",
    password: process.env.DB_PASSWORD || "javo123",
    database: process.env.DB_NAME || "javo",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 2️⃣ Export the pool
module.exports = pool;
