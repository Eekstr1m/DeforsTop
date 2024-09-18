import bcrypt from "bcrypt";
import express, { Express, Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  AuthUser,
  AuthUserTokenModel,
  AuthUserViewModel,
} from "../models/AuthUserModel.js";
import {
  RequestWithBody,
  ResponseError,
  getTypedError,
} from "../types/RequestResponseTypes.js";

export const getAuthRouter = () => {
  const router = express.Router();

  // Register User
  router.post(
    "/register",
    async (
      req: RequestWithBody<AuthUserViewModel>,
      res: Response<AuthUserViewModel | ResponseError>
    ) => {
      try {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
          return res.status(400).json({ message: "Invalid credentials" });
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new AuthUser({
          firstName,
          lastName,
          email,
          password: passwordHash,
        });

        const savedUser: AuthUserViewModel = await newUser.save();

        res.status(201).json(savedUser);
      } catch (err) {
        res.status(500).json({ message: getTypedError(err) });
      }
    }
  );

  // LogIn User
  router.post(
    "/login",
    async (
      req: RequestWithBody<{
        email: string;
        password: string;
        rememberMe: boolean;
      }>,
      res: Response<AuthUserTokenModel | ResponseError>
    ) => {
      try {
        const { email, password, rememberMe } = req.body;
        if (!email || !password) {
          return res.status(400).json({ message: "Invalid credentials" });
        }

        const user = await AuthUser.findOne({ email });

        if (!user)
          return res.status(404).json({ message: "User does not exist" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(400).json({ message: "Invalid credentials" });

        if (process.env.JWT_SECRET) {
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

          res.cookie("AuthToken", token, {
            maxAge: rememberMe ? 864000000 : 900000,
            httpOnly: true,
          });

          user.password = "";
          res.status(200).json({ token, user });
        } else return res.status(403).json({ message: "Something went wrong" });
      } catch (err) {
        res.status(500).json({ message: getTypedError(err) });
      }
    }
  );

  // Log Out User
  router.delete("/login", async (req, res) => {
    try {
      res.cookie("AuthToken", "", { maxAge: -1, httpOnly: true });
      res.sendStatus(204);
    } catch (err) {
      res.status(500).json({ message: getTypedError(err) });
    }
  });

  // Authenticate User
  router.get("/me", async (req, res) => {
    try {
      // need to always response user data, login or guest
      const authToken: string | undefined = req.cookies.AuthToken;
      const sessionToken: string | undefined = req.cookies.SessionToken;

      let ResponseAuthUser;

      if (authToken) {
        const decodedToken = jwt.decode(authToken) as MyToken;
        res.cookie("SessionToken", "", { maxAge: -1, httpOnly: true });

        if (!decodedToken) {
          return res.status(401).json({ message: "Invalid token" });
        }

        const user = await AuthUser.findById(decodedToken.id);

        if (!user) {
          return res.status(404).json({ message: "User does not exist" });
        }

        ResponseAuthUser = {
          _id: user._id,
          status: "login",
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        };
      } else if (sessionToken) {
        const decodedToken = jwt.decode(sessionToken) as MyToken;

        if (!decodedToken) {
          return res.status(401).json({ message: "Invalid token" });
        }

        ResponseAuthUser = {
          _id: decodedToken.id,
          status: "guest",
        };
      }

      res.status(200).json(ResponseAuthUser);
    } catch (err) {
      res.status(500).json({ message: getTypedError(err) });
    }
  });

  return router;
};

type MyToken = {
  id: string;
  // whatever else is in the JWT.
};
