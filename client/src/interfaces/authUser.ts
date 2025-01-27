import { ResponseErrorI } from "./error";

// export interface AuthUserI {
//   authStatus: "login" | "guest";
//   userData: AuthUserDataI | GuestUserDataI;
// }

// export interface AuthUserI {

// }

// export interface AuthUserDataI {
//   _id: string;
//   status: string;
//   firstName: string;
//   lastName: string;
//   email: string;
// }

export interface AuthUserDataI extends GuestUserDataI {
  firstName: string;
  lastName?: string;
  email: string;
  birth?: Date;
  phone?: string;
  role: "guest" | "admin" | "user";
}

export interface GuestUserDataI {
  _id: string;
  status: "guest" | "login";
}

export interface ResponseAuthUserI {
  status: number;
  data: AuthUserDataI | ResponseErrorI;
}
