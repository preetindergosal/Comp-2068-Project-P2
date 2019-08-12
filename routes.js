const express = require("express");
const app = express();

const beerRoutes = require("./routes/beers");
const authorRoutes = require("./routes/authors");
const sessionRoutes = require("./routes/sessions");

app.use("/beers", beerRoutes);
app.use("/authors", authorRoutes);
app.use("/", sessionRoutes);

module.exports = app;
