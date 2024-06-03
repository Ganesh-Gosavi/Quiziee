const express = require("express");
const app = express();
const { dbConnect } = require("./config/databaseConnection");
const authRoutes = require("./routes/Auth");
const quizRoutes = require("./routes/Quizz");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/quiz", quizRoutes);

dbConnect()
  .then(() => {
    console.log("Database connected successfully");
    const server = app.listen(process.env.PORT, () => {
      console.log("Server is started");
    });
    server.on("error", (error) => {
      console.error("Server failed to start:", error);
      process.exit(1);
    });
  })
  .catch((error) => {
    console.error("DB Connection Failed:", error);
    process.exit(1);
  });
