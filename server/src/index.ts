import express from "express";
import authRoutes from "./routes/auth";
import mongoose from "mongoose";
import dotnet from "dotenv";

dotnet.config();

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);

app.get("/", (req, res) => res.send("welcome to the server"));

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
