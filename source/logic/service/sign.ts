import bcrypt from 'bcrypt';

import { singRepo } from '../../database/repository';
import { token as tokenGenrator, generatorFunction } from '../../utils/index';
import { BadRequest, NotFound, UnAuthorize } from '../../utils/hika-errors';

interface Test {
  [key: string]: any;
}

export const sing = {
  createUser: async (payload: UserInputPayload) => {
    // chack username exist
    const user = await singRepo.findByCustomFiled(payload.phone);

    if (user) throw new BadRequest('user with this name exist');

    const createUser = await singRepo.createUser(payload);

    return createUser;
  },

  singInUser: async (userInfo: UserInput) => {
    // findUser
    const user = await singRepo.findByCustomFiled(userInfo.userInput);

    if (!user) throw new NotFound('user dosent exist');

    const paylaod = user;

    // genarate token
    const accessToken = tokenGenrator.generateAccsessToken(paylaod);
    const refreshToken = tokenGenrator.genrateRefreshToken(paylaod);

    // save to DB

    return {
      username: userInfo.userInput,
      accessToken,
      refreshToken,
    };
  },

  newAccessToken: async (token: string) => {
    const getUserRefrashToken = '';

    if (!getUserRefrashToken) throw new UnAuthorize('unauth token');

    const payload = {};

    const newAccessToken = tokenGenrator.generateAccsessToken(payload);

    // save new acess toekn to database
    const updateAccessToken = '';

    return updateAccessToken;
  },

  verifyAccessToekn: async (toekn: string): Promise<string> => {
    const chackTokeninDb: any = {};

    if (!chackTokeninDb) throw new NotFound('token not found');

    if (chackTokeninDb.accessToken !== toekn) {
      throw new UnAuthorize('UnAuthorize token');
    }

    return chackTokeninDb.id;
  },

  setOtpStatus: async (userid: string, status: boolean, method: string) => {
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

  userLogout: async (id: string) => {
    const deleteDocument = '';

    return deleteDocument;
  },

  requestResetPass: async (userInput: string, method: ResetPassMethod) => {
    const user = await singRepo.findByCustomFiled(userInput);

    if (!user) throw new NotFound('user dosent exist');

    if (method === ResetPassMethod.phone) {
      const code = generatorFunction.genarateOtp();

      // save otp to DB
      // await this.repository.UpdateOtp(user.id, code);

      console.log(code);

      return 'code send to yourr phone';
    }

    if (method === ResetPassMethod.email) {
      const { base32, base16 } = generatorFunction.cryptoGenareateToken();

      // const saveToekn = await singRepo.upda (
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
  verfyResetPassForPhone: async (payload: Test) => {
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
  verfyResetPassForEmail: async (payload: Test) => {
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

  verfyResetPass: async (paylaod: VerfyResetPass<ResetPassMethod>) => {
    if (paylaod.method === ResetPassMethod.phone) {
      const user = await singRepo.findByPhone(paylaod.userInput);
      if (!user) throw new NotFound('user dosent exsite');

      if (user.otp !== parseInt(paylaod.code!))
        throw new UnAuthorize('UnAuthorize ');

      const hashPass = await bcrypt.hash(paylaod.password, 7);

      await singRepo.updateUserPassword(user.id, hashPass);

      return 'ok';
    }

    if (paylaod.method === ResetPassMethod.email) {
      const user = await singRepo.findUserById(paylaod.id);

      if (!user) throw new UnAuthorize('UnAuthorize');

      // chack token of user
      if (
        user.token[0] !== paylaod.token &&
        user.token[1] !== paylaod.subToken
      ) {
        throw new UnAuthorize('UnAuthorize');
      }

      const hashPass = await bcrypt.hash(paylaod.password, 7);

      await singRepo.updateUserPassword(user.id, hashPass);

      return 'ok';
    }

    throw new BadRequest('bad request');
  },

  enableTowFactAuth: async (id: string, status: boolean, method: StrNull) => {
    const user = await singRepo.findUserById(id);

    if (!user) throw new NotFound('user dosent exist');

    if (status === false) {
      // update user documet
    }

    'google' === Enable2faMothod.googel;

    if (method === Enable2faMothod.googel) {
      // enabel googel 2fa in db
      // const secret = generateSecrat(id);
      // update secraet on Db
    }

    // phone
    if (method === Enable2faMothod.phone) {
      // enable phone 2fa indb
      // update sercate on db
      //
    }

    // email
    if (method === Enable2faMothod.email) {
      // enable phone 2fa indb
      // update sercate on db
      //
    }

    throw new BadRequest('bad request');
  },

  disabelTowFactAuth: async (id: string, status: boolean, method: string) => {
    const user = await singRepo.findUserById(id);

    if (!user) throw new BadRequest('');

    // const updateSecret = await this.repository.UpdateSecret(id, {});

    // if (!updateSecret) throw new Error('try agen');

    // return updateStatus;
  },
};
