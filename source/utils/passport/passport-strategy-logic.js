const bcrypt = require('bcrypt');
const speakeasy = require('speakeasy');

// inport user repository
const { sing } = require('../../database/repository/');

class StrategyLogic {
  //   local startgy logic for username
  async LocalAuthByUsernaem(userInput, password, done) {
    // return done(null, userInput);
    try {
      const user = await sing.findByCustomFiled(userInput);

      if (!user) return done(null, false);

      if (user.otpAuth === true) throw new Error('your OTP is anabel');

      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      done(error);
    }
  }

  // tow fact auth startaegy

  //
  async VerifyingTotpFor2faRoute(req, done) {
    try {
      const { token, code } = req.body;

      const user = await sing.cheackTempToken(token);
      if (user === null) return done(null, false);

      if (user.otp !== null) {
        if (user.otp !== parseInt(code)) return done(null, false);

        await sing.updateOtp(user.id, null);
        await sing.updateTempToken(user.id, '');

        return done(null, user);
      }

      // verfying 2fa code
      const Verifying = speakeasy.totp.verify({
        secret: user.secret.key,
        encoding: 'base32',
        token: code,
      });

      if (Verifying === false) return done(null, false);

      await sing.updateTempToken(user.id, '');

      return done(null, user);
    } catch (error) {
      done(error);
    }
  }

  //
  async VerifyingTotpForDisabelRoute(req, done) {
    try {
      const { userId, code } = req.body;

      const user = await sing.findUserById(userId);

      if (user === null) return done(null, false);

      if (user.otp !== null) {
        if (user.otp !== parseInt(code)) return done(null, false);

        await sing.updateOtp(user.id, null);

        return done(null, user);
      }

      const Verifying = speakeasy.totp.verify({
        secret: user.secret.key,
        encoding: 'base32',
        token: code,
      });

      if (Verifying === false) return done(null, false);

      return done(null, user);
    } catch (error) {
      done(error);
    }
  }

  // otp auth Strategy

  async VerifyingOtp(req, done) {
    try {
      const { userInput, password } = req.body;

      const user = await sing.findByCustomFiled(userInput);

      if (!user) return done(null, false);

      if (user.otpAuth === false) throw new Error('you dont enabel otp ');
      if (user.otp === null) throw new Error('you dont have otp try agen');

      if (user.otp !== parseInt(password)) return done(null, false);
      await sing.updateOtp(user.id, null);

      return done(null, user);
    } catch (error) {
      done(error);
    }
  }
}

module.exports = StrategyLogic;
