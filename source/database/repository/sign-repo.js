const singRepo = {
  createUser: async data => {
    return {
      naem: data.userInput,
      password: data.password,
    };
  },

  findByCustomFiled: async userInput => {
    // chack input for match username phone or email

    const findUser = userInput;

    return findUser;
  },
};

module.exports = singRepo;
