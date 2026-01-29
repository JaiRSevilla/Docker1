const express = require("express");
const router = express.Router();
const db = require("../db/mysql");

router.get("/", async (req, res) => {
    const [rows] = await db.query("SELECT * FROM pages");
    res.json(rows);
});

router.post("/", async (req, res) => {
    const { title, content } = req.body;
    await db.query(
        "INSERT INTO pages (title, content) VALUES (?, ?)",
        [title, content]
    );
    res.json({ success: true });
});

module.exports = router;
