const User = require('../models/userModel')
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config();
import { NextFunction, Request, Response } from "express";

const createToken = (_id: string) => {
  const SECRET = process.env.SECRET as string;
  return jwt.sign({ _id }, SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({ email, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// signup a user
const signupUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const user = await User.signup(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({ email, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = { signupUser, loginUser }