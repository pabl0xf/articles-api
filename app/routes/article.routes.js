'use strict';

module.exports = (app) => {
  const articles = require('../controllers/article.controller.js');

  app.get('/articles', articles.get);
  app.post('/articles', articles.create);
  app.put('/articles/:articleId', articles.update);
  app.delete('/articles/:articleId', articles.delete);
}
