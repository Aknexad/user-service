const { Router } = require('express');
const router = Router();

module.exports = data => {
  router.use('/', (req, res, next) => {
    return res.status(200).json({ msg: "I'm Users Service" });
  });

  return router;
};
