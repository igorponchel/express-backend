import { Response, NextFunction, Request } from 'express'
const jwt = require('jsonwebtoken')

/**
 * Pour toutes les autres routes non définies, on retourne une erreur
 */
export const AuthHandler = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET')
    const userId = decodedToken.userId
    req.auth = {
      userId: userId,
    }
    next()
  } catch (error) {
    res.status(401).json({ error })
  }
}
