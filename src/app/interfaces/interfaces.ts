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

  export interface RecPassStart {
      pidOrEmail: string,
      userType: string,
      target: string,
      targetType: string
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
  
  export interface GenericResponce<T> {
    result:Result<T>;
  }
  
  export interface Result<T> {
    data:T;
  }

  export interface userInfoForPassChange {
    contact:Contact;
    passwordChangeRequired:boolean;
    user:User;
    userType:string;
  }

  export interface Contact {
    email:string;
    phone:string;
    passwordChangeRequired:boolean;
    userType:string;
  }

  export interface User {
    birthDate:string;
    firstName:string;
    lastName:string;
    pid:string;
    userId:string;
  }
  
  export interface SuccessfulPassChangeDataRes {
    fromDate:string;
    loggedOut:string;
    toDate:string;
    token:string;
    userAgent:string;
    userData:userInfoForPassChange;
    _id:string;
  }