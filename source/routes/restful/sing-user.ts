import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';

interface AddUser extends Request {
  user?: any;
}

const router = Router();

// import service logice
import { service } from '../../logic';

export = (data?: any): Router => {
  router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('frist route');
      return res.send('Sucsess');
    } catch (error) {
      next(error);
    }
  });

  router.post(
    '/singup',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { phone, password } = req.body;

        const result = service.sing.createUser({ phone, password });

        return res.status(200).json({ msg: '', payload: result });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/singin',
    passport.authenticate('local', { session: false }),
    async (req: Request, res: Response, next: NextFunction) => {
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
    passport.authenticate('verifyingTotp', { session: false }),
    async (req: AddUser, res: Response, next: NextFunction) => {
      try {
        interface User {
          username?: string | undefined;
        }

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
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { phone } = req.body;

        const result = await service.sing.singInUser({ phone });

        return res.status(200).json({ result });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/set-otp',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { userId, status, method } = req.body;

        const result = await service.sing.setOtpStatus(userId, status, method);

        return res.status(200).json({ msg: `your ${method} OTP is ${result}` });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/enable-2fa',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { userId, status, method } = req.body;

        const result = await service.sing.enableTowFactAuth(
          userId,
          status,
          method
        );

        return res.status(200).json({
          msg: 'your Tow fact Auth is Enable',
          data: result,
        });
      } catch (error) {
        next(error);
      }
    }
  );
  router.post(
    '/disable-2fa',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/send-otp',
    async (req: Request, res: Response, next: NextFunction) => {}
  );

  router.post(
    '/newtoken',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = req.body.token;

        const result = await service.sing.newAccessToken(token);

        return res.status(200).json({ msg: '', result });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/recovery-password',
    async (req: Request, res: Response, next: NextFunction) => {
      const { userInput, method } = req.body;

      const result = await service.sing.requestResetPass(userInput, method);

      return res.status(200).json({ msg: result });
    }
  );

  // router.get('/recovery-password-verfy', async (req: Request, res: Response, next: NextFunction) => {
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

  router.post(
    '/recovery-password-verfy',
    async (req: Request, res: Response, next: NextFunction) => {
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
    }
  );

  //
  router.delete(
    '/singout',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const accessToken = req.body.accessToken;
        const cheackToeknInDb = await service.sing.verifyAccessToekn(
          accessToken
        );

        const documentId = cheackToeknInDb;

        const deletTokens = await service.sing.userLogout(documentId);
        res.json({ status: 200, massage: 'logpout', payload: { deletTokens } });
      } catch (error) {
        next(error);
      }
    }
  );

  return router;
};
