import crypto from 'crypto'

// Create password hash using Password based key derivative function 2
const hashPassword = (password: string): string => {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('hex')

  return [salt, hash].join('$')
}
// Checking the password hash
const verifyHash = (password: string, original: string): boolean => {
  const originalHash = original.split('$')[1]
  const salt = original.split('$')[0]
  const hash = crypto.pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('hex')

  return hash === originalHash
}

export { hashPassword, verifyHash }
