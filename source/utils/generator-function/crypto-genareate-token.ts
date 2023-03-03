import crypto from 'crypto';

interface CryptoType {
  base32: string;
  base16: string;
}

export function cryptoGenareateToken(): CryptoType {
  const base32 = crypto.randomBytes(32).toString('hex');
  const base16 = crypto.randomBytes(16).toString('hex');

  return { base32, base16 };
}
