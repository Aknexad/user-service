const { sing: singRepo } = require('../../database/repository/index');
const { token } = require('../../utils/index');
const { BadRequest, NotFound } = require('../../utils/hika-errors');

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

  singout: (req, res, next) => {},
};

module.exports = sing;
