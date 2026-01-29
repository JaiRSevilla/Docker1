const jwt = require("jsonwebtoken");
const pool = require("../db/mysql");

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const [users] = await pool.query("SELECT id, name, email FROM users WHERE id = ?", [decoded.id]);

        if (users.length === 0) return res.status(401).json({ error: "User not found" });

        req.user = users[0];
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
};

module.exports = authMiddleware;
