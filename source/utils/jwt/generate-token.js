const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN, REFRESH_TOKEN } = require('../../configs');

// const obj = {};

// obj.generateAccsessToken = payload => {
//   return jwt.sign(payload, ACCESS_TOKEN, {
//     expiresIn: '5m',
//   });
// };

// obj.generateAccsessToken = payload => {
//   return jwt.sign(payload, REFRESH_TOKEN, {
//     expiresIn: '1d',
//   });
// };

// module.exports = obj;

module.exports = {
  generateAccsessToken: payload => {
    return jwt.sign(payload, ACCESS_TOKEN, {
      expiresIn: '5m',
    });
  },

  genrateRefreshToken: payload => {
    return jwt.sign(payload, REFRESH_TOKEN, {
      expiresIn: '1d',
    });
  },
};
