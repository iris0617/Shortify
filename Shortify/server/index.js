//constants
const PORT = 7000;
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const mongoURI = "mongodb://localhost/Shortify";
const connectOptions = {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
};

//connect to Mongo
mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, connectOptions, (err, db) => {
  if (err) console.log(`Error`, err);
  console.log(`Connected to MongoDB`);
});

//enable CORS

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-type,Accept,x-access-token,X-Key"
  );
  if (req.method == "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});

//dependencies
app.use(bodyParser.json());
require("./models/urlshorten");
require("./routes/urlshortened")(app);
app.listen(PORT, () => {
  console.log(`Server started on port`, PORT);
});
