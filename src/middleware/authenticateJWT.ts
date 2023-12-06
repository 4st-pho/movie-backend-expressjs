// src/middleware/authenticateJWT.ts
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config/config'

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  var token = req.header('Authorization') ?? ''
  token = token.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  jwt.verify(token, config.secretKey, (err, user) => {
    if (err) {

      return res.status(403).json({ message: 'Forbidden' , err})
    }
    next()
  })
}