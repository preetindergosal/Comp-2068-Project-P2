const Author = require("../models/author");

exports.create = (req, res) => {
  Author.create(req.body.author)
    .then(() =>
      res.status(201).send({ success: "Author was created successfully" })
    )
    .catch(err => res.status(400).send(err));
};
