import { ResponseErrorI } from "./error";

export interface AuthUserI {
  authStatus: "login" | "guest";
  userData: AuthUserDataI | GuestUserDataI;
}

export interface AuthUserDataI {
  _id: string;
  status: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface GuestUserDataI {
  _id: string;
  status: string;
}

export interface ResponseAuthUserI {
  status: number;
  data: AuthUserDataI | ResponseErrorI;
}
