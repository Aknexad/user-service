const singRepo = {
  createUser: async data => {
    return {
      naem: data.userInput,
      password: data.password,
    };
  },

  // find section
  //
  findByCustomFiled: async userInput => {
    // chack input for match username phone or email

    const findUser = userInput;

    return findUser;
  },

  findUserById: async id => {},

  findByPhone: async number => {
    return number;
  },
  findByEmail: async email => {
    return email;
  },

  // cheack section
  //
  cheackTempToken: async token => {
    return token;
  },

  // update section
  updateOtp: async (id, code) => {},

  updateTempToken: async (id, token) => {},

  updateStatusOfOtp: async (id, status) => {},

  updateUserPassword: async (id, password) => {},
};

module.exports = singRepo;
