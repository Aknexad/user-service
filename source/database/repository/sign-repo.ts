interface CrateUser {
  phone: string;
  password: string;
}

interface FindeUserObjeact {
  id?: string;
  [key: string]: any;
  // phoneNumber?: string;
  // username?: string;
  // password?: string;
}

interface Test {
  [key: string]: any;
}

type Str = string;

export const singRepo = {
  createUser: async (data: CrateUser): Promise<CrateUser> => {
    return {
      phone: data.phone,
      password: data.password,
    };
  },

  // find section
  //
  findByCustomFiled: async (
    userInput: Str
  ): Promise<FindeUserObjeact | null> => {
    // chack input for match username phone or email

    const findUser = userInput;

    return null;
  },

  findUserById: async (id: Str): Promise<Test> => {
    return {};
  },

  findByPhone: async (number: Str): Promise<Test> => {
    return {};
  },

  // cheack section
  //
  cheackTempToken: async (token: Str): Promise<Test> => {
    return {};
  },

  // update section
  updateOtp: async (id: Str, code: number | null) => {},

  updateTempToken: async (id: Str, token: Str) => {},

  updateStatusOfOtp: async (id: Str, status: boolean) => {},

  updateUserPassword: async (id: Str, password: Str) => {},
};
