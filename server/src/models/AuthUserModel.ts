import mongoose from "mongoose";

const AuthUserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    phone: {
      type: String,
    },
    birth: {
      type: Date,
    },
    role: {
      type: String,
      required: true,
      default: "guest",
      enum: ["guest", "admin", "user"],
    },
    password: {
      type: String,
      required: true,
      min: 5,
      max: 50,
      unique: true,
    },
  },
  { timestamps: true }
);

export const AuthUser = mongoose.model("AuthUser", AuthUserSchema);

export type AuthUserViewModel = {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  birth?: Date;
  // role: "guest" | "admin" | "user";
  role: string;
  password: string;
  createdAt: NativeDate;
  updatedAt: NativeDate;
};

export interface AuthUserI extends GuestUserI {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  birth?: string | Date;
  // role: "guest" | "admin" | "user";
  role: string;
}

export interface GuestUserI {
  _id: mongoose.Types.ObjectId | string;
  status: "guest" | "login";
}

export type AuthUserTokenModel = {
  token: string;
  user: AuthUserViewModel;
};
