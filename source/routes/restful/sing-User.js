const { Router } = require('express');
const router = Router();

const { service } = require('../../logic/index');

module.exports = data => {
  router.post('/singup', async (req, res, next) => {
    try {
      const { userInput, password } = req.body;

      const result = await service.sing.createUser({ userInput, password });

      return res.status(200).json({ msg: '', payload: result });
    } catch (error) {
      next(error);
    }
  });

  router.post(
    '/singin',
    data.passport.authenticate('local', { session: false }),
    async (req, res, next) => {
      try {
        const { userInput } = req.body;

        const result = await service.sing.singInUser({ userInput });

        return res.status(200).json({ msg: '', result });
      } catch (error) {
        next(error);
      }
    }
  );

  return router;
};
