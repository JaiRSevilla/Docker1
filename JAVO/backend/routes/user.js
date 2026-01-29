const express = require("express");
const router = express.Router();
const pool = require("../db/mysql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/auth");

// POST /api/register
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const [existing] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        if (existing.length > 0) return res.status(400).json({ error: "Email already registered" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name, email, hashedPassword]
        );

        const token = jwt.sign({ id: result.insertId }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({ success: true, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// POST /api/login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        if (users.length === 0) return res.status(400).json({ error: "Invalid credentials" });

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ success: true, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// GET /api/profile
router.get("/profile", authMiddleware, async (req, res) => {
    res.json(req.user);
});

module.exports = router;
