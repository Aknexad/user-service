const dotEnv = require('dotenv');

dotEnv.config();
module.exports = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  SERVICE_NAME: process.env.SERVICE_NAME,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
};
