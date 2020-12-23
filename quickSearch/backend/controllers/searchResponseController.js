// module.exports = app;

const db = require("../models");

// Defining methods for the searchResponseController
module.exports = {
  findAll: function(req, res) {
    db.SearchResponse.find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
