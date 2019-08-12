const Author = require("../models/author");
const jwt = require("jsonwebtoken");

exports.authenticate = (req, res) => {
  console.log(req.body);
  Author.findOne({
    email: req.body.email
  })
    .then(author => {
      author.authenticate(req.body.password, (err, isMatch) => {
        if (err) throw new Error(err);

        if (isMatch) {
          req.session.userId = author.id;

          const token = jwt.sign({ payload: req.body.email }, "bobthebuilder", {
            expiresIn: "1h"
          });
          res
            .cookie("token", token, { httpOnly: true })
            .status(201)
            .send({ success: "You were authenticated you wonderful human." });
        } else {
          console.log("Not a match", err);
          res.status(401).json(err);
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(401).json(err);
    });
};

exports.logout = (req, res) => {
  if (!req.isAuthenticated())
    res.status(401).send({ error: "Could not authenticate" });

  req.session.userId = null;
  res
    .clearCookie("token")
    .status(200)
    .send({ success: "You are now logged out" });
};
