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

  // singin route
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

  router.post(
    '/singin-2fa',
    data.passport.authenticate('verifyingTotp', { session: false }),
    async (req, res, next) => {
      try {
        const { username } = req.user;

        const result = await service.sing.singInUser({ username });

        return res.status(200).json({ result });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/singin-otp',
    passport.authenticate('otpAuth', { session: false }),
    async (req, res, next) => {
      try {
        const result = await service.sing.singInUser({ username });

        return res.status(200).json({ result });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post('/set-otp', async (req, res, next) => {
    try {
      const { userId, status, method } = req.body;

      const result = await service.sing.setOtpStatus(userId, status, method);

      return res.status(200).json({ msg: `your ${method} OTP is ${result}` });
    } catch (error) {
      next(error);
    }
  });

  router.post('/enable-2fa', async (req, res, next) => {
    try {
      const { userId, status, method } = req.body;

      const result = await (userId, status, method);

      return res.status(200).json({
        msg: 'your Tow fact Auth is Enable',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  });
  router.post('/disable-2fa', async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  });

  router.post('/send-otp', async (req, res, next) => {});

  router.post('/newtoken', async (req, res, next) => {
    try {
      const token = req.body.token;

      const result = await service.sing.newAccessToken(token);

      return res.status(200).json({ msg: '', result });
    } catch (error) {
      next(error);
    }
  });

  router.post('/recovery-password', async (req, res, next) => {
    const { userInput, method } = req.body;

    const result = await service.sing.requestResetPass(userInput, method);

    return res.status(200).json({ msg: result });
  });

  // router.get('/recovery-password-verfy', async (req, res, next) => {
  //   try {
  //   c  onst { token, subToken, id } = req.query;

  //     const result = await service.sing.verfyResetPassForEmail({
  //       token,
  //       subToken,
  //       id,
  //     });

  //     return res.status(200).json({ msg: result });
  //   } catch (error) {
  //     next(error);
  //   }
  // });

  router.post('/recovery-password-verfy', async (req, res, next) => {
    try {
      const { userInput, method, code, password } = req.body;
      const { token, subToken, id } = req.query;

      const result = await service.sing.verfyResetPass({
        userInput,
        method,
        code,
        password,
        id,
        token,
        subToken,
      });

      res.json({ status: 200, massage: result, payload: {} });
    } catch (error) {
      next(error);
    }
  });

  //
  router.delete('/singout', async (req, res, next) => {
    try {
      const accessToken = req.body.accessToken;
      const cheackToeknInDb = await service.sing.verifyAccessToekn(accessToken);

      const documentId = cheackToeknInDb;

      const deletTokens = await service.sing.userLogout(documentId);
      res.json({ status: 200, massage: 'logpout', payload: { deletTokens } });
    } catch (error) {
      next(error);
    }
  });

  return router;
};
