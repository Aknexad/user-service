// const CustomStrategy = require('passport-custom').Strategy;

import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as CustomStrategy } from 'passport-custom';

import StrategyLogic from './passport-strategy-logic';

const stratgyLogic = new StrategyLogic();

export function initialize(passport: any) {
  // local
  passport.use(
    new LocalStrategy(
      { usernameField: 'userInput' },
      stratgyLogic.LocalAuthByUsernaem
    )
  );

  // tow fact auth
  passport.use(
    'verifyingTotp',
    new CustomStrategy(stratgyLogic.VerifyingTotpFor2faRoute)
  );
  passport.use(
    'disTotp',
    new CustomStrategy(stratgyLogic.VerifyingTotpForDisabelRoute)
  );

  // otp auth
  passport.use('otpAuth', new CustomStrategy(stratgyLogic.VerifyingOtp));
}
