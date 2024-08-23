import express from "express";
import authRoutes from "./routes/auth";
import mongoose from "mongoose";
import dotnet from "dotenv";

dotnet.config();

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("Connected to MongoDB");

    const app = express();

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
