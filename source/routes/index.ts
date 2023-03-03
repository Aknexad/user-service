import { Router } from 'express';

import resfull from './restful';

const router = Router();

export = (data?: any) => {
  router.use('/restful', resfull(data));

  return router;
};
