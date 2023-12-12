import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import config from '../config/config'

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  var token = req.header('Authorization') ?? ''
  token = token.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  jwt.verify(token, config.secretKey, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token has expired' })
      } else {
        return res.status(401).json({ message: 'Invalid token' })
      }
    }
    next()
  })
}
