/** Express app for CRUD. */
const express = require('express');
const routes =require("./routes");
const nunjucks = require("nunjucks");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
nunjucks.configure("templates", {
  autoescape: true,
  express: app
});
app.use(routes);

/* 404 handler*/

app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;

  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.render("error.html", { err });
});

module.exports = app;