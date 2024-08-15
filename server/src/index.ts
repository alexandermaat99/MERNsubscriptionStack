import express from "express";

const app = express();

app.get("/", (req, res) => res.send("welcome to the"));

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
