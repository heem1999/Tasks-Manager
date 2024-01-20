import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config();
const User = require('../models/userModel')
import { Request, Response, NextFunction } from "express";

interface JwtPayload {
  _id: string
}
const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  // verify user is authenticated
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' })
  }

  const token = authorization.split(' ')[1]


  try {
    const SECRET = process.env.SECRET as string;
    const { _id } = jwt.verify(token, SECRET) as JwtPayload;

    req.user = await User.findOne({ _id }).select('_id')
    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({ error: 'Request is not authorized' })
  }
}
export { requireAuth }
