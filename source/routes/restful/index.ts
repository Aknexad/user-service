import { Router } from 'express';
import singUser from './sing-user';

const router = Router();

export = (data?: any) => {
  router.use('/user', singUser(data));

  return router;
};
