const express = require("express");
const router = express.Router();
const db = require("../db/mysql");

router.post("/", async (req, res) => {
    const { name, email, message } = req.body;

    await db.query(
    "INSERT INTO leads (name, email, message) VALUES (?, ?, ?)",
    [name, email, message]
    );

    res.json({ success: true });
});

router.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM leads ORDER BY created_at DESC");
    res.json(rows);
});

module.exports = router;
