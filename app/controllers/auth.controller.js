'use strict';

const auth = (req, res, next) => {
  const authToken = req.get('Authentication');

  if (authToken !== process.env.AUTH_TOKEN) {
    res.sendStatus(401);
    return;
  }

  next();
};

module.exports = auth;
