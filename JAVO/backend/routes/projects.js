const express = require("express");
const router = express.Router();
const db = require("../db/mysql");

router.get("/", async (req, res) => {
    const [rows] = await db.query("SELECT * FROM projects");
    res.json(rows);
});

router.post("/", async (req, res) => {
    const { client_name, status, budget, notes } = req.body;

    await db.query(
        "INSERT INTO projects (client_name, status, budget, notes) VALUES (?, ?, ?, ?)",
        [client_name, status, budget, notes]
    );

    res.json({ success: true });
});

module.exports = router;
