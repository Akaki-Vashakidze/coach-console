export interface SessionData {
    userType: string,
    passwordChangeRequired?: boolean,
    user: {
      userId: string,
      pid: string,
      firstName: string,
      lastName: string,
      birthDate: Date
    },
    contact: {
      email: string,
      phone: string
    }
  }

  export interface LoginInfo {
    pidOrEmail: number;
    password: string;
    userType: string;
  }
  

export interface SubmitTwoFa {
    token: string;
    uuid: string;
  }
  
  export interface PidOrMail {
    pidOrEmail: string;
    userType: string;
  }
  
  export interface RecPassObj {
    data: {
      pidOrEmail: string,
      userType: string,
      target: string,
      targetType: string
    }
  }
  
  export interface MandatoryPass {
    data: {
      password: string;
    }
  }
  