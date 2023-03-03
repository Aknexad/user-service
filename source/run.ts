import expressjs from 'express';
import cors from 'cors';
import passport from 'passport';
// import { SERVICE_NAME, PORT } from './configs';
import config from './configs';
import router from './routes';
// connect to db
// import error handler
import { hikaError } from './middlewares';
import { initialize as initializePassport } from './utils';

const runService = async () => {
  const express = expressjs();
  express.disable('x-powered-by');
  // expres.set("strict routing", true)
  express.use(expressjs.json());
  express.use(cors());
  express.use('/statics', expressjs.static(__dirname + '/statics'));

  // initialize Passport
  initializePassport(passport);
  express.use(passport.initialize());

  // await dbConnection();
  express.use(router());
  express.use(hikaError);

  express.listen(8001, () => {
    console.log(
      `${config.SERVICE_NAME} => The service has started successfully`
    );
    console.log(
      `${config.SERVICE_NAME} => This serivce listening to port ${process.env.PORT}`
    );
  });
};

runService();
