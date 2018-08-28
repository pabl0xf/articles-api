'use strict';

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
      userId: req.body.userId
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

exports.update = (req, res) => {
  if(!req.body.text) {
    return res.status(400).send({
      message: "Article text can not be empty"
    });
  }

  Article.findByIdAndUpdate(req.params.articleId, {
    title: req.body.title || "Untitled article",
    text: req.body.text,
    tags: req.body.tags,
    userId: 1
  }, {new: true})
  .then(article => {
    if(!article) {
      return res.status(404).send({ message: "article not found with id " + req.params.articleId });
    }

    res.send(article);
  }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({ message: "article not found with id " + req.params.articleId });
    }

    return res.status(500).send({ message: "Error updating article with id " + req.params.articleId });
  });
};

exports.delete = (req, res) => {
  Article.findByIdAndRemove(req.params.articleId)
  .then(article => {
    if(!article) {
      return res.status(404).send({ message: "article not found with id " + req.params.articleId });
    }

    res.send({message: "article deleted successfully!"});
  }).catch(err => {
    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({ message: "article not found with id " + req.params.articleId });
    }

    return res.status(500).send({ message: "Could not delete article with id " + req.params.articleId });
  });
};

exports.get = (req, res) => {
  const getQuery = ({ tag }) => {
    const filters = {};

    if (tag) {
      filters.tags = tag;
    }

    return filters;
  };

  Article.find({ tags: {'$all': req.query.tags }})
  .then(articles => {
      res.send(articles);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving articles."
      });
  });
};
