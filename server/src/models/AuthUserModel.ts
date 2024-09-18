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
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
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
  lastName: string;
  email: string;
  password: string;
  createdAt: NativeDate;
  updatedAt: NativeDate;
};

export type AuthUserTokenModel = {
  token: string;
  user: AuthUserViewModel;
};
