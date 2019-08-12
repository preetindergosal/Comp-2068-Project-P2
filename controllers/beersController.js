const Beer = require("../models/beer");

exports.index = (req, res) => {
  Beer.find()
    .published()
    .populate("author")
    .then(beers => res.json(beers))
    .catch(err => res.status(404).send(err));
};

exports.show = (req, res) => {
  Beer.findOne({
    _id: req.params.id
  })
    .published()
    .then(beer => res.json(beer))
    .catch(err => res.status(401).send(err));
};

exports.create = (req, res) => {
  if (!req.isAuthenticated())
    return res.status(401).send({ error: "Sign in idget" });

  req.body.beer.author = req.session.userId;

  Beer.create(req.body.beer)
    .then(() =>
      res.status(201).send({ success: "Beer was successfully created" })
    )
    .catch(err => res.status(400).send(err));
};

exports.edit = (req, res) => {
  if (!req.isAuthenticated())
    return res.status(401).send({ error: "Sign in idget" });

  Beer.findOne({
    _id: req.params.id,
    author: req.session.userId
  })
    .then(beer => res.json(beer))
    .catch(err => res.status(404).send(err));
};

exports.update = (req, res) => {
  if (!req.isAuthenticated())
    return res.status(401).send({ error: "Sign in idget" });

  Beer.updateOne(
    {
      _id: req.body.id,
      author: req.session.userId
    },
    req.body.beer,
    {
      runValidators: true
    }
  )
    .then(() =>
      res.status(202).send({ success: "Your beer was successfully updated" })
    )
    .catch(err => res.status(400).send(err));
};

exports.destroy = (req, res) => {
  if (!req.isAuthenticated())
    return res.status(401).send({ error: "Sign in idget" });

  Beer.deleteOne({
    _id: req.body.id,
    author: req.session.userId
  })
    .then(() =>
      res.status(202).send({ success: "Your beer was successfully destroyed" })
    )
    .catch(err => res.status(400).send(err));
};
