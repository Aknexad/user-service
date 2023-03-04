import bcrypt from 'bcrypt';
import speakeasy from 'speakeasy';
import { Request } from 'express';

// inport user repository
import { singRepo } from '../../database/repository/';

class StrategyLogic {
  //   local startgy logic for username
  async LocalAuthByUsernaem(userInput: string, password: string, done: any) {
    // return done(null, userInput);
    try {
      const user = await singRepo.findByCustomFiled(userInput);

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
  async VerifyingTotpFor2faRoute(req: Request, done: any) {
    try {
      const { token, code }: { token: string; code: string } = req.body;

      const user = await singRepo.cheackTempToken(token);
      if (user === null) return done(null, false);

      if (user.otp !== null) {
        if (user.otp !== parseInt(code)) return done(null, false);

        await singRepo.updateOtp(user.id, null);
        await singRepo.updateTempToken(user.id, '');

        return done(null, user);
      }

      // verfying 2fa code
      const Verifying = speakeasy.totp.verify({
        secret: user.secret.key,
        encoding: 'base32',
        token: code,
      });

      if (Verifying === false) return done(null, false);

      await singRepo.updateTempToken(user.id, '');

      return done(null, user);
    } catch (error) {
      done(error);
    }
  }

  //
  async VerifyingTotpForDisabelRoute(req: Request, done: any) {
    try {
      const { userId, code } = req.body;

      const user = await singRepo.findUserById(userId);

      if (user === null) return done(null, false);

      if (user.otp !== null) {
        if (user.otp !== parseInt(code)) return done(null, false);

        await singRepo.updateOtp(user.id, null);

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

  async VerifyingOtp(req: Request, done: any) {
    try {
      const { userInput, password } = req.body;

      const user = await singRepo.findByCustomFiled(userInput);

      if (!user) return done(null, false);

      if (user.otpAuth === false) throw new Error('you dont enabel otp ');
      if (user.otp === null) throw new Error('you dont have otp try agen');

      if (user.otp !== parseInt(password)) return done(null, false);
      await singRepo.updateOtp(user.id!, null);

      return done(null, user);
    } catch (error) {
      done(error);
    }
  }
}

export = StrategyLogic;
