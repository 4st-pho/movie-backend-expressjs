import { Request, Response, NextFunction } from 'express'
import config from '../config/config'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user'


export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password, email } = req.body
    if (!password || !email) {
      res.status(400).json({ message: 'Invalid input' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({ username, password: hashedPassword, email })
    await newUser.save()
    return res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    next(error)
  }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body
    if (!password || !email) {
      return res.status(400).json({ message: 'Bad request' })
    }
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' })
    }
    const token = jwt.sign({ username: user.username }, config.secretKey ?? "", { expiresIn: '1m' })
    user.password = ""

    return res.status(200).json({ token, user })
  } catch (error) {
    next(error)
  }
}