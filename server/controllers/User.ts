import express from 'express'
import httpStatus from 'http-status';
import UserModel from '../models/User'
import jwt from 'jwt-simple';
import config from '../config';

export const login = async (req: express.Request, res: express.Response) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });
  if (!user) {
    const newUser = await UserModel.create({
      username,
      password
    })
    const token = jwt.encode(newUser._id, config.JWT_SECRET)
    return res.status(httpStatus.OK).send({
      success: true,
      message: 'User created successfully',
      data: newUser,
      token
    })
  }


  // @ts-ignore
  const verifyPassword = await user.passwordMatches(password);
  if (verifyPassword) {
    const token = jwt.encode(user._id, config.JWT_SECRET)
    return res.status(httpStatus.OK).send({
      success: true,
      message: 'User login successfully',
      data: user,
      token
    })
  }

  return res.status(httpStatus.UNAUTHORIZED).send({
    success: false,
    message: 'Wrong password'
  })
}