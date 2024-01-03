// Dotenv
require("dotenv").config();
// Packages
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const { GetUrlHostname, CheckDnsStatus } = require("./url-modules.js");
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
  const input_url = req.body.url;
  const input_url_host = GetUrlHostname(input_url);
  if( input_url_host == null ) {
    res.json({ "error":"Invalid URL", input_url_host });
    return false;
  }
  CheckDnsStatus( input_url_host ).then( (url_res) => {
    res.json({ original_url: input_url });
  }).catch( (url_err) => {
    // {"error":"Invalid URL"}
    res.json({ "error":"Invalid URL", url_err });
  });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
