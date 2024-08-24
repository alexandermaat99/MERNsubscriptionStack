import express from "express";
import authRoutes from "./routes/auth";
import mongoose from "mongoose";
import dotnet from "dotenv";
import cors from "cors";

dotnet.config();

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("Connected to MongoDB");

    const app = express();

    app.use(
      cors({
        origin: "http://localhost:3000", // Frontend URL
        credentials: true, // If you're using cookies
      })
    );

    app.use(express.json());

    app.use("/auth", authRoutes);
    // once connected to mongo, want to connect to the server

    app.listen(8080, () => {
      console.log("Server is running on port 8080");
    });
  })
  .catch((error) => {
    console.log({ error });
    throw new Error(error);
  });
