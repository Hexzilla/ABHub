import http from "http";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());


app.get("/", (req, res) => {
  res.send("Well done!");
});

// finally, let's start our server...
app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on http://localhost:3000");
});
