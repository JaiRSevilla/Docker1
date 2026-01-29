const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const userRoutes = require("./routes/user");
app.use(cors());
app.use(express.json());

require("./db/mysql"); // connect to MySQL

// ROUTES
app.use("/api/leads", require("./routes/leads"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/pages", require("./routes/pages"));
app.use("/api", userRoutes);


app.get("/", (req, res) => {
    res.send("Backend is running");
});

app.get("/api/data", (req, res) => {
    res.json({ message: "Hello from backend" });
});

app.listen(5000, () => {
    console.log("Backend running on http://localhost:5000");
});
