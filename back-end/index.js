const express = require("express");
const cors = require("cors");
const pool = require("./models/db.js");

const app = express();

const taskRouter = require("./routes/taskRouter.js");
app.use(express.json());
app.use(cors());
app.use("/tasks", taskRouter);

app.post("/signup", async (req, res) => {
  try {
    const query = "INSERT INTO users (`userid`, `password`) VALUES (?)";
    const values = [req.body.userid, req.body.password];
    const response = await pool.query(query, [values]);

    if (response[0].affectedRows === 1) {
      return res
        .status(201)
        .send({ success: true, message: "Signup successfully" });
    } else {
      res.status(500).send({ success: false, message: "Failed to signup" });
    }
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  const { userid, password } = req.body;

  try {
    // Check if the user exists in the database
    const results = await pool.query(
      "SELECT * FROM users WHERE userid = ? AND password = ?",
      [userid, password]
    );

    if (results.length > 0) {
      
      return res.status(200).json({ message: "Login successful" });
    } else {
    
      return res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Error executing MySQL query:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
