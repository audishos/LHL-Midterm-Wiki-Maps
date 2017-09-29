"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();
const cookieSession = require('cookie-session');

const knexConfig  = require("./../knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.use(cookieSession({
  name: "session",
  keys: [
    "b370de14e94142d4a108a79df6d0e265a0ba3fa2e10f57c4b3a892b74c9f84aa",
    "26cb941323ef3be96a33e7dec1a6e8e4a9075e3f55b4eb818a292c6ad368f0e9"
  ]
}));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));
const DataHelpers = require("./lib/data-helpers.js")(knex);
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));
app.use(express.static("views"));


const usersRoutes = require("./routes/users")(DataHelpers);
const mapsRoutes = require("./routes/maps")(DataHelpers);
// Mount all resource routes
app.use("/users", usersRoutes);
app.use("/maps", mapsRoutes);

// Home page
app.get("/", (req, res) => {
  res.render("landingpage");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
