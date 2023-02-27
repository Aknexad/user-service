const { sing: singRepo } = require('../../database/repository/index');

//
const { token } = require('../../utils/index');
const { cryptoToken, genarateOtp } = require('../../utils/generator-function');

// Error Handeler
const {
  BadRequest,
  NotFound,
  UnAuthorize,
} = require('../../utils/hika-errors');

const sing = {
  createUser: async payload => {
    // chack username exist
    const user = await singRepo.findByCustomFiled(payload.userInput);

    if (user) throw new BadRequest('user with this name exist');

    const createUser = await singRepo.createUser(payload);

    return createUser;
  },

  singInUser: async userInfo => {
    // findUser
    const user = await singRepo.findByCustomFiled(userInfo.userInput);

    if (!user) throw new NotFound('user dosent exist');

    const paylaod = {
      username: userInfo.userInput,
    };

    // genarate token
    const accessToken = token.generateJwtToken.generateAccsessToken(paylaod);
    const refreshToken = token.generateJwtToken.genrateRefreshToken(paylaod);

    // save to DB

    return {
      username: userInfo.userInput,
      accessToken,
      refreshToken,
    };
  },

  newAccessToken: async token => {
    const getUserRefrashToken = '';

    if (!getUserRefrashToken) throw new UnAuthorize('unauth token');

    const payload = {};

    const newAccessToken = token.generateJwtToken.generateAccsessToken(payload);

    // save new acess toekn to database
    const updateAccessToken = '';

    return updateAccessToken;
  },

  verifyAccessToekn: async toekn => {
    const chackTokeninDb = ' ';

    if (!chackTokeninDb) throw new NotFound('token not found');

    if (chackTokeninDb.accessToken !== toekn) {
      throw new UnAuthorize('UnAuthorize token');
    }

    return chackTokeninDb.id;
  },

  setOtpStatus: async (userid, status, method) => {
    const getUser = await singRepo.findUserById(userid);

    if (!getUser) throw new NotFound('user dosent exist');

    if (status === true && method === 'email' && !getUser.email) {
      throw new NotFound('you dont have email ');
    }

    if (getUser.otpAuth === status) {
      throw new BadRequest(`your otp is ${status}`);
    }

    await singRepo.updateStatusOfOtp(userid, status);

    return status;
  },

  userLogout: async id => {
    const deleteDocument = '';

    return deleteDocument;
  },

  requestResetPass: async (userInput, method) => {
    const user = await singRepo.findByCustomFiled(userInput);

    if (method === 'phone') {
      const code = genarateOtp();

      // save otp to DB
      // await this.repository.UpdateOtp(user.id, code);

      console.log(code);

      return 'code send to yourr phone';
    }

    if (method === 'email') {
      const { base32, base16 } = cryptoToken();

      // const saveToekn = await this.repository.UpdateCrypteToken(
      //   user.id,
      //   base32,
      //   base16
      // );

      const link = `${process.env.REST_PASSWORD_BASE_URL}t1=${base32}/t2=${base16}/id=${user.id}`;

      // send to email
      console.log(link);

      return 'chack your email';
    }

    return `chack your ${method}`;
  },

  // optional
  verfyResetPassForPhone: async payload => {
    if (payload.method === 'phone') {
      const user = await singRepo.findByPhone(payload.userInput);
      if (!user) throw new NotFound('user dosent exsite');

      if (user.otp !== parseInt(payload.code))
        throw new UnAuthorize('UnAuthorize ');

      const hashPass = await bcrypt.hash(payload.password, 7);

      await singRepo.updateUserPassword(user.id, hashPass);

      return 'ok';
    }

    throw new BadRequest('bad request');
  },
  // optional
  verfyResetPassForEmail: async payload => {
    const user = await singRepo.findUserById(payload.id);

    if (!user) throw new UnAuthorize('UnAuthorize');

    // chack token of user
    if (user.token[0] !== payload.token && user.token[1] !== payload.subToken) {
      throw new UnAuthorize('UnAuthorize');
    }

    const hashPass = await bcrypt.hash(payload.password, 7);

    await singRepo.updateUserPassword(user.id, hashPass);

    return 'ok';
  },

  verfyResetPass: async paylaod => {
    if (payload.method === 'phone') {
      const user = await singRepo.findByPhone(payload.userInput);
      if (!user) throw new NotFound('user dosent exsite');

      if (user.otp !== parseInt(payload.code))
        throw new UnAuthorize('UnAuthorize ');

      const hashPass = await bcrypt.hash(payload.password, 7);

      await singRepo.updateUserPassword(user.id, hashPass);

      return 'ok';
    }

    if (paylaod.method === 'email') {
      const user = await singRepo.findUserById(payload.id);

      if (!user) throw new UnAuthorize('UnAuthorize');

      // chack token of user
      if (
        user.token[0] !== payload.token &&
        user.token[1] !== payload.subToken
      ) {
        throw new UnAuthorize('UnAuthorize');
      }

      const hashPass = await bcrypt.hash(payload.password, 7);

      await singRepo.updateUserPassword(user.id, hashPass);

      return 'ok';
    }

    throw new BadRequest('bad request');
  },

  enableTowFactAuth: async (id, status, method) => {
    const user = await singRepo.findUserById(id);

    if (!user) throw new NotFound('user dosent exist');

    if (status === false) {
      // update user documet
    }

    if (method === 'google') {
      // enabel googel 2fa in db
      // const secret = generateSecrat(id);
      // update secraet on Db
    }

    // phone
    if (method === 'phone') {
      // enable phone 2fa indb
      // update sercate on db
      //
    }

    // email
    if (method === 'email') {
      // enable phone 2fa indb
      // update sercate on db
      //
    }

    throw new BadRequest('bad request');
  },

  disabelTowFactAuth: async (id, status, method) => {
    const user = await singRepo.findUserById(id);

    if (!user) throw new BadRequest('');

    // const updateSecret = await this.repository.UpdateSecret(id, {});

    // if (!updateSecret) throw new Error('try agen');

    // return updateStatus;
  },
};

module.exports = sing;
