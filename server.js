const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB, sequelize } = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const taskRoutes = require("./src/routes/taskRoutes");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;


const startServer = async () => {
  await connectDB();
  await sequelize.sync({ alter: true }); 
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
