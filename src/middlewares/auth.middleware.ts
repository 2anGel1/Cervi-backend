import { handleError, unauthorizedResponse } from '../utils/controller-utils';
import { sessionIdValidator } from "../validators/auth-validators";
import { sessionIdCookie } from "../constants/cookies-constants";
import { getActiveSession } from "../utils/session-utils";
import { Request, Response, NextFunction } from 'express';
const cookieParser = require("cookie-parser");
const session = require('express-session');


export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionId = await sessionIdValidator.validate(
      req.cookies[sessionIdCookie.name]
    );

    const session = await getActiveSession(sessionId);
    
    if (session) {
      req.body.session = session;
      next();
    } else {
      return unauthorizedResponse(res);
    }
  } catch (error) {
    return handleError({ res, error });
  }
};
