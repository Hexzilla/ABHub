import http from "http";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.send("Well done!");
});

// finally, let's start our server...
app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on http://localhost:3000");
});
