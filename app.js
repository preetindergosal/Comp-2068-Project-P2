require("dotenv").config();

const mongoose = require("mongoose");
mongoose
  .connect(process.env.DB_URI, {
    auth: {
      user: process.env.DB_USER,
      password: process.env.DB_PASS
    },
    useNewUrlParser: true
  })
  .catch(err => console.error(`ERROR: ${err}`));

const express = require("express");

const app = express();

const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
app.use(cookieParser());
app.use(
  session({
    secret: process.env.secret || "boorakacha",
    cookie: {
      maxAge: 10800000
    },
    resave: true,
    saveUninitialized: true
  })
);
app.use(flash());
app.use((req, res, next) => {
  debugger;
  res.locals.flash = res.locals.flash || {};
  res.locals.flash.success = req.flash("success") || null;
  res.locals.flash.error = req.flash("error") || null;

  next();
});

const jwt = require("jsonwebtoken");
const isAuthenticated = req => {
  const token =
    (req.cookies && req.cookies.token) ||
    (req.body && req.body.token) ||
    (req.query && req.query.token) ||
    (req.headers && req.headers["x-access-token"]);

  if (req.session.userId) return true;

  if (!token) return false;

  jwt.verify(token, "bobthebuilder", (err, decoded) => {
    if (err) return false;
    return true;
  });
};

app.use((req, res, next) => {
  req.isAuthenticated = () => isAuthenticated(req);
  next();
});

const path = require("path");

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const routes = require("./routes.js");
app.use("/api", routes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(process.env.PORT || 4000, () => console.log("Listening on 4000"));
