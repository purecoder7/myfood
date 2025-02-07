const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const mongoConnect = require("./db");
const cors = require('cors');

// CORS middleware (allow specific frontend origin)
app.use(cors({
  origin: "http://localhost:5173", // React app ka origin
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"]
}));

app.use(express.json());  // JSON body parse karne ke liye

// MongoDB connection
mongoConnect();

// Test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Your actual routes for orders or other data
app.use("/req", require("./routes/createUser"));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
