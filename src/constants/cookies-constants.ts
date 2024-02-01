import { CookieOptions } from "express";
import ms from "ms";

type MyCookie = {
  name: string;
  options: CookieOptions;
};

export const sessionIdCookie: MyCookie = {
  name: "sessionId",
  options: {
    path: "/",
    httpOnly: true,
    maxAge: ms("1y"),
    secure: false,
    // signed: true,
  },
};

export const accountVerificationCookie: MyCookie = {
  name: "accountVerification",
  options: {
    httpOnly: true,
    path: "/",
    maxAge: ms("50m"), //5
    secure:false,
    // signed: true,
  },
};

export const passwordResetCookie: MyCookie = {
  name: "passwordReset",
  options: {
    httpOnly: true,
    path: "/",
    maxAge: ms("10m"),
    // signed: true,
  },
};
