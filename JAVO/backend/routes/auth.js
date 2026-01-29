const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const db = require("../db/mysql");

const JWT_SECRET = "javo_secret_key";

router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);

    await db.query(
        "INSERT INTO admins (email, password) VALUES (?, ?)",
        [email, hash]
    );

    res.json({ success: true });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const [rows] = await db.query(
        "SELECT * FROM admins WHERE email = ?",
        [email]
    );

    if (!rows.length) return res.status(401).json({ error: "Invalid login" });

    const valid = await bcrypt.compare(password, rows[0].password);
    if (!valid) return res.status(401).json({ error: "Invalid login" });

    const token = jwt.sign({ id: rows[0].id }, JWT_SECRET);
    res.json({ token });
});

module.exports = router;
