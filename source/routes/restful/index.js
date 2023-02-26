const { Router } = require('express');
const router = Router();

module.exports = data => {
  router.use('/sample', require('./sample')(data));

  router.use('/user', require('./sing-User')(data));

  return router;
};
