const expressjs = require('express');
const cors = require('cors');
const { SERVICE_NAME, PORT } = require('./configs');
const routes = require('./routes');
const { connection: dbConnection } = require('./database');
const { hikaError } = require('./middlewares');

const runService = async () => {
  const express = expressjs();
  express.disable('x-powered-by');
  // express.set("strict routing", true);
  express.use(expressjs.json());
  express.use(cors());
  express.use('/statics', expressjs.static(__dirname + '/statics'));

  // await dbConnection();
  express.use(routes());
  express.use(hikaError);

  express.listen(PORT, () => {
    console.log(`${SERVICE_NAME} => The service has started successfully`);
    console.log(`${SERVICE_NAME} => This serivce listening to port ${PORT}`);
  });
};

runService();
