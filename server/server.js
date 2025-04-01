// === server/server.js ===
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const recipeRoutes = require("./routes/recipeRoutes");
const authRoutes = require("./routes/authRoutes");
const { default: mongoose } = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_PORT = process.env.MONGO_PORT;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/recipes", recipeRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
console.log("mongo uri", process.env.MONGO_URI);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(MONGO_PORT, () =>
      console.log(`Server running on port ${MONGO_PORT}`)
    );
  })
  .catch((err) => console.error(err));
