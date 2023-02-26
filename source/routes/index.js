const { Router } = require('express');
const router = Router();
const resfulapi = require('./restful');

module.exports = data => {
  router.use('/restful', resfulapi(data));

  return router;
};
