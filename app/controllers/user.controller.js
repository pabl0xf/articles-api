'use strict';

const User = require('../models/user.model.js');
const utils = require('../utils/utils.js');

exports.create = (req, res) => {
  if(!req.body.name) {
    return res.status(422).send({
      message: "User can not be empty"
    });
  }

  if (req.body.avatar && !utils.validateUrl(req.body.avatar)) {
    return res.status(422).send({
      message: "Avatar URL is not valid"
    });
  }

  const user = new User({
    name: req.body.name,
    avatar: req.body.avatar || ''
  });

  user.save()
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user."
      });
    });
};
