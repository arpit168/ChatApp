import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import AuthRouter from "./src/routes/authRouter.js";
import dotenv from "dotenv";
import connectDB from "./src/configs/db.js";

dotenv.config();

const app = express();

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/auth", AuthRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is working" });
});

app.use((err, req, res, next) => {
  const ErrorMessage = err.message || "Internal Server Error";
  const StatusCode = err.statusCode || 500;
  console.error("Error Found", { ErrorMessage, StatusCode });

  res.status(StatusCode).json({ message: ErrorMessage });
});

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log("Server started at port:", port);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

startServer();
