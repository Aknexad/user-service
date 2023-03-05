// This file contains types for the all layer.

// interface
interface UserInputPayload {
  phone: string;
  password: string;
}

interface UserInput {
  [key: string]: string;
}

interface VerfyResetPass<mt> {
  userInput: string;
  method: mt;
  password: string;
  code: string | undefined;
  id?: string | any;
  token?: string | any;
  subToken?: string | any;
}

// Enum
enum Enable2faMothod {
  googel = 'google',
  phone = 'phone',
  email = 'email',
}

enum ResetPassMethod {
  phone = 'phone',
  email = 'email',
}

// type

type StrNull = string | null;
type numNull = number | null;
