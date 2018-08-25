const Article = require('../models/article.model.js');

exports.create = (req, res) => {
  if(!req.body.text) {
      return res.status(400).send({
          message: "article content can not be empty"
      });
  }

  const article = new Article({
      title: req.body.title || "Untitled article", 
      text: req.body.text,
      tags: req.body.tags,
      userId: 1
  });

  article.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the article."
        });
    });
};
