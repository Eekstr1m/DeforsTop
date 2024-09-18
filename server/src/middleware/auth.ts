import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ResponseError } from "../types/RequestResponseTypes";
import { Cart } from "../models/CartModel";
import { randomUUID } from "crypto";

export const verifyToken = async (
  req: Request,
  res: Response<ResponseError>,
  next: NextFunction
) => {
  try {
    // let token = req.header("Authorization");
    let token = req.cookies.AuthToken;

    if (!token) {
      return res.status(403).json({ message: "Access Denied" });
    }

    if (token.startsWith("Bearer")) {
      token = token.slice(6, token.length).trimStart();
    }

    if (process.env.JWT_SECRET) {
      const verified = jwt.verify(token, process.env.JWT_SECRET);

      (req as CustomRequest).user = verified;
      next();
    } else return res.status(403).json({ message: "Access Denied" });
  } catch (err) {
    let errMessage;
    if (err instanceof Error) errMessage = err.message;
    else errMessage = String(err);
    res.status(500).json({ message: errMessage });
  }
};

export interface CustomRequest extends Request {
  user: string | jwt.JwtPayload;
}

export const authTokenVerification = async (
  req: Request,
  res: Response<ResponseError>,
  next: NextFunction
) => {
  try {
    let token = req.cookies.SessionToken;

    if (!token) {
      if (process.env.JWT_SECRET) {
        const uuid = randomUUID();

        token = jwt.sign({ id: uuid }, process.env.JWT_SECRET);

        // Need a checkbox to set expired time
        res.cookie("SessionToken", token, {
          maxAge: 2629746000,
          httpOnly: true,
        });
      }
    }

    if (token.startsWith("Bearer")) {
      token = token.slice(6, token.length).trimStart();
    }

    if (process.env.JWT_SECRET) {
      const verified = jwt.verify(token, process.env.JWT_SECRET);

      (req as CustomRequest).user = verified;
    }
    next();
  } catch (err) {
    let errMessage;
    if (err instanceof Error) errMessage = err.message;
    else errMessage = String(err);
    res.status(500).json({ message: errMessage });
  }
};
