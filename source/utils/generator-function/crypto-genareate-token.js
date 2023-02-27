const crypto = require('crypto');

function cryptoGenareateToken() {
  const base32 = crypto.randomBytes(32).toString('hex');
  const base16 = crypto.randomBytes(16).toString('hex');

  return { base32, base16 };
}

module.exports = cryptoGenareateToken;
