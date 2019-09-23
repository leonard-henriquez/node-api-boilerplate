import { Document } from 'mongoose'

declare global {
  namespace Express {
    export interface User {
      firstName: string
      lastName: string
      email: string
      hashedPassword: string
    }
  }
}

export interface UserModelInterface extends Express.User, Document {
  verifyHash(password: string): Promise<boolean>
}
