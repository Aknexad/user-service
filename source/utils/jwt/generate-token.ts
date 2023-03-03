const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN, REFRESH_TOKEN } = require('../../configs');

interface Test {
  [key: string]: any;
}

export const generateAccsessToken = (payload: Test) => {
  return jwt.sign(payload, ACCESS_TOKEN, {
    expiresIn: '5m',
  });
};

export const genrateRefreshToken = (payload: Test) => {
  return jwt.sign(payload, REFRESH_TOKEN, {
    expiresIn: '1d',
  });
};
