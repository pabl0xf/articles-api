'use strict';

const mongoose = require('mongoose');

const ArticleSchema = mongoose.Schema({
  userId: String,
  title: String,
  text: String,
  tags: [String]
}, {
    timestamps: true
});

module.exports = mongoose.model('Article', ArticleSchema);
