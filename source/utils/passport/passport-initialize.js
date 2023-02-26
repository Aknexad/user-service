const LocalStrategy = require('passport-local').Strategy;
const CustomStrategy = require('passport-custom').Strategy;

const StrategyLogic = require('./passport-strategy-logic');

const stratgyLogic = new StrategyLogic();

function initialize(passport) {
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

module.exports = initialize;
