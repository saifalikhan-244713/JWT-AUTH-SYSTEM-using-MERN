require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');
const Log = require('./models/Log');
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);

mongoose
  .connect("mongodb://localhost:27017/myjwt")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

  app.post('/api/logs', async (req, res) => {
    const { email, value } = req.body;
    try {
      const log = new Log({ email, value });
      await log.save();
      res.status(201).json({ message: 'Value logged successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error logging value' });
    }
  });
  app.get('/api/logs', async (req, res) => {
    const { email } = req.query;
    try {
      const logs = await Log.find({ email });
      res.status(200).json(logs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching logs' });
    }
  });
  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
