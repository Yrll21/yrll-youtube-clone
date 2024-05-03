// import express
import express from "express";

// create express app
const app = express();
const port = 3000;

// get request
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Video processing service listening at http://localhost:${port}`);
});
