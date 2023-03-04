import dotEnv from 'dotenv';

dotEnv.config({ path: '../../.env' });

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const SERVICE_NAME = process.env.SERVICE_NAME;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN!;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN!;

export { PORT, MONGODB_URI, SERVICE_NAME, ACCESS_TOKEN, REFRESH_TOKEN };

// export = {
//   PORT: process.env.PORT,
//   MONGODB_URI: process.env.MONGODB_URI,
//   SERVICE_NAME: process.env.SERVICE_NAME,
//   ACCESS_TOKEN: process.env.ACCESS_TOKEN,
//   REFRESH_TOKEN: process.env.REFRESH_TOKEN,
// };
