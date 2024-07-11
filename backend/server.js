const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const photoRoutes = require("./routes/photoRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/photo", photoRoutes);
app.use(errorMiddleware);

connectDB();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
