
import httpStatus from 'http-status';
import jwt from 'jwt-simple';
import { DateTime } from 'luxon';
import User from '../models/User'
import config from '../config';
import ErrorConstants from '../constants/errors'
import express from 'express'

export const authorize = async (req: express.Request<any>, res: express.Response, next: express.NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(httpStatus.UNAUTHORIZED).send(ErrorConstants.UNAUTHORIZED);
    }

    const token = authorization.split(' ')[1];

    try {
      const tokenResult = jwt.decode(token, config.JWT_SECRET);

      if (!tokenResult || !tokenResult.exp || !tokenResult._id) {

        await User.findOneAndUpdate(
          { 'sessions.access_token': token },
          { $pull: { sessions: { access_token: token } } },
        );

        return res.status(httpStatus.UNAUTHORIZED).send(ErrorConstants.MALFORMED_TOKEN);
      }

      if (tokenResult.exp - DateTime.local().toSeconds() < 0) {

        await User.findOneAndUpdate(
          { 'sessions.access_token': token },
          { $pull: { sessions: { access_token: token } } },
        );

        return res.status(httpStatus.UNAUTHORIZED).send(ErrorConstants.TOKEN_EXPIRED);
      }

      const user = await User.findById(tokenResult._id).lean();

      if (!user) {
        return res.status(httpStatus.UNAUTHORIZED).send(ErrorConstants.UNAUTHORIZED);
      }

      req.user = user;
      
      return next();
    } catch (e) {
      console.error(e)
      return res.status(httpStatus.UNAUTHORIZED).send(ErrorConstants.TOKEN_EXPIRED);;
    }
  } catch (e) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(ErrorConstants.INTERNAL_SERVER_ERROR);
  }
};