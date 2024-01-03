// Dotenv
require("dotenv").config();
// Packages
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
// app
const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.post("/api/shorturl", urlencodedParser, function(req, res) {
  res.json({ original_url: req.body.url });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
