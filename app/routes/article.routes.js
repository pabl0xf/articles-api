module.exports = (app) => {
  const articles = require('../controllers/article.controller.js');

  app.post('/articles', articles.create);
}