require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Log = require("./models/Log");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(
  cors(
  //   {
  //   origin: ["https://jwt-auth-system-using-mern-8bj6.vercel.app/"],
  //   mrthods: ["POST", "GET"],
  //   credentials: true,
  // }
)
);

app.use(express.json());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);

mongoose
  .connect(
    "mongodb+srv://saifkhanali101:saifkhanali101@cluster0.tjenso8.mongodb.net/JWT_DB?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.json("hello");
});

app.post("/api/logs", async (req, res) => {
  const { email, value } = req.body;
  try {
    const log = new Log({ email, value });
    await log.save();
    res.status(201).json({ message: "Value logged successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging value" });
  }
});
app.get("/api/logs", async (req, res) => {
  const { email } = req.query;
  try {
    const logs = await Log.find({ email });
    res.status(200).json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching logs" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
